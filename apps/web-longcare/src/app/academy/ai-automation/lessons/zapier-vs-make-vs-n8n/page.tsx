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
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Zapier vs Make vs n8n — AI Automation Lesson 2 | LongCare Academy',
  description:
    'A practical, AU-focused side-by-side of Zapier, Make and n8n in 2026 — pricing in AUD, AU data residency, AI integration, security, decision flowchart, and 24-month TCO.',
  path: '/academy/ai-automation/lessons/zapier-vs-make-vs-n8n',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Zapier vs Make vs n8n — Which Workflow Tool For Your AU SME?',
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

type Row = {
  dimension: string;
  zapier: string;
  make: string;
  n8n: string;
};

const ROWS: Row[] = [
  {
    dimension: 'AUD pricing (typical SME plan, inc GST)',
    zapier: '~$45–80 / mo (Pro)',
    make: '~$15–35 / mo (Core/Pro)',
    n8n: '~$30 / mo Cloud, $0 self-host',
  },
  {
    dimension: 'Learning curve',
    zapier: 'Lowest — feels like Outlook rules',
    make: 'Medium — visual graph, more concepts',
    n8n: 'Highest — code-friendly, JS expressions',
  },
  {
    dimension: 'AU data residency',
    zapier: 'US/EU only — data leaves AU',
    make: 'EU primary — data leaves AU',
    n8n: 'Self-host in AU = full residency',
  },
  {
    dimension: 'AI integration',
    zapier: 'Native ChatGPT, Claude, Gemini steps',
    make: 'Native OpenAI/Anthropic + AI router module',
    n8n: 'Native + custom JS for any model API',
  },
  {
    dimension: 'Logging / debugging',
    zapier: 'Basic run history, paywalled retention',
    make: 'Excellent execution log with replay',
    n8n: 'Full debugger, breakpoints, JSON inspector',
  },
  {
    dimension: 'Marketplace ecosystem',
    zapier: '7,000+ apps — broadest',
    make: '2,000+ apps — solid',
    n8n: '900+ apps + arbitrary HTTP/cURL',
  },
  {
    dimension: 'Security / SSO',
    zapier: 'SSO on Team+, SOC2',
    make: 'SSO on Teams+, SOC2, ISO 27001',
    n8n: 'Self-host = your stack, SSO on Enterprise',
  },
];

