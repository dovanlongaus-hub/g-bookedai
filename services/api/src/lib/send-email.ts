import { logger } from './logger.js';
import { google } from 'googleapis';

export type EmailType =
  | 'booking_confirmed'
  | 'payment_received'
  | 'reminder_24h'
  | 'booking_cancelled'
  | 'booking_rescheduled'
  | 'session_summary_ready'
  | 'welcome';

// ─── Design Tokens ──────────────────────────────────────────
const NAVY = '#0f2942';
const TEAL = '#0d9488';
const GRAY_50 = '#f8fafb';
const GRAY_100 = '#f1f5f9';
const GRAY_400 = '#94a3b8';
const GRAY_500 = '#627d98';
const GRAY_700 = '#334e68';
const GREEN = '#10b981';
const AMBER = '#f59e0b';
const RED = '#ef4444';

// ─── Gmail Auth (impersonated as CEO) ───────────────────────
let _gmailClient: ReturnType<typeof google.gmail> | null = null;

function getGmail() {
  if (_gmailClient) return _gmailClient;
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
    clientOptions: { subject: process.env.CEO_EMAIL || 'ceo@longcare.au' },
  });
  _gmailClient = google.gmail({ version: 'v1', auth });
  return _gmailClient;
}

function encodeEmail(to: string, subject: string, html: string): string {
  const from = `bookedai.au <${process.env.CEO_EMAIL || 'ceo@longcare.au'}>`;
  const raw = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    html,
  ].join('\r\n');
  return Buffer.from(raw).toString('base64url');
}

