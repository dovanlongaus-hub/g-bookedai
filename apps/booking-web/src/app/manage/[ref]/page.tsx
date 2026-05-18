'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ManageBookingPage() {
  const params = useParams();
  const ref = params.ref as string;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<'view' | 'reschedule' | 'cancel'>('view');
  const [cancelReason, setCancelReason] = useState('');

  const WA_NUMBER = '61455301335';
  const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  useEffect(() => {
    // Try to fetch booking by ref from API
    fetch(`/api/booking/${ref}`)
      .then(r => r.json())
      .then(d => { if (d.success) setBooking(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ref]);

  if (loading) {
    return (
      <main className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading booking {ref}...</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: 600, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <a href="https://longcare.au" style={{ textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Longcare" style={{ height: 28, marginBottom: '1rem' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </a>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Manage Your Booking</h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '1.1rem' }}>{ref}</p>
      </div>

      {/* Booking Info Card */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          📋 Booking Details
        </h2>
        <div style={{ display: 'grid', gap: 8, fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Reference</span>
            <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{ref}</span>
          </div>
          {booking ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Service</span>
                <span style={{ fontWeight: 600 }}>{booking.service || 'AI Mentoring Session'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <span style={{ fontWeight: 600, color: booking.status === 'CONFIRMED' ? '#22c55e' : booking.status === 'CANCELLED' ? '#ef4444' : '#f59e0b' }}>{booking.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount</span>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{booking.amountAud != null ? `$${booking.amountAud} AUD` : '—'}</span>
              </div>
              {booking.meetUrl && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Meeting</span>
                  <a href={booking.meetUrl} target="_blank" rel="noopener" style={{ color: '#4285F4', fontWeight: 600, textDecoration: 'none' }}>Join Meet →</a>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
              Booking details will be available once confirmed. Contact support if you need help.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      {action === 'view' && (
        <div style={{ display: 'grid', gap: 12 }}>
          {/* Reschedule */}
          <button className="glass-panel" onClick={() => setAction('reschedule')} style={{ border: '1px solid var(--surface-border)', cursor: 'pointer', padding: '1.25rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color 0.2s' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>📅</div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 2 }}>Change Date & Time</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Pick a new time slot that works better for you</p>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>→</span>
          </button>

          {/* Change Service */}
          <a href="https://book.longcare.au" className="glass-panel" style={{ border: '1px solid var(--surface-border)', cursor: 'pointer', padding: '1.25rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#ECFEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🔄</div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 2 }}>Choose Different Service</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Browse all services and book a different session</p>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>→</span>
          </a>

          {/* Cancel */}
          <button className="glass-panel" onClick={() => setAction('cancel')} style={{ border: '1px solid var(--surface-border)', cursor: 'pointer', padding: '1.25rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color 0.2s' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>❌</div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 2 }}>Cancel Booking</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Free cancellation 24h+ before session</p>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>→</span>
          </button>

          {/* Contact Support */}
          <a href={`https://wa.me/61455301335?text=${encodeURIComponent(`Hi, I need help with booking ${ref}`)}`} target="_blank" rel="noopener" className="glass-panel" style={{ border: '1px solid var(--surface-border)', cursor: 'pointer', padding: '1.25rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>💬</div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 2 }}>WhatsApp Support</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Chat with us for any questions</p>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>→</span>
          </a>
        </div>
      )}

      {/* Reschedule View */}
      {action === 'reschedule' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>📅 Pick a New Time</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Select your preferred date and time below.</p>
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8rem', color: '#92400E' }}>
            Free reschedule if 24h+ before session. Less than 24h: $15 fee.
          </div>
          {/* Mini calendar placeholder */}
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '2rem', textAlign: 'center', marginBottom: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Contact us to reschedule:</p>
            <a href={`https://wa.me/61455301335?text=${encodeURIComponent(`Hi, I'd like to reschedule booking ${ref}`)}`} className="btn-primary" style={{ margin: 0, width: 'auto', padding: '0.75rem 2rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}>💬 Reschedule via WhatsApp</a>
          </div>
          <button className="btn-secondary" style={{ margin: 0, width: '100%' }} onClick={() => setAction('view')}>← Back</button>
        </div>
      )}

      {/* Cancel View */}
      {action === 'cancel' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>❌ Cancel Booking</h2>
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <p style={{ color: '#991B1B', fontWeight: 600, marginBottom: 4 }}>Cancellation Policy</p>
            <p style={{ color: '#991B1B' }}>• 24h+ before: Full refund</p>
            <p style={{ color: '#991B1B' }}>• Less than 24h: 50% refund</p>
            <p style={{ color: '#991B1B' }}>• No-show: No refund</p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="cancel-reason" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Reason for cancellation (optional)</label>
            <textarea
              id="cancel-reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Let us know why you're cancelling..."
              rows={3}
              style={{ width: '100%', padding: '0.75rem 1rem', background: '#FFFFFF', border: '1px solid var(--surface-border)', borderRadius: 8, color: '#0F172A', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
            We don&apos;t auto-cancel online yet — sending this lets our team confirm your cancellation and any refund by WhatsApp or email.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" style={{ flex: 1, margin: 0 }} onClick={() => setAction('view')}>← Back</button>
            <a
              href={waLink(`Hi, I'd like to cancel booking ${ref}.${cancelReason ? ' Reason: ' + cancelReason : ''}`)}
              target="_blank"
              rel="noopener"
              style={{ flex: 1, padding: '0.75rem', background: '#ef4444', color: '#fff', borderRadius: 8, fontWeight: 600, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              💬 Send cancellation request
            </a>
          </div>
        </div>
      )}

      {/* QR Code for this booking */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Scan to access this page anytime</p>
        <div style={{ background: '#fff', display: 'inline-block', padding: 8, borderRadius: 8, marginTop: 8 }}>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`https://book.longcare.au/manage/${ref}`)}`} alt="Booking QR" width={120} height={120} style={{ display: 'block' }} />
        </div>
      </div>

      <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.7rem', marginTop: '2rem' }}>Powered by bookedai.au</p>
    </main>
  );
}
