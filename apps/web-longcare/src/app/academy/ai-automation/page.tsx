import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  Workflow,
  Sparkles,
  Building2,
  Zap,
  MessageSquareCode,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroAgents } from '@/components/illustrations/hero-agents';

export const metadata: Metadata = getPageMetadata({
  title: 'AI Automation — Workflows That Run Without You | LongCare Academy',
  description:
    'Advanced AI automation course. Build workflows with n8n, Zapier, chatbots, and pipelines in 10 lessons over 8 hours.',
  path: '/academy/ai-automation',
});

const lessons = [
  { id: 1, title: 'Workflow basics: triggers, actions, and human checkpoints', duration: '40 min' },
  { id: 2, title: 'n8n and Zapier with AI: when to use each', duration: '50 min' },
  { id: 3, title: 'Building chatbots without code', duration: '50 min' },
  { id: 4, title: 'Document processing pipeline (PDF → data → action)', duration: '55 min' },
  { id: 5, title: 'Lead qualification and nurture automations', duration: '50 min' },
  { id: 6, title: 'Customer support automation with safe deflection', duration: '50 min' },
  { id: 7, title: 'Social media automation that doesn’t look automated', duration: '40 min' },
  { id: 8, title: 'Monitoring, alerts, and observability for AI workflows', duration: '40 min' },
  { id: 9, title: 'Error handling, retries, and graceful failure', duration: '40 min' },
  { id: 10, title: 'Deployment, cost management, and scaling — capstone', duration: '55 min' },
];

const learnings = [
  'Design end-to-end AI workflows with the right human checkpoints',
  'Choose between n8n, Zapier, and custom code with confidence',
  'Build no-code chatbots that handle real customer conversations',
  'Process PDFs, emails, and docs into structured data automatically',
  'Add monitoring, retries, and graceful failure to every workflow',
  'Manage AI usage costs at scale without surprise bills',
];

const related = [
  { title: 'Beginner AI', href: '/academy/beginner-ai', Icon: Sparkles },
  { title: 'AI for Business', href: '/academy/ai-for-business', Icon: Building2 },
  { title: 'AI Productivity', href: '/academy/ai-productivity', Icon: Zap },
  { title: 'Prompt Engineering', href: '/academy/prompt-engineering', Icon: MessageSquareCode },
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AI Automation — Build Workflows That Run Without You',
  description:
    'Advanced AI automation: workflow design, n8n/Zapier with AI, chatbots, document pipelines, monitoring, and cost management.',
  provider: {
    '@type': 'Organization',
    name: 'LongCare AU',
    sameAs: 'https://longcare.au',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT8H',
  },
  educationalLevel: 'Advanced',
  offers: {
    '@type': 'Offer',
    price: '149.00',
    priceCurrency: 'AUD',
    availability: 'https://schema.org/InStock',
    url: 'https://longcare.au/academy/ai-automation',
  },
};

export default function AIAutomationPage() {
  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Academy', url: '/academy' },
            { name: 'AI Automation', url: '/academy/ai-automation' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <Workflow className="size-3" /> Advanced
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <Clock className="size-3" /> 8 hours
              </Badge>
              <Badge variant="outline" className="border-slate-200 text-slate-600">
                <GraduationCap className="size-3" /> 10 lessons
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              AI Automation
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Build AI workflows that run without you. From no-code chatbots to document
              pipelines and full-stack automations — with monitoring, retries, and cost
              control built in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/academy/ai-automation/lessons/automation-basics"
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
              >
                Start Lesson 1 — Free <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
              >
                All paths
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroAgents className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">What you’ll learn</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {learnings.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lessons */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Lessons</h2>
        <ol className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
          {lessons.map((l) => {
            const isFree = l.id === 1;
            const content = (
              <>
                <div className="flex items-start gap-4">
                  <span className="size-8 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {l.id}
                  </span>
                  <span className="text-sm sm:text-base text-slate-800">{l.title}</span>
                  {isFree && (
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                      Free
                    </Badge>
                  )}
                </div>
                <span className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0">
                  <Clock className="size-3.5" /> {l.duration}
                </span>
              </>
            );
            if (isFree) {
              return (
                <li key={l.id}>
                  <Link
                    href="/academy/ai-automation/lessons/automation-basics"
                    className="flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-sky-50/40 transition group"
                  >
                    {content}
                  </Link>
                </li>
              );
            }
            return (
              <li key={l.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                {content}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Pricing</h3>
            <p className="mt-1 text-sm text-slate-600">
              First lesson is free. Full course <strong>A$149</strong> — or included with
              the Mentor 5-pack and Business Transformation programs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://book.longcare.au?service=academy-ai-automation"
              className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              Start Free Lesson <ArrowRight className="size-4" />
            </a>
            <Link
              href="/services/packages"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
            >
              View packages
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Other learning paths</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map(({ title, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-sky-300 transition flex items-center gap-3"
            >
              <div className="size-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Icon className="size-4" />
              </div>
              <span className="text-sm font-medium text-slate-800 group-hover:text-sky-700">
                {title}
              </span>
              <ArrowRight className="size-4 text-slate-400 ml-auto group-hover:text-sky-700" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
