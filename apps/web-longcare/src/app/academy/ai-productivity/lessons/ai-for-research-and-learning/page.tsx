import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Zap,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroToolkit } from '@/components/illustrations/hero-toolkit';
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Research & Learning — Master Anything Faster | AI Productivity Lesson 7 | LongCare Academy',
  description:
    'Perplexity, ChatGPT Deep Research, Claude Projects, NotebookLM and Elicit compared with AUD pricing. Five research workflows, citation hygiene and a 20-minute hands-on rabbit-hole.',
  path: '/academy/ai-productivity/lessons/ai-for-research-and-learning',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for Research and Learning — Master Anything Faster',
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

export default function AiForResearchAndLearningLessonPage() {
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
            { name: 'AI for Research & Learning', url: '/academy/ai-productivity/lessons/ai-for-research-and-learning' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 7 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for research &amp; learning — master anything faster
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Five research workflows, five tools, and a citation-hygiene routine that turns AI
              from a confident liar into a competent assistant librarian.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
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
            The research loop
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Question &rarr; AI search with sources &rarr; Verify against primary sources. Skip the
            verify step at your peril.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why research is the highest-leverage AI use</h3>
          <p className="mt-2 text-slate-700">
            Pre-AI research workflow: open ten browser tabs, skim five articles, copy quotes,
            assemble notes, take half a day. Post-AI workflow: ask one question, read a synthesised
            answer with citations in two minutes, spend the saved time verifying the three claims
            that matter. The shape of knowledge work has changed, and professionals who do not
            adopt research AI are competing one-handed.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The five research tools that matter in 2026</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Perplexity Pro</strong> (around <strong>A$32/month inc GST</strong>) — search engine + AI synthesis with inline citations. The default starting point for most factual questions in 2026. Free tier is generous; Pro unlocks Pages, file uploads and the strongest models.</li>
            <li><strong>ChatGPT Deep Research</strong> (included in Plus, around <strong>A$32/month inc GST</strong>) — multi-step web research that produces a 5–15 page report with citations in 5–30 minutes. Best for big questions where you want a structured deliverable.</li>
            <li><strong>Claude Projects</strong> (Pro around <strong>A$30/month inc GST</strong>) — upload up to 200,000 tokens of your own documents (contracts, reports, transcripts) and ask questions across them. The “read this stack of PDFs and tell me what matters” workflow.</li>
            <li><strong>NotebookLM</strong> (free tier; Plus inside Workspace around <strong>A$33/user/month inc GST</strong>) — Google’s purpose-built research notebook. Upload documents, generate summaries, mind maps, audio overviews. Best for self-paced learning.</li>
            <li><strong>Elicit</strong> (Pro around <strong>A$15–A$25/month inc GST</strong>) — academic literature search across 200M+ papers. Best for genuinely scholarly research; not the right tool for general business questions.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Five research workflows that pay off</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Market analysis</strong> — Perplexity for the surface scan, Deep Research for the structured report. Total time: 45 minutes for a 10-page market briefing that would take 6 hours by hand.</li>
            <li><strong>Competitor scan</strong> — Perplexity “list the five biggest competitors of [your business] in Australia, with a one-paragraph summary of each”. Verify each summary against the company website. 20 minutes total.</li>
            <li><strong>Regulatory research</strong> — Claude Projects with the actual Act PDF uploaded. Ask: <em>“Summarise sections relevant to [your activity], cite section numbers, flag ambiguity.”</em> Always verify against the Federal Register of Legislation.</li>
            <li><strong>Technical learning</strong> — NotebookLM with three to five textbook chapters and your own notes. Generate the audio overview for commute listening. Build understanding over a week, not in one sitting.</li>
            <li><strong>Decision support</strong> — ChatGPT or Claude with a structured prompt: <em>“Should we [X]? List arguments for, arguments against, three things to verify, two things I am missing. Use Australian English.”</em> Decision quality lifts measurably.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU pricing comparison</h3>
          <p className="mt-2 text-slate-700">
            Total stack for a serious AU SME researcher in 2026 runs about
            <strong> A$60–A$95/month inc GST</strong> — Perplexity Pro plus ChatGPT Plus, with
            Claude Pro added if you work with long documents or contracts. Most of these vendors
            charge in USD with AUD billing; GST appears on the invoice when you set Australia as
            the country and provide an ABN.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Citation hygiene — the rule of three</h3>
          <p className="mt-2 text-slate-700">
            AI cites sources confidently. Some of those sources are made up, some are real but
            misquoted, and most are real and accurate. Three rules separate good research from
            confidently wrong reports.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Click every load-bearing citation.</strong> If a sentence drives a decision, follow the link and read the source.</li>
            <li><strong>Look for the primary source.</strong> AI often cites a blog post that cites a blog post that cites the actual study. Find the study.</li>
            <li><strong>Cross-check across two tools.</strong> Ask Perplexity and ChatGPT Deep Research the same question. Where they agree, trust more. Where they disagree, dig deeper.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The “rabbit hole” technique — three hops deep</h3>
          <p className="mt-2 text-slate-700">
            For genuinely curious learning, use this three-hop sequence:
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Hop 1 — surface.</strong> Perplexity: “Explain [topic] like I have ten minutes.” Read.</li>
            <li><strong>Hop 2 — depth.</strong> Pick the one concept from hop 1 that surprised you. Ask: “Explain [that concept] in detail with citations to primary sources.” Read.</li>
            <li><strong>Hop 3 — synthesis.</strong> Ask: “What are the two best opposing views on [the concept]? Steelman each.” Read both.</li>
          </ol>
          <p className="mt-2 text-slate-700">
            Three hops in 30 minutes will leave you genuinely better informed than three hours of
            unstructured browsing.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Hands-on: research a topic in 20 minutes</h3>
          <p className="mt-2 text-slate-700">
            Pick a question you actually need answered this week. Do the rabbit-hole technique on
            it. Set a 20-minute timer. The deliverable is one paragraph of synthesis you would be
            comfortable sharing with a colleague.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy — what not to feed research AI</h3>
          <p className="mt-2 text-slate-700">
            Research tools query the public web and increasingly let you upload private documents.
            Three guardrails:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>Do not paste confidential research-in-progress into free consumer tiers; the data may be used for training.</li>
            <li>Use Team or Workspace tiers with a do-not-train commitment for genuinely sensitive work.</li>
            <li>For client documents under NDA, prefer Claude Projects on Team or NotebookLM inside Workspace — both keep your uploads in your tenant.</li>
          </ul>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five tools cover most research jobs: Perplexity, ChatGPT Deep Research, Claude Projects, NotebookLM, Elicit.',
              'Total stack for a serious researcher runs A$60–A$95/month inc GST in 2026.',
              'Always click load-bearing citations and find the primary source. AI cites confidently and is sometimes wrong.',
              'Cross-check important findings across two tools — agreement raises confidence, disagreement is a red flag.',
              'The three-hop rabbit-hole technique (surface, depth, opposing views) beats unstructured browsing every time.',
              'For confidential work, use Team/Workspace tiers with do-not-train commitments — never free consumer tiers.',
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
            <p className="font-semibold text-slate-900">Exercise: Three-hop rabbit hole on a real question</p>
            <p className="mt-2">
              Pick a question you genuinely need answered this week — could be regulatory, market,
              technical, or strategic.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Hop 1 (5 min) — Open Perplexity. Ask the question in plain English. Read the answer and skim three of the cited sources.</li>
              <li>Hop 2 (8 min) — Pick the concept that surprised you most. Ask Perplexity to explain it in detail with primary-source citations.</li>
              <li>Hop 3 (5 min) — Ask: <em>“What are the two strongest opposing views on this? Steelman each in equal depth.”</em></li>
              <li>Synthesis (2 min) — Write one paragraph capturing what you now know that you did not know 20 minutes ago.</li>
            </ol>
            <p className="mt-3">Bonus: do the same workflow tomorrow with ChatGPT Deep Research. Compare the two reports.</p>
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
                1. Which tool is purpose-built for academic literature search across 200M+ papers?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Perplexity</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Elicit</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> NotebookLM</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Elicit. The other tools are general-purpose; Elicit specialises in scholarly research.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the most important step in citation hygiene?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Trusting AI to get sources right</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Clicking load-bearing citations and finding the primary source</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Counting the number of citations</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Click load-bearing citations and find the primary source. AI sometimes cites blogs that cite blogs that cite the actual study.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What are the three hops in the rabbit-hole technique?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Surface, depth, opposing views</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Search, summarise, share</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Read, write, repeat</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Surface, depth, opposing views. The technique forces you to engage steelmanned counter-arguments — which is where most learning actually happens.</p>
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
              Building your AI-powered personal knowledge base
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Notion AI, Obsidian, Mem.ai, Roam, Heptabase, NotebookLM — pick the one that fits your
              brain and ship a working PKB in thirty minutes.
            </p>
          </div>
          <Link
            href="/academy/ai-productivity/lessons/personal-knowledge-base"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </Link>
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
            Lesson library
          </Link>
        </div>
      </section>
    </main>
  );
}
