'use client';

import { useState } from 'react';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(11, 12, 16, 0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        <a href="/" style={{ color: 'var(--accent, #66fcf1)', fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Longcare" style={{ height: 28 }} />
        </a>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/services" style={{ color: '#9ba1a6', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Services</a>
          <a href="/about" style={{ color: '#9ba1a6', textDecoration: 'none', fontSize: '0.9rem' }}>About</a>
          <a href="/contact" style={{ color: '#9ba1a6', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a>
          <a href="https://g.longcare.au" style={{ color: '#9ba1a6', textDecoration: 'none', fontSize: '0.9rem' }}>AI Chat</a>
          <a href="https://book.longcare.au" style={{
            background: 'var(--accent, #66fcf1)', color: '#0b0c10', padding: '0.5rem 1.25rem',
            borderRadius: 24, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
            transition: 'transform 0.2s',
          }}>Book Now</a>
          <a href="https://g.bookedai.au" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '0.7rem', marginLeft: '0.5rem' }}>Powered by BookedAI</a>
        </div>
      </div>
    </nav>
  );
}
