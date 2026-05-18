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
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Scaling AI From Pilot to Production — AI Automation Lesson 12 | LongCare Academy',
  description:
    'A five-stage AI maturity model from manual to full autopilot. When to graduate each stage, SLAs as guardrails, cost projection at 10x/100x/1000x scale, AU compliance audit trail requirements, rollback strategy and team structure.',
  path: '/academy/ai-automation/lessons/scaling-from-pilot-to-production',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Scaling AI From Pilot to Production',
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

export default function ScalingFromPilotToProductionLessonPage() {
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
            { name: 'Scaling from Pilot to Production', url: '/academy/ai-automation/lessons/scaling-from-pilot-to-production' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Lesson 12 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Scaling AI from pilot to production
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Most AU SME AI pilots that fail did not fail because the prototype was bad. They
              failed because the team graduated to autopilot before earning the trust to stay
              there. A five-stage maturity model fixes the problem.
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
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline timeline */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Pilot &rarr; Beta &rarr; Production &rarr; Scale
          </h3>
          <div className="flex justify-center">
            <InfographicTimeline width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            The four-phase rollout that keeps trust intact. Most teams should expect 90 days
            from pilot to production for any high-stakes workflow.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The five-stage AI maturity model</h3>
          <p className="mt-2 text-slate-700">
            Every AI workflow should sit at one of five stages, and you should be able to
            point at the stage on any given Tuesday.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Stage 1: Manual.</strong> The job is done by a human. AI is not yet involved. You measure baseline cycle time and quality.</li>
            <li><strong>Stage 2: Assisted.</strong> AI drafts; the human edits and ships. Failure mode is recoverable. Most pilots live here for 30 days.</li>
            <li><strong>Stage 3: Semi-auto.</strong> AI completes and ships routine cases; the human handles exceptions flagged by the system. Routing accuracy now matters as much as output accuracy.</li>
            <li><strong>Stage 4: Auto with review.</strong> AI completes and ships everything; a human spot-checks 5-10% of cases daily. Audit trail and dashboards are non-negotiable.</li>
            <li><strong>Stage 5: Full auto.</strong> AI handles end-to-end with periodic sampled review. Only the highest-trust workflows live here, and only with strong rollback.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When to graduate each stage</h3>
          <p className="mt-2 text-slate-700">
            Graduate from a stage when two conditions are met for 14 consecutive days:
            quality holds steady against the previous stage&rsquo;s baseline, and the team
            actively asks for more autonomy. The second condition is more important than the
            first. A workflow can be technically ready and culturally not, especially if the
            people doing the work have not been brought along. Most AU SMEs we coach
            graduate Stage 2 to Stage 3 inside 30 days, Stage 3 to Stage 4 inside 60-90 days,
            and only specific workflows ever reach Stage 5.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">SLAs as guardrails</h3>
          <p className="mt-2 text-slate-700">
            Define SLAs explicitly at each stage. For a customer support workflow at Stage 3,
            ours typically reads: &ldquo;95% of routine tickets resolved in under 4 hours; 99%
            of high-urgency tickets responded within 15 minutes; quality holds rate below 5%;
            customer satisfaction above 4.2/5 over a rolling 14-day window.&rdquo; If any SLA
            breaks, the workflow rolls back to Stage 2 automatically. Treating SLAs as
            guardrails rather than ambitions is the single most important operational
            discipline.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost projection at 10x, 100x, 1000x</h3>
          <p className="mt-2 text-slate-700">
            Before any pilot graduates to production, project unit economics at 10x, 100x and
            1000x current volume. A workflow that costs A$5 per run today and saves 30 minutes
            of human time looks great. At 100x volume, A$500 per run may quietly become
            unviable if the saved time can be reorganised. The right cost projection includes:
            AI model spend per call, gateway and observability spend (Helicone, Langfuse),
            compute (Cloud Run, Lambda), data egress, and human review time at the chosen
            sample rate. Most surprises live in egress and review time, not model spend.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance audit trail</h3>
          <p className="mt-2 text-slate-700">
            For workflows in regulated industries &mdash; financial services (ASIC), health
            (TGA), tax-adjacent (ATO), employment (Fair Work) &mdash; the audit trail is
            usually a legal requirement, not a nice-to-have. The minimum log for each AI
            decision: input, output, model version, prompt version, timestamp, user
            identifier and (for any decision affecting a customer) the human reviewer if one
            was involved. Retention default: 7 years for tax, 5 years for general business,
            7 years for financial services records. Store in append-only storage (BigQuery,
            Cloud Storage with retention policy) and document the retention policy in your
            ISMS. The OAIC&rsquo;s 2024 AI Privacy Guidance is the AU touchstone.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Rollback strategy</h3>
          <p className="mt-2 text-slate-700">
            Every production AI workflow needs a one-click rollback to the previous stage. If
            you cannot turn off a Stage 5 autopilot and return to Stage 4 within two minutes,
            you are not yet at Stage 5. We recommend a feature-flag pattern (LaunchDarkly,
            Unleash, or a simple Firestore boolean) that an on-call person can flip without a
            deploy. Test the rollback monthly &mdash; an untested rollback is a wish, not a
            plan. A Sydney legal-tech SME we coached saved themselves from a model-update
            regression in November by flipping their flag at 9:17am; they were back at
            Stage 4 by 9:19am, with three hours of investigation before flipping back.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Team structure: champion to guild to team</h3>
          <p className="mt-2 text-slate-700">
            AU SMEs scaling AI typically follow a predictable structure. <strong>Stage 1-2:
            one AI champion</strong> &mdash; a curious person on the founding team or in
            operations who runs the pilots. <strong>Stage 3-4: an AI guild</strong> &mdash; a
            cross-functional group of 4-8 people who meet weekly to share patterns and risks,
            still alongside day jobs. <strong>Stage 5 or post-Series A: a dedicated AI
            team</strong> &mdash; 2-4 people on AI as their primary work, owning the platform,
            the eval harness, and the audit trail. Trying to start with a dedicated team
            usually fails (no real workflows to point at); trying to scale past Stage 4 with
            only a champion also fails (one person bottlenecks every change).
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five-stage model: manual, assisted, semi-auto, auto with review, full auto. Know which stage every workflow is at.',
              'Graduate when quality holds AND the team asks for autonomy, not just when the metrics look good.',
              'SLAs are guardrails, not ambitions. Breach an SLA and the workflow rolls back automatically.',
              'Project costs at 10x, 100x, 1000x. Most surprises live in egress and review time, not model spend.',
              'Audit trail is a legal requirement for ASIC, TGA, ATO, Fair Work workflows. 5-7 year retention; append-only.',
              'One-click rollback tested monthly. Untested rollback is a wish, not a plan.',
              'Team structure scales: champion (stage 1-2) → guild (stage 3-4) → dedicated team (stage 5+).',
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
            <p className="font-semibold text-slate-900">Exercise: Run a maturity audit on all your AI workflows</p>
            <p className="mt-2">
              List every AI workflow you operate. For each, in a single sheet:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Place it at one of the five stages.</li>
              <li>Write the SLAs for that stage. If you have none, that workflow rolls back to Stage 2 today.</li>
              <li>Project the cost at 10x volume. If you cannot, that workflow stays at its current stage.</li>
              <li>Document the rollback method. If there is no method, build a feature flag this week.</li>
              <li>Identify your team structure stage. If your team and your most advanced workflow are mismatched, fix the team structure first.</li>
            </ol>
            <p className="mt-3">A 30-minute audit usually surfaces two or three workflows that quietly graduated too early. Roll them back. Rebuild trust. Graduate again the right way.</p>
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
                1. When should you graduate from Stage 2 (Assisted) to Stage 3 (Semi-auto)?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> When the prototype scores well on the golden set</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> When quality holds for 14 days AND the team asks for more autonomy</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> When the budget runs out</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Both conditions: technical readiness for 14 days and a culturally-ready team. Skipping either is the most common pilot-failure mode.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the role of SLAs in a production AI workflow?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> They are aspirational targets</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> They are guardrails; breach an SLA and the workflow rolls back to the previous stage</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> They satisfy ASIC reporting</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Guardrails. Automated rollback on SLA breach is the discipline that protects trust over months.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is the minimum AU audit log for an AI decision in a regulated workflow?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Input, output, model version, prompt version, timestamp, user, reviewer</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Just the final output</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Whatever the SaaS vendor logs</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Input, output, model version, prompt version, timestamp, user, and reviewer (if any). Retention default 5-7 years in append-only storage.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* End-of-path note */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Path complete</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You have finished the AI Automation path
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Twelve lessons, five-plus hours of focused learning. Advanced bootcamps,
              certificates and live AU cohorts land in Q4 2026.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Continue path — coming soon
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
