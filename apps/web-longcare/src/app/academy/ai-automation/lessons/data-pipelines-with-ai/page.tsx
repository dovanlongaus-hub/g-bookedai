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
  title: 'AI in Data Pipelines — From Raw to Useful | AI Automation Lesson 7 | LongCare Academy',
  description:
    'Five sample AI pipelines for AU SMEs (web form to CRM, receipt to Xero, call to Slack, resume to ATS, Shopify order to fulfilment). Tool stacks, AUD economics per 1,000 events, and AU data residency notes.',
  path: '/academy/ai-automation/lessons/data-pipelines-with-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI in Data Pipelines — From Raw to Useful',
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

export default function DataPipelinesWithAiLessonPage() {
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
            { name: 'Data Pipelines with AI', url: '/academy/ai-automation/lessons/data-pipelines-with-ai' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 7 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI in data pipelines — from raw to useful
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Classification, extraction, summarisation, enrichment, dedup. Five jobs AI does
              brilliantly inside a pipeline — and five pipelines AU SMEs ship every quarter.
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
            The data pipeline shape
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={720} height={160} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Source &rarr; AI step &rarr; Validate &rarr; Destination &rarr; Monitor. Skipping
            validate is the most common reason pipelines fail in production.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five jobs AI does brilliantly inside a pipeline</h3>
          <p className="mt-2 text-slate-700">
            A traditional data pipeline moves data from a source to a destination, with rule-based
            transformations in the middle. AI fits naturally as a transformation step on tasks
            that are too messy for hand-written rules. The five jobs:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Classification</strong> — “is this email a sales lead, support request or spam?”</li>
            <li><strong>Extraction</strong> — “pull supplier name, total and GST from this PDF receipt.”</li>
            <li><strong>Summarisation</strong> — “turn this 30-minute call transcript into five bullet points.”</li>
            <li><strong>Enrichment</strong> — “given this company name, infer industry, size, region, and likely use case.”</li>
            <li><strong>Deduplication</strong> — “these two contact records refer to the same person — merge them.”</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tool stacks for AU SMEs</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Zapier + AI nodes</strong> — easiest for non-technical users. AI built into actions, AUD billing, simple monitoring. Best for under 1,000 runs/month.</li>
            <li><strong>Make + AI</strong> — visual scenario builder, good error branching. AUD billing, generally cheaper than Zapier at scale.</li>
            <li><strong>n8n + OpenAI/Gemini/Anthropic</strong> — self-hostable on AU infrastructure (AWS Sydney, Google Cloud Sydney). Wins for data residency. Steeper learning curve, biggest long-term saving.</li>
            <li><strong>Airbyte + Vertex AI</strong> — production data engineering. Best when you have real data volume (millions of rows) and a developer in the mix.</li>
            <li><strong>Pipedream + AI</strong> — code-first automation; powerful for developers who want full control.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five sample pipelines</h3>

          <h4 className="mt-4 font-semibold text-slate-900">Pipeline 1 — Web form to CRM</h4>
          <p className="mt-2 text-slate-700">
            Source: Webflow, Wix or Typeform contact form. AI step: classify (lead vs support vs
            partnership), extract (company size, industry, intent), enrich (LinkedIn metadata).
            Destination: HubSpot or Pipedrive CRM with full enrichment. Validation: required
            fields populated and confidence above 0.7. Tool: Zapier or Make. Cost: roughly
            <strong> A$0.06 per submission</strong>.
          </p>

          <h4 className="mt-4 font-semibold text-slate-900">Pipeline 2 — Receipt photo to Xero</h4>
          <p className="mt-2 text-slate-700">
            Source: forwarded email with photo, or Hubdoc capture. AI step: extract (supplier,
            ABN, line items, GST), classify (expense category). Destination: Xero bill.
            Validation: GST = total × 1/11; supplier matches existing contact. Tool: Make + Vertex
            AI or Zapier + GPT-4o. Cost: roughly <strong>A$0.03 per receipt</strong>.
          </p>

          <h4 className="mt-4 font-semibold text-slate-900">Pipeline 3 — Customer call to Slack</h4>
          <p className="mt-2 text-slate-700">
            Source: Aircall or Dialpad call recording. AI step: transcribe (Whisper or Gemini),
            summarise (key points, decisions, action items, sentiment). Destination: Slack channel
            and HubSpot deal. Validation: action items have owner and due date. Tool: n8n
            self-hosted in Sydney for sensitive calls; Make for general ones. Cost: roughly
            <strong> A$0.20 per 30-min call</strong>.
          </p>

          <h4 className="mt-4 font-semibold text-slate-900">Pipeline 4 — Resume PDF to ATS</h4>
          <p className="mt-2 text-slate-700">
            Source: Workable application or email. AI step: extract (experience, skills,
            education), score against JD (with redaction of name/age/photo first), summarise
            against rubric. Destination: ATS with score and human-review flag. Validation: required
            fields, confidence threshold, fairness sample audit. Tool: n8n or Pipedream. Cost:
            roughly <strong>A$0.15 per resume</strong>.
          </p>

          <h4 className="mt-4 font-semibold text-slate-900">Pipeline 5 — Shopify order to fulfilment</h4>
          <p className="mt-2 text-slate-700">
            Source: Shopify order webhook. AI step: tag (gift, repeat, fragile), classify
            (priority, location), enrich (likely delivery window, customer LTV). Destination:
            ShipStation or fulfilment 3PL with tagged routing. Validation: tags match SKU
            inventory; priority matches SLA. Tool: Zapier or Make. Cost: roughly
            <strong> A$0.02 per order</strong>.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost economics per 1,000 events</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Light AI step</strong> (classification only): A$15–A$25 per 1,000 events.</li>
            <li><strong>Medium AI step</strong> (classify + extract): A$30–A$60 per 1,000.</li>
            <li><strong>Heavy AI step</strong> (transcribe call + summarise): A$150–A$300 per 1,000.</li>
            <li><strong>Tool subscription</strong>: Zapier Pro around A$30–A$80/month, Make Pro around A$25–A$45/month, n8n self-host around A$30/month VM cost.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Rule of thumb for SMEs: total all-in cost should sit under 20% of the human time being
            saved. If a pipeline costs A$200/month and saves A$2,000/month of admin, that is an
            obvious yes. If it costs A$200/month and saves A$220, ditch it.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU data residency considerations</h3>
          <p className="mt-2 text-slate-700">
            Three categories of pipeline have residency implications.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Customer PII</strong> — names, emails, phone numbers in CRM pipelines. APP 8 (cross-border) applies. n8n self-hosted on AWS Sydney or GCP Sydney is the cleanest answer.</li>
            <li><strong>Health information</strong> — sensitive under APP 3. Avoid offshore processing entirely. Consider on-prem Ollama with open-weights models for high-stakes work.</li>
            <li><strong>Employee records</strong> — Privacy Act 1988 employee records exemption is narrow. Most candidate data is not exempt. Treat carefully.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Update your privacy policy with a “Data and AI processing” section listing the
            providers and regions you use. The OAIC has stated this is a baseline expectation in
            2026.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Error handling and monitoring</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Schema validation</strong> — every AI step output runs through Zod or Pydantic. Failed validations retry once, then human queue.</li>
            <li><strong>Confidence thresholds</strong> — outputs under 0.7 confidence go to human review.</li>
            <li><strong>Dead-letter queue</strong> — record every failure with the input that caused it. Use the queue as a test set for prompt improvements.</li>
            <li><strong>Daily metric</strong> — events processed, success rate, average cost, average latency. One Slack message a day.</li>
            <li><strong>Sampling</strong> — 5% of successful events still go to human spot-check during the first quarter; 1% thereafter.</li>
          </ul>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'AI shines on five pipeline jobs: classification, extraction, summarisation, enrichment, deduplication.',
              'Tool choice maps to skill: Zapier for non-tech, Make for visual builders, n8n for residency-sensitive workloads, Airbyte/Pipedream for engineering teams.',
              'Cost per 1,000 events: A$15–A$60 for text, A$150–A$300 for transcription. Stay under 20% of human time saved.',
              'For PII or health data, prefer n8n self-hosted on AWS Sydney or GCP Sydney. Update your privacy policy.',
              'Always validate AI output with schema and confidence thresholds. Failures go to a dead-letter queue, not silently lost.',
              'Sample 5% of successful events for human spot-check in the first quarter; 1% thereafter. Use the dead-letter queue as your test set.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 30 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build the receipt-to-Xero pipeline (or sketch it on paper)</p>
            <p className="mt-2">
              Even if you do not have Xero access yet, sketch the design.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Source: a forwarded email to <code>receipts@yourbusiness.com.au</code> with a photo attachment.</li>
              <li>AI step: extract supplier, ABN, line items, GST and total in JSON.</li>
              <li>Validation: GST &approx; total ÷ 11 (within A$0.05); supplier name matches Xero contacts (fuzzy).</li>
              <li>Destination: Xero draft bill via API. Set status to <code>Awaiting approval</code>.</li>
              <li>Monitor: Slack message with the extracted JSON and a “Review in Xero” link.</li>
              <li>Calculate cost per 100 receipts at A$0.03 each — A$3 to digitise a stack that would take half a day to enter manually.</li>
            </ol>
            <p className="mt-3">If you can build it in Make or Zapier today, do — the first 10 receipts will pay for the lesson.</p>
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
                1. Which tool is the best choice when AU data residency is critical?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Zapier</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> n8n self-hosted on AWS Sydney</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Make</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">n8n self-hosted on AWS Sydney or GCP Sydney. Other tools are hosted offshore by default.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the rule of thumb for pipeline cost vs time saved?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Cost should be at least 80% of saved time</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Cost should be under 20% of saved time</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Cost is irrelevant if it works</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Under 20% of saved time. If the pipeline costs A$200/month and saves A$2,000, ship it. If it saves A$220, ditch it.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What happens to AI step outputs that fail schema validation?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Silently dropped</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Retried once, then sent to a dead-letter queue and human review</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Forced through with default values</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Retried once, then dead-letter queue. The DLQ becomes your test set for prompt improvements.</p>
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
              Integrating AI with your existing AU SME stack
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The realistic mix of Xero, MYOB, HubSpot, Mailchimp, Outlook, Slack, M365 and
              Workspace — with six integration patterns and a decision matrix.
            </p>
          </div>
          <Link
            href="/academy/ai-automation/lessons/integration-with-existing-tools"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Coming soon
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
