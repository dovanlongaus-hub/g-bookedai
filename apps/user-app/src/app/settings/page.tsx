'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Long D.',
    email: 'long@longcare.au',
    phone: '+61 4XX XXX XXX',
    language: 'en',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  });

  const [session, setSession] = useState({
    timezone: 'Australia/Sydney',
    preferredLength: '60',
  });

  const [saved, setSaved] = useState(false);

  const paymentHistory = [
    { id: 'PAY-0091', date: '28 Apr 2026', service: 'Introduction to Neural Networks', amount: '$149.00', method: 'Visa *4242', status: 'paid' },
    { id: 'PAY-0087', date: '21 Apr 2026', service: 'Data Pipeline Architecture', amount: '$199.00', method: 'Visa *4242', status: 'paid' },
    { id: 'PAY-0082', date: '14 Apr 2026', service: 'Python for Data Science', amount: '$149.00', method: 'Bank Transfer', status: 'paid' },
    { id: 'PAY-0075', date: '7 Apr 2026', service: 'AI Strategy Consultation', amount: '$249.00', method: 'Visa *4242', status: 'paid' },
    { id: 'PAY-0068', date: '31 Mar 2026', service: 'Career Pathway Review', amount: '$149.00', method: 'Visa *4242', status: 'refunded' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleStyle: React.CSSProperties = {
    position: 'relative',
    width: 44,
    height: 24,
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'background 0.2s',
    border: 'none',
    flexShrink: 0,
  };

  const toggleDotStyle = (on: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: 3,
    left: on ? 23 : 3,
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: '#fff',
    transition: 'left 0.2s',
  });

  return (
    <main className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>Settings</h1>
          <p className="user-info" style={{ marginTop: '0.25rem' }}>Manage your profile and preferences</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="user-info">app.longcare.au</p>
        </div>
      </div>

      {/* Profile Section */}
      <section className="section">
        <h2>Profile</h2>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 8, border: '1px solid var(--surface-border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 8, border: '1px solid var(--surface-border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 8, border: '1px solid var(--surface-border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Language</label>
              <select
                value={profile.language}
                onChange={e => setProfile({ ...profile, language: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 8, border: '1px solid var(--surface-border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit' }}
              >
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="section">
        <h2>Notification Preferences</h2>
        <div className="card">
          {([
            { key: 'email' as const, label: 'Email Notifications', desc: 'Booking confirmations, reminders, and session summaries' },
            { key: 'sms' as const, label: 'SMS Notifications', desc: 'Text message alerts for upcoming sessions' },
            { key: 'whatsapp' as const, label: 'WhatsApp Notifications', desc: 'WhatsApp messages for booking updates' },
          ]).map((item, i) => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: i < 2 ? '1px solid var(--surface-border)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{item.desc}</div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                style={{ ...toggleStyle, background: notifications[item.key] ? 'var(--primary)' : 'var(--surface-border)' }}
                aria-label={`Toggle ${item.label}`}
              >
                <span style={toggleDotStyle(notifications[item.key])} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Session Preferences */}
      <section className="section">
        <h2>Session Preferences</h2>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Timezone</label>
              <select
                value={session.timezone}
                onChange={e => setSession({ ...session, timezone: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 8, border: '1px solid var(--surface-border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit' }}
              >
                <option value="Australia/Sydney">AEST — Australia/Sydney</option>
                <option value="Australia/Melbourne">AEST — Australia/Melbourne</option>
                <option value="Australia/Brisbane">AEST — Australia/Brisbane</option>
                <option value="Australia/Perth">AWST — Australia/Perth</option>
                <option value="Australia/Adelaide">ACST — Australia/Adelaide</option>
                <option value="Pacific/Auckland">NZST — New Zealand</option>
                <option value="Asia/Ho_Chi_Minh">ICT — Vietnam</option>
                <option value="Asia/Shanghai">CST — China</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Preferred Session Length</label>
              <select
                value={session.preferredLength}
                onChange={e => setSession({ ...session, preferredLength: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 8, border: '1px solid var(--surface-border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit' }}
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Payment History */}
      <section className="section">
        <h2>Payment History</h2>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Ref', 'Date', 'Service', 'Method', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Amount' ? 'right' : 'left', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.75rem 1rem', borderBottom: '1px solid var(--surface-border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.id}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.date}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.9rem' }}>{p.service}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.method}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.9rem', textAlign: 'right', color: 'var(--success)' }}>{p.amount}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${p.status === 'paid' ? 'confirmed' : 'cancelled'}`}>
                      {p.status === 'paid' ? 'Paid' : 'Refunded'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Save Button */}
      <div style={{ textAlign: 'center', padding: '1rem 0 2rem' }}>
        <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem' }}>
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
        {saved && (
          <p style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '0.75rem' }}>Your preferences have been updated.</p>
        )}
      </div>
    </main>
  );
}
