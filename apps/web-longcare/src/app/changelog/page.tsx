import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Rss,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { NewsletterForm } from '@/components/newsletter-form';
import {
  changelog,
  type ChangelogCategory,
  type ChangelogEntry,
} from '@/data/changelog';

export const metadata: Metadata = getPageMetadata({
  title: 'Changelog — What’s New | LongCare AU',
  description:
    'Reverse-chronological release notes for LongCare AU. Filter by platform, content, integration, pricing, community, or fixes.',
  path: '/changelog',
});

const CATEGORY_META: Record<
  ChangelogCategory,
  { label: string; classes: string }
> = {
  platform: {
    label: 'Platform',
    classes: 'border-sky-200 bg-sky-50 text-sky-700',
  },
  content: {
    label: 'Content',
    classes: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  integration: {
    label: 'Integration',
    classes: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  pricing: {
    label: 'Pricing',
    classes: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  community: {
    label: 'Community',
    classes: 'border-pink-200 bg-pink-50 text-pink-700',
  },
  fix: {
    label: 'Fix',
    classes: 'border-slate-200 bg-slate-50 text-slate-700',
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function CategoryBadge({ category }: { category: ChangelogCategory }) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${meta.classes}`}
    >
      <Tag className="size-3" /> {meta.label}
    </span>
  );
}

function EntryCard({ entry }: { entry: ChangelogEntry }) {
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.title,
    datePublished: entry.date,
    url: `https://longcare.au/changelog#${entry.version}`,
    author: { '@type': 'Organization', name: 'LongCare AU' },
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    keywords: entry.categories.join(', '),
    articleBody: entry.changes.join(' '),
  };

  return (
    <article
      id={entry.version}
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <time dateTime={entry.date} className="font-medium text-slate-700">
          {formatDate(entry.date)}
        </time>
        <span aria-hidden="true">·</span>
        <span className="font-mono text-slate-500">v{entry.version}</span>
      </div>
      <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-slate-900 font-heading">
        {entry.title}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {entry.categories.map((c) => (
          <CategoryBadge key={c} category={c} />
        ))}
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {entry.changes.map((c, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="size-1.5 rounded-full bg-sky-700 mt-2 flex-shrink-0" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      {entry.audience && entry.audience.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.audience.map((a) => (
            <span
              key={a}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700 capitalize"
            >
              For {a === 'sme' ? 'SMEs' : a + 's'}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function ChangelogPage() {
  // sort entries reverse chronological by date
  const entries = [...changelog].sort((a, b) => b.date.localeCompare(a.date));

  // collect categories present
  const presentCategories = Array.from(
    new Set(entries.flatMap((e) => e.categories)),
  ).sort() as ChangelogCategory[];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://longcare.au/changelog',
    name: 'LongCare AU — Changelog',
    description:
      'Release notes and product updates for LongCare AU.',
    url: 'https://longcare.au/changelog',
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    blogPost: entries.map((e) => ({
      '@type': 'BlogPosting',
      headline: e.title,
      datePublished: e.date,
      url: `https://longcare.au/changelog#${e.version}`,
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Changelog', url: '/changelog' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6 pb-10">
        <div className="max-w-2xl">
          <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
            <Sparkles className="size-3" /> What’s new
          </Badge>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Changelog
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Every meaningful change we ship — features, content, pricing, integrations,
            and the occasional bug fix. Most recent first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-full bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 transition"
            >
              See what’s next <ArrowRight className="size-4" />
            </Link>
            <a
              href="/changelog.rss"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 transition"
              aria-label="RSS feed (coming soon)"
            >
              <Rss className="size-4" /> RSS feed (coming soon)
            </a>
          </div>
        </div>
      </section>

      {/* Filter chips (visual cue; chips link to anchor jumps) */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-700 mr-1">
              Categories:
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 text-slate-800 px-2.5 py-1 text-xs font-medium">
              All
            </span>
            {presentCategories.map((c) => {
              const meta = CATEGORY_META[c];
              return (
                <span
                  key={c}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.classes}`}
                >
                  <Tag className="size-3" /> {meta.label}
                </span>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Filter chips are static for now. Use Cmd/Ctrl+F to find a specific topic;
            interactive filtering ships with the next changelog revision.
          </p>
        </div>
      </section>

      {/* Entries */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <ol className="flex flex-col gap-6">
          {entries.map((entry) => (
            <li key={entry.version}>
              <EntryCard entry={entry} />
            </li>
          ))}
        </ol>
      </section>

      {/* Subscribe */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Get the changelog by email
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            One email per release. No drip sequences, no upsells — just what shipped and
            why it matters.
          </p>
          <div className="mt-4">
            <NewsletterForm source="changelog" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <Link
              href="/trust"
              className="inline-flex items-center gap-1 hover:text-sky-700"
            >
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-700"
              >
                Trust
              </Badge>
              How we handle your data
            </Link>
            <Link
              href="/status"
              className="inline-flex items-center gap-1 hover:text-sky-700"
            >
              <Badge
                variant="outline"
                className="border-sky-200 bg-sky-50 text-sky-700"
              >
                Status
              </Badge>
              Service status
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
