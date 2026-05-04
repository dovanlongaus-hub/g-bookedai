'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const CONTENT = [
  { type: 'Service', title: '30-min AI Starter Session', desc: 'Quick introduction to AI tools', url: '/pricing', price: '$29' },
  { type: 'Service', title: '1-hour AI Mentor', desc: 'Deep-dive personalised mentoring', url: '/pricing', price: '$99' },
  { type: 'Service', title: '5-Session Package', desc: 'Structured AI learning path', url: '/pricing', price: '$450' },
  { type: 'Service', title: '10-Session Package', desc: 'Comprehensive AI mastery', url: '/pricing', price: '$850' },
  { type: 'Service', title: 'AI Business Transformation', desc: 'Premium B2B AI program', url: '/pricing', price: '$1,500+' },
  { type: 'Blog', title: 'Getting Started with AI', desc: 'A beginner guide to AI tools and prompting', url: '/blog/getting-started-with-ai' },
  { type: 'Blog', title: '5 Ways AI Transforms Business', desc: 'Practical AI applications for SMEs', url: '/blog/5-ways-ai-transforms-business' },
  { type: 'Blog', title: 'How to Write Effective AI Prompts', desc: 'The CTFC framework for better prompts', url: '/blog/effective-ai-prompts' },
  { type: 'Page', title: 'FAQ', desc: 'Frequently asked questions about booking, payment, sessions', url: '/faq' },
  { type: 'Page', title: 'How it Works', desc: '6-step guide from booking to session notes', url: '/how-it-works' },
  { type: 'Page', title: 'Mentors', desc: 'Meet Dr. Long Do and our AI Learning Assistant', url: '/mentors' },
  { type: 'Page', title: 'Contact', desc: 'Email, WhatsApp, AI Chat support', url: '/contact' },
  { type: 'Page', title: 'About', desc: 'Our mission and methodology', url: '/about' },
  { type: 'Page', title: 'Terms of Service', desc: 'Booking policy, payments, liability', url: '/terms' },
  { type: 'Page', title: 'Privacy Policy', desc: 'Data collection, Australian Privacy Act', url: '/privacy' },
];

function SearchContent() {
  const params = useSearchParams();
  const initialQ = params.get('q') || '';
  const [query, setQuery] = useState(initialQ);

  const results = query.length >= 2
    ? CONTENT.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.desc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>Search</h1>

      <div style={{ maxWidth: 600, margin: '2rem auto' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search services, articles, pages..."
          autoFocus
          style={{
            width: '100%', padding: '1rem 1.25rem',
            background: 'var(--card-bg, rgba(255,255,255,0.03))',
            border: '1px solid var(--card-border, rgba(255,255,255,0.08))',
            borderRadius: 12, color: '#fff', fontSize: '1.1rem', outline: 'none',
          }}
        />
      </div>

      {query.length >= 2 && (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
          {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
        </p>
      )}

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {results.map((r, i) => (
          <a key={i} href={r.url} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: '0.75rem', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>{r.type}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: 4 }}>{r.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{r.desc}</p>
              </div>
              {(r as any).price && <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem' }}>{(r as any).price}</span>}
            </div>
          </a>
        ))}
      </div>

      {query.length >= 2 && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <p>No results found. Try a different search term.</p>
          <p style={{ marginTop: '1rem' }}>Or <a href="https://g.longcare.au" style={{ color: 'var(--accent)' }}>chat with our AI assistant</a></p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return <Suspense><SearchContent /></Suspense>;
}
