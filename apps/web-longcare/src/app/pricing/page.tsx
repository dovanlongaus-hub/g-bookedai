import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — AI Mentoring | Longcare AU',
  description: 'AI mentoring from $29 AUD. Compare all plans: Starter, Mentor, Packages, and Business Transformation.',
};

const plans = [
  {
    name: '30-Min AI Starter',
    price: '$29',
    standardPrice: '$49',
    tag: 'Launch Price',
    description: 'Quick intro to AI tools for beginners.',
    features: [
      'Live Google Meet session',
      'AI-generated notes',
      'Next steps recommendation',
    ],
    cta: 'Get Started',
    ctaStyle: 'btn btn-outline',
    highlight: false,
  },
  {
    name: '1-Hour AI Mentor',
    price: '$99',
    standardPrice: '$120',
    tag: 'Intro Price',
    description: 'Deep-dive personalised mentoring tailored to your needs.',
    features: [
      '60 minutes 1-on-1',
      'Custom AI workflows',
      'AI session summary + Q&A',
      'Personalised learning path',
    ],
    cta: 'Book Now',
    ctaStyle: 'btn btn-primary',
    highlight: true,
  },
  {
    name: '5-Session Package',
    price: '$450',
    standardPrice: null,
    tag: 'Save $45',
    description: 'Structured learning path across 5 sessions.',
    features: [
      '5 x 60min sessions',
      'Progress tracking',
      'All AI notes & recordings',
      'Priority scheduling',
    ],
    cta: 'Select Package',
    ctaStyle: 'btn btn-outline',
    highlight: false,
  },
  {
    name: '10-Session Package',
    price: '$850',
    standardPrice: null,
    tag: 'Save $150',
    description: 'Comprehensive transformation over 10 sessions.',
    features: [
      '10 x 60min sessions',
      'Dedicated mentor',
      'Full progress dashboard',
      'Priority scheduling',
      'All AI notes & recordings',
    ],
    cta: 'Select Package',
    ctaStyle: 'btn btn-outline',
    highlight: false,
  },
];

const businessPlan = {
  name: 'AI Business Transformation',
  price: '$1,500 — $3,000+',
  description: 'End-to-end AI strategy and implementation for your business. Scope and pricing tailored to your needs.',
  features: [
    'AI readiness assessment',
    'Custom AI workflow design',
    'Team training & onboarding',
    'Implementation support',
    'Ongoing optimisation',
    'Dedicated account manager',
  ],
};

const learningPlans = [
  {
    name: 'Single Lesson',
    price: '$19 — $29',
    description: 'Self-paced AI learning module with quizzes and exercises.',
    features: [
      'Interactive lesson content',
      'Quizzes & exercises',
      'Completion certificate',
    ],
  },
  {
    name: 'Module of 5 Lessons',
    price: '$79 — $149',
    description: 'Complete learning module covering a full AI topic area.',
    features: [
      '5 structured lessons',
      'Progressive difficulty',
      'All quizzes & exercises',
      'Module completion certificate',
      'Bonus resources',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Simple, Transparent Pricing</h1>
        <p className="hero-subtitle">All prices in AUD and include GST. No hidden fees. Cancel free 24 hours before your session.</p>
      </div>

      {/* Mentoring Plans */}
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Mentoring Sessions</h2>
      <div className="grid" style={{ marginBottom: '3rem' }}>
        {plans.map((plan) => (
          <div
            className="card"
            key={plan.name}
            style={plan.highlight ? { border: '1px solid var(--accent)', position: 'relative' } : { position: 'relative' }}
          >
            {plan.tag && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: plan.highlight ? 'var(--accent)' : 'var(--text-muted)', color: '#0b0c10', fontSize: '0.7rem', fontWeight: 'bold', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                {plan.tag}
              </div>
            )}
            <h3 className="card-title">{plan.name}</h3>
            <div className="card-price">
              <span>{plan.price}</span>
              {plan.standardPrice && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                  {plan.standardPrice}
                </span>
              )}
            </div>
            <p className="card-desc">{plan.description}</p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="https://book.longcare.au" className={plan.ctaStyle} style={{ width: '100%' }}>{plan.cta}</a>
          </div>
        ))}
      </div>

      {/* Business Transformation */}
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Business Transformation</h2>
      <div style={{ maxWidth: '700px', margin: '0 auto 3rem auto' }}>
        <div className="card" style={{ border: '1px solid var(--accent)' }}>
          <h3 className="card-title">{businessPlan.name}</h3>
          <div className="card-price"><span>{businessPlan.price}</span></div>
          <p className="card-desc">{businessPlan.description}</p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
            {businessPlan.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a href="https://wa.me/61481993178?text=Hi%2C%20I%27m%20interested%20in%20AI%20Business%20Transformation" className="btn btn-primary" style={{ width: '100%' }}>Contact Us</a>
        </div>
      </div>

      {/* Self-Paced Learning */}
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Self-Paced Learning</h2>
      <div className="grid" style={{ maxWidth: '700px', margin: '0 auto 3rem auto' }}>
        {learningPlans.map((plan) => (
          <div className="card" key={plan.name}>
            <h3 className="card-title">{plan.name}</h3>
            <div className="card-price"><span>{plan.price}</span></div>
            <p className="card-desc">{plan.description}</p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="https://book.longcare.au" className="btn btn-outline" style={{ width: '100%' }}>Browse Lessons</a>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Compare Plans</h2>
      <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text)' }}>Feature</th>
              <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text)' }}>Starter $29</th>
              <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--accent)' }}>Mentor $99</th>
              <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text)' }}>5-Pack $450</th>
              <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text)' }}>10-Pack $850</th>
            </tr>
          </thead>
          <tbody>
            {[
              { feature: 'Session Duration', values: ['30 min', '60 min', '60 min', '60 min'] },
              { feature: 'Number of Sessions', values: ['1', '1', '5', '10'] },
              { feature: 'Google Meet 1-on-1', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
              { feature: 'AI-Generated Notes', values: ['Yes', 'Yes', 'Yes', 'Yes'] },
              { feature: 'Custom AI Workflows', values: ['-', 'Yes', 'Yes', 'Yes'] },
              { feature: 'Personalised Learning Path', values: ['-', 'Yes', 'Yes', 'Yes'] },
              { feature: 'Progress Tracking', values: ['-', '-', 'Yes', 'Yes'] },
              { feature: 'Priority Scheduling', values: ['-', '-', 'Yes', 'Yes'] },
              { feature: 'Dedicated Mentor', values: ['-', '-', '-', 'Yes'] },
            ].map((row) => (
              <tr key={row.feature} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.75rem' }}>{row.feature}</td>
                {row.values.map((val, i) => (
                  <td key={i} style={{ textAlign: 'center', padding: '0.75rem', color: val === 'Yes' ? 'var(--accent)' : val === '-' ? 'rgba(255,255,255,0.2)' : 'inherit' }}>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Final CTA */}
      <div style={{ textAlign: 'center', padding: '2rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to get started?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Book your first session today and start your AI journey.</p>
        <a href="https://book.longcare.au" className="btn btn-primary">Book Now</a>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>All sessions via Google Meet | Pay by card, QR, or Pay Later | Cancel free 24h before</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Questions? WhatsApp <a href="https://wa.me/61481993178" style={{ color: 'var(--accent)' }}>+61 481 993 178</a></p>
      </div>
    </div>
  );
}
