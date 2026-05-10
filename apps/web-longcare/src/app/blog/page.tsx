import { ArrowRight, Clock } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter-form';
import { getPageMetadata } from '@/lib/metadata';
import { getSortedPosts } from '@/data/blog-posts';

export const metadata = getPageMetadata({
  title: 'Blog — AI Insights for Australian SMEs | Longcare',
  description:
    'Practical AI guides for Australian businesses. Tutorials, tool comparisons, and strategy for SMEs ready to ship — not just plan.',
  path: '/blog',
});

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

export default function BlogPage() {
  const posts = getSortedPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://longcare.au/blog',
    name: 'LongCare AU Blog',
    description: 'Practical AI guides and case studies for Australian SMEs.',
    url: 'https://longcare.au/blog',
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      logo: { '@type': 'ImageObject', url: 'https://longcare.au/logo.png' },
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      url: `https://longcare.au/blog/${p.slug}`,
      keywords: p.tags.join(', '),
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      author: { '@type': 'Person', name: p.author.name },
    })),
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10 py-16 sm:py-24">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Practical AI insights for Australian businesses.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Industry-specific guides, tool comparisons, and tutorials. No hype — just what works.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <a href={`/blog/${featured.slug}`} className="block no-underline mb-10 group">
            <article className="trust-card p-8 sm:p-10 bg-gradient-to-br from-white to-slate-50">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200">Featured</span>
                <span className="trust-badge bg-slate-50 border border-slate-200 text-slate-600">
                  {featured.category}
                </span>
                <span className="text-[13px] text-slate-500">{formatPublishedDate(featured.publishedAt)}</span>
                <span className="inline-flex items-center gap-1 text-[13px] text-slate-500">
                  <Clock className="size-3.5" aria-hidden /> {featured.readTimeMinutes} min read
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-4">
                {featured.title}
              </h2>
              <p className="text-[15px] leading-relaxed text-slate-600 max-w-[70ch] mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="trust-badge bg-slate-50 border border-slate-200 text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="size-4" />
                </span>
              </div>
            </article>
          </a>
        )}

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="block no-underline group">
              <article className="trust-card p-7 h-full flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="trust-badge bg-slate-50 border border-slate-200 text-slate-600 text-[10px]">
                    {post.category}
                  </span>
                  <span className="text-[12px] text-slate-500">{formatPublishedDate(post.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1 text-[12px] text-slate-500">
                    <Clock className="size-3" aria-hidden /> {post.readTimeMinutes} min
                  </span>
                </div>
                <h2 className="font-heading text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-[14px] leading-relaxed text-slate-600 flex-grow mb-5">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-14 trust-card p-8 sm:p-10 text-center bg-slate-900 text-white border-slate-800">
          <h3 className="font-heading text-2xl font-bold text-white mb-3">Get AI insights every fortnight</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            Practical AI tips, Australian case studies, and new guides — straight to your inbox. No spam, unsubscribe anytime.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </main>
  );
}
