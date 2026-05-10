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
import { HeroGovernance } from '@/components/illustrations/hero-governance';
import { InfographicStack } from '@/components/illustrations/infographic-stack';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Privacy Basics — What Never to Paste | Beginner AI Lesson 6 | LongCare Academy',
  description:
    'The five categories you must never paste into ChatGPT, Gemini, or Claude — grounded in the Australian Privacy Act 1988 (APP 1, 6, 8, 11) with a 3-step privacy hygiene routine.',
  path: '/academy/beginner-ai/lessons/ai-privacy-basics',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI Privacy Basics — What Never to Paste',
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

export default function AiPrivacyBasicsLessonPage() {
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
            { name: 'AI Privacy Basics', url: '/academy/beginner-ai/lessons/ai-privacy-basics' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 6 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI privacy basics — what never to paste
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Twenty-five minutes that will save your business from a Privacy Act breach. The five
              categories you never paste, the four AU-specific controls to set, and the steps to
              take if you slip up.
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
            <HeroGovernance className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            AU privacy controls, layered
          </h3>
          <div className="flex justify-center">
            <InfographicStack width={720} height={300} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Privacy is layered: device, network, account, prompt. Lock all four and the residual
            risk is small.
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
              Walk-through screencast in production. The transcript below covers every example.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why this matters more than you think</h3>
          <p className="mt-2 text-slate-700">
            Every prompt you send to a hosted AI tool leaves your computer, crosses an ocean,
            lives briefly in someone else&rsquo;s memory, and may be inspected by their staff for
            quality control. Most of the time that&rsquo;s harmless. But if your prompt contained a
            customer&rsquo;s Medicare number, a draft contract with a competitor&rsquo;s pricing, or
            a screenshot of your accounting login &mdash; you have just had what the Office of the
            Australian Information Commissioner (OAIC) calls an <em>eligible data breach</em>. Under
            the Notifiable Data Breaches scheme, you may be required to notify affected individuals
            and the OAIC within 30 days, and fines under the recently strengthened Privacy Act can
            reach the higher of $50 million, three times the benefit derived, or 30% of adjusted
            turnover. The good news: avoiding all of this is straightforward.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The big five — never paste these</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Customer PII.</strong> Names with addresses, dates of birth, Medicare or TFN numbers, driver licences, passport numbers, biometric data. Even a single full name plus phone number is &ldquo;personal information&rdquo; under APP 1.</li>
            <li><strong>Financial details.</strong> Bank account numbers, BSB, credit card numbers, customer payment data, your own banking logins. Never. Not even &ldquo;just to format this CSV nicely.&rdquo;</li>
            <li><strong>Medical information.</strong> Health records, diagnoses, prescriptions, mental-health notes, NDIS plans, aged-care assessments. This is &ldquo;sensitive information&rdquo; under APP 3 with stricter consent rules.</li>
            <li><strong>IP and trade secrets.</strong> Source code that gives you competitive edge, unsigned commercial agreements, supplier pricing you negotiated under NDA, draft patents. Some vendors retain prompts for 30 days; that is 30 days of risk.</li>
            <li><strong>Login credentials.</strong> Usernames, passwords, API keys, OAuth tokens, recovery codes. Pasting them into AI is functionally equivalent to writing them on a sticky note in a public train station.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The Australian Privacy Act, simply</h3>
          <p className="mt-2 text-slate-700">
            The Privacy Act 1988 contains the 13 Australian Privacy Principles (APPs). Four matter
            most for AI use:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>APP 1 (Open and transparent management).</strong> You must have a privacy policy that explains how you handle personal information, including your use of AI tools. Update yours.</li>
            <li><strong>APP 6 (Use and disclosure).</strong> You can only use personal information for the purpose it was collected. Pasting a customer&rsquo;s details into ChatGPT to draft an email is a secondary use that requires consent.</li>
            <li><strong>APP 8 (Cross-border disclosure).</strong> Sending personal information overseas (which all major AI tools do) requires you to take reasonable steps to ensure it is handled per APPs. Use of vendor enterprise tier with a Data Processing Addendum is the cleanest route.</li>
            <li><strong>APP 11 (Security).</strong> You must protect personal information from unauthorised access. Free-tier AI accounts are not, by default, an appropriate level of protection for sensitive data.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Privacy controls in each tool</h3>
          <p className="mt-2 text-slate-700">
            <strong>ChatGPT.</strong> Settings &rarr; Data Controls &rarr; turn off &ldquo;Improve
            the model for everyone.&rdquo; Set chat history to delete after 30 days. On Team or
            Enterprise tiers, training is off by default and a Data Processing Agreement is
            available to download.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Gemini.</strong> Pause &ldquo;Gemini Apps Activity.&rdquo; On Workspace, the
            admin panel lets you control retention down to 3 months. Workspace plans default to no
            training and offer EU/US data residency choices.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Claude.</strong> Free and Pro tiers do not train on your chats by default.
            Verify in Settings &rarr; Privacy. Team and Enterprise add a written do-not-train
            commitment and 30-day default retention.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Data residency — does it matter for you?</h3>
          <p className="mt-2 text-slate-700">
            For most SMEs, no &mdash; APP 8 is satisfied by good vendor agreements. For
            government, health, and financial services tenants, yes &mdash; data residency in
            Australia (the
            <code> australia-southeast1</code> Google Cloud region or AWS Sydney) is often
            mandated by a regulator. Vertex AI on Google Cloud and Anthropic on AWS Bedrock
            both let you pin data to Sydney. ChatGPT does not yet expose region selection on
            consumer plans.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The 3-step privacy hygiene routine</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Redact.</strong> Before pasting, ctrl-F any name, number, or identifier in the source document and replace with [CUSTOMER A], [TFN], [PROJECT X]. Yes, every time.</li>
            <li><strong>Use placeholders.</strong> Build prompts that work with placeholders so you can reuse them. Example: &ldquo;Draft a follow-up email to [CUSTOMER NAME] about their [PRODUCT] order delivery delay.&rdquo;</li>
            <li><strong>Only paste what is necessary.</strong> If the AI doesn&rsquo;t need the customer&rsquo;s phone number to draft the email, don&rsquo;t paste it. Less context = less risk.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">If you slip up</h3>
          <p className="mt-2 text-slate-700">
            It happens. Here is the playbook: (1) Delete the chat from your account immediately.
            (2) Within ChatGPT, also use Settings &rarr; Data Controls &rarr; Delete account data
            &mdash; or for Team/Enterprise, your admin can purge. (3) Document what happened: when,
            what was pasted, who saw the chat in your team. (4) Assess severity using the OAIC
            &ldquo;serious harm&rdquo; test. (5) If real harm is likely, notify affected individuals
            and lodge an NDB notification with the OAIC within 30 days. (6) Update training so it
            doesn&rsquo;t recur. The OAIC penalises cover-up far more than honest mistake plus prompt
            response.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Compliance footnote</h3>
          <p className="mt-2 text-slate-700">
            The OAIC published <em>Guidance on privacy and the use of commercially available AI
            products</em> in October 2024 and refreshed in 2025. Bookmark it; the current
            consultation cycle on AI-specific principles closes mid-2026. Australian businesses
            who can demonstrate they read and applied this guidance get materially better
            treatment if a breach occurs.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Five categories never go in: customer PII, financial details, medical info, IP/trade secrets, login credentials.',
              'Australian Privacy Act APP 1, 6, 8, and 11 most directly apply to AI tool use; update your privacy policy.',
              'Turn off model training and set 30-day retention on every account before pasting anything real.',
              'Redact, placeholder, and minimise — three habits that prevent 99% of AI privacy incidents.',
              'If you slip up: delete, document, assess against OAIC serious-harm test, and notify within 30 days if required.',
              'Cover-up is penalised more than honest mistake plus prompt response.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 12 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Audit and redact your last five AI prompts</p>
            <p className="mt-2">
              Open ChatGPT, Gemini, or Claude. Scroll to your last five chats. For each one, ask
              yourself:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Did I paste any of the &ldquo;big five&rdquo; categories?</li>
              <li>Could the same task have worked with placeholders?</li>
              <li>Is &ldquo;train on my data&rdquo; off in this account&rsquo;s settings?</li>
            </ol>
            <p className="mt-3">
              Delete any chats that contain real customer data. Switch on the privacy controls if
              you haven&rsquo;t. Save one redacted prompt as a reusable template for next time.
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
                1. Which of these is &ldquo;sensitive information&rdquo; under APP 3?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> A customer&rsquo;s shipping address</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> A patient&rsquo;s diagnosis or NDIS plan</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> A vendor invoice number</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">A patient&rsquo;s diagnosis or NDIS plan. Health information is sensitive under APP 3 with strict consent requirements.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. What is the first step of the privacy hygiene routine?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Toggle off training in settings</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Redact identifiers and replace with placeholders</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Use a VPN</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Redact &mdash; before pasting, swap names and IDs for placeholders.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Within how many days must serious eligible breaches be reported to the OAIC?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 7 days</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 30 days</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> 90 days</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">30 days under the Notifiable Data Breaches scheme &mdash; but earlier is always better.</p>
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
              Building your AI habit + capstone
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              How to make AI a daily habit instead of a novelty &mdash; coming Q3 2026.
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
