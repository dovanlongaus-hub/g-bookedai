'use client';

import { useState } from 'react';

const ENDPOINTS = [
  { method: 'GET', path: '/health', auth: 'None', desc: 'System health check with DB status', tag: 'System' },
  { method: 'GET', path: '/services', auth: 'None', desc: 'List all active services with pricing', tag: 'Services' },
  { method: 'POST', path: '/services/search', auth: 'None', desc: 'Search services by keyword', tag: 'Services' },
  { method: 'POST', path: '/chat', auth: 'None', desc: 'Send message to AI assistant (EN/VI/ZH)', tag: 'Chat' },
  { method: 'POST', path: '/booking/hold', auth: 'Bearer', desc: 'Hold a time slot for 10 minutes', tag: 'Booking' },
  { method: 'POST', path: '/booking/confirm', auth: 'Bearer', desc: 'Confirm booking after payment', tag: 'Booking' },
  { method: 'POST', path: '/booking/cancel', auth: 'Bearer', desc: 'Cancel a booking', tag: 'Booking' },
  { method: 'POST', path: '/booking/reschedule', auth: 'Bearer', desc: 'Reschedule to a new slot', tag: 'Booking' },
  { method: 'POST', path: '/payment/guest-checkout', auth: 'None', desc: 'Create Stripe checkout session', tag: 'Payment' },
  { method: 'POST', path: '/payment/checkout', auth: 'Bearer', desc: 'Authenticated checkout', tag: 'Payment' },
  { method: 'POST', path: '/webhooks/stripe', auth: 'Signature', desc: 'Stripe webhook handler', tag: 'Webhooks' },
  { method: 'POST', path: '/learning/session-summary', auth: 'Bearer', desc: 'Generate AI session summary', tag: 'Learning' },
  { method: 'GET', path: '/learning/history', auth: 'Bearer', desc: 'User learning history', tag: 'Learning' },
  { method: 'POST', path: '/marketing/campaigns', auth: 'Admin', desc: 'Create marketing campaign', tag: 'Marketing' },
  { method: 'POST', path: '/marketing/approve', auth: 'Admin', desc: 'Approve campaign', tag: 'Marketing' },
  { method: 'GET', path: '/events/booking/:id', auth: 'SSE', desc: 'Real-time booking status', tag: 'Events' },
  { method: 'GET', path: '/events/chat/:id', auth: 'SSE', desc: 'AI chat streaming', tag: 'Events' },
];

const METHOD_COLORS: Record<string, string> = {
  GET: '#0cce6b',
  POST: '#0070f3',
  PUT: '#f5a623',
  DELETE: '#e00',
};

export default function ApiDocsPage() {
  const [filter, setFilter] = useState('All');
  const tags = ['All', ...new Set(ENDPOINTS.map(e => e.tag))];
  const filtered = filter === 'All' ? ENDPOINTS : ENDPOINTS.filter(e => e.tag === filter);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 64px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>API Reference</h1>
      <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: 32 }}>
        Base URL: <code style={{ background: '#161616', padding: '2px 8px', borderRadius: 4, fontSize: '0.9rem' }}>https://api.g.longcare.au</code>
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {tags.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            padding: '6px 16px', borderRadius: 20, border: '1px solid',
            borderColor: filter === t ? '#0070f3' : 'rgba(255,255,255,0.1)',
            background: filter === t ? 'rgba(0,112,243,0.1)' : 'transparent',
            color: filter === t ? '#0070f3' : '#888', cursor: 'pointer', fontSize: '0.8rem',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filtered.map((ep, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px',
            background: '#111', borderRadius: i === 0 ? '12px 12px 0 0' : i === filtered.length - 1 ? '0 0 12px 12px' : 0,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 700,
              color: METHOD_COLORS[ep.method] || '#888',
              width: 40, textAlign: 'center',
            }}>{ep.method}</span>
            <code style={{ fontFamily: 'monospace', fontSize: '0.85rem', flex: 1 }}>{ep.path}</code>
            <span style={{
              fontSize: '0.7rem', padding: '2px 8px', borderRadius: 4,
              background: ep.auth === 'None' ? 'rgba(12,206,107,0.1)' : ep.auth === 'Bearer' ? 'rgba(0,112,243,0.1)' : 'rgba(245,166,35,0.1)',
              color: ep.auth === 'None' ? '#0cce6b' : ep.auth === 'Bearer' ? '#0070f3' : '#f5a623',
            }}>{ep.auth}</span>
            <span style={{ color: '#666', fontSize: '0.8rem', width: 280, textAlign: 'right' }}>{ep.desc}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, padding: 24, background: '#111', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ marginBottom: 12 }}>Authentication</h3>
        <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Protected endpoints require a <code style={{ background: '#1a1a1a', padding: '1px 6px', borderRadius: 3 }}>Bearer</code> token in the Authorization header.
          Obtain tokens via Firebase Auth (Google Sign-In) or the OAuth flow.
        </p>
        <pre style={{ background: '#0a0a0a', padding: 16, borderRadius: 8, marginTop: 12, fontSize: '0.8rem', overflow: 'auto' }}>
{`curl -X POST https://api.g.longcare.au/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "What services do you offer?", "language": "en"}'`}
        </pre>
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <a href="/docs/openapi.yaml" style={{ color: '#0070f3', fontSize: '0.9rem' }}>Download OpenAPI 3.1 Spec (YAML)</a>
      </div>
    </div>
  );
}
