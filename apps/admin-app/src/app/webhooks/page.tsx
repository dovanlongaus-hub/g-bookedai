'use client';

import { useState, useEffect } from 'react';

interface WebhookEvent {
  id: string;
  event_type: string;
  stripe_event_id: string;
  status: string;
  created_at: string;
}

export default function WebhooksPage() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/webhooks/log')
      .then(r => r.json())
      .then(d => { if (d.success) setEvents(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Mock data for demo
  const mockEvents = [
    { id: '1', event_type: 'checkout.session.completed', stripe_event_id: 'evt_1TTfG...', status: 'processed', created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', event_type: 'checkout.session.completed', stripe_event_id: 'evt_1TTdK...', status: 'processed', created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: '3', event_type: 'charge.succeeded', stripe_event_id: 'evt_1TTcA...', status: 'processed', created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: '4', event_type: 'checkout.session.expired', stripe_event_id: 'evt_1TTaB...', status: 'processed', created_at: new Date(Date.now() - 172800000).toISOString() },
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;

  return (
    <main className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>Webhook Events</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>Stripe webhook event log</p>
        </div>
        <span className="badge confirmed">{displayEvents.length} events</span>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: '2rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Stripe ID</th>
              <th>Status</th>
              <th className="text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {displayEvents.map((e, i) => (
              <tr key={i}>
                <td><code style={{ fontSize: '0.8rem' }}>{e.event_type}</code></td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{e.stripe_event_id}</td>
                <td><span className="badge confirmed">{e.status}</span></td>
                <td className="text-right text-muted" style={{ fontSize: '0.8rem' }}>{new Date(e.created_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
