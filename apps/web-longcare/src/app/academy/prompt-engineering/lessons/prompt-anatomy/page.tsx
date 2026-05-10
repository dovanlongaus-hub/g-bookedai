import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  MessageSquareCode,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowPromptAnatomy } from '@/components/illustrations/flow-prompt-anatomy';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Anatomy of a Reliable Prompt | LongCare Academy',
  description:
    'The 5 ingredients that turn AI from a toy into a tool: role, task, context, format, and constraints. Lesson 1 of Prompt Engineering. Free.',
  path: '/academy/prompt-engineering/lessons/prompt-anatomy',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Anatomy of a Reliable Prompt',
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

export default function PromptAnatomyLessonPage() {
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
            { name: 'Prompt Anatomy', url: '/academy/prompt-engineering/lessons/prompt-anatomy' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 1 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Start course free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Anatomy of a Reliable Prompt
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Five ingredients turn AI from a toy into a tool. By the end of this lesson you’ll
              have three reusable templates you can paste into ChatGPT, Gemini, or Claude today.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
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
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Prompt anatomy flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The five ingredients of a reliable prompt
          </h3>
          <div className="flex justify-center">
            <FlowPromptAnatomy width={720} height={220} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Role · Task · Context · Format · Constraints — skip one and quality drops; include all five and your output becomes consistent.
          </p>
        </div>
      </section>

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
              The full transcript and side-by-side examples below cover everything in the upcoming video.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The five ingredients</h3>
          <p className="mt-2 text-slate-700">
            Every reliable prompt contains five components. Skip one and quality drops; include
            all five and your output becomes consistent enough to put in front of a customer.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Role</strong> — who the AI is acting as. “You are a customer support specialist for an Australian electrician.”</li>
            <li><strong>Task</strong> — exactly what to do. “Reply to this customer email about a delayed appointment.”</li>
            <li><strong>Context</strong> — relevant background. The customer’s message, your booking policy, the actual reason for the delay.</li>
            <li><strong>Format</strong> — how the output should look. “One paragraph, under 80 words, ending with a single clear next step.”</li>
            <li><strong>Constraints</strong> — what to avoid. “Don’t apologise more than once. Don’t offer a discount. Don’t use the word ‘unfortunately’.”</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Bad prompt vs. good prompt</h3>
          <p className="mt-2 text-slate-700"><strong>Bad:</strong></p>
          <pre className="bg-slate-100 rounded-md p-3 text-xs whitespace-pre-wrap"><code>Write a reply to this customer.</code></pre>
          <p className="mt-2 text-slate-700">
            Output is generic, often opens with “Dear valued customer”, apologises four times,
            and offers a discount you didn’t authorise.
          </p>
          <p className="mt-4 text-slate-700"><strong>Good:</strong></p>
          <pre className="bg-slate-100 rounded-md p-3 text-xs whitespace-pre-wrap"><code>{`Role: You are the bookings coordinator at "Bright Sparks Electrical", a small Sydney electrician.

Task: Reply to the customer email below about us pushing their appointment from Tuesday to Thursday because of a parts delay.

Context (customer email):
"Hi, just confirming our 9am Tuesday booking is still on?"
- Reason for delay: switchboard part is in transit, ETA Wednesday afternoon.
- New offered slot: Thursday 9am.

Format: One short paragraph, under 80 words, plain Australian English. End with a single clear next step.

Constraints:
- Apologise once, briefly.
- Do not offer any discount.
- Do not use the words "unfortunately" or "valued customer".`}</code></pre>
          <p className="mt-2 text-slate-700">
            The good version produces output you can copy-paste, every time, with little or no editing.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three SME templates to copy today</h3>
          <p className="mt-2 text-slate-700"><strong>1. Email reply template</strong></p>
          <pre className="bg-slate-100 rounded-md p-3 text-xs whitespace-pre-wrap"><code>{`Role: You are the [job title] at [business name], a [type] in [city].
Task: Reply to the customer email below about [topic].
Context: [paste customer email]. Background: [1–3 sentences].
Format: [length], plain Australian English, ending with [next step].
Constraints: [tone or words to avoid].`}</code></pre>

          <p className="mt-3 text-slate-700"><strong>2. Customer support draft</strong></p>
          <pre className="bg-slate-100 rounded-md p-3 text-xs whitespace-pre-wrap"><code>{`Role: You are a level-1 support rep for [product/service].
Task: Draft three reply variants to the ticket below — empathetic, neutral, brief.
Context: [paste ticket and customer history if relevant].
Format: Three numbered drafts, each under 100 words.
Constraints: No promises about ETAs. No discounts. End each draft with one question to confirm next steps.`}</code></pre>

          <p className="mt-3 text-slate-700"><strong>3. Weekly summary</strong></p>
          <pre className="bg-slate-100 rounded-md p-3 text-xs whitespace-pre-wrap"><code>{`Role: You are an executive assistant.
Task: Summarise the week from the bullet points below for my CEO.
Context: [paste your raw notes/meetings/wins].
Format: Markdown. Three sections — "Wins", "Risks", "Decisions needed". Maximum 150 words total.
Constraints: No fluff. No "I hope this helps". Use AU English.`}</code></pre>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When to add few-shot examples</h3>
          <p className="mt-2 text-slate-700">
            <strong>Few-shot</strong> means including 1–2 example inputs and matching outputs
            inside your prompt. The rule of thumb:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Zero examples</strong> — fine for general tasks where defaults are sensible.</li>
            <li><strong>One or two examples</strong> — best for any task where tone, format, or your specific style matters. The biggest jump in quality comes from going zero → one.</li>
            <li><strong>Three or more</strong> — diminishing returns. The prompt gets long, you start contradicting yourself, and accuracy can actually drop.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            One good example beats a dozen mediocre ones. Pick examples that look like the
            output you want — same length, same voice, same structure.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Anti-patterns to avoid</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Vague instructions</strong> — “make it good”, “be professional”, “be creative”. The model has no anchor and defaults to mediocre.</li>
            <li><strong>Conflicting commands</strong> — “Be friendly but corporate” without explaining what each means in your context. Pick one or define both.</li>
            <li><strong>“Just be creative.”</strong> Almost always produces clichés. Specify <em>which</em> kind of creativity (unusual format, unusual analogy, unusual structure).</li>
            <li><strong>Walls of context with no instructions</strong> — pasting a 5-page document and ending with “thoughts?”. Always end with a specific task and format.</li>
            <li><strong>Negative-only constraints</strong> — only saying what NOT to do. Tell the model what TO do as well.</li>
          </ul>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Reliable prompts have 5 ingredients: role, task, context, format, constraints.',
              'Side-by-side proves it: the same model produces wildly different output from a structured prompt.',
              'Three reusable templates cover most SME work: email reply, support draft, weekly summary.',
              'Few-shot: zero → one example is the biggest quality jump. Three or more often hurts.',
              'Avoid vague, conflicting, or negative-only instructions — always tell the model what TO do.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Try it yourself</h2>
          <p className="text-sm text-slate-600 mb-4">Total time: 10 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">
              Exercise: Rewrite a real task with the 5-ingredient structure
            </p>
            <ol className="mt-2 list-decimal pl-6 space-y-2">
              <li>Find one prompt you’ve typed into AI in the last week that produced a meh result.</li>
              <li>Rewrite it using the role / task / context / format / constraints structure above.</li>
              <li>Run both versions in your chat assistant and compare.</li>
            </ol>
            <p className="mt-3">
              Most learners report a noticeably better result on the first rewrite. That gap is
              what the rest of this path is designed to widen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Quick check</h2>

          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-slate-900">
                1. Which is NOT one of the five ingredients?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Role</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Constraints</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Word count of the model</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Word count of the model — that’s a property of the model, not your prompt. Format covers length specifications.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. How many examples typically gives the best price/performance?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Zero — let the model figure it out</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> One or two well-chosen examples</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Five or more for safety</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">One or two — biggest quality jump, before diminishing returns set in.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why is “just be creative” a weak instruction?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The model can’t be creative</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Without a specific anchor it produces clichés</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It always triggers a content filter</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Without a specific anchor (kind of creativity, audience, format), the model defaults to clichés.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 2</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Few-shot examples that lift quality fast
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The right way to include examples without bloating your prompt.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/prompt-engineering"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to Prompt Engineering
          </Link>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            All paths
          </Link>
        </div>
      </section>
    </main>
  );
}
