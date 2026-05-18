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
import { IndustryProfessional } from '@/components/illustrations/industry-icons';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'AI for Australians — Beginner AI Lesson 10 | LongCare Academy',
  description:
    'Localise AI for Australia in 2026 — Australian English prompts, ATO/BAS/Fair Work/Medicare use cases, APP 1-13 in practice, AU AI tools landscape and the local community to plug into.',
  path: '/academy/beginner-ai/lessons/ai-for-australians',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'AI for Australians — Local Context, Local Wins',
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

export default function AIForAustraliansLessonPage() {
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
            { name: 'AI for Australians', url: '/academy/beginner-ai/lessons/ai-for-australians' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Sparkles className="size-3" /> Lesson 10 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI for Australians — local context, local wins
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Make AI feel like it lives in your suburb, not in San Francisco. Localise the
              language, the tax, the law, the tools, and the community — for AU SMEs in 2026.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
              >
                Mark complete &mdash; coming soon
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

      {/* Inline flow + industry */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Localise &rarr; Apply &rarr; Connect
          </h3>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <FlowThreeStep
              width={620}
              height={140}
              step1Label="Language & tone"
              step2Label="AU use cases"
              step3Label="Local community"
            />
            <div className="text-sky-700">
              <IndustryProfessional width={96} height={96} />
            </div>
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Three things separate &quot;an AI tool you use&quot; from &quot;an AI tool that
            understands Australia&quot;. None of them are technical.
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
              Walk-through of Aussie spelling, BAS prompts, Fair Work checks and the local AI
              community. Transcript covers everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Australian English vs US/UK output</h3>
          <p className="mt-2 text-slate-700">
            Out of the box, ChatGPT, Gemini, and Claude default to American English. They will
            write <em>“organize”</em>, <em>“color”</em>, <em>“fall”</em>, and <em>“buddy”</em>
            unless told otherwise. Australian audiences notice within two sentences and the trust
            drains. Fix it once at the account level by adding a custom instruction:
            <em> “Always respond in Australian English. Use AU spelling (organise, colour, centre).
            Use AU date format (DD/MM/YYYY). Use AUD with dollar sign. Use metric units. Avoid
            American idioms (no &lsquo;buddy&rsquo;, &lsquo;y&rsquo;all&rsquo;, &lsquo;fall&rsquo;
            for autumn).”</em> Set it in ChatGPT custom instructions, Gemini gems, and Claude
            projects — once, then never think about it again.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU-specific use cases that pay off</h3>
          <p className="mt-2 text-slate-700">
            Five places where AI earns its keep specifically because it is being asked an
            Australian question.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>ATO &amp; BAS preparation.</strong> Paste a month of categorised Xero transactions and ask Claude to draft your BAS narrative — GST collected, GST paid, PAYG instalment, fringe benefits — for review by your accountant. AI does not lodge anything, but it cuts your prep from three hours to twenty minutes.</li>
            <li><strong>Fair Work HR queries.</strong> Award interpretation, notice periods, public holiday loadings, casual conversion — paste the situation, ask AI to point you to the relevant Fair Work clause, then verify the citation on fairwork.gov.au. Treat AI as a research starter, not a ruling.</li>
            <li><strong>Medicare admin.</strong> Item number lookups, bulk-billing eligibility explainers for patients, claim rejection re-write into plain English. Healthcare practices report 4–6 hours/week saved on admin.</li>
            <li><strong>Real estate state-specific contracts.</strong> Each state has its own residential and commercial contract template (NSW Form 23A vs VIC Section 32 vs QLD REIQ). Use AI to summarise differences for vendors and tenants — but always have a conveyancer sign off.</li>
            <li><strong>Translation for AU multicultural audiences.</strong> Mandarin, Cantonese, Vietnamese, Arabic, Punjabi — the top five non-English languages spoken at home. AI translation now matches a human translator for everyday business comms (booking confirmations, FAQ pages, signage).</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Australian Privacy Act (APP 1-13) in practice</h3>
          <p className="mt-2 text-slate-700">
            The Privacy Act 1988 governs how Australian businesses with turnover over $3M (and
            many smaller ones who handle health data) handle personal information. Thirteen
            principles. For daily AI use, four of them matter the most.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>APP 1 (Open and transparent management).</strong> Your privacy policy must say you use AI tools. A single paragraph is enough.</li>
            <li><strong>APP 6 (Use or disclosure).</strong> Do not paste customer data into AI for a purpose other than what you originally collected it for. Marketing analysis of support tickets, for example, needs separate consent.</li>
            <li><strong>APP 8 (Cross-border disclosure).</strong> Most AI vendors host in the US. By pasting customer PII, you are sending it overseas. Document the vendor and the safeguard (vendor SOC 2, business tier do-not-train clause).</li>
            <li><strong>APP 11 (Security).</strong> Treat AI accounts like email — 2FA, password manager, named users, revoke access when staff leave.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            The OAIC published 2024 guidance on generative AI and most of it is common sense:
            de-identify before pasting, prefer business tiers, document your decisions.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU AI tools landscape 2026</h3>
          <p className="mt-2 text-slate-700">
            Australians built and ship plenty of the global AI stack. Worth knowing the home team.
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Atlassian Rovo</strong> — AI search and agents inside Jira, Confluence, Trello. Best fit for AU SaaS and engineering teams.</li>
            <li><strong>Canva Magic Studio</strong> — AI design, copywriting, video. AU-built, used by 170M people. Free tier extends to most small businesses.</li>
            <li><strong>Linktree AI</strong> — AI bio writing and link organising. Niche but quick.</li>
            <li><strong>Octopus Deploy AI</strong> — DevOps automation.</li>
            <li><strong>Daisy</strong> — Sydney-built customer support AI focused on AU SMEs, AU support hours.</li>
            <li><strong>Relevance AI</strong> — agents and workflows, AU-headquartered, OAIC-aware data handling.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            None replaces the US giants for general use, but each has a niche where being
            Australian-built (timezone, accent, account managers) actually matters.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AUD pricing reality check</h3>
          <p className="mt-2 text-slate-700">
            A reasonable AU SME AI budget in 2026 is around <strong>AUD $200–400 per knowledge
            worker per year</strong> across one chat tool (ChatGPT Plus or Claude Pro), one
            workspace tool (Gemini or Microsoft 365 Copilot), and one automation tool (Zapier
            free or Make starter). That is roughly the cost of a single afternoon’s billable work
            for an accountant or consultant. If a tool is costing more than that and you cannot
            point to a recovered hour each week per user, it is the wrong tool.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Where AU lags and where AU leads</h3>
          <p className="mt-2 text-slate-700">
            Australia <strong>leads</strong> in banking AI (Commonwealth, NAB, Macquarie all have
            production AI customer-service deployments), in retail AI (Woolworths and Coles run
            heavy AI in supply chain and dynamic pricing), and in healthcare imaging AI (Annalise,
            Harrison.ai). Australia <strong>lags</strong> in AI talent supply (we export ML
            engineers to the US), in AU-hosted foundation models (we use US-hosted Gemini, GPT,
            Claude), and in government AI procurement clarity (the AI Assurance Framework is still
            evolving as of 2026). Knowing the landscape helps you set realistic expectations with
            partners and customers.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Plug into the AU AI community</h3>
          <p className="mt-2 text-slate-700">
            The fastest way to keep up is other Australians who are also figuring this out.
            Three free, high-signal places to start: <strong>LinkedIn AU AI groups</strong> (search
            &ldquo;Australian Generative AI&rdquo;, &ldquo;AU AI for Business&rdquo;);
            <strong> Tech Council of Australia</strong> events and newsletter (free for SMEs);
            and <strong>local Slack/Discord channels</strong> hosted by Atlassian, Canva, and
            Relevance for builders. Going to one meet-up a quarter beats reading a hundred US
            newsletters.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Set Australian English, AUD, DD/MM/YYYY and metric units once in your custom instructions — it sticks across every chat.',
              'BAS, Fair Work, Medicare and state-specific real estate contracts are five AU-specific high-ROI AI use cases.',
              'APP 1, 6, 8 and 11 of the Privacy Act 1988 are the four that govern daily AI use — privacy policy, purpose limitation, cross-border, security.',
              'Canva, Atlassian, Relevance and Daisy are AU-built AI tools worth knowing — timezone, accent, and account managers matter.',
              'A reasonable AU AI budget for a knowledge worker in 2026 is around AUD $200-400 per year all-in.',
              'AU AI community on LinkedIn, Tech Council of Australia, and local Slacks gives you more signal than fifty US newsletters.',
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
            <p className="font-semibold text-slate-900">Exercise: localise your AI in three moves</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Open ChatGPT (or Gemini, or Claude) and add the AU custom instruction from the transcript to your account settings.</li>
              <li>Paste a Fair Work-style question into a new chat: <em>&ldquo;In NSW, what is the minimum notice period for a casual employee with 18 months service?&rdquo;</em> Note the answer and ask AI to cite the Fair Work clause.</li>
              <li>Verify the citation by searching it on <code>fairwork.gov.au</code>. Was AI right? Close? Wrong? Whatever you find, that is your real-world calibration of AI for AU legal questions.</li>
            </ol>
            <p className="mt-3">
              Bonus: search LinkedIn for &ldquo;Australian Generative AI&rdquo;, join one group, post your finding from step 3.
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
                1. Which APP covers cross-border disclosure of personal information to overseas AI vendors?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> APP 1</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> APP 8</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> APP 13</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">APP 8. Sending PII to a US-hosted AI vendor is a cross-border disclosure — document the vendor and the safeguards.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Where should Australian English be set so it applies to every chat?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> In every prompt, every time</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Custom instructions / system prompt at the account level</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It is auto-detected from your IP</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Custom instructions. Once, then forget about it.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. Which AU-built AI tool is best known for design, copywriting, and video?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Atlassian Rovo</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Canva Magic Studio</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Daisy</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Canva Magic Studio. AU-built, used by 170 million people, with a generous free tier.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview (last lesson — coming soon) */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Continue path</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              You finished Beginner AI &mdash; advanced bootcamps coming Q4 2026
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Capstone projects, certificates and a live AU cohort land later this year. In the
              meantime, jump into AI for Business or AI Productivity.
            </p>
          </div>
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className="inline-flex items-center gap-2 bg-slate-300 text-slate-500 font-medium px-5 py-2.5 rounded-lg pointer-events-none cursor-not-allowed select-none"
          >
            Continue path &mdash; coming soon
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
