import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  GraduationCap,
  Sparkles,
  Building2,
  Zap,
  MessageSquareCode,
  Workflow,
  BookOpen,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { HeroMentor } from '@/components/illustrations/hero-mentor';
import { InfographicTimeline } from '@/components/illustrations/infographic-timeline';

export const metadata: Metadata = getPageMetadata({
  title: 'Free AI Lessons — LongCare Academy | LongCare AU',
  description:
    'Free lessons across all 5 AI learning paths — eight free lessons per path, 40 in total. Full curriculum launching Q3 2026.',
  path: '/academy/lessons',
});

type FreeLesson = {
  pathSlug: string;
  pathName: string;
  pathHref: string;
  Icon: typeof Sparkles;
  level: string;
  lessonNumber: number;
  title: string;
  href: string;
  duration: string;
  description: string;
};

const FREE_LESSONS: FreeLesson[] = [
  {
    pathSlug: 'beginner-ai',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 1,
    title: 'What is AI? A practical overview for non-techies',
    href: '/academy/beginner-ai/lessons/what-is-ai',
    duration: '15 min',
    description:
      'Jargon-free definition of modern AI, what it’s good and bad at, with three real Australian SME examples.',
  },
  {
    pathSlug: 'beginner-ai-2',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 2,
    title: 'Setting up ChatGPT, Gemini & Claude — step by step',
    href: '/academy/beginner-ai/lessons/setting-up-tools',
    duration: '20 min',
    description:
      'Account creation, AUD pricing, AU privacy switches to change first, 2FA, and signup troubleshooting.',
  },
  {
    pathSlug: 'beginner-ai-3',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 3,
    title: 'Your first 10 prompts — copy, paste, adapt',
    href: '/academy/beginner-ai/lessons/your-first-10-prompts',
    duration: '20 min',
    description:
      'Ten battle-tested prompt templates for ChatGPT, Gemini, and Claude — adapted to AU English and SME context.',
  },
  {
    pathSlug: 'beginner-ai-4',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 4,
    title: 'AI for everyday tasks — email, notes, brainstorming',
    href: '/academy/beginner-ai/lessons/ai-for-everyday-tasks',
    duration: '25 min',
    description:
      'Seven daily jobs where AI consistently saves AU SMEs 9+ hours/week, with AUD pricing for each tier.',
  },
  {
    pathSlug: 'beginner-ai-5',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 5,
    title: 'Image & voice AI — photos, logos, voice memos',
    href: '/academy/beginner-ai/lessons/image-and-voice-ai',
    duration: '20 min',
    description:
      'DALL-E, Imagen, Midjourney, Firefly, Canva, ChatGPT Voice, Otter — five SME use cases with AUD pricing and AU consent rules.',
  },
  {
    pathSlug: 'beginner-ai-6',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 6,
    title: 'AI privacy basics — what never to paste',
    href: '/academy/beginner-ai/lessons/ai-privacy-basics',
    duration: '25 min',
    description:
      'The big-five categories you never paste into AI, mapped to APP 1, 6, 8 and 11 of the Australian Privacy Act 1988.',
  },
  {
    pathSlug: 'beginner-ai-7',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 7,
    title: 'Building your AI habit — from trial to daily use',
    href: '/academy/beginner-ai/lessons/building-your-ai-habit',
    duration: '20 min',
    description:
      'Why most AI experiments fail at AU SMEs and how to fix it: 5-day starter routine, atomic habits, AI desktop setup and a 30-day challenge.',
  },
  {
    pathSlug: 'beginner-ai-8',
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    level: 'Beginner',
    lessonNumber: 8,
    title: 'AI myths & realities — cut through the hype',
    href: '/academy/beginner-ai/lessons/ai-myths-and-realities',
    duration: '25 min',
    description:
      'Eight common AI myths AU SMEs believe in 2026 with the reality check for each — OAIC and ASIC stance, 2026 capability snapshot, three things AI still cannot do.',
  },
  {
    pathSlug: 'ai-for-business',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 1,
    title: 'AI for SMEs — A Practical Map',
    href: '/academy/ai-for-business/lessons/ai-for-sme-overview',
    duration: '20 min',
    description:
      'The ROI quadrant: where AI pays off in AU SMEs and the four functions where it’s overrated today.',
  },
  {
    pathSlug: 'ai-for-business-2',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 2,
    title: 'AI for sales and marketing — practical plays',
    href: '/academy/ai-for-business/lessons/sales-and-marketing-ai',
    duration: '25 min',
    description:
      'Lead gen, content velocity, sales enablement, AU plays, plus Spam Act and Privacy Act guardrails.',
  },
  {
    pathSlug: 'ai-for-business-3',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 3,
    title: 'Customer service AI playbook for SMEs',
    href: '/academy/ai-for-business/lessons/customer-service-ai-playbook',
    duration: '25 min',
    description:
      'Five-step playbook — triage, draft, escalate, resolve, survey — with KPIs and Privacy Act posture.',
  },
  {
    pathSlug: 'ai-for-business-4',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 4,
    title: 'Finance & admin AI automation — Xero, BAS, bookkeeping',
    href: '/academy/ai-for-business/lessons/finance-and-admin-automation',
    duration: '25 min',
    description:
      'Six high-ROI automations covering invoices, BAS drafts, receipts, reconciliation, cash flow, supplier comms.',
  },
  {
    pathSlug: 'ai-for-business-5',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 5,
    title: 'Marketing content engine — 30 posts in 30 minutes',
    href: '/academy/ai-for-business/lessons/marketing-content-engine',
    duration: '30 min',
    description:
      'One brief, five channels, a week of content — with brand voice matrix, AU best times, and Spam Act 2003 compliance.',
  },
  {
    pathSlug: 'ai-for-business-6',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 6,
    title: 'Operations & supply chain AI for SMEs',
    href: '/academy/ai-for-business/lessons/operations-and-supply',
    duration: '25 min',
    description:
      'Five ops use cases — inventory forecasting, supplier comms, logistics, capacity planning, document processing — with BAS-aware risk notes.',
  },
  {
    pathSlug: 'ai-for-business-7',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 7,
    title: 'AI for HR & people ops — hire, onboard, retain',
    href: '/academy/ai-for-business/lessons/hr-and-people-ops',
    duration: '25 min',
    description:
      'Seven HR use cases, AU compliance (Fair Work, Sex Discrimination, Privacy), bias guards for screening, and roughly A$2,000 saved per hire.',
  },
  {
    pathSlug: 'ai-for-business-8',
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    level: 'SME owners',
    lessonNumber: 8,
    title: 'Measuring AI ROI — beyond hours saved',
    href: '/academy/ai-for-business/lessons/measuring-ai-roi',
    duration: '25 min',
    description:
      'Four ROI dimensions, baseline-to-90-day measurement, common overclaims to avoid, and a worked AUD example for retail customer support AI.',
  },
  {
    pathSlug: 'ai-productivity',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 1,
    title: 'Build Your Personal AI Stack',
    href: '/academy/ai-productivity/lessons/your-personal-ai-stack',
    duration: '15 min',
    description:
      'Five tools, AUD pricing, and the workflow they slot into. Pick the three that fit your job.',
  },
  {
    pathSlug: 'ai-productivity-2',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 2,
    title: 'Email & meeting AI — save 10 hours a week',
    href: '/academy/ai-productivity/lessons/email-and-meeting-ai',
    duration: '25 min',
    description:
      'Tool comparison (Gemini, Superhuman, Granola, Otter, Fireflies), AU consent rules, three workflows.',
  },
  {
    pathSlug: 'ai-productivity-3',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 3,
    title: 'Document & research AI — drafts, summaries, deep research',
    href: '/academy/ai-productivity/lessons/document-and-research-ai',
    duration: '25 min',
    description:
      'Notion AI, Coda AI, Perplexity, NotebookLM, Claude Projects, ChatGPT Deep Research compared with AUD pricing.',
  },
  {
    pathSlug: 'ai-productivity-4',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 4,
    title: 'Spreadsheet & data AI — formulas, analysis, visualisation',
    href: '/academy/ai-productivity/lessons/spreadsheet-and-data-ai',
    duration: '30 min',
    description:
      'Six AI plays for spreadsheets — Sheets vs Excel Copilot vs ChatGPT data analyst, with AUD pricing.',
  },
  {
    pathSlug: 'ai-productivity-5',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 5,
    title: 'Voice & dictation AI — talk, don’t type',
    href: '/academy/ai-productivity/lessons/voice-and-dictation',
    duration: '20 min',
    description:
      'Apple, Google, Otter, Whisper, Just Press Record compared — with three voice-first workflows and AU spelling tips.',
  },
  {
    pathSlug: 'ai-productivity-6',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 6,
    title: 'AI for non-coders — spreadsheets, scripts, web',
    href: '/academy/ai-productivity/lessons/ai-for-coding-and-tech',
    duration: '30 min',
    description:
      'Six things AI helps non-coders do safely: formulas, bookmarklets, HTML, Apps Script, regex, SQL — plus three weekend projects.',
  },
  {
    pathSlug: 'ai-productivity-7',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 7,
    title: 'AI for research & learning — master anything faster',
    href: '/academy/ai-productivity/lessons/ai-for-research-and-learning',
    duration: '25 min',
    description:
      'Perplexity, ChatGPT Deep Research, Claude Projects, NotebookLM and Elicit compared with AUD pricing — plus citation hygiene and the rabbit-hole technique.',
  },
  {
    pathSlug: 'ai-productivity-8',
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    level: 'Professionals',
    lessonNumber: 8,
    title: 'Building your AI-powered personal knowledge base',
    href: '/academy/ai-productivity/lessons/personal-knowledge-base',
    duration: '30 min',
    description:
      'Notion, Obsidian, Mem.ai, Roam, Heptabase and NotebookLM compared — capture-process-connect-retrieve loop, three starter templates, AU privacy notes.',
  },
  {
    pathSlug: 'prompt-engineering',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 1,
    title: 'Anatomy of a Reliable Prompt',
    href: '/academy/prompt-engineering/lessons/prompt-anatomy',
    duration: '20 min',
    description:
      'Five ingredients — role, task, context, format, constraints — plus three SME-ready templates.',
  },
  {
    pathSlug: 'prompt-engineering-2',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 2,
    title: 'Prompt templates SMEs use every week',
    href: '/academy/prompt-engineering/lessons/prompt-templates-for-sme',
    duration: '20 min',
    description:
      'Eight ready-to-paste templates: support reply, social pack, job ad, meeting summary, proposal, SOP, formula, disclaimer.',
  },
  {
    pathSlug: 'prompt-engineering-3',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 3,
    title: 'Few-shot examples — why 1–2 demos beat 100 words',
    href: '/academy/prompt-engineering/lessons/few-shot-examples',
    duration: '20 min',
    description:
      'Five few-shot patterns and three rewrites that lift output quality fast — including the highest-ROI style-transfer trick.',
  },
  {
    pathSlug: 'prompt-engineering-4',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 4,
    title: 'Chain-of-thought — make AI show its reasoning',
    href: '/academy/prompt-engineering/lessons/chain-of-thought',
    duration: '25 min',
    description:
      'Four CoT patterns, when it helps, when it hurts, and how to balance accuracy vs AUD token cost.',
  },
  {
    pathSlug: 'prompt-engineering-5',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 5,
    title: 'Prompt libraries & versioning — treat prompts like code',
    href: '/academy/prompt-engineering/lessons/prompt-libraries-and-versioning',
    duration: '20 min',
    description:
      'Folder pattern, change logs, retired patterns, sharing rules, and a 5-prompt starter library for AU SMEs.',
  },
  {
    pathSlug: 'prompt-engineering-6',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 6,
    title: 'System prompts & personas — set the stage',
    href: '/academy/prompt-engineering/lessons/system-prompts-and-personas',
    duration: '25 min',
    description:
      'Five-element system prompt template, three SME-ready personas, and Custom GPT vs Gem vs Project compared with AUD pricing.',
  },
  {
    pathSlug: 'prompt-engineering-7',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 7,
    title: 'Output validation patterns — trust but verify',
    href: '/academy/prompt-engineering/lessons/output-validation-patterns',
    duration: '25 min',
    description:
      'Five validation patterns (schema, sentinel, self-critique, cross-model, human-in-loop) with AU notes for ASIC/TGA-regulated outputs and an example structured prompt.',
  },
  {
    pathSlug: 'prompt-engineering-8',
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    level: 'Intermediate',
    lessonNumber: 8,
    title: 'Multimodal prompting — image, audio, video inputs',
    href: '/academy/prompt-engineering/lessons/multimodal-prompting',
    duration: '25 min',
    description:
      'Best multimodal models in 2026 (Gemini 2.0, GPT-4o, Claude), AUD pricing per input type, five SME use cases and a hands-on photo-to-invoice extraction.',
  },
  {
    pathSlug: 'ai-automation',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 1,
    title: 'Automation Basics — Triggers, Actions, AI Steps',
    href: '/academy/ai-automation/lessons/automation-basics',
    duration: '25 min',
    description:
      'Mental model, tool comparison (Zapier/Make/n8n/Pipedream), AU compliance corners, and a cost calculator.',
  },
  {
    pathSlug: 'ai-automation-2',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 2,
    title: 'Zapier vs Make vs n8n — for your AU SME',
    href: '/academy/ai-automation/lessons/zapier-vs-make-vs-n8n',
    duration: '30 min',
    description:
      'AUD pricing, AU data residency, AI integration, decision flowchart, and 24-month TCO at 1,000 runs/month.',
  },
  {
    pathSlug: 'ai-automation-3',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 3,
    title: 'Building your first AI workflow — lead form to Slack',
    href: '/academy/ai-automation/lessons/building-your-first-ai-workflow',
    duration: '30 min',
    description:
      'Ship a real form-to-Slack workflow in 30 minutes with AI extraction, conditional routing, and monitoring.',
  },
  {
    pathSlug: 'ai-automation-4',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 4,
    title: 'Error handling & monitoring — don’t trust, verify',
    href: '/academy/ai-automation/lessons/ai-error-handling-and-monitoring',
    duration: '25 min',
    description:
      'Five-layer defence for AI workflows plus AU log retention requirements and tool comparisons.',
  },
  {
    pathSlug: 'ai-automation-5',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 5,
    title: 'Multi-step AI agents — beyond single prompts',
    href: '/academy/ai-automation/lessons/multi-step-agent-workflows',
    duration: '30 min',
    description:
      'The agent loop, four production-ready patterns, AUD pricing for Zapier/Make/n8n/Lindy/Relevance, and a hands-on build.',
  },
  {
    pathSlug: 'ai-automation-6',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 6,
    title: 'Cost & rate limits — don’t get surprised by AI bills',
    href: '/academy/ai-automation/lessons/cost-and-rate-limit-management',
    duration: '25 min',
    description:
      'Token economics, AUD pricing, five cost-saving tactics, rate-limit strategies, and a 1,000-run/month projection.',
  },
  {
    pathSlug: 'ai-automation-7',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 7,
    title: 'AI in data pipelines — from raw to useful',
    href: '/academy/ai-automation/lessons/data-pipelines-with-ai',
    duration: '30 min',
    description:
      'Five sample pipelines (form to CRM, receipt to Xero, call to Slack, resume to ATS, Shopify order to fulfilment), AUD economics per 1,000 events and AU residency.',
  },
  {
    pathSlug: 'ai-automation-8',
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    level: 'Advanced',
    lessonNumber: 8,
    title: 'Integrating AI with your existing AU SME stack',
    href: '/academy/ai-automation/lessons/integration-with-existing-tools',
    duration: '30 min',
    description:
      'Six integration patterns mapping AI to Xero, MYOB, HubSpot, Mailchimp, Outlook, Slack, M365 and Workspace — plus a decision matrix and stack-mapping exercise.',
  },
];

