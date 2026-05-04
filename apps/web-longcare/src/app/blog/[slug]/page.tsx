import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const POSTS: Record<string, { title: string; date: string; content: string; tags: string[] }> = {
  'getting-started-with-ai': {
    title: 'Getting Started with AI: A Beginner\'s Guide',
    date: 'May 2026',
    tags: ['AI', 'Beginners', 'Guide'],
    content: `
## What is AI?

Artificial Intelligence is no longer just for tech giants. Today, anyone can use AI tools to boost productivity, automate tasks, and make smarter decisions.

## Why Should You Care?

In 2026, AI literacy is becoming as important as computer literacy was in the 2000s. Whether you're a student, professional, or business owner, understanding AI will give you a significant advantage.

## Getting Started in 3 Steps

### 1. Try a Free AI Tool
Start with [Google Gemini](https://gemini.google.com) or [ChatGPT](https://chat.openai.com). Simply type a question and see what happens.

### 2. Learn the Basics of Prompting
A good prompt has four parts:
- **Context**: What's the situation?
- **Task**: What do you want the AI to do?
- **Format**: How should the output look?
- **Constraints**: Any limitations?

### 3. Apply to Your Work
Think of one repetitive task in your daily routine. Try using AI to help with it. Common examples:
- Drafting emails
- Summarising documents
- Creating presentations
- Analysing data

## Ready for More?

If you want personalised guidance, [book a 30-minute AI Starter Session](/pricing) for just $29 AUD. You'll get 1-on-1 mentoring plus AI-generated notes afterward.

[Book Your First Session →](https://book.longcare.au)
    `,
  },
  '5-ways-ai-transforms-business': {
    title: '5 Ways AI Can Transform Your Small Business',
    date: 'May 2026',
    tags: ['SME', 'Business', 'AI Tools'],
    content: `
## The AI Advantage for Small Business

Small businesses in Australia are discovering that AI tools can level the playing field with larger competitors. Here are five practical ways to start.

## 1. Customer Service Automation

Deploy an AI chatbot on your website to answer common questions 24/7. At Longcare, our AI assistant handles pricing, booking, and support queries automatically.

**Cost savings:** ~20 hours/week of staff time

## 2. Content Marketing

Use AI to generate blog posts, social media content, and email newsletters. Tools like Gemini can create drafts in seconds that you then refine.

**Result:** 5x more content output

## 3. Appointment Scheduling

AI-powered booking systems can handle scheduling, reminders, and follow-ups automatically. No more phone tag.

**Impact:** 40% fewer no-shows

## 4. Financial Insights

AI can analyse your transaction data and provide insights you'd miss manually. From cashflow predictions to expense categorisation.

**Benefit:** Better financial decisions

## 5. Personalised Customer Experience

Use AI to segment customers and personalise communications. The right message to the right person at the right time.

**Outcome:** Higher conversion rates

## Get Expert Help

Want to implement AI in your business? Our [AI Business Transformation Program](https://book.longcare.au) provides hands-on guidance tailored to your industry.

[Explore Programs →](https://longcare.au/pricing)
    `,
  },
  'effective-ai-prompts': {
    title: 'How to Write Effective AI Prompts',
    date: 'May 2026',
    tags: ['Prompt Engineering', 'Tips'],
    content: `
## The Art of Prompting

The difference between a good and bad AI output often comes down to how you ask the question. Here's how to write prompts that get great results.

## The CTFC Framework

### Context
Tell the AI who you are and what situation you're in.

*Bad:* "Write an email"
*Good:* "I'm a small business owner replying to a customer complaint about a delayed order"

### Task
Be specific about what you want.

*Bad:* "Help me"
*Good:* "Write a professional, empathetic response acknowledging the delay and offering a 10% discount"

### Format
Specify the output format.

*Bad:* (no format specified)
*Good:* "Keep it under 150 words, use a warm but professional tone"

### Constraints
Set boundaries.

*Bad:* (no constraints)
*Good:* "Don't make promises about delivery dates. Don't offer more than 15% discount."

## Example Prompts

### For Email Writing
"Act as a professional email writer. I need to send a follow-up email to a potential client who attended my webinar last week. The tone should be friendly but professional. Include a clear CTA to book a call. Keep it under 200 words."

### For Data Analysis
"Analyse this sales data and identify: 1) Top 3 performing products, 2) Seasonal trends, 3) Recommendations for next quarter. Present findings in bullet points with percentages."

### For Content Creation
"Write a LinkedIn post about the importance of AI literacy for small business owners in Australia. Include a personal anecdote, 3 actionable tips, and end with a question to encourage engagement. Use line breaks for readability. Add relevant hashtags."

## Practice Makes Perfect

The best way to improve is to practice. [Book a 1-on-1 Prompt Engineering session](https://book.longcare.au) and we'll work through your specific use cases together.

[Start Learning →](https://book.longcare.au)
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — Longcare Blog`,
    description: post.content.slice(0, 160).replace(/[#*\n]/g, ''),
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: 760 }}>
      <a href="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.85rem' }}>&lt; Back to Blog</a>
      <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '1.5rem' }}>{post.title}</h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{post.date}</span>
        {post.tags.map(t => (
          <span key={t} style={{ background: 'rgba(102,252,241,0.1)', color: 'var(--accent)', padding: '2px 10px', borderRadius: 12, fontSize: '0.75rem' }}>{t}</span>
        ))}
      </div>
      <article style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }} dangerouslySetInnerHTML={{
        __html: post.content
          .replace(/^## (.*$)/gm, '<h2 style="color:#fff;font-size:1.5rem;margin:2rem 0 1rem;font-weight:600">$1</h2>')
          .replace(/^### (.*$)/gm, '<h3 style="color:#fff;font-size:1.15rem;margin:1.5rem 0 0.75rem;font-weight:600">$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ededed">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--accent)">$1</a>')
          .replace(/^- (.*$)/gm, '<li style="margin-left:1.5rem">$1</li>')
          .replace(/\n\n/g, '<br/><br/>')
      }} />
      <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 16, textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Ready to accelerate your AI journey?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Book a personalised AI mentoring session from $29 AUD.</p>
        <a href="https://book.longcare.au" className="btn btn-primary">Book a Session</a>
      </div>
    </div>
  );
}
