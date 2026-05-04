'use client';

import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

export function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/how-it-works', label: 'How it Works' },
    { href: '/mentors', label: 'Mentors' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/testimonials', label: 'Reviews' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(11, 12, 16, 0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 1.5rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo.svg" alt="Longcare" style={{ height: 28 }} />
          </a>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            {links.slice(0, 5).map(l => (
              <a key={l.href} href={l.href} style={{ color: '#9ba1a6', textDecoration: 'none', fontSize: '0.85rem' }}>{l.label}</a>
            ))}
            <a href="https://g.longcare.au" style={{ color: '#9ba1a6', textDecoration: 'none', fontSize: '0.85rem' }}>AI Chat</a>
            <button
              onClick={() => {
                const el = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                if (el) { el.value = el.value === 'vi' ? 'en' : 'vi'; el.dispatchEvent(new Event('change')); }
                else { window.open('https://translate.google.com/translate?sl=en&tl=vi&u=' + window.location.href, '_blank'); }
              }}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: '#9ba1a6', padding: '3px 8px', borderRadius: 4, fontSize: '0.75rem', cursor: 'pointer' }}
            >
              VI
            </button>
            <ThemeToggle />
            <a href="/search" style={{ color: '#9ba1a6', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </a>
            <a href="https://book.longcare.au" style={{
              background: 'var(--accent, #66fcf1)', color: '#0b0c10', padding: '0.5rem 1.25rem',
              borderRadius: 24, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
            }}>Book Now</a>
            <a href="https://g.bookedai.au" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '0.7rem' }}>Powered by BookedAI</a>
          </div>

          {/* Mobile hamburger */}
          <button className="mobile-menu-btn" onClick={() => setOpen(!open)} style={{
            display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 6h18M3 12h18M3 18h18" /></>}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="mobile-overlay" style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: 'rgba(11, 12, 16, 0.98)', backdropFilter: 'blur(20px)',
          padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        }} onClick={() => setOpen(false)}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{l.label}</a>
          ))}
          <a href="https://g.longcare.au" style={{ color: '#9ba1a6', textDecoration: 'none', fontSize: '1.1rem', padding: '0.75rem 0' }}>AI Chat</a>
          <a href="https://book.longcare.au" style={{
            background: 'var(--accent, #66fcf1)', color: '#0b0c10', padding: '0.85rem', borderRadius: 8,
            fontWeight: 600, textDecoration: 'none', textAlign: 'center', marginTop: '1rem',
          }}>Book Now</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
