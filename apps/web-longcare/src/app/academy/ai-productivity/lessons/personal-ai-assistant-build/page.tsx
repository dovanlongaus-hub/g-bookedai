import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
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
  title: 'Build Your Personal AI Assistant in 60 Minutes — AI Productivity Lesson 12 | LongCare Academy',
  description:
    'ChatGPT Custom GPT vs Gemini Gem vs Claude Project compared with AUD pricing. Six context fields, calendar and email injection, four persona templates (founder, manager, consultant, researcher), maintenance cadence and data hygiene.',
  path: '/academy/ai-productivity/lessons/personal-ai-assistant-build',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Build Your Personal AI Assistant in 60 Minutes',
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

export default function PersonalAiAssistantBuildLessonPage() {
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
            { name: 'Personal AI Assistant', url: '/academy/ai-productivity/lessons/personal-ai-assistant-build' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Zap className="size-3" /> Lesson 12 of 12
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Build your personal AI assistant in 60 minutes
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A reusable Custom GPT, Gemini Gem or Claude Project that knows your role, your
              calendar, your tone and your guardrails &mdash; built in an hour, refined over
              weeks, and the highest-leverage productivity move of 2026.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Continue path — coming soon
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
            The build loop
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Configure &rarr; Test &rarr; Refine. Plan three sessions across a week, not one
            heroic afternoon. Refinement is where the assistant earns its keep.
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
              Walk-through screencast in production. The transcript below is the full lesson.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Custom GPT vs Gem vs Project</h3>
          <p className="mt-2 text-slate-700">
            Three tools dominate the personal-assistant category in 2026. <strong>ChatGPT
            Custom GPT</strong> (included in ChatGPT Plus at A$30/month) is the most mature
            with the deepest tools ecosystem, the best file-knowledge handling and the
            largest marketplace. <strong>Gemini Gem</strong> (included in Google One AI
            Premium at A$32.99/month) is the strongest if your work runs in Google Workspace
            because it integrates natively with Gmail, Drive, Calendar and Docs.
            <strong> Claude Project</strong> (included in Claude Pro at A$30/month) is the
            best writer for nuance, the longest practical context window (200K tokens), and
            the cleanest UI for working with reference documents. Most professionals we coach
            settle on Claude Project for deep work and Gemini Gem for email/calendar work,
            switching to ChatGPT only when they need third-party tools.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The six essential context fields</h3>
          <p className="mt-2 text-slate-700">
            Whichever tool you pick, the instructions you write are what makes the assistant
            yours. Six fields cover 95% of the value.
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Role</strong> &mdash; your job title, your company in one sentence, who you serve. (&ldquo;I am the founder of a 12-person AU SaaS company serving Sydney accountants.&rdquo;)</li>
            <li><strong>Goals</strong> &mdash; the three outcomes you care about this quarter. The assistant uses these to break ties when choosing what to say.</li>
            <li><strong>Tone</strong> &mdash; how you want output to sound (warm, direct, formal, casual, AU English). Be specific. &ldquo;Use plain Australian English; never US spelling; never &lsquo;leverage&rsquo; or &lsquo;synergy&rsquo;.&rdquo;</li>
            <li><strong>Do</strong> &mdash; five things the assistant should always do (always quote AUD, always cite sources, always offer the contrarian view, etc.).</li>
            <li><strong>Don&rsquo;t</strong> &mdash; five things the assistant must never do (never send unless I say so, never advise on tax beyond &ldquo;ask your accountant&rdquo;, never claim certainty when probabilistic).</li>
            <li><strong>Examples</strong> &mdash; three to five worked examples of input and ideal output. This is the single biggest quality lever.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Injecting calendar and email context</h3>
          <p className="mt-2 text-slate-700">
            Gemini Gem has native access to your Workspace if you switch it on. For ChatGPT
            and Claude, the trick is to paste relevant context at the start of each session.
            We recommend a daily &ldquo;briefing block&rdquo;: copy today&rsquo;s calendar
            (Cmd+A on the calendar list view), the top five unread emails, and your top three
            priorities into a single message. The assistant now has the context to make
            useful suggestions. Repeat each morning. Total time: under two minutes.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Four persona templates</h3>
          <p className="mt-2 text-slate-700">
            <strong>Founder.</strong> Goals tilted to runway, hiring, fundraising. Tone:
            direct, time-poor, decisions in three options with a recommendation. Do: always
            push for a decision. Don&rsquo;t: produce long memos when a Slack message will do.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>People manager.</strong> Goals tilted to retention, team health, growth.
            Tone: warm, specific, person-centred. Do: separate behaviour from intent. Don&rsquo;t:
            give performance advice that could be construed as a Fair Work issue without
            flagging that.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Consultant.</strong> Goals tilted to client outcomes and book of business.
            Tone: clear, methodical, structured. Do: always offer a framework. Don&rsquo;t:
            speculate beyond data; flag assumptions.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Researcher.</strong> Goals tilted to depth and rigour. Tone: careful,
            sourced, qualified. Do: cite sources with URLs. Don&rsquo;t: produce confident
            statements that paraphrase one source.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Maintenance cadence</h3>
          <p className="mt-2 text-slate-700">
            Treat the assistant like a junior team member. Weekly, spend five minutes
            reviewing the last week&rsquo;s outputs and tweaking the instructions. Monthly,
            update goals to reflect what changed. Quarterly, rewrite the instructions from
            scratch as a forcing function &mdash; you almost always come back leaner. The
            assistant gets noticeably better every quarter for the first year.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Data hygiene</h3>
          <p className="mt-2 text-slate-700">
            Three rules. First, never put client names, tax file numbers, Medicare numbers
            or health information in a custom assistant configuration &mdash; the instructions
            are stored on the vendor&rsquo;s servers and may be used in moderation review.
            Second, in ChatGPT switch off &ldquo;Model improves for everyone&rdquo; in
            settings; in Gemini ensure Workspace data is not used to train; in Claude this is
            off by default for paid plans. Third, periodically audit your assistant&rsquo;s
            knowledge files &mdash; quietly remove anything more than 6 months old or that
            references departed staff. APP 11 of the Privacy Act applies to your storage on
            third-party services just as much as to your own systems.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Three tools, similar prices: ChatGPT Custom GPT (A$30), Gemini Gem (A$32.99), Claude Project (A$30). Pick by ecosystem fit.',
              'Six instruction fields cover 95% of value: role, goals, tone, do, dont, examples.',
              'Examples are the single biggest quality lever. Three to five worked examples beats 500 words of instructions.',
              'A daily two-minute briefing block (calendar + emails + priorities) keeps context fresh without integrations.',
              'Maintain weekly (5 min), monthly (goals refresh), quarterly (rewrite). The assistant gets better every quarter.',
              'Never put PII, TFNs, Medicare or health data in the instructions. APP 11 storage rules apply to third parties too.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 60 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Ship version 1 of your assistant</p>
            <p className="mt-2">
              Block 60 minutes. Pick one tool (Claude Project is our default recommendation).
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Write the six fields. Resist over-engineering; you will refine.</li>
              <li>Save three to five worked examples in the assistant&rsquo;s knowledge files.</li>
              <li>Test with five real questions from yesterday&rsquo;s work. Note where it stumbles.</li>
              <li>Refine the instructions to address the top two failure modes.</li>
              <li>Save. Use exclusively for one week. Book a 15-minute review on Friday.</li>
            </ol>
            <p className="mt-3">Most professionals see noticeable lift in week two. By month two, the assistant becomes the default first stop for most knowledge work.</p>
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
                1. Which of the six context fields has the biggest impact on output quality?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Tone</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Examples (three to five worked input/output pairs)</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Goals</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Examples. Three to five worked examples teach the model your taste better than 500 words of abstract instruction.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why is Gemini Gem the natural pick for Workspace-heavy users?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It is the cheapest</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It has native access to Gmail, Drive, Calendar and Docs</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It has the longest context window</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Native Workspace access. Email, calendar and Drive context flow in without copy-paste.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Under APP 11 (Privacy Act), what is the data-hygiene rule for assistant configuration?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Personal info in instructions is fine if you delete it later</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Treat third-party storage of instructions with the same care as your own systems; never put TFNs, Medicare or health data</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> APP 11 does not apply to SaaS vendors</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Treat it with the same care. APP 11 storage rules apply to third-party storage of personal data, including in AI assistant instructions and knowledge files.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* End-of-path note */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Path complete</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You have finished the AI Productivity path
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Twelve lessons, four to five hours of focused learning. Advanced bootcamps,
              certificates and live AU cohorts land in Q4 2026.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Continue path — coming soon
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
