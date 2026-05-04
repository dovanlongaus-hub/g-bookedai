'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const bookingId = params.get('id') || '';

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ maxWidth: 500, textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>✓</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Payment Successful!</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your booking has been confirmed. Check your email for the Google Meet link.</p>
        {bookingId && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'monospace' }}>Ref: {bookingId}</p>}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <a href="https://app.longcare.au" className="btn-primary" style={{ margin: 0, padding: '0.75rem 1.5rem', width: 'auto' }}>View Dashboard</a>
          <a href="/" className="btn-secondary" style={{ margin: 0, padding: '0.75rem 1.5rem', width: 'auto' }}>Book Another</a>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>;
}
