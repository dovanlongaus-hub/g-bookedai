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
import { FlowAutomation } from '@/components/illustrations/flow-automation';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'Tool Use & Function Calling — Prompt Engineering Lesson 9 | LongCare Academy',
  description:
    'When AI acts, not just talks — four tool use patterns, function calling syntax, cost and latency, retry and security, with an AU example for booking calendar events in AEST/AEDT.',
  path: '/academy/prompt-engineering/lessons/tool-use-and-function-calling',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Tool Use & Function Calling — When AI Acts, Not Just Talks',
  educationalLevel: 'Intermediate',
  learningResourceType: 'Lesson',
  timeRequired: 'PT30M',
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

export default function ToolUseLessonPage() {
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
            { name: 'Tool Use & Function Calling', url: '/academy/prompt-engineering/lessons/tool-use-and-function-calling' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 9 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Tool use &amp; function calling — when AI acts, not just talks
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Four patterns to let AI reach into the real world — calendars, CRM, lookups,
              actions — with cost, latency, retry and security guardrails.
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
            User &rarr; AI &rarr; Tool call &rarr; API &rarr; AI summary
          </h3>
          <div className="flex justify-center">
            <FlowAutomation
              width={760}
              height={180}
              steps={['User asks', 'AI plans', 'Tool call', 'API response', 'Summary']}
            />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Tool use is the loop that turns AI from a calm advisor into an active colleague.
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
              Walk-through of weather, calendar, and CRM tools using OpenAI and Anthropic syntax.
              Transcript covers everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What is tool use?</h3>
          <p className="mt-2 text-slate-700">
            By default an AI model can only produce text from text. <strong>Tool use</strong> — or
            <em> function calling</em> as OpenAI named it — gives the model a defined set of
            functions it is allowed to call. The model decides when a function is needed, fills in
            the arguments, the function runs, the result comes back, and the model continues its
            answer with that result baked in. This is the bridge from chatbot to digital colleague.
            A booking assistant that reads your calendar, a support agent that looks up an order, a
            researcher that searches the web — all the same pattern.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Four tool-use patterns</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Retrieval</strong> — fetch information AI does not have. Get current weather, look up an order, search a knowledge base, query the database.</li>
            <li><strong>Calculation</strong> — offload precision work AI is bad at. Currency conversion, GST calculation, complex statistics, date arithmetic. AI is famously sloppy with arithmetic; offload it.</li>
            <li><strong>Action</strong> — change something in the world. Create a calendar event, send an email, file a ticket, refund a payment. This is where security and permission matter most.</li>
            <li><strong>Delegation</strong> — call another agent or workflow. The booking agent calls the calendar agent, which calls the email agent. Composability for complex tasks.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Function calling syntax</h3>
          <p className="mt-2 text-slate-700">
            Every tool has three parts the model needs to see: a <strong>name</strong>, a one-line
            <strong> description</strong> of what it does, and a JSON-schema <strong>parameter
            spec</strong>. The model uses the description to decide when to call it, and the schema
            to fill in arguments correctly.
          </p>
          <pre className="mt-2 bg-slate-100 p-4 rounded text-xs overflow-x-auto"><code>{`{
  "name": "get_weather",
  "description": "Returns current weather for an Australian city. Use when the user asks about temperature, rainfall or forecast.",
  "parameters": {
    "type": "object",
    "properties": {
      "city": { "type": "string", "description": "AU city name, e.g. 'Sydney'" },
      "units": { "type": "string", "enum": ["celsius"], "default": "celsius" }
    },
    "required": ["city"]
  }
}`}</code></pre>
          <p className="mt-2 text-slate-700">
            Notice the description does the work. &quot;Returns current weather...&quot; tells the
            model what the tool is for. &quot;Use when the user asks about...&quot; tells the model
            when to call it. Vague descriptions lead to wrong calls; precise descriptions are most
            of the engineering effort.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sample tools you&apos;ll build first</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Weather tool</strong> — easy first build, calls Open-Meteo&apos;s free API. Shows the loop end-to-end.</li>
            <li><strong>Calendar tool</strong> — <code>get_availability(date)</code>, <code>create_event(start, end, title, attendees)</code>. Built on Google Calendar API. AU SMEs use this for booking flows.</li>
            <li><strong>Custom CRM lookup</strong> — <code>lookup_customer(email)</code>. Returns recent orders, support tickets, loyalty status. Lets the AI personalise replies without inventing.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Cost: every tool call adds latency and tokens</h3>
          <p className="mt-2 text-slate-700">
            A single tool-use turn is at minimum three API calls: model decides to call tool → your
            backend executes the tool → model receives result and writes the user-facing reply.
            Each round-trip adds tokens (the schema, the call, the result) and latency
            (network + execution time). A simple weather lookup adds ~300–500ms; a CRM lookup
            against a slow DB can add seconds. Budget for it: chains with more than 3 tool calls
            should be reserved for async workflows, not synchronous chat UIs where the user is
            waiting.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Errors and the retry pattern</h3>
          <p className="mt-2 text-slate-700">
            Tools fail. APIs return 429s, 500s, timeouts, malformed JSON. A robust pattern:
          </p>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li>Catch errors from your tool execution.</li>
            <li>Return a structured error object to the model (e.g. <code>{`{"error":"rate_limit","retry_after":5}`}</code>) — not an exception.</li>
            <li>Let the model decide whether to retry, switch tools, or apologise to the user. Modern models handle this well.</li>
            <li>Cap retries (3 max) and total wall-clock (15s for chat, 60s for async) in your application layer.</li>
            <li>Log every tool error with the input and output for later debugging — silent retries hide bugs.</li>
          </ol>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU sample: book a meeting in AEST/AEDT</h3>
          <p className="mt-2 text-slate-700">
            A booking agent for an AU client needs three tools: <code>get_availability(date)</code>,
            <code> create_event(start, end, attendees)</code>,
            <code> send_email(to, subject, body)</code>. The trick is the timezone — all three must
            agree. Set every datetime parameter as ISO 8601 with explicit offset
            (<code>2026-05-15T14:00:00+10:00</code>) and tell the model in the system prompt:
            <em> &quot;You are booking for clients in Australia. Use AEST (UTC+10) Apr-Oct and
            AEDT (UTC+11) Oct-Apr. Always pass datetimes with explicit offset. Confirm the time
            zone in your user-facing reply.&quot;</em> Most booking bugs in AU are timezone bugs.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Security: function permissioning</h3>
          <p className="mt-2 text-slate-700">
            Action tools change real things. They must be permissioned. Three layers:
          </p>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Allowlist per user role.</strong> Customers can call <code>lookup_order(my_email)</code> but not <code>refund(any_order)</code>. Staff can call <code>refund(any_order_under_$100)</code>. Admins can call any refund. Enforce in your backend, not the prompt.</li>
            <li><strong>Confirmation step for high-impact actions.</strong> &quot;You are about to refund $1,250 to john@example.com — type CONFIRM to proceed.&quot; Never auto-execute over a threshold you set.</li>
            <li><strong>Audit log of every tool call.</strong> Who, what, when, input, output, result. APP 11 requires it and your future self will thank you.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            Treat tool use as you would treat handing the intern your API keys — useful, fast, and
            requiring guard rails before they push to prod.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'Tool use turns AI from advisor into colleague. Four patterns: retrieval, calculation, action, delegation.',
              'A function is name + description + JSON schema. The description carries most of the engineering effort.',
              'Every tool call adds tokens and latency — budget for it, especially in synchronous chat UIs.',
              'Robust pattern: return structured errors to the model, cap retries, log every call.',
              'AU bookings = timezone hell. Always pass ISO 8601 with explicit offset and tell the model AEST/AEDT rules.',
              'Action tools need permissioning (role allowlist), confirmation (high-value actions) and audit logs (APP 11).',
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
            <p className="font-semibold text-slate-900">Exercise: build a weather tool end-to-end</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Open the OpenAI Playground or Anthropic Workbench.</li>
              <li>Define one function: <code>get_weather(city, units)</code>. Use the schema from the transcript.</li>
              <li>For the tool implementation, call Open-Meteo&apos;s free API in a small Node.js or Python script.</li>
              <li>Send a user message: &quot;What&apos;s the weather in Sydney today?&quot;</li>
              <li>Watch the model decide to call the tool. Execute the call. Send the result back.</li>
              <li>Read the final reply — note that the model now grounds its answer in your live data, not its training data.</li>
              <li>Bonus: add a deliberate error to your tool (return <code>{`{"error":"down"}`}</code>) and watch how the model handles it.</li>
            </ol>
            <p className="mt-3">
              Once weather works, swap the schema for a Google Calendar <code>list_events</code> call. Same pattern, different API.
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
                1. What does the &quot;description&quot; field of a function tell the model?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The exact API endpoint to call</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> What the tool does and when to call it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> The retry policy</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">What and when. The model uses the description to decide when this tool is the right choice.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Why pass datetimes as ISO 8601 with explicit offset in AU?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Australian banks require it</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> AEST/AEDT switches twice a year and most booking bugs are timezone bugs</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> It saves tokens</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">AEST/AEDT switches. Always include the offset and the model handles it correctly.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. How should a tool report failure back to the model?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Throw an unhandled exception</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Silently retry until success</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Return a structured error object the model can reason about</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Structured error. The model can then decide whether to retry, switch tools, or apologise.</p>
              </details>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next lesson preview */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Up next · Lesson 10</p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              RAG &amp; grounding — ground AI in your real data
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Three RAG patterns, Vertex AI Search vs Pinecone vs pgvector, AU data residency,
              quality metrics, and when NOT to use RAG.
            </p>
          </div>
          <Link
            href="/academy/prompt-engineering/lessons/rag-and-grounding"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Continue path <ArrowRight className="size-4" />
          </Link>
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
