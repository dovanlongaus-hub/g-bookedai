import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { LeadMagnetGrid } from '@/components/conversion/lead-magnet-grid';
import { getPageMetadata } from '@/lib/metadata';
import { leadMagnets } from '@/data/lead-magnets';

export const metadata: Metadata = getPageMetadata({
  title: 'Free AI Resources, Quizzes & Templates | LongCare AU',
  description:
    'Browse every free AI resource we offer Australian businesses — quizzes, calculators, policy templates, prompt packs, guides and the weekly newsletter.',
  path: '/lead-magnets',
});

const SITE_URL = 'https://longcare.au';

function LeadMagnetSchema() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free AI Resources for Australian Businesses',
    itemListElement: leadMagnets.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Offer',
        name: m.title,
        description: m.description,
        url: m.url.startsWith('http') ? m.url : `${SITE_URL}${m.url}`,
        price: '0',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        eligibleRegion: { '@type': 'Country', name: 'Australia' },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

export default function LeadMagnetsPage() {
  const featured = leadMagnets.filter((m) => m.featured);
  const totalCount = leadMagnets.length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <LeadMagnetSchema />

      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Resources', url: '/lead-magnets' },
        ]}
      />

      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 ring-1 ring-emerald-100 sm:p-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <Sparkles className="size-4" aria-hidden="true" />
          {totalCount} free resources for AU businesses
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Free AI Resources &amp; Tools for Australian SMEs
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Quizzes, calculators, policy templates, prompt packs and a weekly newsletter — all free,
          all written for Australian businesses, all in Australian English. Pick what fits the work
          you are doing this fortnight.
        </p>

        {featured.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-slate-700">Most popular:</span>
            {featured.map((m, i) => (
              <span key={m.id} className="text-slate-600">
                <Link
                  href={m.url}
                  className="font-medium text-emerald-700 underline-offset-2 hover:underline"
                >
                  {m.title}
                </Link>
                {i < featured.length - 1 && <span className="text-slate-400"> · </span>}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Grid */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Browse all resources</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Filter by who you are. Each resource is genuinely free — we ask for your email so we can
          send the file, and so we can follow up with related ideas. Unsubscribe at any time.
        </p>
        <div className="mt-6">
          <LeadMagnetGrid items={leadMagnets} />
        </div>
      </section>

      {/* Newsletter inline CTA */}
      <section className="mt-12 rounded-3xl border border-emerald-200 bg-white p-6 ring-1 ring-emerald-100 sm:p-10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Mail className="size-4" aria-hidden="true" />
              Weekly newsletter
            </div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Not sure where to start? Subscribe to the Monday digest.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Five things worth your attention, one Australian case study, one tool we tested
              honestly. About 1,800 Australian operators read it each week. Free, no spam, single
              click to unsubscribe.
            </p>
          </div>
          <Link
            href="/community/network"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Subscribe to the newsletter
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
