'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  display_name: string;
  role: string;
  language: string;
  phone: string;
  tenant: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/dashboard/users')
      .then(r => r.json())
      .then(d => { if (d.success) setUsers(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = search
    ? users.filter(u => u.email.includes(search) || (u.display_name || '').toLowerCase().includes(search.toLowerCase()))
    : users;

  return (
    <main className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>User Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>{users.length} total users</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: 8, color: '#fff', outline: 'none', fontSize: '0.85rem', width: 250 }}
          />
          <a href="/api/export/users.csv" className="btn btn-outline" style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Export CSV</a>
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value bookings">{users.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Customers</div>
          <div className="stat-value learning">{users.filter(u => u.role === 'customer').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Admins</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{users.filter(u => u.role === 'admin').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">This Month</div>
          <div className="stat-value revenue">{users.filter(u => new Date(u.created_at) > new Date(Date.now() - 30 * 86400000)).length}</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: '2rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Language</th>
              <th>Phone</th>
              <th className="text-right">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading users...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No users found</td></tr>
            ) : filtered.map((u, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {(u.display_name || u.email)[0].toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 500 }}>{u.display_name || '—'}</span>
                  </div>
                </td>
                <td style={{ fontSize: '0.85rem' }}>{u.email}</td>
                <td><span className={`badge ${u.role === 'admin' ? 'pending' : 'confirmed'}`}>{u.role}</span></td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{u.language || 'en'}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{u.phone || '—'}</td>
                <td className="text-right text-muted" style={{ fontSize: '0.8rem' }}>{new Date(u.created_at).toLocaleDateString('en-AU')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
