import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroProfessional } from '@/components/illustrations/hero-professional';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Procurement Policy for SMEs — AI for Business Lesson 12 | LongCare Academy',
  description:
    'A seven-criteria AI procurement framework for AU SMEs. Privacy Act and Notifiable Data Breach implications, a 1-page procurement template, RFP checklist for AI vendors and approved-vendor-list governance pattern.',
  path: '/academy/ai-for-business/lessons/ai-procurement-policy',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI Procurement Policy for SMEs',
  educationalLevel: 'SME owners',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI for Business',
    url: 'https://longcare.au/academy/ai-for-business',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function AiProcurementPolicyLessonPage() {
  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lessonSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Academy', url: '/academy' },
            { name: 'AI for Business', url: '/academy/ai-for-business' },
            { name: 'AI Procurement Policy', url: '/academy/ai-for-business/lessons/ai-procurement-policy' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 12 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI procurement policy for SMEs
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              You do not need a 40-page procurement manual to buy AI safely. You need a
              one-page policy, seven criteria and a habit of pilot-before-purchase. Built for
              Australian SMEs subject to the Privacy Act and Notifiable Data Breach scheme.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Continue path — coming soon
              </a>
              <Link
                href="/academy/ai-for-business"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroProfessional className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The five-step AI procurement flow
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Brief &rarr; Shortlist &rarr; POC &rarr; Pilot &rarr; Approve. Each step gets its
            own go / no-go gate and a documented owner.
          </p>
        </div>
      </section>

      {/* Video placeholder */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div
          role="img"
          aria-label="Video lesson placeholder"
          className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl overflow-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 opacity-20">
            <DotsPattern />
          </div>
          <div className="relative flex flex-col items-center text-white">
            <div className="size-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mb-3">
              <Play className="size-8 ml-1" aria-hidden />
            </div>
            <span className="text-sm">Video coming Q3 2026 · 25 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why procurement matters for AI</h3>
          <p className="mt-2 text-slate-700">
            Buying AI software in 2026 is different to buying SaaS in 2019. Two reasons. First,
            many AI vendors are 18-month-old companies whose data practices, term sheets and
            commercial stability are unproven. Second, you are routinely handing customer data
            to a third party that processes it with a model trained on data nobody can audit
            cleanly. For SMEs above the A$3m Privacy Act threshold &mdash; and any SME handling
            health data, credit reporting or tax file numbers regardless of turnover &mdash; that
            adds real obligations under APP 6 (use), APP 8 (cross-border disclosure) and the
            Notifiable Data Breach scheme.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The seven procurement criteria</h3>
          <p className="mt-2 text-slate-700">
            Score every AI vendor 1-5 against these seven dimensions. A weighted total under 25
            is a no, 25-30 is conditional pilot only, 31-35 is buy.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Audit access</strong> &mdash; can you see logs of what was sent and how it was processed? Required for OAIC investigations and ASIC-regulated firms.</li>
            <li><strong>Data residency</strong> &mdash; where does your data physically live? AU residency is now table stakes for health, financial and government-adjacent data. OpenAI, Google and Anthropic now offer AU or APAC regions; ask, do not assume.</li>
            <li><strong>Exit</strong> &mdash; can you export everything in a standard format and stop paying within 30 days? Look for &ldquo;data export on request&rdquo; in the terms.</li>
            <li><strong>SLAs</strong> &mdash; what uptime and response time is contracted? &ldquo;Best effort&rdquo; is fine for prompts, not fine for production workflows.</li>
            <li><strong>Indemnity</strong> &mdash; if their model breaches IP or libels a customer, who pays? Major providers now offer copyright indemnity for paid plans; SMEs should require this for any external-facing output.</li>
            <li><strong>Pricing transparency</strong> &mdash; per-seat, per-call, per-token? Hidden meter creep is the most common AU SME complaint we hear. Demand a quarterly cap option.</li>
            <li><strong>Integration</strong> &mdash; does it fit Xero, MYOB, Outlook, Workspace, your CRM? An AI tool that does not integrate generates copy-paste work that wipes out the productivity gain.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy Act and Notifiable Data Breach</h3>
          <p className="mt-2 text-slate-700">
            Under APP 8, sending personal information to an overseas AI provider is a
            cross-border disclosure. You remain responsible for the receiving entity&rsquo;s
            handling. Either the vendor must offer AU residency, or you must get consent
            (recommended in privacy policy + click-through) or rely on a contractual binding
            scheme. Under the Notifiable Data Breach scheme, if your AI vendor leaks data, the
            obligation to notify the OAIC and affected individuals is yours, not theirs.
            Procurement&rsquo;s job is to make this discovery in the term sheet, not in
            production.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">A one-page procurement template</h3>
          <p className="mt-2 text-slate-700">
            Most AU SMEs do not need a long document. A one-page procurement template with the
            following sections is enough.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Purpose</strong> &mdash; the business problem in two sentences and the metric of success.</li>
            <li><strong>Vendor</strong> &mdash; name, country, year founded, security certifications (SOC2 Type II, ISO 27001).</li>
            <li><strong>Seven-criteria scorecard</strong> &mdash; the table above with score, weight and notes.</li>
            <li><strong>Privacy posture</strong> &mdash; what data flows, where it lives, AU consent text, retention period.</li>
            <li><strong>Commercial</strong> &mdash; pricing model, AUD annual cost, cap, termination notice, indemnity.</li>
            <li><strong>Approval</strong> &mdash; who approved, on what date, next review date (default 12 months).</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">RFP checklist for AI vendors</h3>
          <p className="mt-2 text-slate-700">
            If you are spending over A$10,000 a year, run a light RFP. Send three vendors the
            same ten questions and pick the strongest set of written answers.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li>Which model(s) do you use today and how often do you update them?</li>
            <li>Where is our data stored and processed? Can we elect AU/APAC region?</li>
            <li>Do you train on our data by default? How do we opt out?</li>
            <li>What is your incident response process? Notification window?</li>
            <li>Provide a SOC2 Type II or ISO 27001 report.</li>
            <li>What is the exit process and data export format?</li>
            <li>What SLA do you offer? Credits for breach?</li>
            <li>Do you provide copyright and IP indemnity?</li>
            <li>Provide three reference customers in our industry / region.</li>
            <li>Confirm pricing model, AUD billing, and offer a quarterly cap.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Approved Vendor List governance</h3>
          <p className="mt-2 text-slate-700">
            A small SME does not need a vendor management office to run an Approved Vendor List.
            One Notion page or one Google Sheet, three columns: vendor, what it&rsquo;s used
            for, review date. The single rule: nobody buys an AI tool outside the list without
            running the seven-criteria scorecard first. We have seen Australian firms cut
            shadow-AI sprawl in half with this one habit.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Vendor pilot scope</h3>
          <p className="mt-2 text-slate-700">
            A pilot is not a demo. Define three things up-front: which team uses it, for how
            long (we recommend 30 days), and what success looks like (a cycle-time delta, a
            cost saving, a satisfaction score). Document these on the procurement template at
            shortlist stage so you cannot move the goalposts mid-pilot. Default 30-day exit
            clause if success criteria are not met &mdash; standard wording most major vendors
            will agree to with a polite ask.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Seven criteria: audit access, data residency, exit, SLAs, indemnity, pricing transparency, integration.',
              'Under APP 8, you remain responsible when an overseas AI provider mishandles AU personal data.',
              'Under NDB scheme, the obligation to notify OAIC and customers of a breach by your vendor is yours.',
              'A one-page procurement template (purpose, vendor, scorecard, privacy, commercial, approval) is enough for most AU SMEs.',
              'Run a light 10-question RFP for any AI spend above A$10,000 per year.',
              'An Approved Vendor List on one Notion page cuts shadow-AI sprawl in half.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Try it yourself */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Try it yourself</h2>
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 30 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Score your top three AI vendors</p>
            <p className="mt-2">
              Open a Google Sheet and list the three AI tools your team uses most.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>For each, score 1-5 against the seven criteria. Use vendor documentation; ask their support for gaps.</li>
              <li>Total each vendor. Any vendor below 25 lands on the &ldquo;review&rdquo; pile.</li>
              <li>Write the one-page procurement template for each, retroactively.</li>
              <li>Build the Approved Vendor List in Notion. Add the three vendors with a 12-month review date.</li>
              <li>Send the team an email: from today, any new AI tool goes through the scorecard before purchase.</li>
            </ol>
            <p className="mt-3">Thirty minutes today saves you a Notifiable Data Breach notification later.</p>
          </div>
        </div>
      </section>

      {/* Quick check quiz */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Quick check</h2>

          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-slate-900">
                1. Which AU regulation governs cross-border disclosure of personal data to an overseas AI vendor?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Spam Act 2003</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Australian Privacy Principle 8 (under the Privacy Act 1988)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Fair Work Act 2009</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">APP 8 under the Privacy Act 1988. You remain responsible for the receiving entity&rsquo;s handling unless you have AU residency, consent, or a binding scheme.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why is &ldquo;exit&rdquo; one of the seven core criteria?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> So you can switch providers if pricing or quality degrades, without losing your data</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> So you can avoid paying invoices</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> So your team can quit and join the vendor</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">So you can switch providers cleanly. Vendor lock-in turns into price increases or quality drift; an exit clause keeps the leverage with you.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. For an AI spend above A$10,000/year, what is the recommended step?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Buy on a 12-month commitment immediately</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Run a light 10-question RFP against three vendors</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Skip procurement &mdash; AI is too fast moving</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Run a light 10-question RFP. It takes a week and saves multiples of itself in negotiation leverage and avoided mistakes.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* End-of-path note */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Path complete</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You have finished the AI for Business path
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Twelve lessons, four to five hours of focused learning. Advanced bootcamps,
              certificates and live AU cohorts land in Q4 2026.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Continue path — coming soon
          </a>
        </div>
      </section>

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/ai-for-business"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI for Business
          </Link>
          <Link
            href="/academy/lessons"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            Lesson library
          </Link>
        </div>
      </section>
    </main>
  );
}