type ComingSoonGroup = {
  pathName: string;
  pathHref: string;
  Icon: typeof Sparkles;
  lessons: { id: number; title: string; duration: string }[];
};

const COMING_SOON: ComingSoonGroup[] = [
  {
    pathName: 'Beginner AI',
    pathHref: '/academy/beginner-ai',
    Icon: Sparkles,
    lessons: [
      { id: 9, title: 'Capstone: ship one AI workflow this week', duration: '20 min' },
    ],
  },
  {
    pathName: 'AI for Business',
    pathHref: '/academy/ai-for-business',
    Icon: Building2,
    lessons: [
      { id: 9, title: 'Privacy, IP, and AU compliance for SME AI use', duration: '30 min' },
      { id: 10, title: 'Capstone: pick 1 use case and draft an implementation plan', duration: '45 min' },
    ],
  },
  {
    pathName: 'AI Productivity',
    pathHref: '/academy/ai-productivity',
    Icon: Zap,
    lessons: [
      { id: 9, title: 'AI for travel, planning, and life admin + capstone', duration: '25 min' },
    ],
  },
  {
    pathName: 'Prompt Engineering',
    pathHref: '/academy/prompt-engineering',
    Icon: MessageSquareCode,
    lessons: [
      { id: 9, title: 'Hallucinations: detection and mitigation', duration: '35 min' },
      { id: 10, title: 'Advanced: JSON mode, function calling, structured outputs', duration: '45 min' },
    ],
  },
  {
    pathName: 'AI Automation',
    pathHref: '/academy/ai-automation',
    Icon: Workflow,
    lessons: [
      { id: 9, title: 'Lead qualification and nurture automations', duration: '50 min' },
      { id: 10, title: 'Customer support automation with safe deflection', duration: '50 min' },
      { id: 11, title: 'Document processing pipeline (PDF → data → action)', duration: '55 min' },
      { id: 12, title: 'Deployment, cost management, and scaling — capstone', duration: '55 min' },
    ],
  },
];

