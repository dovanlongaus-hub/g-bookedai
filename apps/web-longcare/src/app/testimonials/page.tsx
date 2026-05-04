import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials — Longcare AU',
  description: 'Read what our clients say about Longcare AI mentoring sessions. Real stories from professionals and SMEs across Australia.',
};

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow',
    initials: 'SC',
    color: '#66fcf1',
    stars: 5,
    service: '1-hour AI Mentor',
    quote: 'The AI mentoring session completely changed how I approach product development. Dr. Do helped me integrate AI-driven user research into our sprint process, and we\'ve cut our discovery phase by 40%. Absolutely worth every dollar.',
  },
  {
    name: 'James Nguyen',
    role: 'Founder',
    company: 'VietBiz AU',
    initials: 'JN',
    color: '#45a29e',
    stars: 5,
    service: '5-Session Package',
    quote: 'Bu\u1ed5i mentoring r\u1ea5t h\u1eefu \u00edch. T\u00f4i \u0111\u00e3 \u00e1p d\u1ee5ng AI v\u00e0o quy tr\u00ecnh kinh doanh ngay sau \u0111\u00f3. Dr. Do hi\u1ec3u r\u00f5 c\u1ed9ng \u0111\u1ed3ng Vi\u1ec7t v\u00e0 gi\u00fap t\u00f4i t\u1eadn d\u1ee5ng AI \u0111\u1ec3 ph\u1ee5c v\u1ee5 kh\u00e1ch h\u00e0ng t\u1ed1t h\u01a1n.',
  },
  {
    name: 'Michael Thompson',
    role: 'Operations Director',
    company: 'GreenScale',
    initials: 'MT',
    color: '#c5c6c7',
    stars: 5,
    service: '5-Session Package',
    quote: 'The 5-session package gave our team a structured path from AI-curious to AI-competent. We automated three key workflows and our ops team now saves 15 hours a week. The session notes with action items kept us accountable between sessions.',
  },
  {
    name: 'Linh Tran',
    role: 'Data Scientist',
    company: 'DataVerse',
    initials: 'LT',
    color: '#66fcf1',
    stars: 5,
    service: '1-hour AI Mentor',
    quote: 'The session notes with Q&A extraction saved me hours of documentation. I came in wanting to improve my prompt engineering for data analysis, and left with a complete framework I still use daily. The AI-generated summary was incredibly detailed.',
  },
  {
    name: 'David Kim',
    role: 'CEO',
    company: 'KimConsulting',
    initials: 'DK',
    color: '#45a29e',
    stars: 5,
    service: 'Business Transformation',
    quote: 'The Business Transformation program was worth every dollar. We went from zero AI adoption to having AI embedded in our client delivery, internal ops, and marketing. Revenue increased 25% in the first quarter after implementation.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'HR Manager',
    company: 'PeopleFirst',
    initials: 'ER',
    color: '#c5c6c7',
    stars: 5,
    service: '30-Min AI Starter',
    quote: 'Perfect for beginners. The $29 starter session was incredibly valuable — I learned how to use AI for candidate screening, onboarding documentation, and employee engagement surveys. I booked the 5-session package the same day.',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="hero-title" style={{ fontSize: '3rem' }}>What Our Clients Say</h1>
      <p className="hero-subtitle">
        Real stories from professionals and SMEs who transformed their workflows with AI mentoring.
      </p>

      <div className="stats-row" style={{ marginBottom: '3rem' }}>
        <div>
          <div className="stat-number">500+</div>
          <div className="stat-label">Sessions Delivered</div>
        </div>
        <div>
          <div className="stat-number">98%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
        <div>
          <div className="stat-number">50+</div>
          <div className="stat-label">SMEs Transformed</div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
        {testimonials.map((t) => (
          <div key={t.name} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '1rem', color: '#0b0c10', flexShrink: 0,
              }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#f8f9fa' }}>{t.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {t.role}, {t.company}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.2rem' }}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} style={{ color: '#fbbf24', fontSize: '1.1rem' }}>&#9733;</span>
              ))}
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, flex: 1, fontSize: '0.95rem' }}>
              &ldquo;{t.quote}&rdquo;
            </p>

            <div style={{
              fontSize: '0.8rem', color: 'var(--accent, #66fcf1)', fontWeight: 600,
              background: 'rgba(102, 252, 241, 0.08)', padding: '0.35rem 0.75rem',
              borderRadius: 12, alignSelf: 'flex-start',
            }}>
              {t.service}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2 className="section-title">Ready to write your own success story?</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://book.longcare.au" className="btn btn-primary">Book Your Session</a>
          <a href="/services" className="btn btn-outline">View Services</a>
        </div>
      </div>
    </div>
  );
}
