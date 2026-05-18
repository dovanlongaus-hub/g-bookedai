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
import { HeroSolutions } from '@/components/illustrations/hero-solutions';
import { InfographicRoiQuadrant } from '@/components/illustrations/infographic-roi-quadrant';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for SMEs — A Practical Map | LongCare Academy',
  description:
    'Where AI gives Australian SMEs the biggest ROI, and where it usually doesn’t. Lesson 1 of the AI for Business path. Free.',
  path: '/academy/ai-for-business/lessons/ai-for-sme-overview',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for SMEs — A Practical Map',
  educationalLevel: 'SME owners',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
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

export default function AIForSMEOverviewLessonPage() {
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
            { name: 'AI for SMEs', url: '/academy/ai-for-business/lessons/ai-for-sme-overview' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Building2 className="size-3" /> Lesson 1 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Start course free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for SMEs — A Practical Map
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Where AI actually pays for itself in an Australian small business — and the four
              places it’s overrated. By the end of this lesson you’ll know which use case to
              chase first.
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
            <HeroSolutions className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* ROI quadrant infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The ROI quadrant
          </h3>
          <div className="flex justify-center">
            <InfographicRoiQuadrant width={720} height={360} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Volume × stakes — every AI use case lands somewhere on this grid. Start in the top-left.
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
            <span className="text-sm">Video coming Q3 2026 · 20 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Adds case study interviews with three Australian SME owners on top of the transcript below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The ROI quadrant</h3>
          <p className="mt-2 text-slate-700">
            Every potential AI use case for your SME sits somewhere on a simple two-by-two
            grid: <strong>volume</strong> on one axis, <strong>stakes</strong> on the other.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>High volume, low stakes</strong> — the sweet spot. Customer emails, social posts, internal updates, FAQs. Fast wins, mistakes are cheap, AI saves real hours every day.</li>
            <li><strong>Medium stakes, medium volume</strong> — proposals, customer support replies, supplier negotiations. AI drafts, human reviews. Big productivity gains with a safety net.</li>
            <li><strong>High stakes, low volume</strong> — financial advice, legal positions, clinical decisions. AI is research-only here. The human signs.</li>
            <li><strong>High stakes, high volume</strong> — rare in SME, but if you find it (e.g. credit decisions), invest in proper systems with audit trails, not a chat window.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            The order of attack is simple: start in the top-left, expand into the middle, and
            never let AI sign off the bottom row alone.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Four functions where AI pays off</h3>
          <p className="mt-2 text-slate-700">
            Across hundreds of AU SMEs we’ve worked with, four functions consistently return
            the investment within the first month:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Sales</strong> — drafting personalised outreach, qualifying inbound leads, summarising discovery calls. Typical lift: 1.5–2× outreach volume per rep.</li>
            <li><strong>Operations</strong> — turning meetings into action items, reformatting reports, generating SOPs from messy notes. Typical lift: 6–10 hours/week back per ops manager.</li>
            <li><strong>Customer service</strong> — first-draft replies, ticket categorisation, suggesting macros. Typical lift: 30–50% faster average handle time, with quality holding.</li>
            <li><strong>Marketing</strong> — content calendars, social variants, basic SEO copy, ad headline testing. Typical lift: 3–5× content output, especially for very small teams.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Four functions where AI is overrated (today)</h3>
          <p className="mt-2 text-slate-700">
            We’d rather you skip the disappointment. Today, AI is overhyped for:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Strategic decisions</strong> — pricing, hiring, market entry. AI can summarise data, not bear the consequences.</li>
            <li><strong>Bookkeeping accuracy</strong> — Xero and MYOB already automate the easy bits. Adding a chat layer on top of messy data just hides errors.</li>
            <li><strong>Original creative</strong> — your brand voice, logo, naming. Use AI to brainstorm, not to ship.</li>
            <li><strong>Truly novel research</strong> — patent searches, niche compliance interpretations. AI is wrong often enough that the verification time exceeds the saved time.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Australian considerations</h3>
          <p className="mt-2 text-slate-700">
            Three things make AU SMEs different from American case studies you’ll read online:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Privacy Act 1988 &amp; APPs.</strong> If you handle personal information, you must know where that data flows. Many enterprise AI plans now offer Australian data residency — use them.</li>
            <li><strong>Fair Work obligations.</strong> Don’t let AI tools make hiring or termination decisions unsupervised. Use AI for shortlisting and drafting, not for final calls.</li>
            <li><strong>ATO and BAS context.</strong> AI is great for explaining tax concepts to your team; it is not your registered tax agent. Always cross-check anything tax-related.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Decision framework: automate vs. human-in-the-loop</h3>
          <p className="mt-2 text-slate-700">
            Before you automate any task, ask three questions:
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Cost of a wrong answer?</strong> If a single bad output could lose a customer, hurt a person, or breach a regulation — keep a human reviewer.</li>
            <li><strong>Frequency?</strong> If it happens fewer than five times a week, leave it manual. The setup cost won’t pay back.</li>
            <li><strong>Detectability?</strong> If a wrong answer is obvious to the recipient (e.g. broken link, weird tone), risk is lower. If it would slip past unnoticed, raise the bar.</li>
          </ol>
          <p className="mt-2 text-slate-700">
            High cost or low detectability → human-in-the-loop. Otherwise, automate with monitoring.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Map every use case on volume × stakes — start with high-volume, low-stakes work.',
              'Sales, ops, customer service, and marketing are the four reliable AI ROI engines for AU SMEs.',
              'Strategic decisions, bookkeeping accuracy, original creative, and novel research stay human-led.',
              'Privacy Act, Fair Work, and ATO obligations remain yours — AI doesn’t take responsibility.',
              'Use the cost × frequency × detectability test before you automate anything end-to-end.',
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
          <p className="text-sm text-slate-600 mb-4">
            One short, business-specific exercise. Total time: 10 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Score your top three tasks</p>
            <p className="mt-2">Pick the three most time-consuming tasks in your business this week. For each, score:</p>
            <ul className="mt-2 list-disc pl-6">
              <li>Volume (how many times per week)</li>
              <li>Stakes (impact if AI gets it wrong, 1–5)</li>
              <li>Function (sales / ops / CS / marketing / other)</li>
            </ul>
            <p className="mt-3">
              Then circle the one task that scores highest volume + lowest stakes. That’s your
              first AI pilot. Bring it to the rest of the course — every later lesson builds on
              this concrete example.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Quick check</h2>

          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-slate-900">
                1. Which use case is the strongest first AI pilot for an SME?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Replacing your bookkeeper</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Drafting standard customer support replies</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Choosing a new pricing strategy</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Drafting standard customer support replies — high volume, low stakes, with a human approving each send.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why must AU SMEs care about Privacy Act 1988 when using AI?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> AI breaks all data laws by default</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Personal information may flow offshore unless you check the data residency settings</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The Privacy Act exempts AI tools</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Personal information may flow offshore. Many AI tools route data to the US — choose AU residency where it matters.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. According to the decision framework, which factor most strongly demands a human reviewer?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The task happens daily</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Errors would slip past the recipient unnoticed</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The task is in marketing</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Errors slipping past unnoticed (low detectability) is the strongest reason to keep a human in the loop.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 2</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              AI for sales: lead generation and qualification
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Concrete plays for using AI on top of your existing CRM.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Coming soon
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
            href="/academy"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            All paths
          </Link>
        </div>
      </section>
    </main>
  );
}
