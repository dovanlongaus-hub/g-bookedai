import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GitBranch,
  Cloud,
  Layers,
  Rocket,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  PiggyBank,
  ListChecks,
  AlertTriangle,
  Workflow,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { InfographicStack } from '@/components/illustrations/infographic-stack';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Tool Migration & Consolidation | LongCare AU',
  description:
    'Audit, consolidate, and migrate your AI and cloud tooling. Cost reduction typically 25-40%, vendor lock reduced, security uplifted — built for Australian SMEs and startups.',
  path: '/cloud-advisory/migration',
});

const DELIVERABLES = [
  {
    Icon: ListChecks,
    title: 'Tool & cloud audit',
    body: 'Every AI tool, SaaS, and cloud account inventoried — including shadow IT and personal accounts.',
  },
  {
    Icon: Layers,
    title: 'Consolidation map',
    body: 'Where tools overlap, where vendor lock hurts, and where the right reduction is — with rationale.',
  },
  {
    Icon: Workflow,
    title: 'Migration runbook',
    body: 'Step-by-step plan with rollback gates and zero-downtime cutovers where it is feasible.',
  },
  {
    Icon: PiggyBank,
    title: 'Cost reduction estimate',
    body: 'Modelled savings (typically 25-40%) with assumptions you can challenge before you commit.',
  },
  {
    Icon: ShieldCheck,
    title: 'Security uplift report',
    body: 'IAM, secrets, encryption, and audit-log gaps closed as part of the migration — not after.',
  },
  {
    Icon: AlertTriangle,
    title: 'Risk register',
    body: 'Known pitfalls, mitigations, and owner assignment for every step of the migration.',
  },
];

const TOOLS = [
  'gcloud',
  'Migration scripts',
  'Terraform',
  'Audit checklists',
  'Cloud Asset Inventory',
  'BigQuery audit logs',
];

const TIERS = [
  {
    name: 'Audit + roadmap',
    price: 'A$3,500',
    sub: 'fixed, inc GST',
    duration: '2 to 3 weeks',
    bullets: [
      'Tool, cloud, and data inventory',
      'Consolidation map with savings estimate',
      'Prioritised migration roadmap',
      'Risk register and dependencies',
    ],
  },
  {
    name: 'Migration delivery',
    price: 'A$8K to A$20K',
    sub: 'inc GST, scoped',
    duration: '6 to 10 weeks',
    bullets: [
      'Runbook execution with paired engineering',
      'Zero-downtime cutovers where feasible',
      'Decommissioning of legacy systems',
      'Security uplift bundled in',
      'Handover and post-cutover support window',
    ],
  },
];

const STACK_LAYERS = [
  { label: 'Before', sub: 'Legacy SaaS / VMs' },
  { label: 'Audit', sub: 'Inventory + cost map' },
  { label: 'Plan', sub: 'Consolidation map' },
  { label: 'Migrate', sub: 'Runbook + IaC' },
  { label: 'Verify', sub: 'Cut-over tests' },
  { label: 'After', sub: 'Cloud-native + lean' },
];

const SIBLINGS = [
  { title: 'Architecture Design', href: '/cloud-advisory/architecture-design', Icon: Layers },
  { title: 'Google Cloud', href: '/cloud-advisory/google-cloud', Icon: Cloud },
  { title: 'Scalability', href: '/cloud-advisory/scalability', Icon: Rocket },
];

