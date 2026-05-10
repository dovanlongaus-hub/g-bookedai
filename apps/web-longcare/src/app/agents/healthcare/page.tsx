import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  Phone,
  Globe,
  MessageSquare,
  ShieldCheck,
  Home,
  GraduationCap,
  Briefcase,
  Headset,
  Calendar,
  ClipboardList,
  AlertCircle,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowAutomation } from '@/components/illustrations/flow-automation';

export const metadata: Metadata = getPageMetadata({
  title: 'Healthcare AI — Agent for Clinics & GP Practices | LongCare AU',
  description:
    'AI employee for patient FAQs, reminders, Medicare claim drafts, after-hours triage. AHPRA and APP aligned. From A$399/mo (inc GST), 3-week deploy.',
  path: '/agents/healthcare',
});

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare AI',
  serviceType: 'AI agent deployment',
  provider: { '@type': 'Organization', name: 'LongCare AU' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  offers: { '@type': 'Offer', price: '399.00', priceCurrency: 'AUD' },
};

const CAPABILITIES = [
  'Patient FAQ replies with safe-by-default routing',
  'Personalised appointment reminders (SMS/email)',
  'Medicare claim narrative drafts for clinician sign-off',
  'After-hours triage with clear clinical escalation',
  'Recall and chronic disease follow-up nudges',
  'Translation for multicultural patients',
];

const CHANNELS = [
  { Icon: Phone, label: 'SMS' },
  { Icon: Globe, label: 'Web chat' },
  { Icon: MessageSquare, label: 'Phone (Twilio)' },
];

const TOOLS = ['Cliniko', 'Best Practice', 'MedicalDirector', 'Genie', 'HotDoc', 'Twilio'];

const WORKFLOW = [
  'Patient asks about fees on web chat after hours',
  'Agent answers from approved FAQ knowledge base',
  'If clinical question detected, escalates to duty triage SMS',
  'Logs interaction with patient consent record',
];

const USE_CASES = [
  { slug: 'healthcare', name: 'Healthcare', body: 'Clinics and GP practices use AHPRA-aligned automation.', Icon: Stethoscope },
  { slug: 'professional-services', name: 'Allied health', body: 'Physios, psychologists, and specialists scale comms safely.', Icon: Briefcase },
  { slug: 'education', name: 'Disability & care', body: 'NDIS providers handle high-volume coordination requests.', Icon: GraduationCap },
];

const RELATED = [
  { slug: 'scheduling', name: 'Scheduling AI', Icon: Calendar },
  { slug: 'customer-service', name: 'Customer Service AI', Icon: Headset },
  { slug: 'admin', name: 'Admin AI', Icon: ClipboardList },
];

export default function HealthcareAgentPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Industry', url: '/agents/industry' },
            { name: 'Healthcare AI', url: '/agents/healthcare' },
          ]}
        />

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              Pilots open · Q4 2026
            </span>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                <Stethoscope className="size-7" />
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">Healthcare AI</h1>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              An AI employee designed for Australian clinics and allied health: handles patient
              FAQs, reminders, Medicare admin drafts, and after-hours triage — all within strict
              AHPRA and Australian Privacy Principle boundaries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://book.longcare.au?service=agent-healthcare" className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Book pilot <ArrowRight className="size-4" /></a>
              <Link href="/agents/automation-packages" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">View Industry Starter bundle</Link>
            </div>
          </div>
          <aside className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Pricing</h2>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">A$399<span className="text-base font-medium text-slate-500">/mo</span></div>
              <div className="text-sm text-slate-600">Setup A$3,000 fixed · 3-week deploy</div>
              <div className="text-xs text-slate-500 mt-1">All prices include GST</div>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> AHPRA-compliant FAQ library</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> 90-day post-launch support</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> AU data residency mandatory</li>
            </ul>
          </aside>
        </section>

        <section className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle className="size-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">
            <strong>Clinical safety:</strong> Healthcare AI never replaces clinical judgement. All
            clinical questions are escalated to a registered practitioner. Configuration is signed
            off by a clinical lead during deployment.
          </p>
        </section>

        <section className="mt-16">
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
          <p className="mt-2 text-slate-600">Patient-friendly channels with strict escalation rules.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHANNELS.map(({ Icon, label }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
                <Icon className="size-5 text-sky-700" />
                <span className="text-sm font-medium text-slate-800">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Tools it integrates with</h2>
          <p className="mt-2 text-slate-600">Read-only via approved Australian PMS bridges.</p>
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
          <p className="mt-2 text-slate-600">After-hours patient query — handled safely.</p>
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
            <div className="flex justify-center">
              <FlowAutomation width={820} height={160} />
            </div>
          </div>
          <ol className="mt-6 space-y-3">
            {WORKFLOW.map((step, i) => (
              <li key={step} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-sky-700 text-white text-sm font-bold flex-shrink-0">{i + 1}</div>
                <span className="text-sm text-slate-700 mt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Timeline</h3>
            <p className="mt-2 text-sm text-slate-600">3 weeks (additional clinical sign-off step).</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Setup includes</h3>
            <p className="mt-2 text-sm text-slate-600">FAQ library, escalation rules, PMS integration.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Ongoing</h3>
            <p className="mt-2 text-sm text-slate-600">A$399/mo includes hosting, monitoring, quarterly reviews.</p>
          </div>
        </section>

        <section className="mt-16 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h2 className="font-heading text-2xl font-semibold text-slate-900">Compliance & data</h2>
              <p className="mt-3 text-sm text-slate-700">
                AHPRA advertising guidelines aligned. Australian Privacy Principles (APP)
                compliant for sensitive health information. AU data residency mandatory.
                Mandatory clinical-question escalation. Never replaces clinical judgement.
                Privacy Act and My Health Records Act-aware.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Customers like you</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {USE_CASES.map(({ slug, name, body, Icon }) => (
              <Link key={slug} href={`/solutions/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-sky-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-sky-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">See sector solutions <ArrowRight className="size-3.5" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Related agents</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {RELATED.map(({ slug, name, Icon }) => (
              <Link key={slug} href={`/agents/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-sky-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-sky-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-700">Explore <ArrowRight className="size-3.5" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">Ready to deploy Healthcare AI?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Book a 30-minute pilot intake call with our clinical lead.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="https://book.longcare.au?service=agent-healthcare" className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Book agent pilot <ArrowRight className="size-4" /></a>
            <Link href="/agents/automation-packages" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Compare with bundle</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
