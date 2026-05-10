import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  Zap,
  Rocket,
  ArrowRight,
  Sparkles,
  Compass,
  SlidersHorizontal,
  Plug,
  PlayCircle,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Hash,
  CheckCircle2,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { HeroAgentsMotion } from '@/components/illustrations/animated';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Agent Marketplace — Deploy AI Employees | LongCare AU',
  description:
    'Deploy AI employees that work in your tools, on your schedule, with your data. 12 agents across 6 channels. Pilots open from A$199/mo (inc GST).',
  path: '/agents',
});

const BUSINESS_AGENTS = [
  { slug: 'admin', name: 'Admin AI', tagline: 'Inbox, calendar, filing', price: 'A$199/mo' },
  { slug: 'hr', name: 'HR AI', tagline: 'Hiring & onboarding', price: 'A$249/mo' },
  { slug: 'customer-service', name: 'Customer Service AI', tagline: 'Tickets & triage', price: 'A$299/mo' },
  { slug: 'sales', name: 'Sales AI', tagline: 'Leads & follow-ups', price: 'A$349/mo' },
  { slug: 'scheduling', name: 'Scheduling AI', tagline: 'Multi-party booking', price: 'A$199/mo' },
  { slug: 'marketing', name: 'Marketing AI', tagline: 'Content & ads', price: 'A$299/mo' },
];

const INDUSTRY_AGENTS = [
  { slug: 'healthcare', name: 'Healthcare AI', tagline: 'Cliniko & MedicalDirector aware', price: 'A$399/mo' },
  { slug: 'property', name: 'Property Management AI', tagline: 'PropertyTree & REI aware', price: 'A$349/mo' },
  { slug: 'retail', name: 'Retail AI', tagline: 'Shopify & Square aware', price: 'A$299/mo' },
  { slug: 'hospitality', name: 'Hospitality AI', tagline: 'Now Book It & Lightspeed aware', price: 'A$299/mo' },
  { slug: 'recruitment', name: 'Recruitment AI', tagline: 'Seek & LinkedIn aware', price: 'A$349/mo' },
  { slug: 'education', name: 'Education AI', tagline: 'Sentral & Compass aware', price: 'A$299/mo' },
];

const STEPS = [
  { Icon: Compass, title: 'Discover', body: 'Pick the agent that matches your workflow gap.' },
  { Icon: SlidersHorizontal, title: 'Configure', body: 'Tune voice, scope, and approval rules to your business.' },
  { Icon: Plug, title: 'Connect tools', body: 'Authorise calendar, email, CRM, and other systems.' },
  { Icon: PlayCircle, title: 'Deploy', body: 'Soft-launch with a human-in-loop, then hand over routine work.' },
];

const CHANNELS = [
  { Icon: Globe, label: 'Web embed' },
  { Icon: Mail, label: 'Email' },
  { Icon: MessageSquare, label: 'WhatsApp' },
  { Icon: Hash, label: 'Slack' },
  { Icon: Phone, label: 'SMS' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Agent Marketplace',
  serviceType: 'AI agent deployment',
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    url: 'https://longcare.au',
  },
  areaServed: { '@type': 'Country', name: 'Australia' },
  description:
    'Marketplace of 12 AI agents (6 business, 6 industry) deployable across web, email, WhatsApp, Slack, and SMS.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'AUD',
    lowPrice: '199',
    highPrice: '499',
    offerCount: 12,
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI Agents — LongCare AU',
  itemListElement: [...BUSINESS_AGENTS, ...INDUSTRY_AGENTS].map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: a.name,
      url: `https://longcare.au/agents/${a.slug}`,
      provider: { '@type': 'Organization', name: 'LongCare AU' },
    },
  })),
};

