import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Zap,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Keeping Up with AI Changes — AI Productivity Lesson 10 | LongCare Academy',
  description:
    'The anti-burnout AI keep-up routine — 3-newsletter diet, 15-minute test-not-read rule, four weekly check-ins, AU news sources, FOMO antidote and the 90-day stack review cadence.',
  path: '/academy/ai-productivity/lessons/keeping-up-with-ai-changes',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Keeping Up with AI — Without Burnout',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI Productivity',
    url: 'https://longcare.au/academy/ai-productivity',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function KeepingUpWithAILessonPage() {
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
            { name: 'AI Productivity', url: '/academy/ai-productivity' },
            { name: 'Keeping Up with AI Changes', url: '/academy/ai-productivity/lessons/keeping-up-with-ai-changes' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 10 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Keeping up with AI — without burnout
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A new model every month, a new tool every week. The 20-minute routine that keeps you
              current without consuming your weekends or your wallet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Mark complete &mdash; coming soon
              </a>
              <Link
                href="/academy/ai-productivity"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroToolkit className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline timeline */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Weekly &rarr; Monthly &rarr; Quarterly cadence
          </h3>
          <div className="flex justify-center">
            <InfographicTimeline width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Three nested loops. Twenty minutes a week. Two hours a quarter. That is the entire
            commitment.
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
            <span className="text-sm">Video coming Q3 2026 · 20 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Walks through the keep-up routine with real AU subscriptions and a sample week.
              Transcript covers everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AI moves fast — and the noise moves faster</h3>
          <p className="mt-2 text-slate-700">
            A new flagship model lands roughly every six weeks. A new wrapper tool launches on
            Product Hunt every day. Twitter, LinkedIn, YouTube, podcasts, newsletters, Slack
            groups, Discord servers — all telling you the latest thing is the most important thing.
            The honest answer for an AU SME professional is: you cannot keep up with all of it, and
            trying will make you worse at your job, not better. The fix is a deliberately small
            information diet plus deliberate hands-on practice. Twenty minutes a week, in a
            specific shape.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The &quot;newsletter diet&quot;: 3, not 30</h3>
          <p className="mt-2 text-slate-700">
            Pick three newsletters maximum. Cancel everything else. A good 2026 baseline trio:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Ben&apos;s Bites</strong> — daily, 5-minute read, AU-friendly tone, covers the practical AI news that affects working professionals.</li>
            <li><strong>The Neuron</strong> — daily, focused on what an actual business user should care about, free.</li>
            <li><strong>One AU-focused source</strong> — Smart Company AI, CMD (the Tech Council newsletter), or one weekly newsletter from an AU AI consultancy you trust.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            That is it. Three. Read each one in 3-5 minutes over coffee. Skim, don&apos;t study.
            Anything that matters at the macro level will appear in all three within a fortnight.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">&quot;Test, don&apos;t read&quot;</h3>
          <p className="mt-2 text-slate-700">
            Reading about a tool is a slow, low-retention way to learn it. The single highest-ROI
            switch you can make is: when a new tool catches your eye, give it 15 minutes of
            hands-on instead of an hour of reading. Sign up free, paste in a real task you actually
            need to do, see if the output is meaningfully different from what you already use, then
            decide. Most tools fail this test in 5 minutes — that is the point. You filter ten
            times more effectively by doing than by reading.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Four weekly check-ins (20 minutes total)</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>One model update</strong> (5 min). Skim the release notes of any major model that updated this week. GPT-5.1, Gemini 3, Claude Sonnet 4.7 — read the &quot;what changed&quot; section, ignore benchmarks.</li>
            <li><strong>One tool try</strong> (10 min). Open the most interesting new tool from your newsletters. Paste a real task. Decide in 10 minutes: do I add to stack, do I revisit in 6 months, or do I forget.</li>
            <li><strong>One prompt template</strong> (3 min). Save one useful prompt you wrote or saw this week to your prompt library. Tag it. Use it next week.</li>
            <li><strong>One conversation</strong> (2 min). Reply to one post in your AU AI LinkedIn group or AU Slack with a real observation from your own week. Building network is part of keeping up.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU-specific AI news sources</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>CMD by Tech Council of Australia</strong> — fortnightly, policy and industry stance, free.</li>
            <li><strong>Smart Company AI section</strong> — AU SME perspective, daily articles, free.</li>
            <li><strong>LinkedIn AU AI groups</strong> — &quot;Australian Generative AI&quot;, &quot;AU AI for Business&quot;, &quot;Sydney AI Builders&quot;. Better signal than X/Twitter for AU context.</li>
            <li><strong>Local meetups</strong> — Sydney AI, Melbourne AI, Brisbane AI groups on Meetup; one per quarter beats fifty newsletters.</li>
            <li><strong>OAIC and ASIC announcements</strong> — sign up to email alerts for any AI-related guidance updates. Free, infrequent, high-signal.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The &quot;FOMO antidote&quot;</h3>
          <p className="mt-2 text-slate-700">
            You will not have every new tool. That is fine. The professionals visibly using AI well
            in 2026 use <strong>fewer</strong> tools, not more — three or four, mastered deeply.
            Novelty is not advantage; mastery is. When you feel the pull to try the latest thing,
            ask: would the most skilled user of my existing stack already solve this faster than
            the new tool? If yes, the answer is to go deeper on what you have. If no, the new tool
            has earned its 15-minute trial. Either way, you have not been seduced.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">90-day stack review cadence</h3>
          <p className="mt-2 text-slate-700">
            Every quarter, block a single 2-hour session. List every AI subscription you pay for.
            For each, write one line: what did I use it for in the last 90 days, how often, how
            much value did it deliver. Cancel anything that scored low. Upgrade anything you used
            heavily but on a free tier. Try anything you have been meaning to try but haven&apos;t.
            Document the new stack. This review compounds — by the end of year one, your stack
            looks nothing like it did at the start, and every subscription on it is earning its
            keep. That is the goal: a tight, current, valuable stack that took only eight hours of
            review across the entire year.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'You cannot keep up with everything — and trying will make you worse at your job. Pick a small information diet.',
              'Three newsletters, not thirty. Cancel the rest. Anything important will appear in all three within a fortnight.',
              '15 minutes of hands-on beats 60 minutes of reading. Try the tool, decide in 10 minutes.',
              'Four weekly check-ins, 20 minutes total: one model update, one tool try, one prompt template, one conversation.',
              'AU sources: CMD, Smart Company AI, LinkedIn AU AI groups, OAIC/ASIC alerts, local meetups.',
              'FOMO antidote: mastery beats novelty. Ask if your existing stack would already solve it before chasing the new tool.',
              '90-day stack review (2 hours per quarter) keeps your subscriptions current and your spend justified.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 15 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: install the routine in one sitting</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Open your email inbox. Unsubscribe from every AI newsletter you do not actually read.</li>
              <li>Subscribe to three (Ben&apos;s Bites + The Neuron + one AU source).</li>
              <li>Block 20 minutes recurring in your calendar — same day and time every week — labelled &quot;AI keep-up&quot;.</li>
              <li>Block 2 hours recurring once a quarter — labelled &quot;AI stack review&quot;.</li>
              <li>Open a notes file called &quot;AI stack&quot; and list every AI subscription you pay for with a one-line value note. This is the baseline for your first quarterly review.</li>
            </ol>
            <p className="mt-3">
              You are now done. Show up at the calendar block each week and do the four check-ins.
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
                1. How many newsletters does the diet recommend?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Zero — just LinkedIn</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Three</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Thirty</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Three. Anything truly important will appear in all three within two weeks.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the &quot;test, don&apos;t read&quot; rule?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Read every review before signing up</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Spend 15 minutes hands-on with a tool, not an hour reading about it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Never try new tools</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">15 minutes hands-on. You filter ten times more effectively by doing than by reading.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. How often should you run a full stack review?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Weekly</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Every 90 days, in a single 2-hour session</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Annually</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Every 90 days. Two hours per quarter keeps your stack current and your spend justified.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview (last lesson — coming soon) */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Continue path</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You finished AI Productivity &mdash; advanced bootcamps coming Q4 2026
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Capstone projects, certificates and a live AU cohort land later this year. Jump into
              Prompt Engineering or AI Automation next.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Continue path &mdash; coming soon
          </a>
        </div>
      </section>

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/ai-productivity"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Productivity
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
