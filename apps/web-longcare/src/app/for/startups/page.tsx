import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  UserCog,
  Cpu,
  TrendingUp,
  Cloud,
  Rocket,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Startups & Founders in Australia | LongCare AU',
  description:
    'From validation to Series A. Founder advisory A$199/hr, technical mentorship, and Google Cloud-native build for Australian startups.',
  path: '/for/startups',
});

const PERSONAS = [
  {
    title: 'Solo technical founder',
    desc: 'Single-engineer founders shipping an AI MVP and validating market fit at speed.',
    Icon: Code2,
  },
  {
    title: 'Non-technical founder',
    desc: 'Domain-expert founders pairing with our technical mentors to ship without hiring early.',
    Icon: UserCog,
  },
  {
    title: 'Pre-seed AI startup',
    desc: 'Teams pre-product or pre-revenue building on Gemini, Vertex AI, or open-source LLMs.',
    Icon: Cpu,
  },
  {
    title: 'Existing startup adding AI',
    desc: 'Seed-to-Series A teams retrofitting AI to existing products and customer journeys.',
    Icon: TrendingUp,
  },
];

const OUTCOMES = [
  'Validated MVP in market with paying or design-partner customers',
  'AI integration plan covering model choice, data, and evaluation',
  'Fundraising-ready data room with metrics, deck, and technical narrative',
  '3 warm investor introductions through the LongCare network',
  'Google Cloud for Startups credits and Vertex AI access activated',
];

const PATH_STEPS = [
  {
    n: 1,
    title: 'Discover',
    desc: 'Founder discovery call to map stage, traction, and the AI thesis.',
    href: '/startup',
    cta: 'Apply for discovery',
  },
  {
    n: 2,
    title: 'Advise',
    desc: 'Founder advisory hours with senior operators on strategy, hiring, and fundraising.',
    href: '/startup/founder-advisory',
    cta: 'Founder advisory',
  },
  {
    n: 3,
    title: 'Build',
    desc: 'Technical mentorship pairing on architecture, evals, and AI product surfaces.',
    href: '/startup/technical-mentorship',
    cta: 'Technical mentorship',
  },
  {
    n: 4,
    title: 'Cloud',
    desc: 'Google Cloud advisory — landing zone, Vertex AI setup, Cloud Run deploy.',
    href: '/cloud-advisory/google-cloud',
    cta: 'Cloud advisory',
  },
  {
    n: 5,
    title: 'GTM',
    desc: 'Innovation strategy and GTM plan to take the validated MVP into market.',
    href: '/startup/innovation-strategy',
    cta: 'Innovation strategy',
  },
];

const PRICE_LADDER = [
  { tier: 'Hour', price: 'A$199', label: 'Founder hour', href: '/startup/founder-advisory' },
  { tier: 'Retainer', price: 'A$1,499/mo', label: 'Founder retainer', href: '/startup/founder-advisory' },
  { tier: 'Programme', price: 'A$3,999/qtr', label: 'Quarterly programme', href: '/startup/mentorship' },
  { tier: 'Custom', price: 'A$5,000+', label: 'Custom build engagement', href: '/cloud-advisory/google-cloud' },
];

const GCP_PERKS = [
  'Up to A$200K in Google Cloud for Startups credits (eligibility-based)',
  'Vertex AI access for Gemini and managed model serving',
  'Cloud Run free tier for autoscaling AI APIs from day one',
  'BigQuery and Looker Studio for product analytics and investor metrics',
];

const STORIES = [
  {
    name: 'Pre-seed AI vertical SaaS, Sydney',
    quote:
      'In one quarter we shipped the MVP, signed three design partners, and closed a A$750K pre-seed. The founder advisory kept us focused; technical mentorship kept us shipping.',
  },
  {
    name: 'Existing FinTech adding AI, Melbourne',
    quote:
      'LongCare helped us pick Vertex AI, set up evals, and ship an AI co-pilot in 8 weeks. ARR is up 22% on existing accounts since launch.',
  },
];

const SIBLINGS = [
  { name: 'For Individuals', href: '/for/individuals' },
  { name: 'For SMEs', href: '/for/smes' },
  { name: 'For Organisations', href: '/for/organisations' },
];

const RELATED = [
  { name: 'Startup hub', href: '/startup' },
  { name: 'Founder advisory', href: '/startup/founder-advisory' },
  { name: 'Technical mentorship', href: '/startup/technical-mentorship' },
  { name: 'Google Cloud advisory', href: '/cloud-advisory/google-cloud' },
];

