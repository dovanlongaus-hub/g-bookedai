'use client';

import { useState, useEffect } from 'react';

interface Tenant {
  id: string;
  domain: string;
  name: string;
  created_at: string;
}

export default function PlatformAdmin() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/partners/list')
      .then(r => r.json())
      .then(d => { if (d.success) setTenants(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Platform Admin</h1>
          <p style={{ color: '#888', marginTop: 4 }}>Manage BookedAI tenants and partners</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0cce6b' }} />
          <span style={{ color: '#888', fontSize: '0.85rem' }}>{tenants.length} tenants</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row" style={{ marginBottom: 48 }}>
        <div className="stat">
          <div className="stat-number" style={{ color: '#0070f3' }}>{tenants.length}</div>
          <div className="stat-label">Total Tenants</div>
        </div>
        <div className="stat">
          <div className="stat-number" style={{ color: '#0cce6b' }}>{tenants.filter(t => t.domain !== 'longcare.au').length}</div>
          <div className="stat-label">New Partners</div>
        </div>
        <div className="stat">
          <div className="stat-number" style={{ color: '#f5a623' }}>$0</div>
          <div className="stat-label">Platform MRR</div>
        </div>
        <div className="stat">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
      </div>

      {/* Tenants Table */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>Tenants</h2>
      <div style={{ background: '#111', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>
          <span>Name</span><span>Domain</span><span>Plan</span><span>Created</span>
        </div>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#555' }}>Loading tenants...</div>
        ) : tenants.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#555' }}>No tenants yet</div>
        ) : tenants.map((t, i) => (
          <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', padding: '14px 20px', borderBottom: i < tenants.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', fontSize: '0.9rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>{t.name}</span>
            <span style={{ color: '#0070f3' }}>{t.domain}</span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: t.domain === 'longcare.au' ? 'rgba(12,206,107,0.1)' : 'rgba(0,112,243,0.1)', color: t.domain === 'longcare.au' ? '#0cce6b' : '#0070f3', display: 'inline-block' }}>{t.domain === 'longcare.au' ? 'Growth' : 'Starter'}</span>
            <span style={{ color: '#555', fontSize: '0.8rem' }}>{new Date(t.created_at).toLocaleDateString('en-AU')}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <a href="/partners" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, textDecoration: 'none', color: '#ededed', transition: 'border-color 0.15s' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Partner Applications</h3>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>Review and approve new partner signups</p>
        </a>
        <a href="/docs" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, textDecoration: 'none', color: '#ededed' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>API Documentation</h3>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>View API reference and integration guides</p>
        </a>
        <a href="https://admin.longcare.au" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, textDecoration: 'none', color: '#ededed' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>Longcare Admin</h3>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>Manage first tenant: revenue, bookings, marketing</p>
        </a>
      </div>
    </div>
  );
}
