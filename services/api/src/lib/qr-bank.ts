// QR payload generators for Australian and Vietnamese bank rails.
//
// PayID / BPAY have no government-mandated QR standard, so we embed the payment
// intent as a URI scheme. Native banking apps in AU don't currently scan these,
// but the QR is still useful as a copy/paste source and any generic QR scanner
// will surface the bank details to the customer.
//
// VietQR follows the EMVCo Merchant Presented Mode spec, which IS scannable by
// every Vietnamese banking app via the NAPAS network.

export type AudPaymentDetails = {
  amountCents: number;
  reference: string;
  payeeName: string;
};

export type PayIdPayload = {
  alias: string;
  uri: string;          // payid:alias?amount=...&ref=...&name=...
  bsb?: string;
  accountNumber?: string;
  accountName: string;
  bankName: string;
  amountAud: string;    // formatted "12.34"
  reference: string;
};

export type BpayPayload = {
  billerCode: string;
  reference: string;    // CRN
  uri: string;          // bpay://payment?bc=...&crn=...&amount=...
  amountAud: string;
  payeeName: string;
};

export type VietQrPayload = {
  bankBin: string;
  accountNumber: string;
  accountName: string;
  amountVnd?: number;
  reference: string;
  emvString: string;    // EMVCo TLV string ready for QR encoding
  imageUrl: string;     // VietQR.io free-tier image URL (server-rendered PNG)
};

const formatAud = (cents: number): string => (cents / 100).toFixed(2);

export function buildPayIdPayload(
  alias: string,
  details: AudPaymentDetails,
  bsb: string | undefined,
  accountNumber: string | undefined,
  bankName: string,
): PayIdPayload {
  const amount = formatAud(details.amountCents);
  const params = new URLSearchParams({
    amount,
    ref: details.reference,
    name: details.payeeName,
  });
  return {
    alias,
    uri: `payid:${alias}?${params.toString()}`,
    bsb,
    accountNumber,
    accountName: details.payeeName,
    bankName,
    amountAud: amount,
    reference: details.reference,
  };
}

export function buildBpayPayload(
  billerCode: string,
  details: AudPaymentDetails,
): BpayPayload {
  const amount = formatAud(details.amountCents);
  const params = new URLSearchParams({
    bc: billerCode,
    crn: details.reference,
    amount,
  });
  return {
    billerCode,
    reference: details.reference,
    uri: `bpay://payment?${params.toString()}`,
    amountAud: amount,
    payeeName: details.payeeName,
  };
}

// EMVCo TLV format used by VietQR. Each field is `IDLENVALUE` where ID is 2
// digits, LEN is the byte-length of VALUE zero-padded to 2 digits.
const tlv = (id: string, value: string): string => {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
};

// CRC-16/CCITT-FALSE — VietQR's required checksum, polynomial 0x1021, init 0xFFFF.
const crc16 = (input: string): string => {
  let crc = 0xffff;
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

export function buildVietQrPayload(
  bankBin: string,
  accountNumber: string,
  accountName: string,
  reference: string,
  amountVnd?: number,
): VietQrPayload {
  // Field 38 — merchant account info (NAPAS identifier + bank BIN + account)
  const napas = tlv('00', 'A000000727')
    + tlv('01', tlv('00', bankBin) + tlv('01', accountNumber))
    + tlv('02', 'QRIBFTTA'); // account-transfer service code
  const f38 = tlv('38', napas);

  let payload = tlv('00', '01')                         // payload format indicator
    + tlv('01', amountVnd ? '12' : '11')                // 11 = static, 12 = dynamic (with amount)
    + f38
    + tlv('53', '704');                                  // currency = VND (ISO 4217)
  if (amountVnd) payload += tlv('54', amountVnd.toString());
  payload += tlv('58', 'VN')                            // country
    + tlv('62', tlv('08', reference));                   // additional data — bill reference

  // CRC tag is "6304" + 4-hex-char checksum over the payload INCLUDING "6304"
  const withCrcTag = payload + '6304';
  const emvString = withCrcTag + crc16(withCrcTag);

  // VietQR.io public image renderer — no auth required for the compact endpoint
  const tpl = amountVnd ? 'compact2' : 'compact';
  const params = new URLSearchParams({ addInfo: reference, accountName });
  if (amountVnd) params.set('amount', amountVnd.toString());
  const imageUrl = `https://img.vietqr.io/image/${bankBin}-${accountNumber}-${tpl}.png?${params.toString()}`;

  return { bankBin, accountNumber, accountName, amountVnd, reference, emvString, imageUrl };
}
