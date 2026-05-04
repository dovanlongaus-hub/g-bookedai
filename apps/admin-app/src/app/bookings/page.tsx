'use client';

import { useState } from 'react';

type BookingStatus = 'confirmed' | 'pending' | 'cancelled';
type PaymentMethod = 'stripe' | 'bank_transfer';

interface Booking {
  id: string;
  client: string;
  service: string;
  date: string;
  status: BookingStatus;
  amount: string;
  paymentMethod: PaymentMethod;
  paymentConfirmed: boolean;
}

export default function BookingManagement() {
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'BK-1062', client: 'Long D.', service: 'Deep Learning with TensorFlow', date: 'Mon 12 May 2026, 10:00 AM', status: 'pending', amount: '$199.00', paymentMethod: 'bank_transfer', paymentConfirmed: false },
    { id: 'BK-1058', client: 'Long D.', service: 'Career Pathway Review', date: 'Fri 9 May 2026, 11:00 AM', status: 'pending', amount: '$149.00', paymentMethod: 'stripe', paymentConfirmed: true },
    { id: 'BK-1055', client: 'Anna W.', service: 'Cloud Architecture Review', date: 'Thu 8 May 2026, 2:00 PM', status: 'confirmed', amount: '$299.00', paymentMethod: 'stripe', paymentConfirmed: true },
    { id: 'BK-1052', client: 'Minh T.', service: 'ML Fundamentals', date: 'Wed 7 May 2026, 2:00 PM', status: 'confirmed', amount: '$199.00', paymentMethod: 'stripe', paymentConfirmed: true },
    { id: 'BK-1047', client: 'Long D.', service: 'AI Strategy Consultation', date: 'Mon 5 May 2026, 10:00 AM', status: 'confirmed', amount: '$249.00', paymentMethod: 'stripe', paymentConfirmed: true },
    { id: 'BK-1043', client: 'Sarah K.', service: 'Python for Data Science', date: 'Sat 3 May 2026, 9:00 AM', status: 'confirmed', amount: '$149.00', paymentMethod: 'bank_transfer', paymentConfirmed: true },
    { id: 'BK-1039', client: 'James L.', service: 'Cloud Architecture Review', date: 'Fri 2 May 2026, 3:00 PM', status: 'cancelled', amount: '$299.00', paymentMethod: 'stripe', paymentConfirmed: false },
    { id: 'BK-1035', client: 'Emily R.', service: 'Resume & Portfolio Review', date: 'Thu 1 May 2026, 11:00 AM', status: 'cancelled', amount: '$99.00', paymentMethod: 'stripe', paymentConfirmed: true },
  ]);

  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const confirmBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' as BookingStatus } : b));
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b));
  };

  const confirmPayment = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, paymentConfirmed: true, status: 'confirmed' as BookingStatus } : b));
  };

  const tabs: { key: 'all' | BookingStatus; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'pending', label: 'Pending' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1.25rem',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    background: active ? 'var(--primary)' : 'var(--surface)',
    color: active ? '#fff' : 'var(--text-muted)',
  });

  return (
    <main className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>Booking Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            View, confirm, and manage all bookings
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>admin.longcare.au</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value bookings">{counts.all}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Confirmed</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{counts.confirmed}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{counts.pending}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cancelled</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{counts.cancelled}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.key} style={tabStyle(filter === t.key)} onClick={() => setFilter(t.key)}>
            {t.label} ({counts[t.key]})
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <section className="section">
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <>
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{b.id}</td>
                    <td>{b.client}</td>
                    <td>{b.service}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{b.date}</td>
                    <td>
                      <span className={`badge ${b.status}`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td className="text-right" style={{ color: 'var(--success)' }}>{b.amount}</td>
                    <td className="text-right">
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        {b.status === 'pending' && (
                          <button className="btn btn-success btn-sm" onClick={() => confirmBooking(b.id)}>
                            Confirm
                          </button>
                        )}
                        {b.status === 'pending' && b.paymentMethod === 'bank_transfer' && !b.paymentConfirmed && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => confirmPayment(b.id)}
                          >
                            Confirm Payment
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button className="btn btn-danger btn-sm" onClick={() => cancelBooking(b.id)}>
                            Cancel
                          </button>
                        )}
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedBooking(selectedBooking === b.id ? null : b.id)}
                        >
                          {selectedBooking === b.id ? 'Hide' : 'Details'}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {selectedBooking === b.id && (
                    <tr key={`${b.id}-detail`}>
                      <td colSpan={7} style={{ background: 'rgba(99, 102, 241, 0.04)', padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
                          <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Booking Ref</div>
                            <div style={{ fontFamily: 'monospace' }}>{b.id}</div>
                          </div>
                          <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Client</div>
                            <div>{b.client}</div>
                          </div>
                          <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Payment Method</div>
                            <div>{b.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Stripe (Card)'}</div>
                          </div>
                          <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Payment Status</div>
                            <div style={{ color: b.paymentConfirmed ? 'var(--success)' : 'var(--warning)' }}>
                              {b.paymentConfirmed ? 'Confirmed' : 'Awaiting'}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