// ─── HTML wrapper ───────────────────────────────────────────
function wrap(body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${GRAY_100};font-family:'Outfit',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${GRAY_100}"><tr><td align="center" style="padding:32px 16px">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,41,66,0.06)">
<tr><td style="background:${NAVY};padding:28px 32px;text-align:center"><img src="https://g.bookedai.au/logo-light.png" alt="bookedai.au" height="40"/></td></tr>
<tr><td style="padding:40px 32px">${body}</td></tr>
<tr><td style="background:${GRAY_50};padding:24px 32px;text-align:center;border-top:1px solid ${GRAY_100}">
<p style="margin:0 0 4px;font-size:13px;color:${GRAY_500};font-weight:500">bookedai.au — The AI Revenue Engine</p>
<p style="margin:0;font-size:12px;color:${GRAY_400}"><a href="https://g.bookedai.au" style="color:${TEAL};text-decoration:none">Website</a> · <a href="mailto:ceo@longcare.au" style="color:${TEAL};text-decoration:none">ceo@longcare.au</a> · <a href="https://wa.me/61455301335" style="color:${TEAL};text-decoration:none">WhatsApp</a></p>
</td></tr></table></td></tr></table></body></html>`;
}

function btn(text: string, href: string, bg = TEAL): string {
  return `<a href="${href}" style="display:inline-block;padding:14px 36px;background:${bg};color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:24px 0;font-size:15px">${text}</a>`;
}

function card(rows: string[], border = TEAL): string {
  return `<div style="background:${GRAY_50};border-left:4px solid ${border};border-radius:12px;padding:20px 24px;margin:20px 0"><table width="100%">${rows.map(r => `<tr>${r}</tr>`).join('')}</table></div>`;
}

function row(label: string, value: string): string {
  return `<td style="padding:6px 0;font-size:13px;color:${GRAY_500};width:130px">${label}</td><td style="padding:6px 0;font-size:14px;color:${GRAY_700};font-weight:500">${value}</td>`;
}

// ─── Templates ──────────────────────────────────────────────
function getTemplate(type: EmailType, d: Record<string, unknown>): { subject: string; html: string } {
  const name = String(d.userName || 'there');
  const service = String(d.serviceName || 'Session');

  switch (type) {
    case 'welcome':
      return {
        subject: 'Welcome to bookedai.au!',
        html: wrap(`
          <h1 style="margin:0 0 8px;font-size:26px;color:${NAVY}">Welcome to bookedai.au!</h1>
          <p style="margin:16px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Hi ${name},</p>
          <p style="margin:12px 0;font-size:15px;color:${GRAY_700};line-height:1.7">You're all set! Book your first AI mentoring session and start your growth journey.</p>
          <ul style="margin:16px 0;padding-left:20px;color:${GRAY_700};line-height:2">
            <li>Chat with our AI assistant 24/7</li>
            <li>Book 1-on-1 mentoring sessions</li>
            <li>Get AI-generated session summaries</li>
            <li>Track your learning progress</li>
          </ul>
          ${btn('Book Your First Session', 'https://booking.g.bookedai.au')}
        `),
      };

    case 'booking_confirmed':
      return {
        subject: `Session Confirmed — ${service}`,
        html: wrap(`
          <span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:${GREEN};border-radius:20px">CONFIRMED</span>
          <h1 style="margin:12px 0 8px;font-size:26px;color:${NAVY}">Session Confirmed</h1>
          <p style="margin:16px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Hi ${name},</p>
          <p style="margin:12px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Your <strong>${service}</strong> session has been confirmed.</p>
          ${card([
            row('Date & Time', String(d.dateTime || '-')),
            row('Duration', String(d.duration || '60 minutes')),
            row('Reference', String(d.bookingRef || d.bookingId || '-')),
          ])}
          ${btn('Join Google Meet', String(d.meetLink || `https://meet.longcare.au/${d.bookingRef || d.bookingId || ''}`), '#4285F4')}
        `),
      };

    case 'reminder_24h':
      return {
        subject: `Reminder: Your ${service} is tomorrow`,
        html: wrap(`
          <span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:${AMBER};border-radius:20px">REMINDER</span>
          <h1 style="margin:12px 0 8px;font-size:26px;color:${NAVY}">Your Session is Tomorrow</h1>
          <p style="margin:16px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Hi ${name},</p>
          <p style="margin:12px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Your <strong>${service}</strong> session is scheduled for tomorrow.</p>
          ${card([
            row('Date & Time', String(d.dateTime || '-')),
            row('Duration', String(d.duration || '60 minutes')),
          ], AMBER)}
          ${btn('Join Google Meet', String(d.meetLink || `https://meet.longcare.au/${d.bookingRef || ''}`), '#4285F4')}
        `),
      };

    case 'booking_cancelled':
      return {
        subject: `Booking Cancelled — ${service}`,
        html: wrap(`
          <span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:${RED};border-radius:20px">CANCELLED</span>
          <h1 style="margin:12px 0 8px;font-size:26px;color:${NAVY}">Booking Cancelled</h1>
          <p style="margin:16px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Hi ${name},</p>
          <p style="margin:12px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Your <strong>${service}</strong> booking has been cancelled.</p>
          ${card([
            row('Date', String(d.dateTime || '-')),
            row('Reason', String(d.reason || 'Cancelled by request')),
            ...(d.refundAmount ? [row('Refund', `<span style="color:${GREEN};font-weight:600">$${d.refundAmount} AUD</span>`)] : []),
          ], RED)}
          ${btn('Book a New Session', 'https://booking.g.bookedai.au')}
        `),
      };

    case 'booking_rescheduled':
      return {
        subject: `Session Rescheduled — ${service}`,
        html: wrap(`
          <span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:${AMBER};border-radius:20px">RESCHEDULED</span>
          <h1 style="margin:12px 0 8px;font-size:26px;color:${NAVY}">Session Rescheduled</h1>
          <p style="margin:16px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Hi ${name},</p>
          <p style="margin:12px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Your <strong>${service}</strong> session has been moved.</p>
          ${card([
            row('New Time', `<span style="color:${TEAL};font-weight:600">${d.newDateTime || '-'}</span>`),
            row('Previous', `<span style="text-decoration:line-through;color:${GRAY_400}">${d.oldDateTime || '-'}</span>`),
          ])}
          ${btn('Join Google Meet', String(d.meetLink || '#'), '#4285F4')}
        `),
      };

    case 'payment_received':
      return {
        subject: `Payment Received — $${d.amount || '0'} AUD`,
        html: wrap(`
          <span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:${GREEN};border-radius:20px">PAID</span>
          <h1 style="margin:12px 0 8px;font-size:26px;color:${NAVY}">Payment Received</h1>
          <p style="margin:16px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Hi ${name},</p>
          <p style="margin:12px 0;font-size:15px;color:${GRAY_700};line-height:1.7">We've received your payment for <strong>${service}</strong>.</p>
          ${card([
            row('Amount', `<span style="font-size:20px;font-weight:700;color:${NAVY}">$${d.amount || '0'} AUD</span>`),
            row('Method', String(d.paymentMethod || '-')),
            row('Reference', String(d.reference || '-')),
          ], GREEN)}
        `),
      };

    case 'session_summary_ready':
      return {
        subject: `Your AI Session Summary is Ready`,
        html: wrap(`
          <span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:${TEAL};border-radius:20px">SUMMARY READY</span>
          <h1 style="margin:12px 0 8px;font-size:26px;color:${NAVY}">Session Summary Ready</h1>
          <p style="margin:16px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Hi ${name},</p>
          <p style="margin:12px 0;font-size:15px;color:${GRAY_700};line-height:1.7">Your AI-generated summary for <strong>${service}</strong> is ready.</p>
          ${btn('View Full Summary', `https://app.g.bookedai.au/learning/${d.sessionId || ''}`)}
          ${btn('Book Next Session', 'https://booking.g.bookedai.au', NAVY)}
        `),
      };

    default:
      return {
        subject: `Notification from bookedai.au`,
        html: wrap(`<p style="font-size:15px;color:${GRAY_700}">You have a new notification.</p>`),
      };
  }
}

// ─── Send Email ─────────────────────────────────────────────
/**
 * Send email via Gmail API (impersonated as CEO).
 * Never throws — errors are logged but don't block the caller.
 */
export async function triggerEmail(
  type: EmailType,
  to: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  try {
    const template = getTemplate(type, data);
    const gmail = getGmail();
    const raw = encodeEmail(to, template.subject, template.html);

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    logger.info({ type, to, messageId: res.data.id }, 'Email sent via Gmail API');
    return true;
  } catch (err: any) {
    logger.error({ err: err.message, type, to }, 'Email send failed');
    return false;
  }
}
