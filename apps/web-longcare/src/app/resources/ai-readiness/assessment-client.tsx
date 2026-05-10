'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Database,
  FileText,
  Mail,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlowAssessment } from '@/components/illustrations/flow-assessment';

// ----- Question model ------------------------------------------------------

type Dimension = 'data' | 'team' | 'process' | 'usecase';

type Option = { label: string; score: 0 | 1 | 2 | 3 };

type Question = {
  id: string;
  dimension: Dimension;
  question: string;
  helper?: string;
  options: Option[];
};

const DIMENSIONS: Record<
  Dimension,
  {
    label: string;
    short: string;
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
    weakRecommendation: {
      title: string;
      description: string;
      cta: string;
      href: string;
    };
  }
> = {
  data: {
    label: 'Data Readiness',
    short: 'Data',
    icon: Database,
    weakRecommendation: {
      title: 'Start with Data Readiness',
      description:
        'AI is only as good as the data it sees. Begin with a one-hour data audit to map where your data lives, how clean it is, and what is safe to use.',
      cta: 'Book the AI Starter Session',
      href: 'https://book.longcare.au?ref=assessment&focus=data',
    },
  },
  team: {
    label: 'Team Capability',
    short: 'Team',
    icon: Users,
    weakRecommendation: {
      title: 'Build Team Capability',
      description:
        'Pick two team members and run them through a structured AI mentor session. Capability compounds — start small, ship something real.',
      cta: 'Book a 1-on-1 AI Mentor Session',
      href: 'https://book.longcare.au?ref=assessment&focus=team',
    },
  },
  process: {
    label: 'Process Maturity',
    short: 'Process',
    icon: FileText,
    weakRecommendation: {
      title: 'Tighten Your Processes First',
      description:
        'Document your top three workflows before automating them. A 5-week Strategy Sprint will surface the highest-ROI candidates and ship the first one.',
      cta: 'Start a Strategy Sprint',
      href: 'https://book.longcare.au?ref=assessment&focus=process',
    },
  },
  usecase: {
    label: 'AI Use Cases',
    short: 'Use Cases',
    icon: Target,
    weakRecommendation: {
      title: 'Identify Your First Use Case',
      description:
        'You need a single, high-value use case to anchor everything. A 30-minute discovery call is the fastest way to lock one in and scope it properly.',
      cta: 'Book a Discovery Call',
      href: 'https://book.longcare.au?ref=assessment&focus=usecase',
    },
  },
};

