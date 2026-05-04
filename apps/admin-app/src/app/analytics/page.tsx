'use client';

import { RevenueChart } from '../../components/revenue-chart';

const FUNNEL = [
  { stage: 'Website Visit', count: 1250, color: '#3b82f6' },
  { stage: 'View Service', count: 840, color: '#6366f1' },
  { stage: 'Start Booking', count: 420, color: '#8b5cf6' },
  { stage: 'Complete Payment', count: 280, color: '#a855f7' },
  { stage: 'Confirmed', count: 260, color: '#22c55e' },
];

const METRICS = [
  { label: 'Booking Rate', value: '33.6%', desc: 'View → Book', trend: '+2.1%' },
  { label: 'Payment Rate', value: '66.7%', desc: 'Book → Pay', trend: '+5.3%' },
  { label: 'Confirmation Rate', value: '92.9%', desc: 'Pay → Confirm', trend: '+1.2%' },
  { label: 'No-Show Rate', value: '3.8%', desc: 'Confirmed → No Show', trend: '-0.5%' },
];

export default function AnalyticsPage() {
  return (
    <main className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>Analytics</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>Business performance insights</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['7d', '30d', '90d', 'All'].map(p => (
            <button key={p} style={{ padding: '0.4rem 0.8rem', background: p === '30d' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: 6, color: '#fff', fontSize: '0.8rem', cursor: 'pointer' }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
        {METRICS.map((m, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{m.label}</div>
            <div className="stat-value" style={{ color: m.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>{m.value}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{m.desc}</span>
              <span style={{ color: m.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)', fontSize: '0.75rem', fontWeight: 600 }}>{m.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Funnel */}
      <div className="section" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Booking Funnel</h2>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FUNNEL.map((f, i) => {
              const maxCount = FUNNEL[0].count;
              const pct = (f.count / maxCount * 100);
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 80px', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{f.stage}</span>
                  <div style={{ height: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: f.color, borderRadius: 6, transition: 'width 0.5s', display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>{pct.toFixed(0)}%</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'right' }}>{f.count.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="section" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Revenue Trend</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <RevenueChart />
        </div>
      </div>

      {/* Channel Attribution */}
      <div className="section" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Channel Attribution</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          {[
            { channel: 'Organic Search', bookings: 85, revenue: 4250, pct: 35 },
            { channel: 'WhatsApp', bookings: 62, revenue: 3100, pct: 25 },
            { channel: 'AI Chat', bookings: 48, revenue: 2400, pct: 20 },
            { channel: 'Referral', bookings: 30, revenue: 1500, pct: 12 },
            { channel: 'Google Ads', bookings: 20, revenue: 1000, pct: 8 },
          ].map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 80px', gap: 16, alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontSize: '0.85rem' }}>{c.channel}</span>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${c.pct}%`, background: 'var(--success)', borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>{c.bookings} bookings</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'right', color: 'var(--success)' }}>${c.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
