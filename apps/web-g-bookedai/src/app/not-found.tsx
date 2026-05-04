import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found — BookedAI',
};

export default function NotFound() {
  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="nav-logo-mark">B</div>
            BookedAI
          </a>
          <div className="nav-links">
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a href="/docs">Docs</a>
            <a href="/#signup" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: 56 }}>
        <div className="gradient-line" />
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '120px 24px 96px', textAlign: 'center' }}>
        <div style={{
          fontSize: '6rem',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: 16,
          background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          404
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 16 }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 40 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <a href="/" className="btn btn-primary">Home</a>
          <a href="/#features" className="btn btn-secondary">Features</a>
          <a href="/#pricing" className="btn btn-secondary">Pricing</a>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/docs" style={{ color: 'var(--accent-light)', fontSize: '0.9rem', fontWeight: 500 }}>Documentation</a>
          <span style={{ color: 'var(--text-tertiary)' }}>|</span>
          <a href="mailto:ceo@longcare.au" style={{ color: 'var(--accent-light)', fontSize: '0.9rem', fontWeight: 500 }}>Contact</a>
        </div>
      </div>

      <footer className="footer">
        <p className="footer-bottom" style={{ marginTop: 0, borderTop: 'none' }}>&copy; 2026 BookedAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
