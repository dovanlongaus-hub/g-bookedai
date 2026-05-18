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
  title: 'AI for Non-Coders — Spreadsheets, Scripts, Web | AI Productivity Lesson 6 | LongCare Academy',
  description:
    'Six things AI helps non-coders do safely: spreadsheet formulas, browser bookmarklets, HTML pages with Claude Artifacts, Apps Script, regex, SQL — with AUD pricing for ChatGPT, Claude, Cursor.',
  path: '/academy/ai-productivity/lessons/ai-for-coding-and-tech',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for Non-Coders — Spreadsheets, Scripts, Web',
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

export default function AiForCodingAndTechLessonPage() {
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
            { name: 'AI for Non-Coders', url: '/academy/ai-productivity/lessons/ai-for-coding-and-tech' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 6 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for non-coders &mdash; spreadsheets, scripts, web
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              You don&rsquo;t need a CS degree to ship working code in 2026. Six things AI helps
              non-coders do safely &mdash; with three starter projects you can build this
              weekend.
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
            Idea &rarr; AI generates &rarr; test
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Coding is now a conversation. State what you want plainly, AI returns code, you run
            and review.
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
              Walk-through screencast in production. The transcript below covers every project.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">&ldquo;I&rsquo;m not a coder, but...&rdquo;</h3>
          <p className="mt-2 text-slate-700">
            That&rsquo;s the most repeated sentence we hear in our SME workshops &mdash; closely
            followed by &ldquo;...could AI help me with this thing in Excel?&rdquo; The answer in
            2026 is yes, and you don&rsquo;t need to learn programming. AI gives you the small,
            specific code you need without the surrounding theory. Six things follow.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">1 &mdash; Spreadsheet formulas</h3>
          <p className="mt-2 text-slate-700">
            ChatGPT, Gemini, and Claude all write formulas for Google Sheets and Excel from plain
            English. Try: <em>&ldquo;Give me a Google Sheets formula that, given a column of dates
            in column A, returns &lsquo;overdue&rsquo; if the date is in the past, &lsquo;due
            today&rsquo; if today, otherwise blank.&rdquo;</em> You get
            <code> =IF(A2&lt;TODAY(), &quot;overdue&quot;, IF(A2=TODAY(), &quot;due today&quot;, &quot;&quot;))</code>
            in seconds. ARRAYFORMULA, REGEXMATCH, QUERY &mdash; AI handles all of them. Gemini
            inside Sheets does this with a sidebar.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">2 &mdash; Browser bookmarklets</h3>
          <p className="mt-2 text-slate-700">
            A bookmarklet is a tiny snippet of JavaScript saved as a browser bookmark. Click it,
            it does something on the page. Examples: extract all email addresses from the current
            page; toggle dark mode on a website; show every image with its dimensions. Ask AI:
            <em> &ldquo;Write me a bookmarklet that copies all email addresses on the current page
            to my clipboard, separated by semicolons.&rdquo;</em> Paste the snippet into a new
            bookmark&rsquo;s URL field. Done.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">3 &mdash; Quick HTML pages (Claude Artifacts)</h3>
          <p className="mt-2 text-slate-700">
            Claude Artifacts (in Pro and Team) renders runnable HTML/CSS/JS in a side panel as it
            generates. Ask: <em>&ldquo;Build me a single-page expense tracker for an Australian
            sole trader. Inputs: date, description, amount, GST included? Show running totals.
            Save to localStorage. Australian dollar formatting.&rdquo;</em> You get a working
            tool in 30 seconds. Save the HTML file, open in any browser, use forever &mdash; no
            server, no install.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">4 &mdash; Apps Script automation</h3>
          <p className="mt-2 text-slate-700">
            Google Workspace ships a free scripting platform called Apps Script. AI writes Apps
            Script for you. Examples: send an email when a row is added to a Sheet; convert form
            responses to PDF; back up a Drive folder weekly. Try: <em>&ldquo;Write me a Google
            Apps Script that, when a new row is added to my Sheet &lsquo;Leads&rsquo;, emails
            sales@example.com.au with the row content and a Hangouts link.&rdquo;</em> Tools &rarr;
            Script editor, paste, save, authorise, run. Apps Script triggers handle the rest.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">5 &mdash; Regex generation</h3>
          <p className="mt-2 text-slate-700">
            Regex is the dark art of text matching &mdash; postcodes, ABNs, phone numbers, emails.
            Don&rsquo;t learn it. Ask: <em>&ldquo;Give me a regex that matches Australian mobile
            numbers in any common format (04XX XXX XXX, +61 4XX XXX XXX, 04XX-XXX-XXX).&rdquo;</em>
            Paste into Find &amp; Replace, Sheets, or your text editor. Saves hours of manual
            cleanup.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">6 &mdash; Database queries (SQL primer)</h3>
          <p className="mt-2 text-slate-700">
            If your business uses a CRM or analytics tool with SQL access (BigQuery, PostgreSQL,
            Metabase), AI writes queries for you. Try: <em>&ldquo;Write me a SQL query against
            table &lsquo;orders&rsquo; that returns the top 10 customers by total spend in the
            last 90 days, with their email and total. Order desc.&rdquo;</em> AI returns clean
            SQL. Paste into your tool. Always read what it does before running on production.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tools and AUD pricing</h3>
          <p className="mt-2 text-slate-700">
            <strong>ChatGPT Plus</strong> &mdash; about <strong>AUD&nbsp;$32/month</strong>. The
            generalist; runs Python in the browser to test things.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Claude Pro</strong> &mdash; about <strong>AUD&nbsp;$30/month</strong>. The
            best at code reasoning and at staying within scope.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Gemini in Workspace</strong> &mdash; about
            <strong> AUD&nbsp;$33/seat/month</strong>. Lives inside Sheets, Docs, Apps Script.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>GitHub Copilot</strong> &mdash; about <strong>AUD&nbsp;$15/month</strong>.
            For when you outgrow chat and want code completion in VS Code.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Cursor</strong> &mdash; about <strong>AUD&nbsp;$30/month</strong>. An AI-first
            code editor; the gentlest on-ramp for non-coders willing to dabble.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Safety &mdash; the four rules</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Read code before running.</strong> Ask AI to explain it line by line.</li>
            <li><strong>Backup first.</strong> Duplicate the spreadsheet, snapshot the database, copy the file.</li>
            <li><strong>Test on dummy data.</strong> Never run on production with the first version.</li>
            <li><strong>Never paste secrets in.</strong> API keys, passwords, customer PII &mdash; the same big-five rule.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three starter projects this weekend</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Sheets time tracker.</strong> Ask Claude for a single-sheet timer that records start, stop, task, and accumulates daily total. 30 minutes.</li>
            <li><strong>Email reply automation.</strong> Apps Script that sends a templated reply to anyone who emails &ldquo;quote@yourbusiness.com.au&rdquo;. 45 minutes.</li>
            <li><strong>Mini personal CRM.</strong> Claude Artifact: HTML page with localStorage to log contacts, last touch, follow-up date, exports CSV. 60 minutes.</li>
          </ol>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'AI gives non-coders the small, specific code they need without surrounding theory.',
              'Six high-leverage areas: formulas, bookmarklets, HTML, Apps Script, regex, SQL.',
              'Claude Artifacts builds usable single-page tools in 30 seconds — no server needed.',
              'Apps Script is free with Workspace and AI writes it for you.',
              'Four safety rules: read, backup, test on dummy data, never paste secrets.',
              'Three weekend projects pay for the AI subscription many times over.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 30 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build the Sheets time tracker</p>
            <p className="mt-2">
              Open a fresh Google Sheet. Open ChatGPT or Gemini. Paste this prompt:
              <em> &ldquo;Build me a Google Sheets time tracker. Columns: A = Date, B = Task, C =
              Start (button), D = Stop (button), E = Duration (auto). Add an Apps Script that,
              when I click Start, fills column C with the current time, and Stop fills column D.
              Calculate Duration as decimal hours.&rdquo;</em>
            </p>
            <p className="mt-3">
              Follow the AI&rsquo;s setup instructions. Paste any Apps Script into Tools &rarr;
              Script editor, save, run once to authorise. Use it for one real day. Note: ask the
              AI to explain anything you don&rsquo;t understand.
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
                1. What is the safest first step before running AI-generated code?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Run it on production immediately</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Read it line-by-line and back up first</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Paste it into a different AI to double-check</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Read it line-by-line and back up first. Both rules together.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which Claude feature renders runnable HTML in the side panel?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Projects</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Artifacts</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Memory</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Artifacts &mdash; available on Pro and Team tiers.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Why use Apps Script over a paid integration platform?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It is free with Workspace and AI writes it for you</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It runs faster than any other platform</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It does not need authorisation</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Free with Workspace and AI writes it for you &mdash; the unbeatable combination for SMEs.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 7</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Search AI &mdash; Perplexity and deep research workflows
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Coming Q3 2026.
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
            Lesson library
          </Link>
        </div>
      </section>
    </main>
  );
}
