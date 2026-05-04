import type { NotificationType } from '@bookedai/shared';

interface DripEmail {
  id: string;
  name: string;
  delay: string; // e.g. "0h", "24h", "72h", "7d"
  subject: string;
  html: string;
}

/**
 * Welcome sequence — triggered after first booking
 */
export const welcomeSequence: DripEmail[] = [
  {
    id: 'welcome-1',
    name: 'Welcome',
    delay: '0h',
    subject: 'Welcome to Longcare AU! Your AI Journey Starts Now',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0b0c10, #1a1a2e); padding: 2rem; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #66fcf1; margin: 0;">Welcome to Longcare!</h1>
        </div>
        <div style="padding: 2rem; background: #fff;">
          <p>Hi {{name}},</p>
          <p>Thank you for booking your first AI mentoring session. We're excited to help you on your AI journey!</p>
          <h3>What's Next:</h3>
          <ol>
            <li><strong>Check your calendar</strong> — We've sent a Google Calendar invite with your Google Meet link</li>
            <li><strong>Prepare questions</strong> — Think about what you'd like to learn or achieve with AI</li>
            <li><strong>Join on time</strong> — Click the Meet link at your session time</li>
          </ol>
          <h3>Your Booking Details:</h3>
          <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">
            <p><strong>Service:</strong> {{service}}</p>
            <p><strong>Date:</strong> {{date}}</p>
            <p><strong>Meeting:</strong> <a href="{{meetLink}}">{{meetLink}}</a></p>
          </div>
          <p style="margin-top: 1.5rem;">Questions? Reply to this email or WhatsApp us at <a href="https://wa.me/61481993178">+61 481 993 178</a></p>
        </div>
        <div style="padding: 1rem; text-align: center; color: #999; font-size: 12px;">
          Longcare AU — AI-powered mentoring | <a href="https://longcare.au">longcare.au</a>
        </div>
      </div>`,
  },
  {
    id: 'welcome-2',
    name: 'Pre-session Tips',
    delay: '24h',
    subject: 'Your Session Tomorrow — 3 Tips for Maximum Value',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0b0c10, #1a1a2e); padding: 2rem; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #66fcf1; margin: 0;">Session Tomorrow!</h1>
        </div>
        <div style="padding: 2rem; background: #fff;">
          <p>Hi {{name}},</p>
          <p>Your AI mentoring session is coming up! Here are 3 tips to get the most value:</p>
          <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <p><strong>1. Bring Real Examples</strong><br>Have a specific task or problem you want AI to help with</p>
            <p><strong>2. Test Before the Session</strong><br>Try <a href="https://gemini.google.com">Google Gemini</a> or <a href="https://chat.openai.com">ChatGPT</a> for 10 minutes</p>
            <p><strong>3. Take Notes</strong><br>Don't worry too much — we'll send AI-generated notes after the session!</p>
          </div>
          <a href="{{meetLink}}" style="display: inline-block; padding: 12px 24px; background: #4285F4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Your Session</a>
        </div>
      </div>`,
  },
  {
    id: 'welcome-3',
    name: 'Post-session Follow-up',
    delay: '48h',
    subject: 'How Was Your Session? + Your AI Notes Are Ready',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0b0c10, #1a1a2e); padding: 2rem; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #66fcf1; margin: 0;">Your Notes Are Ready!</h1>
        </div>
        <div style="padding: 2rem; background: #fff;">
          <p>Hi {{name}},</p>
          <p>We hope you enjoyed your AI mentoring session! Your AI-generated notes are now available:</p>
          <a href="https://app.longcare.au" style="display: inline-block; padding: 12px 24px; background: #22c55e; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 1rem 0;">View Your Notes & Summary</a>
          <h3>Ready for More?</h3>
          <p>Based on your session, we recommend:</p>
          <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">
            <p><strong>5-Session Package — $450 AUD</strong></p>
            <p>A structured learning path to build on what you've learned. Save $45 vs individual sessions.</p>
            <a href="https://book.longcare.au" style="color: #4285F4; font-weight: bold;">Book Your Package →</a>
          </div>
          <p style="margin-top: 1.5rem; color: #666; font-size: 13px;">We'd love your feedback! Reply to this email or leave a review.</p>
        </div>
      </div>`,
  },
  {
    id: 'welcome-4',
    name: 'Re-engagement',
    delay: '7d',
    subject: 'Miss Us? Here\'s 10% Off Your Next Session',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="padding: 2rem; background: #fff;">
          <p>Hi {{name}},</p>
          <p>It's been a week since your last session. Are you ready to continue your AI journey?</p>
          <div style="background: linear-gradient(135deg, #f0fdf4, #ecfdf5); padding: 1.5rem; border-radius: 12px; text-align: center; margin: 1.5rem 0; border: 1px solid #22c55e;">
            <p style="font-size: 1.5rem; font-weight: bold; color: #22c55e; margin: 0;">10% OFF</p>
            <p style="color: #666; margin: 0.5rem 0;">Your next session — use code <strong>WELCOME10</strong></p>
          </div>
          <a href="https://book.longcare.au" style="display: inline-block; padding: 12px 24px; background: #4285F4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Book Now</a>
          <p style="margin-top: 1.5rem; color: #999; font-size: 12px;">Unsubscribe: reply STOP to opt out of marketing emails.</p>
        </div>
      </div>`,
  },
];

export function getSequenceEmail(sequenceId: string, emailId: string, vars: Record<string, string>): { subject: string; html: string } | null {
  const sequences: Record<string, DripEmail[]> = { welcome: welcomeSequence };
  const seq = sequences[sequenceId];
  if (!seq) return null;

  const email = seq.find(e => e.id === emailId);
  if (!email) return null;

  let subject = email.subject;
  let html = email.html;

  for (const [key, value] of Object.entries(vars)) {
    subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), value);
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }

  return { subject, html };
}
