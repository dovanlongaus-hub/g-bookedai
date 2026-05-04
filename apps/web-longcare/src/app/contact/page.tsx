import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Longcare AU',
  description: 'Get in touch with Longcare AU for AI mentoring enquiries.',
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="hero-title" style={{ fontSize: '3rem' }}>Contact Us</h1>
      <p className="hero-subtitle">We would love to hear from you</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
        <div className="card">
          <h3 className="card-title">Email</h3>
          <p style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>ceo@longcare.au</p>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>We respond within 24 hours</p>
        </div>

        <div className="card">
          <h3 className="card-title">Book a Session</h3>
          <p style={{ color: 'var(--text-muted)' }}>Ready to start learning?</p>
          <a href="https://book.longcare.au" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Book Now</a>
        </div>

        <div className="card">
          <h3 className="card-title">AI Chat</h3>
          <p style={{ color: 'var(--text-muted)' }}>Have questions? Chat with our AI assistant.</p>
          <a href="https://g.longcare.au" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>Start Chat</a>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Location</h3>
        <p style={{ color: 'var(--text-muted)' }}>Sydney, New South Wales, Australia</p>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>All sessions are conducted online via Google Meet</p>
      </div>
    </div>
  );
}
