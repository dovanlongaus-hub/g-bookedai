'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm the BookedAI assistant. Ask me anything about our platform — features, pricing, integrations, or how to get started. I can also help you book a demo session." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: 'en' }),
      });
      const data = await res.json();
      const reply = data?.data?.reply || data?.reply || 'Sorry, please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

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
            <a href="/demo">Demo</a>
            <a href="/#signup" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: 56 }}>
        <div className="gradient-line" />
      </div>

      {/* Hero */}
      <section className="hero" style={{ paddingBottom: 32 }}>
        <div className="hero-tag">Interactive Demo</div>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>See BookedAI in Action</h1>
        <p className="hero-subtitle">
          Experience the AI Revenue Engine powering real businesses. Try the live chat, explore the booking flow, and see how it all works together.
        </p>
      </section>

      {/* Live Demo */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Live Demo</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Longcare AU is a real business powered entirely by BookedAI. See the full platform in production.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            maxWidth: 900,
            margin: '0 auto',
          }}>
            <div style={{
              padding: '12px 20px',
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: 12, color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'monospace' }}>longcare.au</span>
            </div>
            <iframe
              src="https://longcare.au"
              style={{ width: '100%', height: 500, border: 'none', background: '#0b0c10' }}
              title="Longcare AU - Live BookedAI Demo"
              loading="lazy"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <a href="https://longcare.au" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Open longcare.au in new tab
            </a>
          </div>
        </div>
      </section>

      {/* Try the Chat */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Try the Chat</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              This is the same AI chatbot that powers BookedAI tenant sites. Ask about features, pricing, or anything else.
            </p>
          </div>

          <div style={{
            maxWidth: 640,
            margin: '0 auto',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: 520,
          }}>
            {/* Chat Header */}
            <div style={{
              padding: '14px 20px',
              background: 'rgba(0,112,243,0.08)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>BookedAI Assistant</span>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>Online</span>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: 12,
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    ...(msg.role === 'user'
                      ? { background: 'var(--accent)', color: '#fff', borderBottomRightRadius: 4 }
                      : { background: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)', borderBottomLeftRadius: 4 }),
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                  <div style={{ background: 'var(--bg-card)', padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)', animation: 'demoPulse 1s infinite' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)', animation: 'demoPulse 1s infinite 0.2s' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-tertiary)', animation: 'demoPulse 1s infinite 0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 20px 10px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['What features are included?', 'Show me pricing', 'How does booking work?'].map(s => (
                  <button key={s} onClick={() => setInput(s)} style={{
                    background: 'var(--accent-bg)', border: '1px solid rgba(0,112,243,0.2)',
                    color: 'var(--accent-light)', padding: '6px 14px', borderRadius: 20, fontSize: '0.8rem', cursor: 'pointer',
                  }}>{s}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} style={{
              padding: '12px 16px', borderTop: '1px solid var(--border)',
              display: 'flex', gap: 10,
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                className="signup-input"
                style={{ marginBottom: 0, flex: 1 }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn btn-primary"
                style={{
                  padding: '10px 20px',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Try Booking */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Try Booking</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              See the full booking flow in action. Browse services, pick a time, and complete payment — all automated by BookedAI.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="https://book.longcare.au" className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              Open Booking Page
            </a>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: 12 }}>
              Opens book.longcare.au — a live BookedAI-powered booking page
            </p>
          </div>
        </div>
      </section>

      {/* Video Placeholder */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">Watch 2-Min Demo</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              See the entire BookedAI workflow in a short walkthrough — from AI chat to confirmed booking with payment.
            </p>
          </div>

          <div style={{
            maxWidth: 720,
            margin: '0 auto',
            aspectRatio: '16/9',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 16,
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--accent-bg)',
              border: '2px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--accent)">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Demo video coming soon</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Start Your Free Trial</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 24px' }}>
              Join service businesses already using BookedAI to automate revenue. 14-day free trial, no credit card required.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#signup" className="btn btn-primary btn-lg">Start Free Trial</a>
              <a href="mailto:ceo@longcare.au?subject=BookedAI Demo" className="btn btn-secondary btn-lg">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ marginBottom: 4 }}>
              <div className="nav-logo-mark">B</div>
              BookedAI
            </div>
            <p className="footer-brand-desc">
              AI Revenue Engine Platform for service businesses.<br />
              Sydney, Australia.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Product</h4>
            <a href="/#features" className="footer-link">Features</a>
            <a href="/#pricing" className="footer-link">Pricing</a>
            <a href="/docs" className="footer-link">Documentation</a>
            <a href="/demo" className="footer-link">Demo</a>
          </div>
          <div>
            <h4 className="footer-heading">Resources</h4>
            <a href="https://longcare.au" className="footer-link">Case Study</a>
            <a href="/docs" className="footer-link">API Reference</a>
            <a href="/#signup" className="footer-link">Sign Up</a>
          </div>
          <div>
            <h4 className="footer-heading">Contact</h4>
            <a href="mailto:ceo@longcare.au" className="footer-link">ceo@longcare.au</a>
            <a href="https://wa.me/61481993178" className="footer-link">WhatsApp</a>
            <span className="footer-link">Sydney, Australia</span>
          </div>
        </div>
        <p className="footer-bottom">&copy; 2026 BookedAI. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes demoPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
