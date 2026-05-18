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
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Prompt Debugging Checklist — Prompt Engineering Lesson 13 | LongCare Academy',
  description:
    'When AI gives wrong answers, work through this 10-step debugging checklist before changing models — failure modes, the debugging journal and the rubber-duck-with-AI technique.',
  path: '/academy/prompt-engineering/lessons/prompt-debugging-checklist',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Prompt Debugging Checklist — When AI Gives Wrong Answers',
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

export default function PromptDebuggingChecklistLessonPage() {
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
            { name: 'Prompt Debugging Checklist', url: '/academy/prompt-engineering/lessons/prompt-debugging-checklist' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 13 of 14
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Prompt debugging checklist — when AI gives wrong answers
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Most &ldquo;the AI is broken&rdquo; reports turn out to be prompt problems.
              Here is the 10-step systematic checklist we walk through before ever blaming the
              model — plus the failure modes and the debugging journal that compounds your skill.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/prompt-engineering/lessons/multimodal-prompting-mastery"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson — Multimodal mastery <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/academy/prompt-engineering"
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

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Symptom vs root cause — at a glance
          </h3>
          <div className="flex justify-center">
            <InfographicComparison width={720} height={260} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Eight out of ten times the symptom is the model; the root cause is the prompt or the
            input. The checklist below separates the two systematically.
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
            <span className="text-sm">Video coming Q3 2026 · 25 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The four failure modes</h3>
          <p className="mt-2 text-slate-700">
            Almost every &ldquo;AI gave a wrong answer&rdquo; complaint falls into one of four
            buckets. <strong>Hallucination</strong> — the model invented something that does
            not exist. <strong>Format failure</strong> — it returned the right idea but in the
            wrong shape (markdown when you asked for JSON, prose when you asked for a list).
            <strong> Scope drift</strong> — it answered a different question or stopped early.
            <strong> Refusal</strong> — it declined the task (a safety filter, a
            misunderstanding of the request, or a content policy match). Naming the failure
            mode first is half the debug.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 1 — Verify the input</h3>
          <p className="mt-2 text-slate-700">
            Eighty percent of the time the wrong answer comes from a wrong input. Did you paste
            the right document? Is the spreadsheet formatted as you expect? Is the customer
            record current? Open the input in a separate window and read it as if you were a
            new starter. We have caught more bugs at step 1 than at all subsequent steps combined.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 2 — Check the model</h3>
          <p className="mt-2 text-slate-700">
            Confirm which model the system actually used. ChatGPT auto-routes; Gemini has
            multiple tiers; Claude has Opus and Sonnet. A degraded model is the easiest fix.
            For automated workflows, log the model name with every call — debugging an
            automation without that log is like debugging code without stack traces.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 3 — Simplify the prompt</h3>
          <p className="mt-2 text-slate-700">
            Cut your prompt by 50%. Run it. Compare. If output improves, your prompt was
            confusing the model — usually with contradictory instructions, too much context,
            or polite-but-redundant language. If output is the same, you can safely keep the
            shorter prompt. If output is worse, something specific in the deleted half was
            load-bearing — re-add line by line.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 4 — Add one or two examples</h3>
          <p className="mt-2 text-slate-700">
            A single good example beats 200 words of instructions. If you wrote 200 words
            describing the output you want and the model is still missing the mark, paste one
            example of a perfect output instead. We covered few-shot in lesson 3 of this path
            — debugging is where it earns its keep. Two examples that show edge cases
            (positive and tricky) usually finish the job.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 5 — Set a role</h3>
          <p className="mt-2 text-slate-700">
            If the prompt does not name the role, the model picks one by default — often
            &ldquo;helpful assistant&rdquo; — which can be wrong for your task. Adding
            <em> &ldquo;you are an experienced AU tax accountant&rdquo;</em> or <em>&ldquo;you
            are a senior litigator at an AU mid-tier firm&rdquo;</em> visibly shifts tone,
            depth and which terms get clarified.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 6 — Specify the format precisely</h3>
          <p className="mt-2 text-slate-700">
            Format failures are the easiest fix. Replace &ldquo;list of items&rdquo; with
            &ldquo;JSON array of objects, each with keys A/B/C&rdquo;. Replace &ldquo;short
            summary&rdquo; with &ldquo;three bullet points, each under 25 words&rdquo;.
            Specificity here is free.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 7 — Add constraints</h3>
          <p className="mt-2 text-slate-700">
            What should the model <em>not</em> do? &ldquo;Do not use markdown.&rdquo;
            &ldquo;Do not include disclaimers.&rdquo; &ldquo;Do not exceed 200 words.&rdquo;
            &ldquo;If unsure, reply UNSURE.&rdquo; Constraints save more tokens and more
            debugging hours than any other prompt change.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 8 — Retry with the same prompt</h3>
          <p className="mt-2 text-slate-700">
            All current models have temperature. Running the same prompt three times sometimes
            surfaces the model&rsquo;s natural variance. If two of three answers are good and
            one is bad, the prompt is fine and you need to lower temperature or add a
            self-critique step. If all three are bad, the prompt is not fine and you need to
            go back to step 3.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 9 — Switch model</h3>
          <p className="mt-2 text-slate-700">
            Only at step 9. Try the prompt on Claude 3.7 Sonnet, GPT-5, Gemini 2.5 Pro. If the
            three top-tier models all fail the same way, the problem is upstream — your prompt
            is asking for something none of them can do, or the input is corrupt. If one or
            two succeed and the other does not, you have a model-specific issue and you can
            either route around it (use the right model for this task) or rewrite for the one
            you must use.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 10 — Escalate to a human</h3>
          <p className="mt-2 text-slate-700">
            Some prompts deserve to fail. If a colleague would also struggle with the task
            given the same input, accept that AI is not the answer. We have watched AU teams
            spend three days debugging a prompt for &ldquo;summarise this messy 8,000-row
            spreadsheet&rdquo; when the right answer was &ldquo;clean the spreadsheet
            first&rdquo;. AI cannot rescue garbage in.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The debugging journal</h3>
          <p className="mt-2 text-slate-700">
            Keep a one-page debugging journal — every meaningful prompt failure, the symptom,
            the step that fixed it, the lesson. After a month you will see patterns: yours
            tend to be format failures, or you tend to forget the role, or your inputs are
            inconsistent. Once you see your pattern, you skip that step from the start. AU
            engineering teams we coach typically halve their debug time within 60 days of
            keeping a journal.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Rubber-ducking with AI</h3>
          <p className="mt-2 text-slate-700">
            A classic debugging technique is to explain your problem to a rubber duck —
            articulating it usually surfaces the answer. AI is a better duck. Use this prompt:
            <em> &ldquo;Here is my prompt and the output I am getting. Here is what I expected.
            Walk me through three possible reasons the model produced this output, ordered
            most-to-least likely.&rdquo;</em> Claude is the best ducking model in our
            experience; ChatGPT is a close second. The act of writing the question is half the
            cure.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When the problem is the model limitation</h3>
          <p className="mt-2 text-slate-700">
            Some tasks remain hard for 2026 models — long-form coherent fiction over 10k words,
            real-time information without a tool call, arithmetic on lots of numbers without a
            code interpreter. If your task is one of those, no amount of prompt tuning will
            help. The fix is structural: add a tool (code interpreter, calculator, web search,
            RAG), or rescope the task. Recognising you have hit a model wall — rather than
            burning hours on a prompt — is itself a skill.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Name the failure mode first — hallucination, format, scope drift, refusal.',
              'Verify the input before blaming the model — 80% of wrong answers come from wrong inputs.',
              'Cut the prompt by 50% — confusing instructions are more common than missing ones.',
              'A good example beats 200 words. Add 1-2 few-shot demos before adding more instructions.',
              'Switch model only at step 9 — most bugs are upstream of the model choice.',
              'A debugging journal halves your debug time within 60 days; patterns emerge fast.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 20 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Apply the 10-step checklist to a real broken prompt</p>
            <p className="mt-2">
              Find a prompt that is misbehaving in your workflow this week. If nothing is
              broken, pick a prompt you wrote three months ago and try it again.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Name the failure mode in one of four words.</li>
              <li>Work down the 10-step checklist, stopping at the first step that fixes it.</li>
              <li>Write a one-line debugging journal entry: symptom, step that fixed, lesson.</li>
              <li>Run the rubber-duck-with-AI prompt on any prompt that did not resolve by step 9.</li>
              <li>If you reach step 10, accept that the task may not be AI-shaped.</li>
            </ol>
            <p className="mt-3">
              Most debugs end at step 1, 3, or 4. The discipline is going in order.
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
                1. The four failure modes are…
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Slow, expensive, off-topic, ambiguous</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Hallucination, format, scope drift, refusal</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Hot, cold, warm, indifferent</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Hallucination, format, scope drift, refusal. Naming the failure mode is half the debug.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Where in the 10-step checklist should you switch model?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Step 1 — always start with a stronger model</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Step 9 — only after exhausting prompt and input changes</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Step 4 — once you have added examples</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Step 9. Most bugs are upstream of model choice; switching first hides the real problem.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the purpose of a debugging journal?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> A diary of complaints</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> To surface the patterns in your own failures so you skip those steps next time</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Compliance requirement under OAIC</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Pattern surfacing. Most engineers have a recurring failure shape; the journal makes it visible and the fix becomes muscle memory.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next — Lesson 14</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Multimodal mastery — image, audio, video prompting
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Vision, voice and video models — workflows, AU dialect handling, AUD pricing and the latency tradeoff.
            </p>
          </div>
          <Link
            href="/academy/prompt-engineering/lessons/multimodal-prompting-mastery"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </Link>
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
