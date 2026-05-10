import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found — Longcare AU',
};

export default function NotFound() {
  return (
    <div className="container" style={{ maxWidth: 600, margin: '0 auto', padding: '8rem 2rem', textAlign: 'center' }}>
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 20,
        padding: '4rem 2rem',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        <img src="/logo.png" alt="Longcare" style={{ height: 36, marginBottom: '2rem', opacity: 0.85 }} />
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          background: 'linear-gradient(to right, #fff, #66fcf1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 280, margin: '0 auto' }}>
          <a href="/" className="btn btn-primary" style={{ width: '100%' }}>Home</a>
          <a href="/services" className="btn btn-outline" style={{ width: '100%' }}>Services</a>
          <a href="https://book.longcare.au" className="btn btn-outline" style={{ width: '100%' }}>Book a Session</a>
          <a href="/contact" className="btn btn-outline" style={{ width: '100%' }}>Contact</a>
          <a href="https://g.longcare.au" className="btn btn-outline" style={{ width: '100%' }}>AI Chat</a>
        </div>
      </div>
    </div>
  );
}
