import { describe, it, expect } from 'vitest';
import { buildPayIdPayload, buildBpayPayload, buildVietQrPayload } from './qr-bank.js';

describe('PayID payload', () => {
  it('encodes alias, amount and reference into URI', () => {
    const p = buildPayIdPayload(
      'ceo@longcare.au',
      { amountCents: 12345, reference: 'BOOK-ABCD1234', payeeName: 'Van Do' },
      '732250',
      '785932',
      'Westpac',
    );
    expect(p.alias).toBe('ceo@longcare.au');
    expect(p.amountAud).toBe('123.45');
    expect(p.uri).toMatch(/^payid:ceo@longcare\.au\?/);
    expect(p.uri).toContain('amount=123.45');
    expect(p.uri).toContain('ref=BOOK-ABCD1234');
    expect(p.bsb).toBe('732250');
    expect(p.bankName).toBe('Westpac');
  });
});

describe('BPAY payload', () => {
  it('encodes biller code and CRN', () => {
    const p = buildBpayPayload('123456', {
      amountCents: 5000,
      reference: 'CRN-9876',
      payeeName: 'Longcare',
    });
    expect(p.uri).toBe('bpay://payment?bc=123456&crn=CRN-9876&amount=50.00');
  });
});

describe('VietQR payload', () => {
  it('produces a CRC-checksummed EMV string ending with 4 hex digits', () => {
    const p = buildVietQrPayload('970422', '0123456789', 'NGUYEN VAN A', 'BOOKABC', 50000);
    // EMV format: ends with "6304XXXX" where XXXX is the CRC16/CCITT-FALSE
    expect(p.emvString).toMatch(/6304[0-9A-F]{4}$/);
    // Sanity check on a few well-known TLV fields
    expect(p.emvString).toContain('000201'); // payload format indicator = 01
    expect(p.emvString).toContain('010212'); // dynamic (amount included)
    expect(p.emvString).toContain('5303704'); // currency code = 704 (VND)
    expect(p.emvString).toContain('5405' + '50000'); // amount field 54 length 05 value 50000
    expect(p.imageUrl).toContain('vietqr.io');
    expect(p.imageUrl).toContain('970422-0123456789');
  });

  it('omits amount field for static QR', () => {
    const dynamic = buildVietQrPayload('970422', '0123456789', 'NGUYEN VAN A', 'BOOKABC', 50000);
    const stat = buildVietQrPayload('970422', '0123456789', 'NGUYEN VAN A', 'BOOKABC');
    expect(stat.emvString).toContain('010211'); // static indicator
    expect(stat.emvString.length).toBeLessThan(dynamic.emvString.length);
  });
});
