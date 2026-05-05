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
            <p style="color: #666; font-size: 13px; margin-top: 1rem;">Need help? WhatsApp: <a href="https://wa.me/61455301335" style="color: #25D366;">+61 455 301 335</a> | Email: <a href="mailto:ceo@longcare.au">ceo@longcare.au</a></p>
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

    case 'booking_cancelled':
      return {
        subject: 'Booking Cancelled — Longcare AU',
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
            <div style="background: #0f2942; padding: 24px; text-align: center;">
              <img src="https://g.bookedai.au/logo-light.png" alt="bookedai.au" height="32" />
            </div>
            <div style="padding: 32px 24px;">
              <h1 style="color: #ef4444; font-size: 24px; margin: 0 0 16px;">Booking Cancelled</h1>
              <p>Hi ${data.userName},</p>
              <p>Your booking for <strong>${data.serviceName}</strong> has been cancelled.</p>
              <div style="background: #fef2f2; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #ef4444;">
                <p style="margin: 4px 0;"><strong>Date & Time:</strong> ${data.dateTime}</p>
                <p style="margin: 4px 0;"><strong>Booking Ref:</strong> ${data.bookingRef || data.bookingId}</p>
                <p style="margin: 4px 0;"><strong>Reason:</strong> ${data.reason || 'Cancelled by request'}</p>
              </div>
              ${data.refundAmount ? `<p>A refund of <strong>$${data.refundAmount} AUD</strong> will be processed within 5-10 business days.</p>` : ''}
              <p style="margin-top: 24px;"><strong>Want to rebook?</strong></p>
              <a href="https://booking.g.bookedai.au" style="display: inline-block; padding: 14px 32px; background: #0d9488; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Book a New Session</a>
            </div>
            <div style="background: #f8fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #627d98;">
              <p>bookedai.au — The AI Revenue Engine</p>
            </div>
          </div>`,
      };

    case 'booking_rescheduled':
      return {
        subject: 'Booking Rescheduled — Longcare AU',
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
            <div style="background: #0f2942; padding: 24px; text-align: center;">
              <img src="https://g.bookedai.au/logo-light.png" alt="bookedai.au" height="32" />
            </div>
            <div style="padding: 32px 24px;">
              <h1 style="color: #f59e0b; font-size: 24px; margin: 0 0 16px;">Booking Rescheduled</h1>
              <p>Hi ${data.userName},</p>
              <p>Your booking for <strong>${data.serviceName}</strong> has been rescheduled.</p>
              <div style="background: #f0fdfa; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #0d9488;">
                <p style="margin: 4px 0;"><strong>New Date & Time:</strong> ${data.newDateTime}</p>
                <p style="margin: 4px 0;"><strong>Previous:</strong> <s style="color: #9fb3c8;">${data.oldDateTime}</s></p>
                <p style="margin: 4px 0;"><strong>Meeting Link:</strong> <a href="${data.meetLink}" style="color: #0d9488;">${data.meetLink}</a></p>
              </div>
              <div style="text-align: center; margin: 24px 0;">
                <a href="${data.meetLink}" style="display: inline-block; padding: 14px 32px; background: #4285F4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Google Meet</a>
              </div>
            </div>
            <div style="background: #f8fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #627d98;">
              <p>bookedai.au — The AI Revenue Engine</p>
            </div>
          </div>`,
      };

    case 'welcome':
      return {
        subject: 'Welcome to bookedai.au!',
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
            <div style="background: #0f2942; padding: 24px; text-align: center;">
              <img src="https://g.bookedai.au/logo-light.png" alt="bookedai.au" height="32" />
            </div>
            <div style="padding: 32px 24px; text-align: center;">
              <h1 style="color: #0f2942; font-size: 28px; margin: 0 0 16px;">Welcome to bookedai.au!</h1>
              <p style="color: #627d98; font-size: 16px; line-height: 1.6;">You're all set. Book your first AI mentoring session and start your growth journey.</p>
              <a href="https://booking.g.bookedai.au" style="display: inline-block; margin: 24px 0; padding: 16px 40px; background: linear-gradient(135deg, #0d9488, #14b8a6); color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px;">Book Your First Session</a>
              <div style="margin-top: 32px; text-align: left;">
                <h3 style="color: #0f2942;">What you can do:</h3>
                <ul style="color: #627d98; line-height: 2;">
                  <li>Chat with our AI assistant 24/7</li>
                  <li>Book 1-on-1 mentoring sessions</li>
                  <li>Get AI-generated session summaries</li>
                  <li>Track your learning progress</li>
                </ul>
              </div>
            </div>
            <div style="background: #f8fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #627d98;">
              <p>bookedai.au — The AI Revenue Engine | <a href="https://g.bookedai.au" style="color: #0d9488;">g.bookedai.au</a></p>
            </div>
          </div>`,
      };

    default:
      return {
        subject: 'Notification — bookedai.au',
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;"><p>You have a new notification from bookedai.au.</p></div>`,
      };
  }
}
