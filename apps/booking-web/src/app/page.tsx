'use client';

import { useState } from 'react';

type Step = 'select' | 'datetime' | 'payment';

const SERVICES = [
  { id: 'starter-30min', name: '30-min AI Starter', price: '$29', desc: 'Quick introduction to modern AI tools.' },
  { id: 'mentor-1h', name: '1-hour AI Mentor', price: '$99', desc: 'Deep-dive personalized mentoring session.' },
  { id: 'package-5', name: '5-Session Package', price: '$450', desc: 'Structured AI learning path.' },
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'];

export default function BookingPage() {
  const [step, setStep] = useState<Step>('select');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleNext = () => {
    if (step === 'select' && selectedService) setStep('datetime');
    else if (step === 'datetime' && selectedTime) setStep('payment');
  };

  return (
    <main className="container">
      <h1>Secure Your Session</h1>
      <p className="subtitle">AI recommendations → Booking Truth Engine</p>

      <div className="stepper">
        <div className={`step ${step === 'select' ? 'active' : 'completed'}`}>1</div>
        <div className={`step ${step === 'datetime' ? 'active' : step === 'payment' ? 'completed' : ''}`}>2</div>
        <div className={`step ${step === 'payment' ? 'active' : ''}`}>3</div>
      </div>

      {step === 'select' && (
        <div className="glass-panel">
          <h2 style={{ marginBottom: '1.5rem' }}>1. Choose a Service</h2>
          {SERVICES.map((s) => (
            <div 
              key={s.id} 
              className={`option-card ${selectedService === s.id ? 'selected' : ''}`}
              onClick={() => setSelectedService(s.id)}
            >
              <div>
                <div className="option-title">{s.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.desc}</div>
              </div>
              <div className="option-price">{s.price}</div>
            </div>
          ))}
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={!selectedService}
            style={{ opacity: selectedService ? 1 : 0.5, cursor: selectedService ? 'pointer' : 'not-allowed' }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 'datetime' && (
        <div className="glass-panel">
          <h2 style={{ marginBottom: '0.5rem' }}>2. Select Date & Time</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>All times are in your local timezone.</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button className="btn-secondary" style={{ width: 'auto', margin: 0 }}>&lt; Previous Week</button>
            <span style={{ fontWeight: 600 }}>This Week</span>
            <button className="btn-secondary" style={{ width: 'auto', margin: 0 }}>Next Week &gt;</button>
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

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" onClick={() => setStep('select')}>Back</button>
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={!selectedTime}
              style={{ opacity: selectedTime ? 1 : 0.5, cursor: selectedTime ? 'pointer' : 'not-allowed' }}
            >
              Confirm Time
            </button>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="glass-panel">
          <h2 style={{ marginBottom: '1.5rem' }}>3. Secure Payment</h2>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Service</span>
              <span style={{ fontWeight: 600 }}>{SERVICES.find(s => s.id === selectedService)?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
              <span style={{ fontWeight: 600 }}>{selectedTime}</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', margin: '1rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem' }}>
              <span>Total</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{SERVICES.find(s => s.id === selectedService)?.price}</span>
            </div>
          </div>

          <button className="btn-primary" style={{ marginBottom: '1rem' }}>Pay with Card (Stripe)</button>
          <button className="btn-secondary" style={{ margin: 0 }}>Bank Transfer / PayID</button>
          
          <button 
            className="btn-secondary" 
            style={{ marginTop: '2rem', border: 'none', color: 'var(--text-muted)' }} 
            onClick={() => setStep('datetime')}
          >
            &lt; Back to Date & Time
          </button>
        </div>
      )}
    </main>
  );
}
