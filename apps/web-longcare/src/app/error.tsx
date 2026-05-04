'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>!</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Something went wrong</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error.message || 'An unexpected error occurred'}</p>
        <button onClick={reset} className="btn btn-primary" style={{ marginRight: '0.75rem' }}>Try Again</button>
        <a href="/" className="btn btn-outline">Go Home</a>
      </div>
    </div>
  );
}
