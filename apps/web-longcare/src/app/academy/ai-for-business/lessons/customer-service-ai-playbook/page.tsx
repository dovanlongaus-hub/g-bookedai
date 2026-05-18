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
  title: 'Customer Service AI Playbook — AI for Business Lesson 3 | LongCare Academy',
  description:
    'A 5-step customer-service AI playbook for Australian SMEs: triage, draft, escalate, resolve, survey. Tools, prompts, KPIs, and Privacy Act compliance.',
  path: '/academy/ai-for-business/lessons/customer-service-ai-playbook',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Customer Service AI Playbook for SMEs',
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

export default function CustomerServiceAIPlaybookLessonPage() {
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
            { name: 'Customer Service AI Playbook', url: '/academy/ai-for-business/lessons/customer-service-ai-playbook' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 3 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Customer service AI playbook for SMEs
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A five-step playbook proven across hospitality, professional services, and retail in
              Australia. Faster replies, fewer escalations, and a Privacy Act posture you can defend.
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

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The five-step service flow
          </h3>
          <div className="flex justify-center">
            <FlowAutomation width={760} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Ticket in → AI categorises → Drafts contextual reply → Human reviews and edits → Sent.
            The human stays in the loop on every reply that touches a customer.
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
              The transcript below is the full lesson; the video walks through the playbook live in
              Intercom and Zendesk.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why most SME chatbots fail</h3>
          <p className="mt-2 text-slate-700">
            The classic mistake is dropping a chatbot on the website and asking it to handle every
            ticket end-to-end. Customers get generic apologies, agents lose visibility, and trust
            erodes within a fortnight. The playbook below puts AI where it shines (categorisation,
            drafting, summarisation) and humans where they shine (judgement, empathy, edge cases).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Stage 1 &mdash; categorise the incoming ticket</h3>
          <p className="mt-2 text-slate-700">
            Before drafting anything, label the ticket. AI is excellent at this. Use a fixed taxonomy
            of 6&ndash;10 categories and a confidence score. Tickets below the threshold are flagged
            for human triage.
          </p>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;You are a triage assistant for an Australian [industry] business. Classify
            this ticket into one category from this list: [list]. Reply with JSON: category,
            confidence (0&ndash;1), one-line reason. If confidence below 0.75, set category to
            &lsquo;needs_human&rsquo;.&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Stage 2 &mdash; detect sentiment</h3>
          <p className="mt-2 text-slate-700">
            Sentiment is your priority signal. Angry customers and at-risk accounts move to the top
            of the queue automatically. Use three buckets &mdash; positive, neutral, negative &mdash;
            with a fourth flag for &ldquo;urgent legal/safety language&rdquo; that goes straight to
            the senior reviewer regardless of category.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Stage 3 &mdash; draft the contextual reply</h3>
          <p className="mt-2 text-slate-700">
            This is where Retrieval-Augmented Generation (RAG) over your knowledge base earns its
            keep. The AI is given (a) the customer&rsquo;s message, (b) the matched category,
            (c) the top three relevant articles from your help centre, and (d) the customer&rsquo;s
            recent history. It drafts a reply that cites the article. The human edits before
            sending.
          </p>
          <p className="mt-2 text-slate-700">
            Tools that do this well: Intercom Fin (about A$60/resolution), Zendesk Advanced AI
            (A$70/agent/month add-on), HubSpot Service Hub Pro AI, plus DIY stacks built on Custom
            GPTs or Claude Projects connected to your help centre.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Stage 4 &mdash; escalation rules</h3>
          <p className="mt-2 text-slate-700">
            Hard-code when humans always take over: refunds above your authorised limit, complaints
            mentioning legal action, anything involving a vulnerable customer (mental health,
            family violence flags), and any topic the AI&rsquo;s confidence is below 0.7. Australia
            takes consumer law seriously &mdash; ACCC penalties for misleading conduct can reach the
            higher of A$50m, three times the benefit, or 30% of turnover. The escalation rules are
            your insurance.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Stage 5 &mdash; post-resolution survey and learning</h3>
          <p className="mt-2 text-slate-700">
            After resolution, send a one-question CSAT and a free-text comment box. Feed every
            negative survey back into the AI as training context. Within a quarter, your AI&rsquo;s
            first-draft quality climbs noticeably because it learns your customers&rsquo; real
            objections, not the ones you assumed.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">KPIs to track from day one</h3>
          <p className="mt-2 text-slate-700">
            Five metrics &mdash; first-response time (target under 10 minutes business hours),
            resolution time, CSAT (target 4.5/5), escalation rate (10&ndash;25% is healthy; under
            5% means the AI is hiding things), and reopen rate (under 8%). Track all five weekly.
            Celebrate first-response wins; investigate any CSAT drift before it becomes a trend.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy Act 1988 in plain English</h3>
          <p className="mt-2 text-slate-700">
            Customer service tickets are personal information under APP 1&ndash;13. If your AI
            vendor stores data offshore, your privacy collection statement must say so. Most
            enterprise plans for Intercom, Zendesk, and HubSpot offer Australian/EU data residency
            for an extra fee &mdash; usually worth it. Free tiers often default to US residency,
            which is legal but must be disclosed. When in doubt, talk to a privacy lawyer once and
            update the statement once.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">90-day rollout for SMEs</h3>
          <p className="mt-2 text-slate-700">
            Weeks 1&ndash;2: pick a tool, import help-centre articles, set up categories. Weeks
            3&ndash;6: AI drafts, human always edits. Weeks 7&ndash;10: introduce auto-send for the
            two simplest categories with confidence above 0.9. Weeks 11&ndash;13: review metrics,
            tune categories, expand. Don&rsquo;t skip steps. The shops that try to auto-resolve in
            week one are the same shops on Reddit complaining that AI ruined their CSAT.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'AI categorises and drafts; humans approve and send. Don’t skip the human review until your category metrics are stable.',
              'Use confidence thresholds (around 0.75) to auto-route low-confidence tickets to humans.',
              'Hard-code escalation rules for refunds, legal language, and vulnerable customers.',
              'Track 5 KPIs weekly: first-response time, resolution time, CSAT, escalation rate, reopen rate.',
              'Healthy escalation rate is 10–25% — below 5% means AI is hiding tickets, not solving them.',
              'Privacy Act compliance: disclose offshore storage; pick AU/EU residency where possible.',
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
            One short hands-on exercise. Total time: 15 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: write your taxonomy</p>
            <p className="mt-2">
              Open a Google Doc. List your 6&ndash;10 most common ticket categories. Beside each,
              write a one-line description and a sample subject line. Pick three you would
              auto-draft on day one and three you would always escalate. This document is your
              playbook foundation &mdash; everything else hangs off it.
            </p>
            <p className="mt-3 italic">
              Bonus: paste five real anonymised tickets into ChatGPT and ask it to classify them
              against your taxonomy. The misses tell you which categories overlap.
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
                1. What does an escalation rate below 5% usually mean?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Your AI is performing perfectly</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Your AI is hiding hard tickets, not solving them</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Your customers love the chatbot</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">It usually means tickets that should reach a human are being closed or deflected. Investigate before celebrating.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which trigger should always escalate to a human?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The customer used an emoji</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The customer mentioned legal action or vulnerability</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The ticket is over 100 words</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Legal-language or vulnerability mentions go straight to a senior reviewer regardless of category.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is RAG used for in stage 3?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Renaming customers</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Grounding replies in your help-centre articles</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Restoring lost tickets</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Retrieval-Augmented Generation grounds the draft in real, current help-centre articles so the AI can cite a source.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 5</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Customer service: chatbots and ticket triage
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              How to scale safe deflection beyond drafts &mdash; the next stage after this playbook.
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
            All free lessons
          </Link>
        </div>
      </section>
    </main>
  );
}
