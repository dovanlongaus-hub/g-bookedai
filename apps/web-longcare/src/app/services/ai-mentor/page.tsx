import type { Metadata } from 'next';
import { Breadcrumbs } from '../../../components/breadcrumbs';

export const metadata: Metadata = {
  title: '1-Hour AI Mentor Session $99 — Deep-Dive Coaching | Longcare AU',
  description:
    'Book a 1-hour AI mentoring session for $99 AUD. Personalised deep-dive into AI workflows, prompt engineering, and automation. Live Google Meet with an expert AI mentor in Australia.',
  keywords: [
    'AI mentor session Australia',
    'AI coaching 1 hour',
    'prompt engineering mentor',
    'AI workflow consulting',
    'AI deep dive session',
    'personalised AI training',
    'AI automation mentor Melbourne',
    'AI strategy session Sydney',
    'book AI expert online',
    'AI business coaching Australia',
  ],
  openGraph: {
    title: '1-Hour AI Mentor Session — $99 AUD | Longcare AU',
    description:
      'Deep-dive AI mentoring tailored to your needs. Custom prompts, workflows, and a personalised learning path. $99 AUD via Google Meet.',
    url: 'https://longcare.au/services/ai-mentor',
    siteName: 'Longcare AU — Powered by BookedAI',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://longcare.au/api/og?title=AI+Mentor+Session&subtitle=$99+AUD+—+60+Minutes',
        width: 1200,
        height: 630,
        alt: '1-Hour AI Mentor Session — $99',
      },
    ],
  },
  alternates: {
    canonical: 'https://longcare.au/services/ai-mentor',
  },
};

const BENEFITS = [
  {
    title: '60 Minutes 1-on-1',
    desc: 'A full hour of dedicated mentoring via Google Meet. Enough time to tackle real problems, build workflows, and get hands-on practice.',
  },
  {
    title: 'Custom AI Workflows',
    desc: 'We build AI prompts and workflows tailored to your specific role, industry, or business. Not generic tutorials — real solutions you can use tomorrow.',
  },
  {
    title: 'AI Session Summary',
    desc: 'After the session, you receive AI-generated notes including key decisions, action items, code snippets, and a Q&A summary.',
  },
  {
    title: 'Personalised Learning Path',
    desc: 'A structured plan for continuing your AI development, including recommended tools, resources, and follow-up session suggestions.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What topics can we cover in 1 hour?',
    a: 'Common topics include prompt engineering, AI-assisted writing, data analysis with AI, building automations, AI strategy for your business, evaluating AI tools, and integrating AI into existing workflows. We customise to your goals.',
  },
  {
    q: 'How is this different from the $29 Starter?',
    a: 'The Starter is a 30-minute introduction for beginners. The AI Mentor session is a full 60 minutes of deep-dive work where we build custom prompts, review your workflows, and create a personalised learning path. It is hands-on and outcome-focused.',
  },
  {
    q: 'Can I use this for my business?',
    a: 'Absolutely. Many clients use the AI Mentor session to explore AI opportunities for their business, build automation workflows, or develop an AI strategy. For larger team training, consider our packages or Business Transformation program.',
  },
  {
    q: 'What do I need to prepare?',
    a: 'Before the session you will receive a short intake form to share your goals and current skill level. Have a few specific challenges or questions ready to make the most of your time. Bring any relevant documents or workflows you want to improve.',
  },
  {
    q: 'Is there a satisfaction guarantee?',
    a: 'If you are not satisfied with your session, contact us within 24 hours and we will arrange a follow-up or credit. You can cancel or reschedule free up to 24 hours before.',
  },
];

export default function AIMentorPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '1-Hour AI Mentor Session',
    description:
      'A 60-minute deep-dive AI mentoring session. Get custom AI workflows, prompt engineering guidance, and a personalised learning path via live Google Meet.',
    provider: {
      '@type': 'Organization',
      name: 'Longcare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI Mentoring',
    offers: {
      '@type': 'Offer',
      price: '99.00',
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: 'https://booking.g.bookedai.au?service=mentor-1h',
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
          { name: 'AI Mentor', url: '/services/ai-mentor' },
        ]}
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: '#0b0c10',
            borderRadius: '20px',
            padding: '0.3rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
          }}
        >
          MOST POPULAR
        </div>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>
          1-Hour AI Mentor Session
        </h1>
        <p className="hero-subtitle">
          Deep-dive AI mentoring tailored to your specific needs. We build custom prompts,
          workflows, and a personalised learning path — all in 60 minutes.
        </p>
        <div className="card-price" style={{ justifyContent: 'center', fontSize: '3rem', marginBottom: '1.5rem' }}>
          <span>$99</span>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>AUD / session</span>
        </div>
        <a
          href="https://booking.g.bookedai.au?service=mentor-1h"
          className="btn btn-primary"
          style={{ marginRight: '1rem' }}
        >
          Book Now for $99
        </a>
        <a href="/services" className="btn btn-outline">
          View All Services
        </a>
      </div>

      {/* Benefits */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">What You Get</h2>
        <div className="grid">
          {BENEFITS.map((b) => (
            <div key={b.title} className="card">
              <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{b.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">Popular Use Cases</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            'Build custom ChatGPT/Gemini prompts for your workflow',
            'Automate repetitive tasks with AI (emails, reports, data entry)',
            'Develop an AI strategy roadmap for your SME',
            'Learn prompt engineering techniques for better AI outputs',
            'Evaluate and compare AI tools for your specific use case',
            'Integrate AI into your existing tech stack',
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

      {/* Comparison */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">Starter vs Mentor</h2>
        <div style={{ maxWidth: '700px', margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '0.75rem' }}>Starter $29</th>
                <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--accent)' }}>Mentor $99</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Duration', starter: '30 min', mentor: '60 min' },
                { feature: 'Google Meet 1-on-1', starter: 'Yes', mentor: 'Yes' },
                { feature: 'AI-Generated Notes', starter: 'Yes', mentor: 'Yes' },
                { feature: 'Custom AI Workflows', starter: '-', mentor: 'Yes' },
                { feature: 'Personalised Learning Path', starter: '-', mentor: 'Yes' },
                { feature: 'Session Q&A Summary', starter: '-', mentor: 'Yes' },
              ].map((row) => (
                <tr key={row.feature} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem' }}>{row.feature}</td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      color: row.starter === 'Yes' ? 'var(--accent)' : row.starter === '-' ? 'rgba(255,255,255,0.2)' : 'inherit',
                    }}
                  >
                    {row.starter}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      color: row.mentor === 'Yes' ? 'var(--accent)' : 'inherit',
                    }}
                  >
                    {row.mentor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <h2>Ready for a deep-dive AI session?</h2>
        <p>
          Book your 1-hour AI Mentor session and walk away with custom workflows, actionable insights, and a clear path forward.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://booking.g.bookedai.au?service=mentor-1h" className="btn btn-primary">
            Book $99 Mentor Session
          </a>
          <a href="/services/packages" className="btn btn-outline">
            Save with Packages
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
