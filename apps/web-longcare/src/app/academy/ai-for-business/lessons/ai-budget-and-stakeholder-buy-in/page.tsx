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
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Budget & Stakeholder Buy-In — AI for Business Lesson 13 | LongCare Academy',
  description:
    'Get AI budget approved in 30 days — three framing styles, a one-page proposal template, stakeholder mapping, AUD inc-GST discount math and AU procurement-friendly pilot allocations.',
  path: '/academy/ai-for-business/lessons/ai-budget-and-stakeholder-buy-in',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI Budget Approval — Get Stakeholder Buy-In in 30 Days',
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

export default function AiBudgetAndStakeholderBuyInLessonPage() {
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
            { name: 'AI Budget & Stakeholder Buy-In', url: '/academy/ai-for-business/lessons/ai-budget-and-stakeholder-buy-in' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 13 of 14
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI budget approval — get stakeholder buy-in in 30 days
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Most AU AI proposals die not on cost but on framing. Here is the three-style
              framework, the one-page template, the stakeholder map and the AUD math we have
              watched land budget approvals at SMEs from Cairns to Hobart.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/ai-for-business/lessons/ai-roi-business-case"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson — ROI business case <ArrowRight className="size-4" />
              </Link>
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
            The 30-day buy-in playbook
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Frame → Map stakeholders → Draft 1-pager → Pre-wire → Decision meeting. Each step is
            shorter than the last; most of the work is in the first two.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why &ldquo;the right framing&rdquo; beats &ldquo;the right number&rdquo;</h3>
          <p className="mt-2 text-slate-700">
            In 2026 we have watched dozens of well-built AU SME AI proposals get killed by
            boards and partners — not on cost but on framing. The CFO heard &ldquo;new
            spending&rdquo;. The founder heard &ldquo;risk we cannot quantify&rdquo;. The
            operations lead heard &ldquo;another tool nobody will use&rdquo;. Get the framing
            right and even modest numbers get approved. Get the framing wrong and even
            slam-dunk numbers will be referred to a steering committee that meets twice a year.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three framing styles — pick by audience</h3>
          <p className="mt-2 text-slate-700">
            <strong>Cost-cutter framing</strong> works for CFOs and tight cash quarters. The
            opening line is &ldquo;we are leaving A$X on the table every month because of
            [manual task]&rdquo;. The pitch is about savings, hours back, vendor consolidation.
            Avoid this framing in growth quarters; it sounds defensive.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Growth framing</strong> works for founders, sales leaders and boards in
            expansion mode. The opening line is &ldquo;we can capture A$X of revenue that is
            walking past us today because we cannot respond fast enough&rdquo;. Pitch: new
            customers, faster cycle times, higher-touch service at the same cost.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Risk framing</strong> works for regulated industries (finance, health, aged
            care) and risk-averse boards. Opening: &ldquo;not adopting AI is now itself a risk
            — our top three competitors already have it; OAIC guidance assumes AU SMEs are
            building privacy-first AI; if we wait 12 months we will rebuild on someone
            else&rsquo;s back foot&rdquo;.
          </p>
          <p className="mt-2 text-slate-700">
            The framing decision is upstream of the slide deck. Once chosen, it picks the
            metrics you lead with, the case studies you reference, and the order of the
            one-page proposal.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The one-page proposal template</h3>
          <p className="mt-2 text-slate-700">
            Boards approve one-pagers. Steering committees lose two-pagers. Use these eight
            headings, one or two lines each: <em>The opportunity</em>, <em>The proposed
            pilot</em>, <em>What success looks like in 90 days</em>, <em>Budget (AUD inc GST,
            broken out)</em>, <em>Risks and mitigations</em>, <em>Privacy / compliance
            posture</em>, <em>Decision rights</em>, <em>What we need from you</em>. Use real
            numbers, name names, and leave white space. The first proposal you write will be
            twice as long as it should be — cut it in half before sending.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Stakeholder mapping — champion, sceptic, gatekeeper</h3>
          <p className="mt-2 text-slate-700">
            Every AU SME AI buy-in we have run featured the same three archetypes. The
            <strong> Champion</strong> is the colleague already running pet AI experiments —
            they need ammunition, not convincing. The <strong>Sceptic</strong> is the operations
            lead or senior staff member who has seen tools come and go. They need evidence and
            an opt-out. The <strong>Gatekeeper</strong> is the budget signer — usually the
            director or business owner. They need to know the worst case is capped. Map your
            three before the decision meeting; have a separate 15-minute coffee with each.
            Decisions happen in the coffees, not the meeting.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Discount math — AUD inc GST done right</h3>
          <p className="mt-2 text-slate-700">
            A common own-goal is presenting USD list prices when your CFO budgets in AUD inc
            GST. The fix: always show three columns — USD list, AUD ex GST at today&rsquo;s
            rate (use mid-market for budgeting), AUD inc GST. For OpenAI Team at US$30/user/mo,
            the AUD inc GST number at recent rates is roughly A$50/user/mo. For Microsoft 365
            Copilot at US$30, similar. Show annual commitment discounts when they apply (15-20%
            typical for Anthropic, OpenAI Enterprise, and most automation vendors). And include
            the cost of <em>not</em> doing it — leaked hours at a costed rate is real money in
            a 1-page proposal.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU procurement realities</h3>
          <p className="mt-2 text-slate-700">
            If your SME has even mild procurement formality (most firms over 50 staff), expect
            three friction points. A purchase order needs to be raised against a valid ABN
            invoice — many overseas AI vendors do not provide AU tax invoices by default,
            though most will on request. GST is recoverable for registered businesses, so
            present inc-GST budget numbers but flag the GST credit. And expect a vendor
            assessment form — Privacy Act compliance, ISO 27001, SOC 2, data residency
            (Australia or US?), and breach notification. Have these answers ready before the
            decision meeting so they do not become a five-week stall.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Red flag responses — when buy-in goes sideways</h3>
          <p className="mt-2 text-slate-700">
            Three objections come up in nearly every approval meeting. &ldquo;AI will replace
            jobs&rdquo; — response: pilot scope explicitly augments roles, not replaces; first
            metric is hours-redirected-to-higher-value-work, not headcount. &ldquo;What about
            our data?&rdquo; — response: data is processed under [vendor]&rsquo;s Privacy Act
            posture, hosted in [region], with no training on our data (true for OpenAI API,
            Anthropic API, Google Workspace AI add-ons, Microsoft 365 Copilot). &ldquo;We
            should wait until it&rsquo;s more mature&rdquo; — response: pilot is reversible in
            30 days at a cost ceiling of A$X; waiting is itself a decision with a known cost.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Pilot budget allocation — the 60/25/15 rule</h3>
          <p className="mt-2 text-slate-700">
            A healthy AU SME AI pilot budget breaks down roughly 60% subscriptions and tokens
            (the AI itself), 25% setup and training (people-time, internal or external), 15%
            measurement and governance (analytics, audit, the rollback plan). New buyers
            consistently overspend on (1) and underinvest on (2) and (3). The biggest single
            reason pilots fail is undertraining the team — a $500/month tool with $0 training
            budget rarely outperforms a $50/month tool with $200/month coaching. Tell that
            story explicitly in your one-pager so the gatekeeper does not red-line line 2.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Framing beats numbers — pick cost-cutter, growth or risk before drafting the proposal.',
              'One-page proposal, eight headings, white space. Boards approve one-pagers.',
              'Map champion, sceptic, gatekeeper — the decision happens in the 15-minute coffees, not the meeting.',
              'Show three columns: USD list, AUD ex GST, AUD inc GST. CFOs budget inc GST.',
              'Have AU procurement answers ready: ABN invoice, data residency, breach notification, Privacy Act posture.',
              'Allocate 60% tool / 25% training / 15% governance. Undertrained pilots fail; well-trained cheap pilots win.',
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
            <p className="font-semibold text-slate-900">Exercise: Draft your one-pager and stakeholder map</p>
            <p className="mt-2">
              Pick a real AI initiative you want approved this quarter.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Choose the framing style: cost-cutter, growth or risk. Write the opening line.</li>
              <li>Fill the eight one-pager headings on a blank page. Cut it in half before stopping.</li>
              <li>Name your champion, sceptic and gatekeeper. Book a 15-minute coffee with each this week.</li>
              <li>Build the three-column AUD price table for any vendor over A$100/month.</li>
              <li>Pre-write the response to the three red-flag objections so you do not freeze in the meeting.</li>
            </ol>
            <p className="mt-3">
              The right preparation moves the meeting from &ldquo;debate&rdquo; to &ldquo;decision&rdquo;.
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
                1. Which framing fits a CFO in a tight cash quarter?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Growth framing</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Cost-cutter framing</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Risk framing</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Cost-cutter. Lead with savings, hours back, vendor consolidation; quantify the leak.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why present USD, AUD ex GST and AUD inc GST in three columns?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> To show off conversion math</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because CFOs budget in AUD inc GST and a USD-only line invites a five-week stall</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Because OpenAI requires it</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">CFOs budget inc GST. Stripping the conversion to one number invites &ldquo;what is this actually going to cost me?&rdquo; in the meeting.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The 60/25/15 pilot budget rule means…
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 60% tool, 25% training, 15% governance</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 60% tool, 25% governance, 15% training</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 60% governance, 25% tool, 15% training</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">60% tool, 25% training, 15% governance. New buyers under-train, which is why most pilots fail.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next — Lesson 14</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Building an AI ROI business case the board will approve
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Four-pillar ROI model, three AUD case studies, conservative projections, payback math.
            </p>
          </div>
          <Link
            href="/academy/ai-for-business/lessons/ai-roi-business-case"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </Link>
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
