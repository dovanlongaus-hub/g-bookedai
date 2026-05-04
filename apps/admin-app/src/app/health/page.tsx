'use client';

import { useState, useEffect } from 'react';

interface ServiceHealth {
  name: string;
  url: string;
  status: 'checking' | 'healthy' | 'degraded' | 'down';
  latency?: number;
  details?: string;
}

const SERVICES: { name: string; url: string }[] = [
  { name: 'API Gateway', url: '/api/health' },
  { name: 'AI Agent', url: '/api/chat' },
  { name: 'Booking Page', url: 'https://book.longcare.au' },
  { name: 'Meet Rooms', url: 'https://meet.longcare.au' },
  { name: 'Landing Page', url: 'https://longcare.au' },
  { name: 'Platform (g.bookedai)', url: 'https://g.longcare.au' },
];

export default function HealthPage() {
  const [services, setServices] = useState<ServiceHealth[]>(
    SERVICES.map(s => ({ ...s, status: 'checking' as const }))
  );
  const [lastCheck, setLastCheck] = useState<string>('');

  const checkAll = async () => {
    setLastCheck(new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }));

    const results = await Promise.all(
      SERVICES.map(async (svc) => {
        const start = Date.now();
        try {
          const res = await fetch(svc.url, { method: svc.url.includes('/api/') ? 'POST' : 'GET',
            headers: svc.url.includes('/chat') ? { 'Content-Type': 'application/json' } : {},
            body: svc.url.includes('/chat') ? JSON.stringify({ message: 'health check' }) : undefined,
          });
          const latency = Date.now() - start;
          return {
            ...svc,
            status: res.ok ? 'healthy' as const : 'degraded' as const,
            latency,
            details: `${res.status} ${res.statusText}`,
          };
        } catch {
          return { ...svc, status: 'down' as const, latency: Date.now() - start, details: 'Connection failed' };
        }
      })
    );

    setServices(results);
  };

  useEffect(() => { checkAll(); }, []);

  const statusColor = (s: string) => s === 'healthy' ? '#0cce6b' : s === 'degraded' ? '#f5a623' : s === 'down' ? '#e00' : '#888';
  const allHealthy = services.every(s => s.status === 'healthy');

  return (
    <main className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>System Health</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>Last check: {lastCheck || 'Checking...'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: allHealthy ? '#0cce6b' : '#f5a623' }} />
            <span style={{ fontWeight: 600 }}>{allHealthy ? 'All Systems Operational' : 'Some Issues Detected'}</span>
          </div>
          <button className="btn btn-outline" onClick={checkAll} style={{ margin: 0, padding: '0.5rem 1rem' }}>Refresh</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '2rem' }}>
        {services.map((svc, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', marginBottom: 0, borderRadius: i === 0 ? '12px 12px 0 0' : i === services.length - 1 ? '0 0 12px 12px' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor(svc.status) }} />
              <span style={{ fontWeight: 500 }}>{svc.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {svc.latency !== undefined && (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{svc.latency}ms</span>
              )}
              <span className={`badge ${svc.status === 'healthy' ? 'confirmed' : svc.status === 'degraded' ? 'pending' : 'cancelled'}`}>
                {svc.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
