import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  Briefcase,
  Cpu,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  Users,
  Code2,
  TrendingUp,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentorMotion } from '@/components/illustrations/animated';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Startup Mentorship & Advisory | LongCare AU',
  description:
    'From validation to Series A. Founder advisory, technical mentorship, and AI go-to-market support — built for Australian and APAC AI startups.',
  path: '/startup',
});

type Pillar = {
  slug: string;
  title: string;
  href: string;
  Icon: typeof Compass;
  blurb: string;
};

const PILLARS: Pillar[] = [
  {
    slug: 'mentorship',
    title: 'Startup Mentorship',
    href: '/startup/mentorship',
    Icon: Compass,
    blurb:
      'Validate your idea, integrate AI, prep for fundraising. Weekly cadence with a senior founder.',
  },
  {
    slug: 'founder-advisory',
    title: 'Founder Advisory',
    href: '/startup/founder-advisory',
    Icon: Briefcase,
    blurb:
      'Business model, AI positioning, pitch deck. Senior founder feedback on what actually works.',
  },
  {
    slug: 'technical-mentorship',
    title: 'Technical Mentorship',
    href: '/startup/technical-mentorship',
    Icon: Cpu,
    blurb:
      'Cloud architecture, AI stack, MVP build strategy. Hands-on, opinionated, AU-context.',
  },
  {
    slug: 'innovation-strategy',
    title: 'Innovation Strategy',
    href: '/startup/innovation-strategy',
    Icon: Lightbulb,
    blurb:
      'Digital transformation, AI readiness, GTM roadmap for AI products in regulated markets.',
  },
];

const STATS = [
  { label: '20+ founders', sub: 'advised across AU & APAC' },
  { label: 'A$2M+ raised', sub: 'by alumni at seed & Series A' },
  { label: 'MVP in 60 days', sub: 'with our partner devs' },
  { label: 'GCP credits', sub: 'startup intro available' },
];

const WHAT_YOU_GET = [
  'Senior founder mentor (Dr. Long Do, ex-CTO, exited founder).',
  'Weekly office hours with structured agenda and async Slack.',
  'Google Cloud for Startups credits intro (up to US$100K).',
  'Warm intros to the AU AI investor network — pre-seed and seed.',
  'MVP build credits with our partner dev shop (vetted, AU-based).',
  'Alumni Slack — peer founders shipping AI products in market.',
];

const TIERS = [
  {
    name: 'Founder hour',
    price: 'A$199',
    period: 'single hour',
    description: 'A focused 1:1 hour with Dr. Long Do. No commitment.',
    cta: 'Book founder hour',
    href: 'https://book.longcare.au?service=founder-hour',
  },
  {
    name: 'Monthly retainer',
    price: 'A$1,499',
    period: 'per month',
    description: '4 hours mentor + Slack access + async deck/code reviews.',
    cta: 'Start retainer',
    href: 'https://book.longcare.au?service=founder-retainer',
    featured: true,
  },
  {
    name: 'Quarterly programme',
    price: 'A$3,999',
    period: 'per quarter',
    description: 'Full 12-week cycle ending pitch-ready with data room.',
    cta: 'Apply for cohort',
    href: 'https://book.longcare.au?service=founder-quarterly',
  },
  {
    name: 'Custom advisory',
    price: 'A$5K+',
    period: 'bespoke',
    description: 'Board observer, fractional CTO, or specialised engagement.',
    cta: 'Talk to us',
    href: 'https://book.longcare.au?service=founder-custom',
  },
];

const PERSONAS = [
  {
    title: 'Solo technical founder',
    body: 'Shipping fast but stuck on positioning, fundraising, and team building.',
    Icon: Code2,
  },
  {
    title: 'Non-technical founder with idea',
    body: 'You have the customer insight; you need a stack, an MVP, and a co-founder lens.',
    Icon: Lightbulb,
  },
  {
    title: 'AI startup pre-seed',
    body: 'Validated demand, building product, raising your first round in 6–9 months.',
    Icon: Rocket,
  },
  {
    title: 'Existing startup adding AI',
    body: 'Series A or Series B company adding AI to a working product without losing focus.',
    Icon: TrendingUp,
  },
];

const JOURNEY = [
  { year: 'Idea', label: 'Validate problem' },
  { year: 'MVP', label: 'Build & ship' },
  { year: 'Traction', label: 'First customers' },
  { year: 'Seed', label: 'Raise A$500K–2M' },
  { year: 'Series A', label: 'Scale & hire' },
];