export default function AgentsHubPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Agents', url: '/agents' }]} />

        {/* Hero */}
        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
              <Sparkles className="size-3.5" />
              Launching Q4 2026 · 5 pilot deployments running
            </span>
            <h1 className="mt-5 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Agent Marketplace
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Deploy AI employees that work in your tools, on your schedule, with your data.
              Configurable, auditable, and human-supervised by default.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
              <span>12 agents</span>
              <span aria-hidden>·</span>
              <span>6 channels</span>
              <span aria-hidden>·</span>
              <span>From A$199/mo (inc GST)</span>
              <span aria-hidden>·</span>
              <span>Setup in 2 weeks</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=agent-pilot"
                className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
              >
                Apply for early-access pilot
                <ArrowRight className="size-4" />
              </a>
              <Link
                href="/contact"
                className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
              >
                Talk to a specialist
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgentsMotion className="text-sky-700" width={420} height={320} />
          </div>
        </section>

        {/* Two collections */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Two collections</h2>
          <p className="mt-2 text-slate-600">Choose the path that matches your business shape.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href="/agents/business"
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:border-sky-200 hover:shadow-lg transition-all no-underline"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                <Briefcase className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Business agents</h3>
              <p className="mt-2 text-sm text-slate-600">
                Cross-industry: Admin, HR, Sales, Marketing, Scheduling, Customer Service.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700">
                Browse 6 agents <ArrowRight className="size-4" />
              </div>
            </Link>
            <Link
              href="/agents/industry"
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:border-emerald-200 hover:shadow-lg transition-all no-underline"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <Building2 className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Industry agents</h3>
              <p className="mt-2 text-sm text-slate-600">
                Vertical-specific: Healthcare, Property, Retail, Hospitality, Recruitment, Education.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                Browse 6 agents <ArrowRight className="size-4" />
              </div>
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">How it works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ Icon, title, body }, i) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">STEP {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 overflow-x-auto">
            <h3 className="font-heading text-xl text-slate-900 text-center mb-6">From discovery to deployment</h3>
            <div className="flex justify-center">
              <FlowFiveStep width={800} height={140} />
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Channels</h2>
          <p className="mt-2 text-slate-600">Your customers reach the agent on the channels they already use.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {CHANNELS.map(({ Icon, label }) => (
              <div
                key={label}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2"
              >
                <Icon className="size-6 text-sky-700" />
                <span className="text-sm font-semibold text-slate-800">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Add-ons</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href="/agents/automation-packages"
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:border-sky-200 hover:shadow-lg transition-all no-underline"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                <Zap className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Automation Packages</h3>
              <p className="mt-2 text-sm text-slate-600">Bundles for common workflows — discounted from A$449/mo.</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700">
                See packages <ArrowRight className="size-4" />
              </div>
            </Link>
            <Link
              href="/agents/deployment-services"
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:border-sky-200 hover:shadow-lg transition-all no-underline"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                <Rocket className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Deployment Services</h3>
              <p className="mt-2 text-sm text-slate-600">We build, configure, and deploy your AI agents end-to-end.</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700">
                Quick Start, Custom Build, Enterprise <ArrowRight className="size-4" />
              </div>
            </Link>
          </div>
        </section>

        {/* All agents quick grid */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">All 12 agents</h2>
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Business</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {BUSINESS_AGENTS.map((a) => (
                <Link
                  key={a.slug}
                  href={`/agents/${a.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-sky-200 hover:shadow-md transition-all no-underline"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{a.name}</span>
                    <span className="text-xs font-semibold text-sky-700">{a.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{a.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Industry</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRY_AGENTS.map((a) => (
                <Link
                  key={a.slug}
                  href={`/agents/${a.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all no-underline"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{a.name}</span>
                    <span className="text-xs font-semibold text-emerald-700">{a.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{a.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pilot CTA */}
        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                Pilot programme
              </span>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-slate-900">
                Become an early-access pilot
              </h2>
              <p className="mt-3 text-slate-600">
                We&apos;re onboarding a small cohort of Australian SMEs Q3–Q4 2026. Pilots get
                priority configuration, founder-level support, and discounted setup.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {[
                  'Discounted setup (50% off)',
                  'Weekly check-ins for the first 90 days',
                  'Direct line to the build team',
                  'Co-design of your custom workflows',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 mt-0.5 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Apply for pilot</h3>
              <p className="mt-2 text-sm text-slate-600">
                Two options to start the conversation:
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="https://book.longcare.au?service=agent-pilot"
                  className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center justify-center gap-2 no-underline"
                >
                  Book pilot intake call
                  <ArrowRight className="size-4" />
                </a>
                <Link
                  href="/referral"
                  className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center justify-center gap-2 no-underline"
                >
                  Refer a business (rev-share)
                </Link>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Pricing inclusive of GST. Pilots may include a service-credit arrangement.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
