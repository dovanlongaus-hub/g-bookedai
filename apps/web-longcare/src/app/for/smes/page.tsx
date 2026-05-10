import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  UtensilsCrossed,
  Home,
  Briefcase,
  Wrench,
  HeartPulse,
  GraduationCap,
  Boxes,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Australian SMEs — Mentor, Workflow, Toolkit | LongCare AU',
  description:
    'Save 10+ hours/week per role and ship 1 working AI workflow per quarter. AI Readiness, 5-pack A$450, industry agents, and toolkit access.',
  path: '/for/smes',
});

const INDUSTRIES = [
  { name: 'Retail', href: '/solutions/retail', Icon: ShoppingBag },
  { name: 'Hospitality', href: '/solutions/hospitality', Icon: UtensilsCrossed },
  { name: 'Real Estate', href: '/solutions/real-estate', Icon: Home },
  { name: 'Professional Services', href: '/solutions/professional-services', Icon: Briefcase },
  { name: 'Trades', href: '/solutions/trades', Icon: Wrench },
  { name: 'Healthcare', href: '/solutions/healthcare', Icon: HeartPulse },
  { name: 'Education', href: '/solutions/education', Icon: GraduationCap },
];

const OUTCOMES = [
  '1 working AI workflow shipped end-to-end inside 90 days',
  'Team trained on the workflow with documented SOPs and prompts',
  'Cost savings ≥ A$3,000/month verified against baseline',
  'Customer NPS uplift through faster response and better personalisation',
];

const PATH_STEPS = [
  {
    n: 1,
    title: 'Assess',
    desc: 'Run the AI Readiness Assessment to score your business across 7 dimensions.',
    href: '/resources/ai-readiness',
    cta: 'AI Readiness',
  },
  {
    n: 2,
    title: 'Discover',
    desc: 'SME discovery call — map workflows, pain points, and the highest-ROI first build.',
    href: 'https://book.longcare.au?service=sme-discovery',
    cta: 'Book discovery',
    external: true,
  },
  {
    n: 3,
    title: 'Mentor',
    desc: '5-Session Pack A$450 to design, build, and ship the workflow with your team.',
    href: '/services/packages',
    cta: '5-pack A$450',
  },
  {
    n: 4,
    title: 'Tool',
    desc: 'Toolkit access — proposal writer, email assistant, document generator, and more.',
    href: '/toolkit',
    cta: 'Open toolkit',
  },
  {
    n: 5,
    title: 'Deploy',
    desc: 'Stand up an industry agent (retail, hospitality, real estate…) on a monthly plan.',
    href: '/agents/industry',
    cta: 'Industry agents',
  },
];

const PRICE_LADDER = [
  { tier: 'Assess', price: 'A$0', label: 'AI Readiness Assessment', href: '/resources/ai-readiness' },
  { tier: 'Mentor', price: 'A$450', label: '5-Session Pack', href: '/services/packages' },
  { tier: 'Agents', price: 'A$199–A$499/mo', label: 'Industry agents', href: '/agents/industry' },
  { tier: 'Custom', price: 'On request', label: 'Bespoke automation', href: '/cloud-advisory' },
];

const TOOLKIT_LINKS = [
  { name: 'Proposal writer', href: '/toolkit/proposal-writer' },
  { name: 'Email assistant', href: '/toolkit/email-assistant' },
  { name: 'Document generator', href: '/toolkit/document-generator' },
  { name: 'Meeting assistant', href: '/toolkit/meeting-assistant' },
  { name: 'Customer support', href: '/toolkit/customer-support' },
  { name: 'Social media', href: '/toolkit/social-media' },
  { name: 'HR assistant', href: '/toolkit/hr-assistant' },
];

const STORIES = [
  {
    name: 'Boutique real estate agency, Perth',
    quote:
      'The 5-pack got us from idea to a working listing-description AI in three weeks. Our agents save half a day per listing.',
  },
  {
    name: 'Multi-site cafe group, Brisbane',
    quote:
      'Hospitality agent handles bookings, dietary FAQs, and rosters drafting. We re-deployed two roster hours a day to the floor.',
  },
];

const SIBLINGS = [
  { name: 'For Individuals', href: '/for/individuals' },
  { name: 'For Startups', href: '/for/startups' },
  { name: 'For Organisations', href: '/for/organisations' },
];