export default function StartupHubPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
    address: { '@type': 'PostalAddress', addressCountry: 'AU' },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Startup Mentorship & Advisory',
    serviceType: 'Founder & Startup Advisory',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: [
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Place', name: 'APAC' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Early-stage AI startup founders',
    },
    description:
      'Mentorship, founder advisory, technical mentorship and innovation strategy for Australian and APAC AI startups from idea to Series A.',
    url: 'https://longcare.au/startup',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: '199',
      highPrice: '5000',
      offerCount: 4,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Startup', url: '/startup' },
          ]}
        />

        {/* Hero */}
        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700"
            >
              <Rocket className="size-3" /> Founder advisory
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Startup Mentorship &amp; Advisory
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              From validation to Series A. Founder advisory, technical
              mentorship, and AI go-to-market support — built for Australian
              and APAC AI startups.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=founder-advisory"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book founder call <ArrowRight className="size-4" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-6 py-3 rounded-full transition"
              >
                View pricing
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentorMotion className="text-sky-700" width={420} height={320} />
          </div>
        </section>

        {/* Stats strip */}
        <section className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <div className="text-base font-semibold text-slate-900">
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Four ways we work with founders
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {PILLARS.map(({ slug, title, href, Icon, blurb }) => (
              <Link
                key={slug}
                href={href}
                className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col"
              >
                <div className="size-12 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-sky-700 transition">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 flex-1">{blurb}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Founder journey */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
            The founder journey we support
          </h2>
          <p className="text-slate-700 mb-6">
            We meet you where you are — from a deck on a napkin to a seed round
            closing. Here&rsquo;s the offering at each stage.
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <InfographicTimeline
              className="text-sky-700"
              milestones={JOURNEY}
              width={1000}
              height={180}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 text-sm">
              <div>
                <div className="font-semibold text-slate-900">Idea</div>
                <p className="text-slate-600 mt-1">
                  Founder hour + problem validation framework.
                </p>
              </div>
              <div>
                <div className="font-semibold text-slate-900">MVP</div>
                <p className="text-slate-600 mt-1">
                  Technical mentorship + GCP architecture.
                </p>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Traction</div>
                <p className="text-slate-600 mt-1">
                  Innovation strategy + GTM and ICP.
                </p>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Seed</div>
                <p className="text-slate-600 mt-1">
                  Founder advisory + deck + investor intros.
                </p>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Series A</div>
                <p className="text-slate-600 mt-1">
                  Custom advisory + board observer + hiring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            What you get with every engagement
          </h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <ul className="grid gap-4 sm:grid-cols-2">
              {WHAT_YOU_GET.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-16 scroll-mt-32">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
            Pricing tiers
          </h2>
          <p className="text-slate-700 mb-6">
            All prices in AUD inclusive of GST. We don&rsquo;t take equity by
            default — see the IP &amp; compliance note on each sub-page.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`bg-white border rounded-xl p-6 shadow-sm flex flex-col ${
                  t.featured ? 'border-sky-400 ring-2 ring-sky-100' : 'border-slate-200'
                }`}
              >
                {t.featured && (
                  <Badge
                    variant="outline"
                    className="self-start mb-3 border-sky-200 bg-sky-50 text-sky-700"
                  >
                    Most popular
                  </Badge>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{t.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    {t.price}
                  </span>
                  <span className="text-sm text-slate-500">/ {t.period}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 flex-1">
                  {t.description}
                </p>
                <a
                  href={t.href}
                  className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    t.featured
                      ? 'bg-sky-700 hover:bg-sky-600 text-white'
                      : 'bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800'
                  }`}
                >
                  {t.cta} <ArrowRight className="size-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Inc. GST. Custom invoices and PO supported. Cancel monthly retainers
            with 30 days&rsquo; notice.
          </p>
        </section>

        {/* Personas */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900 mb-6">
            Who&rsquo;s a fit?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map(({ title, body, Icon }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
              >
                <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Apply */}
        <section className="mt-16 mb-20">
          <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Users className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold text-slate-900">
                  Apply for advisory
                </h2>
                <p className="mt-1 text-slate-700">
                  We take a small number of founders each quarter so we can give
                  real attention. Tell us your stage, product, and ask — we
                  reply within 2 business days.
                </p>
              </div>
            </div>
            <form
              method="POST"
              action="/api/referral"
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              <input type="hidden" name="source" value="startup-application" />
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Founder name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div>
                <label
                  htmlFor="stage"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                >
                  <option>Idea</option>
                  <option>MVP</option>
                  <option>Traction</option>
                  <option>Pre-seed</option>
                  <option>Seed</option>
                  <option>Series A</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Product / one-line pitch
                </label>
                <input
                  id="product"
                  name="product"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="ask"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Your ask
                </label>
                <textarea
                  id="ask"
                  name="notes"
                  rows={4}
                  placeholder="What do you need help with right now?"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
                >
                  Submit application <ArrowRight className="size-4" />
                </button>
                <span className="text-xs text-slate-500">
                  Or skip the form and{' '}
                  <a
                    href="https://book.longcare.au?service=founder-discovery"
                    className="text-sky-700 hover:underline"
                  >
                    book a discovery call
                  </a>
                  .
                </span>
              </div>
            </form>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-24">
          <div className="bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-100 rounded-3xl p-10 sm:p-14 text-center">
            <Sparkles className="size-8 text-sky-700 mx-auto" />
            <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-semibold text-slate-900">
              Building an AI startup in Australia?
            </h2>
            <p className="mt-3 text-slate-700 max-w-xl mx-auto">
              Book a free 30-minute discovery call. We&rsquo;ll tell you
              honestly whether we can help — and if not, who can.
            </p>
            <a
              href="https://book.longcare.au?service=founder-discovery"
              className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Book discovery call <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
