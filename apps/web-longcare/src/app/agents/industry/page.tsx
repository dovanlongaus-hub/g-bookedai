import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Stethoscope,
  Home,
  ShoppingBag,
  UtensilsCrossed,
  UserSearch,
  GraduationCap,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { HeroAgents } from '@/components/illustrations/hero-agents';

export const metadata: Metadata = getPageMetadata({
  title: 'Industry AI Agents — Vertical-Specific | LongCare AU',
  description:
    'Six vertical-specific AI agents tuned for Australian healthcare, property, retail, hospitality, recruitment, and education. From A$299/mo (inc GST).',
  path: '/agents/industry',
});

const AGENTS = [
  {
    slug: 'healthcare',
    name: 'Healthcare AI',
    Icon: Stethoscope,
    role: 'Patient FAQs, reminders, claim drafts, after-hours triage',
    tag: 'Cliniko, Best Practice, MedicalDirector aware',
    price: 'A$399/mo',
    setup: 'Setup A$3,000',
    accent: 'sky',
  },
  {
    slug: 'property',
    name: 'Property Management AI',
    Icon: Home,
    role: 'Tenant comms, listings, market reports, maintenance triage',
    tag: 'PropertyTree, REI, Console aware',
    price: 'A$349/mo',
    setup: 'Setup A$3,000',
    accent: 'emerald',
  },
  {
    slug: 'retail',
    name: 'Retail AI',
    Icon: ShoppingBag,
    role: 'Product copy, abandoned cart, reviews, restock alerts',
    tag: 'Shopify, Square, Klaviyo aware',
    price: 'A$299/mo',
    setup: 'Setup A$2,000',
    accent: 'rose',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality AI',
    Icon: UtensilsCrossed,
    role: 'Bookings, dietary requests, review replies, supplier comms',
    tag: 'Now Book It, Lightspeed, ResDiary aware',
    price: 'A$299/mo',
    setup: 'Setup A$2,000',
    accent: 'amber',
  },
  {
    slug: 'recruitment',
    name: 'Recruitment AI',
    Icon: UserSearch,
    role: 'Job ads, screening, interview scheduling, references',
    tag: 'Seek, Indeed, LinkedIn Recruiter aware',
    price: 'A$349/mo',
    setup: 'Setup A$2,500',
    accent: 'indigo',
  },
  {
    slug: 'education',
    name: 'Education AI',
    Icon: GraduationCap,
    role: 'Parent comms, attendance, lesson plans, report comments',
    tag: 'Sentral, Compass, ClassDojo aware',
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

export default function IndustryAgentsHubPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Industry', url: '/agents/industry' },
          ]}
        />

        <section className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <Building2 className="size-3.5" />
              Vertical-specific
            </span>
            <h1 className="mt-5 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Industry AI Agents
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Six agents tuned for the Australian tools, regulators, and customer expectations of
              specific verticals. Faster to deploy because the templates already know your stack.
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-emerald-700" width={420} height={320} />
          </div>
        </section>

        <section className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map(({ slug, name, Icon, role, tag, price, setup, accent }) => (
            <Link
              key={slug}
              href={`/agents/${slug}`}
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:border-emerald-200 hover:shadow-lg transition-all no-underline flex flex-col"
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
                <ArrowRight className="size-4 text-emerald-700 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">
            Don&apos;t see your industry?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            We custom-build agents for niche verticals — trades, NDIS providers, RTOs, accountants,
            and more. Tell us about your workflow and we&apos;ll scope a pilot.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://book.longcare.au?service=agent-pilot"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              Talk to us about your industry
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/agents/deployment-services"
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
            >
              Custom build options
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
