import type { Metadata } from 'next';
import { Breadcrumbs } from '../../components/breadcrumbs';

export const metadata: Metadata = {
  title: 'AI Mentoring Services — Longcare AU',
  description: 'Explore our AI mentoring sessions, learning packages, and business transformation programs. From $29 AUD.',
};

const SERVICES = [
  { slug: 'ai-starter-session', name: '30-min AI Starter Session', price: '$29', description: 'Quick introduction to modern AI tools. Perfect for beginners who want to discover how AI can accelerate their daily workflows.', duration: '30 minutes' },
  { slug: 'ai-mentor-1-hour', name: '1-hour AI Mentor', price: '$99', description: 'Deep-dive mentoring tailored to your specific needs. We build custom prompts, workflows, and review your current processes.', duration: '60 minutes', popular: true },
  { slug: '5-session-package', name: '5-Session Package', price: '$450', description: 'A structured AI learning path across 5 sessions. Master generative AI, agentic workflows, and transform your business operations.', duration: '5 x 60 min' },
  { slug: '10-session-package', name: '10-Session Package', price: '$850', description: 'Comprehensive AI mastery program. From basics to advanced agentic systems, with personalised projects and assessments.', duration: '10 x 60 min' },
  { slug: 'business-transformation', name: 'AI Business Transformation', price: 'From $1,500', description: 'Premium B2B program for SMEs. We audit your operations, implement AI workflows, train your team, and measure ROI.', duration: 'Custom' },
];

export default function ServicesPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: SERVICES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            name: s.name,
            description: s.description,
            offers: {
              '@type': 'Offer',
              price: s.price.replace('$', '').replace(',', '').replace('From ', ''),
              priceCurrency: 'AUD',
            },
            provider: {
              '@type': 'Organization',
              name: 'Longcare AU',
              url: 'https://longcare.au',
            },
          },
        })),
      }) }} />
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]} />
      <h1 className="hero-title" style={{ fontSize: '3rem' }}>Our Services</h1>
      <p className="hero-subtitle">Choose the right AI mentoring path for your goals</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
        {SERVICES.map((s) => (
          <div key={s.slug} className="card" style={s.popular ? { border: '1px solid var(--accent)' } : {}}>
            {s.popular && <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: '#0b0c10', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>MOST POPULAR</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h2 className="card-title">{s.name}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{s.description}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Duration: {s.duration}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="card-price" style={{ fontSize: '2rem' }}>{s.price}</div>
                <a href={`https://book.longcare.au?service=${s.slug}`} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Book Now</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