const RELATED = [
  { name: '5-Session Pack', href: '/services/packages' },
  { name: 'Industry agents', href: '/agents/industry' },
  { name: 'Toolkit', href: '/toolkit' },
  { name: 'AI Readiness', href: '/resources/ai-readiness' },
];

export default function SMEsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'LongCare AU — AI for Australian SMEs',
    description:
      'Operationalise AI for Australian SMEs: AI Readiness Assessment, 5-Session Pack A$450, industry agents, and toolkit access.',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'AI mentoring and workflow deployment',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Australian small and medium businesses',
    },
    url: 'https://longcare.au/for/smes',
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
            { name: 'SMEs', url: '/for/smes' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center pt-4 pb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-5">
              <Sparkles className="size-3" aria-hidden /> For SMEs
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for Australian SMEs
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Save 10+ hours per week per role, ship one working AI workflow per quarter, and have a
              mentor in your corner — not a one-off training video.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/resources/ai-readiness"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Run AI Readiness <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services/packages"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
              >
                5-Session Pack A$450
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroToolkit className="text-emerald-700" width={360} height={270} />
          </div>
        </section>
      </div>

      {/* Industries strip */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          You are…
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          Pick your industry to see the workflows we typically ship in the first 90 days.
        </p>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          {INDUSTRIES.map(({ name, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-xl p-4 shadow-sm hover:shadow-md transition no-underline text-center"
            >
              <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 mx-auto">
                <Icon className="size-5" aria-hidden />
              </div>
              <span className="text-xs font-medium text-slate-800">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Outcomes — your 90-day plan
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          Real, measurable changes. We don't sell hours — we sell shipped workflows.
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

      {/* Path */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-10">
          Recommended path
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PATH_STEPS.map((s) => {
            const linkProps = s.external
              ? { href: s.href }
              : { href: s.href };
            const LinkEl: any = s.external ? 'a' : Link;
            return (
              <li key={s.n} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="size-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-sm font-bold mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                <LinkEl
                  {...linkProps}
                  className="mt-3 inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-600 text-xs font-medium no-underline"
                >
                  {s.cta} <ArrowRight className="size-3" aria-hidden />
                </LinkEl>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-4">
          Pricing summary
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          AUD inc GST. Start free, prove value with the 5-pack, then scale with monthly agents.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICE_LADDER.map((p) => (
            <Link
              key={p.tier}
              href={p.href}
              className="block bg-white border border-slate-200 hover:border-emerald-400 rounded-xl p-6 shadow-sm hover:shadow-md transition no-underline"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{p.tier}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{p.price}</p>
              <p className="mt-1 text-sm text-slate-600">{p.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* By industry quick links */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-10">
          By industry
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map(({ name, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl p-4 shadow-sm hover:shadow-md transition no-underline"
            >
              <div className="size-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Icon className="size-4" aria-hidden />
              </div>
              <span className="text-sm font-medium text-slate-800">{name}</span>
              <ArrowRight className="size-4 text-emerald-600 ml-auto" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      {/* Toolkit */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Boxes className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Tools you'll use
            </h2>
          </div>
          <p className="text-slate-600 mb-6">
            The LongCare toolkit ships with templated agents your team can adopt the same week — no
            engineering required.
          </p>
          <div className="flex flex-wrap gap-2">
            {TOOLKIT_LINKS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-3 py-1.5 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 no-underline"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          SME stories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {STORIES.map((s) => (
            <figure
              key={s.name}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <BookOpen className="size-5 text-emerald-700 mb-3" aria-hidden />
              <blockquote className="text-slate-700 italic leading-relaxed">"{s.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-slate-900">— {s.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-10 sm:p-14 text-center shadow-sm">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Ship one AI workflow this quarter
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Begin with a free AI Readiness Assessment, then book a 30-minute SME discovery call. We
            scope the highest-ROI workflow and quote the 5-pack the same day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/resources/ai-readiness"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Run AI Readiness <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="https://book.longcare.au?service=sme-discovery"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Book SME discovery
            </a>
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
                  className="text-sm text-emerald-700 hover:text-emerald-600 hover:underline"
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