const totalComingSoon = COMING_SOON.reduce((sum, g) => sum + g.lessons.length, 0);

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'LongCare AI Academy — 40 free lessons across 5 paths',
  numberOfItems: FREE_LESSONS.length,
  itemListElement: FREE_LESSONS.map((l, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'LearningResource',
      name: l.title,
      learningResourceType: 'Lesson',
      educationalLevel: l.level,
      timeRequired: `PT${parseInt(l.duration, 10)}M`,
      url: `https://longcare.au${l.href}`,
      inLanguage: 'en-AU',
      isPartOf: {
        '@type': 'Course',
        name: l.pathName,
        url: `https://longcare.au${l.pathHref}`,
      },
    },
  })),
};

export default function LessonsLibraryPage() {
  return (
    <main className="bg-[#F8FAFC] text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Academy', url: '/academy' },
            { name: 'Lessons', url: '/academy/lessons' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pt-32 pb-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          <div>
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <BookOpen className="size-3" /> Lesson Library
            </Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Free AI Lessons
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Eight free lessons per path. Forty in total. The remaining curriculum, certificates,
              and live cohorts launch with the Academy in Q3 2026.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 sm:gap-10 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-600" />
                <span><strong className="text-slate-900">{FREE_LESSONS.length}</strong> free lessons available now</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-sky-700" />
                <span><strong className="text-slate-900">{totalComingSoon}+</strong> more in production</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="size-5 text-sky-700" />
                <span>Certificates included at launch</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMentor className="text-sky-700" width={420} height={320} />
          </div>
        </div>
      </section>

      {/* Curriculum timeline infographic */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12">
          <h3 className="font-heading text-2xl text-slate-900 mb-6 text-center">
            Curriculum rollout timeline
          </h3>
          <div className="flex justify-center">
            <InfographicTimeline width={720} height={180} />
          </div>
          <p className="text-sm text-slate-600 text-center mt-4">
            Free lessons live now · full Academy with certificates and live cohorts launching Q3 2026.
          </p>
        </div>
      </section>

      {/* Free lessons */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Free lessons</h2>
        <p className="text-sm text-slate-600 mb-6">
          Eight free lessons from every path — 40 in total. No login, no payment.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {FREE_LESSONS.map(({ pathSlug, pathName, Icon, level, lessonNumber, title, href, duration, description }) => (
            <Link
              key={pathSlug}
              href={href}
              className="group bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <Badge variant="outline" className="border-slate-200 text-slate-600">
                  {level}
                </Badge>
                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 ml-auto">
                  Free
                </Badge>
              </div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{pathName} · Lesson {lessonNumber}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 flex-1">{description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {duration}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 group-hover:gap-2 transition-all">
                  Start lesson <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Coming soon</h2>
        <p className="text-sm text-slate-600 mb-6">
          The full lesson set across all five paths — landing with the Academy launch in Q3 2026.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {COMING_SOON.map(({ pathName, pathHref, Icon, lessons }) => (
            <div
              key={pathName}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{pathName}</h3>
                <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 ml-auto">
                  {lessons.length} more
                </Badge>
              </div>
              <ol className="divide-y divide-slate-100">
                {lessons.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="size-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {l.id}
                      </span>
                      <span className="text-slate-700">{l.title}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                      <Clock className="size-3" /> {l.duration}
                    </span>
                  </li>
                ))}
              </ol>
              <Link
                href={pathHref}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:gap-2 transition-all"
              >
                See path overview <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Get notified CTA */}
      <section className="mx-auto max-w-[1120px] px-6 sm:px-10 pb-20">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center">
          <div className="size-12 mx-auto rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
            <Mail className="size-6" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Get notified when the full Academy launches
          </h2>
          <p className="mt-2 text-slate-600 max-w-xl mx-auto">
            We’ll email you the moment the rest of the curriculum, certificates, and live cohorts go
            live in Q3 2026. No spam, just the launch.
          </p>
          <Link
            href="/resources/ai-readiness"
            className="mt-6 inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Take the AI Readiness Assessment <ArrowRight className="size-4" />
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            Or browse <Link href="/academy" className="text-sky-700 hover:underline">all 5 learning paths</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
