import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
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
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Disaster Recovery & Rollback — AI Automation Lesson 14 | LongCare Academy',
  description:
    'Disaster recovery for AI workflows — model deprecation, API outage, cost spike, hallucination cascade. Graceful degradation, fallback, RTO/RPO basics, AU SME oncall and retros.',
  path: '/academy/ai-automation/lessons/disaster-recovery-and-rollback',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Disaster Recovery & Rollback for AI Workflows',
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

export default function DisasterRecoveryAndRollbackLessonPage() {
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
            { name: 'Disaster Recovery and Rollback', url: '/academy/ai-automation/lessons/disaster-recovery-and-rollback' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 14 of 14 · Capstone
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Disaster recovery &amp; rollback for AI workflows
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Production AI workflows fail in four predictable ways. Here is the graceful
              degradation pattern, the rollback runbook, AU SME oncall structure and the
              retrospective format we use after every incident.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Continue path — coming soon
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

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The incident loop
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Detect → Contain → Rollback → Recover → Retro. Each step is short, each step is
            in writing, and each step has a named owner.
          </p>
        </div>
      </section>

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

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The four predictable failure modes</h3>
          <p className="mt-2 text-slate-700">
            Production AI workflows fail in one of four ways. <strong>Model
            deprecation</strong> — Anthropic retires Sonnet 3.5, OpenAI deprecates GPT-4, your
            workflow throws errors overnight. <strong>API outage</strong> — OpenAI status page
            goes red for 90 minutes; your customer-facing chatbot stops working. <strong>Cost
            spike</strong> — a misconfigured trigger sends 50,000 requests instead of 500; bill
            jumps overnight. <strong>Hallucination cascade</strong> — the AI starts producing
            confident-but-wrong output that downstream automations act on. Each has a
            different mitigation; you need all four.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Graceful degradation — the design pattern</h3>
          <p className="mt-2 text-slate-700">
            The single most important pattern is graceful degradation. When the AI fails, what
            happens? &ldquo;The whole workflow stops&rdquo; is one answer. &ldquo;The workflow
            falls back to a simpler version and flags a human&rdquo; is the better one. For a
            support triage workflow, graceful degradation means: if Claude is down, fall back
            to keyword routing and a human queue; if that fails, fall back to round-robin
            assignment. Three layers, each cheaper than the one above. Customer-facing
            systems with no fallback take outages as visible failure; ones with three-layer
            degradation rarely break their SLA.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Manual fallback procedure</h3>
          <p className="mt-2 text-slate-700">
            For any AI workflow that processes more than 100 items per day, document the
            manual fallback procedure. What does the team do for the next 4 hours if the AI
            is offline? Who triages the support inbox? Who classifies the leads? Who reviews
            the invoices? Most AU SMEs we coach can do this on one A4 page per workflow. The
            page sits in a Notion page called &ldquo;Manual fallback playbook&rdquo; or pinned
            in the relevant Slack channel. A page that exists is worth twenty pages that
            don&rsquo;t.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Version pinning — boring but lifesaving</h3>
          <p className="mt-2 text-slate-700">
            Pin the model version explicitly. <em>claude-3-7-sonnet-20260201</em>, not
            <em> claude-3-7-sonnet-latest</em>. The same prompt against a different model
            version can produce subtly different output; if you pin, you control when the
            change happens. Schedule a calendar event quarterly to evaluate the latest version
            in a staging environment before swapping. AU finance and health-tech firms we
            coach run a 24-hour shadow comparison before adopting new model versions in
            production — overkill for most, essential for regulated.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The rollback runbook template</h3>
          <p className="mt-2 text-slate-700">
            Pre-write one rollback runbook per critical workflow. Headings: <em>Workflow
            name</em>, <em>Owner</em>, <em>Symptom of failure</em>, <em>Rollback steps with
            exact buttons / commands</em>, <em>How to verify rollback worked</em>, <em>Who to
            tell when rolled back</em>. The runbook lives in Notion, Confluence or a pinned
            Slack message. The key is &ldquo;exact buttons&rdquo; — &ldquo;disable the
            workflow&rdquo; is too vague at 11pm on a Saturday; &ldquo;in n8n
            production-au-1, click Workflows, find Booking Triage v3, toggle Active to
            off&rdquo; is what you want.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">RTO and RPO — the two numbers</h3>
          <p className="mt-2 text-slate-700">
            <strong>RTO</strong> (Recovery Time Objective) is how quickly you need the
            workflow back up. <strong>RPO</strong> (Recovery Point Objective) is how much
            data loss you can tolerate. For most AU SME AI workflows, RTO is 4-24 hours
            (acceptable to be down overnight; not acceptable for a week) and RPO is zero (no
            messages should be silently dropped; replay them from the source on recovery).
            Write these numbers down for each workflow; they drive the design decisions about
            what to invest in. A workflow with RTO of 1 hour needs an active fallback; a
            workflow with RTO of 24 hours can take a manual restart.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU SME oncall — the realistic pattern</h3>
          <p className="mt-2 text-slate-700">
            Most AU SMEs cannot afford 24x7 oncall. The realistic pattern: a primary owner per
            workflow named in the runbook, with a single shared @oncall-au Slack channel
            wired to a paging tool (PagerDuty Starter, US$25/mo per user; or Better Stack
            US$24/mo). Alert thresholds set at &ldquo;the customer will notice in 30
            minutes&rdquo; — not at every transient blip. Weekly rotation if the team is
            three or more; permanent ownership if smaller. Most importantly, document the
            escalation path: who does the primary call if they cannot fix it in 45 minutes?
            Usually the founder, occasionally an external contractor. Pre-agree the rate.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Incident retrospective — 30 minutes, blameless</h3>
          <p className="mt-2 text-slate-700">
            After every incident worth its name (P1 or P2 — customer affected; cost over A$500
            or more than 2 hours of downtime), run a 30-minute retro within 48 hours. Five
            sections: <em>timeline</em> (what happened minute by minute), <em>impact</em>
            (customers affected, AUD cost, hours lost), <em>root cause</em> (the actual
            technical or process failure, not the symptom), <em>what worked</em> (we want to
            do more of this), <em>what to change</em> (three to five action items with named
            owners and dates). The rule is blameless — focus on systems, not people. The
            retrospective doc lives in a shared folder; alumni read each other&rsquo;s, which
            accelerates learning across the team.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">A worked example — the Sydney logistics outage</h3>
          <p className="mt-2 text-slate-700">
            Brisbane-based logistics startup, Q1 2026. OpenAI had a 47-minute outage at 6:45am
            AEDT, during their morning route planning. Without a fallback, dispatch went
            manual; 12 trucks delayed by 30-60 minutes. After the retro they implemented:
            (1) a fallback to a simpler rules-based router for routes under 5 stops;
            (2) caching of the previous night&rsquo;s plan so today could roll forward in a
            pinch; (3) a 6am check that the OpenAI API is responding before dispatch runs.
            Next outage (May 2026, 22 minutes) had zero customer impact. The total cost of
            implementing the fixes was 8 hours of engineering time — paid back the same week.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Plan for four failure modes — model deprecation, API outage, cost spike, hallucination cascade.',
              'Graceful degradation in three layers is the single most valuable design pattern.',
              'Pin model versions explicitly. Run a staging comparison before adopting new versions.',
              'Pre-write the rollback runbook with exact buttons and commands, not vague verbs.',
              'Document RTO and RPO per workflow; they drive investment decisions, not adjectives.',
              'Run a blameless 30-minute retrospective inside 48 hours of any incident worth its name.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Try it yourself</h2>
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 45 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Write one rollback runbook today</p>
            <p className="mt-2">
              Pick the single most business-critical AI workflow you operate.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Open a Notion / Confluence / Google Doc page titled &ldquo;[Workflow name] rollback runbook&rdquo;.</li>
              <li>Fill the six headings — owner, symptom, exact steps, verification, who to tell, RTO/RPO.</li>
              <li>Identify the graceful-degradation layers. If there is only one, plan a second.</li>
              <li>Pin the model version and add a calendar event quarterly for shadow comparison.</li>
              <li>Test the runbook by disabling the workflow on purpose and following the page exactly.</li>
            </ol>
            <p className="mt-3">
              A tested runbook is the most important AI ops artefact most AU SMEs do not have.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Quick check</h2>

          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-slate-900">
                1. The four predictable AI workflow failure modes are…
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Slow, expensive, wrong, refused</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Model deprecation, API outage, cost spike, hallucination cascade</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Latency, accuracy, cost, security</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Model deprecation, API outage, cost spike, hallucination cascade. Each has a different mitigation.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. RTO and RPO stand for…
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Recovery Time Objective and Recovery Point Objective</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Retry Throttling Object and Resource Pool Origin</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Rollback Test Operation and Restore Process Order</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Recovery Time Objective and Recovery Point Objective. They drive investment decisions, not adjectives.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why pin model versions explicitly?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> To save AUD</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> So you control when behaviour changes — same prompt, different version, different output</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It is an OAIC requirement</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Control. Pinning means version changes are planned events, not surprise overnight regressions.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Path complete</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You have finished the AI Automation path — capstone done.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Fourteen lessons, one production-grade rollback runbook. Advanced bootcamps,
              certifications and live AU cohorts land in Q4 2026.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Advanced bootcamps — Q4 2026
          </a>
        </div>
      </section>

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
