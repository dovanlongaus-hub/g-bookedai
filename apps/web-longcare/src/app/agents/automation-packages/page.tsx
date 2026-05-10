import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  CheckCircle2,
  ArrowRight,
  Headset,
  TrendingUp,
  ClipboardList,
  Building2,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { InfographicStack } from '@/components/illustrations/infographic-stack';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Automation Packages — SME Bundles | LongCare AU',
  description:
    'Bundles of pre-configured AI agents for common SME workflows. Customer Service, Sales Engine, Operations Suite, Industry Starter — from A$449/mo (inc GST).',
  path: '/agents/automation-packages',
});

const PACKAGES = [
  {
    slug: 'customer-service-bundle',
    name: 'Customer Service Bundle',
    Icon: Headset,
    accent: 'rose',
    price: 'A$449/mo',
    setup: 'Setup A$3,000',
    includes: ['Customer Service AI', 'Scheduling AI'],
    description:
      'For service businesses fielding tickets and bookings on the same channels. One configuration, one approval flow.',
    roi: 'Saves ~A$2.5k/mo on front-desk hours and reduces first-response time below 5 minutes.',
    bestFor: 'Clinics, salons, professional services, e-commerce support',
  },
  {
    slug: 'sales-engine',
    name: 'Sales Engine',
    Icon: TrendingUp,
    accent: 'amber',
    price: 'A$799/mo',
    setup: 'Setup A$5,000',
    includes: ['Sales AI', 'Marketing AI', 'Customer Service AI'],
    description:
      'A revenue stack: marketing produces, sales qualifies, customer service retains. Each agent reads the same CRM.',
    roi: 'Targets 25% lift in qualified leads and 15% reduction in CAC within 90 days.',
    bestFor: 'B2B SMEs, agencies, sales-led growth',
  },
  {
    slug: 'operations-suite',
    name: 'Operations Suite',
    Icon: ClipboardList,
    accent: 'sky',
    price: 'A$549/mo',
    setup: 'Setup A$3,500',
    includes: ['Admin AI', 'HR AI', 'Scheduling AI'],
    description:
      'For founders drowning in inbox, hiring, and calendar overhead. Behind-the-scenes work handled on quiet automation.',
    roi: 'Saves ~A$3k/mo in admin time and frees one founder day per week.',
    bestFor: 'Founder-led teams, growing 5–25 person SMEs',
  },
  {
    slug: 'industry-starter',
    name: 'Industry Starter (any vertical)',
    Icon: Building2,
    accent: 'emerald',
    price: 'A$549/mo',
    setup: 'Setup A$4,000',
    includes: ['1 industry agent (your choice)', 'Customer Service AI'],
    description:
      'A vertical-specific agent paired with general support coverage. The fastest way to launch sector AI without losing customer comms.',
    roi: 'Targets 30% reduction in routine vertical-task time within 60 days.',
    bestFor: 'Healthcare, property, retail, hospitality, recruitment, or education SMEs',
  },
];

const ACCENT_CLASSES: Record<string, string> = {
  sky: 'bg-sky-50 text-sky-700 ring-sky-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
};

export default function AutomationPackagesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Automation Packages', url: '/agents/automation-packages' },
          ]}
        />

        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
              <Zap className="size-3.5" />
              Bundle savings up to 25%
            </span>
            <h1 className="mt-5 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Automation Packages
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Bundles of pre-configured agents for common SME workflows. Pre-wired integrations,
              pre-tuned approval rules, and shared context across agents — so your team gets the
              value of three agents on a single rollout plan.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-amber-700" width={420} height={320} />
          </div>
        </section>

        {/* Bundle stack visualisation */}
        <section className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
          <h2 className="font-heading text-2xl text-slate-900 text-center mb-6">How a bundle stacks together</h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">Pre-wired integrations, shared context, and one approval flow across every agent in the package.</p>
          <div className="flex justify-center">
            <InfographicStack width={760} height={260} />
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          {PACKAGES.map(({ slug, name, Icon, accent, price, setup, includes, description, roi, bestFor }) => (
            <article
              key={slug}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`flex size-12 items-center justify-center rounded-xl ring-1 ${ACCENT_CLASSES[accent]}`}>
                  <Icon className="size-6" />
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-slate-900">{price}</div>
                  <div className="text-xs text-slate-500">{setup}</div>
                </div>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">{name}</h2>
              <p className="mt-2 text-sm text-slate-600">{description}</p>

              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Includes</h3>
                <ul className="mt-2 space-y-1.5">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="size-4 mt-0.5 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Estimated ROI</h3>
                <p className="mt-1 text-sm text-slate-700">{roi}</p>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Best for:</span> {bestFor}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://book.longcare.au?service=package-${slug}`}
                  className="bg-sky-700 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 no-underline"
                >
                  Apply for this bundle
                  <ArrowRight className="size-4" />
                </a>
                <Link
                  href="/agents"
                  className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 no-underline"
                >
                  Compare individual agents
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">
            Need a custom bundle?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Mix any agents you like and we&apos;ll quote a bespoke setup. Volume discounts apply
            from three agents up.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/agents/deployment-services"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              Custom deployment options
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              Talk to us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
