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
      const res = await fetch(`https://api.g.bookedai.au/health/email-preview/${type}`);
      if (res.ok) {
        const html = await res.text();
        setRenderedHtml(html);
      } else {
        setRenderedHtml(renderClientPreview(type));
      }
    } catch {
      setRenderedHtml(renderClientPreview(type));
    }
    setLoading(false);
  }

  function renderClientPreview(type: string): string {
    // Client-side template rendering with sample data
    const data = SAMPLE_DATA[type] || {};
    const d = data;
    const NAVY = '#0f2942', TEAL = '#0d9488', GRAY = '#f8fafb';
    const header = `<div style="background:${NAVY};padding:28px 32px;text-align:center"><img src="https://g.bookedai.au/logo-light.png" height="40" alt="bookedai.au"/></div>`;
    const footer = `<div style="background:${GRAY};padding:24px 32px;text-align:center;font-size:12px;color:#627d98"><p style="margin:0 0 4px;font-weight:500">bookedai.au — The AI Revenue Engine</p><p style="margin:0">Melbourne, Australia | <a href="mailto:ceo@longcare.au" style="color:${TEAL}">ceo@longcare.au</a></p></div>`;

    const bodies: Record<string, string> = {
      welcome: `<h1 style="color:${NAVY};font-size:26px;margin:0 0 16px">Welcome to bookedai.au!</h1><p style="color:#334e68;line-height:1.7">Hi ${d.userName},</p><p style="color:#334e68;line-height:1.7">You're all set! Book your first AI mentoring session and start your growth journey.</p><a href="https://booking.g.bookedai.au" style="display:inline-block;padding:14px 36px;background:${TEAL};color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:24px 0">Book Your First Session</a>`,
      booking_confirmed: `<span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:#10b981;border-radius:20px">CONFIRMED</span><h1 style="color:${NAVY};font-size:26px;margin:12px 0 8px">Session Confirmed</h1><p style="color:#334e68;line-height:1.7">Hi ${d.userName},</p><p style="color:#334e68;line-height:1.7">Your <strong>${d.serviceName}</strong> session has been confirmed.</p><div style="background:${GRAY};border-left:4px solid ${TEAL};border-radius:12px;padding:20px 24px;margin:20px 0"><table style="width:100%"><tr><td style="padding:8px 0;font-size:13px;color:#627d98;width:130px">Date & Time</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.dateTime}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Duration</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.duration}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Reference</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.bookingRef}</td></tr></table></div><a href="https://meet.longcare.au/${d.bookingRef}" style="display:inline-block;padding:14px 36px;background:#4285F4;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:24px 0">Join Google Meet</a>`,
      reminder_24h: `<span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:#f59e0b;border-radius:20px">REMINDER</span><h1 style="color:${NAVY};font-size:26px;margin:12px 0 8px">Your Session is Tomorrow</h1><p style="color:#334e68;line-height:1.7">Hi ${d.userName},</p><p style="color:#334e68;line-height:1.7">Your <strong>${d.serviceName}</strong> session is scheduled for tomorrow.</p><div style="background:${GRAY};border-left:4px solid #f59e0b;border-radius:12px;padding:20px 24px;margin:20px 0"><table style="width:100%"><tr><td style="padding:8px 0;font-size:13px;color:#627d98;width:130px">Date & Time</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.dateTime}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Duration</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.duration}</td></tr></table></div><a href="https://meet.longcare.au/${d.bookingRef}" style="display:inline-block;padding:14px 36px;background:#4285F4;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:24px 0">Join Google Meet</a>`,
      booking_cancelled: `<span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:#ef4444;border-radius:20px">CANCELLED</span><h1 style="color:${NAVY};font-size:26px;margin:12px 0 8px">Booking Cancelled</h1><p style="color:#334e68;line-height:1.7">Hi ${d.userName},</p><p style="color:#334e68;line-height:1.7">Your <strong>${d.serviceName}</strong> booking has been cancelled.</p><div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:12px;padding:20px 24px;margin:20px 0"><table style="width:100%"><tr><td style="padding:8px 0;font-size:13px;color:#627d98;width:130px">Date</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.dateTime}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Reason</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.reason}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Refund</td><td style="font-size:14px;color:#10b981;font-weight:600">$${d.refundAmount} AUD</td></tr></table></div><a href="https://booking.g.bookedai.au" style="display:inline-block;padding:14px 36px;background:${TEAL};color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:24px 0">Book a New Session</a>`,
      booking_rescheduled: `<span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:#f59e0b;border-radius:20px">RESCHEDULED</span><h1 style="color:${NAVY};font-size:26px;margin:12px 0 8px">Session Rescheduled</h1><p style="color:#334e68;line-height:1.7">Hi ${d.userName},</p><p style="color:#334e68;line-height:1.7">Your <strong>${d.serviceName}</strong> session has been moved.</p><div style="background:${GRAY};border-left:4px solid ${TEAL};border-radius:12px;padding:20px 24px;margin:20px 0"><table style="width:100%"><tr><td style="padding:8px 0;font-size:13px;color:#627d98;width:130px">New Time</td><td style="font-size:14px;color:${TEAL};font-weight:600">${d.newDateTime}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Previous</td><td style="font-size:14px;color:#94a3b8;text-decoration:line-through">${d.oldDateTime}</td></tr></table></div><a href="${d.meetLink}" style="display:inline-block;padding:14px 36px;background:#4285F4;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:24px 0">Join Google Meet</a>`,
      payment_received: `<span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:#10b981;border-radius:20px">PAID</span><h1 style="color:${NAVY};font-size:26px;margin:12px 0 8px">Payment Received</h1><p style="color:#334e68;line-height:1.7">Hi ${d.userName},</p><p style="color:#334e68;line-height:1.7">We've received your payment for <strong>${d.serviceName}</strong>.</p><div style="background:${GRAY};border-left:4px solid #10b981;border-radius:12px;padding:20px 24px;margin:20px 0"><table style="width:100%"><tr><td style="padding:8px 0;font-size:13px;color:#627d98;width:130px">Amount</td><td style="font-size:20px;color:${NAVY};font-weight:700">$${d.amount} AUD</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Method</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.paymentMethod}</td></tr><tr><td style="padding:8px 0;font-size:13px;color:#627d98">Reference</td><td style="font-size:14px;color:#334e68;font-weight:500">${d.reference}</td></tr></table></div>`,
      session_summary_ready: `<span style="display:inline-block;padding:4px 12px;font-size:12px;font-weight:600;color:#fff;background:${TEAL};border-radius:20px">SUMMARY READY</span><h1 style="color:${NAVY};font-size:26px;margin:12px 0 8px">Your Session Summary</h1><p style="color:#334e68;line-height:1.7">Hi ${d.userName},</p><p style="color:#334e68;line-height:1.7">Your AI-generated summary for <strong>${d.serviceName}</strong> is ready.</p><div style="background:${GRAY};border-left:4px solid ${TEAL};border-radius:12px;padding:20px 24px;margin:20px 0;font-size:14px;color:#334e68;line-height:1.7;font-style:italic">"${d.summaryPreview}"</div><a href="https://app.g.bookedai.au/learning/${d.sessionId}" style="display:inline-block;padding:14px 36px;background:${TEAL};color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:24px 0">View Full Summary</a><a href="https://booking.g.bookedai.au" style="display:inline-block;padding:14px 36px;background:${NAVY};color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin:8px 0 24px 12px">Book Next Session</a>`,
    };

    const body = bodies[type] || `<p>Template: ${type}</p>`;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>*{box-sizing:border-box}body{margin:0;padding:0;background:#f1f5f9;font-family:'Outfit',Arial,sans-serif}</style></head><body><div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,41,66,0.06)">${header}<div style="padding:40px 32px">${body}</div>${footer}</div></body></html>`;
  }

  async function handleSendTest() {
    if (!sendTo) return;
    setSendStatus('sending');
    try {
      const res = await fetch(`https://api.g.bookedai.au/health/test-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeType, to: sendTo }),
      });
      const data = await res.json();
      if (data.success) {
        setSendStatus('sent');
        setTimeout(() => setSendStatus(null), 3000);
      } else {
        setSendStatus(`error: ${data.error || 'Failed'}`);
      }
    } catch {
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
