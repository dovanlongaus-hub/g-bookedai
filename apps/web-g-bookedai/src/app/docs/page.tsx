import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation — BookedAI',
  description: 'API reference, integration guides, and quickstart for BookedAI platform.',
};

const endpoints = [
  { method: 'POST', path: '/chat', auth: 'None', desc: 'Send a message to the AI assistant. Returns contextual replies, service recommendations, and booking guidance.' },
  { method: 'GET', path: '/services', auth: 'None', desc: 'List all active services with pricing, duration, and availability for the current tenant.' },
  { method: 'POST', path: '/booking/hold', auth: 'Firebase', desc: 'Hold a time slot for 10 minutes. Auto-expires via Cloud Scheduler if not confirmed.' },
  { method: 'POST', path: '/booking/confirm', auth: 'Firebase', desc: 'Confirm a held booking. Creates calendar event, Google Meet link, and sends confirmation email.' },
  { method: 'POST', path: '/payment/guest-checkout', auth: 'None', desc: 'Create a Stripe Checkout session for guest users. Redirects to Stripe-hosted payment page.' },
  { method: 'POST', path: '/webhooks/stripe', auth: 'Signature', desc: 'Stripe webhook handler. Processes payment events and triggers booking confirmation flow.' },
  { method: 'GET', path: '/health', auth: 'None', desc: 'System health check with database connectivity status and uptime information.' },
];

const integrations = [
  { name: 'Google Calendar', desc: 'Real-time availability sync, automatic event creation with Meet links, and conflict detection.' },
  { name: 'Gmail', desc: 'Transactional emails for booking confirmations, reminders (24h and 1h), follow-ups, and receipts.' },
  { name: 'Google Meet', desc: 'Auto-generated branded meeting rooms on your domain with calendar invite integration.' },
  { name: 'Stripe', desc: 'Card payments, Checkout sessions, webhook processing, and automatic invoice generation with GST.' },
  { name: 'WhatsApp', desc: 'Customer notifications, booking reminders, and AI chat via WhatsApp Business API.' },
  { name: 'Xero', desc: 'Accounting sync for invoices, payments, and BAS/GST reporting for Australian businesses.' },
];

export default function DocsPage() {
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
      <section className="hero" style={{ paddingBottom: 48 }}>
        <div className="hero-tag">Developer Documentation</div>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>BookedAI Documentation</h1>
        <p className="hero-subtitle">
          Everything you need to integrate, configure, and scale BookedAI for your service business.
        </p>
      </section>

      {/* Getting Started */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Getting Started</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Go from zero to live AI in three simple steps. No engineering team required.
            </p>
          </div>

          <div className="steps">
            <div>
              <div className="step-num">1</div>
              <h3 className="step-title">Sign Up</h3>
              <p className="step-desc">
                Create your account at g.bookedai.au. Connect your Google Workspace for Calendar, Gmail, and Meet integration.
              </p>
            </div>
            <div>
              <div className="step-num">2</div>
              <h3 className="step-title">Configure</h3>
              <p className="step-desc">
                Add your services, set pricing and availability, connect Stripe for payments, and customise your AI chatbot personality.
              </p>
            </div>
            <div>
              <div className="step-num">3</div>
              <h3 className="step-title">Go Live</h3>
              <p className="step-desc">
                Embed the chat widget on your site, share your booking page, and let AI handle conversations, bookings, and payments 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">API Reference</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              RESTful API endpoints for the BookedAI platform. Base URL: <code style={{ background: 'var(--accent-bg)', padding: '2px 8px', borderRadius: 4, fontSize: '0.9rem' }}>https://api.g.bookedai.au</code>
            </p>
          </div>

          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {endpoints.map((ep) => (
              <div key={ep.path} className="feature-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    background: ep.method === 'GET' ? 'rgba(12,206,107,0.15)' : 'rgba(0,112,243,0.15)',
                    color: ep.method === 'GET' ? 'var(--success)' : 'var(--accent)',
                    padding: '2px 10px',
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                  }}>{ep.method}</span>
                  <code style={{ fontSize: '0.95rem', fontWeight: 600 }}>{ep.path}</code>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>
                    Auth: {ep.auth}
                  </span>
                </div>
                <p className="feature-desc" style={{ margin: 0 }}>{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Integrations</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              BookedAI connects with the tools you already use. Google-first architecture with enterprise-grade reliability.
            </p>
          </div>

          <div className="feature-grid" style={{ marginTop: 48 }}>
            {integrations.map((int) => (
              <div key={int.name} className="feature-card">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.66 5.75a1 1 0 00-1.41-1.41l-.71.71a1 1 0 001.41 1.41l.71-.71zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.46a1 1 0 001.41-1.41l-.71-.71a1 1 0 00-1.41 1.41l.71.71zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM10 15a5 5 0 100-10 5 5 0 000 10z"/>
                  </svg>
                </div>
                <h3 className="feature-title">{int.name}</h3>
                <p className="feature-desc">{int.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs & Tools */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">SDKs &amp; Tools</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Build on top of BookedAI with our developer tools.
            </p>
          </div>

          <div className="steps" style={{ marginTop: 48 }}>
            <div>
              <div className="step-num" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/></svg>
              </div>
              <h3 className="step-title">Node.js SDK</h3>
              <p className="step-desc">
                Official Node.js client library for BookedAI API. Install via npm and integrate in minutes with TypeScript support.
              </p>
            </div>
            <div>
              <div className="step-num" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.547a1 1 0 01.64 1.898l-1.004.34a7 7 0 11-10.378 0l-1.004-.34a1 1 0 01.64-1.898l1.6.547L11 4.323V3a1 1 0 011-1z"/></svg>
              </div>
              <h3 className="step-title">REST API</h3>
              <p className="step-desc">
                Full REST API with JSON request/response format. Supports any language or framework. OpenAPI spec available.
              </p>
            </div>
            <div>
              <div className="step-num" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/></svg>
              </div>
              <h3 className="step-title">Webhook Events</h3>
              <p className="step-desc">
                Real-time event notifications for bookings, payments, and sessions. Pub/Sub architecture with automatic retries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Support</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Need help? Our team is here to assist you with integration, configuration, and troubleshooting.
            </p>
          </div>

          <div style={{ maxWidth: 480, margin: '48px auto 0', textAlign: 'center' }}>
            <div className="signup-form">
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Email</p>
                <a href="mailto:ceo@longcare.au" style={{ color: 'var(--accent)', fontSize: '1.1rem', fontWeight: 600 }}>ceo@longcare.au</a>
              </div>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>WhatsApp</p>
                <a href="https://wa.me/61481993178" style={{ color: 'var(--accent)', fontSize: '1.1rem', fontWeight: 600 }}>+61 481 993 178</a>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Location</p>
                <span style={{ color: 'var(--text)', fontSize: '1rem' }}>Sydney, NSW, Australia</span>
              </div>
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
    </div>
  );
}
