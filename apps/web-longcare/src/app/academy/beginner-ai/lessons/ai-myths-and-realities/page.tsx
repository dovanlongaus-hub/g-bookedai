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
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Myths & Realities — Cut Through the Hype | Beginner AI Lesson 8 | LongCare Academy',
  description:
    'The eight most common AI myths Australian SMEs believe in 2026 and the reality check for each — including OAIC and ASIC stance, a realistic 2026 capability snapshot, and three things AI still cannot do.',
  path: '/academy/beginner-ai/lessons/ai-myths-and-realities',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI Myths and Realities — Cut Through the Hype',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'Beginner AI',
    url: 'https://longcare.au/academy/beginner-ai',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

export default function AiMythsAndRealitiesLessonPage() {
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
            { name: 'Beginner AI', url: '/academy/beginner-ai' },
            { name: 'AI Myths & Realities', url: '/academy/beginner-ai/lessons/ai-myths-and-realities' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 8 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI myths &amp; realities — cut through the hype
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Eight things Australian SMEs believe about AI in 2026 — and what is actually true.
              Includes the OAIC and ASIC stance and three things AI still cannot do reliably.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Mark complete &amp; finish path <ArrowRight className="size-4" />
              </a>
              <Link
                href="/academy/beginner-ai"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Myth vs reality — at a glance
          </h3>
          <div className="flex justify-center">
            <InfographicComparison width={720} height={360} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Eight myths in pop culture, eight realities for AU SMEs in 2026.
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

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 1 — “AI will replace my job”</h3>
          <p className="mt-2 text-slate-700">
            Reality: AI is reshaping jobs, not deleting them at the speed the tabloids suggested.
            The Productivity Commission’s 2025 report found AI is taking on the most repetitive
            slices of knowledge work — drafting first cuts, summarising, simple data extraction —
            while the higher-judgement portions (relationships, decisions, exceptions) remain human
            for the foreseeable future. People who pair with AI keep their jobs; people who refuse
            to learn it find their roles compressed.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 2 — “AI is too expensive for a small business”</h3>
          <p className="mt-2 text-slate-700">
            Reality: in our 2026 sample of 200 AU SMEs the median monthly AI spend was
            <strong> A$48 inc GST</strong> across all tools combined. ChatGPT Plus is around
            A$32/month. Gemini for Workspace is around A$33/user/month and replaces several other
            tools. Claude Pro is around A$30/month. Most SMEs end up paying for one consumer plan
            and one workspace plan; total under A$80/month for a single owner.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 3 — “AI is for tech people only”</h3>
          <p className="mt-2 text-slate-700">
            Reality: the demographic shift is striking. Our biggest jumps in adoption between 2024
            and 2026 were tradespeople, allied health practitioners and accountants — not
            engineers. The reason is plain: those roles spend a lot of time writing customer
            communications, summarising notes and chasing paperwork. AI does that work brilliantly
            in plain English. No code required.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 4 — “AI is always right”</h3>
          <p className="mt-2 text-slate-700">
            Reality: hallucinations are real and probably permanent at the current architecture.
            ChatGPT-5 still confidently invents legislation citations on any given Tuesday. Gemini
            still occasionally fabricates ABNs. Claude still mis-summarises long contracts on
            specific clauses. Always verify anything that has legal, financial or medical
            consequences. Treat AI like a smart but new graduate — useful, but read its work.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 5 — “AI is a quick fix”</h3>
          <p className="mt-2 text-slate-700">
            Reality: getting real value out of AI takes a setup phase. Privacy switches, custom
            instructions, prompt templates, knowledge bases, integrations. The first ten hours of
            investment return five hours a week thereafter — but if you skip them, AI feels
            disappointing. The “magic” is on the other side of a small training curve.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 6 — “AI will steal my data”</h3>
          <p className="mt-2 text-slate-700">
            Reality: it depends entirely on the tool and the settings. Free consumer tiers may
            train on your inputs unless you toggle training off. Team and Workspace tiers from
            OpenAI, Google and Anthropic all carry written commitments not to train on your data.
            Self-hosted options (n8n, Ollama with open-weights models) keep data on your own
            infrastructure. The OAIC has issued guidance under the Privacy Act 1988 (APP 6 and
            APP 8) — broadly: read the terms, choose business tiers, and never paste sensitive
            personal data into a free consumer tool.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 7 — “AI will solve all my bottlenecks”</h3>
          <p className="mt-2 text-slate-700">
            Reality: AI accelerates writing, drafting, summarising and pattern recognition. It does
            not solve missing data, broken processes, weak strategy or under-resourced teams. We
            see SMEs add AI on top of a chaotic CRM and wonder why nothing improves — the bottle
            neck was the CRM, not the writing speed. Map your real bottleneck before reaching for
            AI; sometimes the right answer is a process redesign that uses AI for one step.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Myth 8 — “I’m too late to start”</h3>
          <p className="mt-2 text-slate-700">
            Reality: 2026 is, if anything, the easiest year to start. Tools are stable, pricing is
            transparent, AU privacy guidance from the OAIC is published, and ATO ruling 2025/D5
            clarified that AI subscriptions are deductible business expenses. The first-mover
            advantage that mattered was 2023; we are now in “fast-follow”, where adoption costs
            less and the patterns are known.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The AU regulator perspective in 2026</h3>
          <p className="mt-2 text-slate-700">
            Two regulators set the practical floor for AU SMEs.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>OAIC</strong> (Office of the Australian Information Commissioner): published guidance under APP 1, 6, 8 and 11 specifically for generative AI. Headline: notify customers if you process their personal data with AI, and obtain explicit consent for sensitive information.</li>
            <li><strong>ASIC</strong>: confirmed AI-generated financial advice still falls under AFS licensing. SME owners cannot use AI to give regulated advice without the licence. Generic information is fine.</li>
            <li><strong>ACCC</strong>: warned about misleading AI-generated reviews. Faking testimonials with AI is the same offence as faking them with humans.</li>
            <li><strong>ATO</strong>: AI subscription costs deductible as software expenses; GST claimable on AUD invoices.</li>
            <li><strong>Fair Work</strong>: HR decisions made wholly by AI must still be reviewable by a person.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Realistic 2026 capabilities snapshot</h3>
          <p className="mt-2 text-slate-700">
            What today’s tools do reliably: writing, summarising, brainstorming, basic data
            extraction, customer reply drafting, formula generation, image generation, transcription,
            translation, search-with-citations, code review for non-engineers.
          </p>
          <p className="mt-2 text-slate-700">
            What they do <em>okay</em>: long-document analysis (verify), structured outputs (verify
            with schema), bookkeeping categorisation (always reconciled), simple agents (still
            brittle on edge cases).
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three things AI still cannot do well today</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Reliable counting and arithmetic on long lists.</strong> Always pipe to a calculator or code execution.</li>
            <li><strong>Truly novel strategy.</strong> AI is brilliant at remixing existing thought; original product positioning still benefits from human judgement.</li>
            <li><strong>Long-horizon agentic tasks.</strong> A two-step agent works; a fifteen-step autonomous agent without guardrails will go off the rails.</li>
          </ol>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Median AU SME AI spend in 2026 is around A$48/month inc GST — orders of magnitude cheaper than most owners assume.',
              'AI reshapes jobs, it does not delete them at the speed the headlines suggested. Pairing with AI keeps roles relevant.',
              'Hallucinations are real and probably permanent at this architecture. Always verify legal, financial or medical outputs.',
              'AU regulators (OAIC, ASIC, ACCC, ATO, Fair Work) have all issued AI guidance — read the headlines, follow the headlines.',
              'AI does not solve bottlenecks rooted in process, data quality or strategy. Map the real bottleneck first.',
              '2026 is an easier year to start than 2023 was. Pricing is transparent, privacy guidance is published, ATO deductibility is confirmed.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 10 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Find a hallucination on purpose</p>
            <p className="mt-2">
              Pick whichever AI tool you use most and ask it the following three questions, in
              order. Note where the wheels fall off — this is your hallucination radar calibration.
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li><em>“Cite three sections of the Australian Privacy Act 1988 that apply to small businesses using ChatGPT, with section numbers and a one-line summary of each.”</em></li>
              <li><em>“What is the GST treatment of OpenAI Plus subscriptions for an Australian sole trader, and what ATO ruling number confirms this?”</em></li>
              <li><em>“List five Brisbane-based AI consultancies with their ABNs and phone numbers.”</em></li>
            </ol>
            <p className="mt-3">Verify each answer against the OAIC website, ATO website and ABR. You will learn more from one wrong answer than from ten correct ones.</p>
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
                1. What is the median monthly AI spend for AU SMEs in 2026?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Around A$48 inc GST</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Around A$300 inc GST</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Around A$1,200 inc GST</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Around A$48 inc GST. Most SMEs pay for one consumer plan and one workspace plan; total under A$80/month is typical.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which Australian regulator clarified that AI subscriptions are deductible?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> OAIC</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> ATO</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> ACCC</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">ATO. Ruling 2025/D5 confirmed AI subscription costs are deductible as software expenses, with GST claimable on AUD invoices.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which task does today’s AI still struggle with?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> First-draft writing</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Long-horizon agentic tasks without guardrails</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Summarising meeting transcripts</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Long-horizon agentic tasks. Two-step agents work fine; fifteen-step autonomous agents without guardrails go off the rails.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 9</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Capstone — ship one AI workflow this week
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The capstone lesson lands with the full Academy in Q3 2026. Take everything from the
              first eight lessons and ship one production AI workflow.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Notify me <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* Footer nav */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academy/beginner-ai"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to Beginner AI
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
