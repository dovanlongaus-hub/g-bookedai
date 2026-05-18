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
  title: 'Structured Output with Zod — Prompt Engineering Lesson 11 | LongCare Academy',
  description:
    'Make AI return reliable JSON. Why structured output matters, OpenAI structured outputs API, Zod schemas, a worked customer-support classifier, retry on validation fail, AUD cost notes and an AU audit-friendly compliance use case.',
  path: '/academy/prompt-engineering/lessons/structured-output-with-zod',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Structured Output — Make AI Return JSON Reliably',
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

export default function StructuredOutputWithZodLessonPage() {
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
            { name: 'Structured Output with Zod', url: '/academy/prompt-engineering/lessons/structured-output-with-zod' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 11 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Structured output — make AI return JSON reliably
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Prose answers are nice for humans. Production workflows need machine-readable,
              validatable output every time. Zod schemas plus OpenAI&rsquo;s structured outputs
              API close the gap.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/prompt-engineering/lessons/evaluating-prompt-quality"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson <ArrowRight className="size-4" />
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
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The structured-output flow
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Define schema &rarr; Prompt &rarr; Generate &rarr; Validate &rarr; Action. The
            validate step is what turns a clever demo into a reliable production workflow.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why structured output</h3>
          <p className="mt-2 text-slate-700">
            The moment AI output flows into another system, prose stops being good enough.
            Sending free-text to Xero, Slack, your CRM, or a database means writing fragile
            parsers and accepting silent failures. Structured output &mdash; output that
            conforms to a schema &mdash; is the unglamorous foundation of every reliable AI
            workflow. Three benefits: it is machine-readable; it is validatable on the way out
            of the model; and it gives you a clean retry signal when the model gets it wrong.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">OpenAI structured outputs</h3>
          <p className="mt-2 text-slate-700">
            OpenAI&rsquo;s &ldquo;structured outputs&rdquo; mode, generally available since
            late 2024, makes a guarantee that JSON returned by the model will conform to a
            JSON Schema you supply at request time. Set <code>response_format: {`{ type: "json_schema", json_schema: {...} }`}</code> in
            the API call and the model is constrained at decode time so the result either
            parses cleanly or the call fails. Anthropic offers the same idea via the
            <code>tools</code> parameter; Google supports response schemas in Gemini 1.5+. The
            implementations differ; the principle does not.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Zod schemas in TypeScript</h3>
          <p className="mt-2 text-slate-700">
            In a TypeScript stack &mdash; which most modern AU SaaS teams use &mdash; Zod is
            the de facto schema library. You define the shape once and it gives you (a) a
            JSON Schema you can send to the model, (b) a runtime validator for the response,
            and (c) compile-time TypeScript types for the rest of your code. The
            <code>zod-to-json-schema</code> helper converts between the two formats.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Sample: customer support intent classifier.</strong> Build a Zod schema
            with five fields:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><code>category</code> &mdash; one of &ldquo;billing&rdquo;, &ldquo;technical&rdquo;, &ldquo;account&rdquo;, &ldquo;sales&rdquo;, &ldquo;feedback&rdquo;.</li>
            <li><code>urgency</code> &mdash; one of &ldquo;low&rdquo;, &ldquo;medium&rdquo;, &ldquo;high&rdquo;, &ldquo;critical&rdquo;.</li>
            <li><code>sentiment</code> &mdash; a number from -1.0 to 1.0.</li>
            <li><code>requires_human</code> &mdash; a boolean.</li>
            <li><code>summary</code> &mdash; a string, 20 to 200 characters.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Pass the schema, prompt with two or three labelled examples, and the model will
            return a JSON blob that conforms to the schema. Validation against the Zod schema
            takes one line and either gives you a typed object or a clean error to retry on.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Retry on validation failure</h3>
          <p className="mt-2 text-slate-700">
            Even with structured outputs, you may occasionally get a response that fails
            semantic validation (e.g. a number outside a valid range, an empty string where
            content was required). The pattern: wrap the call in a retry loop with a maximum
            of two retries; pass the validation error back into the prompt with the line
            &ldquo;The previous response failed validation: [error]. Return a corrected JSON
            object.&rdquo; Two retries handles 99% of cases. If three retries fail in a row,
            escalate to a human queue rather than burn tokens forever.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost implications</h3>
          <p className="mt-2 text-slate-700">
            Structured output mode is usually free of additional charge on OpenAI and Anthropic;
            on Gemini it is included in the per-token rate. Three cost notes for AU SMEs.
            First, schemas add input tokens; keep schemas as tight as possible. Second,
            including 2-3 worked examples in the prompt costs tokens but typically halves your
            retry rate &mdash; net win. Third, set <code>max_tokens</code> on the output so a
            schema with a string field cannot wander into a 500-word essay. On GPT-4o-mini,
            classifying 1,000 tickets at A$0.50 to A$1.50 total is a typical run.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance use case: audit-friendly outputs</h3>
          <p className="mt-2 text-slate-700">
            For ASIC-, TGA- or OAIC-regulated workflows, structured output is the right
            architecture. Each output is a row in a database with a known shape; you can
            query it (&ldquo;show me all loan-application AI decisions from Q1 2026 where
            sentiment was below -0.5&rdquo;), audit it (&ldquo;here are the five fields the
            model returned, here is the source input, here is the validation status&rdquo;),
            and reproduce it. Free-text outputs cannot give you any of that. We are now
            seeing AU banking, super and financial services teams require structured output
            as a precondition of any production AI workflow. The pattern: store the schema,
            store the input, store the output, store the validation result. That four-row
            log is the spine of an auditable system.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When not to use structured output</h3>
          <p className="mt-2 text-slate-700">
            Two cases. Long-form creative writing where the output is for human consumption.
            Open-ended Q&amp;A where any forced structure feels mechanical. For everything in
            between &mdash; classification, extraction, decision-making, summarisation that
            feeds a downstream step &mdash; the default should be structured.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Structured output is the foundation of every reliable AI workflow. Default to it unless output is for human reading only.',
              'OpenAI structured outputs guarantee schema conformance; Anthropic uses tools; Gemini uses response schemas.',
              'Zod gives you JSON Schema, runtime validator and TypeScript types from a single definition.',
              'Retry on validation fail with the error in context. Two retries handles 99% of cases; three failures means escalate to human.',
              'Cost: schemas add input tokens but cut retry rates. On GPT-4o-mini, A$0.50-1.50 to classify 1,000 tickets.',
              'Audit pattern: store schema, input, output, validation result. Four rows that make AI outputs auditable.',
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
            <p className="font-semibold text-slate-900">Exercise: Build the support classifier in OpenAI Playground</p>
            <p className="mt-2">
              Open the OpenAI Playground in chat mode with GPT-4o-mini.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>In the &ldquo;response format&rdquo; selector, choose &ldquo;json_schema&rdquo;.</li>
              <li>Paste a schema with the five fields above (category, urgency, sentiment, requires_human, summary).</li>
              <li>Add a system prompt: &ldquo;You classify AU SME support emails. Return JSON only.&rdquo;</li>
              <li>Add two examples (one billing, one technical) showing input and ideal JSON output.</li>
              <li>Run five real test emails. Inspect the JSON. Adjust the schema constraints until you get clean outputs 5/5.</li>
            </ol>
            <p className="mt-3">Twenty-five minutes from blank Playground to a working classifier. From there, wrapping it in code and Zod is another half hour.</p>
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
                1. What does OpenAI&rsquo;s structured outputs mode guarantee?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The model will never hallucinate</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The JSON returned conforms to your JSON Schema or the call fails</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The response will always be under 100 tokens</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Schema conformance. The model is constrained at decode time so the JSON parses cleanly against the schema you supplied.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why retry on validation failure rather than accept partial output?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because retries are free</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Passing the validation error back to the model usually fixes the issue in one or two retries</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Partial output is always corrupted</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Feeding the error back almost always fixes it. Two retries handles 99% of cases; after three, escalate to human review.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which four rows make an AI output auditable for AU regulators?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Schema, input, output, validation result</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Prompt, response, retry count, cost</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> User, timestamp, IP address, model name</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Schema, input, output, validation result. That set lets you reproduce, query and audit any AI-derived decision.</p>
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
              Evaluating prompt quality — move from guesswork to data
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Four eval dimensions (accuracy, relevance, format, cost), five tools, golden-set
              testing, A/B prompts in production, AU bias eval and a sample rubric.
            </p>
          </div>
          <Link
            href="/academy/prompt-engineering/lessons/evaluating-prompt-quality"
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
