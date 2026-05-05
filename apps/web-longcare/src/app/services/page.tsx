import type { Metadata } from 'next';
import { Breadcrumbs } from '../../components/breadcrumbs';

export const metadata: Metadata = {
  title: 'AI Mentoring Services Australia — From $29 | BookedAI by Longcare',
  description:
    'Book AI mentoring sessions online in Australia. 30-min starter ($29), 1-hour deep-dive ($99), or multi-session packages ($450-$850). GST-inclusive. Google Meet 1-on-1.',
  keywords: [
    'AI mentoring Australia',
    'AI tutoring online',
    'book AI session',
    'AI coaching Melbourne',
    'AI mentor Sydney',
    'AI training Brisbane',
    'prompt engineering course',
    'AI for business Australia',
    'ChatGPT training',
    'Gemini AI mentor',
  ],
  openGraph: {
    title: 'AI Mentoring Services — From $29 AUD | BookedAI',
    description:
      'Personalised AI mentoring for individuals and SMEs. Book online, meet via Google Meet, get AI-generated notes.',
    url: 'https://longcare.au/services',
    siteName: 'Longcare AU — Powered by BookedAI',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://longcare.au/api/og?title=AI+Mentoring+Services&subtitle=From+$29+AUD',
        width: 1200,
        height: 630,
        alt: 'AI Mentoring Services — BookedAI by Longcare',
      },
    ],
  },
  alternates: {
    canonical: 'https://longcare.au/services',
  },
};

const SERVICES = [
  {
    slug: 'ai-starter',
    name: '30-Min AI Starter',
    price: '$29',
    priceNum: '29.00',
    description:
      'A quick, low-friction introduction to modern AI tools. Perfect for beginners who want to discover how AI can accelerate their daily workflows.',
    duration: '30 minutes',
    features: ['Live Google Meet session', 'AI-generated session notes', 'Next steps recommendation'],
    cta: 'Book Starter Session',
    ctaStyle: 'btn btn-outline',
    bookingUrl: 'https://booking.g.bookedai.au?service=starter-30min',
    highlight: false,
  },
  {
    slug: 'ai-mentor',
    name: '1-Hour AI Mentor',
    price: '$99',
    priceNum: '99.00',
    description:
      'Deep-dive mentoring tailored to your specific needs. We build custom prompts, workflows, and review your current processes.',
    duration: '60 minutes',
    features: [
      '60 minutes 1-on-1 via Google Meet',
      'Custom AI workflows built for you',
      'AI session summary and Q&A',
      'Personalised learning path',
    ],
    cta: 'Book Mentor Session',
    ctaStyle: 'btn btn-primary',
    bookingUrl: 'https://booking.g.bookedai.au?service=mentor-1h',
    highlight: true,
  },
  {
    slug: 'packages',
    name: '5-Session Package',
    price: '$450',
    priceNum: '450.00',
    description:
      'A structured AI learning path across 5 sessions. Master generative AI, agentic workflows, and transform your business operations.',
    duration: '5 x 60 min',
    features: [
      '5 x 60-minute sessions',
      'Progress tracking dashboard',
      'All AI notes and recordings',
      'Priority scheduling',
    ],
    cta: 'View Packages',
    ctaStyle: 'btn btn-outline',
    bookingUrl: 'https://booking.g.bookedai.au?service=package-5',
    highlight: false,
  },
  {
    slug: 'packages',
    name: '10-Session Package',
    price: '$850',
    priceNum: '850.00',
    description:
      'Comprehensive AI mastery program. From basics to advanced agentic systems, with personalised projects and assessments.',
    duration: '10 x 60 min',
    features: [
      '10 x 60-minute sessions',
      'Dedicated mentor assigned',
      'Full progress dashboard',
      'Priority scheduling',
      'All AI notes and recordings',
    ],
    cta: 'View Packages',
    ctaStyle: 'btn btn-outline',
    bookingUrl: 'https://booking.g.bookedai.au?service=package-10',
    highlight: false,
  },
];

export default function ServicesPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Mentoring Services — Longcare AU',
    description: 'AI mentoring sessions and packages for individuals and SMEs in Australia.',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        url: `https://longcare.au/services/${s.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'Longcare AU',
          url: 'https://longcare.au',
        },
        areaServed: { '@type': 'Country', name: 'Australia' },
        offers: {
          '@type': 'Offer',
          price: s.priceNum,
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>
          AI Mentoring Services
        </h1>
        <p className="hero-subtitle">
          Personalised AI mentoring for individuals and SMEs across Australia.
          Choose your session, book online, and meet your mentor via Google Meet.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          All prices in AUD and include GST. Powered by{' '}
          <a href="https://g.bookedai.au" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            bookedai.au
          </a>
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid" style={{ marginBottom: '4rem' }}>
        {SERVICES.map((s, i) => (
          <div
            key={`${s.slug}-${i}`}
            className="card"
            style={s.highlight ? { border: '1px solid var(--accent)' } : {}}
          >
            {s.highlight && (
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--accent)',
                  color: '#0b0c10',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                }}
              >
                MOST POPULAR
              </div>
            )}
            <h2 className="card-title">{s.name}</h2>
            <div className="card-price">
              <span>{s.price}</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                {s.duration.startsWith('5') || s.duration.startsWith('10') ? ' / package' : ' / session'}
              </span>
            </div>
            <p className="card-desc">{s.description}</p>
            <ul
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
                paddingLeft: '1.2rem',
              }}
            >
              {s.features.map((f) => (
                <li key={f} style={{ marginBottom: '0.3rem' }}>
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              <a href={s.bookingUrl} className={s.ctaStyle} style={{ flex: 1 }}>
                {s.cta}
              </a>
              <a
                href={`/services/${s.slug}`}
                className="btn btn-outline"
                style={{ flex: 1, borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-muted)' }}
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          {[
            { num: 1, title: 'Choose', desc: 'Pick a session type that suits your goals and budget' },
            { num: 2, title: 'Book', desc: 'Select a time slot and pay securely online via Stripe' },
            { num: 3, title: 'Meet', desc: 'Join your 1-on-1 Google Meet session with an AI mentor' },
            { num: 4, title: 'Grow', desc: 'Receive AI-generated notes, action items, and a learning path' },
          ].map((step) => (
            <div key={step.num} className="step-item">
              <div className="step-number">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <h2>Not sure which service is right for you?</h2>
        <p>
          Start with a $29 AI Starter session. No commitment, no risk. See how AI mentoring can accelerate your career or business.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://booking.g.bookedai.au?service=starter-30min" className="btn btn-primary">
            Book $29 Starter
          </a>
          <a href="/pricing" className="btn btn-outline">
            Compare All Plans
          </a>
        </div>
      </div>
    </div>
  );
}
