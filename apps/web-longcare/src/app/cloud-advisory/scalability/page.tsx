import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Rocket,
  Cloud,
  Layers,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Bell,
  Globe,
  Gauge,
  Workflow,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { InfographicStack } from '@/components/illustrations/infographic-stack';

export const metadata: Metadata = getPageMetadata({
  title: 'Scalability & Observability — From 100 to 100k Users | LongCare AU',
  description:
    'Auto-scaling, multi-region failover, SLA/SLO design, Cloud Monitoring dashboards, alerting, and load testing — built for Australian SMEs and AI startups.',
  path: '/cloud-advisory/scalability',
});

const DELIVERABLES = [
  {
    Icon: Gauge,
    title: 'Auto-scaling configuration',
    body: 'Cloud Run min/max, CPU allocation, concurrency, and request timeouts tuned per workload.',
  },
  {
    Icon: Globe,
    title: 'Multi-region failover plan',
    body: 'Where it actually pays off — failover topology, RPO/RTO targets, and failover drills.',
  },
  {
    Icon: ShieldCheck,
    title: 'SLA + SLO definitions',
    body: 'Targets you can defend, error budgets that drive engineering priorities, and customer-facing wording.',
  },
  {
    Icon: Activity,
    title: 'Cloud Monitoring dashboards',
    body: 'Golden-signal dashboards (latency, traffic, errors, saturation) per service with alert thresholds.',
  },
  {
    Icon: Bell,
    title: 'Alerting policies',
    body: 'On-call rotation, paging policies, and optional PagerDuty/Opsgenie integration.',
  },
  {
    Icon: Workflow,
    title: 'Load test plan',
    body: 'Locust or k6 scripts, traffic shapes, success criteria, and a written report at each milestone.',
  },
];

const TOOLS = [
  'Cloud Monitoring',
  'Cloud Logging',
  'Locust',
  'k6',
  'Terraform',
  'PagerDuty (optional)',
];

const TIERS = [
  {
    name: 'Scalability review',
    price: 'A$3,500',
    sub: 'fixed, inc GST',
    duration: '2 to 3 weeks',
    bullets: [
      'Current-state load and latency analysis',
      'Bottleneck and capacity report',
      'SLO recommendations and gap list',
      'Quick-win configuration changes',
    ],
  },
  {
    name: 'Production deployment',
    price: 'A$10K to A$25K',
    sub: 'inc GST, scoped',
    duration: '6 to 10 weeks',
    bullets: [
      'Auto-scaling + concurrency tuning',
      'Multi-region or active-passive setup if warranted',
      'Cloud Monitoring dashboards + alerting',
      'Load test programme with reports',
      'On-call playbook and incident drills',
    ],
  },
];

const STACK_LAYERS = [
  { label: 'Edge', sub: 'Cloud CDN / Armor' },
  { label: 'Compute', sub: 'Cloud Run autoscale' },
  { label: 'Async', sub: 'Pub/Sub / Tasks' },
  { label: 'Data', sub: 'Replicated CSQL' },
  { label: 'Observability', sub: 'Monitoring / Logging' },
  { label: 'On-call', sub: 'Alerts + runbook' },
];

const SIBLINGS = [
  { title: 'Architecture Design', href: '/cloud-advisory/architecture-design', Icon: Layers },
  { title: 'Google Cloud', href: '/cloud-advisory/google-cloud', Icon: Cloud },
  { title: 'Migration', href: '/cloud-advisory/migration', Icon: GitBranch },
];

export default function ScalabilityPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Scalability and Observability',
    serviceType: 'Cloud Scalability, SRE, and Observability',
    provider: {
      '@type': 'Organization',
      name: 'LongCare AU',
      url: 'https://longcare.au',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description:
      'Scalability and observability programme for Australian SMEs and AI startups: auto-scaling, multi-region, SLA/SLO design, Cloud Monitoring, and load testing.',
    url: 'https://longcare.au/cloud-advisory/scalability',
    offers: [
      {
        '@type': 'Offer',
        name: 'Scalability review',
        price: '3500',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        name: 'Production deployment',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '10000',
          maxPrice: '25000',
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
            { name: 'Scalability', url: '/cloud-advisory/scalability' },
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
              <Rocket className="size-3" /> Scalability
            </Badge>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Scalability &amp; observability — 100 to 100k users
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Horizontal scaling, multi-region where it earns its keep, SLA
              design, and observability that wakes up the right person.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=scalability"
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
                We assume you do not need a global active-active deployment on
                day one. We build for honest SLOs first — synchronous paths
                kept tight, async work pushed to Pub/Sub or Cloud Tasks, and
                data tier replication only where the customer benefit is real.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  {
                    Icon: Gauge,
                    text: 'Right-sized concurrency and CPU allocation per Cloud Run service.',
                  },
                  {
                    Icon: Globe,
                    text: 'Multi-region only when SLO maths or customer location demand it.',
                  },
                  {
                    Icon: Activity,
                    text: 'Golden-signal dashboards and alert thresholds attached to each service.',
                  },
                  {
                    Icon: Bell,
                    text: 'Alert routing that respects business hours, severity, and on-call sanity.',
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
            <FlowFiveStep
              width={820}
              height={150}
              steps={['Baseline', 'SLO', 'Tune', 'Load test', 'On-call']}
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
              'australia-southeast1 primary region; secondary chosen with you only if needed.',
              'Dashboards, alert policies, and runbooks land in your repos and your projects.',
              'No proprietary monitoring agents. We use Cloud Monitoring and your existing tools.',
              'On-call structure designed around your team — not a managed service contract.',
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
            A Perth-based SaaS scaling from a few hundred users to enterprise
            pilots was hitting Cloud Run cold-starts on every demo. We tuned
            min instances, moved heavyweight inference to a Vertex AI batch
            endpoint, defined three customer-facing SLOs, and stood up a
            golden-signal dashboard plus alert policies for each one.
          </p>
          <p className="mt-3 text-slate-700">
            P95 latency on the demo path dropped from 2.4 seconds to under 600
            milliseconds, and their first enterprise procurement went through
            without a single observability follow-up.
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
            Honest SLOs, useful alerts, defensible scale
          </h2>
          <p className="mt-2 text-slate-700 max-w-xl mx-auto">
            Reviews start at A$3,500 inc GST. Production deployment from A$10K
            inc GST when scoped.
          </p>
          <a
            href="https://book.longcare.au?service=scalability"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Book a discovery call <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
