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
import { HeroProfessional } from '@/components/illustrations/hero-professional';
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Deep Research with AI — AI Productivity Lesson 13 | LongCare Academy',
  description:
    'Use Perplexity Pro, ChatGPT Deep Research and Gemini Deep Research like a junior analyst — multi-step workflows, source verification, the research lattice, AU databases and citation hygiene.',
  path: '/academy/ai-productivity/lessons/ai-for-research-deep-mode',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Deep Research with AI — Like Having a Junior Analyst',
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

export default function AiForResearchDeepModeLessonPage() {
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
            { name: 'AI for Research — Deep Mode', url: '/academy/ai-productivity/lessons/ai-for-research-deep-mode' },
          ]}
        />
      </div>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 13 of 14
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Deep research with AI — like having a junior analyst
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Perplexity Pro, ChatGPT Deep Research and Gemini Deep Research turn an AI session
              into something closer to a 4-hour junior analyst engagement. Here is how to
              direct that work, verify the output and integrate it with AU research databases.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/ai-productivity/lessons/personal-okrs-with-ai"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Next lesson — Personal OKRs <ArrowRight className="size-4" />
              </Link>
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
            The deep-research workflow
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Question → Plan → Search → Verify → Synthesise. Skipping the plan or the verify step
            is the number-one reason AI &ldquo;research&rdquo; reads as confident slop.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What &ldquo;deep&rdquo; actually means in 2026</h3>
          <p className="mt-2 text-slate-700">
            A normal chat with ChatGPT or Gemini runs a single inference cycle of seconds. A
            deep-research run is different — the model plans a multi-step investigation, runs
            dozens of searches, reads dozens of sources, drafts an answer, critiques it, and
            often re-searches based on the gaps. A single Perplexity Deep Research run can
            consume 4-8 minutes and consult 30-100 sources. ChatGPT Deep Research (US$20-200/mo
            depending on tier, A$33-A$330 inc GST) and Gemini Deep Research (bundled in Google
            One AI Premium, US$20, ~A$33 inc GST) work similarly. The output is closer to a
            junior analyst brief than to a chat reply.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tooling and AUD pricing snapshot</h3>
          <p className="mt-2 text-slate-700">
            <strong>Perplexity Pro</strong> — US$20/mo, ~A$33 inc GST. Best for fast, citation-
            heavy queries; superb for news and current events. Pro Search runs 3-6 sub-queries
            automatically; Deep Research mode adds a planning step.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>ChatGPT Deep Research</strong> — Plus tier US$20 (~A$33), Pro tier US$200
            (~A$330) for higher daily limits. Best when you want the model to reason at length
            in the brief, not just collate. Strongest at synthesis.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Gemini Deep Research</strong> — bundled in Google One AI Premium ~A$33/mo
            inc GST. Best for Google-shaped questions, especially when you want the output
            directly into a Docs or Sheets file. Sometimes faster than ChatGPT at the trade-off
            of slightly weaker synthesis.
          </p>
          <p className="mt-2 text-slate-700">
            We recommend keeping all three for the first 90 days, then dropping the one you
            use least. The total spend (~A$100/mo inc GST) is rounding error against even one
            consulting hour.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The deep-research prompt template</h3>
          <p className="mt-2 text-slate-700">
            Deep research rewards specificity. Generic prompts produce generic briefs. Use this
            five-section template: <em>Context (who I am, what decision I need to make,
            timeline)</em>, <em>The question (specific, with the success criterion)</em>,
            <em> Sources to prefer (e.g. .gov.au, peer-reviewed, last 18 months)</em>,
            <em> Sources to avoid (LinkedIn posts, Medium, news aggregators)</em>,
            <em> Output format (executive summary up top, then sections, then citations)</em>.
            A well-templated prompt typically halves rework rate compared with one-line questions.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The &ldquo;research lattice&rdquo; technique</h3>
          <p className="mt-2 text-slate-700">
            For genuinely high-stakes research (board paper, vendor short-list, market entry),
            do not rely on one tool. Run the same prompt across all three deep-research tools.
            Read the three outputs in parallel. Mark anywhere they agree (high confidence),
            anywhere they disagree (investigate), anywhere only one of them found something
            (verify). This is the &ldquo;research lattice&rdquo; — three independent passes
            woven into one brief. The work is in the reading, not the prompting. Plan a clear
            90-minute block.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Source verification — the 60-second sanity check</h3>
          <p className="mt-2 text-slate-700">
            All three tools cite. None of them guarantee the citations exist. The fast check:
            click 5 random citations from the brief. If any 404s or are unrelated to the
            claim, run the whole brief through a verify pass with a different model. If
            two-plus citations are broken, throw away the brief and rerun with a tighter prompt
            and source-preference list. We have seen a Sydney consulting team submit a brief
            with 7 of 35 citations hallucinated — caught at the client, not internally. The
            60-second sanity check costs less than the reputation.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU research databases worth knowing</h3>
          <p className="mt-2 text-slate-700">
            AI deep-research tools default to the open web. For AU questions, the open web is
            often weaker than the AU government and academic sources you can plug into the
            prompt. The high-value ones: <strong>ABS</strong> (Australian Bureau of Statistics,
            free), <strong>data.gov.au</strong> (free, every level of government), <strong>NLA
            Trove</strong> (national library, books and newspapers, free), <strong>AustLII</strong>
            (legal database, free), <strong>APO</strong> (Analysis &amp; Policy Observatory,
            free, research papers), and the various state government open data portals.
            Mention these in the &ldquo;sources to prefer&rdquo; section of your prompt.
            Output quality improves visibly.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Citation hygiene — the 5-rule habit</h3>
          <p className="mt-2 text-slate-700">
            Five small habits keep you on the right side of citation hygiene. (1) Always have
            the model cite inline, not at the end. (2) Always include the publication date in
            the citation; AI is awful at deciding what is recent. (3) For any high-stakes
            claim, link to the primary source, not the secondary write-up. (4) Add the phrase
            &ldquo;prefer sources from the last 18 months unless I am asking for historical
            data&rdquo; to your prompt. (5) Spot-check 10% of citations before circulating the
            brief. These five together catch the vast majority of hallucinated citations.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When NOT to use deep research</h3>
          <p className="mt-2 text-slate-700">
            Deep research is overkill (and slow) for three things. <strong>Timely
            information</strong> — the deep loop can take 8 minutes; for a breaking news item
            a normal chat with web search is faster. <strong>Small facts</strong> — &ldquo;what
            is the GST rate?&rdquo; does not need a 30-source brief. <strong>Personal
            opinions</strong> — &ldquo;should I take this job?&rdquo; benefits from
            conversation, not a brief. Match the tool to the question. Deep research is a
            scalpel; do not use it to butter toast.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Integrating output back into your work</h3>
          <p className="mt-2 text-slate-700">
            A deep-research brief is raw material, not finished work. The two-step finish is:
            (1) read the brief through, mark anything you would say differently or anything
            missing; (2) rewrite the executive summary in your own voice with your own
            recommendation. Without this, briefs read as AI-generated; with it, they read as
            yours and the brief becomes the appendix. We recommend pasting the cleaned exec
            summary into the project page in Notion or Google Docs and keeping the full brief
            archived alongside.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Deep research is multi-step, multi-minute and consults dozens of sources — closer to a junior analyst engagement than a chat reply.',
              'Keep all three (Perplexity, ChatGPT, Gemini) for 90 days; ~A$100/mo inc GST is rounding error against one consulting hour.',
              'Use the five-section prompt template every time — context, question, prefer, avoid, output format.',
              'The research lattice runs the same prompt across three tools and reads them in parallel for high-stakes briefs.',
              'AU government sources (ABS, data.gov.au, Trove, AustLII, APO) materially improve output when listed in the prompt.',
              'Deep research is the wrong tool for breaking news, small facts and personal opinions — match scalpel to job.',
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
            <p className="font-semibold text-slate-900">Exercise: Run a research lattice on a real question</p>
            <p className="mt-2">
              Pick one decision you are actually weighing this month — a vendor short-list, a
              market-entry question, a regulatory check.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Write the prompt using the five-section template — keep it under 250 words.</li>
              <li>Run it through Perplexity Pro, ChatGPT Deep Research and Gemini Deep Research.</li>
              <li>Mark where the three outputs agree, disagree, or only one found something.</li>
              <li>Spot-check 5 random citations in each. Flag any that 404 or do not match the claim.</li>
              <li>Write a 200-word exec summary in your own voice. Archive the three briefs as appendices.</li>
            </ol>
            <p className="mt-3">
              The first lattice takes 90 minutes. The fifth takes 30. The value-to-time ratio
              compounds fast.
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
                1. The research lattice technique means…
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Running one prompt repeatedly until the model agrees with itself</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Running the same prompt across three tools and reading them in parallel</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Adding 30 sources to the prompt</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Three independent tools, read in parallel; agree=confident, disagree=investigate.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. When is deep research the wrong tool?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Vendor short-lists</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Breaking news, small facts and personal opinions</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Market-entry questions</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Breaking news, small facts and personal opinions. Deep research is a scalpel, not a butter knife.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why include &ldquo;sources to prefer&rdquo; with AU databases in the prompt?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It is required by Perplexity</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> AI defaults to the open web; AU gov and academic sources are often higher quality for AU questions</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It is a Privacy Act 1988 requirement</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">AI defaults to open web. AU government and academic sources (ABS, Trove, AustLII, APO) materially improve output quality on AU questions.</p>
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
              Personal OKRs with AI as your accountability partner
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Quarterly OKRs, weekly AI check-ins, prompt templates and AU work-life balance.
            </p>
          </div>
          <Link
            href="/academy/ai-productivity/lessons/personal-okrs-with-ai"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue <ArrowRight className="size-4" />
          </Link>
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
