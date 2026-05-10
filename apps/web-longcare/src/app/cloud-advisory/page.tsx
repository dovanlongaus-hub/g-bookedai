import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cloud,
  Layers,
  GitBranch,
  Rocket,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Server,
  Database,
  Workflow,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { InfographicStack } from '@/components/illustrations/infographic-stack';

export const metadata: Metadata = getPageMetadata({
  title: 'Google Cloud Advisory & AI Infrastructure | LongCare AU',
  description:
    'Google Cloud-native AI infrastructure for Australian SMEs and startups. Production-ready, APP-compliant, scale-aware advisory across architecture, migration, and scalability.',
  path: '/cloud-advisory',
});

type ServiceCard = {
  slug: string;
  title: string;
  href: string;
  Icon: typeof Cloud;
  blurb: string;
  badge: string;
};

const SERVICES: ServiceCard[] = [
  {
    slug: 'architecture-design',
    title: 'Architecture Design',
    href: '/cloud-advisory/architecture-design',
    Icon: Layers,
    blurb:
      'Multi-tenant, AI-composable, data-pipeline-aware architectures designed to ship.',
    badge: 'Design',
  },
  {
    slug: 'google-cloud',
    title: 'Google Cloud',
    href: '/cloud-advisory/google-cloud',
    Icon: Cloud,
    blurb:
      'Vertex AI, Gemini, BigQuery, Cloud Run, Firebase. We build it daily, not just on slides.',
    badge: 'Build',
  },
  {
    slug: 'migration',
    title: 'Migration',
    href: '/cloud-advisory/migration',
    Icon: GitBranch,
    blurb:
      'Legacy to cloud-native. Tool consolidation. Cost optimisation. Security hardening.',
    badge: 'Migrate',
  },
  {
    slug: 'scalability',
    title: 'Scalability',
    href: '/cloud-advisory/scalability',
    Icon: Rocket,
    blurb:
      'Horizontal scaling, multi-region, SLA design, observability done properly.',
    badge: 'Scale',
  },
];

const PARTNERS = [
  { label: 'Vertex AI', sub: 'Managed ML platform' },
  { label: 'Gemini', sub: 'Frontier model API' },
  { label: 'BigQuery', sub: 'Serverless analytics' },
  { label: 'Cloud Run', sub: 'Containerised services' },
];

const TIERS = [
  {
    name: 'Quick start',
    price: 'A$2,500',
    sub: 'fixed, inc GST',
    duration: '2 weeks',
    bullets: [
      'One architecture diagram',
      'Roadmap with cost projection',
      'Risk register and recommendations',
      'Async working session',
    ],
    accent: 'sky',
  },
  {
    name: 'Custom build',
    price: 'A$5K to A$15K',
    sub: 'inc GST, scoped',
    duration: '4 to 6 weeks',
    bullets: [
      'Bespoke architecture and IaC starter',
      'First service deployed end-to-end',
      'Security baseline (IAM + Secret Manager)',
      'Runbook and handover',
    ],
    accent: 'emerald',
  },
  {
    name: 'Enterprise programme',
    price: 'A$25K+',
    sub: 'inc GST, fixed-fee',
    duration: '8 to 12 weeks',
    bullets: [
      'Multi-system architecture',
      'Independent security review',
      'Multi-region and DR planning',
      'Embedded delivery team',
    ],
    accent: 'amber',
  },
];

const COMPLIANCE = [
  {
    title: 'APP 1 to 13 alignment',
    body:
      'Privacy Act 1988 obligations are designed into the architecture from day one — not bolted on at audit time.',
  },
  {
    title: 'ISO/IEC 27001 alignment',
    body:
      'Controls map cleanly to ISO 27001 Annex A so your information security programme has a clear evidence trail.',
  },
  {
    title: 'AU data residency',
    body:
      'Default region australia-southeast1 (Sydney). Data, logs, and backups stay onshore unless you explicitly opt out.',
  },
  {
    title: 'Audit logging on by default',
    body:
      'Cloud Audit Logs, VPC Flow Logs, and admin activity logs are enabled and exported to BigQuery for retention.',
  },
];

const STACK_LAYERS = [
  { label: 'Frontend', sub: 'Next.js 15 / Firebase Hosting' },
  { label: 'API', sub: 'Express 5 / Cloud Run' },
  { label: 'AI', sub: 'Vertex AI / Gemini' },
  { label: 'Data', sub: 'Firestore / Cloud SQL' },
  { label: 'Analytics', sub: 'BigQuery / Looker Studio' },
  { label: 'Infra', sub: 'Terraform / Artifact Registry' },
];

