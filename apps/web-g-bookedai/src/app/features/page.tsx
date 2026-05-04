export default function FeaturesPage() {
  const features = [
    {
      id: 'ai-conversations',
      title: 'AI Conversations',
      description:
        'Engage customers across every channel with intelligent, multilingual AI that understands intent, recommends services, and guides users through booking -- 24 hours a day, 7 days a week. Handle customer care requests like cancellations, refunds, payment queries, and contact updates automatically.',
      capabilities: [
        'Web chat widget embedded on your website',
        'WhatsApp Business API integration',
        'Voice input via Speech-to-Text',
        'Multilingual support: English, Vietnamese, Chinese',
        'Smart fallback to human agent when needed',
        '24/7 auto-reply with context-aware responses',
        'Customer care: cancel, refund, payment, contact updates',
        'Service recommendation engine',
        'Conversation history and session continuity',
      ],
    },
    {
      id: 'smart-booking',
      title: 'Smart Booking',
      description:
        'A frictionless 4-step booking flow that converts visitors into paying customers. Real-time availability syncs with Google Calendar, 10-minute hold slots prevent double-bookings, and automated reminders reduce no-shows by up to 80%.',
      capabilities: [
        'Real-time availability checks',
        'Google Calendar two-way sync',
        '10-minute hold slots with auto-expiry',
        '4-step flow: Service, Time, Contact, Payment',
        'Pay Later option for flexibility',
        'Auto reminders at 24h and 1h before session',
        'Rescheduling and cancellation self-service',
        'Multi-timezone support',
        'Waitlist management',
      ],
    },
    {
      id: 'payment-processing',
      title: 'Payment Processing',
      description:
        'Accept payments however your customers prefer. Stripe checkout for cards, QR codes for bank transfers in AUD and VND, PayID for instant Australian transfers. All with GST-inclusive pricing and automated invoicing.',
      capabilities: [
        'Stripe checkout for card payments',
        'QR code payments (AUD + VND)',
        'Bank transfer and PayID support',
        'Multi-currency with real-time FX rates',
        'GST-inclusive pricing (10% Australian GST)',
        'Automated invoice generation',
        'Refund processing and tracking',
        'Revenue reconciliation',
        'PCI DSS compliance via Stripe',
      ],
    },
    {
      id: 'video-meetings',
      title: 'Video Meetings',
      description:
        'Professional branded meeting rooms on your own domain. Seamless Google Meet integration generates join links and calendar invites automatically when a booking is confirmed.',
      capabilities: [
        'Branded meet rooms (meet.yourdomain.com)',
        'Google Meet integration',
        'Automatic calendar invite generation',
        'Auto-generated join links in confirmations',
        'One-click join from email or WhatsApp',
        'Session recording support',
        'Multi-participant support',
      ],
    },
    {
      id: 'ai-intelligence',
      title: 'AI Session Intelligence',
      description:
        'Every session generates actionable intelligence. AI creates structured notes, extracts Q&A pairs, suggests improvements, and saves everything to Google Docs. Integrate with NotebookLM for deeper learning and recommend follow-up courses.',
      capabilities: [
        'Auto-generated session summaries',
        'Q&A extraction from conversations',
        'Improvement suggestions for service providers',
        'Google Docs integration for note storage',
        'NotebookLM integration for knowledge base',
        'Course and next-session recommendations',
        'Learning history tracking',
        'Exportable session reports',
      ],
    },
    {
      id: 'revenue-analytics',
      title: 'Revenue Analytics',
      description:
        'A real-time analytics dashboard that gives you full visibility into your revenue pipeline. From booking funnel to customer lifetime value, every metric flows through BigQuery and into beautiful Looker Studio reports delivered to your inbox.',
      capabilities: [
        'Real-time revenue dashboard',
        'BigQuery data pipeline',
        'GA4 + GTM event tracking',
        'Looker Studio visual reports',
        'Google Drive Sync for daily/weekly CEO reports',
        'Booking funnel conversion metrics',
        'Customer lifetime value tracking',
        'Revenue forecasting',
        'Channel attribution analysis',
      ],
    },
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
          <h1 className="section-title" style={{ fontSize: '3rem' }}>Platform Features</h1>
          <p className="section-subtitle" style={{ margin: '16px auto 0', maxWidth: 640 }}>
            A deep dive into every capability that makes BookedAI the most complete AI revenue engine for service businesses.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      {features.map((feature, index) => (
        <section
          key={feature.id}
          id={feature.id}
          className={index % 2 === 0 ? 'section section-dark' : 'section'}
        >
          <div className="container">
            <div style={{ maxWidth: 800 }}>
              <h2 className="section-title">{feature.title}</h2>
              <p className="section-subtitle" style={{ marginTop: 16, marginBottom: 32, maxWidth: 720 }}>
                {feature.description}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
                {feature.capabilities.map((cap) => (
                  <li
                    key={cap}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span style={{ color: 'var(--success)', fontWeight: 600, flexShrink: 0 }}>&#10003;</span>
                    {cap}
                  </li>
                ))}
              </ul>

              {/* Screenshot placeholder */}
              <div
                style={{
                  marginTop: 40,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  height: 240,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-tertiary)',
                  fontSize: '0.85rem',
                }}
              >
                Screenshot: {feature.title}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-subtitle" style={{ margin: '16px auto 32px' }}>
            Try BookedAI free for 14 days. No credit card required.
          </p>
          <a href="/#signup" className="btn btn-primary btn-lg">Start Free Trial</a>
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
