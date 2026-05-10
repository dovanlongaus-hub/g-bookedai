import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Headset,
  CheckCircle2,
  ArrowRight,
  Globe,
  Mail,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  ClipboardList,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowAutomation } from '@/components/illustrations/flow-automation';

export const metadata: Metadata = getPageMetadata({
  title: 'Customer Service AI — Agent for Tickets & Triage | LongCare AU',
  description:
    'AI employee for auto-reply, ticket triage, sentiment escalation, and CSAT collection. From A$299/mo (inc GST), 2-week deploy.',
  path: '/agents/customer-service',
});

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Customer Service AI',
  serviceType: 'AI agent deployment',
  provider: { '@type': 'Organization', name: 'LongCare AU' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  offers: { '@type': 'Offer', price: '299.00', priceCurrency: 'AUD' },
};

const CAPABILITIES = [
  'Auto-reply to common questions across channels',
  'Ticket triage and routing by topic',
  'Sentiment-based escalation to humans',
  'CSAT survey delivery and analysis',
  'Knowledge-base answer drafting from your docs',
  'Multilingual support (12+ languages)',
];

const CHANNELS = [
  { Icon: Globe, label: 'Web chat' },
  { Icon: Mail, label: 'Email' },
  { Icon: MessageSquare, label: 'WhatsApp' },
];

const TOOLS = ['Intercom', 'Zendesk', 'Help Scout', 'Freshdesk', 'Front', 'Slack'];

const WORKFLOW = [
  'Customer ticket arrives via web chat',
  'Agent categorises by topic and detects sentiment',
  'Drafts answer from knowledge base or escalates if angry',
  'Logs resolution and triggers CSAT survey at end of conversation',
];

const USE_CASES = [
  { slug: 'retail', name: 'Retail', body: 'E-commerce SMEs handle 70% of pre-sale questions automatically.', Icon: ShoppingBag },
  { slug: 'healthcare', name: 'Healthcare', body: 'Clinics deflect routine FAQs while escalating clinical questions.', Icon: Stethoscope },
  { slug: 'hospitality', name: 'Hospitality', body: 'Restaurants and hotels respond instantly across booking channels.', Icon: UtensilsCrossed },
];

const RELATED = [
  { slug: 'scheduling', name: 'Scheduling AI', Icon: Calendar },
  { slug: 'sales', name: 'Sales AI', Icon: TrendingUp },
  { slug: 'admin', name: 'Admin AI', Icon: ClipboardList },
];

export default function CustomerServiceAgentPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Business', url: '/agents/business' },
            { name: 'Customer Service AI', url: '/agents/customer-service' },
          ]}
        />

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100">
              Pilots open · Q4 2026
            </span>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                <Headset className="size-7" />
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">Customer Service AI</h1>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              An AI employee for the front line: auto-replies, triage, escalation, and CSAT
              collection across web chat, email, and WhatsApp. Reads your knowledge base and your
              tone before it speaks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://book.longcare.au?service=agent-customer-service" className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">
                Book pilot <ArrowRight className="size-4" />
              </a>
              <Link href="/agents/automation-packages" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">
                View Customer Service Bundle
              </Link>
            </div>
          </div>
          <aside className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Pricing</h2>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">A$299<span className="text-base font-medium text-slate-500">/mo</span></div>
              <div className="text-sm text-slate-600">Setup A$2,000 fixed · 2-week deploy</div>
              <div className="text-xs text-slate-500 mt-1">All prices include GST</div>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> Up to 3 channels included</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> 30-day post-launch support</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> Cancel anytime after 3 months</li>
            </ul>
          </aside>
        </section>

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

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Where it works</h2>
          <p className="mt-2 text-slate-600">Conversational channels with consistent context.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHANNELS.map(({ Icon, label }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
                <Icon className="size-5 text-rose-700" />
                <span className="text-sm font-medium text-slate-800">{label}</span>
              </div>
            ))}
          </div>
        </section>

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

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Sample workflow</h2>
          <p className="mt-2 text-slate-600">Inbound ticket — handled in under 30 seconds.</p>
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
            <div className="flex justify-center">
              <FlowAutomation width={820} height={160} />
            </div>
          </div>
          <ol className="mt-6 space-y-3">
            {WORKFLOW.map((step, i) => (
              <li key={step} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-rose-700 text-white text-sm font-bold flex-shrink-0">{i + 1}</div>
                <span className="text-sm text-slate-700 mt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Timeline</h3>
            <p className="mt-2 text-sm text-slate-600">2 weeks from kickoff to soft-launch.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Setup includes</h3>
            <p className="mt-2 text-sm text-slate-600">Knowledge-base ingestion, voice tuning, escalation rules.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Ongoing</h3>
            <p className="mt-2 text-sm text-slate-600">A$299/mo includes hosting, monitoring, monthly tuning.</p>
          </div>
        </section>

        <section className="mt-16 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h2 className="font-heading text-2xl font-semibold text-slate-900">Compliance & data</h2>
              <p className="mt-3 text-sm text-slate-700">
                APP-aligned conversation handling with AU data residency. ACMA spam-rules-aware
                for outbound messages. Refusal policies on regulated topics (health, legal,
                financial advice). Full audit log of every interaction.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Customers like you</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {USE_CASES.map(({ slug, name, body, Icon }) => (
              <Link key={slug} href={`/solutions/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-rose-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-rose-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rose-700">See sector solutions <ArrowRight className="size-3.5" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Related agents</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {RELATED.map(({ slug, name, Icon }) => (
              <Link key={slug} href={`/agents/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-rose-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-rose-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rose-700">Explore <ArrowRight className="size-3.5" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">Ready to deploy Customer Service AI?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Book a 30-minute pilot intake call.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="https://book.longcare.au?service=agent-customer-service" className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Book agent pilot <ArrowRight className="size-4" /></a>
            <Link href="/agents/automation-packages" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Compare with bundle</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
