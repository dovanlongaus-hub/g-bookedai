import { ArrowRight, Building2, Clock, MapPin, TrendingUp } from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import {
  INDUSTRY_LABELS,
  TIER_LABELS,
  getSortedCaseStudies,
  getAvailableIndustries,
  getAvailableTiers,
  type CaseStudy,
} from '@/data/case-studies';

export const metadata = getPageMetadata({
  title: 'AI Case Studies — Australian SME Outcomes | LongCare AU',
  description:
    'Anonymised case studies from Australian SMEs and startups using LongCare AU. Real metrics, AUD savings, and what worked — and what we declined to build.',
  path: '/case-studies',
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

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const heroMetrics = study.outcomeMetrics.slice(0, 3);
  return (
    <a
      href={`/case-studies/${study.slug}`}
      className="block no-underline group h-full"
    >
      <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm h-full flex flex-col hover:border-sky-300 hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-11 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {study.customerInitials}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-slate-900 leading-tight truncate">
              {study.customerName}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight inline-flex items-center gap-1">
              <MapPin className="size-3" aria-hidden /> {study.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200 text-[10px]">
            {INDUSTRY_LABELS[study.industry]}
          </span>
          <span className="trust-badge bg-slate-50 border border-slate-200 text-slate-600 text-[10px]">
            {TIER_LABELS[study.serviceTier]}
          </span>
          <span className="text-[11px] text-slate-500">
            {formatPublishedDate(study.publishedAt)}
          </span>
        </div>

        <h2 className="font-heading text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition-colors mb-3 leading-snug">
          {study.title}
        </h2>
        <p className="text-[13.5px] leading-relaxed text-slate-600 mb-5">
          {study.excerpt}
        </p>

        <ul className="grid grid-cols-3 gap-2 mb-5 mt-auto">
          {heroMetrics.map((m) => (
            <li
              key={m.label}
              className="border border-slate-200 rounded-lg p-2.5 bg-slate-50/40"
            >
              <p className="font-heading text-[15px] font-bold text-slate-900 leading-tight">
                {m.value}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                {m.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="size-3" aria-hidden /> {study.durationWeeks}-week build
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-sky-700 group-hover:gap-2 transition-all">
            Read story <ArrowRight className="size-3.5" />
          </span>
        </div>
      </article>
    </a>
  );
}

export default function CaseStudiesIndexPage() {
  const studies = getSortedCaseStudies();
  const industries = getAvailableIndustries();
  const tiers = getAvailableTiers();

  // ItemList of Article items
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://longcare.au/case-studies',
    name: 'LongCare AU Case Studies',
    description:
      'Anonymised case studies from Australian SMEs and startups using LongCare AU.',
    numberOfItems: studies.length,
    itemListElement: studies.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://longcare.au/case-studies/${s.slug}`,
      item: {
        '@type': 'Article',
        headline: s.title,
        description: s.excerpt,
        url: `https://longcare.au/case-studies/${s.slug}`,
        datePublished: s.publishedAt,
        dateModified: s.updatedAt ?? s.publishedAt,
        articleSection: 'Case Study',
        keywords: s.tags.join(', '),
        author: {
          '@type': 'Organization',
          name: 'LongCare AU',
        },
        publisher: {
          '@type': 'Organization',
          name: 'LongCare AU',
          logo: { '@type': 'ImageObject', url: 'https://longcare.au/logo.png' },
        },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://longcare.au' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: 'https://longcare.au/case-studies',
      },
    ],
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-16 sm:pb-24">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="text-[13px] text-slate-500 mb-8 flex items-center gap-2 flex-wrap"
        >
          <a href="/" className="hover:text-sky-700 no-underline">
            Home
          </a>
          <span aria-hidden>/</span>
          <span className="text-slate-700">Case Studies</span>
        </nav>

        {/* Hero */}
        <section className="max-w-3xl mb-14">
          <span className="eyebrow">Case Studies</span>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]">
            Real outcomes from Australian businesses.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 max-w-[60ch]">
            Anonymised stories from SMEs and startups using LongCare AU. Hard
            metrics, AUD savings, and — where we declined the work — an honest
            note on what we wouldn&rsquo;t build.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-[640px]">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
              <p className="font-heading text-2xl font-bold text-slate-900 leading-none">
                {studies.length}
              </p>
              <p className="text-[12px] text-slate-500 mt-1">Detailed stories</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
              <p className="font-heading text-2xl font-bold text-slate-900 leading-none">
                {industries.length}
              </p>
              <p className="text-[12px] text-slate-500 mt-1">Industries covered</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
              <p className="font-heading text-2xl font-bold text-slate-900 leading-none">
                100%
              </p>
              <p className="text-[12px] text-slate-500 mt-1">AU operations</p>
            </div>
          </div>
        </section>

        {/* Filter chips (anchor jump filters — server-rendered, lightweight) */}
        <section className="mb-10" aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">
            Filter case studies
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 self-center mr-2 inline-flex items-center gap-1">
              <Building2 className="size-3" aria-hidden /> By industry
            </span>
            <a
              href="#all"
              className="trust-badge bg-sky-50 text-sky-700 border border-sky-200 no-underline hover:bg-sky-100"
            >
              All
            </a>
            {industries.map((ind) => (
              <a
                key={ind}
                href={`#industry-${ind}`}
                className="trust-badge bg-white border border-slate-200 text-slate-600 no-underline hover:border-sky-300 hover:text-sky-700"
              >
                {INDUSTRY_LABELS[ind]}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 self-center mr-2 inline-flex items-center gap-1">
              <TrendingUp className="size-3" aria-hidden /> By tier
            </span>
            {tiers.map((tier) => (
              <a
                key={tier}
                href={`#tier-${tier}`}
                className="trust-badge bg-white border border-slate-200 text-slate-600 no-underline hover:border-sky-300 hover:text-sky-700"
              >
                {TIER_LABELS[tier]}
              </a>
            ))}
          </div>
        </section>

        {/* All studies */}
        <section id="all" aria-labelledby="all-heading" className="mb-14 scroll-mt-24">
          <h2
            id="all-heading"
            className="font-heading text-2xl font-bold text-slate-900 mb-6"
          >
            All case studies
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </section>

        {/* By industry sections (each industry gets an anchor) */}
        {industries.map((ind) => {
          const items = studies.filter((s) => s.industry === ind);
          if (items.length === 0) return null;
          return (
            <section
              key={ind}
              id={`industry-${ind}`}
              className="mb-14 scroll-mt-24"
              aria-labelledby={`industry-${ind}-heading`}
            >
              <h2
                id={`industry-${ind}-heading`}
                className="font-heading text-2xl font-bold text-slate-900 mb-2"
              >
                {INDUSTRY_LABELS[ind]}
              </h2>
              <p className="text-[14px] text-slate-500 mb-6">
                {items.length} {items.length === 1 ? 'story' : 'stories'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            </section>
          );
        })}

        {/* By tier sections */}
        {tiers.map((tier) => {
          const items = studies.filter((s) => s.serviceTier === tier);
          if (items.length === 0) return null;
          return (
            <section
              key={tier}
              id={`tier-${tier}`}
              className="mb-14 scroll-mt-24"
              aria-labelledby={`tier-${tier}-heading`}
            >
              <h2
                id={`tier-${tier}-heading`}
                className="font-heading text-2xl font-bold text-slate-900 mb-2"
              >
                {TIER_LABELS[tier]} stories
              </h2>
              <p className="text-[14px] text-slate-500 mb-6">
                {items.length} {items.length === 1 ? 'story' : 'stories'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="trust-card p-8 sm:p-10 text-center bg-slate-900 text-white border-slate-800 rounded-2xl">
          <h3 className="font-heading text-2xl font-bold text-white mb-3">
            See if this approach fits your business
          </h3>
          <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
            Twenty minutes with a senior practitioner. We&rsquo;ll tell you what
            to ship, what to skip, and where the real ROI sits.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/discovery-call"
              className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-2.5 rounded-lg no-underline transition-colors"
            >
              Book discovery call <ArrowRight className="size-4" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white font-semibold px-5 py-2.5 rounded-lg no-underline border border-white/10 transition-colors"
            >
              See services
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
