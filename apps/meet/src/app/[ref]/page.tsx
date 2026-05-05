'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MeetingRoom() {
  const params = useParams();
  const ref = params.ref as string;
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect to Google Meet after countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'https://meet.google.com/new';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 500, margin: '0 auto' }}>
      {/* Logo */}
      <img src="https://longcare.au/logo.svg" alt="Longcare" style={{ height: 36, marginBottom: '2rem' }} />

      {/* Meeting icon */}
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: 'rgba(66, 133, 244, 0.15)', border: '2px solid rgba(66, 133, 244, 0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem', fontSize: '2.5rem',
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="14" height="16" rx="2" fill="#4285F4"/>
          <path d="M16 8l6-3v14l-6-3V8z" fill="#34A853"/>
          <rect x="5" y="9" width="8" height="6" rx="1" fill="white" opacity="0.9"/>
        </svg>
      </div>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Your Meeting Room</h1>

      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Booking Reference</span>
          <span style={{ fontWeight: 600, fontFamily: 'monospace', color: 'var(--accent)' }}>{ref}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Platform</span>
          <span style={{ fontWeight: 600 }}>Google Meet</span>
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Redirecting to Google Meet in <strong style={{ color: 'var(--accent)' }}>{countdown}</strong> seconds...
      </p>

      <a
        href="https://meet.google.com/new"
        style={{
          display: 'inline-block', padding: '0.85rem 2rem',
          background: '#4285F4', color: '#fff', borderRadius: 8,
          textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
          boxShadow: '0 4px 14px rgba(66, 133, 244, 0.3)',
        }}
      >
        Join Meeting Now
      </a>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="https://longcare.au" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>longcare.au</a>
        <a href="https://book.longcare.au" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Book Another</a>
        <a href={`https://wa.me/61455301335?text=${encodeURIComponent(`Hi, I'm joining meeting ${ref}`)}`} style={{ color: '#25D366', textDecoration: 'none', fontSize: '0.85rem' }}>WhatsApp Support</a>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '2rem' }}>
        Powered by bookedai.au — AI Revenue Engine
      </p>
    </div>
  );
}
