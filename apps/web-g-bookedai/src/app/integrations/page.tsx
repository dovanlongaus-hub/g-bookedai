export default function IntegrationsPage() {
  const integrations = [
    { name: 'Google Calendar', color: '#4285F4', desc: 'Two-way calendar sync for real-time availability and booking management.', status: 'Active' },
    { name: 'Google Meet', color: '#00897B', desc: 'Auto-generated meeting rooms and join links for video sessions.', status: 'Active' },
    { name: 'Gmail', color: '#EA4335', desc: 'Booking confirmations, reminders, and follow-up emails via Gmail API.', status: 'Active' },
    { name: 'Google Docs', color: '#4285F4', desc: 'AI session notes and summaries saved directly to Google Docs.', status: 'Active' },
    { name: 'Google Drive', color: '#0F9D58', desc: 'File storage for reports, invoices, and daily/weekly CEO syncs.', status: 'Active' },
    { name: 'Stripe', color: '#635BFF', desc: 'Card payments, checkout sessions, refunds, and webhook events.', status: 'Active' },
    { name: 'PayID', color: '#002B5C', desc: 'Instant Australian bank transfers with PayID integration.', status: 'Active' },
    { name: 'Vietcombank', color: '#005E3F', desc: 'QR code bank transfers for Vietnamese Dong (VND) payments.', status: 'Active' },
    { name: 'WhatsApp Business', color: '#25D366', desc: 'AI chatbot conversations and booking notifications via WhatsApp.', status: 'Active' },
    { name: 'Firebase Auth', color: '#FFCA28', desc: 'Google Sign-In, role-based access control, and secure authentication.', status: 'Active' },
    { name: 'Google Analytics (GA4)', color: '#E37400', desc: 'Event tracking, conversion funnels, and user behaviour analytics.', status: 'Active' },
    { name: 'Google Tag Manager', color: '#4285F4', desc: 'Tag management for marketing pixels, events, and tracking scripts.', status: 'Active' },
    { name: 'BigQuery', color: '#4285F4', desc: 'Data warehouse pipeline for advanced analytics and reporting.', status: 'Active' },
    { name: 'Xero Accounting', color: '#13B5EA', desc: 'Automated invoice sync, BAS reporting, and GST reconciliation.', status: 'Coming Soon' },
    { name: 'Cloud Translation', color: '#4285F4', desc: 'Real-time translation for multilingual chat (EN/VI/ZH).', status: 'Active' },
    { name: 'Cloudflare', color: '#F38020', desc: 'CDN, DDoS protection, WAF, and SSL certificate management.', status: 'Active' },
    { name: 'Google Cloud Run', color: '#4285F4', desc: 'Serverless container hosting for all microservices.', status: 'Active' },
  ];

  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img src="/logo-light.png" alt="BookedAI" style={{ height: 32 }} />
          </a>
          <div className="nav-links">
            <a href="/features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a href="/docs">Docs</a>
            <a href="/integrations">Integrations</a>
            <a href="/partners">Partners</a>
            <a href="https://longcare.au">Case Study</a>
            <a href="/#signup" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: 56 }}>
        <div className="gradient-line" />
      </div>

      {/* Hero */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 48 }}>
        <div className="container">
          <h1 className="section-title" style={{ fontSize: '3rem' }}>Integrations</h1>
          <p className="section-subtitle" style={{ margin: '16px auto 0', maxWidth: 640 }}>
            BookedAI connects with the tools you already use. Google-first architecture with enterprise-grade integrations.
          </p>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="section section-dark">
        <div className="container">
          <div className="feature-grid">
            {integrations.map((integration) => (
              <div key={integration.name} className="feature-card">
                {/* Icon placeholder */}
                <div
                  className="feature-icon"
                  style={{ background: integration.color + '18', color: integration.color }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    {integration.name.split(' ')[0][0]}
                    {integration.name.split(' ').length > 1 ? integration.name.split(' ')[1][0] : ''}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <h3 className="feature-title" style={{ marginBottom: 0 }}>{integration.name}</h3>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: integration.status === 'Active' ? 'rgba(12,206,107,0.12)' : 'rgba(245,166,35,0.12)',
                      color: integration.status === 'Active' ? 'var(--success)' : 'var(--warning)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {integration.status}
                  </span>
                </div>

                <p className="feature-desc">{integration.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Need a custom integration?</h2>
          <p className="section-subtitle" style={{ margin: '16px auto 32px' }}>
            Our Enterprise plan includes API access and custom integrations tailored to your business.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#signup" className="btn btn-primary btn-lg">Start Free Trial</a>
            <a href="mailto:ceo@longcare.au?subject=Custom Integration" className="btn btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 4 }}>
              <img src="/logo-light.png" alt="BookedAI" style={{ height: 28 }} />
            </div>
            <p className="footer-brand-desc">
              AI Revenue Engine Platform for service businesses.<br />
              Sydney, Australia.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Product</h4>
            <a href="/features" className="footer-link">Features</a>
            <a href="/#pricing" className="footer-link">Pricing</a>
            <a href="/integrations" className="footer-link">Integrations</a>
            <a href="/security" className="footer-link">Security</a>
          </div>
          <div>
            <h4 className="footer-heading">Resources</h4>
            <a href="https://longcare.au" className="footer-link">Case Study</a>
            <a href="/docs" className="footer-link">Documentation</a>
            <a href="/partners" className="footer-link">Partners</a>
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