const QUESTIONS: Question[] = [
  // ----- Data Readiness ----------------------------------------------------
  {
    id: 'data-1',
    dimension: 'data',
    question: 'Where does your business data live today?',
    helper: 'Think customer records, invoices, files, communications.',
    options: [
      { label: 'Mostly on paper, email or personal devices', score: 0 },
      { label: 'A mix of spreadsheets and a few cloud tools', score: 1 },
      { label: 'Centralised in Google Workspace or Microsoft 365', score: 2 },
      { label: 'Centralised with a CRM/ERP and clear ownership', score: 3 },
    ],
  },
  {
    id: 'data-2',
    dimension: 'data',
    question: 'How easily can you retrieve a year of historical records?',
    options: [
      { label: 'Painful — would take days of manual work', score: 0 },
      { label: 'Possible, but messy and inconsistent', score: 1 },
      { label: 'Within an hour for most data sets', score: 2 },
      { label: 'Instantly via APIs, exports or dashboards', score: 3 },
    ],
  },
  {
    id: 'data-3',
    dimension: 'data',
    question: 'How would you rate the quality and cleanliness of your data?',
    options: [
      { label: 'Lots of duplicates, gaps and inconsistencies', score: 0 },
      { label: 'Workable, but needs cleaning before use', score: 1 },
      { label: 'Mostly clean with light validation', score: 2 },
      { label: 'High quality with documented standards', score: 3 },
    ],
  },

  // ----- Team Capability ---------------------------------------------------
  {
    id: 'team-1',
    dimension: 'team',
    question: 'Has your team used AI tools (ChatGPT, Gemini, Copilot)?',
    options: [
      { label: 'Never — completely new to AI', score: 0 },
      { label: 'A couple of people experiment occasionally', score: 1 },
      { label: 'Most of the team uses AI weekly', score: 2 },
      { label: 'AI is embedded in daily workflows', score: 3 },
    ],
  },
  {
    id: 'team-2',
    dimension: 'team',
    question: 'Does anyone on your team have coding or data skills?',
    options: [
      { label: 'No technical skills in-house', score: 0 },
      { label: 'Spreadsheet power-users only', score: 1 },
      { label: 'One person comfortable with scripts or SQL', score: 2 },
      { label: 'A developer or analyst we can lean on', score: 3 },
    ],
  },
  {
    id: 'team-3',
    dimension: 'team',
    question: 'How prepared is the team for structured AI training?',
    options: [
      { label: 'No time or budget allocated', score: 0 },
      { label: 'Curious, but no plan yet', score: 1 },
      { label: 'A few hours per week earmarked', score: 2 },
      { label: 'Dedicated training budget and time-box', score: 3 },
    ],
  },

  // ----- Process Maturity --------------------------------------------------
  {
    id: 'process-1',
    dimension: 'process',
    question: 'Are your core workflows documented?',
    options: [
      { label: 'Almost nothing is written down', score: 0 },
      { label: 'A few SOPs exist but are out of date', score: 1 },
      { label: 'Most processes are documented and shared', score: 2 },
      { label: 'Documented, versioned and regularly reviewed', score: 3 },
    ],
  },
  {
    id: 'process-2',
    dimension: 'process',
    question: 'How much of your work is already automated?',
    options: [
      { label: 'Everything is manual', score: 0 },
      { label: 'A handful of email or calendar rules', score: 1 },
      { label: 'Multiple tools wired together via Zapier/Make', score: 2 },
      { label: 'Custom integrations and APIs in production', score: 3 },
    ],
  },
  {
    id: 'process-3',
    dimension: 'process',
    question: 'Do you measure outcomes for your key workflows?',
    options: [
      { label: 'No metrics tracked', score: 0 },
      { label: 'Anecdotal — we just know how things are going', score: 1 },
      { label: 'Some KPIs in spreadsheets or reports', score: 2 },
      { label: 'Live dashboards with clear ownership', score: 3 },
    ],
  },

  // ----- AI Use Cases ------------------------------------------------------
  {
    id: 'usecase-1',
    dimension: 'usecase',
    question: 'Have you identified specific AI use cases for your business?',
    options: [
      { label: 'Not really — exploring the idea', score: 0 },
      { label: 'A vague wish-list', score: 1 },
      { label: 'A short-list with rough ROI estimates', score: 2 },
      { label: 'A prioritised roadmap with owners', score: 3 },
    ],
  },
  {
    id: 'usecase-2',
    dimension: 'usecase',
    question: 'What budget could you commit in the next 90 days?',
    options: [
      { label: 'Under A$500 — just learning', score: 0 },
      { label: 'A$500 – A$2,500 — first pilot', score: 1 },
      { label: 'A$2,500 – A$10,000 — strategy + build', score: 2 },
      { label: 'A$10,000+ — full agent rollout', score: 3 },
    ],
  },
  {
    id: 'usecase-3',
    dimension: 'usecase',
    question: 'How much time can the organisation commit each week?',
    options: [
      { label: 'Less than 1 hour', score: 0 },
      { label: '1–3 hours', score: 1 },
      { label: '4–8 hours, with leadership backing', score: 2 },
      { label: '8+ hours and a named project sponsor', score: 3 },
    ],
  },
];

// ----- Scoring -------------------------------------------------------------

type Tier = {
  level: 'Explore' | 'Adopt' | 'Scale';
  title: string;
  summary: string;
  badgeClass: string;
  iconClass: string;
};

function getTier(total: number): Tier {
  if (total <= 12) {
    return {
      level: 'Explore',
      title: 'You are at the awareness stage — and that is a great place to start.',
      summary:
        'Focus on building confidence and shared language. Pick one workflow, get the team comfortable with AI tools, and capture quick wins before scaling.',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      iconClass: 'text-sky-700',
    };
  }
  if (total <= 24) {
    return {
      level: 'Adopt',
      title: 'You are ready to pilot real use cases.',
      summary:
        'You have the basics. Lock in a first high-value use case, ship it end-to-end, and use the results to build internal momentum and skills.',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconClass: 'text-emerald-600',
    };
  }
  return {
    level: 'Scale',
    title: 'You are mature enough to invest in agents and custom workflows.',
    summary:
      'Your data, team and processes can support a serious build. Consolidate use cases into an agentic roadmap and invest in custom integrations.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    iconClass: 'text-amber-600',
  };
}

