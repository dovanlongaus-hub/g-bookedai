'use client';

import { useState, useEffect } from 'react';
import { RevenueChart } from '../components/revenue-chart';

export default function AdminDashboard() {
  const [apiHealth, setApiHealth] = useState<any>(null);
  const [serviceCount, setServiceCount] = useState<number | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/health').then(r => r.json()).then(setApiHealth).catch(() => {});
    fetch('/api/services').then(r => r.json()).then(d => {
      if (d.success) setServiceCount(d.data.length);
    }).catch(() => {});
    fetch('/api/dashboard/stats').then(r => r.json()).then(d => { if (d.success) setStats(d.data); }).catch(() => {});
    fetch('/api/dashboard/revenue').then(r => r.json()).then(d => { if (d.success) setRevenueData(d.data); }).catch(() => {});
  }, []);
  const recentBookings = [
    { id: 'BK-1058', user: 'Long D.', service: 'Career Pathway Review', status: 'pending' as const, amount: '$149.00', date: '9 May 2026' },
    { id: 'BK-1052', user: 'Minh T.', service: 'ML Fundamentals', status: 'confirmed' as const, amount: '$199.00', date: '7 May 2026' },
    { id: 'BK-1047', user: 'Long D.', service: 'AI Strategy Consultation', status: 'confirmed' as const, amount: '$249.00', date: '5 May 2026' },
    { id: 'BK-1043', user: 'Sarah K.', service: 'Python for Data Science', status: 'confirmed' as const, amount: '$149.00', date: '3 May 2026' },
    { id: 'BK-1039', user: 'James L.', service: 'Cloud Architecture Review', status: 'cancelled' as const, amount: '$299.00', date: '2 May 2026' },
    { id: 'BK-1035', user: 'Emily R.', service: 'Resume & Portfolio Review', status: 'confirmed' as const, amount: '$99.00', date: '1 May 2026' },
  ];

  const revenueByService = [
    { service: 'AI Strategy Consultation', bookings: 24, revenue: '$5,976', share: '32%' },
    { service: 'ML Fundamentals', bookings: 18, revenue: '$3,582', share: '19%' },
    { service: 'Python for Data Science', bookings: 31, revenue: '$4,619', share: '25%' },
    { service: 'Career Pathway Review', bookings: 12, revenue: '$1,788', share: '10%' },
    { service: 'Cloud Architecture Review', bookings: 8, revenue: '$2,392', share: '13%' },
  ];

  const campaigns = [
    {
      id: 'MC-012',
      title: 'Winter AI Bootcamp Launch',
      status: 'review' as const,
      channels: 'Email, LinkedIn, Instagram, Facebook',
      createdBy: 'Marketing Agent',
      date: '2 May 2026',
      description: '8-channel campaign promoting the Winter 2026 AI Bootcamp series with early-bird pricing.',
    },
    {
      id: 'MC-011',
      title: 'Career Switcher Testimonials',
      status: 'draft' as const,
      channels: 'Email, Blog, YouTube, TikTok',
      createdBy: 'Marketing Agent',
      date: '30 Apr 2026',
      description: 'Video testimonial series from 3 career switchers who landed AI roles after Longcare mentoring.',
    },
    {
      id: 'MC-010',
      title: 'May Newsletter — AI Trends',
      status: 'published' as const,
      channels: 'Email',
      createdBy: 'Marketing Agent',
      date: '28 Apr 2026',
      description: 'Monthly newsletter covering top AI trends, new services, and student spotlights.',
    },
  ];

  const systemHealth = [
    { name: 'API Gateway', status: 'healthy' as const, latency: '42ms', uptime: '99.98%' },
    { name: 'PostgreSQL', status: 'healthy' as const, latency: '8ms', uptime: '99.99%' },
    { name: 'Firestore', status: 'healthy' as const, latency: '15ms', uptime: '99.97%' },
    { name: 'Stripe Webhooks', status: 'healthy' as const, latency: '120ms', uptime: '99.95%' },
    { name: 'Gemini AI', status: 'healthy' as const, latency: '380ms', uptime: '99.90%' },
    { name: 'Gmail API', status: 'degraded' as const, latency: '850ms', uptime: '98.50%' },
  ];

  return (
    <main className="dashboard animate-in">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard &mdash; Longcare AU</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Revenue operations &amp; platform management
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>admin.longcare.au</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Saturday, 3 May 2026
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Revenue Today</div>
          <div className="stat-value revenue">${stats ? `$${(stats.revenueToday / 100).toLocaleString('en-AU', { minimumFractionDigits: 2 })}` : '$1,247'}</div>
          <div style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {stats ? 'Live data' : '+18% vs yesterday'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value bookings">{stats?.totalBookings ?? 7}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {stats ? `${stats.confirmedBookings} confirmed, ${stats.pendingBookings} pending` : '4 confirmed, 3 pending'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value learning">{stats?.totalUsers ?? 156}</div>
          <div style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {stats ? 'Live data' : '+12 this week'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cancelled</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{stats?.cancelledBookings ?? 3}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {stats ? 'Live data' : '3 invoices awaiting'}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Summary */}
      <div className="metrics-row">
        <div className="stat-card">
          <div className="stat-label">MTD Revenue</div>
          <div className="stat-value revenue">{stats ? `$${(stats.revenueMtd / 100).toLocaleString('en-AU', { minimumFractionDigits: 2 })}` : '$4,832'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">MTD Bookings</div>
          <div className="stat-value bookings">{stats?.totalBookings ?? 28}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Session Value</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>$172</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">GST Collected (MTD)</div>
          <div className="stat-value" style={{ color: 'var(--text-muted)' }}>$439</div>
        </div>
      </div>

      {/* Revenue by Service */}
      <section className="section">
        <h2>Revenue by Service</h2>
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Service</th>
                <th className="text-right">Bookings</th>
                <th className="text-right">Revenue</th>
                <th className="text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              {(revenueData.length > 0 ? revenueData : revenueByService).map((row) => {
                const totalRevRaw = revenueData.length > 0
                  ? revenueData.reduce((sum: number, r: any) => sum + (r.revenueRaw || 0), 0)
                  : 1;
                const share = revenueData.length > 0 && totalRevRaw > 0
                  ? `${Math.round(((row as any).revenueRaw / totalRevRaw) * 100)}%`
                  : (row as any).share;
                return (
                  <tr key={row.service}>
                    <td>{row.service}</td>
                    <td className="text-right">{row.bookings}</td>
                    <td className="text-right" style={{ color: 'var(--success)' }}>{row.revenue}</td>
                    <td className="text-right text-muted">{share}</td>
                  </tr>
                );
              })}
              {(() => {
                const totals = revenueData.length > 0
                  ? {
                      bookings: revenueData.reduce((s: number, r: any) => s + r.bookings, 0),
                      revenue: `$${(revenueData.reduce((s: number, r: any) => s + (r.revenueRaw || 0), 0) / 100).toFixed(2)}`,
                    }
                  : { bookings: 93, revenue: '$18,357' };
                return (
                  <tr>
                    <td><strong>Total</strong></td>
                    <td className="text-right"><strong>{totals.bookings}</strong></td>
                    <td className="text-right" style={{ color: 'var(--success)' }}><strong>{totals.revenue}</strong></td>
                    <td className="text-right text-muted"><strong>100%</strong></td>
                  </tr>
                );
              })()}
            </tbody>
          </table>
        </div>
      </section>

      {/* Export */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <a href="/api/export/bookings.csv" className="btn btn-outline" style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Export Bookings CSV</a>
        <a href="/api/export/revenue.csv" className="btn btn-outline" style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Export Revenue CSV</a>
        <a href="/api/export/users.csv" className="btn btn-outline" style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Export Users CSV</a>
      </div>

      {/* Revenue Chart Placeholder */}
      <section className="section">
        <h2>Revenue Trend</h2>
        <RevenueChart />
      </section>

      {/* Recent Bookings */}
      <section className="section">
        <h2>Recent Bookings</h2>
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Service</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.recentBookings || recentBookings).map((booking: any) => (
                <tr key={booking.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{booking.id}</td>
                  <td>{booking.client || booking.user}</td>
                  <td>{booking.service}</td>
                  <td>
                    <span className={`badge ${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="text-right">{booking.amount}</td>
                  <td className="text-right text-muted">{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Marketing Campaigns */}
      <section className="section">
        <h2>Marketing Campaigns</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          AI-generated campaigns requiring approval before publishing
        </p>
        {campaigns.map((campaign) => (
          <div className="approval-card" key={campaign.id}>
            <div className="approval-card-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <strong>{campaign.title}</strong>
                  <span className={`badge ${campaign.status}`}>
                    {campaign.status === 'review' ? 'Needs Review' : campaign.status === 'draft' ? 'Draft' : 'Published'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {campaign.description}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                  {campaign.id} &middot; {campaign.channels} &middot; by {campaign.createdBy} &middot; {campaign.date}
                </p>
              </div>
            </div>
            {campaign.status !== 'published' && (
              <div className="approval-card-actions">
                <button className="btn btn-success btn-sm">Approve</button>
                <button className="btn btn-outline btn-sm">Preview</button>
                <button className="btn btn-danger btn-sm">Reject</button>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* System Health */}
      <section className="section">
        <h2>System Health</h2>
        {apiHealth && (
          <div className="card" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className={`health-dot ${apiHealth.status === 'ok' ? 'healthy' : 'degraded'}`} />
            <div>
              <strong>Live API Status:</strong>{' '}
              <span style={{ color: apiHealth.status === 'ok' ? 'var(--success)' : 'var(--warning)' }}>
                {apiHealth.status === 'ok' ? 'Healthy' : 'Degraded'}
              </span>
              {apiHealth.timestamp && (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.75rem' }}>
                  Last checked: {new Date(apiHealth.timestamp).toLocaleTimeString()}
                </span>
              )}
              {serviceCount !== null && (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.75rem' }}>
                  {serviceCount} services active
                </span>
              )}
            </div>
          </div>
        )}
        <div className="health-grid">
          {systemHealth.map((item) => (
            <div className="health-item" key={item.name}>
              <div className={`health-dot ${item.status}`} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {item.latency} &middot; {item.uptime} uptime
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
