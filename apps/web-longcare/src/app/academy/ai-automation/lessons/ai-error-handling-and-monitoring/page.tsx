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
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Workflow Error Handling & Monitoring — AI Automation Lesson 4 | LongCare Academy',
  description:
    'Five-layer defence for AI workflows: input validation, output validation, retries, fallback, monitoring. Specific errors, fixes, and AU compliance log retention.',
  path: '/academy/ai-automation/lessons/ai-error-handling-and-monitoring',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI Workflow Error Handling & Monitoring — Don&rsquo;t Trust, Verify',
  educationalLevel: 'Advanced',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI Automation',
    url: 'https://longcare.au/academy/ai-automation',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function AIErrorHandlingAndMonitoringLessonPage() {
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
            { name: 'AI Automation', url: '/academy/ai-automation' },
            { name: 'Error Handling & Monitoring', url: '/academy/ai-automation/lessons/ai-error-handling-and-monitoring' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 4 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Error handling &amp; monitoring &mdash; don&rsquo;t trust, verify
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The five-layer defence that keeps AI workflows reliable in production. Specific
              errors, specific fixes, and the AU compliance posture you can show to an auditor.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
              </a>
              <Link
                href="/academy/ai-automation"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroGovernance className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Five-layer defence
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={760} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Input validation &rarr; AI step &rarr; output validation &rarr; retry/fallback &rarr;
            monitor. Each layer catches a different class of failure.
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
              Transcript below contains every pattern, error, and fix the video covers.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why AI workflows fail</h3>
          <p className="mt-2 text-slate-700">
            Five common failure modes: <strong>rate limits</strong> (you hit the AI vendor&rsquo;s
            quota), <strong>hallucinations</strong> (confidently wrong output), <strong>schema
            changes</strong> (a downstream API renamed a field overnight), <strong>downstream
            outages</strong> (Slack or Stripe is down), and <strong>silent semantic
            drift</strong> (the model upgrade changed behaviour subtly). Each needs a different
            defence.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Layer 1 &mdash; input validation</h3>
          <p className="mt-2 text-slate-700">
            Before the AI step runs, validate the input. Required fields present? Email looks like
            an email? Free-text under your character cap? If the input is malformed, fail fast
            with a clear error, do not feed garbage to the AI. In Zapier you can add a Filter
            step; in n8n use the IF node; in code use Zod or similar.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Layer 2 &mdash; AI output validation</h3>
          <p className="mt-2 text-slate-700">
            After the AI responds, never trust the response shape blindly. Three checks:
            <strong>(a) schema check</strong> &mdash; does the JSON parse and contain the keys you
            asked for? <strong>(b) regex / value check</strong> &mdash; is &ldquo;urgency&rdquo; one
            of the allowed values? <strong>(c) sentinel check</strong> &mdash; does the output
            contain phrases like &ldquo;I cannot&rdquo;, &ldquo;I&rsquo;m unable&rdquo;, or
            &ldquo;[error]&rdquo; that suggest the model refused or failed?
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Layer 3 &mdash; retry with exponential backoff</h3>
          <p className="mt-2 text-slate-700">
            Transient errors (rate limits, brief timeouts) should retry. Use exponential backoff:
            wait 2 seconds, then 4, then 8, then 16, then 32, then give up. Never retry forever &mdash;
            you can rack up huge bills doing that. Three to five attempts max. Zapier handles
            this on most steps automatically; in n8n use the &ldquo;Continue on Fail&rdquo; toggle
            with a Wait node.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Layer 4 &mdash; fallback path</h3>
          <p className="mt-2 text-slate-700">
            When retries are exhausted, send to a human. The fallback path posts to a triage Slack
            channel with the original input, the error message, and a clear CTA to handle
            manually. Customers do not see a broken workflow; your team handles the long tail.
            This is the single most important pattern in AI workflows: <em>graceful
            degradation</em>.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Layer 5 &mdash; monitoring and alerts</h3>
          <p className="mt-2 text-slate-700">
            What gets measured gets fixed. Track three metrics: success rate (target 98%+), median
            latency, and error budget (how many failures per day before you escalate). Alerts via
            Slack are fine for SMEs; Sentry, Datadog, or Better Stack for larger teams. The
            cheapest reliable monitor is a daily summary email with run counts and error
            categories.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Specific error: &ldquo;rate limit exceeded&rdquo;</h3>
          <p className="mt-2 text-slate-700">
            Cause: too many requests in too short a window. Fix: exponential backoff plus a
            queue. For high-volume workflows, batch submissions and process in waves rather than
            one-by-one. Vendors generally publish their per-minute and per-day limits &mdash; size
            your queue around them.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Specific error: &ldquo;output isn&rsquo;t valid JSON&rdquo;</h3>
          <p className="mt-2 text-slate-700">
            Cause: the model wrapped its JSON in markdown fences, or hallucinated an extra
            comment. Fixes, in order: (1) add a one-line sample of clean JSON to the prompt, (2)
            switch to JSON mode if your model supports it, (3) add a &ldquo;reformat&rdquo; AI
            step that takes the raw output and produces clean JSON. Pattern (3) is the bullet-proof
            option but adds cost.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Specific error: &ldquo;hallucinated entity&rdquo;</h3>
          <p className="mt-2 text-slate-700">
            Cause: the model invented a customer name, product code, or reference number. Fix: do
            not let the model invent identifiers. Either ground the prompt with a list of valid
            options (RAG over your CRM) or post-process with a strict lookup. If the lookup fails,
            send to fallback.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools for monitoring</h3>
          <p className="mt-2 text-slate-700">
            <strong>Slack alerts</strong> via webhooks &mdash; A$0, instant, perfect for SMEs.
            <strong> Sentry</strong> &mdash; A$40/month team plan, captures stack traces and
            groups errors. <strong>Datadog</strong> &mdash; from A$30/month; full observability for
            larger teams. <strong>Better Stack</strong> (formerly Logtail) &mdash; A$30/month,
            elegant log management. Most AU SMEs start with Slack alerts and graduate when scale
            demands.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance &mdash; log retention</h3>
          <p className="mt-2 text-slate-700">
            Log retention requirements vary by industry: 7 years for tax records, 7 years for
            financial-services advice (ASIC), 5 years generally for ATO. For AI workflows that
            touch personal information, retain logs for at least 12 months as a baseline so you
            can answer breach-notification questions under the Privacy Act. Keep logs themselves
            free of unnecessary PII &mdash; redact emails and phone numbers in logs to limit
            blast radius if the log store is ever compromised.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five-layer defence: input validation, AI output validation, retries, fallback, monitoring.',
              'Validate AI output three ways: schema parse, value regex, sentinel-phrase scan.',
              'Exponential backoff (2s/4s/8s/16s/32s) — three to five retries, then give up.',
              'Graceful degradation: failed runs go to a triage channel, not silently disappear.',
              'Track success rate (target 98%+), median latency, and error budget per day.',
              'AU compliance: retain workflow logs 12 months minimum; redact PII before storing.',
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
            One short hands-on exercise. Total time: 15 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: harden last lesson&rsquo;s Zap</p>
            <p className="mt-2">
              Open the Zap you built in lesson 3. Add three things: (a) a Filter step that drops
              submissions where required fields are blank, (b) a Filter that catches AI outputs
              missing required keys, and (c) a fallback Slack message that fires if any prior step
              fails.
            </p>
            <p className="mt-3 italic">
              Send a deliberately broken submission. Watch the fallback fire. The first time it
              works, you understand graceful degradation deeper than most engineers do.
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
                1. What does &ldquo;graceful degradation&rdquo; mean?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The workflow runs slowly when overloaded</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Failed runs route to a human fallback rather than disappearing</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The AI uses a cheaper model on retry</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Failed runs route to a human fallback. The customer-facing experience never breaks.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why use exponential backoff for retries?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It looks more professional</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It gives the upstream service time to recover and avoids retry storms</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It reduces token cost</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">It gives upstream services time to recover and prevents retry storms that worsen the outage.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The minimum AU log retention recommendation in this lesson is...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 24 hours</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 12 months minimum, longer for finance</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> No retention required</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">12 months minimum, with longer retention for finance, tax, and regulated industries.</p>
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
              Lead qualification and nurture automations
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Multi-step nurture flows that keep warm leads engaged without spamming.
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

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/ai-automation"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Automation
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
