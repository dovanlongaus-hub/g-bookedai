import type { Metadata } from 'next';
import { Breadcrumbs } from '../../../components/breadcrumbs';

export const metadata: Metadata = {
  title: 'AI Mentoring Packages — 5-Pack $450, 10-Pack $850 | Longcare AU',
  description:
    'Save up to $150 with AI mentoring packages. 5-session pack ($450) or 10-session pack ($850). Structured learning paths, progress tracking, and priority scheduling. Australia-wide.',
  keywords: [
    'AI mentoring package Australia',
    'bulk AI sessions',
    'AI training package',
    'AI learning program',
    'AI mentoring discount',
    'AI course package Melbourne',
    'structured AI training',
    '5 session AI pack',
    '10 session AI pack',
    'AI coaching program Australia',
  ],
  openGraph: {
    title: 'AI Mentoring Packages — Save Up to $150 | Longcare AU',
    description:
      '5-session ($450) and 10-session ($850) AI mentoring packages with progress tracking, priority scheduling, and dedicated mentors.',
    url: 'https://longcare.au/services/packages',
    siteName: 'Longcare AU — Powered by BookedAI',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://longcare.au/api/og?title=AI+Mentoring+Packages&subtitle=From+$450+AUD',
        width: 1200,
        height: 630,
        alt: 'AI Mentoring Packages — Longcare AU',
      },
    ],
  },
  alternates: {
    canonical: 'https://longcare.au/services/packages',
  },
};

const PACKAGES = [
  {
    name: '5-Session Package',
    price: '$450',
    priceNum: '450.00',
    savings: 'Save $45 vs single sessions',
    duration: '5 x 60 min',
    description:
      'A structured AI learning path across 5 sessions. Master generative AI, agentic workflows, and transform your business operations step by step.',
    features: [
      '5 x 60-minute 1-on-1 sessions',
      'Structured learning curriculum',
      'Progress tracking dashboard',
      'All AI-generated notes and recordings',
      'Priority scheduling',
      'Email support between sessions',
    ],
    bookingUrl: 'https://booking.g.bookedai.au?service=package-5',
    highlight: false,
  },
  {
    name: '10-Session Package',
    price: '$850',
    priceNum: '850.00',
    savings: 'Save $150 vs single sessions',
    duration: '10 x 60 min',
    description:
      'Comprehensive AI mastery program. From basics to advanced agentic systems, with personalised projects, assessments, and a dedicated mentor.',
    features: [
      '10 x 60-minute 1-on-1 sessions',
      'Dedicated mentor assigned to you',
      'Full progress tracking dashboard',
      'All AI-generated notes and recordings',
      'Priority scheduling',
      'Email and chat support between sessions',
      'Completion certificate',
      'Custom AI project guidance',
    ],
    bookingUrl: 'https://booking.g.bookedai.au?service=package-10',
    highlight: true,
  },
];

const FAQ_ITEMS = [
  {
    q: 'How are the sessions scheduled?',
    a: 'You book each session individually at a time that suits you. Package holders get priority scheduling, meaning you have access to more time slots and earlier booking windows.',
  },
  {
    q: 'Do I need to use all sessions within a time period?',
    a: 'Packages are valid for 6 months from purchase. We recommend weekly or fortnightly sessions for the best learning outcomes, but you can schedule at your own pace.',
  },
  {
    q: 'Can I share the package with a colleague?',
    a: 'Packages are designed for individual use to ensure a consistent learning path. For team training, contact us about our Business Transformation program.',
  },
  {
    q: 'What is the 5-session curriculum?',
    a: 'We customise each package to your goals, but a typical 5-session path covers: (1) AI fundamentals and prompting, (2) Advanced prompt engineering, (3) AI workflow automation, (4) AI tools for your specific domain, (5) Building your AI strategy and next steps.',
  },
  {
    q: 'What does the 10-session program include?',
    a: 'The 10-session program expands on the 5-session path to include agentic AI systems, multi-tool integrations, custom AI project work, team training strategies, and advanced topics like fine-tuning and API integrations.',
  },
  {
    q: 'Can I upgrade from 5-pack to 10-pack?',
    a: 'Yes. If you purchase a 5-session pack and want to upgrade, we will credit the difference. Contact ceo@longcare.au to arrange an upgrade.',
  },
];

