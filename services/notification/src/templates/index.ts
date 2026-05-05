import type { NotificationType } from '@bookedai/shared';

interface EmailTemplate {
  subject: string;
  html: string;
}

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const NAVY = '#0f2942';
const TEAL = '#0d9488';
const TEAL_LIGHT = '#14b8a6';
const GRAY_50 = '#f8fafb';
const GRAY_100 = '#f1f5f9';
const GRAY_400 = '#94a3b8';
const GRAY_500 = '#627d98';
const GRAY_700 = '#334e68';
const WHITE = '#ffffff';
const RED = '#ef4444';
const AMBER = '#f59e0b';
const GREEN = '#10b981';

// ─── Layout Components ──────────────────────────────────────────────────────────

function wrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>bookedai.au</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: ${GRAY_100}; -webkit-font-smoothing: antialiased; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
      .email-body { padding: 24px 16px !important; }
      .cta-btn { width: 100% !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background: ${GRAY_100}; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${GRAY_100};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="background: ${WHITE}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(15,41,66,0.06);">
          <!-- Header -->
          <tr>
            <td style="background: ${NAVY}; padding: 28px 32px; text-align: center;">
              <img src="https://g.bookedai.au/logo-light.png" alt="bookedai.au" height="40" style="height: 40px; width: auto;" />
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td class="email-body" style="padding: 40px 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background: ${GRAY_50}; padding: 24px 32px; border-top: 1px solid ${GRAY_100};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: ${GRAY_500}; font-weight: 500;">bookedai.au &mdash; The AI Revenue Engine</p>
                    <p style="margin: 0 0 8px; font-size: 12px; color: ${GRAY_400};">
                      <a href="https://g.bookedai.au" style="color: ${TEAL}; text-decoration: none;">Website</a>
                      &nbsp;&middot;&nbsp;
                      <a href="https://wa.me/61455301335" style="color: ${TEAL}; text-decoration: none;">WhatsApp</a>
                      &nbsp;&middot;&nbsp;
                      <a href="mailto:ceo@longcare.au" style="color: ${TEAL}; text-decoration: none;">ceo@longcare.au</a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: ${GRAY_400};">
                      <a href="https://g.bookedai.au/unsubscribe" style="color: ${GRAY_400}; text-decoration: underline;">Unsubscribe</a>
                      &nbsp;&middot;&nbsp; Melbourne, Australia
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(text: string, href: string, color: string = TEAL): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
  <tr>
    <td align="center" style="border-radius: 10px; background: ${color};">
      <a href="${href}" class="cta-btn" target="_blank" style="display: inline-block; padding: 14px 36px; font-size: 15px; font-weight: 600; color: ${WHITE}; text-decoration: none; border-radius: 10px; background: ${color};">
        ${text}
      </a>
    </td>
  </tr>
</table>`;
}

function infoCard(rows: Array<{ label: string; value: string }>, borderColor: string = TEAL): string {
  const rowsHtml = rows
    .map(
      (r) =>
        `<tr><td style="padding: 8px 0; font-size: 13px; color: ${GRAY_500}; width: 130px; vertical-align: top;">${r.label}</td><td style="padding: 8px 0; font-size: 14px; color: ${GRAY_700}; font-weight: 500;">${r.value}</td></tr>`,
    )
    .join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${GRAY_50}; border-radius: 12px; border-left: 4px solid ${borderColor}; margin: 20px 0;">
  <tr>
    <td style="padding: 20px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rowsHtml}
      </table>
    </td>
  </tr>
</table>`;
}

function heading(text: string, color: string = NAVY): string {
  return `<h1 style="margin: 0 0 8px; font-size: 26px; font-weight: 700; color: ${color}; line-height: 1.3;">${text}</h1>`;
}

function greeting(name: unknown): string {
  return `<p style="margin: 16px 0 0; font-size: 15px; color: ${GRAY_700}; line-height: 1.6;">Hi ${name || 'there'},</p>`;
}

function paragraph(text: string): string {
  return `<p style="margin: 12px 0 0; font-size: 15px; color: ${GRAY_700}; line-height: 1.7;">${text}</p>`;
}

function divider(): string {
  return `<hr style="margin: 28px 0; border: none; border-top: 1px solid ${GRAY_100};" />`;
}

