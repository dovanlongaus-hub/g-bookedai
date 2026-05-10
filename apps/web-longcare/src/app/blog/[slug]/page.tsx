import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Info, AlertTriangle, Sparkles } from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { NewsletterForm } from '@/components/newsletter-form';
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  type BlogHeroIllustration,
  type BlogIllustrationName,
  type BlogSection,
} from '@/data/blog-posts';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { HeroSolutions } from '@/components/illustrations/hero-solutions';
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { HeroCommunity } from '@/components/illustrations/hero-community';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { FlowAssessment } from '@/components/illustrations/flow-assessment';
import { FlowPromptAnatomy } from '@/components/illustrations/flow-prompt-anatomy';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { InfographicRoiQuadrant } from '@/components/illustrations/infographic-roi-quadrant';
import { InfographicStack } from '@/components/illustrations/infographic-stack';
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatPublishedDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found — Longcare Blog',
      robots: { index: false, follow: false },
    };
  }
  const description = post.excerpt.length > 160 ? post.excerpt.slice(0, 159) + '…' : post.excerpt;
  return getPageMetadata({
    title: `${post.title} — Longcare Blog`,
    description,
    path: `/blog/${slug}`,
    type: 'article',
  });
}

function HeroIllustrationRenderer({ name }: { name: BlogHeroIllustration }) {
  const props = { className: 'text-sky-700', width: 420, height: 320 } as const;
  switch (name) {
    case 'mentor':
      return <HeroMentor {...props} />;
    case 'agents':
      return <HeroAgents {...props} />;
    case 'toolkit':
      return <HeroToolkit {...props} />;
    case 'solutions':
      return <HeroSolutions {...props} />;
    case 'governance':
      return <HeroGovernance {...props} />;
    case 'community':
      return <HeroCommunity {...props} />;
    default:
      return null;
  }
}

function InlineIllustrationRenderer({ name }: { name: BlogIllustrationName }) {
  switch (name) {
    case 'flow-three-step':
      return <FlowThreeStep width={680} height={140} />;
    case 'flow-five-step':
      return <FlowFiveStep width={680} height={160} />;
    case 'flow-assessment':
      return <FlowAssessment width={680} height={220} />;
    case 'flow-prompt-anatomy':
      return <FlowPromptAnatomy width={680} height={220} />;
    case 'flow-automation':
      return <FlowAutomation width={680} height={180} />;
    case 'roi-quadrant':
      return <InfographicRoiQuadrant width={560} height={360} />;
    case 'infographic-stack':
      return <InfographicStack width={680} height={320} />;
    case 'infographic-comparison':
      return <InfographicComparison width={680} height={320} />;
    case 'infographic-timeline':
      return <InfographicTimeline width={680} height={180} />;
    default:
      return null;
  }
}

function CalloutCard({
  variant = 'info',
  text,
}: {
  variant?: 'info' | 'warning' | 'success';
  text: string;
}) {
  const styles = {
    info: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      title: 'text-sky-900',
      body: 'text-sky-900/80',
      Icon: Info,
      label: 'Note',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      title: 'text-amber-900',
      body: 'text-amber-900/80',
      Icon: AlertTriangle,
      label: 'Heads up',
    },
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      title: 'text-emerald-900',
      body: 'text-emerald-900/80',
      Icon: Sparkles,
      label: 'Tip',
    },
  } as const;
  const s = styles[variant];
  const Icon = s.Icon;
  return (
    <aside
      className={`my-8 rounded-2xl border ${s.border} ${s.bg} p-5 sm:p-6 flex gap-4`}
      role="note"
    >
      <Icon className={`size-5 mt-0.5 shrink-0 ${s.title}`} aria-hidden />
      <div>
        <p className={`text-[12px] font-semibold uppercase tracking-wider ${s.title} mb-1`}>{s.label}</p>
        <p className={`text-[15px] leading-relaxed ${s.body}`}>{text}</p>
      </div>
    </aside>
  );
}