export default function PackagesPage() {
  const serviceSchemas = PACKAGES.map((pkg) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pkg.name,
    description: pkg.description,
    provider: {
      '@type': 'Organization',
      name: 'Longcare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI Mentoring Package',
    offers: {
      '@type': 'Offer',
      price: pkg.priceNum,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: pkg.bookingUrl,
    },
  }));

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
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Packages', url: '/services/packages' },
        ]}
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>
          AI Mentoring Packages
        </h1>
        <p className="hero-subtitle">
          Commit to your AI learning journey and save. Structured programs with progress tracking,
          priority scheduling, and dedicated mentors.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', marginBottom: '4rem' }}>
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className="card"
            style={pkg.highlight ? { border: '1px solid var(--accent)' } : {}}
          >
            {pkg.highlight && (
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
                BEST VALUE
              </div>
            )}
            <h2 className="card-title">{pkg.name}</h2>
            <div className="card-price">
              <span>{pkg.price}</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / package</span>
            </div>
            <p
              style={{
                color: 'var(--accent)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              {pkg.savings}
            </p>
            <p className="card-desc">{pkg.description}</p>
            <ul
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
                paddingLeft: '1.2rem',
              }}
            >
              {pkg.features.map((f) => (
                <li key={f} style={{ marginBottom: '0.3rem' }}>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={pkg.bookingUrl}
              className={pkg.highlight ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ width: '100%', marginTop: 'auto' }}
            >
              Select {pkg.name}
            </a>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">Package Comparison</h2>
        <div style={{ maxWidth: '700px', margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '0.75rem' }}>5-Pack $450</th>
                <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--accent)' }}>10-Pack $850</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Total Sessions', five: '5', ten: '10' },
                { feature: 'Per Session Cost', five: '$90', ten: '$85' },
                { feature: 'Total Savings', five: '$45', ten: '$150' },
                { feature: 'Session Duration', five: '60 min', ten: '60 min' },
                { feature: 'Progress Tracking', five: 'Yes', ten: 'Yes' },
                { feature: 'Priority Scheduling', five: 'Yes', ten: 'Yes' },
                { feature: 'Dedicated Mentor', five: '-', ten: 'Yes' },
                { feature: 'Completion Certificate', five: '-', ten: 'Yes' },
                { feature: 'Custom AI Project', five: '-', ten: 'Yes' },
              ].map((row) => (
                <tr key={row.feature} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem' }}>{row.feature}</td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      color: row.five === 'Yes' ? 'var(--accent)' : row.five === '-' ? 'rgba(255,255,255,0.2)' : 'inherit',
                    }}
                  >
                    {row.five}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      color: row.ten === 'Yes' ? 'var(--accent)' : 'inherit',
                    }}
                  >
                    {row.ten}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sample 5-Session Curriculum */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">Sample 5-Session Curriculum</h2>
        <div className="steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { num: 1, title: 'AI Fundamentals', desc: 'Core concepts, tools overview, first prompts' },
            { num: 2, title: 'Prompt Engineering', desc: 'Advanced prompting, chain-of-thought, few-shot' },
            { num: 3, title: 'Workflow Automation', desc: 'Automate repetitive tasks with AI pipelines' },
            { num: 4, title: 'Domain Application', desc: 'AI tools tailored to your industry or role' },
            { num: 5, title: 'Strategy & Next Steps', desc: 'Build your AI roadmap and action plan' },
          ].map((step) => (
            <div key={step.num} className="step-item">
              <div className="step-number">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
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
        <h2>Invest in your AI skills</h2>
        <p>
          Choose the package that fits your goals. Save money, get structured learning, and track your progress over time.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://booking.g.bookedai.au?service=package-5" className="btn btn-outline">
            5-Pack — $450
          </a>
          <a href="https://booking.g.bookedai.au?service=package-10" className="btn btn-primary">
            10-Pack — $850
          </a>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
          Not ready for a package?{' '}
          <a href="/services/ai-starter" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            Try a single $29 Starter session
          </a>
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Powered by{' '}
          <a href="https://g.bookedai.au" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            bookedai.au
          </a>{' '}
          | All prices AUD, GST-inclusive | Valid 6 months
        </p>
      </div>
    </div>
  );
}
