'use client';

import { useState } from 'react';

const emailTemplates = [
  {
    name: 'Booking Confirmation',
    subject: 'Your Longcare AI Mentoring Session is Confirmed',
    status: 'Active',
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:2rem 1rem;">
  <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#6366f1,#818cf8);padding:2rem;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:1.5rem;">Booking Confirmed</h1>
    </div>
    <div style="padding:2rem;">
      <p style="color:#333;line-height:1.6;">Hi <strong>Sarah</strong>,</p>
      <p style="color:#555;line-height:1.6;">Your AI mentoring session has been confirmed. Here are the details:</p>
      <div style="background:#f8f9fa;border-radius:8px;padding:1.25rem;margin:1.5rem 0;border-left:4px solid #6366f1;">
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Session:</strong> 1-Hour AI Mentor</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Date:</strong> Monday, 12 May 2026 at 10:00 AM AEST</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Duration:</strong> 60 minutes</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Mentor:</strong> Long D.</p>
        <p style="margin:0;color:#333;"><strong>Meeting:</strong> Google Meet (link sent separately)</p>
      </div>
      <p style="color:#555;line-height:1.6;">A Google Calendar invite with the Meet link has been sent to your email.</p>
      <div style="text-align:center;margin:2rem 0;">
        <a href="https://app.longcare.au" style="background:#6366f1;color:#fff;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">View in Dashboard</a>
      </div>
      <p style="color:#999;font-size:0.85rem;line-height:1.5;">Need to reschedule? You can do so up to 24 hours before your session from your dashboard.</p>
    </div>
    <div style="background:#f8f9fa;padding:1.25rem;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;color:#999;font-size:0.8rem;">Longcare AU &middot; AI Mentoring &middot; longcare.au</p>
    </div>
  </div>
</div>
</body></html>`,
  },
  {
    name: '24h Reminder',
    subject: 'Reminder: Your AI Mentoring Session is Tomorrow',
    status: 'Active',
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:2rem 1rem;">
  <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#f59e0b,#fbbf24);padding:2rem;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:1.5rem;">Session Tomorrow</h1>
    </div>
    <div style="padding:2rem;">
      <p style="color:#333;line-height:1.6;">Hi <strong>Sarah</strong>,</p>
      <p style="color:#555;line-height:1.6;">Just a friendly reminder that your AI mentoring session is <strong>tomorrow</strong>.</p>
      <div style="background:#fffbeb;border-radius:8px;padding:1.25rem;margin:1.5rem 0;border-left:4px solid #f59e0b;">
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Session:</strong> 1-Hour AI Mentor</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Date:</strong> Monday, 12 May 2026 at 10:00 AM AEST</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Mentor:</strong> Long D.</p>
        <p style="margin:0;color:#333;"><strong>Meeting:</strong> <a href="#" style="color:#6366f1;">Join Google Meet</a></p>
      </div>
      <h3 style="color:#333;margin:1.5rem 0 0.75rem;">To prepare:</h3>
      <ul style="color:#555;line-height:1.8;padding-left:1.25rem;">
        <li>Test your camera and microphone</li>
        <li>Have any questions ready</li>
        <li>Review your previous session notes (if any)</li>
      </ul>
      <div style="text-align:center;margin:2rem 0;">
        <a href="https://app.longcare.au" style="background:#f59e0b;color:#fff;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">View Session Details</a>
      </div>
    </div>
    <div style="background:#f8f9fa;padding:1.25rem;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;color:#999;font-size:0.8rem;">Longcare AU &middot; AI Mentoring &middot; longcare.au</p>
    </div>
  </div>
</div>
</body></html>`,
  },
  {
    name: 'Session Summary Ready',
    subject: 'Your Session Notes & Action Items Are Ready',
    status: 'Active',
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:2rem 1rem;">
  <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#22d3ee,#06b6d4);padding:2rem;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:1.5rem;">Session Notes Ready</h1>
    </div>
    <div style="padding:2rem;">
      <p style="color:#333;line-height:1.6;">Hi <strong>Sarah</strong>,</p>
      <p style="color:#555;line-height:1.6;">Great session! Your AI-generated notes and action items are ready.</p>
      <div style="background:#f0fdfa;border-radius:8px;padding:1.25rem;margin:1.5rem 0;border-left:4px solid #22d3ee;">
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Session:</strong> 1-Hour AI Mentor</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Date:</strong> Monday, 12 May 2026</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Topics Covered:</strong> ChatGPT Prompting, Workflow Automation</p>
        <p style="margin:0;color:#333;"><strong>Next Session:</strong> Recommended in 1 week</p>
      </div>
      <h3 style="color:#333;margin:1.5rem 0 0.75rem;">Key Action Items:</h3>
      <ul style="color:#555;line-height:1.8;padding-left:1.25rem;">
        <li>Practice structured prompting techniques</li>
        <li>Set up a Zapier automation for email triage</li>
        <li>Explore Google AI Studio for custom models</li>
      </ul>
      <div style="text-align:center;margin:2rem 0;">
        <a href="https://app.longcare.au" style="background:#22d3ee;color:#fff;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">View Full Notes</a>
      </div>
      <div style="text-align:center;">
        <a href="https://book.longcare.au" style="color:#6366f1;text-decoration:none;font-weight:600;font-size:0.9rem;">Book Your Next Session &rarr;</a>
      </div>
    </div>
    <div style="background:#f8f9fa;padding:1.25rem;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;color:#999;font-size:0.8rem;">Longcare AU &middot; AI Mentoring &middot; longcare.au</p>
    </div>
  </div>
</div>
</body></html>`,
  },
  {
    name: 'Payment Received',
    subject: 'Payment Received — Thank You!',
    status: 'Active',
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:2rem 1rem;">
  <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:2rem;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:1.5rem;">Payment Received</h1>
    </div>
    <div style="padding:2rem;">
      <p style="color:#333;line-height:1.6;">Hi <strong>Sarah</strong>,</p>
      <p style="color:#555;line-height:1.6;">We have received your payment. Here is your receipt:</p>
      <div style="background:#f0fdf4;border-radius:8px;padding:1.25rem;margin:1.5rem 0;border-left:4px solid #22c55e;">
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Service:</strong> 1-Hour AI Mentor</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Amount:</strong> $99.00 AUD (incl. $9.00 GST)</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Payment Method:</strong> Visa ending in 4242</p>
        <p style="margin:0 0 0.5rem;color:#333;"><strong>Transaction ID:</strong> pi_3Q7xKL2eZvKYlo2C</p>
        <p style="margin:0;color:#333;"><strong>Date:</strong> 11 May 2026</p>
      </div>
      <p style="color:#555;line-height:1.6;">A tax invoice has been generated and is available in your dashboard.</p>
      <div style="text-align:center;margin:2rem 0;">
        <a href="https://app.longcare.au" style="background:#22c55e;color:#fff;padding:0.75rem 2rem;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">View Receipt</a>
      </div>
      <p style="color:#999;font-size:0.85rem;line-height:1.5;">This is an automated receipt. For questions about billing, contact us at hello@longcare.au</p>
    </div>
    <div style="background:#f8f9fa;padding:1.25rem;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;color:#999;font-size:0.8rem;">Longcare AU &middot; ABN: 12 345 678 901 &middot; longcare.au</p>
    </div>
  </div>
</div>
</body></html>`,
  },
];

export default function EmailsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>Email Templates</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Preview and manage transactional email templates
          </p>
        </div>
        <span className="badge confirmed">{emailTemplates.length} Active</span>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-label">Total Templates</div>
          <div className="stat-value bookings">{emailTemplates.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Provider</div>
          <div className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--accent)' }}>Gmail API</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Status</div>
          <div className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--success)' }}>All Active</div>
        </div>
      </div>

      <div className="section">
        <h2>Template Previews</h2>
        {emailTemplates.map((template, index) => (
          <div key={index} className="card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{template.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Subject: {template.subject}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge confirmed">{template.status}</span>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  {expandedIndex === index ? 'Collapse' : 'Preview'}
                </button>
              </div>
            </div>

            {expandedIndex === index && (
              <div style={{
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid var(--surface-border)',
                marginTop: '0.5rem',
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '0.5rem 1rem',
                  borderBottom: '1px solid var(--surface-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    HTML Preview
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(template.html);
                    }}
                  >
                    Copy HTML
                  </button>
                </div>
                <iframe
                  srcDoc={template.html}
                  style={{
                    width: '100%',
                    height: 520,
                    border: 'none',
                    background: '#f4f4f7',
                  }}
                  title={`${template.name} preview`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
