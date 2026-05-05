import type { Metadata } from 'next';
import { Breadcrumbs } from '../../../components/breadcrumbs';

export const metadata: Metadata = {
  title: '30-Min AI Starter Session $29 — Book Online | Longcare AU',
  description:
    'Book a 30-minute AI starter session for just $29 AUD. Perfect introduction to ChatGPT, Gemini, and AI tools for beginners. Live Google Meet with an AI mentor in Australia.',
  keywords: [
    'AI starter session',
    'AI for beginners Australia',
    'learn AI online',
    'AI introduction session',
    'ChatGPT tutorial Melbourne',
    'Gemini AI training',
    'AI coaching 30 minutes',
    'cheap AI mentoring',
    'AI tools for beginners',
    'book AI session online',
  ],
  openGraph: {
    title: '30-Min AI Starter Session — $29 AUD | Longcare AU',
    description:
      'Get started with AI in just 30 minutes. Live 1-on-1 Google Meet session with an AI mentor. Only $29.',
    url: 'https://longcare.au/services/ai-starter',
    siteName: 'Longcare AU — Powered by BookedAI',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://longcare.au/api/og?title=AI+Starter+Session&subtitle=$29+AUD+—+30+Minutes',
        width: 1200,
        height: 630,
        alt: '30-Min AI Starter Session — $29',
      },
    ],
  },
  alternates: {
    canonical: 'https://longcare.au/services/ai-starter',
  },
};

const FAQ_ITEMS = [
  {
    q: 'What will I learn in 30 minutes?',
    a: 'You will learn the fundamentals of using AI tools like ChatGPT and Gemini effectively. We cover prompt basics, practical use cases for your role, and how to get better outputs from AI. You will leave with actionable tips you can use immediately.',
  },
  {
    q: 'Do I need any AI experience?',
    a: 'No. The AI Starter session is designed for complete beginners. Whether you have never used an AI tool or just want to improve your skills, we start from wherever you are.',
  },
  {
    q: 'How is the session delivered?',
    a: 'The session is a live 1-on-1 video call via Google Meet. You will receive a meeting link after booking. All you need is a browser and internet connection.',
  },
  {
    q: 'What happens after the session?',
    a: 'You receive AI-generated session notes with key takeaways, plus a personalised recommendation for your next steps. Many clients upgrade to the 1-hour AI Mentor session.',
  },
  {
    q: 'Can I get a refund?',
    a: 'You can cancel or reschedule free of charge up to 24 hours before your session. Contact us at ceo@longcare.au for any issues.',
  },
];

export default function AIStarterPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '30-Min AI Starter Session',
    description:
      'A 30-minute live AI mentoring session for beginners. Learn the fundamentals of ChatGPT, Gemini, and AI tools with personalised guidance via Google Meet.',
    provider: {
      '@type': 'Organization',
      name: 'Longcare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI Mentoring',
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: 'https://booking.g.bookedai.au?service=starter-30min',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'AI Starter', url: '/services/ai-starter' },
        ]}
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(102, 252, 241, 0.1)',
            border: '1px solid rgba(102, 252, 241, 0.2)',
            borderRadius: '20px',
            padding: '0.3rem 1rem',
            fontSize: '0.85rem',
            color: 'var(--accent)',
            marginBottom: '1.5rem',
          }}
        >
          Best for beginners
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>
          30-Min AI Starter Session
        </h1>
        <p className="hero-subtitle">
          Discover how AI can accelerate your daily workflows in just 30 minutes.
          Live 1-on-1 Google Meet with an experienced AI mentor.
        </p>
        <div className="card-price" style={{ justifyContent: 'center', fontSize: '3rem', marginBottom: '1.5rem' }}>
          <span>$29</span>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>AUD / session</span>
        </div>
        <a
          href="https://booking.g.bookedai.au?service=starter-30min"
          className="btn btn-primary"
          style={{ marginRight: '1rem' }}
        >
          Book Now for $29
        </a>
        <a href="/services" className="btn btn-outline">
          View All Services
        </a>
      </div>

      {/* Benefits */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">What You Get</h2>
        <div className="grid">
          {[
            {
              title: 'Live 1-on-1 Session',
              desc: '30 minutes of personalised guidance via Google Meet. Ask anything about AI tools, prompting, or automation.',
            },
            {
              title: 'AI-Generated Notes',
              desc: 'After the session, receive a comprehensive summary with key takeaways, tips, and resources curated by AI.',
            },
            {
              title: 'Next Steps Plan',
              desc: 'Get a personalised recommendation for your AI learning journey, whether you are an individual or running a business.',
            },
          ].map((b) => (
            <div key={b.title} className="card">
              <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{b.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who Is This For */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">Who Is This For?</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            'Professionals curious about AI but unsure where to start',
            'Small business owners wanting to understand AI opportunities',
            'Students looking to build AI skills for their career',
            'Anyone who has tried ChatGPT or Gemini but wants to use them better',
          ].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '1rem',
                background: 'var(--card-bg)',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
              }}
            >
              <span style={{ color: 'var(--accent)', fontSize: '1.2rem', flexShrink: 0 }}>&#10003;</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question" style={{ listStyle: 'none' }}>
                <span>{faq.q}</span>
                <span style={{ color: 'var(--accent)' }}>+</span>
              </summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <div className="cta-banner">
        <h2>Start your AI journey for just $29</h2>
        <p>
          No commitment. No risk. Book a 30-minute session and see how AI mentoring can help you or your business.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://booking.g.bookedai.au?service=starter-30min" className="btn btn-primary">
            Book $29 Starter
          </a>
          <a href="/services/ai-mentor" className="btn btn-outline">
            Or Try 1-Hour Mentor ($99)
          </a>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
          Powered by{' '}
          <a href="https://g.bookedai.au" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            bookedai.au
          </a>{' '}
          | Pay by card or bank transfer | Cancel free 24h before
        </p>
      </div>
    </div>
  );
}
