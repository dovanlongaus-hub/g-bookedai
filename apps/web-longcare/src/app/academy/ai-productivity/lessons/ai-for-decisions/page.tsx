import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
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
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Decisions — AI Productivity Lesson 9 | LongCare Academy',
  description:
    'AI as a thinking partner — four decision types, five prompts that improve judgement, when to STOP using AI, decision journaling and AU regulatory boundaries for medical/financial/legal calls.',
  path: '/academy/ai-productivity/lessons/ai-for-decisions',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for Decisions — Help, Don\'t Replace, Your Judgement',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
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

export default function AIForDecisionsLessonPage() {
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
            { name: 'AI for Decisions', url: '/academy/ai-productivity/lessons/ai-for-decisions' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 9 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for decisions — help, don&apos;t replace, your judgement
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Use AI as a thinking partner — five prompts that sharpen judgement, the four
              decision types, when to stop, and where AU regulation draws the line.
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

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Frame &rarr; Brainstorm &rarr; Stakeholders &rarr; 2nd-order &rarr; Decide
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep
              width={760}
              height={180}
              steps={['Frame', 'Brainstorm', 'Stakeholders', '2nd-order', 'Decide']}
            />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            AI helps with the first four steps. You always own the fifth.
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
              Walk-through of the five prompts using real AU SME decisions. Transcript covers
              everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">&quot;AI as a thinking partner&quot;</h3>
          <p className="mt-2 text-slate-700">
            The most under-used capability of modern AI is not writing things faster — it is
            thinking things through better. A model with a 200,000-token context window can hold
            every consideration of a hard call in one place and reflect it back at you from angles
            you wouldn&apos;t have surfaced alone. The skill is treating it like a smart, untiring
            colleague who plays whatever role you assign — devil&apos;s advocate, sceptical CFO,
            future-you in ten years, your most demanding customer. The pattern is conversation,
            not query. You go in with a half-formed view and come out with a sharper one.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Four decision types</h3>
          <p className="mt-2 text-slate-700">
            Not every decision deserves the same process. Sort yours into one of four buckets
            first.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Gut</strong> — low stakes, fast, reversible. Lunch order, which task to do first. AI is overkill.</li>
            <li><strong>Data</strong> — quantifiable inputs, clear formula. Pricing, capacity, inventory level. Use AI to compute or summarise the data, then decide.</li>
            <li><strong>Judgement</strong> — qualitative, ambiguous, stakeholder-laden. Hiring, firing, partnering, big strategy bets. Use AI as a thinking partner across all four pre-decision steps.</li>
            <li><strong>AI-assisted automation</strong> — high-volume, low-individual-stake decisions where AI runs a policy you set. Lead routing, refund approvals under $X, support categorisation. You decide the policy; AI executes it.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Knowing the type tells you how much to use AI and how much to trust the output.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five prompts for better decisions</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Pros / cons / unknowns.</strong> &quot;I am considering [decision]. List the top 5 pros, top 5 cons, and the top 5 things I don&apos;t know yet that would change my view. Don&apos;t soften any of them.&quot;</li>
            <li><strong>Devil&apos;s advocate.</strong> &quot;You disagree strongly with [decision]. Give me the three sharpest arguments against it. Be respectful but ruthless. Then tell me which one is hardest to refute.&quot;</li>
            <li><strong>Second-order effects.</strong> &quot;If I make [decision] and it works as planned, what changes downstream in 6 months that I haven&apos;t thought about? What new problems does success create?&quot;</li>
            <li><strong>Ten-year self.</strong> &quot;Imagine you are me, ten years from now, looking back at this decision. What would you wish I had paid more attention to right now? What would you tell me to ignore?&quot;</li>
            <li><strong>Stakeholder map.</strong> &quot;List every person and group affected by [decision]. For each, what do they care about, what would they say in private, and what would change their mind?&quot;</li>
          </ol>
          <p className="mt-2 text-slate-700">
            Run these in sequence on any judgement-type decision. Twenty minutes of AI dialogue
            replaces three days of mental ping-pong.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When to STOP using AI for decisions</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>High-stakes, irreversible.</strong> Selling the business, equity decisions, terminating a partnership. AI can sharpen the analysis, but human deliberation with named advisors is non-negotiable.</li>
            <li><strong>Highly emotional.</strong> Decisions tangled with grief, anger, betrayal — AI can&apos;t feel and will optimise the wrong variable. Sleep on it, talk to a human, then return.</li>
            <li><strong>Affecting one specific person you know well.</strong> Performance management, firing, custody — context AI doesn&apos;t have matters more than analysis AI can do.</li>
            <li><strong>When you&apos;ve already decided.</strong> If you&apos;re using AI to validate a choice you&apos;ve made, you&apos;re anchoring it, not testing it. Notice and stop.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Decision journaling with AI</h3>
          <p className="mt-2 text-slate-700">
            The highest-ROI long-term habit is keeping a decision journal that AI helps you
            review. Three steps. <strong>Capture</strong> — at the moment of decision, paste the
            context, your reasoning, your prediction, and your confidence (0–100%). Date it.
            <strong> Review</strong> — every quarter, ask AI to read the last 90 days of entries
            and identify your patterns: where were you over-confident? Where were you
            under-confident? Which biases recurred? <strong>Improve</strong> — pick one pattern
            per quarter to actively counter in the next 90 days. Over a year, this single habit
            improves judgement more than any course you could take.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU regulatory boundaries</h3>
          <p className="mt-2 text-slate-700">
            Australian law and professional standards explicitly forbid acting on AI alone in
            three areas: <strong>medical</strong> (TGA AI medical device regulations require human
            sign-off on diagnostic or therapeutic decisions), <strong>financial</strong> (ASIC
            requires personal financial advice to be provided by a licenced human under the Best
            Interests Duty), and <strong>legal</strong> (state and territory legal services
            regulators require admitted practitioners for advice; AI can draft but not advise).
          </p>
          <p className="mt-2 text-slate-700">
            For everything else, AI can be your most patient counsellor. Just keep it on its side
            of the line — the analysis, not the act.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Four decision types: gut, data, judgement, AI-assisted. Match the process to the type.',
              'Five prompts that improve judgement: pros/cons, devil\'s advocate, second-order, ten-year self, stakeholder map.',
              'Stop using AI when stakes are high and irreversible, when emotions are dominant, or when you have already decided.',
              'Decision journaling (capture → review → improve) is the highest-ROI long-term habit AI can support.',
              'Australian law forbids acting on AI alone for medical (TGA), financial (ASIC), and legal advice.',
              'Conversation beats query — go in with a half-formed view, come out with a sharper one.',
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
            <p className="font-semibold text-slate-900">Exercise: run the five-prompt sequence on a real decision</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pick one judgement-type decision you are currently mulling over.</li>
              <li>Open Claude or ChatGPT and run prompt 1 (pros/cons/unknowns). Read carefully.</li>
              <li>Run prompt 2 (devil&apos;s advocate). Note what stings.</li>
              <li>Run prompt 3 (second-order). Note the unfamiliar downstream consequences.</li>
              <li>Run prompt 4 (ten-year self). Note the long-horizon perspective.</li>
              <li>Run prompt 5 (stakeholder map). Note any name you forgot.</li>
              <li>Close the laptop. Write one paragraph in your own words about what you now believe and why.</li>
            </ol>
            <p className="mt-3">
              Bonus: start a decision journal. The entry you just wrote is entry number one.
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
                1. Which decision type is AI least useful for?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Judgement decisions</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Gut decisions (low stakes, reversible)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI-assisted automation</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Gut decisions. Low stakes, fast, reversible — AI is overkill.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which AU regulator forbids acting on AI alone for personal financial advice?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> TGA</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> ASIC</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> OAIC</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">ASIC. The Best Interests Duty requires a licensed human to provide personal financial advice.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the highest-ROI long-term habit AI can support for decisions?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Using a bigger model</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Decision journaling — capture, review, improve</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Always asking three AIs in parallel</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Decision journaling. Over a year it improves judgement more than any course you can take.</p>
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
              Keeping up with AI — without burnout
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The 3-newsletter diet, 15-minute test-don&apos;t-read rule, four weekly check-ins,
              AU sources and the FOMO antidote.
            </p>
          </div>
          <Link
            href="/academy/ai-productivity/lessons/keeping-up-with-ai-changes"
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
