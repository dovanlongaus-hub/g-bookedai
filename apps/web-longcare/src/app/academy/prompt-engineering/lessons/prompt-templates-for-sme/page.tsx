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
import { HeroAgents } from '@/components/illustrations/hero-agents';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Prompt Templates SMEs Use Every Week — Prompt Engineering Lesson 2 | LongCare Academy',
  description:
    'Eight ready-to-paste prompt templates Australian SMEs run every week — customer support, social posts, job ads, meeting summaries, proposals, SOPs, and more.',
  path: '/academy/prompt-engineering/lessons/prompt-templates-for-sme',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Prompt Templates SMEs Use Every Week',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
  inLanguage: 'en-AU',
  isPartOf: {
    '@type': 'Course',
    name: 'Prompt Engineering',
    url: 'https://longcare.au/academy/prompt-engineering',
  },
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
};

type Template = {
  num: number;
  title: string;
  situation: string;
  prompt: string;
  expect: string;
  pitfall: string;
};

const TEMPLATES: Template[] = [
  {
    num: 1,
    title: 'Customer support reply (angry customer)',
    situation: 'A customer has emailed complaining about a missed delivery, slow response, or poor service. You want a calm, accountable, on-brand reply.',
    prompt: `You are the customer service lead at [BUSINESS] in [SUBURB], Australia.
The email below is from a frustrated customer.
Reply in 100–140 words, warm but professional Australian English.
Acknowledge the specific issue first.
Offer one concrete remedy (within these limits: [LIMITS]).
Do not promise a refund unless they have asked for one.
Sign off as [NAME, ROLE].
Do not invent details that are not in the email.

EMAIL:
[PASTE EMAIL HERE]`,
    expect: 'A grounded, three-paragraph reply that names the issue, owns it briefly, and offers a remedy you can deliver.',
    pitfall: 'Without the limits and the no-refund constraint, the model often offers more than you can give. Always cap the giveaway.',
  },
  {
    num: 2,
    title: 'Weekly social media post pack (5 posts)',
    situation: 'You need a week of LinkedIn or Instagram posts off one piece of content (a blog, a case study, a customer story).',
    prompt: `You are a social media manager for an Australian small business in [INDUSTRY].
From the source content below, produce five posts for [PLATFORM]:
- Post 1: a personal-voice story (90–120 words)
- Post 2: a contrarian take (60–80 words)
- Post 3: a how-to with three steps
- Post 4: a customer outcome (no names; ask if needed)
- Post 5: a soft CTA to book / call / read more
Australian English. No emojis unless asked.
Do not invent client names, statistics, or quotes.

SOURCE:
[PASTE BLOG / TRANSCRIPT / CASE STUDY]`,
    expect: 'Five distinct posts that share the spine but feel like five different reads.',
    pitfall: 'If you skip "do not invent statistics", AI will hallucinate impressive-sounding numbers. Always anchor to your source.',
  },
  {
    num: 3,
    title: 'Job description from rough notes',
    situation: 'You sketched the role on the whiteboard with the team and need a polished, Fair Work-aware ad on Seek by Friday.',
    prompt: `You are an Australian hiring manager.
Turn the bullet notes below into a SEEK-ready job ad in Australian English.
Format:
1. About us (60 words)
2. The role (90 words)
3. What you'll do (5–7 bullets)
4. What you'll bring (5–7 bullets)
5. Salary range, location, working pattern
6. How to apply
Constraints: Do not include age, gender, race, religion, marital status, or family preferences (Fair Work compliance).
Do not invent benefits or perks not in my notes.

NOTES:
[PASTE NOTES]`,
    expect: 'A clean, compliant ad you can edit in 5 minutes and post.',
    pitfall: 'Without the Fair Work constraint, the model sometimes adds well-meaning but discriminatory phrasing ("young and energetic", "family-friendly woman"). Always include the constraint.',
  },
  {
    num: 4,
    title: 'Meeting summary email',
    situation: 'You just got off a 45-minute call. You have a transcript or rough notes. You want a clean recap email out in 3 minutes.',
    prompt: `You are a chief of staff for an Australian SME.
From the transcript below, produce a meeting recap email:
- Subject line (under 60 chars)
- One-paragraph summary (50 words)
- Decisions (bullet list)
- Action items (table: owner, action, due date)
- Open questions (bullet list)
- Next meeting date if mentioned
Tone: friendly, brief, Australian English.
Do not invent owners or dates that were not stated.

TRANSCRIPT:
[PASTE]`,
    expect: 'An email everyone in the meeting can confirm or correct in 30 seconds.',
    pitfall: 'AI loves to assign owners by guessing. Without the no-invent constraint you will email a colleague that they own a task they never agreed to.',
  },
  {
    num: 5,
    title: 'Proposal first draft from discovery notes',
    situation: 'A discovery call went well; you need a proposal in the prospect&apos;s hands by tomorrow.',
    prompt: `You are a senior consultant at [BUSINESS] producing a proposal for [PROSPECT].
From the discovery notes below, draft a proposal with:
1. Problem statement in their words (60 words)
2. Objectives (3–5 bullets)
3. Approach in 3 phases with timing
4. Investment range (use the figures I provide; do not estimate)
5. Risks and assumptions (3 each)
6. Sign-off block
Australian English, GST-inclusive pricing. Do not invent scope I did not mention.

DISCOVERY NOTES:
[PASTE]`,
    expect: 'A 70%-complete proposal ready for your numbers and signature block.',
    pitfall: 'AI will pad scope to look thorough. Trim aggressively after the first draft.',
  },
  {
    num: 6,
    title: 'SOP from a video transcript',
    situation: 'You have a Loom or Zoom recording of someone explaining a process. You want a written SOP your next hire can follow.',
    prompt: `You are a documentation specialist.
From the transcript below, produce a Standard Operating Procedure:
- Title
- Purpose (40 words)
- When to use this
- Pre-requisites (tools, accounts, access)
- Steps (numbered, each step is one verb-led sentence)
- Common errors and fixes
- Sign-off / quality checklist
Australian English. Do not invent steps not in the transcript.

TRANSCRIPT:
[PASTE]`,
    expect: 'A teach-able SOP that captures the speaker&apos;s actual workflow.',
    pitfall: 'Sloppy transcripts cause sloppy steps. Spend 90 seconds cleaning the transcript before pasting.',
  },
  {
    num: 7,
    title: 'Spreadsheet formula explainer',
    situation: 'A complex Excel/Google Sheets formula is breaking and you can&apos;t see why.',
    prompt: `You are a senior spreadsheet analyst.
The formula below is in cell [CELL] of [SHEET].
Explain in plain English:
1. What the formula tries to do, step by step
2. The exact reason it returns [ERROR / WRONG VALUE]
3. A corrected version, with comments
4. A simpler alternative if one exists
Australian English.

FORMULA:
[PASTE]
SAMPLE DATA:
[PASTE 5 ROWS]`,
    expect: 'A line-by-line explanation, the bug identified, and a working replacement.',
    pitfall: 'Without the sample data, the model guesses about your column layout. Always include a sample.',
  },
  {
    num: 8,
    title: 'Compliance disclaimer drafter',
    situation: 'You need a disclaimer for a webpage, ad, or product — something that protects you without sounding paranoid.',
    prompt: `You are a small-business compliance writer in Australia.
Draft a [TYPE: marketing / financial / health / general] disclaimer for the situation below.
Constraints:
- Plain English, two sentences maximum
- Reference Australian Consumer Law where relevant
- Do not give legal advice — flag if a lawyer should review before publishing
- Australian English

SITUATION:
[DESCRIBE WHAT YOU ARE SELLING / SAYING]`,
    expect: 'A clean, defensible disclaimer plus a flag if you should run it past a lawyer.',
    pitfall: 'AI will sometimes write a 200-word disclaimer when 25 words would do. Always cap the length.',
  },
];

