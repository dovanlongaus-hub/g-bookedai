export default function AdminDashboard() {
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
          <div className="stat-value revenue">$1,247</div>
          <div style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            +18% vs yesterday
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Bookings Today</div>
          <div className="stat-value bookings">7</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            4 confirmed, 3 pending
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Users</div>
          <div className="stat-value learning">156</div>
          <div style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            +12 this week
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Payments</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>$447</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            3 invoices awaiting
          </div>
        </div>
      </div>

      {/* Monthly Revenue Summary */}
      <div className="metrics-row">
        <div className="stat-card">
          <div className="stat-label">MTD Revenue</div>
          <div className="stat-value revenue">$4,832</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">MTD Bookings</div>
          <div className="stat-value bookings">28</div>
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
              {revenueByService.map((row) => (
                <tr key={row.service}>
                  <td>{row.service}</td>
                  <td className="text-right">{row.bookings}</td>
                  <td className="text-right" style={{ color: 'var(--success)' }}>{row.revenue}</td>
                  <td className="text-right text-muted">{row.share}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td className="text-right"><strong>93</strong></td>
                <td className="text-right" style={{ color: 'var(--success)' }}><strong>$18,357</strong></td>
                <td className="text-right text-muted"><strong>100%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Revenue Chart Placeholder */}
      <section className="section">
        <h2>Revenue Trend</h2>
        <div className="chart-placeholder">
          <span>&#x1f4ca;</span>
          Revenue chart will render here — connect to BigQuery + Looker Studio
        </div>
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
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{booking.id}</td>
                  <td>{booking.user}</td>
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
