import type { NotificationType } from '@bookedai/shared';

interface EmailTemplate {
  subject: string;
  html: string;
}

export function getEmailTemplate(type: NotificationType, data: Record<string, unknown>): EmailTemplate {
  switch (type) {
    case 'booking_confirmed':
      return {
        subject: 'Booking Confirmed — Longcare AU',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0070f3;">Booking Confirmed!</h1>
            <p>Hi ${data.userName},</p>
            <p>Your booking for <strong>${data.serviceName}</strong> has been confirmed.</p>
            <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
              <p><strong>Date & Time:</strong> ${data.dateTime}</p>
              <p><strong>Duration:</strong> ${data.duration}</p>
              ${data.meetUrl ? `<p><strong>Google Meet:</strong> <a href="${data.meetUrl}">${data.meetUrl}</a></p>` : ''}
            </div>
            <p>A calendar invite has been sent to your email.</p>
            <a href="https://app.longcare.au/bookings/${data.bookingId}" style="display: inline-block; padding: 12px 24px; background: #0070f3; color: white; text-decoration: none; border-radius: 6px;">View Booking</a>
            <hr style="margin: 2rem 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #666; font-size: 12px;">Longcare AU — AI-powered mentoring</p>
          </div>`,
      };

    case 'reminder_24h':
      return {
        subject: 'Reminder: Your session is tomorrow — Longcare AU',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0070f3;">Session Reminder</h1>
            <p>Hi ${data.userName},</p>
            <p>Your <strong>${data.serviceName}</strong> session is scheduled for tomorrow.</p>
            <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
              <p><strong>Date & Time:</strong> ${data.dateTime}</p>
              ${data.meetUrl ? `<p><strong>Join:</strong> <a href="${data.meetUrl}">Google Meet Link</a></p>` : ''}
            </div>
            <a href="https://app.longcare.au/bookings/${data.bookingId}" style="display: inline-block; padding: 12px 24px; background: #0070f3; color: white; text-decoration: none; border-radius: 6px;">View Details</a>
          </div>`,
      };

    case 'session_summary_ready':
      return {
        subject: 'Your session summary is ready — Longcare AU',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0070f3;">Session Summary Ready</h1>
            <p>Hi ${data.userName},</p>
            <p>Your AI-generated session summary for <strong>${data.serviceName}</strong> is now available.</p>
            <a href="https://app.longcare.au/learning/${data.sessionId}" style="display: inline-block; padding: 12px 24px; background: #0070f3; color: white; text-decoration: none; border-radius: 6px;">View Summary</a>
            <p style="margin-top: 1.5rem;"><strong>Ready for your next session?</strong></p>
            <a href="https://book.longcare.au" style="display: inline-block; padding: 12px 24px; background: #22c55e; color: white; text-decoration: none; border-radius: 6px;">Book Next Session</a>
          </div>`,
      };

    case 'payment_received':
      return {
        subject: 'Payment Received — Longcare AU',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0070f3;">Payment Received</h1>
            <p>Hi ${data.userName},</p>
            <p>We have received your payment of <strong>$${data.amount} AUD</strong>.</p>
            <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
              <p><strong>Service:</strong> ${data.serviceName}</p>
              <p><strong>Amount:</strong> $${data.amount} AUD</p>
              <p><strong>Method:</strong> ${data.paymentMethod}</p>
              <p><strong>Reference:</strong> ${data.reference}</p>
            </div>
          </div>`,
      };

    default:
      return {
        subject: 'Notification — Longcare AU',
        html: `<p>You have a new notification from Longcare AU.</p>`,
      };
  }
}
