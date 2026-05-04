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
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: 'demo', method: 'stripe_card' }),
      });
      const json = await res.json();
      if (json.success && json.data?.checkoutUrl) {
        window.location.href = json.data.checkoutUrl;
      } else {
        setStripeError('Stripe test mode — configure STRIPE_SECRET_KEY to enable');
        setPaymentMode('stripe');
      }
    } catch {
      setStripeError('Stripe test mode — configure STRIPE_SECRET_KEY to enable');
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
            Bank Transfer / PayID
          </button>

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
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.1rem' }}>
                Bank Transfer Instructions
              </h3>
              <div style={{ display: 'grid', gap: '0.6rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>PayID</span>
                  <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>ceo@longcare.au</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Account Name</span>
                  <span style={{ fontWeight: 600 }}>Longcare AU</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Reference</span>
                  <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>BOOK-DEMO</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Amount</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                    {selectedService
                      ? `${formatPrice(selectedService.price_cents, selectedService.currency)} AUD`
                      : '—'}
                  </span>
                </div>
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: '1.5rem', background: 'var(--accent)' }}
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
          <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
            Check your email for Google Meet link.
          </p>
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '1.25rem',
              borderRadius: '12px',
              marginTop: '1.5rem',
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Time</span>
              <span style={{ fontWeight: 600 }}>{selectedTime}</span>
            </div>
          </div>
          <button
            className="btn-secondary"
            onClick={() => {
              setStep('select');
              setSelectedServiceId(null);
              setSelectedTime(null);
              setPaymentMode('none');
              setStripeError(null);
            }}
          >
            Book Another Session
          </button>
        </div>
      )}
    </main>
  );
}
