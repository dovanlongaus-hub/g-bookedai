import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  User,
  Rocket,
  Building2,
  LandPlot,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Services for Individuals, Startups, SMEs & Organisations | LongCare AU',
  description:
    'Choose your AI path. LongCare AU tailors pricing, services, and outcomes to individuals, startups, SMEs, and Australian organisations.',
  path: '/for',
});

const AUDIENCES = [
  {
    slug: 'individuals',
    name: 'For Individuals',
    Icon: User,
    tagline: 'Up-skill in AI. From A$29.',
    description:
      'Knowledge workers, freelancers, and career changers learning AI through starter sessions, mentor hours, and Academy courses.',
    entry: 'AI Starter A$29 → AI Mentor → Academy',
    accent: 'sky',
  },
  {
    slug: 'startups',
    name: 'For Startups',
    Icon: Rocket,
    tagline: 'Build AI-native. Founder advisory + technical.',
    description:
      'Solo founders to seed-stage teams shipping AI MVPs on Google Cloud with founder advisory, technical mentorship, and GTM support.',
    entry: 'Founder advisory → MVP build → Cloud advisory',
    accent: 'violet',
  },
  {
    slug: 'smes',
    name: 'For SMEs',
    Icon: Building2,
    tagline: 'Operate with AI. Mentor + workflow + toolkit.',
    description:
      'Australian small and medium businesses operationalising AI with readiness assessment, 5-session packs, and industry agents.',
    entry: 'AI readiness → 5-pack A$450 → toolkit',
    accent: 'emerald',
  },
  {
    slug: 'organisations',
    name: 'For Organisations',
    Icon: LandPlot,
    tagline: 'Transform at scale. Workshops + custom + multi-year.',
    description:
      'Enterprises and government agencies running executive AI workshops, workforce training, and multi-year transformation programmes.',
    entry: 'Custom A$1,500–3,000+ → exec workshops → multi-year',
    accent: 'amber',
  },
] as const;

const ACCENT_STYLES: Record<string, { bg: string; text: string; border: string; chip: string }> = {
  sky: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'hover:border-sky-400',
    chip: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'hover:border-violet-400',
    chip: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'hover:border-emerald-400',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'hover:border-amber-400',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
  },
};

const COMPARISON = [
  {
    audience: 'Individuals',
    entry: 'AI Readiness Quiz (free)',
    core: 'AI Starter A$29',
    growth: 'Mentor A$99 + Academy A$49–A$149',
    outcome: 'Save 10+ hrs/week, AI Productivity certificate',
  },
  {
    audience: 'Startups',
    entry: 'Founder discovery call',
    core: 'Founder advisory A$199/hr',
    growth: 'Retainer A$1,499/mo · Programme A$3,999/qtr',
    outcome: 'Validated MVP, GCP credits, fundraising-ready data room',
  },
  {
    audience: 'SMEs',
    entry: 'AI Readiness Assessment',
    core: '5-Session Pack A$450',
    growth: 'Industry agents A$199–A$499/mo',
    outcome: '1 working AI workflow per quarter, ≥A$3K/mo savings',
  },
  {
    audience: 'Organisations',
    entry: 'Discovery workshop',
    core: 'Executive workshop A$5,000+',
    growth: 'Custom A$1,500–A$3,000+ · Programme A$50K–A$200K+',
    outcome: 'Org-wide AI policy, 3 pilots, 100+ staff trained',
  },
];

