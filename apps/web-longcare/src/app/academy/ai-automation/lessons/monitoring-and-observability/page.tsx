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
import { InfographicStack } from '@/components/illustrations/infographic-stack';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Monitoring AI Workflows — AI Automation Lesson 9 | LongCare Academy',
  description:
    'Four dimensions to monitor, five must-have alerts, silent-failure detection, on-call rota for AU SMEs, and Helicone vs Langfuse vs Datadog tool comparison.',
  path: '/academy/ai-automation/lessons/monitoring-and-observability',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Monitoring AI Workflows — See Failures Before Customers Do',
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

export default function MonitoringLessonPage() {
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
            { name: 'Monitoring & Observability', url: '/academy/ai-automation/lessons/monitoring-and-observability' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 9 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Monitoring AI workflows — see failures before customers do
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Four dimensions, five must-have alerts, silent-failure detection, an SME-sized
              on-call rota, and the free + paid observability stack for AU automation builders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Mark complete &mdash; coming soon
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

      {/* Inline stack */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Logs &rarr; Metrics &rarr; Alerts &rarr; Dashboards
          </h3>
          <div className="flex justify-center">
            <InfographicStack width={720} height={300} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Each layer feeds the next. Skip the bottom and the top is fiction.
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
              Walks through Zapier history, Helicone, Langfuse, and an SME dashboard. Transcript
              covers everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Four dimensions to monitor</h3>
          <p className="mt-2 text-slate-700">
            Every AI workflow in production lives or dies along four axes. Track all four or you
            are flying blind.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Latency.</strong> How long does each step take? p50, p95, p99. AI calls are network calls and have long tails — a step that usually returns in 1.2s can hit 8s on a bad day.</li>
            <li><strong>Error rate.</strong> What fraction of runs failed (HTTP errors, parsing errors, downstream API errors)? Baseline first, then alert on deviations.</li>
            <li><strong>Cost.</strong> AUD per run, by step. The unsubtle reason AI bills surprise you is no one is watching the metre. Track per-run cost and alert on spikes.</li>
            <li><strong>Quality.</strong> Is the AI output correct? Plausibly wrong outputs are the silent killer — you need sampling or golden-test checks (see below).</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Free observability tools</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Zapier built-in logs.</strong> Task History tab. Filter by status, by Zap, by time. Free with any account. Adequate for &lt;500 runs/month.</li>
            <li><strong>Make Execution History.</strong> Run inspector with input/output for every module. Free tier keeps 7 days. Best in class for visual debugging.</li>
            <li><strong>n8n Executions.</strong> Self-hosted gives you unlimited retention. Search by status, workflow, time.</li>
            <li><strong>Cloud provider logs.</strong> Google Cloud Logging, AWS CloudWatch, Azure Monitor. Free tier covers most SME volumes.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Paid observability tools (purpose-built for AI)</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Helicone.</strong> Proxy in front of OpenAI/Anthropic calls. Captures every prompt, response, latency, cost. From around AUD $30/month for SMEs. Fast setup — change one line of code.</li>
            <li><strong>Langfuse.</strong> Open-source LLM observability. Self-host free, cloud from around AUD $90/month. Best for multi-step chains and agents.</li>
            <li><strong>Datadog LLM Observability.</strong> Heavyweight, integrates with broader infrastructure monitoring. From AUD $30/host/month plus per-event charges. For SMEs already on Datadog.</li>
            <li><strong>LangSmith.</strong> LangChain&apos;s native tool. Free tier for individuals, AUD $60+ per seat for teams.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five alerts to set up first</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Cost spike.</strong> Daily AI spend &gt; 150% of trailing 7-day average &rarr; Slack #ops + email. Catches runaway prompts and infinite loops.</li>
            <li><strong>Error rate spike.</strong> Error rate &gt; 5% over 15-minute window &rarr; Slack. Catches model outages, schema drift, prompt regressions.</li>
            <li><strong>Latency p95 breach.</strong> p95 latency &gt; SLA target (e.g. 5 seconds) for 10 minutes &rarr; Slack. Catches provider degradation early.</li>
            <li><strong>Success rate drop.</strong> Workflow success rate &lt; 95% over 1 hour &rarr; Slack + PagerDuty if customer-facing. Catches downstream failures.</li>
            <li><strong>Downstream API down.</strong> Any 5xx from Xero/Stripe/CRM &gt; 3 in 5 minutes &rarr; Slack. The integration is usually the first to fail.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Silent failures: AI returns plausible but wrong output</h3>
          <p className="mt-2 text-slate-700">
            The most dangerous AI failure looks like success — the workflow ran, the response
            parsed, the action fired. But the AI extracted the wrong invoice number, categorised
            the wrong lead, or summarised the wrong meeting. None of your standard metrics fire.
            Three defences.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Sampling.</strong> 1-2% of all runs get pulled into a daily human review queue. Costs ~30 minutes/week, catches systemic prompt drift.</li>
            <li><strong>Golden tests.</strong> 20-50 known input/output pairs that you re-run daily as a synthetic test. Score the AI&apos;s outputs against expected. Alert when score drops &gt;5%.</li>
            <li><strong>Cross-model check.</strong> For high-value runs (refund &gt; $500, contract clauses), run the same prompt through a second model and alert on disagreement &gt; threshold.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sample dashboard for an AU SME</h3>
          <p className="mt-2 text-slate-700">
            One screen, four panels: <strong>runs per hour</strong> with the rolling 24h trend;
            <strong> error rate</strong> by Zap; <strong>AUD spend</strong> today vs trailing 7-day
            average; <strong>top 5 failing steps</strong>. Built in Datadog, Grafana, or even
            Looker Studio against BigQuery exports of Zapier history. Refresh every 5 minutes. The
            on-call person glances at this once an hour and the team reviews it at standups.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">On-call rota for SMEs</h3>
          <p className="mt-2 text-slate-700">
            Small team realities: nobody can be on call 24/7 and you do not need to be. A practical
            AU SME on-call shape: <strong>business hours</strong> coverage by a 2-person rotation
            (one primary, one backup) on weekly handover; alerts route to Slack with phone fallback
            via PagerDuty free tier. <strong>After hours</strong>, only customer-facing high-value
            workflows page anyone — internal workflows wait until next business day. Document the
            top 5 incidents and the runbook for each so the on-call person can resolve at 9am
            without needing the original builder.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU SOC analogues</h3>
          <p className="mt-2 text-slate-700">
            Most AU SMEs cannot afford a Security Operations Centre. The closest analogue: an
            external MSSP (managed security service provider) for security-only coverage; pair it
            with your own SME observability stack for AI workflow coverage. The CyberCX, NCC
            Group, Telstra Cyber, and Australian boutique MSSPs all do hourly-billed retainers from
            AUD $1,500/month for SMEs. For pure AI workflow oncall, your own 2-person rotation
            backed by Helicone alerts is sufficient through about 50 staff or 50,000 runs/month.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Four monitoring dimensions: latency, error rate, cost, quality. Track all four or you are flying blind.',
              'Free is enough at SME volumes — Zapier History, Make Execution, n8n, GCP Logging. Upgrade to Helicone or Langfuse when complexity warrants.',
              'Five must-have alerts: cost spike, error spike, latency p95, success rate drop, downstream API down.',
              'Silent failures (plausible but wrong output) are the killer — defend with sampling, golden tests, and cross-model checks.',
              'SME on-call: 2-person business-hours rotation, after-hours pages only for customer-facing high-value workflows.',
              'Build a 4-panel SME dashboard in Datadog/Grafana/Looker Studio — refresh every 5 minutes, review at standups.',
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
            <p className="font-semibold text-slate-900">Exercise: light up the five alerts</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pick your most important live AI workflow (today, not eventually).</li>
              <li>Sign up for Helicone free tier. Add the proxy line to your OpenAI/Anthropic calls.</li>
              <li>Set up the five alerts from the transcript. Route to a Slack channel called #ai-ops.</li>
              <li>Manually trigger a failure (break the prompt schema for one run) and confirm the alert fires.</li>
              <li>Build a tiny dashboard: runs/hour, error rate, AUD/day, top failing step. Bookmark it.</li>
              <li>Document a 1-page runbook: top 3 failures and the fix for each.</li>
            </ol>
            <p className="mt-3">
              You are now on the right side of customer-discovered failures.
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
                1. Which is the &quot;silent killer&quot; failure mode for AI workflows?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Plausible but wrong output</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> HTTP 500 errors</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Latency over 5 seconds</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Plausible but wrong output. Defend with sampling, golden tests, and cross-model checks.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which alert catches runaway prompts and infinite loops?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Latency p95 breach</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Cost spike alert (daily &gt; 150% of trailing 7-day average)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Downstream API down</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Cost spike. Runaway prompts and loops burn AUD before they break anything else.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the right on-call shape for an SME running AI workflows?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 24/7 with PagerDuty for every alert</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 2-person business-hours rotation; after-hours only for customer-facing high-value workflows</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> No on-call at all</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">2-person rotation with selective after-hours paging. Sustainable, sufficient for most SMEs.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 10</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AU SME AI automation case studies — 5 real examples
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Five anonymised AU SME case studies — logistics, hospitality, SaaS, medical, trades —
              with architecture, results and lessons learned.
            </p>
          </div>
          <Link
            href="/academy/ai-automation/lessons/ai-automation-case-studies-au"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue path <ArrowRight className="size-4" />
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
