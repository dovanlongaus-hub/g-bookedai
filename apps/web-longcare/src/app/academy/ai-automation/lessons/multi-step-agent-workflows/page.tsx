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
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Multi-Step AI Agents — Beyond Single Prompts | AI Automation Lesson 5 | LongCare Academy',
  description:
    'The agent loop, four real multi-step patterns (research-summarise-write, email triage, lead enrichment, document pipeline) and tools for AU SMEs — Zapier AI, Make, n8n, Lindy, Relevance.',
  path: '/academy/ai-automation/lessons/multi-step-agent-workflows',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Multi-Step AI Agents — Beyond Single Prompts',
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

export default function MultiStepAgentWorkflowsLessonPage() {
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
            { name: 'Multi-Step Agent Workflows', url: '/academy/ai-automation/lessons/multi-step-agent-workflows' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 5 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Multi-step AI agents &mdash; beyond single prompts
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A single prompt is a question; a multi-step agent is a worker. Thirty minutes on the
              agent loop, four production-ready patterns, AU pricing, and a hands-on
              research-then-summarise build.
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

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The agent shape: trigger &rarr; step 1 &rarr; step 2 &rarr; step 3 &rarr; output
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Most useful agents are a deterministic chain of three to five steps with one or two
            AI-powered nodes. Resist the urge to over-architect.
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
              Walk-through screencast in production. The transcript below covers every pattern.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Single prompt vs multi-step agent</h3>
          <p className="mt-2 text-slate-700">
            A single prompt is a one-shot transaction: you ask, the AI answers, you decide what
            to do. A multi-step agent receives input, decides for itself which steps to run,
            potentially calls external tools (a search API, your CRM, an email sender), and
            returns a finished outcome &mdash; no human in the middle. The trade-off is control.
            Single prompts are predictable but require human glue. Agents are autonomous but can
            do unexpected things, and unsupervised they can quickly burn through your AI budget.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The agent loop</h3>
          <p className="mt-2 text-slate-700">
            Modern AI agents implement a four-step loop:
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Observe.</strong> Read the input, the conversation so far, and any tool results.</li>
            <li><strong>Think.</strong> Plan the next action: respond directly, call a tool, ask the user, finish.</li>
            <li><strong>Act.</strong> Execute the chosen action.</li>
            <li><strong>Reflect.</strong> Was the result what we expected? If not, update the plan and go again.</li>
          </ol>
          <p className="mt-2 text-slate-700">
            Frameworks like LangChain, CrewAI, and Lindy formalise this loop; in your AU SME
            context, you usually buy this through a no-code workflow tool rather than building it.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 1 &mdash; Research, summarise, write</h3>
          <p className="mt-2 text-slate-700">
            <strong>Trigger:</strong> User submits a topic. <strong>Step 1:</strong> Agent calls
            Perplexity or Google Search to gather 5&ndash;10 recent sources. <strong>Step
            2:</strong> Agent summarises and extracts key facts. <strong>Step 3:</strong> Agent
            drafts a 700-word post in your voice. <strong>Output:</strong> Markdown saved to
            Notion or Google Docs. Total time: 90 seconds. Use cases: market intelligence, blog
            posts, briefing notes for sales calls.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 2 &mdash; Read email, classify, respond + log</h3>
          <p className="mt-2 text-slate-700">
            <strong>Trigger:</strong> New email in inbox. <strong>Step 1:</strong> AI classifies
            the email (sales enquiry, support, invoice, spam). <strong>Step 2:</strong> Routes to
            the right path: sales &rarr; CRM with summary; support &rarr; Helpdesk ticket;
            invoice &rarr; Xero inbox. <strong>Step 3:</strong> AI drafts a brand-voice reply for
            human approval if appropriate. <strong>Step 4:</strong> Logs the action in a
            spreadsheet for audit. Replaces about an hour of inbox triage daily.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 3 &mdash; Lead capture, enrich, score, route</h3>
          <p className="mt-2 text-slate-700">
            <strong>Trigger:</strong> Form submission on website. <strong>Step 1:</strong>
            Agent enriches with company data (Apollo, Clearbit, ZoomInfo). <strong>Step
            2:</strong> AI scores the lead based on fit (industry, size, location). <strong>Step
            3:</strong> If hot, routes to the relevant sales rep&rsquo;s Slack with a summary; if
            cold, drops into a long-term nurture sequence in Mailchimp. <strong>Step 4:</strong>
            Updates CRM. The whole loop is &lt;30 seconds. AU plug: include
            ABN-lookup-via-ABR for Australian leads to confirm legitimacy.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pattern 4 &mdash; Document upload, extract, validate, store</h3>
          <p className="mt-2 text-slate-700">
            <strong>Trigger:</strong> PDF dropped in Drive folder. <strong>Step 1:</strong>
            OCR/extract via AI (key fields: supplier ABN, total, GST, due date). <strong>Step
            2:</strong> Validate against business rules (totals add up; ABN exists in ABR; due
            date is reasonable). <strong>Step 3:</strong> If valid, push to Xero; if invalid,
            flag for human. <strong>Step 4:</strong> Store the original in a tagged folder.
            Saves several hours a week of bookkeeper time.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools and AUD pricing</h3>
          <p className="mt-2 text-slate-700">
            <strong>Zapier (with AI by Zapier and Tables).</strong> About
            <strong> AUD&nbsp;$25/month Pro</strong>, <strong>AUD&nbsp;$110/month Team</strong>.
            Fastest to ship; expensive at scale.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Make.com (formerly Integromat).</strong> About
            <strong> AUD&nbsp;$15/month Core</strong>, <strong>AUD&nbsp;$30/month Pro</strong>.
            Better at multi-branch logic than Zapier; AU users like the per-operation pricing.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>n8n (self-hosted or cloud).</strong> Free self-hosted; Cloud about
            <strong> AUD&nbsp;$30/month Starter</strong>. Open-source flexibility, AU data
            residency if self-hosted.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Lindy.</strong> About <strong>AUD&nbsp;$50/month</strong> for the
            individual plan. Purpose-built AI agent platform &mdash; great UX for non-technical
            users.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Relevance AI.</strong> About <strong>AUD&nbsp;$45/month Team</strong>. Strong
            on the &ldquo;AI workforce&rdquo; framing &mdash; agents you can hand specific roles.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost considerations &mdash; tokens &times; steps</h3>
          <p className="mt-2 text-slate-700">
            Multi-step agents multiply token consumption. A single ChatGPT call costs roughly
            $0.005 AUD; a five-step agent that calls AI three times costs $0.015&ndash;0.030 AUD
            per run. At 1,000 runs/month, that&rsquo;s $15&ndash;30 in AI fees alone, plus the
            workflow tool fee. Track per-run cost from day one.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Failure modes and monitoring</h3>
          <p className="mt-2 text-slate-700">
            Agents fail in three ways: <em>(1)</em> a tool call returns garbage, the AI doesn&rsquo;t
            notice; <em>(2)</em> the AI hallucinates a fact mid-loop; <em>(3)</em> the loop runs
            forever (rare, but it happens). Monitor every run: log each step&rsquo;s input and
            output to Google Sheets or Helicone. Set hard step-count limits (max 10 steps per run)
            and per-run cost ceilings. Alert humans on any failure or unusually long run.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When to keep it simple</h3>
          <p className="mt-2 text-slate-700">
            If your task can be done in a single prompt with a human reviewer, keep it that way.
            Multi-step agents are right for high-volume, repetitive tasks where the AI cost is
            justified by the human time saved. Below 50 runs a week, a single-prompt approach
            with a human in the loop is usually cheaper, faster to build, and more reliable.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'The agent loop: observe → think → act → reflect. Most no-code tools handle this for you.',
              'Four high-ROI patterns: research-summarise-write, email triage, lead enrichment, document pipeline.',
              'Cost = tokens × steps. A 5-step agent at 1,000 runs/month costs $15–30 AUD just in AI fees.',
              'Monitor every run; set step limits and cost ceilings; alert on failure or excessive duration.',
              'Tools: Zapier (fast), Make (multi-branch), n8n (self-host), Lindy/Relevance (purpose-built AI agents).',
              'Below 50 runs/week, single-prompt + human is usually cheaper and more reliable than building an agent.',
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
            <p className="font-semibold text-slate-900">Exercise: Build a 3-step research-and-summary agent</p>
            <p className="mt-2">
              Open Make.com (free tier sufficient). Build this scenario:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li><strong>Trigger:</strong> Manual run with a topic input (later, switch to a Sheets row).</li>
              <li><strong>Step 1:</strong> HTTP module &rarr; Perplexity API or Tavily Search API for the topic.</li>
              <li><strong>Step 2:</strong> AI module &rarr; ChatGPT or Claude with prompt: <em>&ldquo;Summarise these search results in 5 bullet points and one paragraph, AU English.&rdquo;</em></li>
              <li><strong>Step 3:</strong> Output module &rarr; append result to a Google Doc.</li>
            </ol>
            <p className="mt-3">
              Run with three test topics. Time the run, log the cost. Iterate the AI prompt until
              the summaries match your taste. Note: total token cost should be ~AUD $0.02&ndash;0.05
              per run.
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
                1. What are the four steps of the agent loop?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Plan, build, deploy, monitor</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Observe, think, act, reflect</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Trigger, action, response, log</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Observe, think, act, reflect.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the &ldquo;keep-it-simple&rdquo; threshold for using a multi-step agent?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Below 50 runs/week, prefer single-prompt + human</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Always agent, regardless of volume</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Only for &gt;100 runs/day</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Below 50 runs/week, single-prompt + human is usually cheaper and more reliable.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why must you set a max step count on agents?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> To keep the UI clean</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> To prevent runaway loops and cost blowouts</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Because vendors require it</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">To prevent runaway loops and surprise AUD costs.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 6</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Cost &amp; rate limits &mdash; don&rsquo;t get surprised by AI bills
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Token economics, five cost-saving tactics, rate-limit handling, and budget alerts.
            </p>
          </div>
          <Link
            href="/academy/ai-automation/lessons/cost-and-rate-limit-management"
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
