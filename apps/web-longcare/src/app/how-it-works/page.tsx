import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — AI Mentoring | Longcare AU',
  description: 'Learn how Longcare AI mentoring works: choose a service, book a time, join via Google Meet, learn with your mentor, and get AI-powered notes.',
};

const steps = [
  {
    number: 1,
    title: 'Choose Your Service',
    description:
      'Browse our range of AI mentoring packages. Whether you want a quick 30-minute introduction for $29 or a full business transformation program from $1,500, there is a plan for every goal.',
    detail: 'Starter, Mentor, 5-Pack, 10-Pack, or Business Transformation',
    accent: false,
  },
  {
    number: 2,
    title: 'Book a Time',
    description:
      'Select from available time slots that suit your schedule. Enter your name, email, and a brief description of your goals. You will receive an instant confirmation with your calendar invite.',
    detail: 'Flexible scheduling — mornings, evenings, and weekends available',
    accent: false,
  },
  {
    number: 3,
    title: 'Join via Google Meet',
    description:
      'At your scheduled time, click the meet.longcare.au link in your confirmation email. No software to install, no account required — it works directly in your web browser.',
    detail: 'Works on Chrome, Firefox, Safari, Edge — desktop or mobile',
    accent: true,
  },
  {
    number: 4,
    title: 'Learn with Your Mentor',
    description:
      'Your dedicated mentor delivers a personalised 1-on-1 session tailored to your skill level and objectives. Ask questions, share your screen, and get hands-on guidance with real AI tools and workflows.',
    detail: 'Live demonstrations, custom prompts, and real-world examples',
    accent: false,
  },
  {
    number: 5,
    title: 'Get AI-Powered Notes',
    description:
      'After your session, our AI (powered by Google Gemini) automatically generates a comprehensive summary, key Q&A pairs, improvement areas, and actionable recommendations — all saved to Google Docs.',
    detail: 'Delivered to your email and dashboard within minutes',
    accent: true,
  },
  {
    number: 6,
    title: 'Continue Your Journey',
    description:
      'Based on your session, AI recommends personalised next steps and follow-up topics. Book your next session, explore self-paced learning modules, or upgrade to a multi-session package to keep progressing.',
    detail: 'Progress tracking across all your sessions and learning paths',
    accent: false,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>
          How It Works
        </h1>
        <p className="hero-subtitle">
          From booking to AI-powered notes — your complete mentoring journey in 6 simple steps
        </p>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 800, margin: '0 auto' }}>
        {steps.map((step) => (
          <div
            className="card"
            key={step.number}
            style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start',
              border: step.accent ? '1px solid var(--accent, #66fcf1)' : undefined,
            }}
          >
            {/* Step number */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: step.accent
                  ? 'var(--accent, #66fcf1)'
                  : 'rgba(102, 252, 241, 0.1)',
                color: step.accent ? '#0b0c10' : 'var(--accent, #66fcf1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem',
                flexShrink: 0,
              }}
            >
              {step.number}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--text, #e0e0e0)',
                }}
              >
                {step.title}
              </h2>
              <p
                style={{
                  color: 'var(--text-muted, #9ba1a6)',
                  lineHeight: 1.8,
                  fontSize: '0.9rem',
                  marginBottom: '0.75rem',
                }}
              >
                {step.description}
              </p>
              <p
                style={{
                  color: 'var(--accent, #66fcf1)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  opacity: 0.8,
                }}
              >
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          borderRadius: '1rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          marginTop: '3rem',
          maxWidth: 800,
          margin: '3rem auto 0',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Ready to start?
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Book your first AI mentoring session today. From just $29 AUD.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://book.longcare.au" className="btn btn-primary">
            Book Now
          </a>
          <a href="/pricing" className="btn btn-outline">
            View Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
