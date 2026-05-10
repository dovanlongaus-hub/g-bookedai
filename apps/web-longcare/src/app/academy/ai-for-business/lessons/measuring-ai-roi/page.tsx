import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
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
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Measuring AI ROI — Beyond Hours Saved | AI for Business Lesson 8 | LongCare Academy',
  description:
    'A four-dimension AI ROI framework for AU SMEs — time savings, revenue uplift, cost avoidance, strategic capacity — with baseline-to-90-day measurement and a worked AUD example.',
  path: '/academy/ai-for-business/lessons/measuring-ai-roi',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Measuring AI ROI — Beyond Hours Saved',
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

export default function MeasuringAiRoiLessonPage() {
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
            { name: 'Measuring AI ROI', url: '/academy/ai-for-business/lessons/measuring-ai-roi' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 8 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Measuring AI ROI — beyond hours saved
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              “Hours saved” is the easiest number to defend and the hardest to brag about. Real
              AI ROI sits across four dimensions — and you need all four to make a credible case.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; finish path <ArrowRight className="size-4" />
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

      {/* Inline timeline */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The measurement timeline
          </h3>
          <div className="flex justify-center">
            <InfographicTimeline width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Baseline &rarr; 30 day &rarr; 90 day &rarr; annualised. Skip baseline and every later
            number is unprovable.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why “hours saved” is half the story</h3>
          <p className="mt-2 text-slate-700">
            Hours-saved is the most common AI ROI claim and the easiest to dismiss. A board
            director will hear “we saved 200 hours a quarter” and ask, reasonably, “did we let
            anyone go? Did we charge anyone more? Did we sell more deals?” If the answer is no, the
            saved hours are at risk of becoming Parkinson’s law — work expanding to fill the time.
            A defensible AI ROI case needs four dimensions, not one.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Dimension 1 — Time savings (hours × wage)</h3>
          <p className="mt-2 text-slate-700">
            The classical metric. Measure it like this:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Pick a discrete task (customer reply drafting, monthly report generation).</li>
            <li>Measure baseline time on five samples before AI.</li>
            <li>Measure post-AI time on five samples after.</li>
            <li>Multiply by occurrences per month and average loaded wage.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Worked example: customer replies cut from 8 minutes to 2 minutes. 400 replies/month.
            6 minutes saved × 400 = 2,400 minutes = 40 hours. At A$60/hour loaded, that is
            <strong> A$2,400/month</strong>. Multiply by 12 for annualised.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Dimension 2 — Revenue uplift</h3>
          <p className="mt-2 text-slate-700">
            More deals, faster sales, larger basket size. Harder to attribute, but where the real
            money lives. Sample metrics:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Quote turnaround time (5 days &rarr; 1 day) — measure win-rate change.</li>
            <li>Lead-to-meeting conversion (AI-personalised first reply).</li>
            <li>Average order value (AI cross-sell suggestions in checkout flows).</li>
            <li>Repeat-buy rate (AI-segmented post-purchase emails).</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Worked example: faster quotes shifted win-rate from 18% to 24% on a A$2,500 average
            deal across 80 quotes/month. That is 4.8 extra wins × A$2,500 =
            <strong> A$12,000/month additional revenue</strong>.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Dimension 3 — Cost avoidance</h3>
          <p className="mt-2 text-slate-700">
            Fewer mistakes, less overtime, fewer credits and refunds, lower customer acquisition
            cost. Often the largest single category in mature AI deployments and the hardest to
            see. Sample metrics:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Refund rate (AI-aided support resolution drops first-contact frustration).</li>
            <li>Overtime hours (AI handles peak load drafting).</li>
            <li>Compliance penalties avoided (AI policy checks).</li>
            <li>Bookkeeper hours rebated (AI categorisation feeds Xero).</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Worked example: bookkeeping outsourcing cut from 12 hours/month at A$95/hour to 4
            hours/month — <strong>A$760/month saved</strong>.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Dimension 4 — Strategic capacity</h3>
          <p className="mt-2 text-slate-700">
            People freed for higher-value work. The hardest dimension to quantify, the most
            important for the long term. Sample indicators:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Number of new initiatives shipped per quarter.</li>
            <li>Time spent in customer conversations (the leading indicator of next year’s revenue).</li>
            <li>Strategic projects completed vs planned.</li>
            <li>Owner hours on the business vs in the business.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Worked example: 40 owner hours/month freed by AI translates to one new product launch
            per quarter — quantify the launch separately.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Measurement framework: baseline &rarr; 30 &rarr; 90 &rarr; annualised</h3>
          <p className="mt-2 text-slate-700">
            Use the same template every time. The discipline matters more than the tool.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Baseline (week 0)</strong> — five measurements per metric before any AI use.</li>
            <li><strong>30-day check (week 4)</strong> — same five measurements; calculate delta. Most uplifts visible by now.</li>
            <li><strong>90-day check (week 12)</strong> — full quarter; account for seasonality. This is the number you bring to the board.</li>
            <li><strong>Annualised view</strong> — extrapolate cautiously. Account for one-time setup costs in year 1.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">“Lying with numbers” — common AI ROI overclaims</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Phantom baseline.</strong> “We save 30% on customer service.” Compared to what? Always show pre-AI numbers.</li>
            <li><strong>Counting the same hours twice.</strong> Hours saved cannot also be revenue uplift unless those hours were genuinely redirected to selling.</li>
            <li><strong>Annualising a one-week sample.</strong> Multiply weekly wins by 52 only after a 90-day stability check.</li>
            <li><strong>Ignoring AI subscription costs.</strong> Net out tool spend (A$50–A$500/month for SMEs) before claiming ROI.</li>
            <li><strong>Ignoring rework time.</strong> AI outputs sometimes need editing — measure post-edit time, not raw model output time.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Presenting AI ROI to a board</h3>
          <p className="mt-2 text-slate-700">
            One slide, four lines.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Time</strong> — hours saved × loaded wage = A$X / month.</li>
            <li><strong>Revenue</strong> — incremental deals × ASP = A$Y / month.</li>
            <li><strong>Cost avoidance</strong> — outsourced spend rebated, errors avoided = A$Z / month.</li>
            <li><strong>Capacity</strong> — three strategic outcomes shipped that would not have shipped otherwise.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Net it against AI spend (A$50–A$1,500/month for SMEs) and one-time setup. The honest
            net number is more impressive than the inflated one — and it survives questions.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Worked example — Customer Support AI for a retail SME</h3>
          <p className="mt-2 text-slate-700">
            A 22-staff Sydney homewares retailer added Intercom Fin AI agent and a Custom GPT for
            internal escalation drafting. Baseline: 3,200 customer messages/month, 12-minute
            average reply time, A$4,800 outsourced support spend.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Investment</strong> — A$1,800/month tooling + A$8,400 setup time.</li>
            <li><strong>Time</strong> — 3,200 × 6 minutes saved at A$50 loaded = <strong>A$16,000/month</strong>.</li>
            <li><strong>Revenue</strong> — faster resolution lifted re-buy rate by 1.4 points = <strong>A$6,200/month</strong>.</li>
            <li><strong>Cost avoidance</strong> — outsourced spend cut by A$3,200/month.</li>
            <li><strong>Capacity</strong> — owner reallocated 30 hours/month to wholesale channel — A$45,000 channel revenue in quarter two.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Net 90-day return: <strong>A$73,000 returned on A$13,800 invested</strong>. Strategic
            capacity counted separately.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Real AI ROI sits across four dimensions: time savings, revenue uplift, cost avoidance, strategic capacity. All four are needed for a credible case.',
              'Always measure baseline before AI. No baseline, no defensible delta.',
              'Use the timeline: baseline (week 0), 30-day check, 90-day check, annualised — not the other way around.',
              'Net AI subscription costs and rework time before claiming ROI. The honest number survives questions; the inflated one does not.',
              'For a board: one slide, four lines (time, revenue, cost avoidance, capacity), netted against AI spend.',
              'A typical AU SME case looks like A$5–A$25k returned on A$1–A$3k invested per month, after the 30-day stabilisation phase.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 20 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build your one-page AI ROI scorecard</p>
            <p className="mt-2">
              Open a Google Sheet (or Excel) and create the following columns: Metric, Baseline,
              30-day, 90-day, Monthly impact (A$), Notes.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pick the three AI use cases you have already started (customer replies, marketing content, bookkeeping, etc.).</li>
              <li>For each, fill the “Baseline” cell now — even a rough estimate is better than nothing.</li>
              <li>Add a row at the bottom for AI subscription cost and one-time setup hours.</li>
              <li>Diary 30-day, 60-day, 90-day reminders to revisit the sheet.</li>
              <li>Calculate net monthly impact at the 90-day mark. Bring that one number to your next leadership meeting.</li>
            </ol>
            <p className="mt-3">Bonus: ask AI itself — <em>“You are a CFO. Critique my AI ROI scorecard. What numbers am I overclaiming and what am I missing?”</em></p>
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
                1. Which dimension is the most commonly reported but the easiest to dismiss?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Time savings</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Revenue uplift</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Strategic capacity</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Time savings. On its own it is at risk of Parkinson’s law. You need at least one of revenue, cost avoidance or capacity alongside it.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the right order of measurement?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Annualised first, then 90 day, then baseline</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Baseline, then 30 day, then 90 day, then annualised</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> 30 day only — anything more is overkill</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Baseline, then 30, then 90, then annualised. Skip baseline and every later number is unprovable.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which is a common ROI overclaim?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Annualising a one-week sample</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Netting AI subscription costs</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Showing pre-AI baseline numbers</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Annualising a one-week sample. Wait for 90-day stability before extrapolating.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 9</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Privacy, IP, and AU compliance for SME AI use
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The next AI for Business lessons land with the full Academy in Q3 2026 — privacy,
              IP, AU compliance, and a capstone implementation plan.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Notify me <ArrowRight className="size-4" />
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