export default function MigrationPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Tool Migration and Consolidation',
    serviceType: 'Cloud Migration and Vendor Consolidation',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description:
      'Audit, consolidation, and migration of AI and cloud tooling for Australian SMEs and startups. Typical cost reduction 25-40% with security uplift built in.',
    url: 'https://longcare.au/cloud-advisory/migration',
    offers: [
      {
        '@type': 'Offer',
        name: 'Audit and roadmap',
        price: '3500',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        name: 'Migration delivery',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '8000',
          maxPrice: '20000',
          priceCurrency: 'AUD',
        },
      },
    ],
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Cloud Advisory', url: '/cloud-advisory' },
            { name: 'Migration', url: '/cloud-advisory/migration' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="border-sky-200 bg-sky-50 text-sky-700"
            >
              <GitBranch className="size-3" /> Migration
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI tool migration &amp; consolidation
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Legacy to cloud-native. Tool consolidation. Cost optimisation.
              Security hardening — without the months of consulting decks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=migration"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book a discovery call <ArrowRight className="size-4" />
              </a>
              <Link
                href="/cloud-advisory"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-3 rounded-full transition"
              >
                Back to Cloud Advisory
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={360} height={270} />
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          What we deliver
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-1 text-sm text-slate-700">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reference architecture / migration shape */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Migration shape
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mx-auto">
              <InfographicStack width={340} height={380} layers={STACK_LAYERS} />
            </div>
            <div>
              <p className="text-slate-700">
                Most SMEs we meet have between five and fifteen AI and cloud
                tools. Many of them overlap. Some have no owner, no MFA, and a
                personal credit card behind them. The migration shape we follow
                is the same regardless of size — inventory, plan, then move,
                always with rollback gates.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  {
                    Icon: Wrench,
                    text: 'Replace point tools with platform primitives where it does not hurt UX.',
                  },
                  {
                    Icon: PiggyBank,
                    text: 'Consolidate billing into one GCP organisation with cost-allocation labels.',
                  },
                  {
                    Icon: ShieldCheck,
                    text: 'Close IAM gaps, rotate secrets, and enable audit logs as part of the cutover.',
                  },
                  {
                    Icon: AlertTriangle,
                    text: 'Every step has a rollback. We do not bet the business on a clean migration.',
                  },
                ].map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon className="size-5 text-sky-700 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Process
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm overflow-x-auto">
          <div className="flex justify-center">
            <FlowAutomation
              width={820}
              height={150}
              steps={['Audit', 'Plan', 'Pilot', 'Migrate', 'Decommission']}
            />
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Tools we use
        </h2>
        <div className="flex flex-wrap gap-3">
          {TOOLS.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Pricing & timeline */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-2">
          Pricing &amp; timeline
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          All prices in Australian Dollars and inclusive of GST.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <Badge
                variant="outline"
                className="border-sky-200 bg-sky-50 text-sky-700 self-start"
              >
                {t.duration}
              </Badge>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {t.name}
              </h3>
              <div className="mt-2">
                <span className="text-2xl font-semibold text-slate-900">
                  {t.price}
                </span>
                <span className="ml-2 text-xs text-slate-500">{t.sub}</span>
              </div>
              <ul className="mt-4 space-y-2 flex-1">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance & ownership */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Compliance &amp; ownership
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Data stays in australia-southeast1 unless you direct otherwise.',
              'You retain ownership of every account, IAM root, and credential.',
              'No vendor kick-backs. We are not paid by Google or any reseller.',
              'Decommissioning playbook so legacy tools end cleanly.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2 className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sample case study */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <Badge
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700"
          >
            Anonymised
          </Badge>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            Sample engagement
          </h2>
          <p className="mt-3 text-slate-700">
            A Brisbane allied-health group had eleven AI and cloud tools across
            three departments and no central IAM. We ran a two-week audit,
            consolidated to four core tools (with two retained but governed),
            migrated their patient-correspondence pipeline from a US-based
            general LLM to a Vertex AI deployment in australia-southeast1, and
            brought audit logging and SSO into one place.
          </p>
          <p className="mt-3 text-slate-700">
            Annualised tool spend dropped roughly thirty-five per cent, and
            their privacy officer was able to retire two long-standing risk
            register items.
          </p>
        </div>
      </section>

      {/* Related services */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Related services
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {SIBLINGS.map(({ title, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition flex items-center gap-4"
            >
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700 transition">
                  {title}
                </h3>
              </div>
              <ArrowRight className="size-4 text-sky-700 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/governance/responsible-ai"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            Pair with our Responsible AI framework <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <h2 className="font-heading text-2xl font-semibold text-slate-900">
            Cut your tool sprawl in three weeks
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            A$3,500 inc GST gets you a defensible inventory, savings model, and
            roadmap. Migration delivery is scoped from there.
          </p>
          <a
            href="https://book.longcare.au?service=migration"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Book a discovery call <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
