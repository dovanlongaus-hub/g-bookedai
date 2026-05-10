import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ClipboardList,
  Users,
  Headset,
  TrendingUp,
  Calendar,
  Megaphone,
  ArrowRight,
  Briefcase,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { HeroAgents } from '@/components/illustrations/hero-agents';

export const metadata: Metadata = getPageMetadata({
  title: 'Business AI Agents — Cross-Industry | LongCare AU',
  description:
    'Six cross-industry AI agents for Australian SMEs: Admin, HR, Customer Service, Sales, Scheduling, Marketing. From A$199/mo (inc GST).',
  path: '/agents/business',
});

const AGENTS = [
  {
    slug: 'admin',
    name: 'Admin AI',
    Icon: ClipboardList,
    role: 'Inbox triage, calendar, filing, expense entry',
    tag: 'Best for: founders, EAs, ops leads',
    price: 'A$199/mo',
    setup: 'Setup A$1,500',
    accent: 'sky',
  },
  {
    slug: 'hr',
    name: 'HR AI',
    Icon: Users,
    role: 'Hiring, screening, onboarding, policy Q&A',
    tag: 'Best for: people leaders, growing teams',
    price: 'A$249/mo',
    setup: 'Setup A$2,000',
    accent: 'emerald',
  },
  {
    slug: 'customer-service',
    name: 'Customer Service AI',
    Icon: Headset,
    role: 'Auto-reply, ticket triage, escalation, CSAT',
    tag: 'Best for: support teams, e-commerce',
    price: 'A$299/mo',
    setup: 'Setup A$2,000',
    accent: 'rose',
  },
  {
    slug: 'sales',
    name: 'Sales AI',
    Icon: TrendingUp,
    role: 'Lead qualification, follow-ups, proposals',
    tag: 'Best for: sales-led SMEs, B2B',
    price: 'A$349/mo',
    setup: 'Setup A$2,500',
    accent: 'amber',
  },
  {
    slug: 'scheduling',
    name: 'Scheduling AI',
    Icon: Calendar,
    role: 'Multi-party booking, reminders, recovery',
    tag: 'Best for: services with appointments',
    price: 'A$199/mo',
    setup: 'Setup A$1,500',
    accent: 'indigo',
  },
  {
    slug: 'marketing',
    name: 'Marketing AI',
    Icon: Megaphone,
    role: 'Content calendar, posts, ads, analytics',
    tag: 'Best for: solo marketers, small teams',
    price: 'A$299/mo',
    setup: 'Setup A$2,000',
    accent: 'fuchsia',
  },
];

const ACCENT_CLASSES: Record<string, string> = {
  sky: 'bg-sky-50 text-sky-700 ring-sky-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-100',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100',
};

export default function BusinessAgentsHubPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Business', url: '/agents/business' },
          ]}
        />

        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              <Briefcase className="size-3.5" />
              Cross-industry
            </span>
            <h1 className="mt-5 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Business AI Agents
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Cross-industry agents that work in any SME. Pick one, layer two, or take a bundle —
              all configurable to your tools, your tone, and your approval rules.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </section>

        <section className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map(({ slug, name, Icon, role, tag, price, setup, accent }) => (
            <Link
              key={slug}
              href={`/agents/${slug}`}
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:border-sky-200 hover:shadow-lg transition-all no-underline flex flex-col"
            >
              <div className={`flex size-12 items-center justify-center rounded-xl ring-1 ${ACCENT_CLASSES[accent]}`}>
                <Icon className="size-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">{name}</h2>
              <p className="mt-2 text-sm text-slate-600">{role}</p>
              <p className="mt-3 text-xs font-medium text-slate-500">{tag}</p>
              <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-slate-900">{price}</div>
                  <div className="text-xs text-slate-500">{setup}</div>
                </div>
                <ArrowRight className="size-4 text-sky-700 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">
            Not sure which fits?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Talk to us about your workflow. We&apos;ll recommend one or two agents — never more
            than you&apos;ll actually use.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://book.longcare.au?service=agent-pilot"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              Talk to us about which fits
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/agents/automation-packages"
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              See bundles
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