type DimensionScore = {
  dimension: Dimension;
  score: number;
  max: number;
};

function dimensionScores(answers: Record<string, number>): DimensionScore[] {
  return (Object.keys(DIMENSIONS) as Dimension[]).map((d) => {
    const qs = QUESTIONS.filter((q) => q.dimension === d);
    const score = qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const max = qs.length * 3; // 9
    return { dimension: d, score, max };
  });
}

function topRecommendations(answers: Record<string, number>) {
  const scores = dimensionScores(answers).slice().sort((a, b) => a.score - b.score);
  return scores.slice(0, 3).map((s) => ({
    dimension: s.dimension,
    score: s.score,
    max: s.max,
    ...DIMENSIONS[s.dimension].weakRecommendation,
  }));
}

const MAX_TOTAL = QUESTIONS.length * 3; // 36
const ESTIMATED_ANNUAL_SAVINGS_AUD = 50_000;

// ----- Component -----------------------------------------------------------

type Step = 'intro' | 'questions' | 'email' | 'results';

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Resources', url: '/resources' },
  { name: 'AI Readiness Assessment', url: '/resources/ai-readiness' },
];

export function AssessmentClient() {
  const [step, setStep] = useState<Step>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [pdfRequested, setPdfRequested] = useState(false);

  const total = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );
  const tier = useMemo(() => getTier(total), [total]);
  const dims = useMemo(() => dimensionScores(answers), [answers]);
  const recs = useMemo(() => topRecommendations(answers), [answers]);
  const roi = useMemo(
    () => Math.round((total / MAX_TOTAL) * ESTIMATED_ANNUAL_SAVINGS_AUD),
    [total],
  );

  const q = QUESTIONS[current];
  const selected = q ? answers[q.id] : undefined;
  const progress = (current / QUESTIONS.length) * 100;
  const allAnswered = QUESTIONS.every((qq) => answers[qq.id] !== undefined);

  function start() {
    setStep('questions');
    setCurrent(0);
  }

  function selectOption(score: number) {
    if (!q) return;
    const next = { ...answers, [q.id]: score };
    setAnswers(next);
    // Auto-advance with a small delay to let the visual selection register.
    window.setTimeout(() => {
      if (current < QUESTIONS.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setStep('email');
      }
    }, 220);
  }

  function goNext() {
    if (selected === undefined) return;
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setStep('email');
    }
  }

  function goBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await fetch('/api/quiz-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          score: total,
          level: tier.level,
          answers,
        }),
      });
      setStep('results');
    } catch {
      setSubmitError('Something went wrong sending your report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function skipEmail() {
    setStep('results');
  }

  async function requestPdf() {
    if (!email) return;
    setPdfRequested(true);
    try {
      await fetch('/api/quiz-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          score: total,
          level: tier.level,
          answers: { ...answers, _request: 'pdf' },
        }),
      });
    } catch {
      // Fail quietly — UX already shown
    }
  }

  // -------------------------- INTRO ---------------------------------------

  if (step === 'intro') {
    return (
      <main className="bg-[#F8FAFC] min-h-screen">
        <div className="mx-auto max-w-[760px] px-6 sm:px-10 pt-28 sm:pt-32 pb-20">
          <Breadcrumbs items={breadcrumbItems} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-sky-50 border border-sky-200 mb-5">
                <ClipboardCheck className="size-8 text-sky-700" strokeWidth={1.5} aria-hidden />
              </div>
              <span className="eyebrow">AI Readiness Assessment</span>
              <h1 className="font-heading mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
                See where your organisation really stands with AI.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Answer 12 short questions and receive a maturity score, an
                indicative ROI estimate, and three prioritised next steps —
                tailored to Australian SMEs.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
              <ul className="grid sm:grid-cols-3 gap-4 text-center">
                <li className="flex flex-col items-center gap-2">
                  <ClipboardCheck className="size-5 text-sky-700" aria-hidden />
                  <span className="text-sm font-medium text-slate-800">12 questions</span>
                  <span className="text-[12px] text-slate-500">4 dimensions</span>
                </li>
                <li className="flex flex-col items-center gap-2">
                  <Clock className="size-5 text-sky-700" aria-hidden />
                  <span className="text-sm font-medium text-slate-800">6 minutes</span>
                  <span className="text-[12px] text-slate-500">No prep needed</span>
                </li>
                <li className="flex flex-col items-center gap-2">
                  <Mail className="size-5 text-sky-700" aria-hidden />
                  <span className="text-sm font-medium text-slate-800">Email report</span>
                  <span className="text-[12px] text-slate-500">Optional PDF</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 overflow-x-auto">
              <h2 className="font-heading text-lg text-slate-900 text-center mb-4">How the assessment works</h2>
              <div className="flex justify-center">
                <FlowAssessment width={680} height={160} />
              </div>
            </div>

            <button
              type="button"
              onClick={start}
              className="cursor-pointer btn-cta w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-[15px] font-semibold"
            >
              Start the assessment <ArrowRight className="size-4" aria-hidden />
            </button>

            <p className="mt-4 text-center text-[12px] text-slate-500">
              Privacy-first. Your answers are only used to generate your report.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  // -------------------------- QUESTIONS -----------------------------------

  if (step === 'questions' && q) {
    const radioGroupId = `q-${q.id}-label`;
    const dim = DIMENSIONS[q.dimension];
    const DimIcon = dim.icon;
    return (
      <main className="bg-[#F8FAFC] min-h-screen">
        <div className="mx-auto max-w-[760px] px-6 sm:px-10 pt-28 sm:pt-32 pb-20">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-sky-700">
                <DimIcon className="size-4" aria-hidden /> {dim.label}
              </span>
              <span className="text-sm text-slate-500" aria-live="polite">
                {current + 1} of {QUESTIONS.length}
              </span>
            </div>
            <div
              className="w-full bg-slate-100 rounded-full h-2"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Assessment progress"
            >
              <div
                className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h1
                id={radioGroupId}
                className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
              >
                {q.question}
              </h1>
              {q.helper && (
                <p className="text-sm text-slate-500 mb-7">{q.helper}</p>
              )}

              <div
                className="space-y-3"
                role="radiogroup"
                aria-labelledby={radioGroupId}
              >
                {q.options.map((opt, i) => {
                  const checked = selected === opt.score;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      aria-label={opt.label}
                      onClick={() => selectOption(opt.score)}
                      className={`cursor-pointer w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                        checked
                          ? 'border-sky-600 bg-sky-50 ring-2 ring-sky-600/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`text-[15px] font-medium ${
                          checked ? 'text-sky-900' : 'text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={current === 0}
              className={`cursor-pointer inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                current === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeft className="size-4" aria-hidden /> Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={selected === undefined}
              className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                selected !== undefined
                  ? 'btn-cta'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {current === QUESTIONS.length - 1 ? 'Continue' : 'Next'}{' '}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </main>
    );
  }

  // -------------------------- EMAIL CAPTURE -------------------------------

  if (step === 'email') {
    return (
      <main className="bg-[#F8FAFC] min-h-screen">
        <div className="mx-auto max-w-[640px] px-6 sm:px-10 pt-28 sm:pt-32 pb-20">
          <Breadcrumbs items={breadcrumbItems} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-sm"
          >
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-emerald-50 border border-emerald-200 mb-5">
              <CheckCircle2 className="size-6 text-emerald-600" aria-hidden />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Your report is ready.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Drop your email to unlock the full breakdown. We will also send a
              copy you can share with your team. Or skip and view it now.
            </p>

            <form onSubmit={submitEmail} className="mt-6 flex flex-col sm:flex-row gap-3" noValidate>
              <label htmlFor="assessment-email" className="sr-only">
                Your work email address
              </label>
              <input
                id="assessment-email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!submitError}
                aria-describedby={submitError ? 'assessment-email-error' : undefined}
                inputMode="email"
                autoComplete="email"
                placeholder="you@yourcompany.com.au"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
              />
              <button
                type="submit"
                aria-busy={submitting}
                disabled={submitting}
                className="btn-cta px-6 py-3 rounded-full text-sm font-semibold cursor-pointer flex-shrink-0"
              >
                {submitting ? 'Sending…' : 'Show me my results'}
              </button>
            </form>
            <div
              role="alert"
              aria-live="polite"
              id="assessment-email-error"
              className="mt-3 text-[13px] text-rose-600 min-h-[1em]"
            >
              {submitError}
            </div>

            <button
              type="button"
              onClick={skipEmail}
              className="mt-6 text-[13px] font-medium text-slate-500 hover:text-slate-800 cursor-pointer underline-offset-2 hover:underline"
            >
              Skip — just show me the results
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  // -------------------------- RESULTS -------------------------------------

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <div className="mx-auto max-w-[860px] px-6 sm:px-10 pt-28 sm:pt-32 pb-24">
        <Breadcrumbs items={breadcrumbItems} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tier headline */}
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Your AI Readiness Tier</div>
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold ${tier.badgeClass}`}
            >
              <ClipboardCheck className={`size-4 ${tier.iconClass}`} aria-hidden />
              {tier.level}
            </span>
            <h1 className="font-heading mt-5 text-3xl sm:text-4xl font-bold text-slate-900">
              {tier.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              {tier.summary}
            </p>
          </div>

          {/* Score + ROI */}
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                Total score
              </div>
              <div className="font-heading text-4xl font-bold text-slate-900">
                {total}
                <span className="text-lg font-normal text-slate-400"> / {MAX_TOTAL}</span>
              </div>
              <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-sky-500 to-sky-700 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${(total / MAX_TOTAL) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-emerald-700 mb-2">
                <TrendingUp className="size-3.5" aria-hidden /> Indicative annual ROI
              </div>
              <div className="font-heading text-4xl font-bold text-slate-900">
                A${roi.toLocaleString()}
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
                Heuristic estimate of annual savings unlocked at your current
                readiness, based on Australian SME benchmarks.
              </p>
            </div>
          </div>

          {/* Dimension breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm mb-10">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-5">
              Score by dimension
            </h2>
            <div className="space-y-4">
              {dims.map((d) => {
                const meta = DIMENSIONS[d.dimension];
                const Icon = meta.icon;
                const pct = (d.score / d.max) * 100;
                return (
                  <div key={d.dimension}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-800">
                        <Icon className="size-4 text-sky-700" aria-hidden />
                        {meta.label}
                      </span>
                      <span className="text-[13px] font-semibold text-slate-700 tabular-nums">
                        {d.score} / {d.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-sky-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-10">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Your three prioritised next steps
            </h2>
            <p className="text-[15px] text-slate-600 mb-6">
              Ordered by impact, starting with your weakest dimension.
            </p>
            <ol className="space-y-4">
              {recs.map((r, i) => (
                <li
                  key={r.dimension}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row gap-5 sm:items-center"
                >
                  <div className="flex-shrink-0 size-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center font-heading font-bold text-sky-700">
                    {i + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading text-lg font-semibold text-slate-900">
                      {r.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-slate-600 mt-1">
                      {r.description}
                    </p>
                  </div>
                  <a
                    href={r.href}
                    rel="noopener noreferrer"
                    className="cursor-pointer btn-cta inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[13px] font-semibold no-underline flex-shrink-0"
                  >
                    {r.cta} <ArrowRight className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-10 text-white">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-white/10 mb-5">
              <Sparkles className="size-6 text-sky-400" aria-hidden />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              Ready to talk it through?
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-xl">
              Bring your assessment to a 1-on-1 AI Mentor session and walk
              away with a concrete 30-day plan.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://book.longcare.au?ref=assessment"
                rel="noopener noreferrer"
                className="cursor-pointer btn-cta inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold no-underline"
              >
                Book AI Mentor Session <ArrowRight className="size-4" aria-hidden />
              </a>
              {email && !pdfRequested && (
                <button
                  type="button"
                  onClick={requestPdf}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  <Mail className="size-4" aria-hidden /> Email me a PDF report
                </button>
              )}
              {pdfRequested && (
                <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-emerald-500/15 border border-emerald-400/30 text-emerald-200">
                  <CheckCircle2 className="size-4" aria-hidden /> PDF on its way
                </span>
              )}
              <Link
                href="/resources"
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 hover:text-white no-underline"
              >
                Back to Resources
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
