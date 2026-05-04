'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function GetStartedContent() {
  const params = useSearchParams();
  const utm = params.toString() ? `?${params.toString()}` : '?utm_source=direct&utm_medium=landing&utm_campaign=get-started';

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Start Your AI Journey Today</h1>
        <p className="hero-subtitle">Personalised AI mentoring with Google Meet sessions, AI-generated notes, and a learning path built for you.</p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <div><span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>500+</span><br/><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Sessions</span></div>
          <div><span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>98%</span><br/><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Satisfaction</span></div>
          <div><span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>3</span><br/><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Languages</span></div>
        </div>
      </div>

      <div className="grid" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <h3 className="card-title">30-Min AI Starter</h3>
          <div className="card-price"><span>$29</span></div>
          <p className="card-desc">Quick introduction to AI tools. Perfect for beginners.</p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
            <li>Live Google Meet session</li>
            <li>AI-generated notes</li>
            <li>Next steps recommendation</li>
          </ul>
          <a href={`https://book.longcare.au${utm}`} className="btn btn-outline" style={{ width: '100%' }}>Get Started</a>
        </div>

        <div className="card" style={{ border: '1px solid var(--accent)' }}>
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: '#0b0c10', fontSize: '0.7rem', fontWeight: 'bold', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>MOST POPULAR</div>
          <h3 className="card-title">1-Hour AI Mentor</h3>
          <div className="card-price"><span>$99</span></div>
          <p className="card-desc">Deep-dive personalised mentoring tailored to your needs.</p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
            <li>60 minutes 1-on-1</li>
            <li>Custom AI workflows</li>
            <li>AI session summary + Q&A</li>
            <li>Personalised learning path</li>
          </ul>
          <a href={`https://book.longcare.au${utm}`} className="btn btn-primary" style={{ width: '100%' }}>Book Now</a>
        </div>

        <div className="card">
          <h3 className="card-title">5-Session Package</h3>
          <div className="card-price"><span>$450</span><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> save $45</span></div>
          <p className="card-desc">Structured learning path across 5 sessions for serious results.</p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
            <li>5 x 60min sessions</li>
            <li>Progress tracking</li>
            <li>All AI notes & recordings</li>
            <li>Priority scheduling</li>
          </ul>
          <a href={`https://book.longcare.au${utm}`} className="btn btn-outline" style={{ width: '100%' }}>Select Package</a>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>All sessions via Google Meet | Pay by card, QR, or Pay Later | Cancel free 24h before</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Questions? WhatsApp <a href="https://wa.me/61481993178" style={{ color: 'var(--accent)' }}>+61 481 993 178</a></p>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return <Suspense><GetStartedContent /></Suspense>;
}
