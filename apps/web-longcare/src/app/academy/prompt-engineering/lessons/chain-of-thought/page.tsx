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
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Chain-of-Thought — Prompt Engineering Lesson 4 | LongCare Academy',
  description:
    'Make AI show its reasoning. When chain-of-thought helps, when it hurts, four patterns, and the AUD-cost trade-offs.',
  path: '/academy/prompt-engineering/lessons/chain-of-thought',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Chain-of-Thought — Make AI Show Its Reasoning',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'Prompt Engineering',
    url: 'https://longcare.au/academy/prompt-engineering',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function ChainOfThoughtLessonPage() {
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
            { name: 'Prompt Engineering', url: '/academy/prompt-engineering' },
            { name: 'Chain-of-Thought', url: '/academy/prompt-engineering/lessons/chain-of-thought' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 4 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Chain-of-thought &mdash; make AI show its reasoning
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Five magic words that lift accuracy on multi-step problems. Plus the cases where they
              waste tokens and money.
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
                href="/academy/prompt-engineering"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Question &rarr; assumptions &rarr; reason &rarr; verify &rarr; answer
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={760} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Five steps that transform fragile single-shot answers into auditable, defensible
            decisions.
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
              Transcript below contains every pattern and decision the video covers.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What is chain-of-thought?</h3>
          <p className="mt-2 text-slate-700">
            Chain-of-thought (CoT) prompting asks the model to write out its reasoning step-by-step
            before giving the final answer. Researchers discovered in 2022 that simply asking
            &ldquo;let&rsquo;s think step by step&rdquo; lifts performance on multi-step problems
            by double-digit percentages. It works because the act of writing intermediate steps
            forces the model to commit to consistent assumptions on the way to the answer.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The magic phrase</h3>
          <p className="mt-2 text-slate-700">
            &ldquo;<strong>Let&rsquo;s think step by step</strong>&rdquo; is the most reliable trigger,
            but variations work too: &ldquo;reason through this carefully before answering&rdquo;,
            &ldquo;list your assumptions, then your steps, then your conclusion&rdquo;, or
            &ldquo;think out loud&rdquo;. Pick whichever phrasing feels natural; what matters is
            the model knows you want the working, not just the answer.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When CoT helps</h3>
          <p className="mt-2 text-slate-700">
            Multi-step arithmetic (&ldquo;if revenue grew 15% and expenses 8%&hellip;&rdquo;), logic
            puzzles, complex decisions with weighted criteria, scheduling conflicts,
            multi-constraint optimisation. Anywhere the answer requires holding several facts in
            working memory simultaneously, CoT raises accuracy meaningfully &mdash; sometimes from
            55% to 85% on the same task.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When CoT hurts</h3>
          <p className="mt-2 text-slate-700">
            Creative writing (forces the model into stilted prose), simple lookups (wastes tokens),
            casual chat (kills the vibe), and one-shot factual recall (the reasoning trace can
            actually distract the model). Knowing when to skip CoT is half the skill.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 1 &mdash; explicit step request</h3>
          <p className="mt-2 text-slate-700">
            The simplest form. <em>&ldquo;Solve this step by step. Show your working. Final answer
            on a new line prefixed with &lsquo;Answer:&rsquo;.&rdquo;</em> Forces visible reasoning.
            The &ldquo;Answer:&rdquo; prefix lets you grep the result programmatically.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 2 &mdash; self-questioning</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Before answering, ask yourself three clarifying questions. Answer each.
            Then give your final answer.&rdquo;</em> Particularly powerful for ambiguous business
            decisions. The model surfaces its own assumptions, which you can then challenge.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 3 &mdash; devil&rsquo;s advocate</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;After reaching a conclusion, write the strongest counter-argument. Then
            either revise your answer or explain why the counter-argument fails.&rdquo;</em> The
            counter-argument step catches roughly a third of obvious mistakes the model would
            otherwise make. Cheap insurance.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 4 &mdash; verification</h3>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Compute your answer, then verify it by working the problem backwards from
            the answer. Flag any inconsistencies.&rdquo;</em> Especially good for any prompt that
            outputs numbers. If the verification step fails, the model corrects itself before
            handing back a wrong number.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU SME use case &mdash; should I automate this process?</h3>
          <p className="mt-2 text-slate-700">
            Pasting a process description into Claude with the prompt &ldquo;reason step-by-step
            about whether to automate this process. Consider: frequency, error cost, regulatory
            implications, change-management burden, ROI horizon. Then give a final
            recommendation.&rdquo; The reasoning trace itself becomes a defensible record of the
            decision &mdash; useful when justifying spend later.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Hidden vs visible CoT</h3>
          <p className="mt-2 text-slate-700">
            Newer reasoning models (OpenAI o-series, Claude 4.7 with extended thinking, Gemini 2.5
            Deep Think) hide their internal reasoning by default and only show the final answer.
            You can usually request &ldquo;show your reasoning summary&rdquo; or enable a thinking-
            visible toggle. Be aware that hidden CoT still costs tokens &mdash; you pay for the
            thinking even if you can&rsquo;t see it.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AUD pricing impact</h3>
          <p className="mt-2 text-slate-700">
            CoT typically uses 2&ndash;5x more tokens than a direct answer. At Claude 4.7
            Opus prices (about A$22.50 per million input tokens, A$112.50 per million output),
            heavy CoT can take a 1-cent prompt to 5 cents. For low-volume, high-stakes decisions,
            this is irrelevant; for high-volume customer-service replies it adds up. Cost-aware
            tactic: use CoT in development to find the right answer, then bake the answer into a
            shorter production prompt.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              '&ldquo;Let&rsquo;s think step by step&rdquo; is the most reliable CoT trigger.',
              'CoT helps multi-step reasoning; it hurts creative writing and simple lookups.',
              'Four patterns: explicit step, self-questioning, devil&rsquo;s advocate, verification.',
              'Devil&rsquo;s advocate catches ~1/3 of obvious mistakes — cheap insurance for important decisions.',
              'Hidden CoT in reasoning models still costs tokens — budget accordingly.',
              'Use CoT in development; bake the working answer into shorter production prompts to control cost.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t }} />
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
            One short hands-on exercise. Total time: 8 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: with vs without CoT</p>
            <p className="mt-2">
              Pick a multi-step problem at work &mdash; pricing a quote, deciding which supplier to
              choose, scheduling around a constraint. Run it once without CoT, once with the
              devil&rsquo;s-advocate pattern. Compare answers.
            </p>
            <p className="mt-3 italic">
              Note where the second run challenges an assumption the first run accepted silently.
              That assumption-surfacing is where CoT earns its tokens.
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
                1. CoT typically helps most on...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Creative poetry</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Multi-step reasoning and decisions</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> One-word factual lookups</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Multi-step reasoning. Creative writing and simple lookups are hurt by it.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. The devil&rsquo;s-advocate pattern is valuable because...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It produces longer answers</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It catches obvious mistakes before they reach you</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It removes the need for human review</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">It catches obvious mistakes &mdash; cheap insurance against confidently-wrong outputs.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the cost-aware tactic for CoT?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Always use CoT</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Use CoT in dev, bake the answer into shorter production prompts</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Disable hidden reasoning in your model settings</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Use CoT in development to find the right answer, then bake it into a shorter production prompt.</p>
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
              Debugging bad outputs &mdash; a repeatable workflow
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The four-step diagnostic that turns &ldquo;this isn&rsquo;t working&rdquo; into a fix.
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
            href="/academy/prompt-engineering"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to Prompt Engineering
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
