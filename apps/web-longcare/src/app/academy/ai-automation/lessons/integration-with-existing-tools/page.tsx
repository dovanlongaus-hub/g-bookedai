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
  title: 'Integrating AI With Your Existing AU SME Stack | AI Automation Lesson 8 | LongCare Academy',
  description:
    'Six integration patterns mapping AI to the realistic AU SME stack — Xero, MYOB, HubSpot, Mailchimp, Outlook, Slack, M365, Workspace. Decision matrix, AU data flow notes and a stack-mapping exercise.',
  path: '/academy/ai-automation/lessons/integration-with-existing-tools',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Integrating AI With Your Existing AU SME Stack',
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

export default function IntegrationWithExistingToolsLessonPage() {
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
            { name: 'Integration With Existing Tools', url: '/academy/ai-automation/lessons/integration-with-existing-tools' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 8 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Integrating AI with your existing AU SME stack
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Most AU SMEs already run Xero, MYOB, HubSpot, Mailchimp, Outlook, Slack and
              Microsoft 365 or Google Workspace. Six integration patterns turn that stack into an
              AI-native operation without ripping anything out.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; finish path <ArrowRight className="size-4" />
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

      {/* Inline infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            AU SME AI integration patterns
          </h3>
          <div className="flex justify-center">
            <InfographicStack width={720} height={360} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Six patterns, six different cost and effort profiles. Pick the lightest one that
            solves the job.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The “stack reality” for AU SMEs</h3>
          <p className="mt-2 text-slate-700">
            Look at any 10 small Australian businesses with 5–50 staff and you will see roughly
            the same software list: <strong>Xero or MYOB</strong> for accounting,
            <strong> HubSpot or Pipedrive</strong> for CRM, <strong>Mailchimp or Campaign
            Monitor</strong> for email, <strong>Outlook or Gmail</strong> for mail,
            <strong> Microsoft 365 or Google Workspace</strong> for documents, and
            <strong> Slack or Teams</strong> for chat. Plus a vertical-specific tool for the
            industry — Cliniko for allied health, simPRO for trades, ServiceM8 for field service,
            Vend or Lightspeed for retail. The reality is good news for AI: you do not need to
            replace any of these. Six integration patterns let AI live alongside.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 1 — Native AI inside the tool</h3>
          <p className="mt-2 text-slate-700">
            Most major SaaS tools shipped first-party AI in 2024–2025. Effort: zero. Cost: included
            in subscription or a small uplift.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Gmail / Outlook</strong> — “Help me write” drafts and replies. Free in Workspace and M365.</li>
            <li><strong>Xero AI</strong> — bank reconciliation suggestions, invoice predictions. Included.</li>
            <li><strong>HubSpot Breeze</strong> — content drafting, email personalisation, deal coaching. Included in Pro tier.</li>
            <li><strong>Slack AI</strong> — channel summarisation, thread recap. Around <strong>A$15/user/month inc GST</strong> add-on.</li>
            <li><strong>Microsoft Copilot</strong> for M365 — around <strong>A$45/user/month inc GST</strong>.</li>
            <li><strong>Gemini for Workspace</strong> — around <strong>A$33/user/month inc GST</strong>.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Best for: anything that lives in the tool day-to-day (drafting, summarising, search).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 2 — Browser extension</h3>
          <p className="mt-2 text-slate-700">
            A browser extension makes AI work in any text field, regardless of tool. Effort: 5
            minutes. Cost: free to A$30/month.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Compose AI</strong> — sentence completions in any text box.</li>
            <li><strong>Magical</strong> — text expander with AI. Strong adoption in customer support roles.</li>
            <li><strong>ChatGPT extension</strong> — page-level summarisation; right-click menu in Chrome.</li>
            <li><strong>Sider, Merlin, Glasp</strong> — multi-model chat sidebars; useful when the SaaS does not have native AI.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Best for: smaller SaaS tools that do not have native AI, or when you want to use a
            different model.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 3 — Zapier / Make middleware</h3>
          <p className="mt-2 text-slate-700">
            Connect two tools with an AI step in the middle. Effort: 30 minutes per workflow.
            Cost: A$30–A$80/month subscription plus per-event AI cost.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Form submission &rarr; AI classify &rarr; CRM.</li>
            <li>New email &rarr; AI summarise &rarr; Slack channel.</li>
            <li>Closed deal &rarr; AI draft &rarr; Mailchimp template.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Best for: repetitive cross-tool workflows where the work is structured and high
            volume.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 4 — API direct (developer needed)</h3>
          <p className="mt-2 text-slate-700">
            Custom backend that calls Xero/HubSpot/Slack APIs and an AI provider. Effort: 1–4
            weeks. Cost: developer time plus infrastructure.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Full control over data flow and residency.</li>
            <li>No middleware tax at scale (cheaper than Zapier above 10,000 events/month).</li>
            <li>Can integrate vertical tools that no middleware supports.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Best for: use cases above 10,000 events/month, or strict residency needs, or
            integrations the middleware does not support.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 5 — Custom GPT / Custom Gem with tool access</h3>
          <p className="mt-2 text-slate-700">
            Build a custom assistant trained on your data that can call your tools. Effort: 1–3
            hours. Cost: included in ChatGPT Plus/Team or Gemini for Workspace.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Upload your handbook, JD library, brand voice notes — assistant uses them as context.</li>
            <li>Add tool actions (Zapier connector, custom webhook) — the assistant can write to Slack, fetch from Xero, etc.</li>
            <li>Share with your team via the GPT Store / Gem library inside your workspace.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Best for: assistant-style use cases where the work is conversational rather than
            event-driven.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 6 — AI agent platform</h3>
          <p className="mt-2 text-slate-700">
            Purpose-built platforms that string together LLM steps, tool calls and conditionals
            into autonomous agents. Effort: 2–10 hours per agent. Cost: A$50–A$300/month plus
            usage.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Lindy</strong> — drag-and-drop agents with deep tool integrations.</li>
            <li><strong>Relevance AI</strong> — Australian company, handy for local data residency conversations.</li>
            <li><strong>Crew AI / LangGraph</strong> — for engineering teams.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Best for: multi-step workflows with branching that the simpler middleware cannot
            handle.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Decision matrix — which pattern when</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Drafting and summarising inside a tool you already use</strong> &rarr; native AI (Pattern 1).</li>
            <li><strong>AI in a smaller SaaS without native support</strong> &rarr; browser extension (Pattern 2).</li>
            <li><strong>Two tools, one AI step, under 10,000 events/month</strong> &rarr; Zapier or Make (Pattern 3).</li>
            <li><strong>Above 10,000 events/month or strict residency</strong> &rarr; API direct or self-hosted n8n (Pattern 4).</li>
            <li><strong>Conversational assistant for the team with company knowledge</strong> &rarr; Custom GPT or Gem (Pattern 5).</li>
            <li><strong>Multi-step branching agent that needs to make decisions</strong> &rarr; Lindy or Relevance AI (Pattern 6).</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance — which countries does data flow through?</h3>
          <p className="mt-2 text-slate-700">
            Three patterns to be aware of under APP 8.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Native AI inside a tool</strong> — data stays inside the tool’s tenant. Verify the tool’s data residency (Xero stores AU data in Australia; Slack uses Singapore region for AU customers; Microsoft 365 has AU data residency for Business Premium and above).</li>
            <li><strong>Middleware</strong> — Zapier and Make process data through US infrastructure. Note in your privacy policy.</li>
            <li><strong>API direct or self-hosted n8n on Sydney region</strong> — data stays in Australia for the orchestration layer; AI provider call still goes offshore unless you use a local model.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The stack-mapping exercise — do this first</h3>
          <p className="mt-2 text-slate-700">
            Before you build any integration, map your current stack on one page.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li>List every SaaS tool you pay for (use your card statements). Group by function: accounting, CRM, marketing, comms, files, vertical.</li>
            <li>For each, note: native AI yes/no, monthly cost, data sensitivity (PII / payment / health / employee), data residency.</li>
            <li>Identify the three repetitive cross-tool tasks that consume the most owner time.</li>
            <li>For each, pick the integration pattern using the decision matrix.</li>
            <li>Ship one. Measure. Then ship the next.</li>
          </ol>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'You do not need to rip out your existing stack. Six integration patterns let AI live alongside Xero, HubSpot, Slack and the rest.',
              'Native AI inside the tool (Pattern 1) is the lightest lift. Try it before reaching for middleware.',
              'Browser extensions cover smaller SaaS tools that lack native AI. Five-minute install, big payoff.',
              'Middleware (Zapier/Make) is right under 10,000 events/month. Above that, go API-direct or n8n self-hosted.',
              'Custom GPTs and Gems are the right pattern for conversational assistants with company knowledge.',
              'Always map your stack first — list tools, native AI status, costs, sensitivity and residency. Build integrations second.',
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
            <p className="font-semibold text-slate-900">Exercise: Map your stack and pick three integrations</p>
            <p className="mt-2">
              Open a Google Sheet or Notion page. Build the table.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Columns: Tool, Function, Monthly cost (A$), Native AI yes/no, AI cost extra, Data sensitivity, Data residency.</li>
              <li>Rows: every SaaS subscription on your card statement (most owners are surprised at how many).</li>
              <li>Highlight the three rows where AI would save you the most time per week.</li>
              <li>For each, write the integration pattern (1–6) and the rough effort estimate.</li>
              <li>Pick the lightest one with the highest payoff. Build it this week.</li>
            </ol>
            <p className="mt-3">Bonus: ask AI itself to critique your map — <em>“Read my stack map. Where am I overlapping? Where do I have a residency risk? Which integration would have the biggest payoff first?”</em></p>
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
                1. Which integration pattern is the lightest lift if your tool already has native AI?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> API direct</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Native AI inside the tool</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI agent platform</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Native AI inside the tool. Zero effort, often included in the existing subscription. Try it first.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. At what event volume does Zapier/Make start to lose to API-direct?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Around 100 events/month</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Around 10,000 events/month</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Around 1,000,000 events/month</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Around 10,000 events/month. Below that, middleware wins on speed-of-build. Above, the per-event tax adds up.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What should you do before building any integration?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Buy more SaaS subscriptions</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Map your current stack — tools, costs, AI status, sensitivity, residency</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Hire a developer</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Map your stack first. Most owners are surprised at the overlap and the residency profile once they see it on one page.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 9</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Document processing pipeline (PDF → data → action)
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The next AI Automation lessons land with the full Academy in Q3 2026 — document
              processing, support deflection, deployment and cost capstone.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Notify me <ArrowRight className="size-4" />
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
