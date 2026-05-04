import { google } from 'googleapis';
import { getGoogleAuth } from '../lib/auth.js';

function getGmail() {
  return google.gmail({ version: 'v1', auth: getGoogleAuth(['https://www.googleapis.com/auth/gmail.send']) });
}

function encodeMessage(to: string, subject: string, html: string, from?: string): string {
  const message = [
    `From: ${from || 'Longcare AU <noreply@longcare.au>'}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    html,
  ].join('\r\n');

  return Buffer.from(message).toString('base64url');
}

export const gmailService = {
  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    from?: string;
  }): Promise<{ messageId: string }> {
    const gmail = getGmail();
    const raw = encodeMessage(params.to, params.subject, params.html, params.from);

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    return { messageId: res.data.id || '' };
  },

  async sendBookingConfirmation(params: {
    to: string;
    userName: string;
    serviceName: string;
    dateTime: string;
    duration: string;
    meetUrl?: string;
    bookingId: string;
  }): Promise<{ messageId: string }> {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0070f3;">Booking Confirmed!</h1>
        <p>Hi ${params.userName},</p>
        <p>Your booking for <strong>${params.serviceName}</strong> has been confirmed.</p>
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
          <p><strong>Date & Time:</strong> ${params.dateTime}</p>
          <p><strong>Duration:</strong> ${params.duration}</p>
          ${params.meetUrl ? `<p><strong>Google Meet:</strong> <a href="${params.meetUrl}">${params.meetUrl}</a></p>` : ''}
        </div>
        <a href="https://app.longcare.au/bookings/${params.bookingId}"
           style="display: inline-block; padding: 12px 24px; background: #0070f3; color: white; text-decoration: none; border-radius: 6px;">
          View Booking
        </a>
        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #eee;" />
        <p style="color: #666; font-size: 12px;">Longcare AU — AI-powered mentoring</p>
      </div>`;

    return this.sendEmail({ to: params.to, subject: 'Booking Confirmed — Longcare AU', html });
  },

  async sendReminder(params: {
    to: string;
    userName: string;
    serviceName: string;
    dateTime: string;
    meetUrl?: string;
    bookingId: string;
    hoursUntil: number;
  }): Promise<{ messageId: string }> {
    const timeLabel = params.hoursUntil === 24 ? 'tomorrow' : `in ${params.hoursUntil} hour(s)`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0070f3;">Session Reminder</h1>
        <p>Hi ${params.userName},</p>
        <p>Your <strong>${params.serviceName}</strong> session is ${timeLabel}.</p>
        <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
          <p><strong>Date & Time:</strong> ${params.dateTime}</p>
          ${params.meetUrl ? `<p><strong>Join:</strong> <a href="${params.meetUrl}">Google Meet Link</a></p>` : ''}
        </div>
        <a href="https://app.longcare.au/bookings/${params.bookingId}"
           style="display: inline-block; padding: 12px 24px; background: #0070f3; color: white; text-decoration: none; border-radius: 6px;">
          View Details
        </a>
      </div>`;

    return this.sendEmail({ to: params.to, subject: `Reminder: Session ${timeLabel} — Longcare AU`, html });
  },
};
