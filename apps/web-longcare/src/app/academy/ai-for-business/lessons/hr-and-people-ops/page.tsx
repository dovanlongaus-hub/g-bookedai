import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroProfessional } from '@/components/illustrations/hero-professional';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for HR & People Ops — Hire, Onboard, Retain | AI for Business Lesson 7 | LongCare Academy',
  description:
    'How AU SMEs use AI across the HR lifecycle — job descriptions, interview questions, candidate screening, onboarding, performance reviews and exit interviews — with Fair Work Act and Privacy Act guardrails.',
  path: '/academy/ai-for-business/lessons/hr-and-people-ops',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for HR and People Ops — Hire, Onboard, Retain',
  educationalLevel: 'SME owners',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI for Business',
    url: 'https://longcare.au/academy/ai-for-business',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function HrAndPeopleOpsLessonPage() {
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
            { name: 'AI for Business', url: '/academy/ai-for-business' },
            { name: 'HR & People Ops', url: '/academy/ai-for-business/lessons/hr-and-people-ops' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 7 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for HR &amp; people ops — hire, onboard, retain
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The HR lifecycle is the highest-paperwork, highest-emotion process in any AU SME.
              AI takes the paperwork off your plate so you can spend the saved hours on the people.
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
                href="/academy/ai-for-business"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroProfessional className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The hire-to-retain pipeline, AI-assisted
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={720} height={160} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            JD draft &rarr; Interview Qs &rarr; Screen &rarr; Offer &rarr; Onboarding. AI helps in
            every step, but humans sign off every decision.
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
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why HR is the SME use case with the fastest payback</h3>
          <p className="mt-2 text-slate-700">
            For most AU SMEs, the founder writes job ads, sits through interviews, builds the
            onboarding plan, runs the performance review and conducts the exit interview. Each is
            a multi-hour task. Across a year of two or three hires, HR consumes more owner time
            than most realise. AI compresses each step by sixty to eighty per cent without taking
            the human decision out of the loop. We measure roughly <strong>A$2,000 saved per hire
            on admin</strong> across our coaching cohort, before counting the value of better
            interview structure and faster onboarding.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Seven HR use cases that pay for themselves</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Job descriptions.</strong> Paste the role outcomes, two example success stories from the team, and your tone-of-voice notes. Ask Gemini or ChatGPT to produce a 350-word JD plus a Seek-friendly headline. Edit, do not write from scratch.</li>
            <li><strong>Interview questions.</strong> Feed the JD plus the candidate’s LinkedIn or CV. Ask for ten behavioural questions tied to specific competencies, with prompt follow-ups. The structure improves your interviews even if you change every word.</li>
            <li><strong>Candidate screening summaries.</strong> Paste a CV and ask Claude (200k context window helps) for a one-page summary against the JD: matched competencies, gaps, three questions to ask. This is a triage aid, not a yes/no decision — keep humans in the loop.</li>
            <li><strong>Onboarding checklists.</strong> Ask AI to generate a five-day onboarding plan from your business profile, the role, and your existing systems list. Customise the plan, then save the prompt as a reusable template for next hire.</li>
            <li><strong>Performance review templates.</strong> Paste the role, the rubric and the team member’s self-assessment. Ask AI for three discussion questions and three growth conversation prompts. The questions land better than your usual ones.</li>
            <li><strong>Exit interview analysis.</strong> Feed the (de-identified) exit interview transcript to AI. Ask for the three themes and the one structural fix you should consider. Pattern matching is something AI does better than memory.</li>
            <li><strong>Training content drafting.</strong> Standard operating procedures, induction videos, internal knowledge base entries. AI cuts authoring time by 70%.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools to use in 2026</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>ChatGPT Plus or Team</strong> (around A$32 or A$45/seat/month inc GST) — general purpose drafts, interview questions, screening summaries.</li>
            <li><strong>Gemini for Workspace Business</strong> (around A$33/user/month inc GST) — best if you live inside Gmail and Google Docs; review templates and onboarding docs are friction-free.</li>
            <li><strong>Workable + AI</strong> — purpose-built ATS with AI screening features, AUD billing, around A$220/month base.</li>
            <li><strong>BambooHR</strong> — HR system of record with AI assistant for policy answers; popular with 20–100 staff AU SMEs.</li>
            <li><strong>Custom GPT or Gem</strong> — train on your real JDs, brand voice, internal handbook. Single owner spend: zero on top of existing Plus or Workspace.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU compliance — the three Acts that matter</h3>
          <p className="mt-2 text-slate-700">
            Three pieces of Australian law set the boundary on AI in HR.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Fair Work Act 2009</strong> — adverse action protections and unfair dismissal still apply when AI is involved. The Fair Work Ombudsman has been clear that AI-generated decisions require human review.</li>
            <li><strong>Sex Discrimination Act 1984</strong> + <strong>Age Discrimination Act 2004</strong> + <strong>Racial Discrimination Act 1975</strong> — AI screening that systematically disadvantages a protected attribute is unlawful, even if unintended.</li>
            <li><strong>Privacy Act 1988</strong> — APP 6 (use), APP 8 (cross-border) and APP 11 (security) apply to candidate and employee data. Sensitive information (health, race, sexual orientation, union) needs explicit consent before being processed by AI.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Bias guard — anti-discrimination practices when AI screens</h3>
          <p className="mt-2 text-slate-700">
            AI inherits bias from training data. Five practical guards keep you on the right side
            of AU law.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Redact protected attributes</strong> before AI screening — name, age, photo, address, gender, marital status. Use a name-redaction step in your prompt.</li>
            <li><strong>Use rubrics, not vibes.</strong> Ask AI to score against named competencies, not “best fit”.</li>
            <li><strong>Human always signs off.</strong> AI may shortlist; people offer interviews. Document the handover.</li>
            <li><strong>Sample-audit for adverse impact.</strong> Quarterly, review AI-screened decisions against demographic data. Adjust prompts if you see patterns.</li>
            <li><strong>Document your process.</strong> If a candidate complains, you need to show what AI did, what humans did, and why the decision was made.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sample 5-day onboarding plan</h3>
          <p className="mt-2 text-slate-700">
            Here is the AI-generated plan we use as a starter. Edit for your industry.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Day 1</strong> — Welcome lunch, IT setup, payroll forms, one-on-one with manager, intro to two key colleagues. End-of-day reflection prompt.</li>
            <li><strong>Day 2</strong> — Read team handbook (AI-generated summary first), shadow one team meeting, two short SOP walkthroughs.</li>
            <li><strong>Day 3</strong> — First small task with a clear definition of done. Coffee with each team member.</li>
            <li><strong>Day 4</strong> — Tour of customer-facing tools, one customer call observation, draft of week-1 reflection.</li>
            <li><strong>Day 5</strong> — Review with manager, three goals for next two weeks, feedback on onboarding itself.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost model — A$2,000 saved per hire</h3>
          <p className="mt-2 text-slate-700">
            Owner time on a typical hire breaks down: 4 hours on JD and ad copy, 8 hours on
            shortlisting, 6 hours on interviews, 3 hours on offer, 4 hours on onboarding plan, 2
            hours on first performance review. At a notional A$80/hour owner rate, that is a
            A$2,160 task. AI compresses the writing portions to about a third, returning A$1,400
            to A$2,000 in time per hire — usually the difference between “HR is a burden” and
            “hiring is now manageable”.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'AI compresses HR admin by 60–80% across the lifecycle, saving roughly A$2,000 per hire in owner time.',
              'Use rubrics, not vibes — ask AI to score against named competencies, never on "best fit".',
              'Redact protected attributes before AI screening — name, age, photo, address, gender, marital status.',
              'Fair Work, Sex/Age/Racial Discrimination, and Privacy Act all apply when AI is in the loop. Humans sign off every decision.',
              'Single owner toolkit: ChatGPT Plus or Gemini for Workspace plus a Custom GPT trained on your JDs and handbook.',
              'Quarterly audit AI-screened decisions for adverse impact across demographics; adjust prompts if patterns appear.',
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
            <p className="font-semibold text-slate-900">Exercise: Draft a JD plus interview pack for your next hire</p>
            <p className="mt-2">
              Even if you are not hiring this quarter, walk through the workflow once so it is
              ready when you need it.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Open ChatGPT or Gemini and pick the role you would hire next.</li>
              <li>Paste this prompt: <em>“Act as an Australian HR specialist. Draft a 350-word job description for a [role] in a [industry] SME of [N] staff. Include three measurable success criteria, the four competencies that matter most, and a Seek-friendly headline. Use Australian English.”</em></li>
              <li>Edit the JD until it sounds like you.</li>
              <li>Now ask: <em>“Generate ten behavioural interview questions tied to those four competencies, with two follow-up probes per question.”</em></li>
              <li>Save the JD and questions in a folder named <code>HR — Templates</code>. You will reuse this when the role goes live.</li>
            </ol>
            <p className="mt-3">Bonus: ask the same prompt of Claude. Compare the two outputs and merge the best parts.</p>
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
                1. Which Act protects employees from adverse action regardless of whether AI was involved in the decision?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Fair Work Act 2009</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Privacy Act 1988</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Corporations Act 2001</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Fair Work Act 2009. The Fair Work Ombudsman has confirmed AI-generated decisions still require human review for adverse-action and unfair-dismissal protections.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What should you do before pasting a CV into AI for screening?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Nothing, AI handles it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Redact protected attributes (name, age, photo, address, gender, marital status)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Translate it to English first</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Redact protected attributes. AI inherits training-data bias; redaction is the simplest guard against adverse impact under the discrimination Acts.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Roughly how much owner time can AI save per hire across the HR lifecycle?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> About A$200</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> About A$2,000</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> About A$20,000</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">About A$2,000 per hire. The writing portions of the lifecycle compress to a third; the human portions stay human.</p>
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
              Measuring AI ROI — beyond hours saved
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Four ROI dimensions, AUD-grounded measurement frameworks and how to present AI ROI
              to a board without overclaiming.
            </p>
          </div>
          <Link
            href="/academy/ai-for-business/lessons/measuring-ai-roi"
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
            href="/academy/ai-for-business"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI for Business
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
