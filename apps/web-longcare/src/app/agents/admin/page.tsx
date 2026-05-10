import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  Globe,
  Mail,
  MessageSquare,
  Hash,
  Phone,
  ShieldCheck,
  Stethoscope,
  Briefcase,
  ShoppingBag,
  Users,
  Headset,
  TrendingUp,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowAutomation } from '@/components/illustrations/flow-automation';

export const metadata: Metadata = getPageMetadata({
  title: 'Admin AI — Agent for Inbox & Calendar | LongCare AU',
  description:
    'AI employee for inbox triage, calendar coordination, document filing, and supplier comms. From A$199/mo (inc GST), 2-week deploy.',
  path: '/agents/admin',
});

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Admin AI',
  serviceType: 'AI agent deployment',
  provider: { '@type': 'Organization', name: 'LongCare AU' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  offers: { '@type': 'Offer', price: '199.00', priceCurrency: 'AUD' },
};

const CAPABILITIES = [
  'Inbox triage and reply drafting',
  'Calendar coordination across teams',
  'Document filing into Drive folders',
  'Expense data entry and categorisation',
  'Supplier comms drafts for review',
  'Weekly digest of pending items',
];

const CHANNELS = [
  { Icon: Mail, label: 'Email' },
  { Icon: Hash, label: 'Slack' },
  { Icon: Globe, label: 'Web embed' },
];

const TOOLS = ['Gmail', 'Outlook 365', 'Google Drive', 'Xero (read-only)', 'Calendar APIs', 'Slack'];

const WORKFLOW = [
  'Receives invoice email from supplier',
  'Extracts amount, date, and line items',
  'Routes to approver via Slack with summary',
  'Files PDF in correct Drive folder once approved',
];

const USE_CASES = [
  { slug: 'professional-services', name: 'Professional services', body: 'Accountants and consultants offload billing and supplier admin.', Icon: Briefcase },
  { slug: 'healthcare', name: 'Healthcare', body: 'Practice managers free up front-desk for patient experience.', Icon: Stethoscope },
  { slug: 'retail', name: 'Retail', body: 'Owner-operators reclaim weekends from inbox triage.', Icon: ShoppingBag },
];

const RELATED = [
  { slug: 'hr', name: 'HR AI', Icon: Users },
  { slug: 'customer-service', name: 'Customer Service AI', Icon: Headset },
  { slug: 'sales', name: 'Sales AI', Icon: TrendingUp },
];

export default function AdminAgentPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Business', url: '/agents/business' },
            { name: 'Admin AI', url: '/agents/admin' },
          ]}
        />

        {/* Hero */}
        <section className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              Pilots open · Q4 2026
            </span>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                <ClipboardList className="size-7" />
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                Admin AI
              </h1>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              An AI employee for the operational glue work: inbox, calendar, filing, and supplier
              comms. Drafts everything for human approval — never sends without your say-so.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://book.longcare.au?service=agent-admin"
                className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
              >
                Book pilot
                <ArrowRight className="size-4" />
              </a>
              <Link
                href="/agents/automation-packages"
                className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline"
              >
                View Operations Suite bundle
              </Link>
            </div>
          </div>
          <aside className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Pricing</h2>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">A$199<span className="text-base font-medium text-slate-500">/mo</span></div>
              <div className="text-sm text-slate-600">Setup A$1,500 fixed · 2-week deploy</div>
              <div className="text-xs text-slate-500 mt-1">All prices include GST</div>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> Up to 3 integrations included</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> 30-day post-launch support</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> Cancel anytime after 3 months</li>
            </ul>
          </aside>
        </section>

        {/* What it does */}
        <section className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">What it does</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <div key={c} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="size-5 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Where it works */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Where it works</h2>
          <p className="mt-2 text-slate-600">Channels your team already uses.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {CHANNELS.map(({ Icon, label }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
                <Icon className="size-5 text-sky-700" />
                <span className="text-sm font-medium text-slate-800">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Tools it integrates with</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {TOOLS.map((tool) => (
              <div key={tool} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
                <span className="text-sm font-medium text-slate-800">{tool}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Sample workflow</h2>
          <p className="mt-2 text-slate-600">Invoice handling — happens daily, no human time required.</p>
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
            <div className="flex justify-center">
              <FlowAutomation width={820} height={160} />
            </div>
          </div>
          <ol className="mt-6 space-y-3">
            {WORKFLOW.map((step, i) => (
              <li key={step} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-sky-700 text-white text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm text-slate-700 mt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Setup + price block */}
        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Timeline</h3>
            <p className="mt-2 text-sm text-slate-600">2 weeks from kickoff to soft-launch.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Setup includes</h3>
            <p className="mt-2 text-sm text-slate-600">3 integrations, voice tuning, team training.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Ongoing</h3>
            <p className="mt-2 text-sm text-slate-600">A$199/mo includes hosting, monitoring, monthly reviews.</p>
          </div>
        </section>

        {/* Compliance */}
        <section className="mt-16 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h2 className="font-heading text-2xl font-semibold text-slate-900">Compliance & data</h2>
              <p className="mt-3 text-sm text-slate-700">
                APP-aligned data handling under the Australian Privacy Principles. AU data
                residency by default. Every action by the agent is recorded in an immutable audit
                log. Approval rules can require human sign-off before any external comms or
                financial action.
              </p>
            </div>
          </div>
        </section>

        {/* Customers like you */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Customers like you</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {USE_CASES.map(({ slug, name, body, Icon }) => (
              <Link key={slug} href={`/solutions/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-sky-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-sky-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                  See sector solutions <ArrowRight className="size-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related agents */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Related agents</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {RELATED.map(({ slug, name, Icon }) => (
              <Link key={slug} href={`/agents/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-sky-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-sky-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                  Explore <ArrowRight className="size-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">Ready to deploy Admin AI?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Book a 30-minute pilot intake call.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="https://book.longcare.au?service=agent-admin" className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">
              Book agent pilot <ArrowRight className="size-4" />
            </a>
            <Link href="/agents/automation-packages" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">
              Compare with bundle
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