export default function StartupsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'LongCare AU — AI for Startups',
    description:
      'AI startup pathway: founder advisory at A$199/hr, technical mentorship, and Google Cloud-native MVP build for Australian founders.',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'Startup advisory and AI build',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'AI startups and founders in Australia',
    },
    url: 'https://longcare.au/for/startups',
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'For', url: '/for' },
            { name: 'Startups', url: '/for/startups' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center pt-4 pb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200 mb-5">
              <Sparkles className="size-3" aria-hidden /> For Startups
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for Startups & Founders
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              From validation to Series A. Founder advisory, technical mentorship, and Google
              Cloud-native build for Australian AI startups.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/startup"
                className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Apply for founder discovery <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/startup/founder-advisory"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
              >
                Founder advisory A$199/hr
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-violet-700" width={360} height={270} />
          </div>
        </section>
      </div>

      {/* Personas */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          You are…
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAS.map(({ title, desc, Icon }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="size-10 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center mb-4">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Outcomes
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          What you can ship and prove inside a single LongCare engagement quarter.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {OUTCOMES.map((o) => (
            <div
              key={o}
              className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
              <span className="text-sm text-slate-700">{o}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended path */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-10">
          Recommended path
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PATH_STEPS.map((s) => (
            <li key={s.n} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="size-8 rounded-full bg-violet-700 text-white flex items-center justify-center text-sm font-bold mb-3">
                {s.n}
              </div>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              <Link
                href={s.href}
                className="mt-3 inline-flex items-center gap-1 text-violet-700 hover:text-violet-600 text-xs font-medium no-underline"
              >
                {s.cta} <ArrowRight className="size-3" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Pricing summary
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          AUD inc GST. Mix-and-match founder hours, retainers, and quarterly programmes.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICE_LADDER.map((p) => (
            <Link
              key={p.tier}
              href={p.href}
              className="block bg-white border border-slate-200 hover:border-violet-400 rounded-xl p-6 shadow-sm hover:shadow-md transition no-underline"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{p.tier}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{p.price}</p>
              <p className="mt-1 text-sm text-slate-600">{p.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Founder journey timeline */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Founder journey
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          Five milestones from idea to scale — typical cadence for a LongCare founder partnership.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
          <div className="flex justify-center">
            <InfographicTimeline
              width={720}
              height={200}
              milestones={[
                { year: 'Wk 0', label: 'Discover' },
                { year: 'Wk 4', label: 'Advise' },
                { year: 'Wk 8', label: 'Build MVP' },
                { year: 'Wk 12', label: 'Cloud live' },
                { year: 'Wk 16', label: 'Raise' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* GCP for Startups */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center">
              <Cloud className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Google Cloud for Startups
            </h2>
          </div>
          <p className="text-slate-600 mb-6">
            LongCare partners with the Google Cloud for Startups programme (partnership placeholder)
            so eligible founders unlock credits, technical mentorship, and managed AI tooling on day
            one.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {GCP_PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
                <span className="text-sm text-slate-700">{perk}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/cloud-advisory/google-cloud"
            className="mt-6 inline-flex items-center gap-1 text-violet-700 hover:text-violet-600 font-medium no-underline"
          >
            Talk to a Google Cloud advisor <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Stories */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Founder stories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {STORIES.map((s) => (
            <figure
              key={s.name}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <BookOpen className="size-5 text-violet-700 mb-3" aria-hidden />
              <blockquote className="text-slate-700 italic leading-relaxed">"{s.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-slate-900">— {s.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-gradient-to-br from-violet-50 to-white border border-violet-200 rounded-2xl p-10 sm:p-14 text-center shadow-sm">
          <Rocket className="size-8 text-violet-700 mx-auto mb-4" aria-hidden />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Ready to build AI-native?
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            One discovery call. We'll map your stage, your AI thesis, and the right LongCare path —
            from a single founder hour to a multi-quarter build.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/startup"
              className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Apply for discovery <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/startup/founder-advisory"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Book founder hour
            </Link>
          </div>
        </div>
      </section>

      {/* Related + siblings */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-4">Related</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {RELATED.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-sm text-violet-700 hover:text-violet-600 hover:underline"
                >
                  {r.name} →
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-slate-900 mb-4">Other audiences</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/for"
                className="px-4 py-2 rounded-full text-sm border border-slate-300 hover:border-slate-400 text-slate-700"
              >
                Audience hub
              </Link>
              {SIBLINGS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="px-4 py-2 rounded-full text-sm border border-slate-300 hover:border-slate-400 text-slate-700"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
