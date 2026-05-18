import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Zap,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroProfessional } from '@/components/illustrations/hero-professional';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Personal OKRs with AI — AI Productivity Lesson 14 | LongCare Academy',
  description:
    'Use AI as your accountability partner for personal OKRs — quarterly cadence, weekly check-ins, prompt templates for OKR coaching and AU annual-leave-friendly work-life balance.',
  path: '/academy/ai-productivity/lessons/personal-okrs-with-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Personal OKRs with AI as Your Accountability Partner',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'AI Productivity',
    url: 'https://longcare.au/academy/ai-productivity',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function PersonalOkrsWithAiLessonPage() {
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
            { name: 'AI Productivity', url: '/academy/ai-productivity' },
            { name: 'Personal OKRs with AI', url: '/academy/ai-productivity/lessons/personal-okrs-with-ai' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 14 of 14 · Capstone
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Personal OKRs with AI as your accountability partner
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              OKRs are not just for tech companies — done well, they are the single best
              personal productivity scaffold for knowledge workers. Done with AI as a weekly
              accountability partner, they stick 3-4x longer.
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
                href="/academy/ai-productivity"
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

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The personal-OKR loop with AI
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Set OKR → Plan → Weekly review → Adjust → Reflect. AI handles steps 3-5 as a
            patient coach who never forgets last week.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">OKRs in 90 seconds</h3>
          <p className="mt-2 text-slate-700">
            OKR stands for Objectives and Key Results. The objective is a single sentence
            describing what you want to be true at the end of the quarter — qualitative,
            inspirational, possible to remember. The key results are 3 measurable outcomes that
            collectively prove the objective is true. Good KRs are numbers with deadlines.
            &ldquo;Get healthier&rdquo; is an objective; &ldquo;run 100 km, eat home-cooked
            five nights a week, lose 4 kg&rdquo; are KRs. The discipline is in the measurable
            part — without numbers, OKRs become aspirations.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why personal OKRs (and why quarterly)</h3>
          <p className="mt-2 text-slate-700">
            Most professionals have either no goal-setting at all, or annual goals that they
            forget by March. Quarterly OKRs are the sweet spot: long enough to make meaningful
            progress on something hard, short enough to maintain attention. We recommend three
            personal OKRs per quarter total — one career, one health/relationship, one
            learning or curiosity. Any more and they compete; any fewer and your year
            collapses into work.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The AI accountability prompt</h3>
          <p className="mt-2 text-slate-700">
            The single highest-leverage move is to paste your OKRs into a fresh chat at the
            start of each quarter — and reuse the same chat every week. Use this seed prompt:
            <em> &ldquo;Here are my three OKRs for this quarter. Each Sunday for the next 12
            weeks I will paste a one-paragraph update. Your job is: (1) ask me one clarifying
            question if my update is vague; (2) note any KR that is off-track; (3) suggest
            one concrete action I can take in the coming week; (4) flag if I have not mentioned
            an OKR for two weeks in a row. Be direct, not flattering.&rdquo;</em> ChatGPT,
            Claude and Gemini all handle this well; Claude tends to be slightly more honest
            in critique.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The weekly cadence — 15 minutes on Sunday</h3>
          <p className="mt-2 text-slate-700">
            Block 15 minutes every Sunday evening. Open your AI chat. Paste a one-paragraph
            update on each OKR — what you did, what is hard, what is next. Read the AI&rsquo;s
            response. Decide on one concrete action for the week and put it in your calendar.
            Close the chat. That is it. The pattern works for two reasons: writing the
            paragraph forces you to confront the data; the AI&rsquo;s clarifying question
            usually surfaces what you were avoiding. We have AU clients who have run this
            cadence weekly for 18 months — the chat history alone becomes a self-portrait
            worth reading.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Balancing work and personal OKRs</h3>
          <p className="mt-2 text-slate-700">
            A frequent failure mode is letting all three OKRs become work objectives. The
            rebalance is structural: pre-commit to one OKR being unambiguously not-work. For
            AU professionals especially, where annual leave is generous (20 days statutory plus
            10 public holidays) but underused, an explicit non-work OKR creates the permission
            to take it. We have seen Sydney lawyers go from 5 days of annual leave taken to
            18 in a year on the back of a single &ldquo;take 18 days of leave by Dec
            31&rdquo; KR. The board does not block what is already on the plan.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When you fall behind — recovery prompts</h3>
          <p className="mt-2 text-slate-700">
            Falling behind is normal. The trick is recovery without collapse. If you have
            missed two Sundays, do not try to back-fill the missed updates — start fresh with
            this prompt: <em>&ldquo;I missed the last two weekly check-ins. Here is the
            current state of my OKRs honestly. Give me a 3-week recovery plan that picks the
            most important KR to focus on and lets the others coast.&rdquo;</em> AI does
            recovery planning better than self-judgement does — it can see the math without
            the guilt.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When OKRs are not the right tool</h3>
          <p className="mt-2 text-slate-700">
            OKRs are bad for three things. <strong>Maintenance work</strong> — keeping a clean
            inbox, regular exercise, basic admin — those are habits, not OKRs; setting an OKR
            for them creates anxiety without lift. <strong>Reactive roles</strong> — pure
            customer support, urgent on-call work — these are measured by SLAs, not KRs.
            <strong> Highly creative work</strong> where the &ldquo;what&rdquo; emerges as you
            do it — writing a novel, exploratory research — needs a different scaffold (a
            streak, a daily session, a sketchbook). Use OKRs for the things where a 90-day
            measurable outcome makes sense; use something else for the rest.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">End-of-quarter reflection</h3>
          <p className="mt-2 text-slate-700">
            Five minutes per OKR at the end of the quarter, with AI as scribe. Use this
            prompt: <em>&ldquo;Based on the 12 weekly updates above, write a one-paragraph
            reflection for each OKR — what happened, what I learned, what I would do
            differently. Be honest, not gentle.&rdquo;</em> Save the reflection. Carry forward
            anything that is still wanted as part of next quarter&rsquo;s OKR draft. The
            quarterly reflection is the single most consistently-returned-to artefact our
            clients keep in their personal knowledge base.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">A worked Q3 2026 example</h3>
          <p className="mt-2 text-slate-700">
            Brisbane consultant, 38, two kids. Q3 OKRs: <em>Objective: Build the AI advisory
            practice into a real second revenue stream. KRs: A$25,000 in AI-advisory invoices
            issued by 30 September; 8 prospect calls per month; one published case study.</em>
            <em> Objective: Be present at home. KRs: phone in drawer 6-8pm on weeknights;
            two camping weekends with the kids; one 5-day proper holiday booked for Q4.</em>
            <em> Objective: Become competent at video production. KRs: ship 6 short videos
            by quarter end; finish one DaVinci Resolve tutorial; one shipped video that gets
            500+ views.</em> The shape is what matters — three OKRs, three to four numbered
            KRs each, half work and half life.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Three personal OKRs per quarter — one career, one health/relationship, one learning. More compete; fewer collapse into work.',
              'AI is the weekly accountability partner. Same chat all quarter; 15 minutes every Sunday.',
              'Pre-commit one OKR as not-work to unlock AU annual leave — the board does not block what is on the plan.',
              'Recovery prompts beat back-filling. AI plans 3-week recovery better than guilt does.',
              'OKRs are wrong for maintenance, reactive roles and highly creative emergent work — use habits or streaks instead.',
              'End-of-quarter AI-assisted reflection is the highest-return artefact most professionals never write.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 25 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Draft your next-quarter OKRs and seed the AI chat</p>
            <p className="mt-2">
              Do not aim for perfect. Aim for &ldquo;drafted enough to share with the AI on Sunday&rdquo;.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Pick three objectives — one career, one health/relationship, one learning.</li>
              <li>Write three measurable KRs for each. Numbers and deadlines, not adjectives.</li>
              <li>Start a fresh chat with ChatGPT, Claude or Gemini using the seed accountability prompt.</li>
              <li>Block 15 minutes every Sunday at 6pm in the calendar for 12 weeks.</li>
              <li>Tell one person (partner, mate, mentor) what your OKRs are.</li>
            </ol>
            <p className="mt-3">
              Drafted and announced is 80% of the value. The Sunday cadence does the rest.
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
                1. How many personal OKRs per quarter does this lesson recommend?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> One — focus everything</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Three — one career, one health/relationship, one learning</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Five or more — cover every area of life</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Three — any more compete for attention; any fewer let the year collapse into work.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why pre-commit one OKR as explicitly non-work?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> To trick yourself into working harder</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> To create permission to take AU annual leave — the board does not block what is on the plan</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because Atlassian requires it</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">It creates permission. Putting &ldquo;take 18 days of annual leave&rdquo; on the plan turns it from luxury to obligation.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. When are OKRs the wrong scaffold?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> For maintenance work, reactive roles and emergent creative work</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> For health goals</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> For learning goals</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Maintenance, reactive and emergent. Habits, SLAs and streaks suit each better than a 90-day KR.</p>
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
              You have finished the AI Productivity path — capstone done.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Fourteen lessons, one personal-OKR system. Advanced bootcamps, certifications and
              live AU cohorts land in Q4 2026.
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
            href="/academy/ai-productivity"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Productivity
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
