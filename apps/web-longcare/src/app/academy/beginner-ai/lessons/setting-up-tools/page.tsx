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
import { FlowThreeStep } from '@/components/illustrations/flow-three-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Setting Up ChatGPT, Gemini & Claude — Beginner AI Lesson 2 | LongCare Academy',
  description:
    'Step-by-step setup for ChatGPT, Gemini, and Claude in 2026 — including AUD pricing, AU privacy settings to change first, 2FA, and troubleshooting common signup issues.',
  path: '/academy/beginner-ai/lessons/setting-up-tools',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Setting Up ChatGPT, Gemini & Claude — Step by Step',
  educationalLevel: 'Beginner',
  learningResourceType: 'Lesson',
  timeRequired: 'PT20M',
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

export default function SettingUpToolsLessonPage() {
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
            { name: 'Setting Up Tools', url: '/academy/beginner-ai/lessons/setting-up-tools' },
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
              Setting up ChatGPT, Gemini &amp; Claude — step by step
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Twenty minutes from a blank screen to three working AI accounts — with the privacy
              switches an Australian business should change before typing a single prompt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Mark complete &amp; next <ArrowRight className="size-4" />
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

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            The 20-minute setup, in three moves
          </h3>
          <div className="flex justify-center">
            <FlowThreeStep width={720} height={140} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Sign up &rarr; Configure privacy &rarr; First prompt. Do not skip the middle step — it
            is the difference between a tool you can paste into and one you cannot.
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
              Walk-through screencast in production. The transcript below covers every click.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why three accounts, not one?</h3>
          <p className="mt-2 text-slate-700">
            ChatGPT, Gemini, and Claude all do the same broad job — text in, text out — but each
            has personality and pricing quirks worth a few minutes to learn. ChatGPT (OpenAI) is
            still the default for most general tasks. Gemini (Google) lives inside Workspace
            Gmail, Docs, and Drive, which makes it unbeatable if your business already runs on
            Google. Claude (Anthropic) is the calm, careful one — strongest at long documents,
            coding, and refusing to invent facts. Most Australian SMEs end up using two regularly.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 1 — ChatGPT (OpenAI)</h3>
          <p className="mt-2 text-slate-700">
            Open <code>chat.openai.com</code> in a private/incognito window so existing logins do
            not interfere. Click <em>Sign up</em> and use your business email — not a personal
            Gmail you also use for friends. OpenAI will email a verification link; click it. Add a
            mobile number for 2FA when prompted (use the <em>Authenticator app</em> option, not
            SMS). On the welcome screen pick a profile name your team would recognise.
          </p>
          <p className="mt-2 text-slate-700">
            Free tier in 2026 gives you GPT-5 mini with daily caps. <strong>Plus</strong> is around
            <strong> AUD&nbsp;$32/month inc GST</strong> and unlocks the full GPT-5 model, image
            generation, voice mode, and the file-upload feature. <strong>Team</strong> is around
            <strong> AUD&nbsp;$45 per seat/month</strong> billed annually and adds the critical
            line in the data-privacy policy: <em>“We do not train on your team data.”</em> If you
            run a business with more than three users, Team is the entry point — not Plus.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 2 — Gemini (Google)</h3>
          <p className="mt-2 text-slate-700">
            Visit <code>gemini.google.com</code> and sign in with your Google Workspace account.
            If your business runs on a free <code>@gmail.com</code> address, Gemini works but with
            consumer privacy terms. If you run on Google Workspace (a real
            <code>@yourbusiness.com.au</code>), ask your admin to enable <em>Gemini for
            Workspace</em> — pricing is around <strong>AUD&nbsp;$33 per user/month inc GST</strong>
            on the Business plan, and includes Gemini inside Gmail, Docs, Sheets, Slides, and
            Meet.
          </p>
          <p className="mt-2 text-slate-700">
            On first launch, Gemini asks whether to enable <em>Gemini Apps Activity</em> — this is
            the chat history setting. Read the next section before you click.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Step 3 — Claude (Anthropic)</h3>
          <p className="mt-2 text-slate-700">
            Visit <code>claude.ai</code>. Sign up with your business email. Anthropic does not
            offer a free phone-call signup; you must verify by email and then by SMS for 2FA.
            <strong> Pro</strong> is around <strong>AUD&nbsp;$30/month inc GST</strong>; the
            <strong> Max</strong> plan (heavier usage and more compute) is around
            <strong> AUD&nbsp;$155/month</strong>. <strong>Team</strong> is around
            <strong> AUD&nbsp;$45 per seat/month</strong> with a do-not-train commitment in the
            agreement. Claude’s standout feature for SMEs is its 200,000-token context window,
            which means you can paste an entire 150-page contract and ask focused questions.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy settings to change first</h3>
          <p className="mt-2 text-slate-700">
            Before you paste anything that resembles real work, change these four settings on
            every account.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Turn off model training on your data.</strong> ChatGPT: Settings &rarr; Data Controls &rarr; toggle off <em>Improve the model for everyone</em>. Gemini: <em>Activity</em> &rarr; pause <em>Gemini Apps Activity</em>. Claude: free and Pro tiers do not train on your chats by default — verify the line in <em>Settings &rarr; Privacy</em>.</li>
            <li><strong>Manage chat history retention.</strong> ChatGPT lets you set a 30-day rolling deletion. Claude defaults to 30 days for deleted chats. Gemini lets you choose 3, 18, or 36 months.</li>
            <li><strong>Custom instructions / system prompt.</strong> All three tools support a per-account instruction that runs before every chat. Add: <em>“I am a small-business owner in Australia. Use Australian English. Do not invent facts. If you are not sure, say so.”</em></li>
            <li><strong>Memory / personalisation.</strong> ChatGPT and Gemini will remember details across chats unless told not to. For business use, leave memory off — it leaks context between unrelated tasks.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Mobile vs desktop</h3>
          <p className="mt-2 text-slate-700">
            Install all three mobile apps (iOS or Android) — voice dictation works far better than
            on desktop, and you will use it more than you expect. Desktop wins for pasting large
            documents and reading long answers. ChatGPT now ships a Mac and Windows desktop app
            that overlays on top of any window with a global hotkey — the single biggest
            productivity unlock for the year.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Security: 2FA and password manager</h3>
          <p className="mt-2 text-slate-700">
            All three accounts will become a record of your business thinking. Treat them like
            email. Enable an authenticator-app 2FA (1Password, Authy, or Google Authenticator) —
            not SMS, which can be SIM-swapped. Store the recovery codes in your password manager,
            not in an email folder. If a staff member leaves, rotate the password the same day
            and revoke their workspace access.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU billing and GST notes</h3>
          <p className="mt-2 text-slate-700">
            All three vendors invoice in AUD with 10% GST when you set Australia as the billing
            country and provide an ABN. Tax invoices are downloadable as PDF from the billing
            page — store them in your accounting software (Xero, MYOB, QuickBooks) like any other
            SaaS expense. They are deductible against the business as software subscriptions.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Troubleshooting common signup issues</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>“This phone number cannot be used for verification.”</strong> Try a mobile (not landline). If still blocked, your number was likely flagged from prior signups; contact support with your business ABN.</li>
            <li><strong>Card declined.</strong> Australian Visa/Mastercard with 3DS works for all three. Some debit cards from neobanks fail — use a credit card.</li>
            <li><strong>Workspace admin block.</strong> Many Google Workspace tenants block Gemini by default. Ask your admin to enable it via the Workspace Admin Console.</li>
          </ul>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Three accounts is the right number — ChatGPT, Gemini, Claude — most AU SMEs end up using two regularly.',
              'Pay for Team tier (around AUD $45/seat/month) the moment you have a real business — that is the line where vendors commit not to train on your data.',
              'Turn off model training, set chat retention, and add Australian English custom instructions before you paste anything real.',
              'Use authenticator-app 2FA, never SMS. Treat AI accounts like email accounts — they hold your thinking.',
              'AUD billing with GST is supported on all three; download tax invoices monthly into your accounting tool.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 8 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Dial in privacy on whichever tool you opened first</p>
            <p className="mt-2">
              Pick the one of the three you are most likely to use this week. Open Settings, find
              the data controls page, and walk through these three switches:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Toggle off model training.</li>
              <li>Set chat history to delete after 30 days.</li>
              <li>Add this custom instruction: <em>“I run a small business in Australia. Use Australian English spelling. Do not invent facts. If you are not sure, say so.”</em></li>
            </ol>
            <p className="mt-3">Now send your first prompt: <em>“What did I just change in your settings, and what would still be visible to your provider if I asked you a sensitive question?”</em> Read the answer carefully.</p>
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
                1. Which tier has a written commitment that vendors will <em>not</em> train on your data?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Free tier</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Personal Plus / Pro tier</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Team / Workspace tier</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Team / Workspace tier. Personal Plus/Pro tiers vary; only business tiers carry the explicit do-not-train clause in the master agreement.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which 2FA method should you avoid for AI accounts?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> SMS to your mobile</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Authenticator app</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Hardware key</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">SMS. Australian SIM-swap fraud is rising; authenticator apps and hardware keys are far safer.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Where do you set Australian English as a default behaviour?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Inside every prompt, every time</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Custom instructions / system prompt setting</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> It is automatic from your IP address</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Custom instructions. Set it once and every chat inherits the preference.</p>
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
              Your first 10 prompts that actually work
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Ten ready-to-paste prompts that produce useful output on day one — no theory.
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
