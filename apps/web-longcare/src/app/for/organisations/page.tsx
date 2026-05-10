import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Workflow,
  ClipboardCheck,
  Users,
  ShieldCheck,
  FileBadge,
  BookOpen,
  Sparkles,
  LandPlot,
} from 'lucide-react';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { getPageMetadata } from '@/lib/metadata';
import { HeroCommunity } from '@/components/illustrations/hero-community';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Organisations & Enterprise in Australia | LongCare AU',
  description:
    'Workforce AI transformation for Australian organisations. Executive workshops, custom deployments, multi-year ecosystem partnerships. APP and AHPRA aligned.',
  path: '/for/organisations',
});

const PERSONAS = [
  {
    title: 'Innovation lead',
    desc: 'Driving AI experimentation across business units while keeping risk controlled.',
    Icon: Lightbulb,
  },
  {
    title: 'Transformation team',
    desc: 'Programme owners landing AI as part of a wider digital or operating-model change.',
    Icon: Workflow,
  },
  {
    title: 'Operations director',
    desc: 'Senior leaders translating AI into measurable productivity and customer outcomes.',
    Icon: ClipboardCheck,
  },
  {
    title: 'L&D leader',
    desc: 'People and capability leaders building AI literacy and certifications across the workforce.',
    Icon: Users,
  },
];

const OUTCOMES = [
  'Org-wide AI policy approved by exec, legal, and risk',
  '3 pilot deployments live with measurable KPIs and rollback plans',
  '100+ staff trained with role-based AI literacy and certifications',
  'Audit-ready compliance trail covering APP, AHPRA, and sector regulators',
  'Executive AI literacy — board and ELT can govern AI confidently',
];

const PATH_STEPS = [
  {
    n: 1,
    title: 'Discover',
    desc: 'Half-day discovery workshop with execs to map AI ambition, risks, and quick wins.',
    href: 'https://book.longcare.au?service=org-discovery',
    cta: 'Book org discovery',
    external: true,
  },
  {
    n: 2,
    title: 'Workshop',
    desc: 'Executive AI workshop (half-day, A$5,000+) — board-ready strategy and policy primer.',
    href: '/community/workshops',
    cta: 'Executive workshop',
  },
  {
    n: 3,
    title: 'Train',
    desc: 'Workforce training programmes — bootcamps, role tracks, and certifications.',
    href: '/community/bootcamps',
    cta: 'Workforce training',
  },
  {
    n: 4,
    title: 'Build',
    desc: 'Cloud advisory engagement to design, deploy, and govern AI on Google Cloud.',
    href: '/cloud-advisory',
    cta: 'Cloud advisory',
  },
  {
    n: 5,
    title: 'Partner',
    desc: 'Multi-year partnership covering capability, platform, and transformation outcomes.',
    href: '/contact',
    cta: 'Talk to us',
  },
];

const PRICE_LADDER = [
  { tier: 'Discovery', price: 'A$0–A$5K', label: 'Discovery workshop', href: 'https://book.longcare.au?service=org-discovery', external: true },
  { tier: 'Workshop', price: 'A$5,000+', label: 'Executive AI workshop', href: '/community/workshops' },
  { tier: 'Engagement', price: 'A$1,500–A$3,000+', label: 'Per advisory engagement', href: '/cloud-advisory' },
  { tier: 'Programme', price: 'A$50K–A$200K+', label: 'Multi-year partnership', href: '/contact' },
];

const COMPLIANCE = [
  'APP-aligned — Australian Privacy Principles 1–13 mapped to controls',
  'AHPRA-aware where clinical or allied-health staff use AI',
  'Immutable audit log of every AI action, prompt, and output',
  'Role-based access control with SSO (Google Workspace / Entra)',
  'Data residency on Google Cloud Australia regions',
  'Responsible AI policy templates aligned to Australia\'s AI Ethics Principles',
];

const PROCUREMENT = [
  'ABN-registered Australian supplier',
  'Government procurement-friendly (panel readiness placeholder)',
  'Insurance certificates and security questionnaires on request',
  'Modern Slavery and Australian Privacy Act statements available',
];

const STORIES = [
  {
    name: 'National healthcare network, NSW',
    quote:
      'LongCare ran our executive workshop, drafted the AI policy, and shipped three clinical-admin pilots. 240 staff completed AI literacy — and our risk committee signed off in one cycle.',
  },
];

