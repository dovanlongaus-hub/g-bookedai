import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Longcare AU',
  description: 'Longcare AU provides AI-powered mentoring sessions and learning programs for individuals and SMEs in Australia.',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="hero-title" style={{ fontSize: '3rem' }}>About Longcare</h1>
      <p className="hero-subtitle">AI-powered mentoring for the future of work</p>

      <div className="card" style={{ marginTop: '3rem' }}>
        <h2 className="card-title">Our Mission</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Longcare AU is dedicated to making AI accessible for everyone — from individuals looking to upskill
          to SMEs seeking digital transformation. We combine personalised mentoring with AI-powered learning
          tools to deliver measurable outcomes.
        </p>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="card-title">How We Work</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Every session is conducted via Google Meet with your dedicated AI mentor. After each session,
          our AI generates comprehensive notes, Q&A extractions, improvement suggestions, and a
          personalised next-step recommendation. All materials are stored in Google Docs and available
          through your dashboard.
        </p>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="card-title">Technology</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Built on Google Cloud with Gemini AI, our platform uses the latest in AI technology to
          enhance your learning experience. From automated session summaries to intelligent course
          recommendations, every interaction is designed to accelerate your AI journey.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="https://book.longcare.au" className="btn btn-primary">Start Your AI Journey</a>
      </div>
    </div>
  );
}
