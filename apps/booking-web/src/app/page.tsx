'use client';

import { useState, useEffect, useRef } from 'react';
import { AvailabilityCalendar } from '../components/availability-calendar';
import { StarterIllustration, MentorIllustration, Package5Illustration, Package10Illustration, TransformIllustration } from '../components/service-illustrations';

interface Service {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
}

function formatPrice(cents: number, currency: string): string {
  return `$${(cents / 100).toFixed(0)}`;
}

const SERVICE_META: Record<string, {
  illustration: React.FC;
  badge?: string;
  badgeColor?: string;
  tagline: string;
  duration: string;
  includes: string[];
  curriculum?: string[];
  nextCourse?: { name: string; reason: string };
  details: string;
  originalPrice?: string;
  icon: string;
}> = {
  '30-min AI Starter Session': {
    illustration: StarterIllustration,
    icon: '\u26A1',
    tagline: 'Your first step into AI \u2014 discover what\'s possible',
    duration: '30 minutes',
    includes: ['Live 1-on-1 Google Meet session', 'Introduction to AI tools (Gemini, ChatGPT)', 'AI-generated session notes', 'Personalised next-steps plan'],
    curriculum: ['What is AI and how it works', 'Live demo: your first AI prompt', 'Finding AI tools for your specific needs', 'Action plan: 3 things to try this week'],
    nextCourse: { name: '1-hour AI Mentor', reason: 'Go deeper with custom AI workflows for your work' },
    details: 'Perfect for anyone curious about AI. In 30 minutes, your mentor will show you practical AI applications relevant to YOUR work. No technical background needed.',
    originalPrice: '$49',
  },
  '1-hour AI Mentor': {
    illustration: MentorIllustration,
    badge: 'MOST POPULAR',
    badgeColor: '#6366f1',
    icon: '\uD83E\uDDE0',
    tagline: 'Deep-dive mentoring tailored to your goals',
    duration: '60 minutes',
    includes: ['60-min live Google Meet session', 'Custom AI workflow building', 'Prompt engineering practice', 'AI session summary + Q&A extraction', 'Personalised learning path', 'Google Docs notes shared to your Drive'],
    curriculum: ['Review your current workflows & challenges', 'Build custom AI prompts for your tasks', 'Practice prompt engineering techniques', 'Create an automation workflow', 'Set goals for continued learning'],
    nextCourse: { name: '5-Session Package', reason: 'Continue with a structured path \u2014 save $45 vs individual sessions' },
    details: 'Our most popular session. Your mentor works with you 1-on-1 to solve real problems with AI. You\'ll leave with working prompts and workflows you can use immediately. Includes AI-generated summary with Q&A and improvement areas.',
    originalPrice: '$120',
  },
  '5-Session Package': {
    illustration: Package5Illustration,
    badge: 'BEST VALUE',
    badgeColor: '#10b981',
    icon: '\uD83D\uDCDA',
    tagline: '5-week structured learning journey',
    duration: '5 × 60 minutes (weekly)',
    includes: ['5 × 60-min sessions (weekly)', 'Structured AI curriculum', 'Progress tracking dashboard', 'All AI notes & session recordings', 'Priority scheduling', 'Email support between sessions', 'Homework & practice exercises'],
    curriculum: ['Week 1: AI Foundations & Your First Workflows', 'Week 2: Prompt Engineering Mastery', 'Week 3: AI for Content & Communication', 'Week 4: Data Analysis & Decision Making with AI', 'Week 5: Building Your AI Toolkit + Final Project'],
    nextCourse: { name: '10-Session Package', reason: 'Continue to advanced topics and earn your certificate' },
    details: 'A comprehensive 5-week program that takes you from AI basics to building practical workflows. Each session builds on the previous, with exercises between sessions to reinforce learning.',
  },
  '10-Session Package': {
    illustration: Package10Illustration,
    icon: '\uD83C\uDFC6',
    tagline: 'Complete AI mastery with certificate',
    duration: '10 × 60 minutes',
    includes: ['10 × 60-min sessions', 'Complete AI curriculum (beginner → advanced)', 'Certificate of Completion', 'Lifetime access to all notes & recordings', 'VIP priority scheduling', '24/7 WhatsApp mentor support', 'Monthly check-in for 3 months after completion', 'Capstone project with feedback'],
    curriculum: ['Sessions 1-2: AI Foundations & Tools', 'Sessions 3-4: Prompt Engineering & Automation', 'Sessions 5-6: AI for Business Operations', 'Sessions 7-8: Advanced AI Applications', 'Session 9: Capstone Project Development', 'Session 10: Project Review & Certificate'],
    nextCourse: { name: 'AI Business Transformation', reason: 'Scale AI across your entire team and organisation' },
    details: 'The ultimate AI learning experience. Covers everything from basics to deploying AI solutions in your business. Includes a capstone project where you build a complete AI workflow. Graduates receive a Certificate of Completion.',
  },
  'AI Business Transformation Program': {
    illustration: TransformIllustration,
    badge: 'PREMIUM',
    badgeColor: '#ec4899',
    icon: '\uD83D\uDE80',
    tagline: 'Enterprise-grade AI transformation for your business',
    duration: 'Custom (10-20 sessions)',
    includes: ['Custom session count (10-20 sessions)', 'Full business AI audit & strategy', 'Team training (up to 10 people)', 'Custom AI solution implementation', 'ROI measurement & reporting', 'Dedicated account manager', '90-day post-program support', 'Executive summary reports'],
    curriculum: ['Phase 1: Discovery & AI Audit (2-3 sessions)', 'Phase 2: Strategy & Roadmap (2 sessions)', 'Phase 3: Implementation & Training (4-8 sessions)', 'Phase 4: Optimisation & Measurement (2-3 sessions)', 'Phase 5: Handover & Ongoing Support'],
    details: 'For organisations serious about AI. We audit your operations, develop a custom AI strategy, implement solutions, train your team, and measure the business impact. Includes executive reporting and 90-day post-program support.',
  },
};

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [bankCurrency, setBankCurrency] = useState<'AUD' | 'VND'>('AUD');
  const [audVndRate, setAudVndRate] = useState<number | null>(null);
  const [savedBooking, setSavedBooking] = useState<{ bookingRef: string; meetLink: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [bookingRef] = useState(`BOOK-${Date.now().toString(36).toUpperCase().slice(-6)}`);

  const timeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const selectedService = services.find((s) => s.id === selectedServiceId) || null;
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const contactValid = contactName.trim().length > 0 && isValidEmail(contactEmail);
  const meetLink = savedBooking?.meetLink || `https://meet.longcare.au/${savedBooking?.bookingRef || bookingRef}`;

  const trackEvent = (name: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, params);
    }
  };

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(d => { if (d.success) setServices(d.data); }).catch(() => {}).finally(() => setLoading(false));
    fetch('https://api.exchangerate-api.com/v4/latest/AUD').then(r => r.json()).then(d => { if (d.rates?.VND) setAudVndRate(Math.round(d.rates.VND)); }).catch(() => setAudVndRate(16500));
  }, []);

  // Auto-scroll when selecting service
  const selectService = (id: string) => {
    setSelectedServiceId(id);
    const svc = services.find(s => s.id === id);
    if (svc) trackEvent('view_service', { service_name: svc.name, price: svc.price_cents / 100, currency: 'AUD' });
    setTimeout(() => timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  };

  // Auto-scroll when selecting time
  const selectTime = (date: string, time: string) => {
    setSelectedTime(`${date} at ${time}`);
    trackEvent('select_time_slot', { time_slot: `${date} ${time}` });
    setTimeout(() => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  };

  // Auto-scroll when contact filled
  useEffect(() => {
    if (contactValid && selectedTime) {
      setTimeout(() => paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [contactValid, selectedTime]);

  const handleBooking = async (paymentMethod: 'pay_later' | 'bank_transfer') => {
    if (!selectedService || !contactName || !contactEmail) return;
    try {
      const res = await fetch('/api/guest-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService.id,
          slotTime: selectedTime,
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedBooking({ bookingRef: data.data.bookingRef, meetLink: data.data.meetLink });
        trackEvent('purchase', { method: paymentMethod, service_name: selectedService.name, value: selectedService.price_cents / 100 });

        // Google Ads conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
            value: selectedService.price_cents / 100,
            currency: 'AUD',
            transaction_id: data.data.bookingRef,
          });
        }
      }
    } catch {}
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStripeCheckout = async () => {
    if (!selectedService) return;
    setStripeLoading(true);
    setStripeError(null);
    trackEvent('begin_checkout', { service_name: selectedService.name, value: selectedService.price_cents / 100, currency: 'AUD' });
    try {
      const res = await fetch('/api/payment/guest-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: selectedService.id }),
      });
      const json = await res.json();
      if (json.success && json.data?.checkoutUrl) {
        window.location.href = json.data.checkoutUrl;
      } else {
        setStripeError(json.error?.message || 'Payment service unavailable. Please try bank transfer.');
      }
    } catch {
      setStripeError('Unable to connect to payment service. Please try bank transfer or Pay Later.');
    } finally {
      setStripeLoading(false);
    }
  };

  // === SUCCESS VIEW ===
  if (showSuccess) {
    const ref = savedBooking?.bookingRef || bookingRef;
    return (
      <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="glass-panel" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>✓</div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your session has been booked. Details below.</p>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 12, textAlign: 'left', marginBottom: '1.5rem' }}>
            {selectedService && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: 'var(--text-muted)' }}>Service</span><span style={{ fontWeight: 600 }}>{selectedService.name}</span></div>}
            {selectedTime && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: 'var(--text-muted)' }}>Time</span><span style={{ fontWeight: 600 }}>{selectedTime}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: 'var(--text-muted)' }}>Name</span><span style={{ fontWeight: 600 }}>{contactName}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: 'var(--text-muted)' }}>Email</span><span style={{ fontWeight: 600 }}>{contactEmail}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: 'var(--text-muted)' }}>Amount</span><span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{selectedService ? formatPrice(selectedService.price_cents, selectedService.currency) + ' AUD' : '\u2014'}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Ref</span><span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{ref}</span></div>
          </div>

          {/* Google Calendar + Meet */}
          <div style={{ background: 'rgba(66,133,244,0.08)', border: '1px solid rgba(66,133,244,0.2)', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="14" height="16" rx="2" fill="#4285F4"/><path d="M16 8l6-3v14l-6-3V8z" fill="#34A853"/><rect x="5" y="9" width="8" height="6" rx="1" fill="white" opacity="0.9"/></svg>
              <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Google Meet Session</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 12 }}>Meet link will be sent to {contactEmail}</p>
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent((selectedService?.name || 'AI Session') + ' \u2014 Longcare AU')}&dates=${(() => { const d = new Date(); d.setDate(d.getDate() + 3); const s = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; d.setHours(d.getHours() + 1); return s + '/' + d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; })()}&details=${encodeURIComponent(`Longcare AU \u2014 AI Mentoring Session\n\nService: ${selectedService?.name || ''}\nBooking Ref: ${ref}\nClient: ${contactName}\n\nJoin via Google Meet:\n${meetLink}\n\nContact: ceo@longcare.au\nWhatsApp: +61 455 301 335`)}&location=${encodeURIComponent(meetLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, margin: 0, width: 'auto', padding: '0.7rem 1.5rem', background: '#4285F4' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" fill="none"/><path d="M3 9h18M9 4v18" stroke="white" strokeWidth="2"/></svg>
              Add to Google Calendar
            </a>
          </div>

          {/* WhatsApp Support */}
          {contactPhone && (
            <div style={{ background: 'rgba(37, 211, 102, 0.08)', border: '1px solid rgba(37, 211, 102, 0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
              <a
                href={`https://wa.me/61455301335?text=${encodeURIComponent(`Hi Longcare! I just booked: ${selectedService?.name || 'a session'}\nRef: ${ref}\nName: ${contactName}\nTime: ${selectedTime}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, margin: 0, width: 'auto', padding: '0.7rem 1.5rem', background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.23C8.67 21.54 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.12c-.23.65-1.36 1.22-1.87 1.28-.46.06-.81.21-2.73-.57-2.31-.94-3.78-3.3-3.89-3.45-.11-.15-.91-1.22-.91-2.33 0-1.1.57-1.65.78-1.87.21-.22.46-.28.61-.28h.44c.14 0 .33-.05.52.4.19.45.66 1.62.72 1.74.06.11.1.25.02.4-.08.15-.12.25-.23.38-.12.14-.25.31-.35.41-.12.12-.24.25-.1.49.13.24.6 1 1.3 1.62.9.8 1.65 1.05 1.89 1.17.24.11.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.23z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          )}

          {/* Booking QR Code */}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>Your booking code — scan to manage</p>
            <div style={{ background: '#fff', display: 'inline-block', padding: 12, borderRadius: 12 }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`https://book.longcare.au/manage/${savedBooking?.bookingRef || bookingRef}`)}`}
                alt="Booking QR Code"
                width={160}
                height={160}
                style={{ display: 'block' }}
              />
            </div>
            <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 600, fontSize: '1.1rem', marginTop: 8 }}>{savedBooking?.bookingRef || bookingRef}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>
              <a href={`/manage/${savedBooking?.bookingRef || bookingRef}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>Change date, cancel, or view details →</a>
            </p>
          </div>

          {/* Payment reminder */}
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, padding: '0.75rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#fcd34d' }}>Please complete payment before your session.</div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.longcare.au" className="btn-primary" style={{ margin: 0, width: 'auto', padding: '0.7rem 1.5rem' }}>Dashboard</a>
            <button className="btn-secondary" style={{ margin: 0, width: 'auto', padding: '0.7rem 1.5rem' }} onClick={() => { setShowSuccess(false); setSelectedServiceId(null); setSelectedTime(null); setContactName(''); setContactEmail(''); setContactPhone(''); setSavedBooking(null); setShowBankTransfer(false); setStripeError(null); }}>Book Another</button>
          </div>
        </div>
      </main>
    );
  }

  // === MAIN BOOKING FLOW (single page, auto-scroll) ===
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Book a Session</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Choose your service, pick a time, and you&apos;re set.</p>

      {/* ===== SECTION 1: SERVICES ===== */}
      <section>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: selectedServiceId ? 'var(--accent)' : 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>1</span>
          Choose Your Service
        </h2>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {[1,2,3].map(i => <div key={i} style={{ height: 300, borderRadius: 16, background: 'rgba(255,255,255,0.03)', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)' }} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {services.map((s) => {
              const meta = SERVICE_META[s.name];
              const Illustration = meta?.illustration;
              const isSelected = selectedServiceId === s.id;
              const isExpanded = expandedService === s.id;

              return (
                <div key={s.id} className={`service-card ${isSelected ? 'selected' : ''}`} style={{ background: 'rgba(255,255,255,0.02)', border: isSelected ? '2px solid var(--primary)' : '1px solid var(--surface-border)', borderRadius: 16, overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s', boxShadow: isSelected ? '0 0 20px rgba(99,102,241,0.15)' : 'none' }} onClick={() => !isExpanded && selectService(s.id)}>
                  {meta?.badge && <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, background: meta.badgeColor, color: '#fff', padding: '3px 10px', borderRadius: 10, fontSize: '0.65rem', fontWeight: 700, letterSpacing: 0.5 }}>{meta.badge}</div>}

                  {Illustration && <Illustration />}

                  <div style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '1.25rem' }}>{meta?.icon}</span>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{s.name}</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>{meta?.tagline || s.description}</p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{formatPrice(s.price_cents, s.currency)}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>AUD</span>
                      {meta?.originalPrice && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'line-through' }}>{meta.originalPrice}</span>}
                      {meta?.duration && <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: 'auto' }}>{meta.duration}</span>}
                    </div>

                    {/* Quick includes (3 items) */}
                    <div style={{ marginBottom: 8 }}>
                      {meta?.includes.slice(0, 3).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>✓</span> {item}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-primary" style={{ flex: 1, margin: 0, padding: '0.6rem', fontSize: '0.85rem' }} onClick={(e) => { e.stopPropagation(); selectService(s.id); }}>
                        {isSelected ? '✓ Selected' : 'Select'}
                      </button>
                      <button className="btn-secondary" style={{ margin: 0, padding: '0.6rem', width: 'auto', fontSize: '0.78rem' }} onClick={(e) => { e.stopPropagation(); setExpandedService(isExpanded ? null : s.id); }}>
                        {isExpanded ? '\u25B2' : '\u25BC'} Details
                      </button>
                    </div>

                    {/* === EXPANDED DETAIL VIEW === */}
                    {isExpanded && (
                      <div style={{ marginTop: 16, borderTop: '1px solid var(--surface-border)', paddingTop: 16 }} onClick={(e) => e.stopPropagation()}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{meta?.details}</p>

                        {/* Curriculum / Learning Path */}
                        {meta?.curriculum && (
                          <div style={{ marginBottom: 16 }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>\uD83D\uDCCB What You&apos;ll Learn</h4>
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: '12px 16px' }}>
                              {meta.curriculum.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: i < meta.curriculum!.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Full includes list */}
                        <div style={{ marginBottom: 16 }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>\u2728 Everything Included</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                            {meta?.includes.map((item, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                <span style={{ color: '#22c55e', fontSize: '0.7rem' }}>✓</span> {item}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Next course suggestion */}
                        {meta?.nextCourse && (
                          <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 10, padding: '12px 16px' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>\u2B06 NEXT STEP</p>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{meta.nextCourse.name}</p>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{meta.nextCourse.reason}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ===== SECTION 2: TIME (visible after service selected) ===== */}
      {selectedServiceId && (
        <section ref={timeRef} style={{ marginTop: '2.5rem', scrollMarginTop: 80 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: selectedTime ? 'var(--accent)' : 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>2</span>
            Pick a Time
          </h2>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <AvailabilityCalendar
              onSelectSlot={(date, time) => selectTime(date, time)}
              selectedSlot={selectedTime ? { date: selectedTime.split(' at ')[0], time: selectedTime.split(' at ')[1] } : undefined}
            />
            {selectedTime && <p style={{ marginTop: 12, color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>Selected: {selectedTime}</p>}
          </div>
        </section>
      )}

      {/* ===== SECTION 3: CONTACT (visible after time selected) ===== */}
      {selectedTime && (
        <section ref={contactRef} style={{ marginTop: '2.5rem', scrollMarginTop: 80 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: contactValid ? 'var(--accent)' : 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>3</span>
            Your Details
          </h2>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'grid', gap: 12 }}>
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Full Name *" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: 8, color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
              <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email Address *" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: 8, color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
              <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Phone / WhatsApp (optional)" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: 8, color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Calendar invite + Meet link will be sent to your email</p>
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 4: PAYMENT (visible after contact filled) ===== */}
      {contactValid && selectedTime && (
        <section ref={paymentRef} style={{ marginTop: '2.5rem', scrollMarginTop: 80 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>4</span>
            Payment \u2014 {selectedService?.name} ({selectedService ? formatPrice(selectedService.price_cents, selectedService.currency) + ' AUD' : ''})
          </h2>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            {/* Order summary */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 10, marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Service</span>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{selectedService?.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Time</span>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{selectedTime}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>{selectedService ? formatPrice(selectedService.price_cents, selectedService.currency) + ' AUD' : '\u2014'}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              <button className="btn-primary" style={{ margin: 0, padding: '0.85rem' }} onClick={handleStripeCheckout} disabled={stripeLoading}>
                {stripeLoading ? 'Redirecting to Stripe...' : '\uD83D\uDCB3 Pay with Card (Stripe)'}
              </button>

              {stripeError && (
                <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: 8, padding: '0.75rem', fontSize: '0.85rem', color: '#fcd34d', textAlign: 'center' }}>
                  {stripeError}
                </div>
              )}

              <button className="btn-secondary" style={{ margin: 0, padding: '0.85rem' }} onClick={() => { trackEvent('add_payment_info', { method: 'bank_transfer' }); setShowBankTransfer(!showBankTransfer); }}>
                \uD83D\uDCF1 QR Code / Bank Transfer
              </button>

              <button className="btn-secondary" style={{ margin: 0, padding: '0.85rem', border: '1px dashed rgba(255,255,255,0.15)', color: 'var(--accent)' }} onClick={() => handleBooking('pay_later')}>
                \u23F0 Book Now, Pay Later
              </button>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center' }}>Confirm your booking now and arrange payment before the session</p>
            </div>

            {/* Bank transfer / QR section */}
            {showBankTransfer && (
              <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 12, padding: '1.5rem', marginTop: '1.25rem' }}>
                {/* Currency Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button
                    className={bankCurrency === 'AUD' ? 'btn-primary' : 'btn-secondary'}
                    style={{ flex: 1, margin: 0, padding: '0.6rem', fontSize: '0.9rem' }}
                    onClick={() => setBankCurrency('AUD')}
                  >
                    AUD (Australia)
                  </button>
                  <button
                    className={bankCurrency === 'VND' ? 'btn-primary' : 'btn-secondary'}
                    style={{ flex: 1, margin: 0, padding: '0.6rem', fontSize: '0.9rem' }}
                    onClick={() => setBankCurrency('VND')}
                  >
                    VND (Vietnam)
                  </button>
                </div>

                {bankCurrency === 'AUD' && (
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.05rem' }}>Scan to Pay (AUD)</h3>
                    <div style={{ background: '#fff', display: 'inline-block', padding: 16, borderRadius: 16 }}>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`BSB: 062517\nAccount: 11404999\nPayID: 0455301335\nName: Van Long DO\nAmount: ${selectedService ? (selectedService.price_cents / 100).toFixed(2) : '0'} AUD\nRef: ${bookingRef}`)}`}
                        alt="Scan to Pay AUD"
                        width={220}
                        height={220}
                        style={{ display: 'block' }}
                      />
                    </div>
                    <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1rem' }}>
                      {selectedService ? formatPrice(selectedService.price_cents, selectedService.currency) + ' AUD' : '\u2014'}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      Open your banking app and scan this QR code
                    </p>
                  </div>
                )}

                {bankCurrency === 'VND' && (
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.05rem' }}>
                      Qu\u00E9t m\u00E3 thanh to\u00E1n (VND)
                    </h3>
                    <div style={{ background: '#fff', display: 'inline-block', padding: 16, borderRadius: 16 }}>
                      <img
                        src={`https://img.vietqr.io/image/VCB-0071000985789-compact2.png?amount=${selectedService ? Math.round(selectedService.price_cents * (audVndRate || 16500) / 100) : 0}&addInfo=${bookingRef}&accountName=DO%20VAN%20LONG`}
                        alt="Qu\u00E9t m\u00E3 thanh to\u00E1n VND"
                        width={220}
                        height={220}
                        style={{ display: 'block' }}
                      />
                    </div>
                    <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1rem' }}>
                      {selectedService ? `${(Math.round(selectedService.price_cents * (audVndRate || 16500) / 100)).toLocaleString()} VND` : '\u2014'}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {`T\u1EF7 gi\u00E1: 1 AUD \u2248 ${(audVndRate || 16500).toLocaleString()} VND (c\u1EADp nh\u1EADt realtime)`}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      M\u1EDF app ng\u00E2n h\u00E0ng v\u00E0 qu\u00E9t m\u00E3 QR
                    </p>
                  </div>
                )}

                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>
                  After transferring, click below. We will confirm within 24 hours.
                </p>
                <button
                  className="btn-primary"
                  style={{ marginTop: '1rem', margin: '1rem auto 0', background: 'var(--accent)' }}
                  onClick={() => handleBooking('bank_transfer')}
                >
                  I have completed the transfer
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
