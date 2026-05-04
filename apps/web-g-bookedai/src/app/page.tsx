'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ business: '', email: '', phone: '' });

  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img src="/logo-light.png" alt="BookedAI" style={{ height: 32 }} />
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#how-it-works">Docs</a>
            <a href="https://longcare.au">Case Study</a>
            <a href="#signup" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Gradient line */}
      <div style={{ paddingTop: 56 }}>
        <div className="gradient-line" />
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-tag">Enterprise-grade AI platform</div>
        <h1 className="hero-title">
          The AI Revenue Engine<br />for Service Businesses
        </h1>
        <p className="hero-subtitle">
          Automate conversations, booking, payments, meetings, and customer retention.
          One platform that handles your entire revenue pipeline — from first contact to repeat booking.
        </p>
        <div className="hero-actions">
          <a href="#signup" className="btn btn-primary btn-lg">Start Free</a>
          <a href="https://longcare.au" className="btn btn-secondary btn-lg">Watch Demo</a>
        </div>
        <p className="hero-meta">No credit card required &middot; 14-day trial &middot; Cancel anytime</p>

        {/* Trust badges */}
        <div className="trust-row">
          <div className="trust-badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0L8.5 2.5H11.5L9.5 5L10.5 8L7 6.5L3.5 8L4.5 5L2.5 2.5H5.5L7 0Z"/></svg>
            Enterprise-grade security
          </div>
          <div className="trust-badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0L8.5 2.5H11.5L9.5 5L10.5 8L7 6.5L3.5 8L4.5 5L2.5 2.5H5.5L7 0Z"/></svg>
            99.9% uptime SLA
          </div>
          <div className="trust-badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0L8.5 2.5H11.5L9.5 5L10.5 8L7 6.5L3.5 8L4.5 5L2.5 2.5H5.5L7 0Z"/></svg>
            GDPR &amp; Privacy Act compliant
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="stats-row">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Sessions processed</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Platform uptime</div>
            </div>
            <div className="stat">
              <div className="stat-number">$50k+</div>
              <div className="stat-label">Revenue processed</div>
            </div>
            <div className="stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Languages supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Everything you need to grow</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              One platform replaces 10+ tools. AI handles everything from first contact to repeat booking.
            </p>
          </div>

          <div className="feature-grid">
            {/* AI Conversations */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4V14H4a2 2 0 01-2-2V4zm4 3a1 1 0 100 2h8a1 1 0 100-2H6zm0 3a1 1 0 100 2h4a1 1 0 100-2H6z"/>
                </svg>
              </div>
              <h3 className="feature-title">AI Conversations</h3>
              <p className="feature-desc">
                Multilingual chatbot on web, WhatsApp, and voice. Auto-answers questions, recommends services, and guides customers to booking.
              </p>
            </div>

            {/* Smart Booking */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 110-2h1V8a1 1 0 011-1z"/>
                </svg>
              </div>
              <h3 className="feature-title">Smart Booking</h3>
              <p className="feature-desc">
                24/7 self-service booking with calendar sync, 10-minute hold slots, automated reminders, and real-time availability.
              </p>
            </div>

            {/* Payment Processing */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM2 9v5a2 2 0 002 2h12a2 2 0 002-2V9H2zm4 3a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm5 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <h3 className="feature-title">Payment Processing</h3>
              <p className="feature-desc">
                Stripe card payments, QR code bank transfers, and multi-currency support. Automatic invoicing with GST compliance.
              </p>
            </div>

            {/* Video Meetings */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12 .5l4-2v9l-4-2v-5z"/>
                </svg>
              </div>
              <h3 className="feature-title">Video Meetings</h3>
              <p className="feature-desc">
                Branded meeting rooms on your domain. Google Meet integration with auto-generated join links and calendar invites.
              </p>
            </div>

            {/* Email Automation */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v1.2L10 11 2 6.2V5zm0 3.5V15a2 2 0 002 2h12a2 2 0 002-2V8.5l-8 4.8-8-4.8z"/>
                </svg>
              </div>
              <h3 className="feature-title">Email Automation</h3>
              <p className="feature-desc">
                Booking confirmations, 24h and 1h reminders, follow-ups. Gmail API integration with WhatsApp and SMS notifications.
              </p>
            </div>

            {/* AI Session Intelligence */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6c0 2.2 1.2 4.1 3 5.2V15a1 1 0 001 1h4a1 1 0 001-1v-1.8c1.8-1.1 3-3 3-5.2a6 6 0 00-6-6zm-1 15a1 1 0 001 1h0a1 1 0 001-1v-1H9v1z"/>
                </svg>
              </div>
              <h3 className="feature-title">AI Session Intelligence</h3>
              <p className="feature-desc">
                Auto-generated session summaries, Q&A extraction, and improvement suggestions. Saved to Google Docs with NotebookLM integration.
              </p>
            </div>

            {/* Revenue Analytics */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 16h16v1H2v-1zm1-1V9h2v6H3zm4 0V5h2v10H7zm4 0V7h2v8h-2zm4 0V3h2v12h-2z"/>
                </svg>
              </div>
              <h3 className="feature-title">Revenue Analytics</h3>
              <p className="feature-desc">
                Real-time dashboard with revenue tracking, booking funnel, and customer LTV. BigQuery pipeline with Looker Studio reports.
              </p>
            </div>

            {/* Marketing Automation */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 3a1 1 0 00-1.45-.9L3.1 8.57a1 1 0 00.05 1.83l4.79 1.8 1.8 4.79a1 1 0 001.83.05L18 3.45A1 1 0 0018 3z"/>
                </svg>
              </div>
              <h3 className="feature-title">Marketing Automation</h3>
              <p className="feature-desc">
                AI generates campaigns across 8 channels. UTM tracking, CEO approval workflow, Google Ads, LinkedIn, Facebook, and email.
              </p>
            </div>

            {/* Customer Retention */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 2a2 2 0 00-2 2v1h16V4a2 2 0 00-2-2H4zm13.7 7.3a1 1 0 00-1.4 0L10 15.6l-2.3-2.3a1 1 0 00-1.4 1.4l3 3a1 1 0 001.4 0l7-7a1 1 0 000-1.4z"/>
                </svg>
              </div>
              <h3 className="feature-title">Customer Retention</h3>
              <p className="feature-desc">
                AI recommends next sessions, handles no-show follow-ups, re-booking CTAs, and automated drip sequences to maximise LTV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Go live in 3 steps</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              From signup to live AI in under 30 minutes. No engineering team required.
            </p>
          </div>

          <div className="steps">
            <div>
              <div className="step-num">1</div>
              <h3 className="step-title">Connect your services</h3>
              <p className="step-desc">
                Add your services, pricing, and availability. Connect Google Workspace for calendar, email, and docs.
              </p>
            </div>
            <div>
              <div className="step-num">2</div>
              <h3 className="step-title">Customise your brand</h3>
              <p className="step-desc">
                Brand your chatbot, booking page, and meeting rooms. Use your custom domain for a seamless experience.
              </p>
            </div>
            <div>
              <div className="step-num">3</div>
              <h3 className="step-title">Launch &amp; grow</h3>
              <p className="step-desc">
                Go live instantly. AI handles customer interactions 24/7 while you focus on delivering great service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Simple, transparent pricing</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="pricing-grid">
            {/* Starter */}
            <div className="pricing-card">
              <div className="pricing-name">Starter</div>
              <div className="pricing-price">$0<span>/mo</span></div>
              <p className="pricing-desc">Perfect for testing. Up to 10 bookings per month.</p>
              <ul className="pricing-features">
                <li><span className="check">&#10003;</span> AI Chatbot (1 language)</li>
                <li><span className="check">&#10003;</span> Basic booking page</li>
                <li><span className="check">&#10003;</span> Stripe payments</li>
                <li><span className="check">&#10003;</span> Email confirmations</li>
                <li><span className="check">&#10003;</span> Google Meet links</li>
                <li><span className="check">&#10003;</span> 10 bookings/month</li>
              </ul>
              <a href="#signup" className="btn btn-secondary btn-full" style={{ marginTop: 24 }}>Start Free</a>
            </div>

            {/* Growth */}
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-name">Growth</div>
              <div className="pricing-price">$99<span>/mo</span></div>
              <p className="pricing-desc">For growing businesses. Unlimited bookings.</p>
              <ul className="pricing-features">
                <li><span className="check">&#10003;</span> AI Chatbot (3 languages)</li>
                <li><span className="check">&#10003;</span> Custom booking domain</li>
                <li><span className="check">&#10003;</span> Stripe + QR payments</li>
                <li><span className="check">&#10003;</span> AI session notes</li>
                <li><span className="check">&#10003;</span> Marketing Agent</li>
                <li><span className="check">&#10003;</span> WhatsApp integration</li>
                <li><span className="check">&#10003;</span> Unlimited bookings</li>
                <li><span className="check">&#10003;</span> Analytics dashboard</li>
                <li><span className="check">&#10003;</span> Priority support</li>
              </ul>
              <a href="#signup" className="btn btn-primary btn-full" style={{ marginTop: 24 }}>Start 14-Day Trial</a>
            </div>

            {/* Enterprise */}
            <div className="pricing-card">
              <div className="pricing-name">Enterprise</div>
              <div className="pricing-price">Custom</div>
              <p className="pricing-desc">For large teams. White-label and API access.</p>
              <ul className="pricing-features">
                <li><span className="check">&#10003;</span> Everything in Growth</li>
                <li><span className="check">&#10003;</span> White-label branding</li>
                <li><span className="check">&#10003;</span> Custom AI training</li>
                <li><span className="check">&#10003;</span> API access</li>
                <li><span className="check">&#10003;</span> Multi-location support</li>
                <li><span className="check">&#10003;</span> Dedicated account manager</li>
                <li><span className="check">&#10003;</span> Xero/accounting integration</li>
                <li><span className="check">&#10003;</span> SLA guarantee</li>
                <li><span className="check">&#10003;</span> Commission model option</li>
              </ul>
              <a href="mailto:ceo@longcare.au?subject=BookedAI Enterprise" className="btn btn-secondary btn-full" style={{ marginTop: 24 }}>Contact Sales</a>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: 32 }}>
            All plans include SSL, Cloudflare CDN, 99.9% uptime SLA, and GDPR compliance.
            <br />Commission model available: 0% monthly fee + 5-10% per transaction.
          </p>
        </div>
      </section>

      {/* Case Study */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">See BookedAI in action</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Real businesses, real results. See how BookedAI powers end-to-end revenue automation.
            </p>
          </div>

          <a href="https://longcare.au" className="case-study-card" style={{ display: 'block' }}>
            <div className="case-study-label">Live Case Study</div>
            <h3 className="case-study-title">Longcare AU -- AI Mentoring Platform</h3>
            <p className="case-study-desc">
              Longcare AU uses BookedAI to power their entire mentoring business: AI chat in English, Vietnamese, and Mandarin,
              automated booking and payments, Google Meet sessions with AI-generated notes, and a full marketing pipeline.
            </p>
            <span className="case-study-link">Visit longcare.au &rarr;</span>
          </a>
        </div>
      </section>

      {/* CTA / Signup */}
      <section id="signup" className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Ready to automate?</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Join service businesses already using BookedAI to grow revenue on autopilot.
            </p>
          </div>

          <div className="signup-form">
            <input
              type="text"
              placeholder="Business name"
              className="signup-input"
              value={formData.business}
              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
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
            <button className="btn btn-primary btn-full btn-lg">Start Free Trial</button>
            <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem', marginTop: 12 }}>
              14-day free trial &middot; No credit card &middot; Cancel anytime
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
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#how-it-works" className="footer-link">How It Works</a>
            <a href="#signup" className="footer-link">Sign Up</a>
          </div>
          <div>
            <h4 className="footer-heading">Resources</h4>
            <a href="https://longcare.au" className="footer-link">Case Study</a>
            <a href="#features" className="footer-link">Documentation</a>
            <a href="#pricing" className="footer-link">API Reference</a>
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