export default function ZapierVsMakeVsN8nLessonPage() {
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
            { name: 'Zapier vs Make vs n8n', url: '/academy/ai-automation/lessons/zapier-vs-make-vs-n8n' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 2 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Zapier vs Make vs n8n — which workflow tool for your AU SME?
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The honest, AU-grounded comparison — pricing, data residency, AI integration, and a
              24-month TCO that most vendor sites would rather you not run.
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
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline comparison */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The three contenders, side by side
          </h3>
          <div className="flex justify-center">
            <InfographicComparison width={720} height={260} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Zapier — simplest. Make — most visual. n8n — most powerful and AU-native (when self-hosted).
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
              Live build of the same workflow in all three tools, plus a Cloud Run self-host walkthrough for n8n.
            </span>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Seven dimensions, three columns</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-3 pr-4 font-semibold text-slate-900">Dimension</th>
                  <th className="py-3 pr-4 font-semibold text-slate-900">Zapier</th>
                  <th className="py-3 pr-4 font-semibold text-slate-900">Make</th>
                  <th className="py-3 pr-4 font-semibold text-slate-900">n8n</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.dimension} className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-700 font-medium">{r.dimension}</td>
                    <td className="py-3 pr-4 text-slate-600">{r.zapier}</td>
                    <td className="py-3 pr-4 text-slate-600">{r.make}</td>
                    <td className="py-3 pr-4 text-slate-600">{r.n8n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Decision flowchart */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Decision flowchart — start here</h2>
          <p className="mt-2 text-slate-700">
            Walk down these questions in order. The first &ldquo;yes&rdquo; usually decides the tool for you.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700 space-y-2">
            <li><strong>Do you handle health data, financial advice, or anything where AU data residency is contractually required?</strong> &mdash; if yes, <strong>n8n self-hosted</strong> on Australian Cloud Run / GCP Sydney. Game over.</li>
            <li><strong>Is your team non-technical, with no developer on staff?</strong> &mdash; if yes, <strong>Zapier</strong>. The lowest-friction tool wins because the alternative is not building anything.</li>
            <li><strong>Do you want a visual canvas, AI router, and to pay less than Zapier?</strong> &mdash; if yes, <strong>Make</strong>.</li>
            <li><strong>Do you have a developer (or a developer-friendly operator), need custom JS, and want to avoid per-task pricing?</strong> &mdash; if yes, <strong>n8n Cloud</strong> (or self-hosted if you have devops).</li>
            <li><strong>Do you have an enterprise SSO + SOC2 + procurement requirement?</strong> &mdash; if yes, all three have a story; pick on price (Make wins) or ecosystem (Zapier wins).</li>
          </ol>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">Three sample workflows in each tool</h3>
          <p className="mt-2 text-slate-700"><strong>Zapier (easiest first build):</strong></p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>New Typeform submission &rarr; ChatGPT step (qualify lead) &rarr; Slack alert + HubSpot contact.</li>
            <li>New Stripe payment &rarr; create Xero invoice &rarr; email customer.</li>
            <li>New Gmail attachment &rarr; Drive save &rarr; Notion entry.</li>
          </ul>
          <p className="mt-2 text-slate-700"><strong>Make (best for branching logic):</strong></p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Webhook from website &rarr; AI router (route to Claude or Gemini by topic) &rarr; structured email reply.</li>
            <li>Daily scheduler &rarr; pull X bookings &rarr; aggregate &rarr; AI summary &rarr; email + Notion log.</li>
            <li>WhatsApp Business webhook &rarr; OpenAI &rarr; conditional reply or human handoff.</li>
          </ul>
          <p className="mt-2 text-slate-700"><strong>n8n (most flexible, especially self-hosted):</strong></p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Cron &rarr; PostgreSQL query &rarr; LLM step &rarr; write back to Postgres + push to Pub/Sub.</li>
            <li>SFTP file watcher &rarr; OCR &rarr; Claude extract structured data &rarr; Xero bill draft.</li>
            <li>Internal HTTP endpoint with auth &rarr; agent loop with tool calls &rarr; respond.</li>
          </ul>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">Migration path between them</h3>
          <p className="mt-2 text-slate-700">
            Most AU SMEs we work with start in Zapier (easy ramp), graduate one or two heavy
            workflows to Make for cost (Make&apos;s &ldquo;operations&rdquo; pricing is far cheaper at
            volume), and reserve n8n for workflows that handle sensitive data or need custom
            logic. There is no shame in using all three — they each cost less than a part-time
            staff member, and the right tool for each job is the cheapest path.
          </p>
          <p className="mt-2 text-slate-700">
            If you must pick one for the year, the answer for most AU SMEs in 2026 is <strong>Make</strong>.
            It hits the sweet spot of cost, learning curve, and AI native steps. Zapier is for
            non-technical founders who need their first automation today; n8n is for teams with a
            developer or a residency requirement.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">24-month TCO — typical 1,000-runs/month load</h3>
          <p className="mt-2 text-slate-700">
            Assume a workflow that fires 1,000 times a month and uses two AI calls per run.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Zapier Pro</strong>: ~AUD&nbsp;$80/mo subscription + AI is paywalled per task = ~$2,200 over 24 months before AI costs.</li>
            <li><strong>Make Core/Pro</strong>: ~AUD&nbsp;$25/mo subscription + 10,000 ops + AI router pass-through = ~$650 over 24 months + your OpenAI bill.</li>
            <li><strong>n8n Cloud Starter</strong>: ~AUD&nbsp;$30/mo + unlimited workflow steps + your OpenAI bill = ~$760 over 24 months.</li>
            <li><strong>n8n self-hosted on Cloud Run (Sydney)</strong>: ~AUD&nbsp;$15/mo Cloud Run + free n8n + your OpenAI bill = ~$380 over 24 months, plus your dev time.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Hidden costs: Zapier multi-step + premium app fees often double the headline price.
            Make is honest about ops; you will not be surprised. n8n self-host has the lowest
            cash but the highest dev hours — count your time at $100/hour and the picture changes.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Zapier wins on ease, ecosystem, and time-to-first-Zap; loses on price at volume.',
              'Make wins on visual canvas, branching, and best-bang-for-AUD for AI-heavy workflows.',
              'n8n wins on flexibility and AU data residency when self-hosted in Sydney.',
              'AU residency requirement = n8n self-host. No exceptions if your contract says so.',
              'Most growing SMEs end up using two of the three; the right tool varies per workflow.',
              'For 1,000 runs/month, Make is roughly 3x cheaper than Zapier and 2x easier than n8n.',
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
            <p className="font-semibold text-slate-900">Exercise: Build the same workflow in two tools</p>
            <p className="mt-2">
              Pick one workflow you actually need: e.g., &ldquo;new email with attachment &rarr;
              save to Drive &rarr; Notion entry with AI summary&rdquo;.
            </p>
            <p className="mt-3">
              Sign up for free trials of <strong>Zapier</strong> and <strong>Make</strong>. Build
              the same workflow in both. Time yourself. Note three things:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Time-to-first-success in each tool.</li>
              <li>How clear the run logs are when you intentionally break a step.</li>
              <li>Cost projection at 1,000 runs/month.</li>
            </ol>
            <p className="mt-3">
              Whichever tool felt better to <em>you</em> is the right one to start with. The data
              from your own hand beats any blog comparison — including this one.
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
                1. You handle Australian health data and your contract requires AU data residency. Best tool?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Zapier on Pro plan</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Make Teams plan</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> n8n self-hosted in Sydney</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">n8n self-hosted in Sydney. Zapier and Make process data outside AU.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. For a non-technical founder building their first &ldquo;form &rarr; AI &rarr; CRM&rdquo; flow, the right starting tool is&hellip;
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> n8n self-hosted</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Zapier</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Custom-built Node.js script</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Zapier. Lowest learning curve = highest chance of finishing the project.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The cheapest 24-month option for 1,000 runs/month with no dev time available is&hellip;
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Zapier Pro</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Make Core/Pro</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> n8n self-hosted</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Make Core/Pro — n8n self-hosted is cheaper in cash but expensive in dev time, which we excluded for this question.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 3</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Building chatbots without code
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              From a Typeform-quality form to a deployable, on-brand chatbot in an afternoon.
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
