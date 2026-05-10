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
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { InfographicStack } from '@/components/illustrations/infographic-stack';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Cost & Rate Limits — Don’t Get Surprised by AI Bills | AI Automation Lesson 6 | LongCare Academy',
  description:
    'Token economics 101, AUD pricing for OpenAI, Gemini, Claude, five cost-saving tactics, rate-limit strategies, and a monthly cost projection for 1,000-run workloads.',
  path: '/academy/ai-automation/lessons/cost-and-rate-limit-management',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Cost & Rate Limits — Don’t Get Surprised by AI Bills',
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

export default function CostAndRateLimitManagementLessonPage() {
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
            { name: 'Cost & Rate Limits', url: '/academy/ai-automation/lessons/cost-and-rate-limit-management' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 6 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Cost &amp; rate limits &mdash; don&rsquo;t get surprised by AI bills
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Token economics in plain English, AUD pricing across OpenAI, Gemini and Claude,
              five tactics to halve your AI bill, and the kill switches every AU SME should set
              before going live.
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

      {/* Inline infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Cost layers &mdash; model, tokens, retries, monitoring
          </h3>
          <div className="flex justify-center">
            <InfographicStack width={720} height={300} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Every AUD you spend on AI sits in one of four layers. Optimise each.
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
              Walk-through screencast in production. The transcript below covers every tactic.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Token economics 101</h3>
          <p className="mt-2 text-slate-700">
            Every AI call has two costs: <strong>input tokens</strong> (what you sent) and
            <strong> output tokens</strong> (what came back). A token is roughly 0.75 of an
            English word, so 100 words is about 130 tokens. Vendors price per 1,000 tokens (or
            1 million for billing). Output is usually 2&ndash;3&times; more expensive than input.
            For most SME automations, output is the dominant cost.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AUD pricing snapshot (mid-2026)</h3>
          <p className="mt-2 text-slate-700">
            Prices are approximate and shift quarterly &mdash; always check the vendor page
            before committing.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>OpenAI GPT-5 mini.</strong> Input ~AUD $0.45 / 1M tokens, output ~AUD $1.80 / 1M tokens. Good default for most automations.</li>
            <li><strong>OpenAI GPT-5.</strong> Input ~AUD $4.50 / 1M, output ~AUD $18.00 / 1M. Use only when reasoning quality justifies the 10&times; bump.</li>
            <li><strong>Gemini 2.5 Flash.</strong> Input ~AUD $0.30 / 1M, output ~AUD $1.50 / 1M. Cheapest of the major models for most tasks.</li>
            <li><strong>Gemini 2.5 Pro.</strong> Input ~AUD $1.80 / 1M, output ~AUD $11.00 / 1M.</li>
            <li><strong>Claude 4 Haiku.</strong> Input ~AUD $0.40 / 1M, output ~AUD $2.00 / 1M.</li>
            <li><strong>Claude 4 Sonnet.</strong> Input ~AUD $4.50 / 1M, output ~AUD $22.00 / 1M.</li>
            <li><strong>Claude 4 Opus.</strong> Input ~AUD $22.00 / 1M, output ~AUD $110.00 / 1M. Reserve for the hardest reasoning.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">&ldquo;Token leak&rdquo; patterns to avoid</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Recursive loops.</strong> Agent calls itself without exit condition. Always cap step count.</li>
            <li><strong>Oversized context.</strong> Pasting a 50-page PDF when you only need three pages. Pre-extract.</li>
            <li><strong>Duplicate calls.</strong> Same prompt run twice because of a retry bug. Cache or deduplicate.</li>
            <li><strong>Verbose prompts.</strong> Lengthy system prompts repeated on every call. Trim.</li>
            <li><strong>Non-streaming reads.</strong> Receiving the full output before logging. Stream and abort early when possible.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five cost-saving tactics</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Cache responses.</strong> If 30% of inputs repeat, cache the answer. Helicone, LangSmith, and built-in vendor caches handle this.</li>
            <li><strong>Batch requests.</strong> OpenAI Batch API is 50% cheaper for non-urgent jobs (BAS prep, weekly summaries, overnight document processing).</li>
            <li><strong>Smaller model first, escalate only when needed.</strong> Try Gemini Flash. If output quality fails a confidence check, re-run with Pro. Most calls succeed at the cheap tier.</li>
            <li><strong>RAG instead of giant context.</strong> Don&rsquo;t paste a 100-page manual. Embed it once, retrieve only the relevant 500 words per query. Saves 80%+ tokens.</li>
            <li><strong>Exit early on simple cases.</strong> If the input is &ldquo;hi&rdquo; or &ldquo;thanks&rdquo;, don&rsquo;t call AI &mdash; respond from a template.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Rate limit handling</h3>
          <p className="mt-2 text-slate-700">
            All vendors enforce per-minute and per-day rate limits. When you exceed them, the API
            returns 429 errors. Three strategies:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Exponential backoff.</strong> On 429, wait 1s, 2s, 4s, 8s before retrying. Most SDKs do this for you.</li>
            <li><strong>Queue.</strong> Push requests into a queue; workers pull at a steady rate. AWS SQS, Pub/Sub, or even a Sheets-based queue for low volume.</li>
            <li><strong>Multi-key rotation.</strong> Distribute across multiple API keys/projects. Be cautious &mdash; vendors discourage this and may flag accounts.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Hard cost limits and kill switches</h3>
          <p className="mt-2 text-slate-700">
            <strong>Set spend caps in vendor consoles.</strong> OpenAI: usage limits. Google
            Cloud: billing budget alerts. Anthropic: monthly spend cap. Set both a soft alert (at
            50% of monthly budget) and a hard kill switch (at 110%). Without these, a runaway
            loop can ring up a four-figure bill overnight.
          </p>
          <p className="mt-2 text-slate-700">
            Also wire a webhook from your billing alert to Slack or SMS so a human notices in
            minutes, not days.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Monitoring tools</h3>
          <p className="mt-2 text-slate-700">
            <strong>OpenAI usage dashboard.</strong> Free, included. Per-day spend, per-key
            breakdowns. Bookmark it.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Vertex AI billing alerts.</strong> Configure on the Cloud Billing page. Email
            and Pub/Sub channels.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Helicone.</strong> Free tier, then about <strong>AUD&nbsp;$30/month</strong>.
            Drop-in proxy for OpenAI and Anthropic that adds caching, observability, and per-user
            attribution.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>LangSmith.</strong> Free dev tier, <strong>~AUD&nbsp;$60/month</strong> Plus.
            For LangChain users; rich tracing and evaluation.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Monthly cost projection &mdash; 1,000 runs</h3>
          <p className="mt-2 text-slate-700">
            Imagine a 5-step lead-enrichment agent that runs 1,000 times a month. Average input:
            500 tokens; average output: 200 tokens; AI nodes per run: 2. Using Gemini 2.5 Flash:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Input tokens: 500 &times; 2 &times; 1,000 = 1,000,000 tokens &rarr; ~AUD $0.30</li>
            <li>Output tokens: 200 &times; 2 &times; 1,000 = 400,000 tokens &rarr; ~AUD $0.60</li>
            <li><strong>AI fees:</strong> ~AUD $0.90/month</li>
            <li>Plus Make.com: AUD $30/month, plus ABR enrichment: AUD $20/month</li>
            <li><strong>Total:</strong> ~AUD $51/month for a 1,000-run agent</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Same workload on Claude 4 Sonnet would be ~AUD $13/month in AI fees alone &mdash;
            still well below the human cost of doing the work manually, but worth being deliberate
            about model choice.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Output tokens cost 2–3× input — output dominates the bill on most automations.',
              'Smaller model first; escalate only when quality fails. Most calls succeed at the cheap tier.',
              'Five cost-saving tactics: cache, batch, smaller-first, RAG, exit-early.',
              'Always set hard spend caps + alerts in OpenAI, Vertex, and Anthropic consoles.',
              'Use Helicone for caching and observability — drop-in proxy with low overhead.',
              '1,000-run/month agents on Gemini Flash cost roughly AUD $1 in AI fees — but $30+ in tool fees.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 20 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Set spend caps and projection-model your usage</p>
            <p className="mt-2">
              Open your OpenAI usage page (or Google Cloud Billing or Anthropic console). Look at
              last 30 days&rsquo; spend. Set:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>A soft alert at 1.5&times; last month&rsquo;s spend.</li>
              <li>A hard cap at 3&times; last month&rsquo;s spend.</li>
              <li>A webhook to Slack or email so you&rsquo;re notified within minutes.</li>
            </ol>
            <p className="mt-3">
              Project next quarter: estimate runs/month for each agent you operate, multiply by
              average tokens, multiply by model price. Compare to budget. If you don&rsquo;t have
              this number, you don&rsquo;t have a budget.
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
                1. Which is more expensive per token: input or output?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Input</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Output</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> They&rsquo;re identical</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Output &mdash; usually 2&ndash;3&times; the input price across major vendors.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What does &ldquo;smaller model first&rdquo; mean as a cost tactic?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Always use the cheapest model regardless of quality</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Try the cheap tier; escalate only when quality check fails</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Use the smallest available context window</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Try the cheap tier; escalate only when quality check fails. Most calls succeed cheap.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why set both a soft alert AND a hard cap?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Vendors require both</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Soft warns you, hard prevents catastrophic overspend</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> They&rsquo;re the same setting</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Soft warns you to investigate; hard kills runaway loops before they ring up four-figure bills.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 7</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Lead qualification and nurture automations
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Coming Q3 2026.
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
            Lesson library
          </Link>
        </div>
      </section>
    </main>
  );
}
