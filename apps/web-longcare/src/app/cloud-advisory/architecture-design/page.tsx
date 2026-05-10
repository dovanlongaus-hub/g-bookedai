import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Layers,
  Cloud,
  GitBranch,
  Rocket,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Workflow,
  Wrench,
  Scale,
  FileCode,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { InfographicStack } from '@/components/illustrations/infographic-stack';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Architecture Design — Multi-Tenant, AI-Composable | LongCare AU',
  description:
    'Multi-tenant, AI-composable, data-pipeline-aware architectures for Australian SMEs and startups. Diagrams, IaC starter, security baseline, and 12-month cost projection.',
  path: '/cloud-advisory/architecture-design',
});

const DELIVERABLES = [
  {
    Icon: FileCode,
    title: 'System architecture diagrams',
    body: 'Mermaid + Lucidchart diagrams covering services, data, and integration boundaries.',
  },
  {
    Icon: Workflow,
    title: 'Data flow diagrams',
    body: 'PII boundaries, retention zones, and event flows mapped end-to-end.',
  },
  {
    Icon: Wrench,
    title: 'IaC starter (Terraform)',
    body: 'Working Terraform modules for VPC, IAM, Cloud Run, Firestore, and Cloud SQL.',
  },
  {
    Icon: ShieldCheck,
    title: 'Security baseline',
    body: 'IAM least-privilege, Secret Manager, VPC Service Controls, and audit log exports.',
  },
  {
    Icon: Scale,
    title: '12-month cost projection',
    body: 'Per-service cost model with usage assumptions, pessimistic and realistic bands.',
  },
  {
    Icon: FileCode,
    title: 'Operational runbook',
    body: 'Deployment, rollback, on-call, and incident handling — written for your team.',
  },
];

const TOOLS = [
  'Terraform',
  'Cloud Architecture Diagrams',
  'Lucidchart',
  'Mermaid',
  'gcloud',
  'GitHub Actions',
];

const TIERS = [
  {
    name: 'Quick architecture review',
    price: 'A$2,500',
    sub: 'fixed, inc GST',
    duration: '2 weeks',
    bullets: [
      'Current-state audit',
      'Target architecture diagram',
      'Risk register and prioritised roadmap',
    ],
  },
  {
    name: 'Full architecture design',
    price: 'A$5K to A$10K',
    sub: 'inc GST, scoped',
    duration: '3 to 5 weeks',
    bullets: [
      'Bespoke architecture and data flow set',
      'Terraform IaC starter modules',
      'Security baseline and IAM design',
      '12-month cost projection',
    ],
  },
];

const STACK_LAYERS = [
  { label: 'Edge', sub: 'Cloud CDN / Armor' },
  { label: 'Frontend', sub: 'Next.js 15 / Hosting' },
  { label: 'API', sub: 'Cloud Run / Express' },
  { label: 'AI', sub: 'Vertex AI / Gemini' },
  { label: 'Data', sub: 'Firestore / Cloud SQL' },
  { label: 'Infra', sub: 'Terraform / Artifact Registry' },
];

const SIBLINGS = [
  { title: 'Google Cloud', href: '/cloud-advisory/google-cloud', Icon: Cloud },
  { title: 'Migration', href: '/cloud-advisory/migration', Icon: GitBranch },
  { title: 'Scalability', href: '/cloud-advisory/scalability', Icon: Rocket },
];

export default function ArchitectureDesignPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Architecture Design',
    serviceType: 'Cloud Architecture and IaC Design',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description:
      'Multi-tenant, AI-composable, data-pipeline-aware architecture design for Australian SMEs and startups, including diagrams, Terraform IaC starter, and a 12-month cost model.',
    url: 'https://longcare.au/cloud-advisory/architecture-design',
    offers: [
      {
        '@type': 'Offer',
        name: 'Quick architecture review',
        price: '2500',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        name: 'Full architecture design',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '5000',
          maxPrice: '10000',
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
            { name: 'Architecture Design', url: '/cloud-advisory/architecture-design' },
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
              <Layers className="size-3" /> Architecture Design
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Architecture Design
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Multi-tenant, AI-composable, data-pipeline-aware architectures —
              with the diagrams, IaC, and security baseline your team can
              actually take forward.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=architecture-design"
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

      {/* Reference architecture */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Reference architecture
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mx-auto">
              <InfographicStack width={340} height={380} layers={STACK_LAYERS} />
            </div>
            <div>
              <p className="text-slate-700">
                Every architecture we deliver follows the same defensive defaults:
                a clear edge layer, container APIs, AI services isolated by
                quota, transactional data on Cloud SQL with realtime state on
                Firestore, and infrastructure entirely codified in Terraform.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  'Tenant isolation patterns: row-level, schema-level, or project-level — chosen with you.',
                  'AI orchestration boundaries with explicit rate limits and circuit breakers.',
                  'PII zones flagged on the diagram so reviewers can spot data flows at a glance.',
                  'Disaster recovery RPO/RTO targets attached to each data store.',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{t}</span>
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
            <FlowFiveStep
              width={820}
              height={150}
              steps={['Discover', 'Spec', 'Build', 'Pilot', 'Production']}
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
              'Australian data residency by default (australia-southeast1).',
              'You own the IP, the IaC repository, and the GCP project.',
              'We do not lock you in — no proprietary runtime, no licence fees.',
              'Audit log exports configured against APP and ISO 27001 controls.',
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
            A Melbourne health-tech scale-up came to us with a Postgres monolith
            on a single VM, AI inference glued in via webhooks, and no IaC. We
            redesigned their architecture into a Cloud Run-fronted service mesh
            with Vertex AI for managed inference, Pub/Sub for async work, and
            Terraform for the lot. Cost projection at projected scale dropped
            roughly thirty per cent compared to the incumbent path, while audit
            log retention finally met their RACGP obligations.
          </p>
          <p className="mt-3 text-slate-700">
            Diagrams, IaC, and the runbook landed in five weeks. Their CTO ran
            the first deploy themselves on the day after handover.
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
            Need an architecture you can defend in a board meeting?
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            Two-week quick reviews start at A$2,500. Tell us where you are and
            what you are stuck on.
          </p>
          <a
            href="https://book.longcare.au?service=architecture-design"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Book a discovery call <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
