import pino from 'pino';

const logger = pino({ name: 'sms-channel' });

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_FROM = process.env.TWILIO_FROM_NUMBER || '';

const SMS_TEMPLATES: Record<string, (data: Record<string, unknown>) => string> = {
  booking_confirmed: (d) =>
    `✅ Booking Confirmed!\n${d.serviceName} on ${d.dateTime}\nMeet: ${d.meetLink || 'Link in email'}\nRef: ${d.bookingRef}\n— bookedai.au`,

  reminder_24h: (d) =>
    `⏰ Reminder: Your ${d.serviceName} session is tomorrow at ${d.dateTime}.\nMeet: ${d.meetLink}\n— bookedai.au`,

  booking_cancelled: (d) =>
    `❌ Booking cancelled: ${d.serviceName} on ${d.dateTime}.\n${d.refundAmount ? `Refund: $${d.refundAmount} AUD` : ''}\nRebook: booking.g.bookedai.au\n— bookedai.au`,

  payment_received: (d) =>
    `💰 Payment received: $${d.amount} AUD for ${d.serviceName}.\nRef: ${d.reference}\n— bookedai.au`,
};

export async function sendSms(
  type: string,
  phone: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM) {
    logger.warn('Twilio not configured, skipping SMS');
    return false;
  }

  // Format Australian phone number
  let to = phone.replace(/\s+/g, '');
  if (to.startsWith('0')) to = '+61' + to.slice(1);
  if (!to.startsWith('+')) to = '+' + to;

  const template = SMS_TEMPLATES[type];
  const body = template ? template(data) : `Notification from bookedai.au: ${type}`;

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ From: TWILIO_FROM, To: to, Body: body }),
      },
    );

    if (!res.ok) {
      const err = await res.text();
      logger.error({ status: res.status, err, to }, 'Twilio SMS failed');
      return false;
    }

    const result = await res.json() as { sid: string };
    logger.info({ sid: result.sid, to, type }, 'SMS sent');
    return true;
  } catch (err) {
    logger.error({ err, to, type }, 'SMS send error');
    return false;
  }
}
