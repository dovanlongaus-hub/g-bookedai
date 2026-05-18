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
import { HeroSolutions } from '@/components/illustrations/hero-solutions';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Team AI Rollout & Change Management — AI for Business Lesson 9 | LongCare Academy',
  description:
    'Why 70 percent of SME AI rollouts fail and the 30/60/90-day playbook that fixes it — AI champions, comms template, resistance patterns, adoption metrics, and AU compliance briefings.',
  path: '/academy/ai-for-business/lessons/team-rollout-and-change-management',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Team AI Rollout — Change Management That Sticks',
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

export default function TeamRolloutLessonPage() {
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
            { name: 'Team Rollout & Change Management', url: '/academy/ai-for-business/lessons/team-rollout-and-change-management' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 9 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Team AI rollout — change management that sticks
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Seventy per cent of SME AI rollouts fizzle. The fix is not better tools — it is a
              30/60/90-day plan, AI champions, weekly office hours and a celebration habit.
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
                href="/academy/ai-for-business"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroSolutions className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Announce &rarr; Train &rarr; Champion &rarr; Office hours &rarr; Celebrate
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep
              width={760}
              height={180}
              steps={['Announce', 'Train', 'Champion', 'Office hours', 'Celebrate']}
            />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Five steps. Repeat the cycle every quarter. The point is not the tool — it is the
            habit.
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
              Full rollout playbook walk-through. Transcript below has every template and metric.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why 70% of AI rollouts fail at SMEs</h3>
          <p className="mt-2 text-slate-700">
            The MIT 2024 AI study and a 2025 Tech Council of Australia survey converge on the same
            number: roughly two in three AI initiatives at SMEs deliver no measurable value within
            12 months. The reasons are remarkably consistent and have almost nothing to do with the
            technology. <strong>One:</strong> no AI champions — no one on staff actually owns it.
            <strong> Two:</strong> no measurement — nobody tracks who is using it and what they got
            out of it. <strong>Three:</strong> no permission — staff are told to use it but not
            given time, not given examples, and not given air cover when they make mistakes
            learning it. <strong>Four:</strong> wrong starting use case — picking something
            difficult that wows leadership instead of something boring that frees up Tuesday
            afternoon. Solve those four and your odds flip.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The &quot;AI Champion&quot; role — 1 per 8 staff</h3>
          <p className="mt-2 text-slate-700">
            An AI Champion is the person on your team who tries new things first, helps colleagues
            unstuck, and surfaces what is working in the weekly stand-up. They are not your most
            technical staff member — they are usually the most curious one. The ratio that works
            for AU SMEs is <strong>one champion per eight people</strong>. A 24-person business
            needs three. Give them an extra two hours a week (recognised, on the timesheet), a
            small budget for premium AI tools (about $500/year), and a monthly meeting between
            champions to swap prompts. Champions burn out without recognition — make the role
            visible, rotate it annually, and celebrate it publicly.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The 30/60/90-day rollout plan</h3>
          <p className="mt-2 text-slate-700">
            <strong>Days 1-30 — Foundations.</strong> Announce the initiative (see comms template
            below). Provision business-tier accounts for every staff member. Run a one-hour
            onboarding workshop per team. Publish a one-page acceptable use policy. Open a weekly
            30-minute &quot;AI office hours&quot; (open Zoom, champions on rotation). Identify
            three boring high-frequency tasks per team and write starter prompts together.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Days 31-60 — Habit.</strong> Each team picks one workflow to actually move to
            AI-first. Champions share win-of-the-week in the all-hands. Track active users weekly
            (target: 70%+ logged in within last 7 days). Run a second one-hour workshop focused on
            common mistakes the team made in the first month.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Days 61-90 — Measurement and scale.</strong> Survey staff: hours saved per
            week, confidence level, biggest unmet need. Publish results to the whole team. Pick the
            top three unmet needs as the next quarter&apos;s focus. Celebrate publicly — names of
            top users, biggest time-savings, funniest mistake. Rotate the champion role for one of
            the three.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Communications template</h3>
          <p className="mt-2 text-slate-700">
            A four-message sequence that beats any glossy launch deck.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Announcement (Day 1, all-hands email).</strong> &quot;We&apos;re rolling out [tool] to every staff member. Goal: free up one hour per person per week within 90 days. Champion list attached. Workshop dates below. Use is encouraged, not mandatory.&quot;</li>
            <li><strong>Training (Day 7, workshop invite).</strong> &quot;One-hour hands-on. Bring your laptop and one task you do every week you wish you didn&apos;t. We will turn it into a prompt together.&quot;</li>
            <li><strong>Office hours (weekly, recurring).</strong> &quot;Friday 11am, drop-in Zoom. Bring questions, weird outputs, or your latest favourite prompt. No agenda.&quot;</li>
            <li><strong>Celebration (Day 90, all-hands).</strong> &quot;Here&apos;s what we shipped. Here&apos;s who used it most. Here&apos;s the biggest win. Here&apos;s what&apos;s next.&quot;</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Resistance patterns and responses</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>&quot;AI will replace me.&quot;</strong> Honest response: AI replaces tasks, not people. Show them three boring tasks AI handles and ask which one they&apos;d gladly hand over. The fear evaporates the moment the relief begins.</li>
            <li><strong>&quot;I don&apos;t have time to learn.&quot;</strong> Real answer: protected time. Block 30 minutes in their calendar twice a week for the first fortnight, with a champion sitting next to them on the first one.</li>
            <li><strong>&quot;It got it wrong last time.&quot;</strong> Validate, then reframe. AI is wrong sometimes. So is Google. So are colleagues. Show them how to verify and how to ask follow-up questions. Calibration beats trust or distrust.</li>
            <li><strong>&quot;I tried it once and it was rubbish.&quot;</strong> Bad first prompt. Sit with them for ten minutes and rebuild the prompt together using the lesson 1 framework. First-good-experience changes everything.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tracking adoption metrics</h3>
          <p className="mt-2 text-slate-700">
            Four metrics, reviewed weekly by champions and monthly by leadership.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Weekly active users</strong> — % of staff who used AI in the last 7 days. Target: 70%+ by day 60, 85%+ by day 90.</li>
            <li><strong>Hours saved per user per week</strong> — self-reported in the monthly survey. Target: 2 hours/week by day 90, 5 hours/week by day 180.</li>
            <li><strong>Errors caught</strong> — count of mistakes AI made that a human spotted. Going up is good — it means people are reviewing, not blindly copy-pasting.</li>
            <li><strong>Workflows shipped</strong> — count of repeatable AI-augmented processes the team actually adopted. Target: 3 by day 90.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance training requirement</h3>
          <p className="mt-2 text-slate-700">
            Every staff briefing must include a 10-minute compliance segment covering the
            Australian Privacy Act 1988 (especially APP 6 use limitation, APP 8 cross-border, APP
            11 security), the OAIC 2024 generative AI guidance, and your own acceptable use policy.
            Record attendance. This is the audit trail the OAIC will ask for if you ever have a
            notifiable data breach involving AI tools. Make it a 10-minute habit, not a one-off
            module — re-run it at every quarterly cycle.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              '70% of AI rollouts fail for four reasons: no champions, no measurement, no permission, wrong starting use case.',
              'AI Champions are 1 per 8 staff — the most curious, not the most technical. Recognise, fund, rotate annually.',
              'The 30/60/90 plan: foundations, habit, measurement and scale. Each phase has its own metrics.',
              'Four metrics matter: weekly active users, hours saved, errors caught, workflows shipped.',
              'Resistance is predictable — fear of replacement, no time, bad first experience. Each has a script.',
              'Build a 10-minute AU Privacy Act compliance segment into every quarterly cycle — record attendance.',
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
            <p className="font-semibold text-slate-900">Exercise: draft your 30/60/90</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Count your headcount. Divide by 8. Name the AI Champions on paper.</li>
              <li>Write the Day-1 announcement email using the template in the transcript — three sentences, no jargon.</li>
              <li>Pick three boring high-frequency tasks per team that are this quarter&apos;s focus.</li>
              <li>Block 30 minutes in your calendar every Friday for the next 12 weeks as &quot;AI office hours&quot;.</li>
              <li>Send the announcement.</li>
            </ol>
            <p className="mt-3">The act of sending the email is the rollout. Everything before is planning theatre.</p>
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
                1. What is the working ratio for AI Champions in an AU SME?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 1 champion per 3 staff</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 1 champion per 8 staff</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> 1 champion per 25 staff</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">1 per 8. Enough to give every team direct access, not so many that the role loses status.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which adoption metric should be going UP if AI is being used well?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Errors caught by humans</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Number of AI vendors</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Cost per workflow</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Errors caught. Going up means people are reviewing outputs, not blindly trusting them.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the right response to &quot;AI will replace me&quot;?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Promise it will not</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Show three boring tasks AI handles, ask which they would hand over</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Ignore the concern</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Hand-off framing. AI replaces tasks not people — make that concrete with three relief examples.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 10</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AI vendor selection — cut through the hype
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Seven criteria, red and green flags, a sample comparison, the procurement checklist
              and a build-vs-buy decision tree.
            </p>
          </div>
          <Link
            href="/academy/ai-for-business/lessons/ai-vendor-selection"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue path <ArrowRight className="size-4" />
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
