import type { Metadata } from 'next';
import { Breadcrumbs } from '../../components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Blog — Longcare AU',
  description: 'AI mentoring insights, tips, and guides from Longcare AU. Learn about prompt engineering, business automation, and AI strategy.',
};

const posts = [
  {
    title: 'Getting Started with AI: A Beginner\'s Guide',
    date: 'May 2026',
    preview:
      'Artificial Intelligence is no longer just for tech giants. In this guide, we break down the fundamentals of AI and show you how to start using tools like ChatGPT, Gemini, and Claude to boost your productivity — no coding required.',
    tags: ['AI', 'Beginners', 'Guide'],
    slug: '/blog/getting-started-with-ai',
  },
  {
    title: '5 Ways AI Can Transform Your Small Business',
    date: 'May 2026',
    preview:
      'Small businesses in Australia are discovering that AI tools can level the playing field against larger competitors. From automated customer support to smart scheduling, here are five practical ways to get started today.',
    tags: ['SME', 'Business', 'AI Tools'],
    slug: '/blog/5-ways-ai-transforms-business',
  },
  {
    title: 'How to Write Effective AI Prompts',
    date: 'May 2026',
    preview:
      'The difference between a good and bad AI output often comes down to how you write your prompt. Learn the CRAFT framework for structuring prompts that consistently deliver high-quality results across any AI model.',
    tags: ['Prompt Engineering', 'Tips'],
    slug: '/blog/effective-ai-prompts',
  },
];

export default function BlogPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]} />
      <h1 className="hero-title" style={{ fontSize: '3rem' }}>Blog</h1>
      <p className="hero-subtitle">
        Insights, tips, and guides to help you make the most of AI in your work and business.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem', maxWidth: 800, margin: '3rem auto 0' }}>
        {posts.map((post) => (
          <a key={post.title} href={post.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" style={{ transition: 'transform 0.2s, border-color 0.2s', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.date}</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: '0.75rem', color: 'var(--accent, #66fcf1)', fontWeight: 600,
                      background: 'rgba(102, 252, 241, 0.08)', padding: '0.25rem 0.6rem',
                      borderRadius: 10,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                {post.title}
              </h2>

              <p className="card-desc" style={{ marginBottom: '1rem' }}>
                {post.preview}
              </p>

              <span style={{
                color: 'var(--accent, #66fcf1)', fontWeight: 600, fontSize: '0.9rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              }}>
                Read More <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </a>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          More articles coming soon. Want to stay updated?
        </p>
        <a href="/contact" className="btn btn-outline">Subscribe to Updates</a>
      </div>
    </div>
  );
}
