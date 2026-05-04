export default function SecurityPage() {
  const sections = [
    {
      title: 'Infrastructure',
      description:
        'BookedAI runs on Google Cloud with enterprise-grade infrastructure. Every microservice is containerised and deployed to Cloud Run with automatic scaling, while Cloudflare provides CDN, DDoS protection, and Web Application Firewall.',
      items: [
        'Google Cloud Run serverless containers',
        'Cloudflare CDN with global edge network',
        'Cloudflare WAF (Web Application Firewall)',
        'Docker containerised microservices',
        'Automatic horizontal scaling',
        'Multi-region deployment capability',
        'SSL/TLS encryption on all endpoints',
      ],
    },
    {
      title: 'Data Protection',
      description:
        'Your data is stored securely with encryption at rest and in transit. PostgreSQL serves as the source of truth with Cloud Firestore for real-time state, and Google Secret Manager handles all sensitive credentials.',
      items: [
        'Cloud SQL PostgreSQL with encryption at rest',
        'Cloud Firestore for real-time data',
        'Google Secret Manager for credentials',
        'Encrypted backups with point-in-time recovery',
        'Data isolation between tenants',
        'Automated data retention policies',
      ],
    },
    {
      title: 'Authentication & Access',
      description:
        'Firebase Authentication with Google Sign-In provides secure, passwordless access. Role-based access control ensures users only see what they should, from customers to superadmins.',
      items: [
        'Firebase Authentication',
        'Google Sign-In (passwordless)',
        'Role-based access control (RBAC)',
        'Four access levels: customer, mentor, admin, superadmin',
        'Auto-create user on first login',
        'Session management and token refresh',
      ],
    },
    {
      title: 'Compliance',
      description:
        'BookedAI is built for Australian businesses with compliance baked in. We follow the Australian Privacy Principles (APPs), are GDPR-ready for international clients, and rely on Stripe for PCI DSS compliance.',
      items: [
        'Australian Privacy Act (APP 1-13) compliance',
        'GDPR-ready for international clients',
        'PCI DSS compliance via Stripe',
        'GST-inclusive pricing and BAS reporting',
        'Data sovereignty: Australian data stays in Australia',
        'WCAG 2.2 AA accessibility target',
        'Audit logs for all sensitive operations',
      ],
    },
    {
      title: 'API Security',
      description:
        'Every API endpoint is hardened with multiple layers of protection. Helmet security headers, strict CORS policies, rate limiting, request validation with Zod, and webhook signature verification.',
      items: [
        'Helmet security headers on all responses',
        'Rate limiting: 100 requests per 15 minutes per IP',
        'CORS restricted to known origins',
        'Zod schema validation on all request bodies',
        'Stripe webhook signature verification',
        'Input sanitisation and SQL injection prevention',
        'Environment variable validation at startup',
      ],
    },
    {
      title: 'Uptime & Reliability',
      description:
        'We guarantee 99.9% uptime with proactive monitoring, health checks, and automated recovery. PM2 process management ensures services restart automatically if they fail.',
      items: [
        '99.9% uptime SLA',
        'Health check endpoints with DB connectivity verification',
        'PM2 process management with auto-restart',
        'Cloud Logging for centralised monitoring',
        'Automated alerting on failures',
        'Zero-downtime deployments',
        'SSE (Server-Sent Events) for real-time status',
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
          <h1 className="section-title" style={{ fontSize: '3rem' }}>Enterprise Security</h1>
          <p className="section-subtitle" style={{ margin: '16px auto 0', maxWidth: 640 }}>
            Built on Google Cloud with security at every layer. Your data is protected by the same infrastructure that powers Google.
          </p>
        </div>
      </section>

      {/* Security Sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={index % 2 === 0 ? 'section section-dark' : 'section'}
        >
          <div className="container">
            <div style={{ maxWidth: 800 }}>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>{section.title}</h2>
              <p className="section-subtitle" style={{ marginTop: 16, marginBottom: 32, maxWidth: 720 }}>
                {section.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
                {section.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span style={{ color: 'var(--success)', fontWeight: 600, flexShrink: 0 }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Trust Stats */}
      <section className="section">
        <div className="container">
          <div className="stats-row">
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime SLA</div>
            </div>
            <div className="stat">
              <div className="stat-number">256-bit</div>
              <div className="stat-label">SSL/TLS Encryption</div>
            </div>
            <div className="stat">
              <div className="stat-number">SOC 2</div>
              <div className="stat-label">Google Cloud certified</div>
            </div>
            <div className="stat">
              <div className="stat-number">APPs</div>
              <div className="stat-label">Australian Privacy Act</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Questions about security?</h2>
          <p className="section-subtitle" style={{ margin: '16px auto 32px' }}>
            Our team is happy to discuss your security requirements and compliance needs.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:ceo@longcare.au?subject=Security Inquiry" className="btn btn-primary btn-lg">Contact Security Team</a>
            <a href="/features" className="btn btn-secondary btn-lg">View Features</a>
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
            <a href="https://wa.me/61455301335" className="footer-link">WhatsApp</a>
            <span className="footer-link">Sydney, Australia</span>
          </div>
        </div>
        <p className="footer-bottom">&copy; 2026 BookedAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
