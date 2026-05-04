import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentors — Longcare AU',
  description: 'Meet your AI mentors at Longcare AU. Expert guidance from Dr. Long Do, our AI Learning Assistant, and guest industry mentors.',
};

const mentors = [
  {
    name: 'Dr. Long Do',
    title: 'Founder & Lead AI Mentor',
    initials: 'LD',
    color: '#66fcf1',
    expertise: ['AI Strategy', 'Prompt Engineering', 'Business Automation'],
    description:
      'With 15+ years in tech, Dr. Do founded Longcare AU and BookedAI to make AI accessible for everyone. He specialises in helping professionals and SMEs integrate AI into their workflows with measurable, practical outcomes.',
    languages: 'English, Vietnamese',
    cta: 'Book with Dr. Do',
    ctaLink: 'https://book.longcare.au',
    available: true,
  },
  {
    name: 'AI Learning Assistant',
    title: 'Powered by Gemini',
    initials: 'AI',
    color: '#45a29e',
    expertise: ['Session Notes', 'Q&A Extraction', 'Improvement Suggestions'],
    description:
      'Always available 24/7, our AI Learning Assistant provides session notes, Q&A extraction, and personalised improvement suggestions after every mentoring session. Multilingual support in English, Vietnamese, and Chinese.',
    languages: 'EN / VI / ZH',
    cta: 'Chat Now',
    ctaLink: 'https://g.longcare.au',
    available: true,
  },
  {
    name: 'Guest Mentors',
    title: 'Industry Experts (Coming Soon)',
    initials: 'GM',
    color: '#c5c6c7',
    expertise: ['Industry Workshops', 'Specialised Topics', 'Rotating Experts'],
    description:
      'We are building a network of rotating guest mentors from various industries — finance, healthcare, education, and more. Join the waitlist to be the first to know when specialised workshops become available.',
    languages: 'Various',
    cta: 'Join Waitlist',
    ctaLink: '/contact',
    available: false,
  },
];

export default function MentorsPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="hero-title" style={{ fontSize: '3rem' }}>Meet Your AI Mentors</h1>
      <p className="hero-subtitle">
        Expert guidance tailored to your goals — from hands-on AI mentoring to 24/7 learning support.
      </p>

      <div className="grid" style={{ marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {mentors.map((m) => (
          <div key={m.name} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '1.25rem', color: '#0b0c10', flexShrink: 0,
              }}>
                {m.initials}
              </div>
              <div>
                <h3 className="card-title" style={{ marginBottom: '0.25rem' }}>{m.name}</h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--accent, #66fcf1)', fontWeight: 500 }}>
                  {m.title}
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {m.expertise.map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.8rem', color: '#f8f9fa', fontWeight: 500,
                  background: 'rgba(255,255,255,0.08)', padding: '0.3rem 0.75rem',
                  borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="card-desc" style={{ flex: 1 }}>{m.description}</p>

            {/* Languages */}
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: 600, color: '#f8f9fa' }}>Languages:</span> {m.languages}
            </div>

            {/* CTA */}
            <a
              href={m.ctaLink}
              className={m.available ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ width: '100%', textAlign: 'center' }}
            >
              {m.cta}
            </a>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <div className="card" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="card-title">Want to become a guest mentor?</h2>
          <p className="card-desc">
            We are always looking for experienced professionals who want to share their AI expertise.
            If you are passionate about mentoring, get in touch.
          </p>
          <a href="/contact" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Contact Us</a>
        </div>
      </div>
    </div>
  );
}
