import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ScrollText,
  ShieldAlert,
  Scale,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
  Stethoscope,
  Gavel,
  Calculator,
  GraduationCap,
  ClipboardList,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroGovernance } from '@/components/illustrations/hero-governance';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Governance & Compliance for SMEs | LongCare AU',
  description:
    'Adopt AI safely. Australian Privacy Act-aligned templates, risk assessment, and a Responsible AI framework built for SMEs across healthcare, legal, and accounting.',
  path: '/governance',
});

type Pillar = {
  slug: string;
  title: string;
  href: string;
  Icon: typeof ScrollText;
  blurb: string;
  badge: string;
};

const PILLARS: Pillar[] = [
  {
    slug: 'policies',
    title: 'AI Policy Templates',
    href: '/governance/policies',
    Icon: ScrollText,
    blurb:
      'Acceptable use, data handling, model use. Customisable for your team and aligned to APP obligations.',
    badge: '6 templates',
  },
  {
    slug: 'risk-assessment',
    title: 'AI Risk Assessment',
    href: '/governance/risk-assessment',
    Icon: ShieldAlert,
    blurb:
      '12-question evaluation. Rate vendor risk, data risk, output risk, and compliance posture in one score.',
    badge: '12 questions',
  },
  {
    slug: 'responsible-ai',
    title: 'Responsible AI Framework',
    href: '/governance/responsible-ai',
    Icon: Scale,
    blurb:
      'Our 7-principle framework adapted from APP, OAIC guidance, and Australia’s AI Ethics Principles.',
    badge: '7 principles',
  },
];

const STATS = [
  { label: '100+ AU SMEs', sub: 'governed with our toolkit' },
  { label: 'APP-aligned', sub: 'Privacy Act 1988' },
  { label: 'Industry templates', sub: 'health, legal, accounting' },
  { label: 'Free starting kit', sub: 'editable Word + PDF' },
];

const REASONS = [
  {
    title: 'Privacy Act amendments 2024–26',
    body:
      'Statutory tort for serious invasions of privacy and tougher penalties make documented AI controls essential.',
  },
  {
    title: 'OAIC AI guidance is now expected',
    body:
      'The Office of the Australian Information Commissioner expects organisations to assess and document AI risks.',
  },
  {
    title: 'Customers ask before they buy',
    body:
      'Procurement and enterprise clients increasingly require an AI policy and disclosure before signing contracts.',
  },
  {
    title: 'Insurance & professional indemnity',
    body:
      'Insurers and professional bodies (AHPRA, TPB, LIV) ask whether AI is governed when assessing risk and renewals.',
  },
];

const INDUSTRIES = [
  { label: 'Healthcare', sub: 'AHPRA, My Health Records Act', Icon: Stethoscope },
  { label: 'Legal', sub: 'LIV, LSC, client confidentiality', Icon: Gavel },
  { label: 'Accounting', sub: 'TPB Code of Conduct', Icon: Calculator },
  { label: 'Education', sub: 'TEQSA, ASQA expectations', Icon: GraduationCap },
];

export default function GovernanceHubPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
    sameAs: ['https://longcare.au'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Governance Consulting',
    serviceType: 'AI Governance & Compliance',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Australian small and medium enterprises',
    },
    description:
      'AI governance toolkit for Australian SMEs: policy templates, risk assessment, and a Responsible AI framework aligned to the Privacy Act and OAIC guidance.',
    url: 'https://longcare.au/governance',
    offers: {
      '@type': 'Offer',
      url: 'https://book.longcare.au?service=governance-review',
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

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Governance', url: '/governance' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700"
            >
              <ShieldCheck className="size-3" /> AI Governance Suite
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Governance &amp; Compliance
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Adopt AI safely. Built for Australian SMEs, aligned to the Privacy
              Act and industry obligations.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroGovernance className="text-sky-700" width={420} height={320} />
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
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
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Three pillars of practical governance
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ slug, title, href, Icon, blurb, badge }) => (
            <Link
              key={slug}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <Badge
                  variant="outline"
                  className="border-sky-200 bg-sky-50 text-sky-700"
                >
                  {badge}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-700 flex-1">{blurb}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">
                Open <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Hub-link card row */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ClipboardList className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Looking for hands-on training?
              </h3>
              <p className="mt-1 text-sm text-slate-700">
                Pair governance with our Academy paths so your team understands
                <em> why</em> the policy matters — not just <em>what</em> it says.
              </p>
            </div>
          </div>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-2.5 rounded-full transition"
          >
            Visit AI Academy <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Why governance now */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Why governance, why now?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex gap-4"
            >
              <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {r.title}
                </h3>
                <p className="mt-1 text-sm text-slate-700">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who needs this */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Building2 className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Who needs this?
            </h2>
          </div>
          <p className="text-sm text-slate-700">
            Australian SMEs in regulated industries benefit most. Our templates
            include sector-specific clauses where it matters.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map(({ label, sub, Icon }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50"
              >
                <Icon className="size-5 text-sky-700 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {label}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50 text-emerald-700"
                    >
                      Aligned
                    </Badge>
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <Sparkles className="size-8 text-sky-700 mx-auto" />
          <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            Need a custom governance review?
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            We map your AI use against the Privacy Act, your sector’s code, and
            our 7-principle framework — and hand back a remediation plan.
          </p>
          <a
            href="https://book.longcare.au?service=governance-review"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Book a Discovery Call <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
