'use client';

import { useState } from 'react';

type Step = 1 | 2 | 3 | 4;

interface ServiceItem {
  name: string;
  price: string;
  duration: string;
}

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [business, setBusiness] = useState({ name: '', industry: '', website: '', description: '' });
  const [services, setServices] = useState<ServiceItem[]>([{ name: '', price: '', duration: '60' }]);
  const [branding, setBranding] = useState({ color: '#0070f3', subdomain: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const subdomain = branding.subdomain || business.name.toLowerCase().replace(/[^a-z0-9]/g, '');

  const addService = () => setServices([...services, { name: '', price: '', duration: '60' }]);
  const updateService = (i: number, field: keyof ServiceItem, value: string) => {
    const updated = [...services];
    updated[i][field] = value;
    setServices(updated);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: business.name,
          industry: business.industry,
          email: '', // Would come from auth
          website: business.website,
          plan: 'growth',
        }),
      });
      const data = await res.json();
      if (data.success) setSuccess(true);
    } catch {}
    setSubmitting(false);
  };

  if (success) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(12,206,107,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2.5rem' }}>✓</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>Your Platform is Ready!</h1>
        <p style={{ color: '#888', marginBottom: 8 }}>Your BookedAI tenant has been created:</p>
        <p style={{ color: '#0070f3', fontSize: '1.2rem', fontWeight: 600 }}>{subdomain}.bookedai.au</p>
        <p style={{ color: '#888', marginTop: 24 }}>We'll contact you within 24 hours to complete setup.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
          <a href="/" className="btn btn-primary">Back to Home</a>
          <a href="/docs" className="btn btn-secondary">Read Docs</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '100px 24px 64px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>Set Up Your Platform</h1>
      <p style={{ color: '#888', marginBottom: 32 }}>Step {step} of 4</p>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? '#0070f3' : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24 }}>Business Information</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Business Name *</label>
              <input value={business.name} onChange={e => setBusiness({ ...business, name: e.target.value })} placeholder="e.g. Acme Consulting" style={{ width: '100%', padding: '12px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#ededed', fontSize: '1rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Industry</label>
              <select value={business.industry} onChange={e => setBusiness({ ...business, industry: e.target.value })} style={{ width: '100%', padding: '12px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#ededed', fontSize: '1rem' }}>
                <option value="">Select industry</option>
                <option>Consulting</option><option>Education</option><option>Health & Wellness</option>
                <option>Technology</option><option>Finance</option><option>Real Estate</option>
                <option>Legal</option><option>Creative Services</option><option>Other</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Website</label>
              <input value={business.website} onChange={e => setBusiness({ ...business, website: e.target.value })} placeholder="https://your-website.com" style={{ width: '100%', padding: '12px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#ededed', fontSize: '1rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Description</label>
              <textarea value={business.description} onChange={e => setBusiness({ ...business, description: e.target.value })} placeholder="Tell us about your business..." rows={3} style={{ width: '100%', padding: '12px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#ededed', fontSize: '1rem', outline: 'none', resize: 'vertical' }} />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24 }}>Your Services</h2>
          {services.map((svc, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: 12 }}>
                <input value={svc.name} onChange={e => updateService(i, 'name', e.target.value)} placeholder="Service name" style={{ padding: '10px 12px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, color: '#ededed', fontSize: '0.9rem', outline: 'none' }} />
                <input value={svc.price} onChange={e => updateService(i, 'price', e.target.value)} placeholder="$ Price" style={{ padding: '10px 12px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, color: '#ededed', fontSize: '0.9rem', outline: 'none' }} />
                <select value={svc.duration} onChange={e => updateService(i, 'duration', e.target.value)} style={{ padding: '10px 8px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, color: '#ededed', fontSize: '0.85rem' }}>
                  <option value="30">30 min</option><option value="60">60 min</option><option value="90">90 min</option><option value="120">2 hours</option>
                </select>
              </div>
            </div>
          ))}
          <button onClick={addService} style={{ background: 'none', border: '1px dashed rgba(255,255,255,0.15)', color: '#888', padding: '10px', borderRadius: 8, width: '100%', cursor: 'pointer', fontSize: '0.9rem' }}>+ Add Another Service</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24 }}>Branding</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Brand Color</label>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input type="color" value={branding.color} onChange={e => setBranding({ ...branding, color: e.target.value })} style={{ width: 48, height: 48, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }} />
                <span style={{ color: '#888', fontFamily: 'monospace' }}>{branding.color}</span>
              </div>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Subdomain</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input value={branding.subdomain || subdomain} onChange={e => setBranding({ ...branding, subdomain: e.target.value })} style={{ padding: '12px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px 0 0 8px', color: '#ededed', fontSize: '1rem', outline: 'none', flex: 1 }} />
                <span style={{ padding: '12px 16px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0 8px 8px 0', color: '#555', fontSize: '0.9rem' }}>.bookedai.au</span>
              </div>
            </div>
            <div style={{ background: '#111', borderRadius: 12, padding: 24, marginTop: 8 }}>
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: 8 }}>Preview:</p>
              <div style={{ background: branding.color, height: 4, borderRadius: 2, marginBottom: 12 }} />
              <p style={{ fontWeight: 600 }}>{business.name || 'Your Business'}</p>
              <p style={{ color: '#555', fontSize: '0.8rem' }}>{(branding.subdomain || subdomain)}.bookedai.au</p>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24 }}>Review & Launch</h2>
          <div style={{ background: '#111', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.9rem', color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Business</h3>
            <p><strong>{business.name}</strong></p>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>{business.industry} • {business.website}</p>
          </div>
          <div style={{ background: '#111', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.9rem', color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Services ({services.filter(s => s.name).length})</h3>
            {services.filter(s => s.name).map((s, i) => (
              <p key={i} style={{ fontSize: '0.9rem' }}>{s.name} — ${s.price} AUD ({s.duration} min)</p>
            ))}
          </div>
          <div style={{ background: '#111', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: '0.9rem', color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Platform</h3>
            <p style={{ fontSize: '0.9rem' }}>Domain: <strong style={{ color: '#0070f3' }}>{(branding.subdomain || subdomain)}.bookedai.au</strong></p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>Brand color:</span>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: branding.color }} />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        {step > 1 && (
          <button onClick={() => setStep((step - 1) as Step)} className="btn btn-secondary" style={{ flex: 1 }}>Previous</button>
        )}
        {step < 4 ? (
          <button onClick={() => setStep((step + 1) as Step)} className="btn btn-primary" style={{ flex: 1 }}>
            Continue
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting} className="btn btn-primary" style={{ flex: 1, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Creating...' : 'Launch My Platform'}
          </button>
        )}
      </div>
    </div>
  );
}
