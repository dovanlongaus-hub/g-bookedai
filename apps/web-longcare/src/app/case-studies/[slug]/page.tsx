import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  MapPin,
  Quote,
  TrendingUp,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import {
  INDUSTRY_LABELS,
  TIER_LABELS,
  countWords,
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  type CaseStudy,
  type CaseStudyHeroIllustration,
  type CaseStudyIllustrationName,
  type CaseStudySection,
} from '@/data/case-studies';
import { findSKU } from '@/data/sku-catalog';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { HeroSolutions } from '@/components/illustrations/hero-solutions';
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { HeroCommunity } from '@/components/illustrations/hero-community';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { FlowAssessment } from '@/components/illustrations/flow-assessment';
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
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return {
      title: 'Case Study Not Found — LongCare AU',
      robots: { index: false, follow: false },
    };
  }
  const description =
    study.excerpt.length > 160 ? study.excerpt.slice(0, 159) + '…' : study.excerpt;
  return getPageMetadata({
    title: `${study.title} | LongCare AU Case Study`,
    description,
    path: `/case-studies/${slug}`,
    type: 'article',
  });
}

function HeroIllustrationRenderer({ name }: { name: CaseStudyHeroIllustration }) {
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

function InlineIllustrationRenderer({ name }: { name: CaseStudyIllustrationName }) {
  switch (name) {
    case 'flow-three-step':
      return <FlowThreeStep width={680} height={140} />;
    case 'flow-five-step':
      return <FlowFiveStep width={680} height={160} />;
    case 'flow-assessment':
      return <FlowAssessment width={680} height={220} />;
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

function MetricsRow({
  metrics,
}: {
  metrics: { label: string; value: string; caption?: string }[];
}) {
  return (
    <ul
      className={`my-8 grid gap-3 ${
        metrics.length === 4
          ? 'grid-cols-2 sm:grid-cols-4'
          : metrics.length === 3
            ? 'grid-cols-1 sm:grid-cols-3'
            : 'grid-cols-2'
      }`}
    >
      {metrics.map((m) => (
        <li
          key={m.label}
          className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm"
        >
          <p className="font-heading text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {m.value}
          </p>
          <p className="text-[12px] text-slate-500 mt-1 leading-tight">{m.label}</p>
          {m.caption && (
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{m.caption}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

function PullQuoteCard({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <figure className="my-10 bg-sky-50 border-l-4 border-sky-700 px-6 py-5 sm:px-8 sm:py-6 rounded-r-lg">
      <Quote className="size-5 text-sky-700 mb-3" aria-hidden />
      <blockquote>
        <p className="font-heading text-lg sm:text-xl italic text-slate-900 leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 text-[13px] font-semibold text-sky-900 not-italic">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}

function renderSection(section: CaseStudySection, idx: number) {
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
          <li
            key={i}
            className="flex gap-3 text-[16px] leading-[1.7] text-slate-700"
          >
            <span
              className="size-1.5 mt-3 shrink-0 rounded-full bg-sky-600"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (section.type === 'pullquote') {
    return (
      <PullQuoteCard
        key={idx}
        quote={section.quote}
        attribution={section.attribution}
      />
    );
  }
  if (section.type === 'metrics-row') {
    return <MetricsRow key={idx} metrics={section.metrics} />;
  }
  if (section.type === 'illustration') {
    return (
      <figure
        key={idx}
        className="my-10 -mx-2 sm:mx-0 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10"
      >
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

function ServicesSidebar({ ids }: { ids: string[] }) {
  const skus = ids.map(findSKU).filter((s): s is NonNullable<ReturnType<typeof findSKU>> => Boolean(s));
  if (skus.length === 0) return null;
  return (
    <aside
      aria-labelledby="services-used-heading"
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
    >
      <h3
        id="services-used-heading"
        className="font-heading text-base font-semibold text-slate-900 mb-3"
      >
        Services used
      </h3>
      <ul className="space-y-2">
        {skus.map((sku) => (
          <li key={sku.id}>
            <a
              href={sku.url}
              className="block group no-underline border border-slate-100 hover:border-sky-300 rounded-lg p-3 transition-colors"
            >
              <p className="text-[13px] font-semibold text-slate-900 group-hover:text-sky-700 leading-tight">
                {sku.name}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {sku.priceLabel} · {sku.unit}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function OutcomeTimeline({ study }: { study: CaseStudy }) {
  const w = study.durationWeeks;
  const halfway = Math.max(1, Math.round(w / 2));
  const milestones = [
    { year: 'Day 0', label: 'Discovery' },
    { year: 'Wk 1', label: 'Spec' },
    { year: `Wk ${Math.max(2, Math.round(w / 3))}`, label: 'Build' },
    { year: `Wk ${halfway}`, label: 'Pilot' },
    { year: `Wk ${w}`, label: 'Live' },
  ];
  return (
    <figure className="my-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
      <figcaption className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Outcome timeline
      </figcaption>
      <div className="flex justify-center overflow-x-auto">
        <InfographicTimeline width={680} height={180} milestones={milestones} />
      </div>
      <p className="text-[12px] text-slate-500 text-center mt-4">
        Total engagement: {w} weeks · Payback: {study.paybackMonths} months
      </p>
    </figure>
  );
}

function RelatedCard({ study }: { study: CaseStudy }) {
  return (
    <a href={`/case-studies/${study.slug}`} className="block no-underline group">
      <article className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-full flex flex-col hover:border-sky-300 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-3">
          <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200 text-[10px]">
            {INDUSTRY_LABELS[study.industry]}
          </span>
          <span className="text-[11px] text-slate-500">{study.location}</span>
        </div>
        <h3 className="font-heading text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors mb-2 leading-snug">
          {study.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-slate-600 flex-grow mb-3">
          {study.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-sky-700 group-hover:gap-1.5 transition-all">
          Read story <ArrowRight className="size-3.5" />
        </span>
      </article>
    </a>
  );
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const related = getRelatedCaseStudies(study, 3);
  const heroMetrics = study.outcomeMetrics.slice(0, 3);
  const description =
    study.excerpt.length > 160 ? study.excerpt.slice(0, 159) + '…' : study.excerpt;

  const wordCount = countWords(study);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description,
    datePublished: study.publishedAt,
    dateModified: study.updatedAt ?? study.publishedAt,
    articleSection: 'Case Study',
    keywords: study.tags.join(', '),
    wordCount,
    author: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LongCare AU',
      logo: { '@type': 'ImageObject', url: 'https://longcare.au/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'Organization',
      name: study.customerName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: study.location.split(',')[0]?.trim(),
        addressRegion: study.location.split(',')[1]?.trim(),
        addressCountry: 'AU',
      },
    },
    about: {
      '@type': 'Thing',
      name: INDUSTRY_LABELS[study.industry],
    },
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
      {
        '@type': 'ListItem',
        position: 3,
        name: study.title,
        item: `https://longcare.au/case-studies/${slug}`,
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

      {/* Hero band */}
      <header className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-8 sm:pb-12">
        <nav
          aria-label="Breadcrumb"
          className="text-[13px] text-slate-500 mb-8 flex items-center gap-2 flex-wrap"
        >
          <a href="/" className="hover:text-sky-700 no-underline">
            Home
          </a>
          <span aria-hidden>/</span>
          <a href="/case-studies" className="hover:text-sky-700 no-underline">
            Case Studies
          </a>
          <span aria-hidden>/</span>
          <span className="text-slate-700 truncate">{study.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
          <div>
            {/* Customer chip + meta */}
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold text-base shrink-0">
                {study.customerInitials}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-900 leading-tight">
                  {study.customerName}
                </p>
                <p className="text-[12px] text-slate-500 leading-tight inline-flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3" aria-hidden /> {study.location}
                  </span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="size-3" aria-hidden /> {study.size}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200">
                {INDUSTRY_LABELS[study.industry]}
              </span>
              <span className="trust-badge bg-slate-50 border border-slate-200 text-slate-600">
                {TIER_LABELS[study.serviceTier]}
              </span>
              <span className="text-[13px] text-slate-500">
                {formatPublishedDate(study.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-500">
                <Clock className="size-3.5" aria-hidden /> {study.durationWeeks}-week build
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-500">
                <TrendingUp className="size-3.5" aria-hidden /> {study.paybackMonths}-month payback
              </span>
              {study.updatedAt && study.updatedAt !== study.publishedAt && (
                <span className="text-[12px] text-slate-400">
                  Updated {formatPublishedDate(study.updatedAt)}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-slate-900 leading-[1.15] mb-4">
              {study.title}
            </h1>
            <p className="text-[18px] sm:text-[19px] leading-[1.6] text-slate-600 max-w-[68ch]">
              {study.excerpt}
            </p>

            {/* Hero metric strip */}
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[640px]">
              {heroMetrics.map((m) => (
                <li
                  key={m.label}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                >
                  <p className="font-heading text-2xl font-bold text-slate-900 leading-tight">
                    {m.value}
                  </p>
                  <p className="text-[12px] text-slate-500 mt-1 leading-tight">
                    {m.label}
                  </p>
                  {m.caption && (
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {m.caption}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {study.heroIllustration && (
            <div className="hidden lg:block">
              <HeroIllustrationRenderer name={study.heroIllustration} />
            </div>
          )}
        </div>
      </header>

      {/* Body grid: article + sidebar */}
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-start">
          <article>
            {/* Pull quote up top */}
            <PullQuoteCard
              quote={study.pullQuote.text}
              attribution={`${study.pullQuote.person}, ${study.pullQuote.role}`}
            />

            {/* Challenge / Solution intro */}
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-8 mb-4">
              The challenge
            </h2>
            <p className="text-[16px] sm:text-[17px] leading-[1.8] text-slate-700 mb-6 max-w-[68ch]">
              {study.challenge}
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-10 mb-4">
              What we built
            </h2>
            <p className="text-[16px] sm:text-[17px] leading-[1.8] text-slate-700 mb-6 max-w-[68ch]">
              {study.solution}
            </p>

            {/* Outcome metrics */}
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-10 mb-4">
              Outcomes
            </h2>
            <MetricsRow metrics={study.outcomeMetrics} />

            {/* Outcome timeline */}
            <OutcomeTimeline study={study} />

            {/* Long-form sections */}
            <div className="prose-content">
              {study.sections.map((section, idx) => renderSection(section, idx))}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Tagged
              </p>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="trust-badge bg-slate-50 border border-slate-200 text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <ServicesSidebar ids={study.servicesUsed} />

            {/* Quick facts card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-heading text-base font-semibold text-slate-900 mb-3">
                At a glance
              </h3>
              <dl className="space-y-2.5 text-[13px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Industry</dt>
                  <dd className="text-slate-900 font-medium text-right">
                    {INDUSTRY_LABELS[study.industry]}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Location</dt>
                  <dd className="text-slate-900 font-medium text-right">
                    {study.location}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Size</dt>
                  <dd className="text-slate-900 font-medium text-right">
                    {study.size}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Tier</dt>
                  <dd className="text-slate-900 font-medium text-right">
                    {TIER_LABELS[study.serviceTier]}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Build duration</dt>
                  <dd className="text-slate-900 font-medium text-right">
                    {study.durationWeeks} weeks
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Payback</dt>
                  <dd className="text-slate-900 font-medium text-right">
                    {study.paybackMonths} months
                  </dd>
                </div>
              </dl>
            </div>

            {/* Inline CTA */}
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
              <p className="font-heading text-base font-semibold mb-2">
                Want this for your team?
              </p>
              <p className="text-[12.5px] text-slate-300 leading-relaxed mb-4">
                Twenty-minute discovery call with a senior practitioner. No
                pressure, no pitch deck.
              </p>
              <a
                href="/discovery-call"
                className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-4 py-2 rounded-lg no-underline text-[13px] transition-colors"
              >
                Book discovery call <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <section className="mt-16 trust-card p-8 sm:p-10 text-center bg-slate-900 text-white border-slate-800 rounded-2xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            See if this approach fits your business
          </h2>
          <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
            Twenty minutes with a senior practitioner. We&rsquo;ll tell you
            what to ship, what to skip, and where the real ROI sits — even if
            the answer is &ldquo;not yet&rdquo;.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/discovery-call"
              className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-2.5 rounded-lg no-underline transition-colors"
            >
              Book discovery call <ArrowRight className="size-4" />
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white font-semibold px-5 py-2.5 rounded-lg no-underline border border-white/10 transition-colors"
            >
              All case studies
            </a>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">
              Related case studies
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rs) => (
                <RelatedCard key={rs.slug} study={rs} />
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12">
          <a
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 no-underline hover:gap-2.5 transition-all"
          >
            <ArrowLeft className="size-4" /> Back to all case studies
          </a>
        </div>
      </div>
    </main>
  );
}
