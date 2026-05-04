import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Courses — Longcare AU',
  description: 'Self-paced AI learning courses. From basics to advanced prompt engineering.',
};

const LESSONS = [
  { id: 1, title: 'What is AI?', desc: 'Introduction to AI, ML, and deep learning', free: true, duration: '45 min' },
  { id: 2, title: 'Prompt Engineering Basics', desc: 'The CTFC framework for effective prompts', free: false, duration: '60 min' },
  { id: 3, title: 'AI Tools for Daily Productivity', desc: 'Google Gemini, ChatGPT, and automation tools', free: false, duration: '60 min' },
  { id: 4, title: 'Building AI Workflows', desc: 'Connect AI tools to automate your work', free: false, duration: '75 min' },
  { id: 5, title: 'Mini Project: Your First AI System', desc: 'Build and deploy a simple AI workflow', free: false, duration: '90 min' },
];

export default function CoursesPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>AI Courses</h1>
      <p className="hero-subtitle">Self-paced learning with AI-powered progress tracking</p>

      <div className="card" style={{ marginTop: '2rem', marginBottom: '2rem', border: '1px solid var(--accent)' }}>
        <h2 className="card-title">Track A: AI Foundations</h2>
        <p className="card-desc">5 lessons covering everything from AI basics to building your first AI workflow. Includes exercises, quizzes, and a mini project.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.5rem' }}>$79</span>
          <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>Full module (5 lessons) • or $19/lesson</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {LESSONS.map((lesson) => (
          <div key={lesson.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: lesson.free ? 'rgba(102,252,241,0.15)' : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: lesson.free ? 'var(--accent)' : 'var(--text-muted)',
              }}>{lesson.id}</div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{lesson.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lesson.desc} • {lesson.duration}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {lesson.free && <span style={{ background: 'rgba(102,252,241,0.1)', color: 'var(--accent)', padding: '2px 10px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 600 }}>FREE</span>}
              <a href={lesson.free ? '/blog/getting-started-with-ai' : 'https://book.longcare.au'} className={lesson.free ? 'btn btn-outline' : 'btn btn-primary'} style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                {lesson.free ? 'Start Free' : 'Unlock $19'}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Want personalised guidance? Book a 1-on-1 mentoring session.</p>
        <a href="https://book.longcare.au" className="btn btn-primary">Book AI Mentor — $99</a>
      </div>
    </div>
  );
}
