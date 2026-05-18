import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Sparkles,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Finance & Admin AI Automation — AI for Business Lesson 4 | LongCare Academy',
  description:
    'Six high-ROI finance and admin automations for Australian SMEs: invoices, BAS, receipts, reconciliation, cash-flow forecast, supplier comms. ATO retention rules included.',
  path: '/academy/ai-for-business/lessons/finance-and-admin-automation',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Finance & Admin AI Automation — Xero, BAS, Bookkeeping',
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

export default function FinanceAndAdminAutomationLessonPage() {
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
            { name: 'Finance & Admin Automation', url: '/academy/ai-for-business/lessons/finance-and-admin-automation' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 4 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Finance &amp; admin AI automation &mdash; Xero, BAS, bookkeeping
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Six high-ROI automations every Australian SME should run by the end of this quarter,
              with AUD pricing and the ATO retention rules baked in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Coming soon
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
            <HeroGovernance className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            From receipt to BAS draft &mdash; the modern AU bookkeeping flow
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={760} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Receipt photo → AI extracts → Xero categorises → BAS draft compiled → human bookkeeper
            reviews and lodges. The paper trail is digital, immutable, and ATO-friendly.
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
              The transcript below is the full lesson; the video adds Xero, Hubdoc, and Lightyear
              walk-throughs.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why finance is the highest-ROI AI play for AU SMEs</h3>
          <p className="mt-2 text-slate-700">
            Finance and admin work has three properties that make it ideal for AI: high volume,
            structured data, and a clear right answer (or at least a tight tolerance). That is the
            opposite of marketing copy or strategic decisions, where AI augments judgement.
            For finance, AI can do the work and a human verifies the totals. Done well, a
            five-person practice can replace 15 hours/week of manual data entry with six AI-assisted
            workflows.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Automation 1 &mdash; invoice data extraction</h3>
          <p className="mt-2 text-slate-700">
            Tools: Xero&rsquo;s built-in Hubdoc (free with Xero), Lightyear (about A$50/month for SME
            tier), Dext (about A$40/month). Workflow: customers email PDF invoices to a dedicated
            inbox, AI extracts ABN, GST, line items, and pushes them to Xero with confidence scores.
            Anything below 0.85 confidence sits in a review queue. Saves 5&ndash;8 hours/week for a
            5-person services firm.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Automation 2 &mdash; BAS preparation drafts</h3>
          <p className="mt-2 text-slate-700">
            Tools: Xero AI (bundled), QuickBooks AI assistant, MYOB&rsquo;s new MYOB Acumatica AI.
            Workflow: at the end of each quarter the AI compiles G1 (total sales), 1A (GST on
            sales), 1B (GST on purchases), W1/W2 (PAYG), checks for unusual variances, and lists
            ledger entries needing classification. Your registered tax/BAS agent reviews and lodges.
            The lodgement is still the agent&rsquo;s legal responsibility &mdash; AI does not file
            BAS unattended.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Automation 3 &mdash; receipt categorisation</h3>
          <p className="mt-2 text-slate-700">
            Tools: Hubdoc, Receipt Bank (now Dext), Square&rsquo;s receipt capture. Workflow: snap a
            photo on the phone, AI extracts ABN, date, GST split, and suggests a category from your
            chart of accounts based on the supplier name. Bookkeeper approves the batch on Friday
            afternoon. ATO loves the digital trail &mdash; receipts must be retained for five years
            and these tools store originals plus structured data, satisfying both rules at once.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Automation 4 &mdash; bank reconciliation suggestions</h3>
          <p className="mt-2 text-slate-700">
            Tools: Xero&rsquo;s suggested matches, QuickBooks&rsquo; rules engine, Karbon for
            practice-wide reconciliation. Workflow: AI matches bank lines to invoices and contacts
            with high confidence; the human approves a batch in 5 minutes instead of 45. The
            reconciliation rules learn from your corrections, so accuracy improves quarter on
            quarter.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Automation 5 &mdash; cash-flow forecast</h3>
          <p className="mt-2 text-slate-700">
            Tools: Float (about A$80/month), Fathom (A$40/month for SME), Spotlight Reporting,
            Syft Analytics. Workflow: AI projects next 13 weeks of cash from invoices issued,
            payment patterns by customer, recurring expenses, and known one-offs. You see a
            traffic-light dashboard and a list of the three customers most likely to delay. Worth
            its weight in gold heading into a tight quarter.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Automation 6 &mdash; supplier communications</h3>
          <p className="mt-2 text-slate-700">
            Tools: ChatGPT or Gemini sitting beside your accounts inbox, plus Approve.it for
            approval workflows. Workflow: AI drafts polite follow-ups for overdue payables, polite
            chase emails for receivables, and supplier onboarding requests. Always reviewed before
            sending &mdash; tone matters with people you owe money to.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AUD pricing context</h3>
          <p className="mt-2 text-slate-700">
            All-in for a 5-person AU services firm: Xero Standard A$80, Hubdoc bundled, Dext
            A$40, Float A$80, plus ChatGPT Plus A$30 = roughly A$230/month. That replaces 12&ndash;
            15 hours of manual bookkeeping weekly, or about A$20,000/year of contracted hours. ROI
            is unambiguous within the first quarter.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">ATO retention &mdash; five years digital is fine</h3>
          <p className="mt-2 text-slate-700">
            ATO requires records to be kept for five years from the date of last lodgement (or
            longer for capital gains). Digital records are accepted, provided they are unalterable
            after creation, restorable, and accessible to ATO if requested. All the tools above
            satisfy these requirements out-of-the-box. Just check your vendor&rsquo;s contract for
            data residency &mdash; AU or NZ residency simplifies the compliance story.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">90-day implementation plan</h3>
          <p className="mt-2 text-slate-700">
            Days 1&ndash;30: pick Xero or your existing accounting platform, switch on receipt
            capture and bank reconciliation suggestions. Days 31&ndash;60: add invoice extraction
            and a forecasting tool. Days 61&ndash;90: layer supplier communications and a
            quarterly BAS drafting routine with your tax agent. By day 90 you should be banking
            8&ndash;10 hours/week.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Finance and admin are AI’s sweet spot: high volume, structured data, clear right answer.',
              'Six automations cover invoices, BAS drafts, receipts, reconciliation, cash flow, and supplier comms.',
              'BAS drafts are AI; lodgement remains your registered tax/BAS agent’s legal responsibility.',
              'ATO requires 5-year retention; digital records are fine if unalterable, restorable, accessible.',
              'A$230/month all-in is the typical AU 5-person services firm stack — pays back in the first quarter.',
              'Roll out in 30-day chunks; trying to deploy everything at once breaks workflows.',
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
          <p className="text-sm text-slate-600 mb-4">
            One short hands-on exercise. Total time: 10 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: capture today&rsquo;s receipts</p>
            <p className="mt-2">
              Empty your wallet or scan today&rsquo;s expense emails. Use Xero&rsquo;s mobile app or
              Hubdoc to capture five receipts. Watch the AI extract ABN, GST, supplier, and
              category. Approve the ones it gets right; correct the ones it doesn&rsquo;t.
            </p>
            <p className="mt-3 italic">
              Notice how much faster it is the second day &mdash; the system learns your common
              suppliers in under a week. That speed-up is the whole game.
            </p>
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
                1. Who is legally responsible for BAS lodgement?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The AI tool</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Your registered tax or BAS agent</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The bank</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Your registered tax or BAS agent. AI drafts; the human files.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. How long must AU SMEs retain financial records?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> 1 year</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> 5 years from last lodgement (longer for CGT)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> 30 days</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">5 years from last lodgement, longer for capital gains records.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why is finance such a strong AI use case?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Numbers excite the model</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> High volume, structured data, clear right answer</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> ATO discounts AI users</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">High volume, structured data, clear right answer. AI thrives where the &ldquo;correct&rdquo; output is well-defined.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 5</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Customer service: chatbots and ticket triage
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              How to scale safe deflection beyond drafts &mdash; the next stage after this playbook.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Coming soon
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
            All free lessons
          </Link>
        </div>
      </section>
    </main>
  );
}
