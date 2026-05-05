'use client';

import { useState, useEffect } from 'react';
import { AvailabilityCalendar } from '../components/availability-calendar';
import { StarterIllustration, MentorIllustration, Package5Illustration, Package10Illustration, TransformIllustration } from '../components/service-illustrations';

type Step = 'select' | 'datetime' | 'contact' | 'payment' | 'success';

interface Service {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
}

function formatPrice(cents: number, currency: string): string {
  const dollars = (cents / 100).toFixed(2);
  const symbol = currency === 'AUD' ? '$' : currency === 'USD' ? '$' : '';
  return `${symbol}${dollars}`;
}

export default function BookingPage() {
  const [step, setStep] = useState<Step>('select');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<'none' | 'stripe' | 'bank'>('none');
  const [bankCurrency, setBankCurrency] = useState<'AUD' | 'VND'>('AUD');
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  // Contact info
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Exchange rate
  const [audVndRate, setAudVndRate] = useState<number | null>(null);

  // Generated Meet link + booking ref (fallback if API fails)
  const [bookingRef] = useState(`BOOK-${Date.now().toString(36).toUpperCase().slice(-6)}`);
  const meetLink = `https://meet.longcare.au/${bookingRef}`;

  // Saved booking from API
  const [savedBooking, setSavedBooking] = useState<{ bookingRef: string; meetLink: string } | null>(null);

  const [expandedService, setExpandedService] = useState<string | null>(null);

  const selectedService = services.find((s) => s.id === selectedServiceId) || null;

  const SERVICE_META: Record<string, {
    illustration: React.FC;
    badge?: string;
    badgeColor?: string;
    tagline: string;
    includes: string[];
    details: string;
    originalPrice?: string;
  }> = {
    '30-min AI Starter Session': {
      illustration: StarterIllustration,
      tagline: 'Perfect first step into AI',
      includes: ['30-min live Google Meet session', 'AI tool introduction', 'AI-generated session notes', 'Next steps recommendation'],
      details: 'Ideal for beginners who want to explore AI tools and understand how AI can boost their productivity. Your mentor will introduce key AI concepts and demonstrate practical applications for your specific needs.',
      originalPrice: '$49',
    },
    '1-hour AI Mentor': {
      illustration: MentorIllustration,
      badge: 'MOST POPULAR',
      badgeColor: '#6366f1',
      tagline: 'Deep-dive personalised mentoring',
      includes: ['60-min live Google Meet session', 'Custom AI workflow building', 'Prompt engineering practice', 'AI session summary + Q&A', 'Personalised learning path', 'Google Docs notes'],
      details: 'Our flagship session. Your mentor works with you 1-on-1 to build custom AI solutions for your specific challenges. You\'ll leave with practical workflows you can use immediately.',
      originalPrice: '$120',
    },
    '5-Session Package': {
      illustration: Package5Illustration,
      badge: 'BEST VALUE',
      badgeColor: '#10b981',
      tagline: 'Structured learning across 5 sessions',
      includes: ['5 x 60-min sessions', 'Structured curriculum', 'Progress tracking', 'All AI notes & recordings', 'Priority scheduling', 'Email support between sessions'],
      details: 'A comprehensive learning path covering AI fundamentals to advanced applications. Each session builds on the previous one, with homework and practice exercises.',
    },
    '10-Session Package': {
      illustration: Package10Illustration,
      tagline: 'Comprehensive AI mastery program',
      includes: ['10 x 60-min sessions', 'Complete AI curriculum', 'Certificate of completion', 'Lifetime access to notes', 'VIP scheduling', '24/7 WhatsApp support', 'Monthly check-in after completion'],
      details: 'Our most thorough program. Covers everything from basics to building and deploying AI solutions. Includes a capstone project and certificate.',
    },
    'AI Business Transformation Program': {
      illustration: TransformIllustration,
      badge: 'PREMIUM',
      badgeColor: '#ec4899',
      tagline: 'Transform your entire business with AI',
      includes: ['Custom duration (10-20 sessions)', 'Full business AI audit', 'Team training (up to 10 people)', 'Custom AI implementation', 'ROI measurement', 'Dedicated account manager', '90-day post-program support'],
      details: 'For businesses serious about AI transformation. We audit your operations, implement AI workflows, train your team, and measure the impact. Includes ongoing support.',
    },
  };

  const trackEvent = (name: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, params);
    }
  };

  // Fetch services on mount
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setServices(json.data);
        } else {
          setError('Failed to load services.');
        }
      } catch {
        setError('Unable to connect to the server. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchServices();

    // Fetch real-time AUD/VND exchange rate
    async function fetchRate() {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/AUD');
        const data = await res.json();
        if (data.rates?.VND) {
          setAudVndRate(Math.round(data.rates.VND));
        }
      } catch {
        // Fallback rate
        setAudVndRate(16500);
      }
    }
    fetchRate();
  }, []);

  const handleNext = () => {
    if (step === 'select' && selectedServiceId) setStep('datetime');
    else if (step === 'datetime' && selectedTime) setStep('contact');
    else if (step === 'contact' && contactName && contactEmail) {
      trackEvent('add_contact_info', { has_phone: !!contactPhone });
      setStep('payment');
    }
  };

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const contactValid = contactName.trim().length > 0 && isValidEmail(contactEmail);

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
    setStep('success');
  };

  const handleStripeCheckout = async () => {
    setStripeLoading(true);
    setStripeError(null);
    trackEvent('begin_checkout', { service_name: selectedService?.name, value: selectedService ? selectedService.price_cents / 100 : 0, currency: 'AUD' });
    try {
      const res = await fetch('/api/payment/guest-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: selectedService?.id }),
      });
      const json = await res.json();
      if (json.success && json.data?.checkoutUrl) {
        window.location.href = json.data.checkoutUrl;
      } else {
        setStripeError(json.error?.message || 'Payment service unavailable. Please try bank transfer.');
        setPaymentMode('stripe');
      }
    } catch {
      setStripeError('Unable to connect to payment service. Please try bank transfer or Pay Later.');
      setPaymentMode('stripe');
    } finally {
      setStripeLoading(false);
    }
  };

  const stepNumber = (s: Step) => {
    if (s === 'select') return 1;
    if (s === 'datetime') return 2;
    if (s === 'contact') return 3;
    if (s === 'payment') return 4;
    return 5;
  };
  const currentNum = stepNumber(step);

  return (
    <main className="container">
      <h1>Secure Your Session</h1>
      <p className="subtitle">AI recommendations → Booking Truth Engine</p>

      {step !== 'success' && (
        <div className="stepper" role="progressbar" aria-valuenow={currentNum} aria-valuemax={4} aria-label={`Step ${currentNum} of 4`}>
          <div className={`step ${currentNum === 1 ? 'active' : currentNum > 1 ? 'completed' : ''}`}>1</div>
          <div className={`step ${currentNum === 2 ? 'active' : currentNum > 2 ? 'completed' : ''}`}>2</div>
          <div className={`step ${currentNum === 3 ? 'active' : currentNum > 3 ? 'completed' : ''}`}>3</div>
          <div className={`step ${currentNum >= 4 ? 'active' : ''}`}>4</div>
        </div>
      )}

      {/* Step 1: Select Service */}
      {step === 'select' && (
        <div className="glass-panel">
          <h2 style={{ marginBottom: '1.5rem' }}>1. Choose a Service</h2>

          {loading && (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="option-card"
                  style={{ opacity: 0.4, pointerEvents: 'none' }}
                >
                  <div>
                    <div
                      style={{
                        width: '180px',
                        height: '1.25rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                      }}
                    />
                    <div
                      style={{
                        width: '260px',
                        height: '0.9rem',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '6px',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: '60px',
                      height: '1.5rem',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                    }}
                  />
                </div>
              ))}
            </>
          )}

          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                color: '#fca5a5',
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && services.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                color: 'var(--text-muted)',
                padding: '2rem',
              }}
            >
              No services available at the moment.
            </div>
          )}

          {!loading &&
            services.map((s) => {
              const meta = SERVICE_META[s.name];
              const Illustration = meta?.illustration;
              return (
                <div
                  key={s.id}
                  className={`service-card ${selectedServiceId === s.id ? 'selected' : ''}`}
                  style={{
                    display: 'block',
                    padding: 0,
                    cursor: 'default',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: selectedServiceId === s.id ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: '1.5rem',
                  }}
                >
                  {meta?.badge && (
                    <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, background: meta.badgeColor, color: '#fff', padding: '4px 12px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0.5 }}>
                      {meta.badge}
                    </div>
                  )}

                  {Illustration && <Illustration />}

                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 4 }}>{s.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 12 }}>{meta?.tagline || s.description}</p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                      <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {formatPrice(s.price_cents, s.currency)}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>AUD</span>
                      {meta?.originalPrice && (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'line-through' }}>{meta.originalPrice}</span>
                      )}
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                      {meta?.includes.slice(0, 4).map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>&#10003;</span> {item}
                        </li>
                      ))}
                    </ul>

                    {expandedService === s.id && (
                      <div style={{ marginBottom: 16, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        <p style={{ marginBottom: 8 }}>{meta?.details}</p>
                        {meta?.includes.slice(4).map((item, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0' }}>
                            <span style={{ color: 'var(--accent)' }}>&#10003;</span> {item}
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="btn-primary"
                        style={{ flex: 1, margin: 0, padding: '0.75rem' }}
                        onClick={() => { setSelectedServiceId(s.id); trackEvent('view_service', { service_name: s.name, price: s.price_cents / 100, currency: 'AUD' }); }}
                      >
                        {selectedServiceId === s.id ? '\u2713 Selected' : 'Select'}
                      </button>
                      <button
                        className="btn-secondary"
                        style={{ margin: 0, padding: '0.75rem', width: 'auto', fontSize: '0.8rem' }}
                        onClick={() => setExpandedService(expandedService === s.id ? null : s.id)}
                      >
                        {expandedService === s.id ? 'Less' : 'Details'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          {!loading && services.length > 0 && (
            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={!selectedServiceId}
              style={{
                opacity: selectedServiceId ? 1 : 0.5,
                cursor: selectedServiceId ? 'pointer' : 'not-allowed',
              }}
            >
              Continue
            </button>
          )}
        </div>
      )}

      {/* Step 2: Date & Time (demo mode) */}
      {step === 'datetime' && (
        <div className="glass-panel">
          <h2 style={{ marginBottom: '0.5rem' }}>2. Select Date & Time</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            All times are in your local timezone.
          </p>

          <AvailabilityCalendar
            onSelectSlot={(date, time) => setSelectedTime(`${date} at ${time}`)}
            selectedSlot={selectedTime ? { date: selectedTime.split(' at ')[0], time: selectedTime.split(' at ')[1] } : undefined}
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn-secondary" onClick={() => setStep('select')}>
              Back
            </button>
            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={!selectedTime}
              style={{
                opacity: selectedTime ? 1 : 0.5,
                cursor: selectedTime ? 'pointer' : 'not-allowed',
                marginTop: 0,
              }}
            >
              Confirm Time
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 'contact' && (
        <div className="glass-panel">
          <h2 style={{ marginBottom: '0.5rem' }}>3. Your Details</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            We need your contact info to send booking confirmation and Meet link.
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. John Smith"
                style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Email Address *</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.3rem' }}>Calendar invite and Meet link will be sent here</p>
            </div>

            <div>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Phone / WhatsApp</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+61 4xx xxx xxx or +84 xxx xxx xxx"
                style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '1rem', outline: 'none' }}
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.3rem' }}>For WhatsApp support and session reminders</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn-secondary" style={{ margin: 0 }} onClick={() => setStep('datetime')}>Back</button>
            <button
              className="btn-primary"
              style={{ margin: 0, opacity: contactValid ? 1 : 0.5, cursor: contactValid ? 'pointer' : 'not-allowed' }}
              disabled={!contactValid}
              onClick={handleNext}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Payment */}
      {step === 'payment' && (
        <div className="glass-panel">
          <h2 style={{ marginBottom: '1.5rem' }}>3. Secure Payment</h2>

          {/* Order summary */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Service</span>
              <span style={{ fontWeight: 600 }}>{selectedService?.name}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
              <span style={{ fontWeight: 600 }}>{selectedTime}</span>
            </div>
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid var(--surface-border)',
                margin: '1rem 0',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
              }}
            >
              <span>Total</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                {selectedService
                  ? `${formatPrice(selectedService.price_cents, selectedService.currency)} ${selectedService.currency}`
                  : '—'}
              </span>
            </div>
          </div>

          {/* Payment buttons */}
          <button
            className="btn-primary"
            style={{ marginBottom: '1rem', marginTop: 0 }}
            onClick={handleStripeCheckout}
            disabled={stripeLoading}
          >
            {stripeLoading ? 'Redirecting to Stripe...' : 'Pay with Card (Stripe)'}
          </button>

          {stripeError && paymentMode === 'stripe' && (
            <div
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: '#fcd34d',
                textAlign: 'center',
              }}
            >
              {stripeError}
            </div>
          )}

          <button
            className="btn-secondary"
            style={{ margin: 0 }}
            onClick={() => { trackEvent('add_payment_info', { method: bankCurrency === 'AUD' ? 'bank_aud' : 'bank_vnd' }); setPaymentMode('bank'); }}
          >
            Bank Transfer / PayID / QR
          </button>

          <button
            className="btn-secondary"
            style={{ margin: 0, marginTop: '0.75rem', border: '1px dashed rgba(255,255,255,0.15)', color: 'var(--accent)' }}
            onClick={() => handleBooking('pay_later')}
          >
            Book Now, Pay Later
          </button>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem' }}>
            Confirm your booking now and arrange payment before the session
          </p>

          {/* Bank transfer instructions */}
          {paymentMode === 'bank' && (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginTop: '1.5rem',
              }}
            >
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
                  <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.05rem' }}>
                    Scan to Pay (AUD)
                  </h3>
                  <div style={{ background: '#fff', display: 'inline-block', padding: '16px', borderRadius: '16px' }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                        `BSB: 062517\nAccount: 11404999\nPayID: 0455301335\nName: Van Long DO\nAmount: ${selectedService ? (selectedService.price_cents / 100).toFixed(2) : '0'} AUD\nRef: BOOK-${Date.now().toString(36).toUpperCase().slice(-6)}`
                      )}`}
                      alt="Scan to Pay AUD"
                      width={220}
                      height={220}
                      style={{ display: 'block' }}
                    />
                  </div>
                  <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1rem' }}>
                    {selectedService ? `${formatPrice(selectedService.price_cents, selectedService.currency)} AUD` : '—'}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    Open your banking app and scan this QR code
                  </p>
                </div>
              )}

              {bankCurrency === 'VND' && (
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.05rem' }}>
                    Quét mã thanh toán (VND)
                  </h3>
                  <div style={{ background: '#fff', display: 'inline-block', padding: '16px', borderRadius: '16px' }}>
                    <img
                      src={`https://img.vietqr.io/image/VCB-0071000985789-compact2.png?amount=${selectedService ? Math.round(selectedService.price_cents * (audVndRate || 16500) / 100) : 0}&addInfo=BOOK-${Date.now().toString(36).toUpperCase().slice(-6)}&accountName=DO%20VAN%20LONG`}
                      alt="Quét mã thanh toán VND"
                      width={220}
                      height={220}
                      style={{ display: 'block' }}
                    />
                  </div>
                  <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1rem' }}>
                    {selectedService ? `${(Math.round(selectedService.price_cents * (audVndRate || 16500) / 100)).toLocaleString()} VND` : '—'}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {`Tỷ giá: 1 AUD ≈ ${(audVndRate || 16500).toLocaleString()} VND (cập nhật realtime)`}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    Mở app ngân hàng và quét mã QR
                  </p>
                </div>
              )}


              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>
                After transferring, click below. We will confirm within 24 hours.
              </p>

              <button
                className="btn-primary"
                style={{ marginTop: '1rem', background: 'var(--accent)' }}
                onClick={() => handleBooking('bank_transfer')}
              >
                I have completed the transfer
              </button>
            </div>
          )}

          <button
            className="btn-secondary"
            style={{ marginTop: '2rem', border: 'none', color: 'var(--text-muted)' }}
            onClick={() => {
              setPaymentMode('none');
              setStripeError(null);
              setStep('datetime');
            }}
          >
            &lt; Back to Date & Time
          </button>
        </div>
      )}

      {/* Success */}
      {step === 'success' && (
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2.5rem',
            }}
          >
            ✓
          </div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem' }}>
            Your session has been scheduled. Details below.
          </p>

          {/* Booking Summary */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Service</span>
              <span style={{ fontWeight: 600 }}>{selectedService?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
              <span style={{ fontWeight: 600 }}>{selectedTime}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Amount</span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                {selectedService ? formatPrice(selectedService.price_cents, selectedService.currency) + ' AUD' : '—'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Booking Ref</span>
              <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{savedBooking?.bookingRef || bookingRef}</span>
            </div>
            {contactName && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Name</span>
                <span style={{ fontWeight: 600 }}>{contactName}</span>
              </div>
            )}
            {contactEmail && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Email</span>
                <span style={{ fontWeight: 600 }}>{contactEmail}</span>
              </div>
            )}
          </div>

          {/* Google Meet + Calendar */}
          <div style={{ background: 'rgba(66, 133, 244, 0.08)', border: '1px solid rgba(66, 133, 244, 0.2)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="14" height="16" rx="2" fill="#4285F4"/><path d="M16 8l6-3v14l-6-3V8z" fill="#34A853"/><rect x="5" y="9" width="8" height="6" rx="1" fill="white" opacity="0.9"/></svg>
              <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Google Meet Session</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {contactEmail
                ? `Meet link and calendar invite will be sent to ${contactEmail}`
                : 'Your session will be via Google Meet.'}
            </p>
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent((selectedService?.name || 'AI Session') + ' — Longcare AU')}&dates=${(() => { const d = new Date(); d.setDate(d.getDate() + 3); const start = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; d.setHours(d.getHours() + 1); const end = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; return start + '/' + end; })()}&details=${encodeURIComponent(`Longcare AU — AI Mentoring Session\n\nService: ${selectedService?.name || ''}\nBooking Ref: ${savedBooking?.bookingRef || bookingRef}\nClient: ${contactName}\n\nJoin via Google Meet:\n${savedBooking?.meetLink || meetLink}\n\nContact: ceo@longcare.au\nWhatsApp: +61 455 301 335`)}&location=${encodeURIComponent(savedBooking?.meetLink || meetLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: 0, padding: '0.75rem 1.5rem', width: 'auto', background: '#4285F4' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" fill="none"/><path d="M3 9h18M9 4v18" stroke="white" strokeWidth="2"/></svg>
              Add to Google Calendar
            </a>
          </div>

          {/* WhatsApp Support */}
          {contactPhone && (
            <div style={{ background: 'rgba(37, 211, 102, 0.08)', border: '1px solid rgba(37, 211, 102, 0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
              <a
                href={`https://wa.me/61455301335?text=${encodeURIComponent(`Hi Longcare! I just booked: ${selectedService?.name || 'a session'}\nRef: ${savedBooking?.bookingRef || bookingRef}\nName: ${contactName}\nTime: ${selectedTime}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: 0, padding: '0.75rem 1.5rem', width: 'auto', background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.23C8.67 21.54 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.12c-.23.65-1.36 1.22-1.87 1.28-.46.06-.81.21-2.73-.57-2.31-.94-3.78-3.3-3.89-3.45-.11-.15-.91-1.22-.91-2.33 0-1.1.57-1.65.78-1.87.21-.22.46-.28.61-.28h.44c.14 0 .33-.05.52.4.19.45.66 1.62.72 1.74.06.11.1.25.02.4-.08.15-.12.25-.23.38-.12.14-.25.31-.35.41-.12.12-.24.25-.1.49.13.24.6 1 1.3 1.62.9.8 1.65 1.05 1.89 1.17.24.11.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.23z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          )}

          {/* Payment reminder */}
          <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ color: '#fcd34d', fontSize: '0.85rem' }}>
              Please complete payment before your session. You can pay via Stripe, bank transfer, or QR scan.
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://app.longcare.au" className="btn-primary" style={{ margin: 0, width: 'auto', padding: '0.75rem 1.5rem' }}>
              View Dashboard
            </a>
            <button
              className="btn-secondary"
              style={{ margin: 0, width: 'auto', padding: '0.75rem 1.5rem' }}
              onClick={() => {
                setStep('select');
                setSelectedServiceId(null);
                setSelectedTime(null);
                setPaymentMode('none');
                setStripeError(null);
                setBankCurrency('AUD');
                setContactName('');
                setContactEmail('');
                setContactPhone('');
                setSavedBooking(null);
              }}
            >
              Book Another Session
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
