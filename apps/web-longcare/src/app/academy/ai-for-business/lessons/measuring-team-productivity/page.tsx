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
  title: 'Measuring Team Productivity with AI — AI for Business Lesson 11 | LongCare Academy',
  description:
    'Five productivity metrics that matter and five that mislead. Baseline to 30/60/90 day tracking, AU Privacy Act compliance for monitoring vs measuring, productivity AI tool comparison and the culture risks of surveillance.',
  path: '/academy/ai-for-business/lessons/measuring-team-productivity',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Measuring Team Productivity with AI',
  educationalLevel: 'SME owners',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function MeasuringTeamProductivityLessonPage() {
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
            { name: 'Measuring Team Productivity', url: '/academy/ai-for-business/lessons/measuring-team-productivity' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 11 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Measuring team productivity with AI
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              You cannot improve what you do not measure, but the wrong metrics will damage
              culture faster than they raise output. Here are the five numbers that matter, the
              five that mislead, and the AU privacy line between measuring and surveillance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/ai-for-business/lessons/ai-procurement-policy"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson <ArrowRight className="size-4" />
              </Link>
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
            Baseline to 90-day measurement rhythm
          </h3>
          <div className="flex justify-center">
            <InfographicTimeline width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Week 0 baseline &rarr; Day 30 check &rarr; Day 60 adjust &rarr; Day 90 read-out.
            Skipping the baseline is the most common mistake we see in AU SME rollouts.
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
            <span className="text-sm">Video coming Q3 2026 · 30 min</span>
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why most productivity dashboards backfire</h3>
          <p className="mt-2 text-slate-700">
            In our work with more than 200 Australian SME teams, the single biggest predictor of
            a failed AI rollout is not the choice of tool. It is a poorly chosen metric that
            quietly tells the team &ldquo;we do not trust you&rdquo;. Measure keystrokes and
            people pad keystrokes. Measure tickets closed and quality drops. The job of an SME
            owner is to pick three or four metrics that genuinely correlate with customer value
            and revenue, and to ignore the rest.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five metrics that matter</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Cycle time</strong> &mdash; time from job started to job delivered. The single best proxy for &ldquo;is AI helping&rdquo;. A Brisbane accounting practice we coached cut BAS prep cycle time from 4.5 hours to 1.2 hours over a quarter.</li>
            <li><strong>Deflection rate</strong> &mdash; for customer support, the share of tickets resolved without a human. A hospitality client moved from 0% to 38% deflection on tier-1 questions in six weeks.</li>
            <li><strong>Output volume per FTE</strong> &mdash; proposals issued, articles published, leads qualified. Compare to baseline. Watch quality alongside.</li>
            <li><strong>Quality holds</strong> &mdash; the rate at which AI output is rejected or heavily edited before going out. Rising rate = drift or scope creep. Falling rate = the team is learning.</li>
            <li><strong>NPS (or CSAT) trend</strong> &mdash; the customer-side answer. A rising volume with falling NPS is a red flag.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five metrics that look good but mislead</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Hours worked</strong> &mdash; rewards the wrong thing. The best AI users do less work, not more.</li>
            <li><strong>Keystrokes / mouse moves</strong> &mdash; pure surveillance theatre. Banned in many AU workplaces by enterprise agreement; corrosive in all.</li>
            <li><strong>AI usage counts</strong> &mdash; &ldquo;prompts per day&rdquo; tells you nothing about value created. Easy to game.</li>
            <li><strong>Vanity speed</strong> &mdash; &ldquo;first response time&rdquo; on emails that say &ldquo;noted, will reply later&rdquo; is a fake win.</li>
            <li><strong>Cost saved without value tracked</strong> &mdash; counting hours saved without checking the saved hours produced anything.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Baseline, then 30 / 60 / 90</h3>
          <p className="mt-2 text-slate-700">
            Spend two weeks before rolling out any AI tool recording baseline numbers on your
            top three metrics. We typically use a single Google Sheet with one row per job and
            three columns: start time, finish time, output rating. After AI lands, repeat the
            same measurement at days 30, 60 and 90. The Day 30 check is for learning; do not
            judge the rollout. Day 60 is adjust; rework the prompts that are not landing. Day
            90 is the genuine read-out: are the metrics genuinely better than baseline,
            controlling for seasonality and team changes?
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Australian privacy: measuring vs monitoring</h3>
          <p className="mt-2 text-slate-700">
            Under the Privacy Act 1988 and the Australian Privacy Principles, employee data is
            largely exempt for SMEs under A$3m turnover, but Fair Work general protections,
            state-based workplace surveillance laws (NSW Workplace Surveillance Act, ACT
            Workplace Privacy Act, VIC Surveillance Devices Act) and modern enterprise
            agreements set a high bar. The OAIC&rsquo;s guidance is unambiguous: covert
            workplace monitoring is unlawful. The line we recommend: <em>measure outcomes, not
            keystrokes</em>. If a metric requires you to spy on individuals to collect it,
            stop. If a metric is collected at team-aggregate level and tied to a stated business
            goal, you are on safe ground.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Productivity AI tools in 2026</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Otter</strong> (US$16.99/mo, ~A$26) &mdash; meeting transcription with action item extraction. Great for measuring meeting hygiene over time.</li>
            <li><strong>Granola</strong> (US$25/mo, ~A$38) &mdash; AI notes that capture decisions, not transcripts. Best for measuring decisions made per meeting.</li>
            <li><strong>Fellow</strong> (US$11/mo, ~A$17) &mdash; meeting agendas with AI summaries and follow-through tracking. Strong for cycle-time visibility.</li>
            <li><strong>Reclaim</strong> (US$10/mo, ~A$15) &mdash; AI calendar that surfaces &ldquo;deep work&rdquo; ratio per person at team-aggregate level.</li>
            <li><strong>Linear / Asana / Monday</strong> &mdash; existing PM tools whose AI summaries give cycle-time and throughput out of the box without extra spend.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Culture risks — perceived surveillance</h3>
          <p className="mt-2 text-slate-700">
            Even when a measurement is legal and well-intentioned, the perception of being
            watched can corrode trust. Three habits keep culture intact: tell the team exactly
            which metrics you are tracking and why; publish the dashboard so it is mutual; and
            never use AI productivity data as the sole basis for a performance decision. Fair
            Work&rsquo;s general protections make &ldquo;adverse action&rdquo; based on
            algorithmic signals risky territory.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Reporting cadence</h3>
          <p className="mt-2 text-slate-700">
            Weekly: a 10-minute team huddle on cycle time and quality holds. Monthly: a
            half-hour leadership review on the five metrics plus NPS. Quarterly: a deeper
            read-out that includes cost saved, value created, and team sentiment. Keep it
            visible, keep it boring, keep it consistent. The teams that hit the 90-day mark on
            cadence almost always show measurable gains; the teams that do not, rarely do.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'The five metrics that matter: cycle time, deflection rate, output per FTE, quality holds, NPS trend.',
              'Hours, keystrokes, prompt counts and vanity speed look like productivity. They are not.',
              'Set a 2-week baseline before any AI rollout. Day 30 = learn, Day 60 = adjust, Day 90 = judge.',
              'AU law: measure outcomes, not keystrokes. Covert monitoring is unlawful; aggregate measurement is fine.',
              'Three culture habits: explain the metric, publish the dashboard, never decide on algorithm alone.',
              'Cadence beats sophistication. A boring weekly huddle outperforms a flashy quarterly review.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 25 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Pick three metrics and book the baseline window</p>
            <p className="mt-2">
              Open a Google Sheet and lay out your measurement plan.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Choose three metrics from the five-that-matter list. Resist adding a fourth.</li>
              <li>For each, write the question it answers (&ldquo;Are we delivering faster?&rdquo;), the unit, and the data source.</li>
              <li>Book a two-week baseline window in the calendar. Tell the team what you are doing and why.</li>
              <li>Run the baseline. Record every job in the sheet. Resist tweaking anything during the window.</li>
              <li>Day 30 review: are the metrics moving? If so, are quality holds and NPS stable? If yes, scale.</li>
            </ol>
            <p className="mt-3">Three metrics, two-week baseline, four checkpoints. That is the entire system.</p>
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
                1. Why is &ldquo;prompts per day&rdquo; a misleading productivity metric?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> It is impossible to measure</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> It rewards activity, not value, and is easy to game</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Prompts are not real work</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">It rewards activity, not value. The best AI users send fewer, sharper prompts and produce more output.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Under AU workplace surveillance laws, what is the safest measurement posture?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Measure individual keystrokes for transparency</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Measure team-aggregate outcomes tied to a stated business goal</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Covert monitoring of email inboxes</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Team-aggregate outcomes tied to a stated goal. Individual keystroke monitoring is corrosive and often restricted; covert monitoring is unlawful.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the Day 30 check designed to do?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Judge whether the rollout has worked</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Learn — gather signal, not yet decide</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Cancel the rollout if metrics are not improving</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Learn. Day 30 is too early to judge. Day 60 is adjust, Day 90 is the genuine read-out.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 12</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AI procurement policy for SMEs
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              A seven-criteria framework, Privacy Act and Notifiable Data Breach implications,
              sample procurement doc, RFP checklist and approved vendor list governance pattern.
            </p>
          </div>
          <Link
            href="/academy/ai-for-business/lessons/ai-procurement-policy"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </Link>
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
