import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
  Stethoscope,
  Briefcase,
  UserSearch,
  Headset,
  Users,
  ClipboardList,
  AlertCircle,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowAutomation } from '@/components/illustrations/flow-automation';

export const metadata: Metadata = getPageMetadata({
  title: 'Education AI — Agent for Sentral & Compass | LongCare AU',
  description:
    'AI employee for parent comms, attendance follow-up, lesson plans, and report comments. Sentral and Compass aware. From A$299/mo (inc GST), 3-week deploy.',
  path: '/agents/education',
});

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Education AI',
  serviceType: 'AI agent deployment',
  provider: { '@type': 'Organization', name: 'LongCare AU' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  offers: { '@type': 'Offer', price: '299.00', priceCurrency: 'AUD' },
};

const CAPABILITIES = [
  'Parent communication drafts (multilingual)',
  'Attendance follow-up sequences',
  'Lesson plan drafts (curriculum-aligned)',
  'Report comment generation for educator review',
  'Excursion and event coordination',
  'Enrolment enquiry triage',
];

const CHANNELS = [
  { Icon: Mail, label: 'Email' },
  { Icon: Phone, label: 'SMS' },
];

const TOOLS = ['Sentral', 'Compass', 'ClassDojo', 'Seesaw', 'Google Classroom', 'Schoolbox'];

const WORKFLOW = [
  'Student absence detected in Sentral',
  'Agent drafts personalised parent SMS in family\'s preferred language',
  'Logs response and escalates if absences persist over threshold',
  'Generates pastoral-care alert for year-level coordinator',
];

const USE_CASES = [
  { slug: 'education', name: 'Schools & RTOs', body: 'Schools, RTOs, and tutoring centres save 5+ hours/week per teacher.', Icon: GraduationCap },
  { slug: 'professional-services', name: 'Educational publishing', body: 'Curriculum publishers test materials at scale.', Icon: Briefcase },
  { slug: 'healthcare', name: 'Allied health in education', body: 'School psychologists and speech pathologists scale comms.', Icon: Stethoscope },
];

const RELATED = [
  { slug: 'recruitment', name: 'Recruitment AI', Icon: UserSearch },
  { slug: 'customer-service', name: 'Customer Service AI', Icon: Headset },
  { slug: 'admin', name: 'Admin AI', Icon: ClipboardList },
];

export default function EducationAgentPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Agents', url: '/agents' },
            { name: 'Industry', url: '/agents/industry' },
            { name: 'Education AI', url: '/agents/education' },
          ]}
        />

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-700 ring-1 ring-fuchsia-100">
              Pilots open · Q4 2026
            </span>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                <GraduationCap className="size-7" />
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">Education AI</h1>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              An AI employee for Australian schools, RTOs, and tutoring centres: parent
              communications, attendance follow-ups, curriculum-aligned lesson plan drafts, and
              report comments — fluent in Sentral, Compass, and ClassDojo workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://book.longcare.au?service=agent-education" className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Book pilot <ArrowRight className="size-4" /></a>
              <Link href="/agents/automation-packages" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">View Industry Starter bundle</Link>
            </div>
          </div>
          <aside className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Pricing</h2>
            <div className="mt-2">
              <div className="text-3xl font-bold text-slate-900">A$299<span className="text-base font-medium text-slate-500">/mo</span></div>
              <div className="text-sm text-slate-600">Setup A$2,000 fixed · 3-week deploy</div>
              <div className="text-xs text-slate-500 mt-1">All prices include GST</div>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> Sentral or Compass connector</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> 60-day post-launch support</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="size-4 mt-0.5 text-emerald-600" /> Educator-in-loop policy</li>
            </ul>
          </aside>
        </section>

        <section className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle className="size-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">
            <strong>Educator-in-loop required:</strong> Education AI never makes student-facing
            decisions on its own. All assessments, reports, and pastoral alerts are reviewed by a
            qualified educator before they reach students or parents.
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
          <p className="mt-2 text-slate-600">Channels parents and staff already use.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHANNELS.map(({ Icon, label }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
                <Icon className="size-5 text-fuchsia-700" />
                <span className="text-sm font-medium text-slate-800">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Tools it integrates with</h2>
          <p className="mt-2 text-slate-600">Through approved APIs only — student data stays on-prem where possible.</p>
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
          <p className="mt-2 text-slate-600">Attendance follow-up — gentle, multilingual, and escalation-aware.</p>
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 overflow-x-auto">
            <div className="flex justify-center">
              <FlowAutomation width={820} height={160} />
            </div>
          </div>
          <ol className="mt-6 space-y-3">
            {WORKFLOW.map((step, i) => (
              <li key={step} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-fuchsia-700 text-white text-sm font-bold flex-shrink-0">{i + 1}</div>
                <span className="text-sm text-slate-700 mt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Timeline</h3>
            <p className="mt-2 text-sm text-slate-600">3 weeks (includes child-safety review).</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Setup includes</h3>
            <p className="mt-2 text-sm text-slate-600">SIS connector, curriculum alignment, escalation policy.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Ongoing</h3>
            <p className="mt-2 text-sm text-slate-600">A$299/mo includes hosting, monitoring, term reviews.</p>
          </div>
        </section>

        <section className="mt-16 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h2 className="font-heading text-2xl font-semibold text-slate-900">Compliance & data</h2>
              <p className="mt-3 text-sm text-slate-700">
                Child Safe Standards-aware. APP compliant for student personal information.
                Educator-in-loop required for any student-facing decisions. Curriculum
                alignment to ACARA / state-specific frameworks. AU data residency by default.
                Full audit trail for accreditation reviews.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Customers like you</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {USE_CASES.map(({ slug, name, body, Icon }) => (
              <Link key={slug} href={`/solutions/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-fuchsia-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-fuchsia-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-fuchsia-700">See sector solutions <ArrowRight className="size-3.5" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">Related agents</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {RELATED.map(({ slug, name, Icon }) => (
              <Link key={slug} href={`/agents/${slug}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-fuchsia-200 hover:shadow-md transition-all no-underline">
                <Icon className="size-5 text-fuchsia-700" />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{name}</h3>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-fuchsia-700">Explore <ArrowRight className="size-3.5" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 p-10 sm:p-14 ring-1 ring-sky-100 text-center">
          <h2 className="font-heading text-3xl font-semibold text-slate-900">Ready to deploy Education AI?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Book a 30-minute pilot intake call.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="https://book.longcare.au?service=agent-education" className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Book agent pilot <ArrowRight className="size-4" /></a>
            <Link href="/agents/automation-packages" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline">Compare with bundle</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
