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
import { FlowPromptAnatomy } from '@/components/illustrations/flow-prompt-anatomy';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Few-Shot Examples — Prompt Engineering Lesson 3 | LongCare Academy',
  description:
    'Why one or two demos beat 100 words of description. Five few-shot patterns and three rewrites that lift output quality fast.',
  path: '/academy/prompt-engineering/lessons/few-shot-examples',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Few-Shot Examples — Why 1-2 Demos Beat 100 Words of Description',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
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

export default function FewShotExamplesLessonPage() {
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
            { name: 'Few-Shot Examples', url: '/academy/prompt-engineering/lessons/few-shot-examples' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 3 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Few-shot examples &mdash; why 1&ndash;2 demos beat 100 words
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Description tells AI what you want. Examples show it. Used well, two examples lift
              output quality more than fifty words of instructions.
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

      {/* Inline anatomy */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Where examples sit inside the prompt anatomy
          </h3>
          <div className="flex justify-center">
            <FlowPromptAnatomy width={760} height={220} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Examples slot in after the role and task, before the actual input. They calibrate the
            model&rsquo;s understanding of &ldquo;good&rdquo; without lengthy instructions.
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
              The transcript below contains the full set of patterns and rewrites.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What is few-shot prompting?</h3>
          <p className="mt-2 text-slate-700">
            Zero-shot prompting is &ldquo;here is the task, do it&rdquo;. One-shot is &ldquo;here is
            one example of doing it correctly, now you do this one.&rdquo; Few-shot is two or three
            examples. The phrase comes from how machine-learning researchers count training
            examples &mdash; &ldquo;few&rdquo; in this world means a literal handful.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why it works &mdash; in-context learning</h3>
          <p className="mt-2 text-slate-700">
            Modern LLMs do something called in-context learning: they pattern-match against the
            recent input and align their output style to the demonstrated pattern. You are not
            retraining the model; you are temporarily nudging its conditional probabilities. The
            effect is largest for stylistic and structural choices &mdash; format, voice, structure,
            decision rules &mdash; and smaller for hard factual recall.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The 1&ndash;2 example sweet spot</h3>
          <p className="mt-2 text-slate-700">
            Counterintuitively, more examples is not always better. Two well-chosen examples
            usually outperform ten random ones. Reasons: examples take up context window
            (everything you spend here cannot be spent on the actual input), examples can
            contradict each other, and examples can over-fit the model to a specific phrasing it
            then copies verbatim. Aim for two diverse, well-chosen examples first; only escalate
            if the output is still off.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 1 &mdash; format-only examples</h3>
          <p className="mt-2 text-slate-700">
            When the structure matters more than the content. <em>&ldquo;Format your answer like
            this: Bullet 1: [verb-led]. Bullet 2: [verb-led]. Final line: a single recommendation
            in italics.&rdquo;</em> Then give one example. The model copies the structure
            faithfully.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 2 &mdash; style-transfer examples</h3>
          <p className="mt-2 text-slate-700">
            When voice matters. Paste two short pieces from your existing brand voice (a tweet, a
            paragraph from your About page) and ask AI to write new copy in the same register.
            This is the single highest-ROI use of few-shot prompting for AU SMEs &mdash; it makes
            generic AI writing sound like you.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 3 &mdash; edge-case examples</h3>
          <p className="mt-2 text-slate-700">
            When the easy cases are obvious and the hard cases need handling. Show the model how
            you handle a refund within 30 days, a refund after 90 days, and a refund where the
            product is damaged. The model will generalise the rules cleanly. Without these
            examples it will hallucinate refund rules from the void.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 4 &mdash; counter-examples</h3>
          <p className="mt-2 text-slate-700">
            When you want the model to avoid something specific. Show one good example labelled
            &ldquo;GOOD&rdquo; and one bad example labelled &ldquo;DO NOT WRITE LIKE THIS&rdquo;.
            Be explicit. The model uses the contrast to find the boundary.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 5 &mdash; reasoning-trace examples</h3>
          <p className="mt-2 text-slate-700">
            When the answer needs justification. Show one example where the &ldquo;answer&rdquo;
            includes a step-by-step reasoning trace, then the conclusion. The model copies the
            structure and produces transparent reasoning even on the new input. Useful for
            decision-support prompts where you want to audit the logic.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three rewrites &mdash; zero, one, two-shot</h3>
          <p className="mt-2 text-slate-700">
            Take this task: classify a customer email into a category. <strong>Zero-shot:</strong>
            &ldquo;Classify this email into one of: billing, technical, general.&rdquo; Output is
            often inconsistent. <strong>One-shot:</strong> add one labelled example &mdash; output
            stabilises. <strong>Two-shot:</strong> add a tricky borderline example labelled with
            the correct category &mdash; output handles the edge case. Quality goes up, latency
            barely changes, cost rises by a few percent.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Common mistake &mdash; contradictory examples</h3>
          <p className="mt-2 text-slate-700">
            If your two examples disagree on style, format, or rule, the model splits the
            difference and you get worse output than zero-shot. Sanity-check your examples are
            consistent before pasting. The fastest debug is to run them past a colleague: if a
            human cannot tell what the rule is from your examples alone, neither can the model.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When to skip few-shot entirely</h3>
          <p className="mt-2 text-slate-700">
            Pure factual lookups (&ldquo;what is the GST rate in 2026?&rdquo;), creative
            brainstorming where you actively want variety, and simple commands (&ldquo;summarise
            in three bullets&rdquo;). Examples in those cases waste tokens or constrain the model
            unnecessarily.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'In-context learning means the model copies recent patterns; examples calibrate it without retraining.',
              'Two well-chosen examples beat ten random ones. Diversity matters more than quantity.',
              'Five patterns: format-only, style-transfer, edge-case, counter-example, reasoning-trace.',
              'Style-transfer is the highest-ROI few-shot pattern for AU SMEs — makes AI sound like you.',
              'Contradictory examples hurt quality. Sanity-check that a human could infer the rule.',
              'Skip few-shot for factual lookups, creative brainstorms, and simple commands.',
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
            One short hands-on exercise. Total time: 8 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: zero-shot vs two-shot</p>
            <p className="mt-2">
              Pick a routine task you do at work &mdash; classifying emails, drafting responses,
              tagging leads. Run it zero-shot in ChatGPT or Gemini. Then run it again with two
              labelled examples in front. Compare outputs side-by-side.
            </p>
            <p className="mt-3 italic">
              The lift is usually obvious. Save the working two-shot prompt to your swipe file
              &mdash; you have just turned a fragile prompt into a reliable one.
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
                1. What does &ldquo;few-shot&rdquo; refer to?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Running the prompt many times</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Including a small number of labelled examples in the prompt</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> A short version of the prompt</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Including a small number of labelled examples. The model uses them as in-context demos.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why is style-transfer the highest-ROI few-shot pattern for SMEs?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It uses fewer tokens</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It makes generic AI writing sound like your brand</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It removes hallucinations</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">It makes generic AI writing sound like your brand &mdash; a quick way to fight the &ldquo;AI smell&rdquo;.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the most common cause of few-shot prompts performing worse than zero-shot?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Examples that contradict each other</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Using the wrong model</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Asking too short a question</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Contradictory examples. The model splits the difference and you get worse output.</p>
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
