'use client';

import { useState, useEffect, useRef } from 'react';

const EMAIL_TYPES = [
  { key: 'booking_confirmed', label: 'Booking Confirmed', description: 'Sent when a session is confirmed' },
  { key: 'reminder_24h', label: '24h Reminder', description: 'Sent 24 hours before a session' },
  { key: 'booking_cancelled', label: 'Booking Cancelled', description: 'Sent when a booking is cancelled' },
  { key: 'booking_rescheduled', label: 'Booking Rescheduled', description: 'Sent when a session is moved' },
  { key: 'payment_received', label: 'Payment Received', description: 'Sent after successful payment' },
  { key: 'session_summary_ready', label: 'Session Summary', description: 'Sent when AI summary is ready' },
  { key: 'welcome', label: 'Welcome', description: 'Sent on first sign-up' },
] as const;

// Sample data matching what the templates expect
const SAMPLE_DATA: Record<string, Record<string, unknown>> = {
  booking_confirmed: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    dateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    duration: '60 minutes',
    bookingRef: 'BK-2026-0507',
    bookingId: 'bk_abc123',
  },
  reminder_24h: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    dateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    duration: '60 minutes',
    bookingRef: 'BK-2026-0507',
    bookingId: 'bk_abc123',
  },
  booking_cancelled: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    dateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    bookingRef: 'BK-2026-0507',
    reason: 'Schedule conflict',
    refundAmount: '150.00',
  },
  booking_rescheduled: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    newDateTime: 'Thursday, 8 May 2026 at 3:00 PM AEST',
    oldDateTime: 'Wednesday, 7 May 2026 at 2:00 PM AEST',
    bookingRef: 'BK-2026-0507',
    meetLink: 'https://meet.longcare.au/BK-2026-0507',
  },
  payment_received: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    amount: '150.00',
    paymentMethod: 'Visa ending in 4242',
    reference: 'PAY-2026-0507-XK9',
  },
  session_summary_ready: {
    userName: 'Sarah Chen',
    serviceName: 'AI Strategy Mentoring',
    sessionId: 'sess_abc123',
    summaryPreview: 'Key topics covered: revenue automation strategy, AI agent deployment timeline, and customer journey optimization. Three action items were identified...',
  },
  welcome: {
    userName: 'Sarah Chen',
  },
};

function IframePreview({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      title="Email Preview"
      style={{
        width: '100%',
        height: '800px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        background: '#f1f5f9',
      }}
    />
  );
}

export default function EmailPreviewPage() {
  const [activeType, setActiveType] = useState<string>('booking_confirmed');
  const [renderedHtml, setRenderedHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sendTo, setSendTo] = useState('');
  const [sendStatus, setSendStatus] = useState<string | null>(null);

  useEffect(() => {
    generatePreview(activeType);
  }, [activeType]);

  async function generatePreview(type: string) {
    setLoading(true);
    try {
      // Try to fetch from API first
      const res = await fetch(`/api/notifications/email-preview/${type}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const html = await res.text();
        setRenderedHtml(html);
      } else {
        // Fallback: render client-side using the template function imported dynamically
        setRenderedHtml(generateClientSidePreview(type));
      }
    } catch {
      setRenderedHtml(generateClientSidePreview(type));
    }
    setLoading(false);
  }

  function generateClientSidePreview(type: string): string {
    // Return a placeholder if API is not available
    return `<!DOCTYPE html><html><body style="font-family: sans-serif; padding: 40px; text-align: center; color: #627d98;">
      <p>API not available. Start the API server to preview templates.</p>
      <p>Template type: <strong>${type}</strong></p>
    </body></html>`;
  }

  async function handleSendTest() {
    if (!sendTo) return;
    setSendStatus('sending');
    try {
      const res = await fetch('/api/notifications/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ type: activeType, to: sendTo }),
      });
      const data = await res.json();
      if (data.success) {
        setSendStatus('sent');
        setTimeout(() => setSendStatus(null), 3000);
      } else {
        setSendStatus(`error: ${data.error?.message || 'Failed'}`);
      }
    } catch (err) {
      setSendStatus('error: Network error');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafb', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f2942' }}>
            Email Templates
          </h1>
          <p style={{ margin: 0, fontSize: '15px', color: '#627d98' }}>
            Preview and test all 7 notification email templates
          </p>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Sidebar */}
          <div style={{ width: '280px', flexShrink: 0 }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              {EMAIL_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveType(t.key)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: '8px',
                    background: activeType === t.key ? '#0f2942' : 'transparent',
                    color: activeType === t.key ? '#fff' : '#334e68',
                    fontSize: '14px',
                    fontWeight: activeType === t.key ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    marginBottom: '2px',
                    transition: 'all 0.15s',
                  }}
                >
                  <div>{t.label}</div>
                  <div style={{
                    fontSize: '11px',
                    marginTop: '2px',
                    opacity: 0.7,
                    color: activeType === t.key ? '#94a3b8' : '#94a3b8',
                  }}>
                    {t.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Send Test */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', marginTop: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#0f2942' }}>
                Send Test Email
              </p>
              <input
                type="email"
                placeholder="recipient@email.com"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '13px',
                  marginBottom: '8px',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSendTest}
                disabled={!sendTo || sendStatus === 'sending'}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#0d9488',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: sendTo ? 'pointer' : 'not-allowed',
                  opacity: sendTo ? 1 : 0.5,
                }}
              >
                {sendStatus === 'sending' ? 'Sending...' : `Send "${EMAIL_TYPES.find(t => t.key === activeType)?.label}"`}
              </button>
              {sendStatus && sendStatus !== 'sending' && (
                <p style={{
                  margin: '8px 0 0',
                  fontSize: '12px',
                  color: sendStatus === 'sent' ? '#10b981' : '#ef4444',
                }}>
                  {sendStatus === 'sent' ? 'Test email sent successfully!' : sendStatus}
                </p>
              )}
            </div>
          </div>

          {/* Preview */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                padding: '12px 20px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '13px', color: '#627d98', fontWeight: 500 }}>
                  {EMAIL_TYPES.find(t => t.key === activeType)?.label} — Preview
                </span>
                <span style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  background: '#f1f5f9',
                  borderRadius: '12px',
                  color: '#627d98',
                }}>
                  600px max-width
                </span>
              </div>
              {loading ? (
                <div style={{ padding: '100px 0', textAlign: 'center', color: '#94a3b8' }}>
                  Loading preview...
                </div>
              ) : (
                <IframePreview html={renderedHtml} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