const SIBLINGS = [
  { name: 'For Individuals', href: '/for/individuals' },
  { name: 'For Startups', href: '/for/startups' },
  { name: 'For SMEs', href: '/for/smes' },
];

const RELATED = [
  { name: 'Governance', href: '/governance' },
  { name: 'Cloud advisory', href: '/cloud-advisory' },
  { name: 'Bootcamps', href: '/community/bootcamps' },
  { name: 'Workshops', href: '/community/workshops' },
];

export default function OrganisationsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'LongCare AU — AI for Organisations',
    description:
      'Workforce AI transformation for Australian organisations: executive workshops, custom deployments, and multi-year programmes. APP, AHPRA, and sector compliance built in.',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: 'Enterprise AI transformation',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Australian enterprises, government agencies, and not-for-profits',
    },
    url: 'https://longcare.au/for/organisations',
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
            { name: 'Organisations', url: '/for/organisations' },
          ]}
        />

        {/* Hero */}
        <section className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center pt-4 pb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 mb-5">
              <Sparkles className="size-3" aria-hidden /> For Organisations
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for Organisations & Enterprise
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Workforce AI transformation for Australian organisations. Executive workshops, custom
              deployments, and multi-year ecosystem partnerships — APP and AHPRA-aligned.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=org-discovery"
                className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
              >
                Book org discovery <ArrowRight className="size-4" aria-hidden />
              </a>
              <Link
                href="/governance"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
              >
                Governance & compliance
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroCommunity className="text-amber-700" width={360} height={270} />
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
              <div className="size-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
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
          What an enterprise programme with LongCare typically delivers in 6–12 months.
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
            const LinkEl: any = s.external ? 'a' : Link;
            return (
              <li key={s.n} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="size-8 rounded-full bg-amber-700 text-white flex items-center justify-center text-sm font-bold mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                <LinkEl
                  href={s.href}
                  className="mt-3 inline-flex items-center gap-1 text-amber-700 hover:text-amber-600 text-xs font-medium no-underline"
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
          AUD inc GST. Custom quotes on request. Multi-year programmes priced against measurable
          transformation outcomes — not hours.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICE_LADDER.map((p) => {
            const LinkEl: any = p.external ? 'a' : Link;
            return (
              <LinkEl
                key={p.tier}
                href={p.href}
                className="block bg-white border border-slate-200 hover:border-amber-400 rounded-xl p-6 shadow-sm hover:shadow-md transition no-underline"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{p.tier}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{p.price}</p>
                <p className="mt-1 text-sm text-slate-600">{p.label}</p>
              </LinkEl>
            );
          })}
        </div>
      </section>

      {/* Compliance & governance */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Compliance & governance
            </h2>
          </div>
          <p className="text-slate-600 mb-6">
            Built for regulated Australian organisations from the first engagement. Risk, legal, and
            CISO teams get evidence — not promises.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {COMPLIANCE.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
                <span className="text-sm text-slate-700">{c}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/governance"
            className="mt-6 inline-flex items-center gap-1 text-amber-700 hover:text-amber-600 font-medium no-underline"
          >
            Read the governance pack <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Procurement */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-white text-amber-700 border border-amber-200 flex items-center justify-center">
              <FileBadge className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Procurement
            </h2>
          </div>
          <p className="text-slate-600 mb-6">
            Supplier registration ready. We move at the pace of your procurement team — and bring
            the documentation you need on day one.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PROCUREMENT.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden />
                <span className="text-sm text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-center mb-12">
          Organisation story
        </h2>
        <div className="max-w-3xl mx-auto">
          {STORIES.map((s) => (
            <figure
              key={s.name}
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm"
            >
              <BookOpen className="size-5 text-amber-700 mb-3" aria-hidden />
              <blockquote className="text-slate-700 italic leading-relaxed text-lg">
                "{s.quote}"
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-slate-900">— {s.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 py-12">
        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-10 sm:p-14 text-center shadow-sm">
          <LandPlot className="size-8 text-amber-700 mx-auto mb-4" aria-hidden />
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Book org discovery
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            One conversation with our enterprise team. We'll scope the right path — workshop,
            programme, or full multi-year partnership — and share comparable case evidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="https://book.longcare.au?service=org-discovery"
              className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Book org discovery <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/contact"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              Talk to enterprise team
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
                  className="text-sm text-amber-700 hover:text-amber-600 hover:underline"
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
