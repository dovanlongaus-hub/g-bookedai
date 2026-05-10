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
import { HeroSolutions } from '@/components/illustrations/hero-solutions';
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Sales and Marketing — AI for Business Lesson 2 | LongCare Academy',
  description:
    'Practical AI plays for Australian SME sales and marketing teams in 2026 — lead gen, content velocity, sales enablement, and Spam Act / Privacy Act compliance.',
  path: '/academy/ai-for-business/lessons/sales-and-marketing-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for Sales and Marketing — Practical Plays for Australian SMEs',
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

export default function SalesAndMarketingAILessonPage() {
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
            { name: 'Sales and Marketing AI', url: '/academy/ai-for-business/lessons/sales-and-marketing-ai' },
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
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for sales and marketing — practical plays for Australian SMEs
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The plays that move pipeline this quarter — not the slideware. Plus the Spam Act and
              Privacy Act guardrails most agencies forget to mention.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
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

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The end-to-end AI sales flow
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Lead in &rarr; AI qualifies &rarr; Personalised outreach &rarr; Meeting booked &rarr;
            CRM logged. Every stage has a free or near-free AI option in 2026.
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
              Live walk-throughs of Apollo, Clay, and HubSpot AI in production.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Lead generation that respects your prospect</h3>
          <p className="mt-2 text-slate-700">
            The single biggest unlock in 2026 is AI-assisted ICP refinement. Instead of buying a
            generic Australian B2B list and spraying it, paste your top 20 customers into
            ChatGPT, Gemini, or Claude and ask: <em>“Cluster these by industry, employee size,
            revenue band, and the trigger that probably caused them to buy. Then suggest five
            new lookalike segments and the buying triggers I should monitor.”</em> The output is
            a sharper ICP than most agencies will write for $5,000.
          </p>
          <p className="mt-2 text-slate-700">
            Tools like Clay and Apollo plug AI directly into prospect enrichment — pull a
            LinkedIn URL, fetch publicly available signals (recent funding, hiring spike, tech
            stack), and let an LLM write a one-line opener tied to a real fact about the
            prospect. The win is not volume; it is relevance. A 50-prospect / 20% reply rate
            outperforms a 5,000-prospect / 0.4% reply rate every time.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Content velocity without becoming slop</h3>
          <p className="mt-2 text-slate-700">
            The trap is letting AI write everything from scratch. The pattern that works: you
            write the spine in 200 words — the argument, the example, the call to action —
            and AI handles the variations. One blog becomes:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>5 LinkedIn posts (different angles)</li>
            <li>3 email-newsletter teasers (different audiences)</li>
            <li>A 60-second script for a phone-camera video</li>
            <li>10 ad-copy variants for Meta or Google testing</li>
            <li>An FAQ page derived from the comments you reply to</li>
          </ul>
          <p className="mt-2 text-slate-700">
            The skill is the spine, not the volume. Without the spine, AI produces beige content
            that ranks nowhere and converts no one.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sales enablement — the proposal accelerator</h3>
          <p className="mt-2 text-slate-700">
            The compounding play here is a <em>structured proposal library</em>. Take your last
            ten won proposals, anonymise the client names, and feed them to Claude with the
            prompt: <em>“Extract the reusable sections — discovery summary, objectives, scope,
            phase plan, pricing rationale, risk register, sign-off block. Build a master
            template and a question bank I can answer in 15 minutes for any new opportunity.”</em>
            Now every new proposal starts at 80% complete instead of zero. Human judgement on
            scope, price, and risk; AI does the typing and formatting.
          </p>
          <p className="mt-2 text-slate-700">
            Pair this with an objection-handling library. Take last quarter’s &ldquo;why we
            didn&apos;t go ahead&rdquo; emails, paste them into ChatGPT, and ask for the top
            five objection patterns plus a rebuttal for each that your reps can adapt in real
            time. Run this every quarter — your pricing and competitor objections shift faster
            than any sales playbook can keep up.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Customer insights from text you already own</h3>
          <p className="mt-2 text-slate-700">
            Your support tickets, NPS comments, Google reviews, and Trustpilot replies are the
            cheapest market research budget you have already paid for. Bundle them by quarter
            and ask Gemini: <em>“Cluster these comments by theme. For each theme, give me the
            severity, frequency, and the verbatim quote that best represents it.”</em> You will
            find the language your customers use about themselves — which is the language your
            ad copy should use.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five AU-specific plays</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Suburb pages for real-estate.</strong> One spine of suburb research becomes 50 suburb-specific landing pages, each with local schools, transport, and recent comparable sales. Google rewards specificity.</li>
            <li><strong>Industry comparison content for B2B services.</strong> Compare your pricing to what an in-house hire costs in Sydney vs Melbourne, including super and payroll tax. AI does the maths; you do the trust-building.</li>
            <li><strong>Trade quotes from voice notes.</strong> A tradie dictates a 90-second voice memo at the site; AI turns it into an itemised PDF quote on the drive home. Worth six hours a week to a one-truck operation.</li>
            <li><strong>Bilingual ad creatives.</strong> Australia is the most multicultural OECD country. Run Mandarin, Vietnamese, Arabic, and Korean ad variants from a single English brief.</li>
            <li><strong>Local SEO FAQ blocks.</strong> Pull the top 10 “people also ask” questions for your service in Australia, write 80-word answers, and embed them with FAQ schema. Cheapest organic lift available.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Compliance — Spam Act 2003 and Privacy Act</h3>
          <p className="mt-2 text-slate-700">
            Two laws set the rails. The <strong>Spam Act 2003</strong> requires consent (express
            or inferred) for commercial electronic messages, accurate sender identification, and
            a working unsubscribe in every message. AI does not give you a free pass to bulk-DM
            cold prospects on LinkedIn, SMS, or email — the rules apply to AI-generated outreach
            the same way they apply to human-written outreach.
          </p>
          <p className="mt-2 text-slate-700">
            The <strong>Privacy Act 1988</strong> and the 13 Australian Privacy Principles cover
            how you collect, store, and use personal information about prospects. If you enrich
            a prospect record with AI (job title, company size, recent activity), document the
            source, the purpose, and the retention period. The 2024-26 amendments raised the
            penalty ceiling — small operators now risk meaningful fines for sloppy data
            handling, not just enterprises.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools we recommend in 2026</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>HubSpot AI</strong> — Breeze copilots inside HubSpot Marketing/Sales/Service, ideal if you already pay for HubSpot.</li>
            <li><strong>Apollo.io</strong> — prospecting + sequencing with native AI personalisation, AUD pricing from $99/seat/month.</li>
            <li><strong>Clay</strong> — best-in-class enrichment + AI prospect research, around AUD $230/month for the Starter plan.</li>
            <li><strong>ChatGPT Team / Gemini for Workspace</strong> — the workhorses for content, analysis, and one-off tasks.</li>
            <li><strong>Smartlead / Lemlist</strong> — multi-inbox AI cold outreach with deliverability monitoring.</li>
          </ul>

          <p className="mt-4 text-slate-700">
            Choose two tools, not five. Most over-toolled SMEs send less personal, less effective
            outreach than the disciplined ones running on a notebook and a single AI assistant.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'AI sharpens the ICP — paste 20 wins, get a clustered, lookalike-ready segment list.',
              'Content velocity needs a human spine; AI handles variations, not first principles.',
              'A structured proposal library + objection bank turns AI into a senior sales coach for the whole team.',
              'Customer text you already own (tickets, reviews, NPS) is the cheapest market research budget.',
              'Spam Act and Privacy Act apply to AI-generated outreach — keep consent, sender ID, and unsubscribe right.',
              'Pick 2 tools, not 5. Apollo + ChatGPT, or Clay + Gemini, is enough for most AU SMEs.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 15 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Run the ICP-cluster prompt on your real customer list</p>
            <p className="mt-2">
              Pull your top 20 customers from your CRM or a spreadsheet — names you can share
              internally, no public PII. Strip the contact details. Paste into Claude or
              ChatGPT with this prompt:
            </p>
            <p className="mt-3 italic">
              “You are a B2B segmentation analyst for an Australian SME. The list below is my
              top 20 customers by revenue last year. Cluster them by industry, employee size,
              revenue band, and the buying trigger you can infer. Then list five lookalike
              segments to target this quarter and the trigger event I should monitor for each.
              Use Australian English. Do not invent customers that are not on the list.”
            </p>
            <p className="mt-3">
              Look at the segments. Do they match how you describe the business to a friend at
              the pub? If not, the gap between your real ICP and your assumed ICP just got
              visible — that is the lesson.
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
                1. What is the right starting point for content velocity with AI?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Auto-publish 30 AI-generated blog posts a month</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Write a 200-word human spine, then let AI produce variations</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Buy a content agency retainer</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Write the human spine first. Without an opinion, AI produces beige slop that ranks nowhere.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which AU law primarily governs AI-generated cold email and SMS outreach?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Competition and Consumer Act</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Spam Act 2003</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Corporations Act</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Spam Act 2003. Consent, sender ID, and unsubscribe rules apply to AI-generated outreach the same as human outreach.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The fastest objection-handling library uses&hellip;
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> A consultant&apos;s 50-page playbook</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Last quarter&apos;s &ldquo;why we didn&apos;t buy&rdquo; emails clustered by AI</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> A LinkedIn course</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Last quarter&apos;s lost-deal emails. They are the freshest, most local data you own.</p>
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
              AI-written proposals and quotes that convert
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The proposal accelerator workflow — from discovery notes to a sign-ready PDF in 30 minutes.
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
