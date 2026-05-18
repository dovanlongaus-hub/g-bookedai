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
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Document & Research AI — AI Productivity Lesson 3 | LongCare Academy',
  description:
    'Notion AI, Coda AI, Perplexity, Google Docs Help me write, Claude Projects, ChatGPT Deep Research compared — five high-ROI use cases with AUD pricing and privacy notes.',
  path: '/academy/ai-productivity/lessons/document-and-research-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Document & Research AI — Drafts, Summaries, Deep Research',
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

export default function DocumentAndResearchAILessonPage() {
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
            { name: 'Document & Research AI', url: '/academy/ai-productivity/lessons/document-and-research-ai' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 3 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Document &amp; research AI &mdash; drafts, summaries, deep research
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Five high-leverage use cases that turn AI into the world&rsquo;s most patient research
              assistant &mdash; without sacrificing your judgement or your privacy posture.
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
                href="/academy/ai-productivity"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroToolkit className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Source &rarr; AI summary &rarr; polished output
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Document AI is at its best when humans collect the sources, AI compresses, and humans
            polish. Skip the human polish at your peril.
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
              Transcript below contains every prompt and tool path the video covers.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The tools landscape in 2026</h3>
          <p className="mt-2 text-slate-700">
            Document AI splits into three families. <strong>In-document assistants</strong> live
            inside Notion, Coda, Google Docs, and Microsoft Word &mdash; convenient because the
            text is already where you are. <strong>Standalone chats</strong> like ChatGPT and
            Claude excel when you can paste sources and need depth. <strong>Research-first
            tools</strong> &mdash; Perplexity, ChatGPT Deep Research, Claude with web search &mdash;
            specialise in citing fresh sources you can verify. Pick the right family for the job.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 1 &mdash; weekly report drafting</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Notion AI (A$15/month) or Google Docs Help me write (bundled with Workspace
            Business). Workflow: paste your raw bullet points, ask for a 400-word draft in your
            firm&rsquo;s tone, edit one paragraph, and publish. Saves 35&ndash;45 minutes per
            weekly report. Run it Friday afternoon and your stakeholders get cleaner updates with
            no Sunday-evening writing.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 2 &mdash; research briefs with citations</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Perplexity (free tier strong, Pro A$30/month for the better models),
            ChatGPT Deep Research (Plus A$30/month gives 10 deep researches, Pro A$300/month for
            heavier limits). Workflow: ask a precise question, scan the cited sources, click
            through to verify. Perplexity in particular is a delight because every claim has an
            inline source link &mdash; the citations are checkable in seconds.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 3 &mdash; document Q&amp;A (RAG)</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Claude Projects (Plus A$30/month, Team A$45/seat/month with audit logs),
            Google&rsquo;s NotebookLM (free, world-class for &ldquo;chat with your PDFs&rdquo;).
            Workflow: drop a folder of contracts, policies, or research papers; ask questions; get
            answers with quoted snippets. NotebookLM in particular has been a quiet revolution for
            AU professional services &mdash; it grounds answers strictly in your sources, so
            hallucinations are rare.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 4 &mdash; knowledge base creation</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Notion AI for marketplace-style help centres, Coda AI for structured docs.
            Workflow: brain-dump into a doc, ask AI to organise into headings, ask it to flag
            missing topics, then expand each section with prompts. A solo consultant can build a
            70-article knowledge base in three weekends. The AI does the structure; you supply the
            expertise.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Use case 5 &mdash; deep research projects</h3>
          <p className="mt-2 text-slate-700">
            Best tool: ChatGPT Deep Research, Gemini Deep Research, Claude with extended search.
            Workflow: spend 10 minutes writing a precise brief (audience, scope, format,
            non-negotiables), launch the research run, come back in 15&ndash;30 minutes to a
            fully-cited 20-page report. Treat the report as a draft &mdash; never as the final word.
            Verify every claim that influences a real decision.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AUD pricing comparison</h3>
          <p className="mt-2 text-slate-700">
            Notion AI A$15/month/user, Google Workspace Business Standard A$36/user (includes
            Gemini in Docs), Coda Pro A$15/user, Perplexity Pro A$30/month, ChatGPT Plus A$30/
            month, Claude Pro A$30/month, Claude Team A$45/seat/month, Microsoft 365 Copilot A$45/
            month/user. Most professionals pay for one in-document assistant plus one chat, total
            A$60&ndash;A$80/month. The third subscription rarely earns its keep.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy &mdash; which tools save your data</h3>
          <p className="mt-2 text-slate-700">
            Notion AI, Microsoft Copilot for Business, Google Workspace Gemini, and Claude Team all
            contractually exclude your data from training. ChatGPT Plus and Gemini consumer tiers
            offer opt-out toggles &mdash; flick them on. Perplexity Pro respects opt-out; the free
            tier may use queries to improve. NotebookLM is private to your account by default.
            Always check the latest privacy posture before pasting client documents.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Quality bar &mdash; AI drafts the first 70%</h3>
          <p className="mt-2 text-slate-700">
            The professionals who get burned by AI drafts treat them as final. The professionals
            who get ahead treat them as the first 70% &mdash; the boring 70% &mdash; and spend
            their saved time on the 30% that actually requires judgement. That&rsquo;s the right
            mental model.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Three families of document AI: in-document assistants, standalone chats, research-first tools.',
              'NotebookLM is the standout for grounded document Q&A — strictly cites your uploaded sources.',
              'Perplexity is best when you need fast, cited research answers you can verify.',
              'Most professionals only need two subscriptions (in-doc + chat); the third rarely earns its keep.',
              'AI drafts the first 70% — judgement and polish remain human work.',
              'Check each tool’s training opt-out and pick AU/EU residency where possible.',
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
            One short hands-on exercise. Total time: 12 minutes.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: NotebookLM with three PDFs</p>
            <p className="mt-2">
              Open NotebookLM (free with a Google account). Upload three PDFs you have on hand
              &mdash; a vendor contract, a policy doc, and a research paper. Ask it three questions:
              one factual recall, one synthesis across documents, one trick question with no
              correct answer.
            </p>
            <p className="mt-3 italic">
              The first two will impress you. The trick question is where you watch how the model
              handles uncertainty &mdash; that&rsquo;s the actual measure of a research-grade tool.
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
                1. Which tool is purpose-built for grounded chat with your uploaded PDFs?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Notion AI</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> NotebookLM</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Coda AI</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">NotebookLM. It restricts the model to your uploaded sources and cites them inline.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. The right mental model for AI drafts is...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The final 70% — humans tweak the last bit</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> The first 70% — humans polish the last 30%</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Already publishable</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">The first 70%. AI handles the boring middle; judgement and polish remain human.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Two subscriptions are usually enough &mdash; the most common combo is...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Two chat tools</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> One in-document assistant + one chat</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Three research tools</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">One in-document assistant plus one chat. The third subscription rarely earns its keep.</p>
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
              Spreadsheet AI: formulas, analysis, and clean-up
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Sheets, Excel, and ChatGPT data analyst &mdash; six plays for non-analysts.
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
            href="/academy/ai-productivity"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to AI Productivity
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