export default function ForHubPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Services for Individuals, Startups, SMEs & Organisations',
    description:
      'Audience hub for LongCare AU — choose the AI path tailored to your role: individuals, startups, SMEs, or organisations.',
    url: 'https://longcare.au/for',
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LongCare AU audience services',
    itemListElement: AUDIENCES.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: a.name,
        description: a.description,
        url: `https://longcare.au/for/${a.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'LongCare AU',
          url: 'https://longcare.au',
        },
        areaServed: { '@type': 'Country', name: 'Australia' },
      },
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'For', url: '/for' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center pt-4 pb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 mb-5">
              Audience hub
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Built for Individuals, Startups, SMEs, and Organisations
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Choose your path. Pricing, services, and outcomes tailored to where you are — from
              your first A$29 starter session to multi-year enterprise transformation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/resources/ai-readiness"
                className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Take the AI Readiness Quiz <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
              >
                Browse all services
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Audience cards */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {AUDIENCES.map(({ slug, name, Icon, tagline, description, entry, accent }) => {
            const styles = ACCENT_STYLES[accent];
            return (
              <Link
                key={slug}
                href={`/for/${slug}`}
                className={`group bg-white border border-slate-200 ${styles.border} rounded-2xl p-8 shadow-sm hover:shadow-md transition no-underline`}
              >
                <div
                  className={`size-12 rounded-xl ${styles.bg} ${styles.text} flex items-center justify-center mb-5`}
                >
                  <Icon className="size-6" aria-hidden />
                </div>
                <h2 className="font-heading text-2xl font-semibold text-slate-900">{name}</h2>
                <p className={`mt-1 text-sm font-medium ${styles.text}`}>{tagline}</p>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">{description}</p>
                <div
                  className={`mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${styles.chip}`}
                >
                  {entry}
                </div>
                <div className={`mt-6 inline-flex items-center gap-2 font-medium ${styles.text}`}>
                  Explore {name.toLowerCase()}
                  <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" aria-hidden />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Path comparison */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Path comparison
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          Each audience starts somewhere different. Here's how the journey progresses from first
          touch to ongoing partnership.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 mb-10 overflow-x-auto">
          <div className="flex justify-center">
            <InfographicTimeline
              width={720}
              height={200}
              milestones={[
                { year: 'Step 1', label: 'Assess' },
                { year: 'Step 2', label: 'Start' },
                { year: 'Step 3', label: 'Build' },
                { year: 'Step 4', label: 'Operate' },
                { year: 'Step 5', label: 'Scale' },
              ]}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Audience</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Entry</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Core service</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Growth</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON.map((row) => (
                  <tr key={row.audience}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.audience}</td>
                    <td className="px-4 py-3 text-slate-700">{row.entry}</td>
                    <td className="px-4 py-3 text-slate-700">{row.core}</td>
                    <td className="px-4 py-3 text-slate-700">{row.growth}</td>
                    <td className="px-4 py-3 text-slate-700">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">All AUD prices include GST.</p>
      </section>

      {/* Not sure */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-200 rounded-2xl p-10 sm:p-14 text-center">
          <div className="inline-flex size-12 rounded-full bg-white text-sky-700 items-center justify-center mb-5">
            <HelpCircle className="size-6" aria-hidden />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Not sure where you fit?
          </h2>
          <p className="mt-4 text-slate-700 max-w-2xl mx-auto">
            Take our 5-minute AI Readiness assessment. We'll recommend the right path — individual,
            startup, SME, or organisation — based on your goals and current AI maturity.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/resources/ai-readiness"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Start the assessment <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="border border-slate-300 bg-white hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights row */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <CheckCircle2 className="size-5 text-emerald-600 mb-3" aria-hidden />
            <h3 className="font-semibold text-slate-900">Australian-first</h3>
            <p className="mt-1 text-sm text-slate-600">
              APP-aligned, AHPRA-aware, GST-inclusive AUD pricing across every audience.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <CheckCircle2 className="size-5 text-emerald-600 mb-3" aria-hidden />
            <h3 className="font-semibold text-slate-900">Outcome-led</h3>
            <p className="mt-1 text-sm text-slate-600">
              Every engagement has a measurable 90-day outcome — not just training hours.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <CheckCircle2 className="size-5 text-emerald-600 mb-3" aria-hidden />
            <h3 className="font-semibold text-slate-900">Google Cloud-native</h3>
            <p className="mt-1 text-sm text-slate-600">
              Built on Gemini, Vertex AI, and Cloud Run — with startup credits and enterprise compliance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
