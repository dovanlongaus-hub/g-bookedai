'use client';

import { useState } from 'react';

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    email: '',
    phone: '',
    website: '',
    monthlyBookings: '',
  });

  const benefits = [
    { title: 'Branded Platform', desc: 'Your own domain, logo, and colours. Customers see your brand, powered by BookedAI.' },
    { title: 'AI Chatbot', desc: 'Multilingual AI assistant that handles enquiries, recommends services, and guides customers to booking.' },
    { title: 'Booking Engine', desc: 'Full self-service booking with calendar sync, reminders, and rescheduling.' },
    { title: 'Payment Processing', desc: 'Accept cards, bank transfers, QR codes, and PayID. Multi-currency with automated invoicing.' },
    { title: 'Analytics Dashboard', desc: 'Real-time revenue tracking, booking funnels, and customer insights delivered to your inbox.' },
    { title: 'Marketing Automation', desc: 'AI-generated campaigns across 8 channels with UTM tracking and CEO approval workflow.' },
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
          <h1 className="section-title" style={{ fontSize: '3rem' }}>Become a BookedAI Partner</h1>
          <p className="section-subtitle" style={{ margin: '16px auto 0', maxWidth: 640 }}>
            Get your own branded AI platform with booking, payments, and customer management. Launch in under 30 minutes.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">What you get</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Everything you need to run a modern service business, without building anything yourself.
            </p>
          </div>

          <div className="feature-grid">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="feature-card">
                <div className="feature-icon">
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                    {benefit.title[0]}
                  </span>
                </div>
                <h3 className="feature-title">{benefit.title}</h3>
                <p className="feature-desc">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Models */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Flexible revenue models</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Choose the pricing model that works for your business.
            </p>
          </div>

          <div className="pricing-grid" style={{ maxWidth: 800, margin: '64px auto 0' }}>
            <div className="pricing-card">
              <div className="pricing-name">Subscription</div>
              <div className="pricing-price">$0-99<span>/mo</span></div>
              <p className="pricing-desc">Fixed monthly fee, predictable costs. Scale from free to Growth as you grow.</p>
              <ul className="pricing-features">
                <li><span className="check">&#10003;</span> Starter: $0/mo (10 bookings)</li>
                <li><span className="check">&#10003;</span> Growth: $99/mo (unlimited)</li>
                <li><span className="check">&#10003;</span> Predictable monthly costs</li>
                <li><span className="check">&#10003;</span> All platform features included</li>
                <li><span className="check">&#10003;</span> No per-transaction fees</li>
              </ul>
            </div>

            <div className="pricing-card featured">
              <div className="pricing-badge">Flexible</div>
              <div className="pricing-name">Commission</div>
              <div className="pricing-price">5-10%<span>/booking</span></div>
              <p className="pricing-desc">Zero monthly fee. Pay only when you earn. Perfect for new businesses.</p>
              <ul className="pricing-features">
                <li><span className="check">&#10003;</span> $0 monthly fee</li>
                <li><span className="check">&#10003;</span> 5-10% per successful booking</li>
                <li><span className="check">&#10003;</span> All platform features included</li>
                <li><span className="check">&#10003;</span> Pay only when you earn</li>
                <li><span className="check">&#10003;</span> Scale without risk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Partner success story</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              See how our first partner built their business on BookedAI.
            </p>
          </div>

          <a href="https://longcare.au" className="case-study-card" style={{ display: 'block' }}>
            <div className="case-study-label">First Partner</div>
            <h3 className="case-study-title">Longcare AU -- AI Mentoring Platform</h3>
            <p className="case-study-desc">
              Longcare AU launched on BookedAI with a fully branded mentoring platform. AI chat in English, Vietnamese, and Mandarin
              handles customer enquiries 24/7. Automated booking with Google Calendar sync, Stripe and QR code payments,
              Google Meet video sessions with AI-generated notes, and a complete marketing pipeline with CEO approval workflow.
            </p>
            <div className="stats-row" style={{ margin: '24px 0 16px' }}>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-number">3</div>
                <div className="stat-label">Languages</div>
              </div>
              <div className="stat">
                <div className="stat-number">$50k+</div>
                <div className="stat-label">Revenue</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
            <span className="case-study-link">Visit longcare.au &rarr;</span>
          </a>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Apply to become a partner</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Tell us about your business and we will get you set up within 48 hours.
            </p>
          </div>

          <div className="signup-form" style={{ maxWidth: 560 }}>
            <input
              type="text"
              placeholder="Business name"
              className="signup-input"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Industry (e.g. Mentoring, Consulting, Health)"
              className="signup-input"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email address"
              className="signup-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              className="signup-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="url"
              placeholder="Website (optional)"
              className="signup-input"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <input
              type="text"
              placeholder="Estimated monthly bookings"
              className="signup-input"
              value={formData.monthlyBookings}
              onChange={(e) => setFormData({ ...formData, monthlyBookings: e.target.value })}
            />
            <button className="btn btn-primary btn-full btn-lg">Apply Now</button>
            <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', marginTop: 12 }}>
              We will review your application and respond within 48 hours.
            </p>
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