function renderSection(section: BlogSection, idx: number) {
  if (section.type === 'paragraph') {
    return (
      <p
        key={idx}
        className="text-[16px] sm:text-[17px] leading-[1.8] text-slate-700 mb-5 max-w-[68ch]"
      >
        {section.text}
      </p>
    );
  }
  if (section.type === 'heading') {
    if (section.level === 3) {
      return (
        <h3
          key={idx}
          className="font-heading text-xl sm:text-2xl font-semibold text-slate-900 mt-8 mb-3"
        >
          {section.text}
        </h3>
      );
    }
    return (
      <h2
        key={idx}
        className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-4 scroll-mt-20"
      >
        {section.text}
      </h2>
    );
  }
  if (section.type === 'list') {
    return (
      <ul key={idx} className="my-6 space-y-3 max-w-[68ch]">
        {section.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[16px] leading-[1.7] text-slate-700">
            <CheckCircle2 className="size-5 mt-0.5 shrink-0 text-sky-600" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (section.type === 'callout') {
    return <CalloutCard key={idx} variant={section.variant ?? 'info'} text={section.text} />;
  }
  if (section.type === 'illustration') {
    return (
      <figure
        key={idx}
        className="my-10 -mx-2 sm:mx-0 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10"
      >
        {section.title && (
          <h3 className="font-heading text-xl sm:text-2xl text-slate-900 mb-5 text-center">
            {section.title}
          </h3>
        )}
        <div className="flex justify-center overflow-x-auto">
          <InlineIllustrationRenderer name={section.name} />
        </div>
        {section.caption && (
          <figcaption className="text-sm text-slate-600 text-center mt-4 max-w-[60ch] mx-auto">
            {section.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  return null;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const description =
    post.excerpt.length > 160 ? post.excerpt.slice(0, 159) + '…' : post.excerpt;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      logo: { '@type': 'ImageObject', url: 'https://longcare.au/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://longcare.au/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.sections.reduce((acc, s) => {
      if (s.type === 'list') {
        return acc + s.items.reduce((a, i) => a + i.split(/\s+/).length, 0);
      }
      if (s.type === 'illustration') {
        return acc + (s.caption ?? '').split(/\s+/).filter(Boolean).length;
      }
      return acc + ((s as { text?: string }).text ?? '').split(/\s+/).length;
    }, 0),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://longcare.au',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://longcare.au/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://longcare.au/blog/${slug}`,
      },
    ],
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero band — used when post has a heroIllustration */}
      {post.heroIllustration && (
        <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-12 sm:pt-16">
          <nav
            aria-label="Breadcrumb"
            className="text-[13px] text-slate-500 mb-8 flex items-center gap-2 flex-wrap"
          >
            <a href="/" className="hover:text-sky-700 no-underline">
              Home
            </a>
            <span aria-hidden>/</span>
            <a href="/blog" className="hover:text-sky-700 no-underline">
              Blog
            </a>
            <span aria-hidden>/</span>
            <span className="text-slate-700 truncate">{post.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200">
                  {post.category}
                </span>
                <span className="text-[13px] text-slate-500">{formatPublishedDate(post.publishedAt)}</span>
                <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-500">
                  <Clock className="size-3.5" aria-hidden /> {post.readTimeMinutes} min read
                </span>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <span className="text-[12px] text-slate-400">
                    Updated {formatPublishedDate(post.updatedAt)}
                  </span>
                )}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-[1.15] mb-4">
                {post.title}
              </h1>
              {post.heroSubtitle && (
                <p className="text-[18px] sm:text-[19px] leading-[1.6] text-slate-600 max-w-[68ch]">
                  {post.heroSubtitle}
                </p>
              )}
              <div className="mt-7 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {post.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-900 leading-tight">{post.author.name}</p>
                  <p className="text-[12px] text-slate-500 leading-tight">{post.author.role}</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <HeroIllustrationRenderer name={post.heroIllustration} />
            </div>
          </div>
        </div>
      )}

      <article
        className={`mx-auto max-w-[760px] px-6 sm:px-8 ${
          post.heroIllustration ? 'pt-8 pb-12 sm:pb-20' : 'py-12 sm:py-20'
        }`}
      >
        {/* Breadcrumbs (only when no hero band) */}
        {!post.heroIllustration && (
          <nav
            aria-label="Breadcrumb"
            className="text-[13px] text-slate-500 mb-8 flex items-center gap-2 flex-wrap"
          >
            <a href="/" className="hover:text-sky-700 no-underline">
              Home
            </a>
            <span aria-hidden>/</span>
            <a href="/blog" className="hover:text-sky-700 no-underline">
              Blog
            </a>
            <span aria-hidden>/</span>
            <span className="text-slate-700 truncate">{post.title}</span>
          </nav>
        )}

        {/* Header (only when no hero band) */}
        {!post.heroIllustration && (
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200">
                {post.category}
              </span>
              <span className="text-[13px] text-slate-500">{formatPublishedDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-500">
                <Clock className="size-3.5" aria-hidden /> {post.readTimeMinutes} min read
              </span>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span className="text-[12px] text-slate-400">
                  Updated {formatPublishedDate(post.updatedAt)}
                </span>
              )}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-[1.15] mb-4">
              {post.title}
            </h1>
            {post.heroSubtitle && (
              <p className="text-[18px] sm:text-[19px] leading-[1.6] text-slate-600 max-w-[68ch]">
                {post.heroSubtitle}
              </p>
            )}
            <div className="mt-7 pt-6 border-t border-slate-200 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-900 leading-tight">{post.author.name}</p>
                <p className="text-[12px] text-slate-500 leading-tight">{post.author.role}</p>
              </div>
            </div>
          </header>
        )}

        {/* Body */}
        <div className="prose-content">
          {post.sections.map((section, idx) => renderSection(section, idx))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Tagged
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="trust-badge bg-slate-50 border border-slate-200 text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 trust-card p-8 sm:p-10 text-center bg-slate-900 text-white border-slate-800">
          <h3 className="font-heading text-2xl font-bold text-white mb-3">
            Want this in your inbox?
          </h3>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            Practical AI tips for Australian SMEs, every fortnight. No spam, unsubscribe anytime.
          </p>
          <NewsletterForm />
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Related reading</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rp) => (
                <a key={rp.slug} href={`/blog/${rp.slug}`} className="block no-underline group">
                  <article className="trust-card p-6 h-full flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-700 mb-2">
                      {rp.category}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors mb-2 leading-snug">
                      {rp.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-slate-600 flex-grow mb-3">
                      {rp.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-sky-700 group-hover:gap-1.5 transition-all">
                      Read <ArrowRight className="size-3.5" />
                    </span>
                  </article>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 no-underline hover:gap-2.5 transition-all"
          >
            <ArrowLeft className="size-4" /> Back to all articles
          </a>
        </div>
      </article>
    </main>
  );
}

// Static export hint: only known posts
export const dynamicParams = false;
