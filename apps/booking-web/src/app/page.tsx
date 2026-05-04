'use client';

import { useState, useEffect } from 'react';

type Step = 'select' | 'datetime' | 'payment' | 'success';

interface Service {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
}

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'];

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

  const selectedService = services.find((s) => s.id === selectedServiceId) || null;

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
  }, []);

  const handleNext = () => {
    if (step === 'select' && selectedServiceId) setStep('datetime');
    else if (step === 'datetime' && selectedTime) setStep('payment');
  };

  const handleStripeCheckout = async () => {
    setStripeLoading(true);
    setStripeError(null);
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
    if (s === 'payment') return 3;
    return 4;
  };
  const currentNum = stepNumber(step);

  return (
    <main className="container">
      <h1>Secure Your Session</h1>
      <p className="subtitle">AI recommendations → Booking Truth Engine</p>

      {step !== 'success' && (
        <div className="stepper">
          <div className={`step ${currentNum === 1 ? 'active' : currentNum > 1 ? 'completed' : ''}`}>1</div>
          <div className={`step ${currentNum === 2 ? 'active' : currentNum > 2 ? 'completed' : ''}`}>2</div>
          <div className={`step ${currentNum >= 3 ? 'active' : ''}`}>3</div>
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
            services.map((s) => (
              <div
                key={s.id}
                className={`option-card ${selectedServiceId === s.id ? 'selected' : ''}`}
                onClick={() => setSelectedServiceId(s.id)}
              >
                <div>
                  <div className="option-title">{s.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {s.description}
                  </div>
                </div>
                <div className="option-price">
                  {formatPrice(s.price_cents, s.currency)}
                </div>
              </div>
            ))}

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
          <div
            style={{
              background: 'rgba(79, 70, 229, 0.08)',
              border: '1px solid rgba(79, 70, 229, 0.2)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: '#a5b4fc',
            }}
          >
            Demo mode — Connect Google Calendar for real availability
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <button className="btn-secondary" style={{ width: 'auto', margin: 0 }}>
              &lt; Previous Week
            </button>
            <span style={{ fontWeight: 600 }}>This Week</span>
            <button className="btn-secondary" style={{ width: 'auto', margin: 0 }}>
              Next Week &gt;
            </button>
          </div>

          <div className="time-grid">
            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </div>
            ))}
          </div>

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

      {/* Step 3: Payment */}
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
            onClick={() => setPaymentMode('bank')}
          >
            Bank Transfer / PayID / QR
          </button>

          <button
            className="btn-secondary"
            style={{ margin: 0, marginTop: '0.75rem', border: '1px dashed rgba(255,255,255,0.15)', color: 'var(--accent)' }}
            onClick={() => setStep('success')}
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
                        `BSB: 062517\nAccount: 11404999\nPayID: 0481993178\nName: Van Long DO\nAmount: ${selectedService ? (selectedService.price_cents / 100).toFixed(2) : '0'} AUD\nRef: BOOK-${Date.now().toString(36).toUpperCase().slice(-6)}`
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
                      src={`https://img.vietqr.io/image/VCB-0071000985789-compact2.png?amount=${selectedService ? selectedService.price_cents * 60 : 0}&addInfo=BOOK-${Date.now().toString(36).toUpperCase().slice(-6)}&accountName=DO%20VAN%20LONG`}
                      alt="Quét mã thanh toán VND"
                      width={220}
                      height={220}
                      style={{ display: 'block' }}
                    />
                  </div>
                  <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1rem' }}>
                    {selectedService ? `${(selectedService.price_cents * 60).toLocaleString()} VND` : '—'}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    Tham khảo: 1 AUD ≈ 6,000 VND
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
                onClick={() => setStep('success')}
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Booking Ref</span>
              <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>BOOK-{Date.now().toString(36).toUpperCase().slice(-6)}</span>
            </div>
          </div>

          {/* Google Meet */}
          <div style={{ background: 'rgba(66, 133, 244, 0.08)', border: '1px solid rgba(66, 133, 244, 0.2)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="14" height="16" rx="2" fill="#4285F4"/><path d="M16 8l6-3v14l-6-3V8z" fill="#34A853"/><rect x="5" y="9" width="8" height="6" rx="1" fill="white" opacity="0.9"/></svg>
              <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Google Meet</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Your session will be via Google Meet. Link will be sent to your email.
            </p>
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent((selectedService?.name || 'AI Session') + ' — Longcare AU')}&dates=${(() => { const d = new Date(); d.setDate(d.getDate() + 3); const start = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; d.setHours(d.getHours() + 1); const end = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; return start + '/' + end; })()}&details=${encodeURIComponent('Booking with Longcare AU\\nService: ' + (selectedService?.name || '') + '\\nJoin via Google Meet\\n\\nhttps://longcare.au')}&location=Google+Meet`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: 0, padding: '0.75rem 1.5rem', width: 'auto', background: '#4285F4' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" fill="none"/><path d="M3 9h18M9 4v18" stroke="white" strokeWidth="2"/></svg>
              Add to Google Calendar
            </a>
          </div>

          {/* Payment reminder for Pay Later */}
          <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ color: '#fcd34d', fontSize: '0.85rem' }}>
              Please complete payment before your session. You can pay via Stripe, bank transfer, or PayID.
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
