import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Workflow,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Event-Driven AI Workflows — AI Automation Lesson 11 | LongCare Academy',
  description:
    'Move from sequential automations to event-driven AI workflows. Webhooks, file uploads, calendar and payment triggers, Google Cloud Pub/Sub, an AU invoice-to-Xero example with retries and dead-letter queues, and the latency-versus-cost tradeoff.',
  path: '/academy/ai-automation/lessons/event-driven-workflows',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Event-Driven AI Workflows',
  educationalLevel: 'Advanced',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function EventDrivenWorkflowsLessonPage() {
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
            { name: 'Event-Driven Workflows', url: '/academy/ai-automation/lessons/event-driven-workflows' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 11 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Event-driven AI workflows
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Sequential automations run on a schedule. Event-driven workflows run when
              something real happens &mdash; an invoice lands, a payment clears, a customer
              messages. Reaction time drops from minutes to seconds; cost per run usually
              drops too.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/ai-automation/lessons/scaling-from-pilot-to-production"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/academy/ai-automation"
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
            Event &rarr; Subscribe &rarr; Process &rarr; Branch &rarr; Action
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={720} height={160} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            The same five beats every event-driven workflow follows. The discipline is in
            making each beat idempotent and observable.
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
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sequential vs event-driven</h3>
          <p className="mt-2 text-slate-700">
            Most AU SMEs start AI automation in a sequential model. A schedule runs every
            15 minutes, polls inboxes, fetches new records, processes them, and writes them
            back. It works, but it has two downsides. It always lags behind real time. And
            it runs even when there is nothing to do, burning compute and API spend.
            Event-driven workflows turn the model inside out. Instead of polling, your
            workflow listens. A new event arrives (a Stripe payment succeeds, an invoice
            email lands, a customer fills a form), an event is published, subscribers react.
            Reaction time falls from up to 15 minutes to under five seconds, and you stop
            paying for empty polls.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Events as triggers</h3>
          <p className="mt-2 text-slate-700">
            Four common event sources in AU SME builds. <strong>Webhooks</strong> are the
            most common: Stripe, Xero, MYOB, HubSpot, Calendly, Tally and most SaaS now offer
            them. <strong>File uploads</strong> to Google Drive or Dropbox can trigger
            workflows on a new PDF or image. <strong>Calendar</strong> events (Google
            Calendar, Outlook) trigger before or after meetings. <strong>Payment events</strong>
            (Stripe, Square, Tyro, AfterPay) trigger reconciliation and customer comms.
            Most no-code tools (Zapier, Make, n8n) support all four; Cloud Pub/Sub on Google
            Cloud underpins production systems.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cloud Pub/Sub on Google Cloud</h3>
          <p className="mt-2 text-slate-700">
            For volumes above a few hundred events per day, or when you want one event to
            fan out to multiple subscribers, Cloud Pub/Sub is the AU-region-available, paid
            backbone (Sydney australia-southeast1 region) we recommend. Publish an event with
            one HTTP call; any number of subscribers (Cloud Functions, Cloud Run services,
            BigQuery streams) can react. Pricing in AUD is roughly A$0.060 per million
            messages plus A$0.012 per GB. A 10,000-event-per-day SME workflow costs cents per
            month at message volumes; the compute that processes them is the real spend.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU SME worked example</h3>
          <p className="mt-2 text-slate-700">
            <strong>Invoice received &rarr; AI categorise &rarr; Xero &rarr; Slack notify.</strong>
            Here is the full flow for a Melbourne wholesale business processing about 150
            supplier invoices a week.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Event</strong> &mdash; supplier emails an invoice PDF to invoices@business.com.au. A Cloud Function listening to Gmail Push publishes &ldquo;invoice.received&rdquo; on Pub/Sub.</li>
            <li><strong>Subscribe</strong> &mdash; the &ldquo;invoice-processor&rdquo; service receives the event and downloads the PDF.</li>
            <li><strong>Process</strong> &mdash; Gemini 1.5 with structured output extracts vendor, ABN, GST status, line items, total, due date. Validates against Zod schema.</li>
            <li><strong>Branch</strong> &mdash; if total &lt; A$2,000 and matches a known supplier, auto-approve. Otherwise, queue for human review.</li>
            <li><strong>Action</strong> &mdash; auto-approved invoices flow to Xero via the API as draft bills with the AI&rsquo;s extracted fields. A Slack message in #accounts notifies the bookkeeper with a link to review.</li>
          </ol>
          <p className="mt-2 text-slate-700">
            End-to-end latency: usually under 12 seconds. AUD cost per invoice: about A$0.04
            on Gemini 1.5 Flash. Time saved: about three hours of manual data entry per
            week. A six-month-payback build.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Retries and dead-letter queues</h3>
          <p className="mt-2 text-slate-700">
            Real-world events fail. A Xero API call times out. The AI returns invalid JSON.
            Slack is briefly down. Build retries from day one. Pub/Sub supports automatic
            retry with exponential backoff (1s, 2s, 4s, 8s, 16s, 32s, 64s). After the maximum
            attempts (we recommend 5 to 7), the message goes to a dead-letter queue &mdash; a
            separate topic that humans inspect at the end of each day. The dead-letter queue
            is the single most important piece of operational hygiene in event-driven
            workflows; without it, errors silently disappear and you find out months later
            that one supplier never got their invoice processed.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Latency vs cost tradeoff</h3>
          <p className="mt-2 text-slate-700">
            Event-driven workflows give you two dials. Cold-start latency &mdash; how long
            from event-arrived to processing-starts &mdash; depends on whether your function
            is &ldquo;warm&rdquo; (sub-second) or had to spin up (1-3 seconds for Cloud
            Functions, 200-800ms for Cloud Run). Keep a function warm and you pay for idle
            time; let it sleep and the first event of the day is slow. For SME volumes, a
            single &ldquo;min instances: 1&rdquo; on Cloud Run at about A$15/month is usually
            the right tradeoff. AI model cost dominates compute; choose the cheapest model
            that meets your accuracy bar (Gemini 1.5 Flash and GPT-4o-mini are the typical
            AU SME workhorses at A$0.10-0.30 per 1M input tokens).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Testing event flows</h3>
          <p className="mt-2 text-slate-700">
            Three habits. First, never test only the happy path. Build a test event for every
            failure mode (bad PDF, invalid GST, missing fields, timeout) and run them weekly.
            Second, run your dev workflow against the prod event topic in &ldquo;observe
            only&rdquo; mode for a week before flipping the switch &mdash; you will see real
            traffic patterns you cannot synthesise. Third, every workflow should support a
            replay command: rerun any dead-lettered event after a fix, idempotently. Without
            idempotency, retries double-write to Xero or double-Slack the team.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Event-driven workflows cut reaction time from minutes to seconds and stop you paying for empty polls.',
              'Four common AU SME triggers: webhooks, file uploads, calendar events, payment events.',
              'Cloud Pub/Sub in australia-southeast1 is the AU-region-available backbone. A 10K event/day workflow costs cents in messaging.',
              'Five-beat pattern: event, subscribe, process, branch, action. Each beat must be idempotent and observable.',
              'Dead-letter queue is non-negotiable. Without it, errors silently disappear and trust collapses.',
              'For SME volumes, min-instances: 1 on Cloud Run (~A$15/mo) is the right cold-start tradeoff.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 45 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Wire one webhook into an AI workflow</p>
            <p className="mt-2">
              Pick one external system you use (Stripe, Xero, Calendly, Tally).
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Find the webhook docs. Identify the event you want to react to (payment succeeded, invoice created, booking made).</li>
              <li>Set up a Make or n8n workflow listening on the webhook URL.</li>
              <li>Add an AI step (OpenAI or Gemini) to classify, summarise or extract from the event.</li>
              <li>Add a downstream action (post to Slack, write to Sheet, draft an email).</li>
              <li>Trigger the source system to fire a real event. Confirm end-to-end latency under 10 seconds.</li>
            </ol>
            <p className="mt-3">Your first event-driven workflow live in under an hour. Repeat the pattern for every system you operate.</p>
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
                1. What is the biggest operational risk in any event-driven workflow without a dead-letter queue?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Latency spikes</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Errors silently disappear and you find out months later</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The bill goes up</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Silent failure. A dead-letter queue surfaces failed events for human inspection so trust does not collapse.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why does event-driven typically cost less per run than sequential polling?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because AI is cheaper in event mode</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> You stop paying for polls that find nothing to do</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Pub/Sub is free</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">You stop paying for empty polls. Compute and API calls only happen when there is real work.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why must every step in an event-driven workflow be idempotent?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Because retries are inevitable; without idempotency you double-write to downstream systems</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Because Pub/Sub requires it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Because AI cannot retry</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Retries are inevitable. Without idempotency, the same event processed twice will double-create the Xero bill or double-Slack the team.</p>
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
              Scaling AI from pilot to production
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Five maturity stages from manual to full autopilot, when to graduate each stage,
              SLAs as guardrails, cost projection at 10x/100x/1000x, AU compliance audit trail
              and the rollback plan.
            </p>
          </div>
          <Link
            href="/academy/ai-automation/lessons/scaling-from-pilot-to-production"
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
            href="/academy/ai-automation"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Automation
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
