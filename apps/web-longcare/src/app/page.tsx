'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is an AI Mentoring Session?',
    a: 'An AI Mentoring Session is a live, one-on-one video call with an experienced AI practitioner. We tailor each session to your goals — whether you want to learn prompt engineering, automate workflows, or build an AI strategy for your business.',
  },
  {
    q: 'How do I prepare for my first session?',
    a: 'Simply book a time slot that works for you. Before the session you\'ll receive a short intake form to share your goals and current skill level. No prior AI experience is required — we meet you where you are.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards via Stripe, as well as Australian bank transfers. All prices are GST-inclusive for Australian clients.',
  },
  {
    q: 'Can I cancel or reschedule?',
    a: 'Yes. You can cancel or reschedule free of charge up to 24 hours before your session. Changes within 24 hours may incur a rebooking fee. Contact us at ceo@longcare.au for assistance.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
    <div className="container">
      <div className="shape" style={{ top: '10%', left: '10%', width: '300px', height: '300px', background: 'rgba(102, 252, 241, 0.15)' }}></div>
      <div className="shape" style={{ top: '40%', right: '5%', width: '400px', height: '400px', background: 'rgba(69, 162, 158, 0.1)' }}></div>

      <main className="hero">
        <img src="/logo.svg" alt="Longcare" style={{ height: 40, marginBottom: '1rem' }} />
        <h1 className="hero-title">Unlock Your AI Potential</h1>
        <p className="hero-subtitle">
          Turn intent into revenue. We provide personalized AI mentoring, learning paths, and system transformations for individuals and SMEs.
        </p>
        <a href="https://book.longcare.au" className="btn btn-primary" style={{ marginRight: '1rem' }}>Get Started</a>
        <a href="#services" className="btn btn-outline">Explore Services</a>
      </main>

      <section id="services" style={{ paddingBottom: '6rem' }}>
        <h2 className="section-title">Our Mentoring Services</h2>
        
        <div className="grid">
          {/* Service 1 */}
          <div className="card">
            <img src="/icons/starter.svg" alt="" style={{ width: 48, height: 48, marginBottom: '1rem' }} />
            <h3 className="card-title">30-Min AI Starter</h3>
            <div className="card-price">
              <span>$29</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ session</span>
            </div>
            <p className="card-desc">
              A quick, low-friction introduction to modern AI tools. Perfect for beginners who want to discover how AI can accelerate their daily workflows.
            </p>
            <a href="https://book.longcare.au?service=starter-30min" className="btn btn-outline" style={{ width: '100%' }}>Book Session</a>
          </div>

          {/* Service 2 */}
          <div className="card" style={{ border: '1px solid var(--accent)' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: '#0b0c10', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>POPULAR</div>
            <img src="/icons/mentor.svg" alt="" style={{ width: 48, height: 48, marginBottom: '1rem' }} />
            <h3 className="card-title">1-Hour AI Mentor</h3>
            <div className="card-price">
              <span>$99</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ session</span>
            </div>
            <p className="card-desc">
              Deep-dive mentoring tailored to your specific needs. We'll build custom prompts, workflows, and review your current processes.
            </p>
            <a href="https://book.longcare.au?service=mentor-1h" className="btn btn-primary" style={{ width: '100%' }}>Book Session</a>
          </div>

          {/* Service 3 */}
          <div className="card">
            <img src="/icons/package.svg" alt="" style={{ width: 48, height: 48, marginBottom: '1rem' }} />
            <h3 className="card-title">5-Session Package</h3>
            <div className="card-price">
              <span>$450</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ package</span>
            </div>
            <p className="card-desc">
              A structured AI learning path across 5 sessions. Master generative AI, agentic workflows, and transform your business operations.
            </p>
            <a href="https://book.longcare.au?service=package-5" className="btn btn-outline" style={{ width: '100%' }}>Select Package</a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ paddingBottom: '4rem' }}>
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          {[
            { num: 1, title: 'Book', desc: 'Choose your session and time slot' },
            { num: 2, title: 'Meet', desc: 'Join via Google Meet with your mentor' },
            { num: 3, title: 'Learn', desc: 'Get AI-generated notes, Q&A, and action items' },
            { num: 4, title: 'Grow', desc: 'Follow your personalized learning path' },
          ].map((step) => (
            <div key={step.num} className="step-item">
              <div className="step-number">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By / Social Proof */}
      <section>
        <h2 className="section-title">Trusted By</h2>
        <div className="stats-row">
          {[
            { number: '500+', label: 'Sessions Delivered' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '50+', label: 'SMEs Transformed' },
            { number: '3', label: 'Languages Supported' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingBottom: '4rem' }}>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <div
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span>{openFaq === i ? '\u2212' : '+'}</span>
              </div>
              {openFaq === i && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section>
        <div className="cta-banner">
          <h2>Ready to accelerate your AI journey?</h2>
          <p>Join hundreds of professionals and SMEs who have transformed their workflows with AI mentoring.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://book.longcare.au" className="btn btn-primary">Book Your First Session</a>
            <a href="https://g.longcare.au" className="btn btn-outline">Chat with AI Assistant</a>
          </div>
        </div>
      </section>
    </div>

    {/* BookedAI Platform CTA */}
    <section style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 2rem', textAlign: 'center' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.05))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, padding: '3rem 2rem' }}>
        <p style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>THIS WEBSITE IS POWERED BY</p>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>BookedAI — AI Revenue Engine</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
          Automate your service business with AI chat, booking, payments, meetings, and customer care. Just like Longcare does.
        </p>
        <a href="https://g.bookedai.au" className="btn btn-primary" style={{ marginRight: '1rem' }}>Get BookedAI for Your Business</a>
        <a href="https://g.bookedai.au#pricing" className="btn btn-outline">See Pricing</a>
      </div>
    </section>

    {/* Footer */}
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Longcare AU</h3>
          <p>AI mentoring and learning solutions for individuals and SMEs. Turn intent into revenue with personalized guidance.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/#faq">FAQ</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-links">
          <h4>Get in Touch</h4>
          <a href="mailto:ceo@longcare.au">ceo@longcare.au</a>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
            Powered by <a href="https://g.bookedai.au" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>BookedAI</a> — AI Revenue Engine
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Want this for your business? <a href="https://g.bookedai.au" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Get BookedAI →</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          {['\u{1F1E6}\u{1F1FA} Australian Business', '\u{1F512} Privacy Act Compliant', '\u{1F4B0} GST Inclusive', '\u267F Accessible'].map((b, i) => (
            <span key={i} style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{b}</span>
          ))}
        </div>
        &copy; 2026 Longcare AU. All rights reserved.
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
      </div>
    </footer>
  </>
  );
}