export default function CloudAdvisoryHubPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cloud and Infrastructure Advisory',
    serviceType: 'Cloud Advisory and AI Infrastructure Consulting',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Australian SMEs and startups',
    },
    description:
      'Google Cloud-native AI infrastructure advisory for Australian SMEs and startups. Architecture design, GCP build, migration, and scalability engagements aligned to the Australian Privacy Principles.',
    url: 'https://longcare.au/cloud-advisory',
    offers: [
      {
        '@type': 'Offer',
        name: 'Quick start architecture review',
        price: '2500',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        name: 'Custom build engagement',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '5000',
          maxPrice: '15000',
          priceCurrency: 'AUD',
        },
      },
      {
        '@type': 'Offer',
        name: 'Enterprise programme',
        price: '25000',
        priceCurrency: 'AUD',
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cloud Advisory Services',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `https://longcare.au${s.href}`,
    })),
  };

  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Cloud Advisory', url: '/cloud-advisory' },
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
              <Cloud className="size-3" /> Cloud and Infrastructure Advisory
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Cloud &amp; Infrastructure Advisory
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Google Cloud-native AI infrastructure for Australian SMEs and
              startups. Production-ready, APP-compliant, scale-aware.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=cloud-advisory"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Book a discovery call <ArrowRight className="size-4" />
              </a>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-3 rounded-full transition"
              >
                View case studies
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Trust strip — Google Cloud Partner */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-semibold text-slate-900">
                  Google Cloud-aligned consultancy
                </h2>
                <p className="text-sm text-slate-600">
                  Google Cloud for Startups partner status (in progress) — the
                  same stack we recommend powers our own products.
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700 self-start sm:self-auto"
            >
              AU-based
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PARTNERS.map((p) => (
              <div
                key={p.label}
                className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {p.label}
                </span>
                <span className="mt-0.5 text-xs text-slate-500">{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          Four advisory tracks
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map(({ slug, title, href, Icon, blurb, badge }) => (
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
                Explore track <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reference architecture */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] items-center">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mx-auto">
            <InfographicStack
              width={360}
              height={380}
              layers={STACK_LAYERS}
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Our reference architecture
            </h2>
            <p className="mt-3 text-slate-700">
              We work top-to-bottom across the stack. Frontends on Next.js,
              container APIs on Cloud Run, AI on Vertex and Gemini, data on
              Firestore and Cloud SQL, analytics in BigQuery, and infrastructure
              codified in Terraform. Every layer is composable so you keep
              optionality.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                {
                  Icon: Server,
                  text: 'Containerised services, autoscaled to zero between bursts.',
                },
                {
                  Icon: Database,
                  text: 'Firestore for realtime state, Cloud SQL for transactional truth.',
                },
                {
                  Icon: Workflow,
                  text: 'Pub/Sub event bus connecting AI, payment, and notification flows.',
                },
                {
                  Icon: ShieldCheck,
                  text: 'IAM, Secret Manager, and audit logs wired in from the first commit.',
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
      </section>

      {/* How we work */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-6">
          How we work
        </h2>
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm overflow-x-auto">
          <div className="flex justify-center">
            <FlowFiveStep
              width={820}
              height={150}
              steps={['Discover', 'Spec', 'Build', 'Pilot', 'Production']}
            />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { t: 'Discover', d: 'Workshops, current-state audit, success criteria.' },
              { t: 'Spec', d: 'Architecture, sequence diagrams, cost model, risks.' },
              { t: 'Build', d: 'IaC, services, CI/CD, observability scaffolding.' },
              { t: 'Pilot', d: 'Limited rollout with metrics and incident drills.' },
              { t: 'Production', d: 'Cutover, runbook handover, support window.' },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="text-sm font-semibold text-slate-900">{s.t}</div>
                <p className="mt-1 text-xs text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement tiers */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-slate-900 mb-2">
          Engagement tiers
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          All prices in Australian Dollars and inclusive of GST.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <Badge
                variant="outline"
                className={
                  t.accent === 'sky'
                    ? 'border-sky-200 bg-sky-50 text-sky-700 self-start'
                    : t.accent === 'emerald'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 self-start'
                    : 'border-amber-200 bg-amber-50 text-amber-700 self-start'
                }
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

      {/* Compliance angle */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-slate-900">
              Compliance built in, not bolted on
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {COMPLIANCE.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <h3 className="text-sm font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-700">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 text-sm text-slate-600">
            Pair this with our{' '}
            <Link
              href="/governance/responsible-ai"
              className="text-sky-700 hover:text-sky-800 font-medium underline-offset-2 hover:underline"
            >
              Responsible AI framework
            </Link>{' '}
            for an end-to-end governance posture.
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <Sparkles className="size-8 text-sky-700 mx-auto" />
          <h2 className="mt-3 font-heading text-2xl font-semibold text-slate-900">
            Ready to design or de-risk your cloud?
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            Tell us where you are today. We will come back within two business
            days with a scope, fixed-fee quote, and timeline — no hand-waving.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://book.longcare.au?service=cloud-advisory"
              className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Book a discovery call <ArrowRight className="size-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-sky-400 hover:text-sky-700 text-slate-800 font-medium px-5 py-3 rounded-full transition"
            >
              Send us a brief
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
