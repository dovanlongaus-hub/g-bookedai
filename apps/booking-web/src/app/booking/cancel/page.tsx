'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CancelContent() {
  const params = useSearchParams();
  const id = params.get('id') || '';

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ maxWidth: 500, textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>!</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Payment Cancelled</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your payment was not completed. Your booking is still pending — you can try again or choose a different payment method.</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <a href="/" className="btn-primary" style={{ margin: 0, padding: '0.75rem 1.5rem', width: 'auto' }}>Try Again</a>
          <a href="https://wa.me/61455301335?text=Hi%2C%20I%20need%20help%20with%20payment" className="btn-secondary" style={{ margin: 0, padding: '0.75rem 1.5rem', width: 'auto' }}>WhatsApp Support</a>
        </div>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return <Suspense><CancelContent /></Suspense>;
}
