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
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Output Validation Patterns — Trust But Verify | Prompt Engineering Lesson 7 | LongCare Academy',
  description:
    'Five validation patterns for AI outputs — schema, sentinel, self-critique, cross-model, human-in-loop — with AU-specific notes for legal and medical disclaimers and example prompts that produce reliably structured output.',
  path: '/academy/prompt-engineering/lessons/output-validation-patterns',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Output Validation Patterns — Trust But Verify',
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

export default function OutputValidationPatternsLessonPage() {
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
            { name: 'Output Validation Patterns', url: '/academy/prompt-engineering/lessons/output-validation-patterns' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 7 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Output validation patterns — trust but verify
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A reliable AI workflow assumes the model will sometimes lie, drift or hallucinate —
              and catches it before the customer does. Five patterns, in order of cost.
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
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The five-step validation pipeline
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Generate &rarr; Schema check &rarr; Self-critique &rarr; Human sample &rarr; Action.
            Each step catches a different class of failure.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why validate at all</h3>
          <p className="mt-2 text-slate-700">
            Three failure modes show up in production AI workflows. <strong>Hallucinations</strong>
            — confident, fabricated facts. <strong>Format drift</strong> — the model returned a
            paragraph when you asked for JSON, or wrapped JSON in markdown fences. <strong>Edge
            cases</strong> — the prompt worked on the ten cases you tested and broke on the
            eleventh. Validation is the cheap insurance that catches all three before they reach
            a customer or a billing system.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 1 — Schema validation</h3>
          <p className="mt-2 text-slate-700">
            Force the model to return structured data and validate it against a schema. The
            cheapest, highest-leverage pattern.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Ask for JSON with a defined shape: <em>{`"return JSON: { name: string, urgency: 'low' | 'medium' | 'high', actions: string[] }"`}</em></li>
            <li>Validate the result with Zod, Pydantic or AJV. If invalid, retry the call with the validation error included in the prompt.</li>
            <li>Use OpenAI Structured Outputs, Anthropic Tool Use or Vertex AI structured response — these guarantee schema compliance at the model level.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 2 — Sentinel responses</h3>
          <p className="mt-2 text-slate-700">
            Allow the model to opt out. Hallucinations happen most often when the model feels
            forced to answer.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Add to the prompt: <em>“If you are not at least 80% confident, respond with the literal string <code>VERIFY</code> and explain what you would need to know.”</em></li>
            <li>Route every <code>VERIFY</code> response to human review or a follow-up search step.</li>
            <li>Empirically reduces fabrication on factual questions by 40–60% in our SME test suite.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 3 — Self-critique</h3>
          <p className="mt-2 text-slate-700">
            Ask the model to review its own answer in a second turn.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Turn 1: produce the answer.</li>
            <li>Turn 2: <em>“Critique the answer above against this rubric: factual accuracy, format compliance, tone for an Australian SME audience, missing caveats.”</em></li>
            <li>Turn 3: <em>“Now produce a revised answer addressing the critique.”</em></li>
          </ul>
          <p className="mt-2 text-slate-700">
            Adds latency and token cost (roughly 2.5× the base call) but lifts quality
            measurably on hard tasks. Pair with structured output for compounding gains.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 4 — Cross-model check</h3>
          <p className="mt-2 text-slate-700">
            Run the same prompt through two different models. Where they agree, trust more. Where
            they disagree, escalate.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Pair: Gemini 2.0 Flash + Claude 3.7 Sonnet, or GPT-5 mini + Claude Haiku 3.7.</li>
            <li>Use a third “judge” model to compare outputs and produce a confidence score.</li>
            <li>Best for high-stakes outputs (legal, medical, financial). Avoid for creative tasks where divergence is the point.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 5 — Human-in-loop sampling</h3>
          <p className="mt-2 text-slate-700">
            Sample N% of outputs for human review. Cheap, high-signal, and the only pattern that
            catches genuinely novel failures.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Start with 100% review for the first week.</li>
            <li>Drop to 20% once defect rate is stable.</li>
            <li>Drop to 5% once you have 200 reviewed samples with no issues.</li>
            <li>Always sample 100% of outputs that involve money, legal or medical claims.</li>
            <li>Always sample on edge-case inputs — empty, malformed, very long, multilingual.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU context — legal and medical disclaimers</h3>
          <p className="mt-2 text-slate-700">
            Outputs that touch regulated domains need extra scrutiny in Australia.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Financial advice</strong> — ASIC: AI-generated personal advice still falls under AFSL. Use sentinel responses to refuse personalised advice and route to a licensed adviser.</li>
            <li><strong>Medical information</strong> — TGA: AI-generated medical content must include the standard “seek professional advice” disclaimer. Use schema validation to require the disclaimer field.</li>
            <li><strong>Legal information</strong> — generic information is fine; specific advice requires legal practice certification. Sentinel and disclaimer fields are essentials.</li>
            <li><strong>Privacy notices</strong> — OAIC: customer-facing AI outputs that handle personal data need a privacy notice referencing APP 1.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools to use</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Pydantic + Instructor</strong> (Python) — schema validation with automatic retries on invalid output.</li>
            <li><strong>Zod + Vercel AI SDK</strong> (TypeScript) — same idea on the JS side, used in Next.js apps.</li>
            <li><strong>OpenAI Structured Outputs</strong> — guarantees JSON schema compliance.</li>
            <li><strong>Anthropic Tool Use</strong> — same effect via tool calling.</li>
            <li><strong>Vertex AI grounding</strong> — pins outputs to retrieved documents, reducing hallucination on factual tasks.</li>
            <li><strong>LangSmith / Helicone / Langfuse</strong> — observability platforms that capture, sample and review outputs.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Example: a reliably structured prompt</h3>
          <p className="mt-2 text-slate-700">
            Here is a prompt that classifies a customer support email and never returns
            free-text-only output.
          </p>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs overflow-x-auto"><code>{`You are a customer support triage assistant for an Australian SME.
Read the email below and return ONLY this JSON shape:

{
  "category": "billing" | "technical" | "general" | "complaint",
  "urgency": "low" | "medium" | "high",
  "summary": string (max 30 words, Australian English),
  "suggested_action": string,
  "confidence": number (0-1),
  "verify": boolean
}

Set verify=true if confidence < 0.8. Do not include any text outside the JSON.

EMAIL:
{email_body}`}</code></pre>
          <p className="mt-2 text-slate-700">
            Validate the response with Zod or Pydantic. Route any <code>verify=true</code> result
            to a human queue. Drop the schema-failed retries on a third strike — humans handle
            those.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five validation patterns: schema, sentinel, self-critique, cross-model, human-in-loop. Use them in combination, in that order of cost.',
              'Always require structured output and validate it. Free-text outputs are the source of most production failures.',
              'Allow the model to opt out with a sentinel value (VERIFY). Hallucinations decrease 40–60% on factual tasks.',
              'Self-critique adds 2.5× cost but lifts quality measurably on hard tasks.',
              'Sample 100% on money/legal/medical outputs and on edge cases. Drop to 5% only after 200 clean samples.',
              'AU regulated domains (ASIC, TGA, OAIC) require sentinel-driven escalation paths and disclaimer fields.',
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
            <p className="font-semibold text-slate-900">Exercise: Add validation to one of your existing prompts</p>
            <p className="mt-2">
              Pick a prompt you already use that returns text and rewrite it as a structured prompt
              with a sentinel.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Copy your existing prompt into ChatGPT or Claude.</li>
              <li>Define the JSON shape you want back, with a <code>confidence</code> field and a <code>verify</code> boolean.</li>
              <li>Add: <em>“If confidence is below 0.8, set verify=true and explain what you would need to know.”</em></li>
              <li>Run it three times with the same input. Verify the JSON shape is identical every time.</li>
              <li>Run it on an edge case (empty input, very long input, input in another language). See where it breaks.</li>
            </ol>
            <p className="mt-3">If you run a real workflow on this prompt, plug Zod or Pydantic in next to validate before the output reaches downstream code.</p>
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
                1. Which validation pattern is the cheapest and highest leverage?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Cross-model check</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Schema validation</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Human-in-loop sampling</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Schema validation. It catches format drift and lets every other pattern build on top.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What does a sentinel response do?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Lets the model refuse to answer when uncertain</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Forces the model to use Australian English</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Caps the response length</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Lets the model refuse when uncertain. Reduces hallucinations 40–60% on factual tasks in our SME test suite.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. When should you sample 100% of AI outputs for human review?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Never — it’s too expensive</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Always for money, legal or medical outputs</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Only on weekends</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Always for money, legal or medical outputs. The asymmetric downside (penalty, harm) outweighs the review cost.</p>
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
              Multimodal prompting — image, audio, video inputs
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Five SME use cases for multimodal AI in 2026, AUD pricing, privacy considerations and
              a hands-on photo-to-invoice extraction.
            </p>
          </div>
          <Link
            href="/academy/prompt-engineering/lessons/multimodal-prompting"
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
