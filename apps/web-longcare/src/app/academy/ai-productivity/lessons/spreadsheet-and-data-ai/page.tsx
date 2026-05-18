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
import { InfographicComparison } from '@/components/illustrations/infographic-comparison';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Spreadsheet & Data AI — AI Productivity Lesson 4 | LongCare Academy',
  description:
    'Six AI plays for spreadsheets and data: formulas, cleaning, pivots, charts, anomalies, what-if. Sheets vs Excel Copilot vs ChatGPT data analyst, with AUD pricing.',
  path: '/academy/ai-productivity/lessons/spreadsheet-and-data-ai',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Spreadsheet & Data AI — Formulas, Analysis, Visualisation',
  educationalLevel: 'Professionals',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function SpreadsheetAndDataAILessonPage() {
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
            { name: 'Spreadsheet & Data AI', url: '/academy/ai-productivity/lessons/spreadsheet-and-data-ai' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 4 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Spreadsheet &amp; data AI &mdash; formulas, analysis, visualisation
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Six high-leverage data plays that turn the average spreadsheet into a junior analyst.
              Sheets vs Excel Copilot vs ChatGPT data analyst, with AUD pricing and privacy notes.
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

      {/* Inline infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Sheets vs Excel Copilot vs ChatGPT data analyst
          </h3>
          <div className="flex justify-center">
            <InfographicComparison width={760} height={260} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Three different operating models. Pick the one that matches where your data already
            lives &mdash; not the one with the loudest marketing.
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
            <span className="text-sm">Video coming Q3 2026 · 30 min</span>
            <span className="mt-2 text-xs text-white/60 max-w-md text-center">
              Transcript below contains every prompt and screenshot the video covers.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three operating models</h3>
          <p className="mt-2 text-slate-700">
            <strong>Sheets &ldquo;Help me organise&rdquo;</strong> sits inside Google Sheets and is
            free with Workspace. <strong>Excel Copilot</strong> sits inside Excel for Microsoft 365
            and adds about A$45/user/month. <strong>ChatGPT data analyst</strong> (formerly Code
            Interpreter) is part of ChatGPT Plus at A$30/month and runs Python sandboxes you can
            upload files into. They overlap, but each has clear sweet spots.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Play 1 &mdash; formula generation</h3>
          <p className="mt-2 text-slate-700">
            All three tools handle this brilliantly. Describe what you want in English; paste the
            formula. Sheets and Excel Copilot can place it directly in the cell. ChatGPT data
            analyst will write it as text you copy.
          </p>
          <p className="mt-2 text-slate-700">
            <em>&ldquo;Write a formula in Google Sheets that returns the median sale price per
            suburb in column B for sales after 1 July, where column G has &lsquo;Sold&rsquo;.&rdquo;</em>
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Play 2 &mdash; data cleaning</h3>
          <p className="mt-2 text-slate-700">
            Best tool: ChatGPT data analyst when the file is messy (mixed dates, junk rows, mixed
            cases). Upload the CSV, ask for a cleaned version with explicit rules: trim
            whitespace, standardise dates to YYYY-MM-DD, fix capitalisation in supplier names,
            collapse duplicates. It returns a downloadable CSV plus a written changelog of what
            it did. Privacy: only upload anonymised samples.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Play 3 &mdash; pivot summaries</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Sheets &ldquo;Help me organise&rdquo; for native pivots, ChatGPT data
            analyst when you want narrative insights. Sheets gives you a tabular pivot in two
            clicks; ChatGPT gives you a 5-bullet plain-English summary plus the pivot. The narrative
            output saves a written-report step many SMEs forget.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Play 4 &mdash; chart suggestions</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Excel Copilot is currently strongest for chart selection inside the file.
            Claude Artifacts is the dark-horse favourite for non-tech users &mdash; paste data,
            ask for &ldquo;the best three charts to tell this story&rdquo;, and it builds
            interactive previews you can iterate on. Export back to PNG when you&rsquo;re happy.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Play 5 &mdash; anomaly detection</h3>
          <p className="mt-2 text-slate-700">
            Best tool: ChatGPT data analyst. Upload sales or expense data and ask, &ldquo;flag any
            rows that look unusual relative to peers; explain why.&rdquo; The model runs basic
            statistics under the hood and returns a list of outliers with reasoning. Useful for
            month-end review and spot-checking suppliers.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Play 6 &mdash; what-if scenarios</h3>
          <p className="mt-2 text-slate-700">
            Best tool: Excel Copilot if your model is already in Excel; ChatGPT data analyst for
            quick sandbox modelling. Workflow: describe the assumptions you want to flex (price up
            5%, volume down 10%, churn up 1pp), ask for a side-by-side scenario table with revenue,
            margin, and runway. Three scenarios in two minutes.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Worked example: AU sales data</h3>
          <p className="mt-2 text-slate-700">
            Paste 12 months of sales by state and product. Ask: &ldquo;What are the top 3 insights
            from this data, in plain English, for an Australian SME owner?&rdquo; You will reliably
            get something like: NSW grew 18% YoY driven by Product B, VIC declined for two
            consecutive quarters, and a single product line accounts for 40% of margin variance.
            Decisions you would have made in a fortnight, surfaced in 90 seconds.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy &mdash; sample, mask, anonymise</h3>
          <p className="mt-2 text-slate-700">
            Never upload an unfiltered customer table to consumer-tier ChatGPT. Either anonymise
            (replace names with IDs), sample (take a representative slice), or use Workspace
            Gemini / Microsoft Copilot for Business which contractually exclude your data from
            training. For real business analytics, the tiny extra step pays for itself the first
            time you avoid a privacy headache.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools comparison summary</h3>
          <p className="mt-2 text-slate-700">
            Use Sheets&rsquo; native AI for daily lightweight work, Excel Copilot if you live in
            Microsoft 365, and ChatGPT data analyst for one-off deep dives that need narrative
            insights. Most AU SMEs settle on two of the three.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Sheets AI is free with Workspace, Excel Copilot is A$45/user/month, ChatGPT data analyst is bundled with Plus.',
              'Use ChatGPT data analyst for messy data cleaning and narrative insights — it handles unstructured input best.',
              'Excel Copilot is strongest for in-place chart selection and what-if modelling.',
              'Anonymise customer data before uploading to consumer tiers — IDs, samples, or business-tier plans.',
              'Anomaly detection and chart suggestions are surprisingly good — try them on monthly review data.',
              'Most teams settle on two of the three tools, not all three.',
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
            <p className="font-semibold text-slate-900">Exercise: three insights in 90 seconds</p>
            <p className="mt-2">
              Open ChatGPT Plus (or any data analyst tool), upload an anonymised CSV of last
              quarter&rsquo;s sales by state and product. Ask: &ldquo;What are the top 3 insights
              for an Australian SME owner? Use plain English and AUD figures.&rdquo;
            </p>
            <p className="mt-3 italic">
              Read the answer critically. Were any insights surprising? Were any obviously wrong?
              That gut-check is the muscle a good analyst uses every day.
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
                1. Which tool best handles messy data cleaning end-to-end?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Excel Copilot</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Sheets &ldquo;Help me organise&rdquo;</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> ChatGPT data analyst</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">ChatGPT data analyst &mdash; runs Python in a sandbox and returns a cleaned CSV plus changelog.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Before uploading customer data to a consumer tool, you should...
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Tell the AI not to read the names</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Anonymise, sample, or use a business-tier plan</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Nothing, consumer tools are private by default</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Anonymise, sample, or use a business-tier plan that contractually excludes training.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why pair Excel Copilot with ChatGPT data analyst rather than picking one?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Microsoft requires it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Different sweet spots: in-place edits vs deep one-off analysis</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Both run on the same model</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Different sweet spots. Excel Copilot for in-place edits and what-if; ChatGPT data analyst for messy data and narrative insights.</p>
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
              Spreadsheet AI: formulas, analysis, and clean-up (deep dive)
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Advanced patterns including pivot tables and visualisation, building on this lesson.
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
