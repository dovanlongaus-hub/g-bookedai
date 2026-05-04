'use client';

import { useState } from 'react';

const campaignData = {
  campaign: 'longcare-launch-2026',
  name: 'Longcare AU Launch — AI Mentoring',
  status: 'DRAFT' as const,
  channels: [
    {
      channel: 'Google Ads',
      icon: '🔍',
      status: 'Draft' as const,
      headline: 'Learn AI in 30 Minutes — $29',
      body: 'Expert AI mentoring sessions. Start your journey today with a 30-min starter for just $29 AUD. Google Meet + AI notes included.',
      ctaText: 'Book Now',
      ctaUrl: 'https://book.longcare.au?utm_source=google&utm_medium=cpc&utm_campaign=longcare-launch-2026',
    },
    {
      channel: 'LinkedIn',
      icon: '💼',
      status: 'Approved' as const,
      headline: 'Stop guessing. Start mastering AI.',
      body: `In 2026, AI literacy is not optional — it is essential.

Longcare AU offers personalised AI mentoring sessions designed for professionals and SMEs who want to:

✅ Automate repetitive workflows
✅ Build custom AI solutions
✅ Future-proof their careers

Every session includes:
📹 Live Google Meet with your mentor
📝 AI-generated session notes & action items
📊 Personalised learning path

Start from just $29 AUD.

#AI #Mentoring #FutureOfWork #ArtificialIntelligence #LongcareAU`,
      ctaText: 'Book Your First Session',
      ctaUrl: 'https://book.longcare.au?utm_source=linkedin&utm_medium=organic&utm_campaign=longcare-launch-2026',
    },
    {
      channel: 'Facebook',
      icon: '📘',
      status: 'Draft' as const,
      headline: 'Your AI mentor is waiting 🤖',
      body: `Ever wished you had a personal AI tutor? Now you do! 🎓

Longcare AU offers 1-on-1 AI mentoring sessions starting at just $29. Learn at your own pace, get AI-powered notes after every session, and follow a personalised learning path.

Perfect for beginners and pros alike! 💡

Book now 👉 book.longcare.au`,
      ctaText: 'Learn More',
      ctaUrl: 'https://book.longcare.au?utm_source=facebook&utm_medium=organic&utm_campaign=longcare-launch-2026',
    },
    {
      channel: 'Email Newsletter',
      icon: '📧',
      status: 'Approved' as const,
      headline: 'Welcome to Longcare — Your AI Learning Journey Starts Here',
      body: `Hi there,

Thank you for your interest in Longcare AU.

We are on a mission to make AI accessible for everyone — from students to business leaders.

Here is what we offer:

- 30-min AI Starter ($29): Quick intro to AI tools
- 1-hour AI Mentor ($99): Deep-dive personalised session
- 5-Session Package ($450): Structured learning path

Every session includes Google Meet + AI-generated notes + next steps.

Ready to start? Book your first session at book.longcare.au

Best regards,
Longcare AU Team`,
      ctaText: 'Book Now',
      ctaUrl: 'https://book.longcare.au?utm_source=email&utm_medium=newsletter&utm_campaign=longcare-launch-2026',
    },
    {
      channel: 'Google Business Profile',
      icon: '📍',
      status: 'Published' as const,
      headline: 'AI Mentoring Sessions — Now Available',
      body: 'Longcare AU now offers personalised AI mentoring sessions. Whether you are a beginner exploring AI tools or an SME looking to transform operations, we have a program for you. Sessions start at $29 AUD and include Google Meet + AI-powered session notes. Book at book.longcare.au',
      ctaText: 'Book Online',
      ctaUrl: 'https://book.longcare.au?utm_source=gbp&utm_medium=organic&utm_campaign=longcare-launch-2026',
    },
  ],
};

function getBadgeClass(status: string) {
  switch (status) {
    case 'Draft': return 'badge draft';
    case 'Approved': return 'badge confirmed';
    case 'Published': return 'badge published';
    default: return 'badge draft';
  }
}

export default function MarketingPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="dashboard animate-in">
      <div className="dashboard-header">
        <div>
          <h1>Marketing Campaigns — Ready to Publish</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {campaignData.name} &middot; <span className="badge draft">{campaignData.status}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge draft">Draft</span>
          <span className="badge confirmed">Approved</span>
          <span className="badge published">Published</span>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-label">Total Channels</div>
          <div className="stat-value bookings">{campaignData.channels.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Draft</div>
          <div className="stat-value" style={{ color: 'var(--text-muted)' }}>
            {campaignData.channels.filter(c => c.status === 'Draft').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Approved</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {campaignData.channels.filter(c => c.status === 'Approved').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Published</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>
            {campaignData.channels.filter(c => c.status === 'Published').length}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Channel Content</h2>
        {campaignData.channels.map((channel, index) => (
          <div key={index} className="card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{channel.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{channel.channel}</h3>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{channel.headline}</span>
                </div>
              </div>
              <span className={getBadgeClass(channel.status)}>{channel.status}</span>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 8,
              padding: '1.25rem',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              color: 'var(--text-main)',
              border: '1px solid var(--surface-border)',
              marginBottom: '1rem',
            }}>
              {channel.body}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => copyToClipboard(`${channel.headline}\n\n${channel.body}`, index)}
              >
                {copiedIndex === index ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <a
                href={channel.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                {channel.ctaText} &rarr;
              </a>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: 'auto' }}>
                UTM: {new URL(channel.ctaUrl).search}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
