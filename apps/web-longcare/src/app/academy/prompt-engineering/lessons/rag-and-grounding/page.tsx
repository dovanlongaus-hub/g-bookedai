import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
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
import { FlowFiveStep } from '@/components/illustrations/flow-five-step';
import { DotsPattern } from '@/components/illustrations/dots-pattern';

export const metadata: Metadata = getPageMetadata({
  title: 'RAG & Grounding — Prompt Engineering Lesson 10 | LongCare Academy',
  description:
    'Retrieval Augmented Generation explained for AU SMEs — three RAG patterns, Vertex AI Search vs Pinecone vs pgvector, AU data residency, quality metrics and when not to use RAG at all.',
  path: '/academy/prompt-engineering/lessons/rag-and-grounding',
});

const lessonSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'RAG & Grounding — Ground AI in Your Real Data',
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

export default function RAGLessonPage() {
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
            { name: 'RAG & Grounding', url: '/academy/prompt-engineering/lessons/rag-and-grounding' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <MessageSquareCode className="size-3" /> Lesson 10 of 10
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 30 minutes
              </Badge>
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
                <GraduationCap className="size-3" /> Free
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              RAG &amp; grounding — ground AI in your real data
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Three Retrieval Augmented Generation patterns, the AU-hosted vector DB landscape,
              quality metrics, and the situations where you should not use RAG at all.
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
            Query &rarr; Embed &rarr; Search &rarr; Rank &rarr; Generate
          </h3>
          <div className="flex justify-center">
            <FlowFiveStep
              width={760}
              height={180}
              steps={['Query', 'Embed', 'Search', 'Rank', 'Generate']}
            />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Every RAG system is some version of these five steps. The art is in steps 3 and 4.
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
              Builds the SME customer-support knowledge base end-to-end. Transcript covers
              everything below.
            </span>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">Lesson transcript</h2>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">What is RAG?</h3>
          <p className="mt-2 text-slate-700">
            <strong>RAG</strong> is Retrieval Augmented Generation. In one sentence: <em>search
            your own data first, then have AI write the answer using what it found.</em> The
            model becomes a reader, not a guesser. Behind the scenes, the system embeds your
            documents into a vector database, embeds the user&apos;s question into the same vector
            space, finds the most semantically similar chunks, and feeds them as context to the
            model with the question. The model is no longer relying on its training data — it is
            relying on yours.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Why grounding matters</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Hallucinations.</strong> Models invent facts when they don&apos;t know. Grounding gives them the right answer in front of them.</li>
            <li><strong>Freshness.</strong> Foundation models have a training cut-off. Your pricing, your policies, your stock levels need to come from your live data.</li>
            <li><strong>IP.</strong> Your knowledge base is your competitive advantage. RAG lets you use it without putting it in someone else&apos;s training set.</li>
            <li><strong>Auditability.</strong> A grounded answer can cite its source. An ungrounded one cannot. For OAIC, TGA or ASIC scrutiny, citations matter.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Three RAG patterns, simplest first</h3>
          <ol className="mt-2 list-decimal pl-6 text-slate-700">
            <li><strong>Simple — paste docs.</strong> For a knowledge base under ~100 pages, paste it directly into a system prompt or Claude Project. No infrastructure, no embeddings, no vector DB. Surprisingly effective for small SMEs.</li>
            <li><strong>Search-then-prompt.</strong> For a few hundred to a few thousand documents, use any keyword search (Algolia, Elasticsearch, even SQL LIKE) to fetch the top 3-5 matches, paste them into the prompt. Still no embeddings, still cheap, works for most SMEs.</li>
            <li><strong>Embeddings + vector DB.</strong> For tens of thousands of documents or where semantic similarity matters (paraphrased queries), this is the &quot;real&quot; RAG: text embedding model converts every chunk to a vector, vector DB indexes them, similarity search returns the best matches. Higher infrastructure cost, much higher quality at scale.</li>
          </ol>
          <p className="mt-2 text-slate-700">
            Most teams skip 1 and 2 and jump to 3, then spend three months building infrastructure
            for a knowledge base that would have fit in pattern 1. Start small.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Tool landscape</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Vertex AI Search (Google Cloud).</strong> Managed RAG, supports asia-southeast2 (Sydney) region. Good first stop for AU teams.</li>
            <li><strong>OpenAI Assistants with File Search.</strong> Upload PDFs, OpenAI handles chunking/embedding/retrieval. Easy. US-hosted.</li>
            <li><strong>Pinecone.</strong> Mature vector DB, regional options including Sydney (ap-southeast-2) on AWS. Pay per vector + per query.</li>
            <li><strong>Weaviate.</strong> Open-source vector DB, self-host anywhere including AU regions on AWS/GCP/Azure.</li>
            <li><strong>pgvector</strong> on Postgres. The lowest-cost pattern — your existing Postgres becomes a vector DB. Cloud SQL Postgres in Sydney region keeps everything AU-hosted.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">AU data residency</h3>
          <p className="mt-2 text-slate-700">
            Vector DB residency matters for two reasons: APP 8 (cross-border disclosure of PII)
            and latency (a query to a Sydney vector DB is ~5ms RTT; to a US one it is ~180ms).
            For SMEs handling AU PII, prefer Vertex AI Search Sydney, Pinecone ap-southeast-2,
            self-hosted Weaviate in a Sydney region, or pgvector on Cloud SQL Sydney. For
            non-sensitive content (public marketing, generic FAQs), US-hosted is fine and often
            cheaper.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Sample: SME knowledge base for customer support</h3>
          <p className="mt-2 text-slate-700">
            A 30-person AU SaaS team has 800 support articles, 2,000 customer questions per month,
            and an SLA of 2 hours. RAG architecture: nightly Cloud Function pulls articles from
            Notion, chunks them at ~500 tokens with 100-token overlap, embeds with
            <code> text-embedding-3-small</code>, stores in pgvector on Sydney Cloud SQL. On each
            inbound support email, the chat backend embeds the question, retrieves the top 5
            chunks, and asks Claude Sonnet to draft an answer using only those chunks (with
            citations). A human agent reviews, edits, sends. Result: average answer time drops
            from 90 minutes to 22 minutes; agents handle 3.5x more tickets each.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">Quality metrics</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Retrieval precision @ k.</strong> Of the top 5 chunks retrieved, how many were actually relevant to the question? Target: 4 of 5.</li>
            <li><strong>Faithfulness.</strong> Does the generated answer only use information from the retrieved chunks (not invented)? Target: 95%+.</li>
            <li><strong>Answer relevance.</strong> Does the answer actually address the question asked? Target: 90%+ by human review on a weekly sample.</li>
            <li><strong>Latency p95.</strong> End-to-end query &rarr; answer time. Target: under 3 seconds for chat UX, under 30 seconds for async.</li>
            <li><strong>Cost per query.</strong> Embedding + retrieval + generation tokens. Target: under AUD $0.02 per query for SME knowledge base.</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold text-slate-900">When NOT to use RAG</h3>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li><strong>Your knowledge fits in context.</strong> Claude has 200,000 tokens. If your entire knowledge base is under ~150,000 tokens, paste it directly. No vector DB needed.</li>
            <li><strong>Your knowledge is structured.</strong> Tables, prices, inventory — query them as SQL or via function calling. RAG over structured data is worse than direct query.</li>
            <li><strong>Freshness matters more than coverage.</strong> Live stock levels, prices, status — call the API directly with function calling, don&apos;t pre-index.</li>
            <li><strong>Single fact lookups.</strong> &quot;What is the opening hours of the Carlton store?&quot; — a direct database query is faster and more accurate.</li>
          </ul>
          <p className="mt-2 text-slate-700">
            RAG shines on large, semi-structured, evolving knowledge bases — support docs, policy
            libraries, research archives, internal wikis. For everything else, pick the simpler
            pattern.
          </p>
        </article>
      </section>

      {/* Key takeaways */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key takeaways</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              'RAG = retrieve from your data, then have AI write the answer using what was found. Search first, generate second.',
              'Three patterns: paste-docs, search-then-prompt, embeddings + vector DB. Start small.',
              'AU-hosted options: Vertex AI Search (Sydney), Pinecone ap-southeast-2, self-hosted Weaviate, pgvector on Cloud SQL Sydney.',
              'Five metrics: retrieval precision @ k, faithfulness, answer relevance, latency p95, cost per query.',
              'Skip RAG when the knowledge fits in context, is structured, needs freshness, or is a single-fact lookup.',
              'AU residency matters for APP 8 and for latency — Sydney region beats US by ~175ms per query.',
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
            <p className="font-semibold text-slate-900">Exercise: ship pattern 1 today</p>
            <ol className="mt-3 list-decimal pl-6 space-y-1">
              <li>Export your top 20 FAQs or support articles into a single markdown file.</li>
              <li>Open Claude (Project) or ChatGPT (Custom GPT) and paste the file as the knowledge base.</li>
              <li>Write a system prompt: <em>&quot;Answer only from the knowledge base. If the answer isn&apos;t there, say &lsquo;I don&apos;t know — please escalate.&rsquo; Cite the article title in your answer.&quot;</em></li>
              <li>Ask 10 real customer questions. Score each answer: correct / partial / wrong / hallucinated.</li>
              <li>If you scored 8+/10, ship it as a draft reply in your support inbox. If less, add the missing articles and re-test.</li>
            </ol>
            <p className="mt-3">
              You just shipped a RAG system. No vector DB required. Upgrade to pattern 2 or 3 only
              when your knowledge base outgrows 100 pages.
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
                1. What is the simplest RAG pattern for an SME with under 100 pages of docs?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Pinecone + embeddings</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Paste-docs (pattern 1) into a Claude Project or Custom GPT</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" /> Self-hosted Weaviate</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Paste-docs. Surprisingly effective for small SMEs.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                2. Which AU-hosted option uses your existing Postgres?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Vertex AI Search</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> pgvector on Cloud SQL Sydney</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" /> Pinecone</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">pgvector. Lowest-cost pattern, AU residency, single piece of infrastructure.</p>
              </details>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-slate-900">
                3. When should you NOT use RAG?
              </legend>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Whenever knowledge is sensitive</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> When data is structured, freshness-critical, or fits in context</label>
                <label className="flex items-center gap-2"><input type="radio" name="q3" /> Never — always use RAG</label>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-sky-700">Show answer</summary>
                <p className="mt-1 text-slate-700">Structured, freshness-critical, or fits in context. Pick the simpler pattern for those.</p>
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
              You finished Prompt Engineering &mdash; advanced bootcamps coming Q4 2026
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Capstone projects, certificates and a live AU cohort land later this year. AI
              Automation next pulls everything together into production workflows.
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
