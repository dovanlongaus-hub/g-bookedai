'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { Bot, CalendarDays, CreditCard, Video, Brain, BarChart3, ArrowRight, Check, Zap, Globe, Shield, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const featureIcons = [Bot, CalendarDays, CreditCard, Video, Brain, BarChart3];

const features = [
  {
    icon: Bot,
    title: 'AI Conversations',
    desc: 'Multilingual chatbot on web, WhatsApp, and voice. Answers questions, recommends services, and guides to booking.',
  },
  {
    icon: CalendarDays,
    title: 'Smart Booking',
    desc: '24/7 self-service booking with calendar sync, hold slots, automated reminders, and real-time availability.',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    desc: 'Stripe card payments, QR bank transfers, multi-currency. Automatic invoicing with GST compliance built in.',
  },
  {
    icon: Video,
    title: 'Video Meetings',
    desc: 'Branded meeting rooms on your domain. Google Meet integration with auto-generated join links and calendar invites.',
  },
  {
    icon: Brain,
    title: 'AI Notes',
    desc: 'Auto-generated session summaries, Q&A extraction, and improvement suggestions saved to Google Docs.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Real-time dashboard with revenue tracking, booking funnel, customer LTV, and BigQuery-powered reports.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    monthlyPrice: '$0',
    annualPrice: '$0',
    period: '/mo',
    desc: 'Perfect for trying BookedAI. Up to 20 bookings per month.',
    featured: false,
    cta: 'Start Free',
    features: [
      'AI Chatbot (1 language)',
      'Booking page',
      'Stripe payments',
      'Email confirmations',
      'Google Meet links',
      '20 bookings/month',
    ],
  },
  {
    name: 'Growth',
    monthlyPrice: '$99',
    annualPrice: '$79',
    period: '/mo',
    desc: 'For growing businesses. Unlimited bookings and AI notes.',
    featured: true,
    cta: 'Start Free Trial',
    features: [
      'AI Chatbot (3 languages)',
      'Custom booking domain',
      'Stripe + QR payments',
      'AI session notes',
      'Marketing Agent',
      'WhatsApp integration',
      'Xero integration',
      'Unlimited bookings',
      'Analytics dashboard',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    period: '',
    desc: 'For large teams. White-label, API access, and SLA.',
    featured: false,
    cta: 'Contact Sales',
    features: [
      'Everything in Growth',
      'White-label branding',
      'Custom AI training',
      'API access',
      'Multi-location support',
      'Dedicated account manager',
      'SOC 2 compliance',
      'Australian data residency',
      'SLA guarantee',
    ],
  },
];

const integrations = [
  'Google Calendar', 'Google Meet', 'Gmail', 'Google Docs',
  'Stripe', 'Afterpay', 'Zip Pay', 'Xero',
  'MYOB', 'WhatsApp', 'Twilio SMS', 'Firebase',
  'BigQuery', 'Looker Studio', 'NotebookLM', 'Cloud Run', 'Pub/Sub',
];

const steps = [
  { num: '1', title: 'Connect', desc: 'Add your services, pricing, and availability. Connect Google Workspace for calendar, email, and docs.' },
  { num: '2', title: 'Customize', desc: 'Brand your chatbot, booking page, and meeting rooms. Use your custom domain for a seamless experience.' },
  { num: '3', title: 'Launch', desc: 'Go live instantly. AI handles customer interactions 24/7 while you focus on delivering great service.' },
];

const stats = [
  { value: 500, suffix: '+', label: 'Sessions processed' },
  { value: 99.9, suffix: '%', label: 'Platform uptime' },
  { value: 3, suffix: '', label: 'Languages supported' },
  { value: 50, suffix: 'k+', label: 'Revenue processed', prefix: '$' },
];

// Animated counter component
function AnimatedStat({ value, suffix, prefix, label }: { value: number; suffix: string; prefix?: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (value % 1 !== 0) return v.toFixed(1);
    return Math.round(v).toString();
  });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
      const unsub = rounded.on('change', (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, value, count, rounded]);

  return (
    <div ref={ref} className="stat">
      <div className="stat-number">{prefix}{display}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// Stagger container variants
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function Home() {
  const [formData, setFormData] = useState({ business: '', email: '', phone: '' });
  const [signupStatus, setSignupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [signupMessage, setSignupMessage] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSignup = async () => {
    if (!formData.business || !formData.email) {
      setSignupMessage('Please enter your business name and email.');
      setSignupStatus('error');
      return;
    }
    setSignupStatus('loading');
    setSignupMessage('');
    try {
      const res = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: formData.business, email: formData.email, phone: formData.phone, plan: 'starter' }),
      });
      const data = await res.json();
      if (data.success) {
        setSignupStatus('success');
        setSignupMessage(data.data.message);
        trackEvent('sign_up', { method: 'form' });
        trackEvent('start_trial');
      } else {
        setSignupStatus('error');
        setSignupMessage(data.error?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSignupStatus('error');
      setSignupMessage('Network error. Please try again.');
    }
  };

  const trackEvent = (name: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, params);
    }
  };

  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img src="/logo.png" alt="LongCare.au — Long Term Care. AI Powered. Future Ready." className="h-10 w-auto" />
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="/docs">Docs</a>
            <a href="/integrations">Integrations</a>
            <a href="/partners">Partners</a>
            <a href="https://longcare.au">Case Study</a>
            <a href="#signup">
              <Button className="shimmer-button">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Gradient line */}
      <div style={{ paddingTop: 56 }}>
        <div className="gradient-line" />
      </div>

      {/* Hero */}
      <section className="hero">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem}>
            <Badge variant="outline" className="hero-tag-badge mb-6">
              <Zap className="mr-1.5 h-3 w-3" />
              Enterprise-grade AI platform
            </Badge>
          </motion.div>

          <motion.h1 variants={fadeUpItem} className="hero-title">
            The AI Revenue Engine<br />for Service Businesses
          </motion.h1>

          <motion.p variants={fadeUpItem} className="hero-subtitle">
            Turn customer intent into revenue — automatically.
          </motion.p>

          <motion.div variants={fadeUpItem} className="hero-actions">
            <a href="#signup" onClick={() => trackEvent('start_trial')}>
              <Button size="lg" className="shimmer-button text-base px-8 py-6">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="https://longcare.au">
              <Button variant="outline" size="lg" className="text-base px-8 py-6 border-[rgba(255,255,255,0.1)] text-[var(--text)] hover:bg-[var(--bg-card)] hover:border-[rgba(255,255,255,0.15)]">
                Book a Demo
              </Button>
            </a>
          </motion.div>

          <motion.p variants={fadeUpItem} className="hero-meta">
            No credit card required &middot; 14-day trial &middot; Cancel anytime
          </motion.p>
        </motion.div>

        {/* Product screenshot mock (glass card) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
          className="glass"
          style={{ marginTop: 48, borderRadius: 16, padding: 32, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(99,102,241,0.1)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Revenue Today</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>$2,450</div>
            </div>
            <div style={{ background: 'rgba(20,184,166,0.1)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Active Sessions</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-light)' }}>12</div>
            </div>
          </div>
          <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>AI Chat <ArrowRight className="inline h-3 w-3 mx-1" /> Booking <ArrowRight className="inline h-3 w-3 mx-1" /> Payment <ArrowRight className="inline h-3 w-3 mx-1" /> Meeting</span>
              <span style={{ color: '#22c55e' }}>Live</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 32 }}>
            Powering businesses across Australia
          </p>
          <div className="stats-row" style={{ margin: 0 }}>
            {stats.map((s, i) => (
              <AnimatedStat key={i} value={s.value} suffix={s.suffix} prefix={s.prefix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-title">Everything you need to grow</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              One platform replaces 10+ tools. AI handles everything from first contact to repeat booking.
            </p>
          </motion.div>

          <motion.div
            className="feature-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  className="feature-card gradient-border-card"
                >
                  <div className="feature-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-title">Go live in 3 steps</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              From signup to live AI in under 30 minutes. No engineering team required.
            </p>
          </motion.div>

          <motion.div
            className="steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUpItem}>
                <div className="step-num">{s.num}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-title">Simple, transparent pricing</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Start free. Scale as you grow. No hidden fees.
            </p>

            {/* Billing toggle */}
            <div className="flex justify-center mt-8">
              <Tabs defaultValue="monthly" onValueChange={(v: string) => setBillingCycle(v as 'monthly' | 'annual')}>
                <TabsList className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
                  <TabsTrigger value="monthly" className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white">
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value="annual" className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white">
                    Annual
                    <Badge variant="secondary" className="ml-2 text-[0.65rem] px-1.5 py-0 bg-[rgba(34,197,94,0.15)] text-[#22c55e] border-0">
                      Save 20%
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </motion.div>

          <motion.div
            className="pricing-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} variants={fadeUpItem}>
                <Card className={`pricing-card-upgraded ${plan.featured ? 'featured' : ''}`}>
                  {plan.featured && (
                    <Badge className="pricing-badge-upgraded">
                      <Star className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-0">
                    <div className="pricing-name">{plan.name}</div>
                    <div className="pricing-price">
                      {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      {plan.period && <span>{plan.period}</span>}
                    </div>
                    <p className="pricing-desc">{plan.desc}</p>
                    <ul className="pricing-features">
                      {plan.features.map((f, j) => (
                        <li key={j}>
                          <Check className="h-4 w-4 text-[#22c55e] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {plan.name === 'Enterprise' ? (
                      <a href="mailto:ceo@longcare.au?subject=BookedAI Enterprise" onClick={() => trackEvent('contact_sales')}>
                        <Button variant="outline" className="w-full mt-6 border-[rgba(255,255,255,0.1)] text-[var(--text)] hover:bg-[var(--bg-card)]">
                          {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    ) : (
                      <a href="#signup" onClick={() => trackEvent('start_trial')}>
                        <Button className={`w-full mt-6 ${plan.featured ? 'shimmer-button' : ''}`} variant={plan.featured ? 'default' : 'outline'}>
                          {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
            All prices in AUD, GST inclusive &middot; Australian-built, data stays in Sydney &middot;<br />
            Commission model: A$0/mo + 5% per booking &middot; 14-day free trial on all plans
          </p>
        </div>
      </section>

      {/* Integrations */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-title">Integrations</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Connects to the tools you already use. Google-first, enterprise-ready.
            </p>
          </motion.div>

          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginTop: 48 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {integrations.map((name, i) => (
              <motion.div
                className="integration-badge"
                key={i}
                variants={fadeUpItem}
              >
                <Globe className="inline h-3.5 w-3.5 mr-1.5 opacity-50" />
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA / Signup */}
      <section id="signup" className="section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <h2 className="section-title">Start Your Free Trial Today</h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              Join service businesses already using BookedAI to grow revenue on autopilot.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="signup-form-card">
              <CardContent className="p-8">
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Business name"
                    className="signup-input-upgraded"
                    value={formData.business}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, business: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="signup-input-upgraded"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    className="signup-input-upgraded"
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Button
                    className="w-full shimmer-button text-base py-6"
                    size="lg"
                    disabled={signupStatus === 'loading'}
                    onClick={handleSignup}
                  >
                    {signupStatus === 'loading' ? 'Submitting...' : 'Start Free Trial'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                {signupStatus === 'success' && (
                  <p className="text-center text-[#22c55e] text-sm mt-3">
                    <Check className="inline h-4 w-4 mr-1" />
                    {signupMessage}
                  </p>
                )}
                {signupStatus === 'error' && (
                  <p className="text-center text-[#ef4444] text-sm mt-3">{signupMessage}</p>
                )}
                {signupStatus === 'idle' && (
                  <p className="text-center text-[var(--text-tertiary)] text-xs mt-3">
                    <Shield className="inline h-3 w-3 mr-1" />
                    14-day free trial &middot; No credit card &middot; Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 4 }}>
              <img src="/logo.png" alt="LongCare.au — Long Term Care. AI Powered. Future Ready." className="h-12 w-auto brightness-0 invert" />
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
            <a href="/integrations" className="footer-link">Integrations</a>
            <a href="/security" className="footer-link">Security</a>
          </div>
          <div>
            <h4 className="footer-heading">Resources</h4>
            <a href="https://longcare.au" className="footer-link">Case Study</a>
            <a href="/docs" className="footer-link">Documentation</a>
            <a href="/docs/guide" className="footer-link">API Guide</a>
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