function badge(text: string, bg: string, textColor: string = WHITE): string {
  return `<span style="display: inline-block; padding: 4px 12px; font-size: 12px; font-weight: 600; color: ${textColor}; background: ${bg}; border-radius: 20px; letter-spacing: 0.3px;">${text}</span>`;
}

// ─── Templates ──────────────────────────────────────────────────────────────────

export function getEmailTemplate(type: NotificationType, data: Record<string, unknown>): EmailTemplate {
  switch (type) {
    case 'booking_confirmed':
      return {
        subject: 'Your session is confirmed — bookedai.au',
        html: wrapper(`
          ${badge('CONFIRMED', GREEN)}
          ${heading('Session Confirmed')}
          ${greeting(data.userName)}
          ${paragraph(`Your <strong>${data.serviceName}</strong> session has been confirmed and added to your calendar.`)}
          ${infoCard([
            { label: 'Date & Time', value: String(data.dateTime) },
            { label: 'Duration', value: String(data.duration || '60 minutes') },
            { label: 'Reference', value: String(data.bookingRef || data.bookingId || '-') },
            { label: 'Meeting', value: `<a href="https://meet.longcare.au/${data.bookingRef || data.bookingId}" style="color: ${TEAL}; text-decoration: none; font-weight: 600;">Google Meet Link</a>` },
          ])}
          ${ctaButton('Join Google Meet', `https://meet.longcare.au/${data.bookingRef || data.bookingId}`, '#4285F4')}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #fffbeb; border-radius: 10px; margin: 20px 0;">
            <tr>
              <td style="padding: 16px 20px;">
                <p style="margin: 0; font-size: 13px; color: #92400e;">
                  <strong>Payment reminder:</strong> Please complete payment before your session if you haven't already.
                  <a href="https://booking.g.bookedai.au" style="color: #92400e; font-weight: 600; text-decoration: underline;">Pay Now</a>
                </p>
              </td>
            </tr>
          </table>
        `),
      };

    case 'reminder_24h':
      return {
        subject: 'Your session is tomorrow — bookedai.au',
        html: wrapper(`
          ${badge('TOMORROW', AMBER, WHITE)}
          ${heading('Session Reminder')}
          ${greeting(data.userName)}
          ${paragraph(`Your <strong>${data.serviceName}</strong> session is scheduled for <strong>tomorrow</strong>. Here's everything you need:`)}
          ${infoCard([
            { label: 'Date & Time', value: String(data.dateTime) },
            { label: 'Duration', value: String(data.duration || '60 minutes') },
            { label: 'Meeting', value: `<a href="https://meet.longcare.au/${data.bookingRef || data.bookingId}" style="color: ${TEAL}; text-decoration: none; font-weight: 600;">Google Meet Link</a>` },
          ])}
          ${ctaButton('Join Google Meet', `https://meet.longcare.au/${data.bookingRef || data.bookingId}`, '#4285F4')}
          ${divider()}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding: 0;">
              <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: ${NAVY};">Preparation tips:</p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr><td style="padding: 4px 0; font-size: 13px; color: ${GRAY_500};">&#10003;&nbsp; Test your camera and microphone beforehand</td></tr>
                <tr><td style="padding: 4px 0; font-size: 13px; color: ${GRAY_500};">&#10003;&nbsp; Find a quiet spot with stable internet</td></tr>
                <tr><td style="padding: 4px 0; font-size: 13px; color: ${GRAY_500};">&#10003;&nbsp; Have your questions or goals ready</td></tr>
                <tr><td style="padding: 4px 0; font-size: 13px; color: ${GRAY_500};">&#10003;&nbsp; Join 2 minutes early to settle in</td></tr>
              </table>
            </td></tr>
          </table>
        `),
      };

    case 'booking_cancelled':
      return {
        subject: 'Booking cancelled — bookedai.au',
        html: wrapper(`
          ${badge('CANCELLED', RED)}
          ${heading('Booking Cancelled', RED)}
          ${greeting(data.userName)}
          ${paragraph(`Your booking for <strong>${data.serviceName}</strong> has been cancelled.`)}
          ${infoCard(
            [
              { label: 'Date & Time', value: String(data.dateTime) },
              { label: 'Reference', value: String(data.bookingRef || data.bookingId || '-') },
              { label: 'Reason', value: String(data.reason || 'Cancelled by request') },
            ],
            RED,
          )}
          ${
            data.refundAmount
              ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f0fdf4; border-radius: 10px; margin: 20px 0;">
            <tr><td style="padding: 16px 20px;">
              <p style="margin: 0; font-size: 14px; color: #166534;"><strong>Refund:</strong> $${data.refundAmount} AUD will be processed within 5-10 business days.</p>
            </td></tr>
          </table>`
              : ''
          }
          ${divider()}
          ${paragraph('<strong>Want to rebook?</strong> We\'d love to see you again.')}
          ${ctaButton('Book a New Session', 'https://booking.g.bookedai.au')}
        `),
      };

    case 'booking_rescheduled':
      return {
        subject: 'Booking rescheduled — bookedai.au',
        html: wrapper(`
          ${badge('RESCHEDULED', AMBER, WHITE)}
          ${heading('Booking Rescheduled', AMBER)}
          ${greeting(data.userName)}
          ${paragraph(`Your <strong>${data.serviceName}</strong> session has been moved to a new time.`)}
          ${infoCard([
            { label: 'New Date & Time', value: `<strong style="color: ${TEAL};">${data.newDateTime}</strong>` },
            { label: 'Previous', value: `<s style="color: ${GRAY_400};">${data.oldDateTime}</s>` },
            { label: 'Meeting', value: `<a href="${data.meetLink || `https://meet.longcare.au/${data.bookingRef || data.bookingId}`}" style="color: ${TEAL}; text-decoration: none; font-weight: 600;">Google Meet Link</a>` },
          ], AMBER)}
          ${ctaButton('Join Google Meet', String(data.meetLink || `https://meet.longcare.au/${data.bookingRef || data.bookingId}`), '#4285F4')}
          ${paragraph(`<span style="font-size: 13px; color: ${GRAY_400};">This link will be active at your new session time.</span>`)}
        `),
      };

    case 'payment_received':
      return {
        subject: 'Payment received — bookedai.au',
        html: wrapper(`
          ${badge('PAID', GREEN)}
          ${heading('Payment Received')}
          ${greeting(data.userName)}
          ${paragraph('Thank you! We\'ve received your payment successfully.')}
          ${infoCard([
            { label: 'Amount', value: `<strong style="font-size: 18px; color: ${NAVY};">$${data.amount} AUD</strong>` },
            { label: 'Service', value: String(data.serviceName || '-') },
            { label: 'Method', value: String(data.paymentMethod || '-') },
            { label: 'Reference', value: `<code style="background: ${GRAY_100}; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${data.reference || '-'}</code>` },
          ], GREEN)}
          ${paragraph('A receipt has been recorded in your account. No further action is needed.')}
          ${divider()}
          ${paragraph(`<span style="font-size: 12px; color: ${GRAY_400};">This is an automated payment confirmation. If you did not make this payment, please contact us immediately at <a href="mailto:ceo@longcare.au" style="color: ${TEAL};">ceo@longcare.au</a>.</span>`)}
        `),
      };

    case 'session_summary_ready':
      return {
        subject: 'Your session summary is ready — bookedai.au',
        html: wrapper(`
          ${badge('NEW SUMMARY', TEAL)}
          ${heading('Session Summary Ready')}
          ${greeting(data.userName)}
          ${paragraph(`Your AI-generated summary for <strong>${data.serviceName}</strong> is now available.`)}
          ${
            data.summaryPreview
              ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${GRAY_50}; border-radius: 12px; border: 1px solid ${GRAY_100}; margin: 20px 0;">
            <tr><td style="padding: 20px 24px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: ${GRAY_400}; text-transform: uppercase; letter-spacing: 0.5px;">Preview</p>
              <p style="margin: 0; font-size: 14px; color: ${GRAY_700}; line-height: 1.6; font-style: italic;">"${data.summaryPreview}"</p>
            </td></tr>
          </table>`
              : ''
          }
          ${ctaButton('View Full Summary', `https://app.longcare.au/learning/${data.sessionId}`)}
          ${divider()}
          ${paragraph('<strong>Ready for your next session?</strong> Keep the momentum going.')}
          ${ctaButton('Book Next Session', 'https://booking.g.bookedai.au', GREEN)}
        `),
      };

    case 'welcome':
      return {
        subject: 'Welcome to bookedai.au!',
        html: wrapper(`
          <div style="text-align: center;">
            ${heading('Welcome to bookedai.au!')}
            ${paragraph(`You're all set, <strong>${data.userName || 'there'}</strong>. Your AI-powered growth journey starts now.`)}
          </div>
          ${ctaButton('Book Your First Session', 'https://booking.g.bookedai.au')}
          ${divider()}
          <p style="margin: 0 0 16px; font-size: 15px; font-weight: 600; color: ${NAVY};">What you can do:</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid ${GRAY_100};">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="width: 36px; vertical-align: top;"><span style="display: inline-block; width: 28px; height: 28px; background: ${GRAY_50}; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">&#128172;</span></td>
                  <td style="padding-left: 12px;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${NAVY};">AI Chat Assistant</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: ${GRAY_500};">Get instant answers and guidance 24/7</p>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid ${GRAY_100};">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="width: 36px; vertical-align: top;"><span style="display: inline-block; width: 28px; height: 28px; background: ${GRAY_50}; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">&#128218;</span></td>
                  <td style="padding-left: 12px;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${NAVY};">1-on-1 Mentoring</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: ${GRAY_500};">Book expert sessions via Google Meet</p>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid ${GRAY_100};">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="width: 36px; vertical-align: top;"><span style="display: inline-block; width: 28px; height: 28px; background: ${GRAY_50}; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">&#128200;</span></td>
                  <td style="padding-left: 12px;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${NAVY};">AI Session Summaries</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: ${GRAY_500};">Get auto-generated notes after every session</p>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="width: 36px; vertical-align: top;"><span style="display: inline-block; width: 28px; height: 28px; background: ${GRAY_50}; border-radius: 8px; text-align: center; line-height: 28px; font-size: 14px;">&#127919;</span></td>
                  <td style="padding-left: 12px;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: ${NAVY};">Progress Tracking</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: ${GRAY_500};">Monitor your learning journey with analytics</p>
                  </td>
                </tr></table>
              </td>
            </tr>
          </table>
          ${divider()}
          <div style="text-align: center;">
            ${paragraph(`Questions? We're always here to help.`)}
            <p style="margin: 8px 0 0; font-size: 13px; color: ${GRAY_400};">
              <a href="https://wa.me/61455301335" style="color: ${TEAL}; text-decoration: none;">WhatsApp</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:ceo@longcare.au" style="color: ${TEAL}; text-decoration: none;">ceo@longcare.au</a>
            </p>
          </div>
        `),
      };

    default:
      return {
        subject: 'Notification — bookedai.au',
        html: wrapper(`
          ${heading('New Notification')}
          ${paragraph('You have a new notification from bookedai.au.')}
          ${ctaButton('View Dashboard', 'https://app.longcare.au')}
        `),
      };
  }
}

/**
 * Export sample data for testing/previewing templates
 */
export const sampleTemplateData: Record<string, Record<string, unknown>> = {
  booking_confirmed: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    dateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    duration: '60 minutes',
    bookingRef: 'BK-2026-0507',
    bookingId: 'bk_abc123',
  },
  reminder_24h: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    dateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    duration: '60 minutes',
    bookingRef: 'BK-2026-0507',
    bookingId: 'bk_abc123',
  },
  booking_cancelled: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    dateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    bookingRef: 'BK-2026-0507',
    reason: 'Schedule conflict',
    refundAmount: '150.00',
  },
  booking_rescheduled: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    newDateTime: 'Thursday, 8 May 2026 at 3:00 PM AEST',
    oldDateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    bookingRef: 'BK-2026-0507',
    meetLink: 'https://meet.longcare.au/BK-2026-0507',
  },
  payment_received: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    amount: '150.00',
    paymentMethod: 'Visa ending in 4242',
    reference: 'PAY-2026-0507-XK9',
  },
  session_summary_ready: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    sessionId: 'sess_abc123',
    summaryPreview: 'Key topics covered: revenue automation strategy, AI agent deployment timeline, and customer journey optimization. Three action items were identified...',
  },
  welcome: {
    userName: 'Sarah Chen',
  },
};
