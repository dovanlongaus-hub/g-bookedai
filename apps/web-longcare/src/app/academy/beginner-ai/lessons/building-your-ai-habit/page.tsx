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
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Building Your AI Habit — From Trial to Daily Use | Beginner AI Lesson 7 | LongCare Academy',
  description:
    'Why most AI experiments fail at AU SMEs and how to fix it. A 5-day starter routine, atomic-habit framework, AI desktop setup, and a 30-day challenge to make AI part of every working day.',
  path: '/academy/beginner-ai/lessons/building-your-ai-habit',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Building Your AI Habit — From Trial to Daily Use',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'Beginner AI',
    url: 'https://longcare.au/academy/beginner-ai',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function BuildingYourAiHabitLessonPage() {
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
            { name: 'Beginner AI', url: '/academy/beginner-ai' },
            { name: 'Building Your AI Habit', url: '/academy/beginner-ai/lessons/building-your-ai-habit' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 7 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Building your AI habit — from trial to daily use
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Most Australian SMEs we coach have already tried ChatGPT once or twice. The question
              that decides whether AI pays off is whether they used it again on Tuesday — and the
              Tuesday after that.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
              </a>
              <Link
                href="/academy/beginner-ai"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The five beats of an AI habit loop
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Cue &rarr; Routine &rarr; Reward &rarr; Reflect &rarr; Identity. Skip any step and the
            habit will not stick past week two.
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
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why most AI experiments fail at SMEs</h3>
          <p className="mt-2 text-slate-700">
            We have run free AI clinics with more than 600 Australian small and medium business
            owners since 2024. Roughly nine in ten had already tried ChatGPT or Gemini. Roughly
            three in ten were still using AI at all six weeks later. The drop-off is not about
            quality — the tools work. It is almost always about <em>habit infrastructure</em>: AI
            never made it onto the calendar, never had a default workflow, and never replaced an
            existing routine. After a week of novelty the tab gets closed and a year goes by.
          </p>
          <p className="mt-2 text-slate-700">
            The fix is not motivation. The fix is a small, boring routine repeated every working
            day. Once the routine survives ten consecutive working days, the cost of <em>not</em>
            opening AI feels higher than the cost of opening it, and the habit holds itself
            together.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The 5-day starter routine</h3>
          <p className="mt-2 text-slate-700">
            Plan one AI moment in each of five fixed slots across the working day. The slots matter
            more than the prompts, because they ride existing rhythms.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Morning email triage (8:30am)</strong> — paste the subject lines of overnight emails, ask AI to group them by urgency and draft three replies.</li>
            <li><strong>Mid-morning research (10:30am)</strong> — one quick question that would have taken 20 minutes of Googling. Search AI is now your default first move.</li>
            <li><strong>Afternoon writing (2:00pm)</strong> — first draft of any document over 100 words goes through AI. Edit, do not type from scratch.</li>
            <li><strong>End-of-day summary (5:00pm)</strong> — paste your meeting notes and decisions from the day, ask AI to extract action items and next-step CTAs.</li>
            <li><strong>Weekly review (Friday 4:00pm)</strong> — feed your week’s wins, blockers and key numbers, ask AI to surface patterns and propose next week’s priorities.</li>
          </ol>
          <p className="mt-2 text-slate-700">
            Five touches a day, twenty per week, eighty per month. By the end of month one, opening
            AI will feel as automatic as opening Outlook.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Atomic Habits applied to AI</h3>
          <p className="mt-2 text-slate-700">
            James Clear’s four-law framework adapts cleanly to AI use. Make the cue obvious, the
            routine easy, the reward satisfying, and the identity attractive.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Cue</strong> — pin AI in the same place every day. We recommend a permanent browser tab and a global hotkey (Option/Alt+Space on the ChatGPT desktop app, or your OS launcher).</li>
            <li><strong>Routine</strong> — start with one prompt template. Same template, same time, every day for a week. Do not invent new prompts at first; muscle memory beats novelty.</li>
            <li><strong>Reward</strong> — log the time saved. A simple tally on a sticky note (“12 min saved on email today”) gives the brain its hit. Cumulative time saved across a month is genuinely surprising.</li>
            <li><strong>Reflect</strong> — every Friday spend two minutes reviewing what worked. Keep the prompts that worked, retire the ones that did not.</li>
            <li><strong>Identity</strong> — phrase it as “I am someone who works with AI” rather than “I am trying AI”. Identity beats willpower in the long run.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Build your “AI desktop”</h3>
          <p className="mt-2 text-slate-700">
            The single biggest lift in adoption is reducing the friction to open AI. We recommend
            this five-minute setup on whichever machine you do real work on.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Pinned tabs</strong> — pin ChatGPT, Gemini and Claude as the first three tabs on your work browser profile. Always-on, always-visible.</li>
            <li><strong>Desktop app</strong> — install the ChatGPT desktop app (Mac and Windows) and bind a global hotkey. Voice-press-and-hold is faster than typing for most prompts.</li>
            <li><strong>Mobile widget</strong> — add a Gemini or ChatGPT widget to your phone home screen so dictation is one tap away in the car or between meetings.</li>
            <li><strong>Default search</strong> — set Perplexity or ChatGPT search as the default in your browser address bar. Google becomes the fallback, not the first move.</li>
            <li><strong>Voice shortcut</strong> — on iPhone use the Action Button, on Pixel use Hold-Power, on desktop bind a hotkey. The closer voice is, the more you will use it.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The 30-day challenge framework</h3>
          <p className="mt-2 text-slate-700">
            Pick a visible, time-boxed commitment. Tell at least one person. Track on paper. Five
            rules:
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li>One AI touch per day, every working day, for thirty days.</li>
            <li>Skips allowed only on weekends or when ill.</li>
            <li>Log the touch in one sentence at end of day (what you did, what you got).</li>
            <li>Friday review, fifteen minutes, every week.</li>
            <li>End-of-month read-back: which routines stuck, which to drop, which to scale to teammates.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU context — patterns we see in real SMEs</h3>
          <p className="mt-2 text-slate-700">
            A Brisbane plumbing business owner began with one prompt — “summarise today’s job notes
            into customer-ready emails” — repeated every weekday at 4:30pm. Within a month she had
            wrapped that habit around four more prompts and cut Saturday admin from three hours to
            forty minutes. A Melbourne accounting practice attached AI to their existing
            end-of-week review meeting, asking Gemini to read the action minutes and surface
            commitments — partner attendance went up, not down. The pattern is consistent: attach
            AI to a routine that already exists, do not invent a new one.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'AI experiments fail at SMEs because of habit infrastructure, not tool quality. Plan five fixed slots a day, not a vague intention.',
              'Cue, routine, reward, reflect, identity — all five beats are needed to lock the habit past week two.',
              'A pinned tab, a global hotkey and a phone widget are the three highest-leverage friction reducers.',
              'Attach AI to a routine that already exists (Friday review, end-of-day notes) rather than inventing a new one.',
              'A thirty-day, one-touch-a-day public commitment beats ambitious plans almost every time.',
              'Log time saved on paper. Cumulative wins drive the identity shift from “trying AI” to “working with AI”.',
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
            <p className="font-semibold text-slate-900">Exercise: Set up your AI desktop and book your first habit slot</p>
            <p className="mt-2">
              Take fifteen minutes today to lock the cue and routine into your environment.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pin ChatGPT, Gemini and Claude as the first three tabs in your work browser.</li>
              <li>Install the ChatGPT desktop app and bind <code>Option+Space</code> (Mac) or <code>Alt+Space</code> (Windows) as the global launcher.</li>
              <li>Add a recurring 8:30am calendar event titled “AI email triage — 10 minutes” for the next ten weekdays.</li>
              <li>Tell one colleague you are doing the 30-day challenge. Send the message now.</li>
              <li>Open AI tomorrow at 8:30am. Paste your unread email subject lines. Ask: <em>“Group these by urgency, draft three replies in Australian English.”</em></li>
            </ol>
            <p className="mt-3">After five days, return to this lesson and tick off the habits that locked in. Drop the ones that did not.</p>
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
                1. What is the most common reason SME AI experiments fail at six weeks?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The tool quality is too low</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI never made it onto a routine</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The owner was not motivated enough</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">AI never made it onto a routine. Tools are good enough; habit infrastructure is the missing piece.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which of the five habit beats is the one most often skipped?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Cue</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Reflect</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Reward</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Reflect. Without a Friday review the loop never closes — and the routine drifts within three weeks.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the highest-leverage move when setting up your AI desktop?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Subscribing to the most expensive plan</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Reducing friction to open AI (pinned tab, global hotkey)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Buying a new laptop</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Reducing friction. The closer AI is to your fingertips, the more you will use it. Pinned tab plus global hotkey plus phone widget covers 80% of cases.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 8</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AI myths &amp; realities — cut through the hype
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The eight most common AI myths SMEs believe and the reality check for each — including
              an OAIC and ASIC perspective and a 2026 capability snapshot.
            </p>
          </div>
          <Link
            href="/academy/beginner-ai/lessons/ai-myths-and-realities"
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
            href="/academy/beginner-ai"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to Beginner AI
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
