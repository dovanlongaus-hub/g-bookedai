'use client';

import { useState } from 'react';

export default function Home() {
  return (
    <div>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(5, 5, 16, 0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src="/logo.svg" alt="BookedAI" style={{ height: 28 }} />
          </a>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.9rem' }}>Features</a>
            <a href="#pricing" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</a>
            <a href="#demo" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.9rem' }}>Demo</a>
            <a href="https://longcare.au" style={{ color: '#8b92a5', textDecoration: 'none', fontSize: '0.9rem' }}>Case Study</a>
            <a href="#signup" style={{
              background: '#6366f1', color: '#fff', padding: '0.5rem 1.25rem',
              borderRadius: 8, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
            }}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center', maxWidth: 900, margin: '0 auto', padding: '8rem 2rem 4rem' }}>
        <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 20, padding: '0.3rem 1rem', fontSize: '0.8rem', color: '#818cf8', marginBottom: '1.5rem' }}>
          AI Revenue Engine for Service Businesses
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 30%, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Turn Customer Intent<br/>Into Revenue — Automatically
        </h1>
        <p style={{ color: '#8b92a5', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto 2rem', lineHeight: 1.6 }}>
          AI-powered platform that handles chat, booking, payment, meetings, and customer care for your service business. Set up in minutes, not months.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#signup" style={{ background: '#6366f1', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>Start Free Trial</a>
          <a href="#demo" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '0.85rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>See Live Demo →</a>
        </div>
        <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '1rem' }}>No credit card required • 14-day free trial • Cancel anytime</p>
      </section>

      {/* Trusted by / Demo link */}
      <section id="demo" style={{ textAlign: 'center', padding: '2rem', marginBottom: '2rem' }}>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>LIVE DEMO — See BookedAI powering a real business:</p>
        <a href="https://longcare.au" style={{ color: '#22d3ee', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>longcare.au — AI Mentoring Platform →</a>
      </section>

      {/* Features */}
      <section id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Everything Your Business Needs</h2>
        <p style={{ textAlign: 'center', color: '#8b92a5', marginBottom: '3rem', maxWidth: 600, margin: '0 auto 3rem' }}>One platform replaces 10+ tools. AI handles everything from first contact to repeat booking.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: '\uD83D\uDCAC', title: 'AI Chat & Voice', desc: 'Multilingual chatbot on your website. Auto-answers questions, recommends services, guides to booking. Supports WhatsApp, voice, and web chat.' },
            { icon: '\uD83D\uDCC5', title: 'Smart Booking', desc: 'Customers book 24/7. Real-time availability, calendar sync, Google Meet links auto-generated. Hold slots for 10 minutes.' },
            { icon: '\uD83D\uDCB3', title: 'Payments', desc: 'Stripe card payments, bank transfer QR codes, Pay Later option. Multi-currency (AUD, VND, USD). Automatic invoicing.' },
            { icon: '\uD83D\uDCE7', title: 'Email & Notifications', desc: 'Booking confirmations, reminders (24h, 1h), follow-ups. Gmail API integration. SMS and WhatsApp notifications.' },
            { icon: '\uD83C\uDFA5', title: 'Video Meetings', desc: 'Branded meeting rooms (meet.yourdomain.com). Google Meet integration. Calendar invites with one-click join.' },
            { icon: '\uD83E\uDDE0', title: 'AI Session Notes', desc: 'Auto-generated summaries, Q&A extraction, improvement suggestions. Saved to Google Docs. NotebookLM integration.' },
            { icon: '\uD83D\uDCCA', title: 'Analytics & Revenue', desc: 'Real-time dashboard. Revenue tracking, booking funnel, customer LTV. GA4 + BigQuery pipeline. Drive Sync reports to CEO.' },
            { icon: '\uD83D\uDCE2', title: 'Marketing Agent', desc: 'AI generates campaigns for Google Ads, LinkedIn, Facebook, email. UTM tracking. CEO approval workflow.' },
            { icon: '\uD83D\uDD04', title: 'Customer Retention', desc: 'AI recommends next sessions. No-show follow-ups. Re-booking CTAs. Automated drip sequences.' },
          ].map((f, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: '#8b92a5', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>Set Up in 3 Steps</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            { num: '1', title: 'Connect', desc: 'Add your services, pricing, and availability. Connect your Google Workspace.' },
            { num: '2', title: 'Customise', desc: 'Brand your chatbot, booking page, and meeting rooms with your domain.' },
            { num: '3', title: 'Launch', desc: 'Go live. AI handles customer interactions 24/7. You focus on delivery.' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.2rem', fontWeight: 700, color: '#6366f1' }}>{s.num}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: '#8b92a5', fontSize: '0.85rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
        <p style={{ textAlign: 'center', color: '#8b92a5', marginBottom: '3rem' }}>Start free. Scale as you grow. No hidden fees.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Starter</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0', color: '#22d3ee' }}>$0<span style={{ fontSize: '1rem', color: '#666', fontWeight: 400 }}>/mo</span></div>
            <p style={{ color: '#8b92a5', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Perfect for testing. Up to 10 bookings/month.</p>
            <ul style={{ color: '#aaa', fontSize: '0.85rem', listStyle: 'none', padding: 0 }}>
              {['AI Chatbot (1 language)', 'Basic booking page', 'Stripe payments', 'Email confirmations', 'Google Meet links', '10 bookings/month'].map(f => <li key={f} style={{ padding: '0.3rem 0' }}>&#10003; {f}</li>)}
            </ul>
            <a href="#signup" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Start Free</a>
          </div>

          <div style={{ background: 'rgba(99,102,241,0.08)', border: '2px solid #6366f1', borderRadius: 16, padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#6366f1', color: '#fff', padding: '0.2rem 1rem', borderRadius: 12, fontSize: '0.75rem', fontWeight: 600 }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Growth</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0', color: '#6366f1' }}>$99<span style={{ fontSize: '1rem', color: '#666', fontWeight: 400 }}>/mo</span></div>
            <p style={{ color: '#8b92a5', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For growing businesses. Unlimited bookings.</p>
            <ul style={{ color: '#aaa', fontSize: '0.85rem', listStyle: 'none', padding: 0 }}>
              {['AI Chatbot (3 languages)', 'Custom booking domain', 'Stripe + QR payments', 'AI session notes', 'Marketing Agent', 'WhatsApp integration', 'Unlimited bookings', 'Analytics dashboard', 'Priority support'].map(f => <li key={f} style={{ padding: '0.3rem 0' }}>&#10003; {f}</li>)}
            </ul>
            <a href="#signup" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', padding: '0.75rem', background: '#6366f1', borderRadius: 8, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Start 14-Day Trial</a>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Enterprise</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0', color: '#22d3ee' }}>Custom</div>
            <p style={{ color: '#8b92a5', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For large teams. White-label + API access.</p>
            <ul style={{ color: '#aaa', fontSize: '0.85rem', listStyle: 'none', padding: 0 }}>
              {['Everything in Growth', 'White-label branding', 'Custom AI training', 'API access', 'Multi-location support', 'Dedicated account manager', 'Xero/accounting integration', 'SLA guarantee', '10% commission model option'].map(f => <li key={f} style={{ padding: '0.3rem 0' }}>&#10003; {f}</li>)}
            </ul>
            <a href="mailto:ceo@longcare.au?subject=BookedAI Enterprise" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Contact Sales</a>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#666', fontSize: '0.8rem', marginTop: '2rem' }}>
          All plans include: SSL, Cloudflare CDN, 99.9% uptime, GDPR compliance<br/>
          Commission model available: 0% monthly fee + 5-10% per transaction
        </p>
      </section>

      {/* Signup / CTA */}
      <section id="signup" style={{ maxWidth: 600, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Ready to Automate Your Business?</h2>
        <p style={{ color: '#8b92a5', marginBottom: '2rem' }}>Join Longcare AU and other SMEs already using BookedAI.</p>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '2rem' }}>
          <input type="text" placeholder="Business name" style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', outline: 'none', boxSizing: 'border-box' }} />
          <input type="email" placeholder="Email address" style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', outline: 'none', boxSizing: 'border-box' }} />
          <input type="tel" placeholder="Phone / WhatsApp" style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '1rem', marginBottom: '1rem', outline: 'none', boxSizing: 'border-box' }} />
          <button style={{ width: '100%', padding: '0.85rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Start Free Trial</button>
          <p style={{ color: '#666', fontSize: '0.75rem', marginTop: '0.75rem' }}>14-day free trial • No credit card • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2rem' }}>
          <div>
            <img src="/logo.svg" alt="BookedAI" style={{ height: 28, marginBottom: '0.75rem' }} />
            <p style={{ color: '#666', fontSize: '0.85rem' }}>AI Revenue Engine Platform for service businesses.</p>
            <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>Sydney, Australia</p>
          </div>
          <div>
            <h4 style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.75rem' }}>Product</h4>
            <a href="#features" style={{ display: 'block', color: '#aaa', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Features</a>
            <a href="#pricing" style={{ display: 'block', color: '#aaa', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Pricing</a>
            <a href="#demo" style={{ display: 'block', color: '#aaa', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Live Demo</a>
            <a href="#signup" style={{ display: 'block', color: '#aaa', textDecoration: 'none', fontSize: '0.85rem' }}>Sign Up</a>
          </div>
          <div>
            <h4 style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.75rem' }}>Case Studies</h4>
            <a href="https://longcare.au" style={{ display: 'block', color: '#aaa', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Longcare AU</a>
          </div>
          <div>
            <h4 style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.75rem' }}>Contact</h4>
            <a href="mailto:ceo@longcare.au" style={{ display: 'block', color: '#aaa', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.4rem' }}>ceo@longcare.au</a>
            <a href="https://wa.me/61481993178" style={{ display: 'block', color: '#25D366', textDecoration: 'none', fontSize: '0.85rem' }}>WhatsApp</a>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: '#444', fontSize: '0.75rem', marginTop: '2rem' }}>&copy; 2026 BookedAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
