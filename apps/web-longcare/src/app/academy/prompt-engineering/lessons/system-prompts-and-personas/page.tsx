import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  MessageSquareCode,
  Play,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { FlowPromptAnatomy } from '@/components/illustrations/flow-prompt-anatomy';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'System Prompts & Personas — Set the Stage | Prompt Engineering Lesson 6 | LongCare Academy',
  description:
    'Master system prompts vs user prompts. The 5-element template (Role, Domain, Style, Constraints, Output). Custom GPT vs Gemini Gem vs Claude Project compared. 3 starter personas for AU SMEs.',
  path: '/academy/prompt-engineering/lessons/system-prompts-and-personas',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'System Prompts & Personas — Set the Stage',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT25M',
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

export default function SystemPromptsAndPersonasLessonPage() {
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
            { name: 'System Prompts & Personas', url: '/academy/prompt-engineering/lessons/system-prompts-and-personas' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 6 of 8
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 25 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              System prompts &amp; personas &mdash; set the stage
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              The system prompt is the most under-used lever in prompt engineering. Twenty-five
              minutes to learn the five-element template, the differences between Custom GPTs,
              Gems, and Projects, and three starter personas for AU SMEs.
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
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Inline flow */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Anatomy of a system prompt
          </h3>
          <div className="flex justify-center">
            <FlowPromptAnatomy width={720} height={200} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Five elements set the stage so user prompts only have to ask the question.
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
              Walk-through screencast in production. The transcript below covers every persona.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">System vs user prompt &mdash; what&rsquo;s the difference?</h3>
          <p className="mt-2 text-slate-700">
            The <strong>system prompt</strong> sits above every conversation. It tells the model
            <em> who it is, what domain it operates in, how it should sound, what it must not
            do, and how to format the output</em>. The <strong>user prompt</strong> is the
            specific request you type each time. Think of it like an actor: the system prompt is
            the character brief and stage directions; the user prompt is the line of dialogue.
            Once the system prompt is set, your day-to-day user prompts can be as short as
            &ldquo;reply to this email&rdquo; &mdash; the model already knows everything else.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">The five-element system prompt template</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Role.</strong> Who is the AI playing? (&ldquo;You are a customer support agent for an Australian aged-care business.&rdquo;)</li>
            <li><strong>Domain.</strong> What knowledge area? (&ldquo;You know home-care packages, Level 1&ndash;4, and AN-ACC funding basics.&rdquo;)</li>
            <li><strong>Style.</strong> Voice and tone. (&ldquo;Friendly, empathetic Australian English. No buzzwords.&rdquo;)</li>
            <li><strong>Constraints.</strong> Hard rules. (&ldquo;Never quote prices &mdash; always say &lsquo;happy to send a quote&rsquo;. Never give medical advice. Never invent facts.&rdquo;)</li>
            <li><strong>Output format.</strong> Structure. (&ldquo;Reply in plain text, &lt;200 words, signed &lsquo;Priya, LongCare Team&rsquo;.&rdquo;)</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Persona example 1 &mdash; Customer support agent</h3>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-800 whitespace-pre-wrap">{`ROLE: You are a customer support agent for LongCare AU, a small AU
  aged-care advisory firm.
DOMAIN: You know our service tiers (AI Starter, AI Mentor, Packages),
  AU home-care packages levels 1-4, and basic Privacy Act compliance.
STYLE: Warm and empathetic. Australian English spelling. Plain words.
  No emoji. Acknowledge feelings before answering.
CONSTRAINTS:
  - Never quote prices. Say "I'll get [name] to send you a tailored
    quote within 24 hours."
  - Never give medical advice. Refer to GP/aged-care specialist.
  - If you do not know, say so and offer to escalate.
  - Always confirm the customer's preferred name.
OUTPUT: Plain text email. Subject line + body. Sign off "Warm regards,
  the LongCare Team."`}</pre>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Persona example 2 &mdash; Legal-aware document drafter</h3>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-800 whitespace-pre-wrap">{`ROLE: You are a contract drafter assisting a small Australian
  professional services firm.
DOMAIN: You know AU contract law basics, ACL consumer guarantees, and
  Privacy Act APP obligations.
STYLE: Plain English where possible. Use numbered clauses for legal
  precision. Australian English spelling.
CONSTRAINTS:
  - You are NOT a lawyer. End every response with: "This is a draft
    only. Have a qualified Australian lawyer review before signing."
  - Use AU-standard clauses (governing law: New South Wales unless
    user specifies).
  - Flag any clause that may contravene ACL or Privacy Act.
OUTPUT: Numbered clauses. Mark optional clauses with [OPTIONAL].`}</pre>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Persona example 3 &mdash; BAS-savvy bookkeeper helper</h3>
          <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-800 whitespace-pre-wrap">{`ROLE: You assist a small Australian business owner with
  bookkeeping queries.
DOMAIN: AU GST (10%), BAS preparation, Xero/MYOB familiarity, super
  guarantee, PAYG withholding.
STYLE: Practical, friendly, no jargon. Plain Australian English.
  Show your maths.
CONSTRAINTS:
  - You are NOT a tax agent. End every response with: "For lodgement,
    consult a registered BAS or Tax Agent."
  - Always show GST as a separate line.
  - Round to AUD cents.
  - Never invent ATO interpretations - if uncertain, say so.
OUTPUT: Bullet points or table. Include AUD figures with GST shown.`}</pre>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Custom GPT vs Gemini Gem vs Claude Project</h3>
          <p className="mt-2 text-slate-700">
            Each major vendor has a way to package a system prompt with extra knowledge files
            into a reusable assistant.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>OpenAI Custom GPT.</strong> Available on Plus, Team, Enterprise. Drag in up
            to 20 knowledge files (PDF, DOCX, TXT). Can call &ldquo;Actions&rdquo; (custom API
            integrations). Shareable inside your team via the GPT Store. About
            <strong> AUD&nbsp;$32/month</strong> Plus tier; Team unlocks team-only sharing at
            <strong> ~AUD&nbsp;$45/seat</strong>.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Gemini Gem.</strong> Available on Google AI Pro and Workspace. Same idea,
            knowledge files supported. Tighter integration with Drive (a Gem can pull live from a
            Drive folder). About <strong>AUD&nbsp;$30/month</strong> Pro; <strong>AUD&nbsp;$33/seat</strong> Workspace.
          </p>
          <p className="mt-2 text-slate-700">
            <strong>Claude Project.</strong> Available on Pro and Team. Best for long documents
            because of the 200K-token context window &mdash; you can drop a 150-page manual and
            have the assistant know it all. About <strong>AUD&nbsp;$30/month</strong> Pro;
            <strong> ~AUD&nbsp;$45/seat/month</strong> Team.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Character limits and token economics</h3>
          <p className="mt-2 text-slate-700">
            System prompts cost tokens on every call. Keep them tight: 200&ndash;500 tokens
            (roughly 150&ndash;400 words) is plenty for most use cases. A 2,000-word system
            prompt is rarely necessary &mdash; and it eats into your effective context window.
            ChatGPT&rsquo;s Custom Instructions cap is around 1,500 characters per field; Gemini
            Gems and Claude Projects are roomier but still bounded.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Persona drift</h3>
          <p className="mt-2 text-slate-700">
            After 20&ndash;30 turns in a long conversation, models can start to forget the
            persona &mdash; replies drift back to neutral assistant style. Two fixes: (1) include
            a refresh line in occasional user prompts: <em>&ldquo;Stay in character &mdash;
            empathetic AU English, never quote prices.&rdquo;</em> (2) Start a new chat for a new
            task. Long chats compound errors; new chats inherit the system prompt fresh.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Test your system prompt before relying on it</h3>
          <p className="mt-2 text-slate-700">
            Before you make a Custom GPT/Gem/Project the team default, run five test scenarios
            through it: a normal request, a tricky request, a request that should be refused, an
            ambiguous request, and an emotional/upset request. If it handles all five well, ship.
            If not, iterate the system prompt before the team uses it.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'System prompts set the stage; user prompts are the dialogue. Set the stage well and dialogue gets shorter.',
              'Five elements: Role, Domain, Style, Constraints, Output format. Cover all five.',
              'Keep system prompts under 500 tokens — they cost on every call.',
              'Custom GPTs, Gemini Gems, and Claude Projects all package system prompts with knowledge files.',
              'Persona drift is real after 20+ turns. Refresh in-conversation or start fresh.',
              'Test five scenarios — normal, tricky, refusal, ambiguous, emotional — before team rollout.',
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
          <p className="text-sm text-slate-600 mb-4">One short hands-on exercise. Total time: 25 minutes.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Exercise: Build your first Custom GPT, Gem, or Claude Project</p>
            <p className="mt-2">
              Pick the tool you use most (ChatGPT Plus, Gemini Pro, Claude Pro). Create a new
              Custom GPT/Gem/Project. Use the customer-support persona above as a starting point;
              edit the role, domain, and constraints to fit your actual business.
            </p>
            <p className="mt-3">
              Run five test scenarios:
            </p>
            <ol className="mt-1 list-decimal pl-6 space-y-1">
              <li>A standard product enquiry</li>
              <li>A complaint about a delivery</li>
              <li>A request for medical advice (should be refused)</li>
              <li>An ambiguous question</li>
              <li>An emotional/upset customer</li>
            </ol>
            <p className="mt-3">
              Iterate the system prompt until all five feel right. Then save and use for the next
              week of real customer enquiries. Note quality vs your old &ldquo;blank ChatGPT&rdquo; baseline.
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
                1. What are the five elements of a system prompt?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Greeting, body, sign-off, signature, footer</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Role, Domain, Style, Constraints, Output format</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Question, context, examples, answer, follow-up</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Role, Domain, Style, Constraints, Output format.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why keep system prompts under 500 tokens when possible?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Models can&rsquo;t read longer prompts</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> They cost tokens on every call and reduce effective context</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> They cause model errors</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">They cost tokens on every call and reduce effective context window.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. What is &ldquo;persona drift&rdquo; and how do you fix it?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The model forgets the persona over long chats; refresh in-prompt or start fresh</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The model becomes too friendly; tell it to be sterner</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> The model invents new facts; use chain-of-thought</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">The model forgets the persona over long chats. Refresh with a reminder line or start a new chat.</p>
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
              Hallucinations &mdash; detection and mitigation
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Coming Q3 2026.
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
