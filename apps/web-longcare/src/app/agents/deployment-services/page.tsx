import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Rocket,
  CheckCircle2,
  ArrowRight,
  Compass,
  FileText,
  Hammer,
  PlayCircle,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Agent Deployment Services | LongCare AU',
  description:
    'We build, configure, and deploy your AI agents end-to-end. Quick Start (A$2.5k), Custom Build (A$5k–A$15k), Enterprise (A$25k+). All inc GST.',
  path: '/agents/deployment-services',
});

const TIERS = [
  {
    slug: 'quick-start',
    name: 'Quick Start',
    Icon: Rocket,
    accent: 'sky',
    price: 'A$2,500 fixed',
    timeline: '2 weeks',
    description: 'Pick one agent from the marketplace, plug it into your tools, go live.',
    features: [
      '1 agent, marketplace template',
      'Up to 3 standard integrations',
      '1 round of voice/scope tuning',
      '30-day post-launch support',
      'Pre-built dashboards & analytics',
      'Training session for your team',
    ],
    bestFor: 'Single workflow, off-the-shelf fit',
  },
  {
    slug: 'custom-build',
    name: 'Custom Build',
    Icon: Hammer,
    accent: 'amber',
    price: 'A$5,000 – A$15,000',
    timeline: '4–6 weeks',
    description:
      'Bespoke agent design with custom integrations, multi-step workflows, and your domain knowledge embedded.',
    features: [
      'Bespoke agent (1–2 roles combined)',
      'Custom API integrations & data pipes',
      'Knowledge base ingestion (your docs)',
      'Multi-round testing with your team',
      '90-day post-launch support',
      'Quarterly review for first year',
    ],
    bestFor: 'Non-standard workflow or proprietary stack',
    badge: 'Most popular',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise Programme',
    Icon: ShieldCheck,
    accent: 'emerald',
    price: 'From A$25,000',
    timeline: '8–12 weeks',
    description:
      'Multi-agent rollout with security review, SSO, audit infrastructure, and ongoing engineering support.',
    features: [
      '3+ agents with shared orchestration',
      'Security & privacy review (APP)',
      'SSO, role-based access, audit log',
      'On-premise or sovereign hosting options',
      'Dedicated success manager',
      'Ongoing engineering retainer',
    ],
    bestFor: 'Multi-team or regulated environments',
  },
];

const ACCENT_CLASSES: Record<string, string> = {
  sky: 'bg-sky-50 text-sky-700 ring-sky-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

const PROCESS = [
  { Icon: Compass, title: 'Discovery', body: 'Workshop with your team to map workflows, tools, and risk boundaries.' },
  { Icon: FileText, title: 'Spec', body: 'A signed-off scope of work — agents, channels, integrations, success metrics.' },
  { Icon: Hammer, title: 'Build', body: 'Configuration, prompt design, integration plumbing, and end-to-end testing.' },
  { Icon: PlayCircle, title: 'Pilot', body: 'Soft-launch with shadow mode, then human-in-loop, then routine handover.' },
  { Icon: TrendingUp, title: 'Production', body: 'Go-live with monitoring, weekly reviews, and continuous tuning.' },
];

const INCLUDED = [
  'Discovery workshop with stakeholders',
  'Written scope of work and acceptance criteria',
  'All build, configuration, and integration work',
  'Test plan with shadow-mode dry runs',
  'Documentation and runbook for your team',
  'Post-launch support window (30/90/ongoing)',
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Agent Deployment Services',
  serviceType: 'AI implementation services',
  provider: { '@type': 'Organization', name: 'LongCare AU', url: 'https://longcare.au' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  description:
    'End-to-end AI agent deployment for Australian SMEs and enterprises. Quick Start, Custom Build, and Enterprise tiers.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'AUD',
    lowPrice: '2500',
    highPrice: '25000',
    offerCount: 3,
  },
};

export default function DeploymentServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Deployment Services', url: '/agents/deployment-services' },
          ]}
        />

        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100">
              <Rocket className="size-3.5" />
              Done-for-you
            </span>
            <h1 className="mt-5 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Deployment Services
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              We build, configure, and deploy your AI agents end-to-end. From a 2-week single-agent
              launch to a multi-agent enterprise programme — pick the tier that matches your scope.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-rose-700" width={420} height={320} />
          </div>
        </section>

        {/* Tiers */}
        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map(({ slug, name, Icon, accent, price, timeline, description, features, bestFor, badge }) => (
            <article
              key={slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col relative"
            >
              {badge ? (
                <span className="absolute -top-3 left-6 rounded-full bg-amber-100 text-amber-700 px-3 py-0.5 text-xs font-bold ring-1 ring-amber-200">
                  {badge}
                </span>
              ) : null}
              <div className={`flex size-12 items-center justify-center rounded-xl ring-1 ${ACCENT_CLASSES[accent]}`}>
                <Icon className="size-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">{name}</h2>
              <div className="mt-2">
                <div className="text-2xl font-bold text-slate-900">{price}</div>
                <div className="text-xs text-slate-500">{timeline} · inc GST</div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{description}</p>
              <ul className="mt-5 space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="size-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Best for:</span> {bestFor}
              </div>
              <div className="mt-6">
                <a
                  href={`https://book.longcare.au?service=deployment-${slug}`}
                  className="bg-sky-700 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 no-underline w-full justify-center"
                >
                  Start with {name}
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* What's included */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">What&apos;s included</h2>
          <p className="mt-2 text-slate-600">Every tier — from Quick Start to Enterprise — covers these basics.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <div key={item} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="size-5 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Our 5-step process</h2>
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-12 overflow-x-auto">
            <div className="flex justify-center">
              <FlowFiveStep width={820} height={140} />
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map(({ Icon, title, body }, i) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">STEP {i + 1}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-xs text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">
            Ready to scope your deployment?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Book a 30-minute discovery call. We&apos;ll come back with a written scope and quote
            within 5 working days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://book.longcare.au?service=deployment-discovery"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              Book discovery call
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/agents/automation-packages"
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              See pre-built bundles
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
