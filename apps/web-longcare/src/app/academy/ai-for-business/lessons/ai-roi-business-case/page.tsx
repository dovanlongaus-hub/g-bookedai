import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
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
import { InfographicRoiQuadrant } from '@/components/illustrations/infographic-roi-quadrant';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI ROI Business Case — AI for Business Lesson 14 | LongCare Academy',
  description:
    'Build an AI ROI business case the AU board will actually approve — four-pillar model, conservative projections, three AUD case studies, payback math and the boring math that consistently wins.',
  path: '/academy/ai-for-business/lessons/ai-roi-business-case',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Building an AI ROI Business Case the Board Will Approve',
  educationalLevel: 'SME owners',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function AiRoiBusinessCaseLessonPage() {
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
            { name: 'AI ROI Business Case', url: '/academy/ai-for-business/lessons/ai-roi-business-case' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 14 of 14 · Capstone
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Building an AI ROI business case the board will approve
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Boring math wins boards. Here is the four-pillar AI ROI model we use with AU SME
              clients, three real case studies with AUD numbers, and the conservative-projection
              technique that has yet to lose a vote.
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

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The four-pillar ROI quadrant
          </h3>
          <div className="flex justify-center">
            <InfographicRoiQuadrant width={720} height={420} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Savings, revenue, risk and intangible. The boring board cases lead with savings; the
            losing ones lead with intangible.
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
            <span className="text-sm">Video coming Q3 2026 · 30 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why a four-pillar model — and why this order</h3>
          <p className="mt-2 text-slate-700">
            A good AI ROI model has four pillars: <strong>savings</strong> (hours, headcount
            redirected, vendor consolidation), <strong>revenue</strong> (new pipeline, faster
            sales cycles, higher win rates), <strong>risk</strong> (reduced compliance exposure,
            reduced key-person concentration, faster incident response), and
            <strong> intangible</strong> (brand, recruiting, optionality). The order matters.
            Boards approve pillar 1 fastest because the numbers are auditable. They approve
            pillar 2 cautiously because numbers are projections. They approve pillar 3 in
            regulated industries. Pillar 4 alone almost never approves a budget. Lead with
            savings even if revenue is your real story.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case study 1 — Sydney accounting practice, 12 staff</h3>
          <p className="mt-2 text-slate-700">
            Tooling: ChatGPT Team (12 seats), Karbon AI, Xero AI. Year-one AUD inc GST cost:
            A$15,400 in subscriptions, A$8,000 in initial training and rollout, A$3,000 in
            governance and audit. Total: A$26,400. Year-one benefits: 22 hours/week of senior
            accountant time redirected to higher-value work at a A$120/hour cost rate
            (A$137,000 equivalent saved), three additional new clients won from faster
            response times (A$45,000 annualised), one staff member promoted from junior to
            senior on the back of AI-augmented productivity (intangible). Conservative
            year-one ROI: A$182,000 in benefits against A$26,400 in cost. The number the
            board wants to see is the savings line alone, which already covers cost 5x over.
            Revenue is the upside, intangible is the encore.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case study 2 — Brisbane logistics, 38 staff</h3>
          <p className="mt-2 text-slate-700">
            Tooling: custom AI-augmented dispatch (n8n + Gemini), Microsoft 365 Copilot for
            ops admin, Otter.ai for customer call summaries. Year-one AUD inc GST cost:
            A$31,200 subscriptions, A$22,000 build (3 weeks of contractor time), A$5,000
            governance. Total: A$58,200. Benefits: 11% reduction in late deliveries via AI
            route adjustment (A$78,000 saved penalty fees + customer-credit refunds),
            customer NPS up 14 points (intangible), 4.2 FTE-hours/week of dispatch admin
            redirected (A$22,000 annualised cost-redirect). Total quantifiable benefits:
            A$100,000 against A$58,200 cost. Less spectacular than the accounting case but
            still 1.7x ROI year one with the second-year cost falling to A$32,000.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Case study 3 — Melbourne SaaS, 8 staff</h3>
          <p className="mt-2 text-slate-700">
            Tooling: Claude Pro (8 seats), Cursor (6 dev seats), Linear AI, Granola. Year-one
            AUD inc GST cost: A$11,800 subscriptions, A$0 training (it was &ldquo;learn as we
            go&rdquo; — which they regretted), A$2,400 governance. Total: A$14,200.
            Benefits: dev velocity up 28% measured by PR merge rate (intangible-ish but
            tracked), one senior hire avoided in Q3 because two seniors became 2.5 with AI
            augmentation (A$140,000 deferred), customer support response time down from 4
            hours to 28 minutes (intangible, but tied to a 2-point churn reduction).
            Quantifiable: A$140,000 against A$14,200 cost. The board approved year-two
            doubling without debate.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The boring math wins — conservative projections</h3>
          <p className="mt-2 text-slate-700">
            Every AI ROI case we have watched die at board did so because the projections were
            too optimistic. The fix: pick a 50% haircut on every benefit, and a 30% padding on
            every cost. Re-run the math. If the case still pays back inside 12 months, present
            both versions side by side (&ldquo;conservative&rdquo; and &ldquo;realistic&rdquo;).
            If the conservative version does not pay back, the case probably should not be
            funded. The board will not trust a case where the realistic and conservative
            numbers diverge by more than 3x — that signals the modeller does not know which
            assumptions matter.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sensitivity analysis — three lines on a chart</h3>
          <p className="mt-2 text-slate-700">
            Boards love sensitivity tables. The simplest is three columns — &ldquo;adoption
            50%&rdquo;, &ldquo;adoption 75%&rdquo;, &ldquo;adoption 100%&rdquo; — with the
            payback period for each. If your project pays back inside 18 months at 50%
            adoption, the case is robust. If it only pays back at 100% adoption, the case is
            fragile and someone will say so. Build the table before the meeting and put it on
            page 2 of the proposal where the curious can find it without distracting the
            decision-maker.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Payback period — the only number that matters</h3>
          <p className="mt-2 text-slate-700">
            For AU SME boards in 2026, the single number we have watched move every meeting
            is payback period in months. Under 6 months: approved with a smile. 6-12 months:
            approved. 12-18 months: approved with conditions. 18-24 months: a debate. Over
            24 months: rare without strategic framing. Build the model so payback is the
            headline number on the one-pager, not net present value or IRR (boards
            understand months; IRR remains specialist).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Common board questions — and pre-written answers</h3>
          <p className="mt-2 text-slate-700">
            Five questions come up in nearly every approval meeting. <em>How do we know we
            will actually save those hours?</em> Answer: a 30-day baseline measurement before
            spend (we cover this in the &ldquo;measuring AI ROI&rdquo; lesson). <em>What if
            the tool gets expensive?</em> Answer: contractual exit at 30 days for SaaS,
            ceiling clause in the proposal. <em>What about the people we redirect?</em>
            Answer: redirect to named higher-value work, written into the rollout plan.
            <em> What if we adopt and it does not stick?</em> Answer: a rollback runbook
            (covered in the AI Automation path). <em>What happens at renewal?</em> Answer:
            a 90-day review with go/no-go, baked into the contract from day one.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When to present and when to delay</h3>
          <p className="mt-2 text-slate-700">
            Time the ask. Avoid presenting in the same quarter as a major IT or premises
            spend; the gatekeeper&rsquo;s &ldquo;no&rdquo; reflex is already on. Avoid the
            same meeting as a layoff conversation or a financial result review — emotion
            crowds out math. The sweet spots are the first board after a strong quarter, the
            board immediately after a competitor announcement, or the planning board where
            annual budgets get debated. Pre-wire each board member 5 working days before, the
            sceptic last, and arrive with a single clean ask.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Four pillars in order — savings, revenue, risk, intangible. Boards approve savings fastest.',
              'Conservative projections beat optimistic. Apply a 50% benefit haircut and 30% cost padding before presenting.',
              'Payback period in months is the only headline number boards consistently understand and act on.',
              'Sensitivity table at 50/75/100% adoption defends the case under pressure without slowing the meeting.',
              'Pre-write answers to the five standard board questions — baseline, exit, redirect, rollback, renewal.',
              'Time the ask: first board after a strong quarter, after a competitor announcement, or at annual planning.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 30 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build your one-page business case</p>
            <p className="mt-2">
              Pick a real AI initiative; build the four-pillar model on one page.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>List your benefits across savings / revenue / risk / intangible, AUD year-one.</li>
              <li>Apply a 50% haircut to every benefit and a 30% padding to every cost. Recompute.</li>
              <li>Calculate the payback period in months. If over 18 months, rework or shrink the scope.</li>
              <li>Build the three-column sensitivity table at 50/75/100% adoption.</li>
              <li>Write pre-answers to the five standard board questions on the back of the page.</li>
            </ol>
            <p className="mt-3">
              A one-page business case with conservative math is the most-approved AI artefact at AU SMEs in 2026.
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
                1. Which pillar should the board case lead with for the highest approval rate?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Intangible — brand and culture</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Savings — auditable hours and dollars</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Revenue — projected pipeline</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Savings. They are auditable, near-term, and convert directly into payback months.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. The 50/30 rule means…
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> 50% benefit haircut, 30% cost padding</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> 30% benefit haircut, 50% cost padding</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> 50% confidence threshold for proceeding</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">50% benefit haircut, 30% cost padding. Conservative math that still pays back is the most defensible case.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The single number AU SME boards consistently act on?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Internal rate of return (IRR)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Payback period in months</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Net present value (NPV)</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Payback period in months. IRR and NPV remain specialist; boards across AU SMEs consistently move on months.</p>
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
              You have finished the AI for Business path — capstone done.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Fourteen lessons, one business-case capstone. Advanced bootcamps, certifications
              and live AU cohorts land in Q4 2026.
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