export default function PromptTemplatesForSMELessonPage() {
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
            { name: 'Prompt Engineering', url: '/academy/prompt-engineering' },
            { name: 'Prompt Templates for SME', url: '/academy/prompt-engineering/lessons/prompt-templates-for-sme' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 2 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 20 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Prompt templates SMEs use every week
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Eight battle-tested prompts you can paste into any major AI tool today, with the
              constraints that keep them honest and Australian.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
              </a>
              <Link
                href="/academy/prompt-engineering"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                <ArrowLeft className="size-4" /> Back to path
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline timeline */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Weekly cadence — when each template earns its keep
          </h3>
          <div className="flex justify-center">
            <InfographicTimeline width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Mon: meeting summaries · Tue: social pack · Wed: support replies · Thu: SOP / spreadsheet ·
            Fri: proposal &amp; job ad. Save the templates once, reuse forever.
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
              Walk-through of every template applied to a real AU SME scenario.
            </span>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12 space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">The eight templates</h2>
          <p className="mt-2 text-sm text-slate-600">
            Replace the <code className="text-xs">[BRACKETED]</code> bits with your own facts.
            Every template includes the constraints that keep AI from inventing things you will
            regret in front of a customer.
          </p>
        </div>

        {TEMPLATES.map((t) => (
          <div key={t.num} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-semibold flex-shrink-0">
                {t.num}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-700"><strong>Situation:</strong> {t.situation}</p>
                <pre className="mt-4 bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap break-words">
{t.prompt}
                </pre>
                <p className="mt-4 text-sm text-slate-700"><strong>What to expect:</strong> {t.expect}</p>
                <p className="mt-2 text-sm text-amber-700"><strong>Common pitfall:</strong> {t.pitfall}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Save them */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-emerald-900">Save the templates</h3>
          <p className="mt-2 text-sm text-emerald-900">
            We are publishing all eight as a downloadable PDF and a copy-friendly Notion page
            with the Q3 2026 Academy launch. In the meantime, copy each one into your own
            password manager or a private Google Doc — that is your prompt library.
          </p>
        </div>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Templates are recipes — role, task, context, format, constraints applied to the work you actually do.',
              'Every template has a "do not invent" constraint. That single line prevents 90% of embarrassing mistakes.',
              'Cap word counts and giveaways explicitly — AI will overshoot if you let it.',
              'Australian English + Fair Work compliance is one line of constraint, not a separate prompt.',
              'Build a personal prompt library now; the compounding return on a saved template is enormous.',
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
            <p className="font-semibold text-slate-900">Exercise: Personalise template #1 with a real email</p>
            <p className="mt-2">
              Pick the customer support reply template. Find a real complaint email in your inbox
              from the last month (use a real one — fake scenarios produce hollow output). Fill
              in the bracketed bits with your business name, your typical remedies (e.g., free
              re-delivery, replacement, $20 voucher), and your name. Run the prompt.
            </p>
            <p className="mt-3">
              Now, the key step: compare the AI&apos;s reply with what you actually sent (or would
              have sent). Where is it better? Where is it worse? Tweak the constraints in the
              template until the AI version reliably beats your own first draft. That tuned
              template is now yours forever.
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
                1. The customer support template caps the giveaway because&hellip;
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> AI charges per dollar of remedy offered</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Without limits, AI offers more than you can deliver</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The Spam Act requires it</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Without limits, AI tends to over-offer to seem helpful. Always cap.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why does the job-ad template explicitly call out Fair Work?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Fair Work approves all job ads</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> AI sometimes adds well-meaning but discriminatory phrasing</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It is legally required in every prompt</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">AI defaults to friendly stereotyped phrasing ("young", "family-friendly woman"). The constraint blocks it.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. The single-most-important constraint in every template is&hellip;
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Word count</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> &ldquo;Do not invent facts/owners/dates not in the source&rdquo;</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The sign-off name</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">The do-not-invent line. It removes the most expensive class of mistake — confidently wrong output.</p>
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
              Few-shot examples that lift quality fast
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              The single biggest reliability lift after the five-ingredient prompt — three worked examples beats every other tweak.
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
            href="/academy/prompt-engineering"
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
          >
            <ArrowLeft className="size-4" /> Back to Prompt Engineering
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
