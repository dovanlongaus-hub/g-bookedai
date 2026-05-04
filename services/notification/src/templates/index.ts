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
              <p><strong>Booking Ref:</strong> ${data.bookingRef || data.bookingId}</p>
              <p><strong>Meeting Link:</strong> <a href="https://meet.longcare.au/${data.bookingRef || data.bookingId}" style="color: #4285F4; font-weight: bold;">https://meet.longcare.au/${data.bookingRef || data.bookingId}</a></p>
            </div>
            <div style="text-align: center; margin: 1.5rem 0;">
              <a href="https://meet.longcare.au/${data.bookingRef || data.bookingId}" style="display: inline-block; padding: 14px 32px; background: #4285F4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Join Google Meet</a>
            </div>
            <p style="color: #666; font-size: 13px;">Click the button above at your session time to join via Google Meet.</p>
            <div style="background: #fff3cd; padding: 0.75rem 1rem; border-radius: 6px; margin: 1rem 0; font-size: 13px; color: #856404;">
              Please complete payment before your session if you haven't already. <a href="https://book.longcare.au" style="color: #856404; font-weight: bold;">Pay Now</a>
            </div>
            <p style="color: #666; font-size: 13px; margin-top: 1rem;">Need help? WhatsApp: <a href="https://wa.me/61481993178" style="color: #25D366;">+61 481 993 178</a> | Email: <a href="mailto:ceo@longcare.au">ceo@longcare.au</a></p>
            <hr style="margin: 2rem 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #999; font-size: 11px;">Longcare AU — AI-powered mentoring | <a href="https://longcare.au" style="color: #999;">longcare.au</a></p>
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
              <p><strong>Meeting Link:</strong> <a href="https://meet.longcare.au/${data.bookingRef || data.bookingId}" style="color: #4285F4; font-weight: bold;">meet.longcare.au/${data.bookingRef || data.bookingId}</a></p>
            </div>
            <div style="text-align: center; margin: 1rem 0;">
              <a href="https://meet.longcare.au/${data.bookingRef || data.bookingId}" style="display: inline-block; padding: 14px 32px; background: #4285F4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Google Meet</a>
            </div>
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
