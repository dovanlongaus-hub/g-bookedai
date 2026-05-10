'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, Compass, RefreshCw, Sparkles } from 'lucide-react';
import {
  recommendSKUs,
  TIER_LABELS,
  CATEGORY_LABELS,
  type SKU,
  type SKUTier,
} from '@/data/sku-catalog';

type Goal = 'save-time' | 'build-product' | 'cut-costs' | 'train-team';
type BudgetBucket = 'under-100' | '100-500' | '500-2000' | '2000-plus';
type Timeline = 'this-week' | 'this-quarter' | 'this-year';

type Answers = {
  tier?: SKUTier;
  goal?: Goal;
  budget?: BudgetBucket;
  timeline?: Timeline;
};

const BUDGET_TO_MONTHLY: Record<BudgetBucket, number> = {
  'under-100': 99,
  '100-500': 499,
  '500-2000': 1999,
  '2000-plus': 100000, // effectively unlimited
};

const BUDGET_LABELS: Record<BudgetBucket, string> = {
  'under-100': 'Under A$100 / month',
  '100-500': 'A$100–500 / month',
  '500-2000': 'A$500–2,000 / month',
  '2000-plus': 'A$2,000+ / month',
};

const GOAL_LABELS: Record<Goal, string> = {
  'save-time': 'Save time on day-to-day work',
  'build-product': 'Build an AI product or feature',
  'cut-costs': 'Cut operating costs',
  'train-team': 'Train my team',
};

const TIMELINE_LABELS: Record<Timeline, string> = {
  'this-week': 'This week — start now',
  'this-quarter': 'Within this quarter',
  'this-year': 'Sometime this year',
};

const TIER_DESCRIPTIONS: Record<SKUTier, string> = {
  individual: 'A professional, learner, or solo operator.',
  startup: 'A founder or early-stage team building a product.',
  sme: 'A small or medium business owner or operator.',
  organisation: 'A larger organisation, multi-team rollout.',
};

export function GuideClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const totalSteps = 4;
  const isComplete = answers.tier && answers.goal && answers.budget && answers.timeline;

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const recommendations: SKU[] =
    isComplete && answers.tier && answers.goal && answers.budget
      ? recommendSKUs({
          tier: answers.tier,
          budgetMonthly: BUDGET_TO_MONTHLY[answers.budget],
          goal: answers.goal,
        })
      : [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const filled = step > i || (step === totalSteps && i === totalSteps - 1);
          const active = step === i;
          return (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition ${
                filled ? 'bg-sky-700' : active ? 'bg-sky-300' : 'bg-slate-200'
              }`}
              aria-label={`Step ${i + 1} of ${totalSteps}`}
            />
          );
        })}
      </div>

      {/* Question 1 — Tier */}
      {step === 0 && (
        <Question
          number={1}
          total={totalSteps}
          title="Who are you?"
          subtitle="We tailor the plan to your situation."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(TIER_LABELS) as SKUTier[]).map((t) => (
              <OptionCard
                key={t}
                label={TIER_LABELS[t]}
                description={TIER_DESCRIPTIONS[t]}
                selected={answers.tier === t}
                onClick={() => setAnswers((a) => ({ ...a, tier: t }))}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Question 2 — Goal */}
      {step === 1 && (
        <Question
          number={2}
          total={totalSteps}
          title="What is your top goal right now?"
          subtitle="Pick the one that matters most this quarter."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
              <OptionCard
                key={g}
                label={GOAL_LABELS[g]}
                selected={answers.goal === g}
                onClick={() => setAnswers((a) => ({ ...a, goal: g }))}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Question 3 — Budget */}
      {step === 2 && (
        <Question
          number={3}
          total={totalSteps}
          title="What is a realistic monthly budget?"
          subtitle="No commitment. We use this to filter recommendations to what you can actually afford."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(BUDGET_LABELS) as BudgetBucket[]).map((b) => (
              <OptionCard
                key={b}
                label={BUDGET_LABELS[b]}
                selected={answers.budget === b}
                onClick={() => setAnswers((a) => ({ ...a, budget: b }))}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Question 4 — Timeline */}
      {step === 3 && (
        <Question
          number={4}
          total={totalSteps}
          title="When do you want to start?"
          subtitle="Used to recommend pace, not to gate access."
        >
          <div className="grid gap-3">
            {(Object.keys(TIMELINE_LABELS) as Timeline[]).map((t) => (
              <OptionCard
                key={t}
                label={TIMELINE_LABELS[t]}
                selected={answers.timeline === t}
                onClick={() => setAnswers((a) => ({ ...a, timeline: t }))}
              />
            ))}
          </div>
        </Question>
      )}

      {/* Result */}
      {step === totalSteps && isComplete && (
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-2">
            <CheckCircle2 className="size-4" aria-hidden /> Your plan
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">
            Recommended for {answers.tier ? TIER_LABELS[answers.tier] : ''}
          </h2>
          <p className="mt-2 text-slate-600">
            Based on your answers — goal: <strong>{answers.goal ? GOAL_LABELS[answers.goal] : ''}</strong>,
            budget: <strong>{answers.budget ? BUDGET_LABELS[answers.budget] : ''}</strong>,
            timeline: <strong>{answers.timeline ? TIMELINE_LABELS[answers.timeline] : ''}</strong>.
          </p>

          {answers.timeline === 'this-week' && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
              <strong>Start this week:</strong> the fastest path is the free AI Readiness Assessment plus a
              starter session — both available today. Book the discovery call if you want a senior practitioner
              to design your week-one moves with you.
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                <p className="text-slate-700">
                  We could not auto-match within that budget. Talk to us — we will find a fit.
                </p>
              </div>
            ) : (
              recommendations.map((sku, i) => (
                <RecommendationCard key={sku.id} sku={sku} rank={i + 1} />
              ))
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/discovery-call"
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 no-underline transition"
            >
              Book a free discovery call <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/compare"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 no-underline transition"
            >
              <Compass className="size-4" aria-hidden /> See all services
            </Link>
            <button
              type="button"
              onClick={reset}
              className="text-slate-600 hover:text-slate-900 px-4 py-3 rounded-full font-medium inline-flex items-center gap-2 transition"
            >
              <RefreshCw className="size-4" aria-hidden /> Start over
            </button>
          </div>
        </div>
      )}

      {/* Footer nav */}
      {step < totalSteps && (
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full font-medium inline-flex items-center gap-2 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="hidden sm:inline text-sm text-slate-500 hover:text-sky-700 hover:underline"
            >
              Skip — see all options
            </Link>
            <button
              type="button"
              onClick={next}
              disabled={
                (step === 0 && !answers.tier) ||
                (step === 1 && !answers.goal) ||
                (step === 2 && !answers.budget) ||
                (step === 3 && !answers.timeline)
              }
              className="bg-sky-700 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-semibold inline-flex items-center gap-2 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {step === totalSteps - 1 ? 'See my plan' : 'Next'}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Question({
  number,
  total,
  title,
  subtitle,
  children,
}: {
  number: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
        Question {number} of {total}
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-5 rounded-xl border-2 transition ${
        selected
          ? 'border-sky-700 bg-sky-50/50 ring-1 ring-sky-700/20'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-900">{label}</div>
          {description && <div className="mt-1 text-sm text-slate-600">{description}</div>}
        </div>
        {selected && (
          <CheckCircle2 className="size-5 text-sky-700 flex-shrink-0 mt-0.5" aria-hidden />
        )}
      </div>
    </button>
  );
}

function RecommendationCard({ sku, rank }: { sku: SKU; rank: number }) {
  const isExternal = sku.cta.href.startsWith('http');
  const ctaClass =
    'bg-sky-700 hover:bg-sky-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 no-underline transition';

  return (
    <article className="relative flex flex-col bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="absolute -top-2 -left-2 size-8 rounded-full bg-sky-700 text-white flex items-center justify-center text-sm font-bold shadow-sm">
        {rank}
      </div>

      {sku.highlight && (
        <div className="self-start mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-700 text-white">
            <Sparkles className="size-3" aria-hidden /> {sku.badge || 'Top pick'}
          </span>
        </div>
      )}

      <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">
        {CATEGORY_LABELS[sku.category]}
      </div>
      <h3 className="font-heading text-lg font-semibold text-slate-900 leading-tight">{sku.name}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{sku.priceLabel}</span>
        <span className="text-xs text-slate-500">{sku.unit}</span>
      </div>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{sku.description}</p>

      <div className="mt-4 flex flex-col gap-2">
        {isExternal ? (
          <a href={sku.cta.href} className={ctaClass}>
            {sku.cta.label} <ArrowRight className="size-3.5" aria-hidden />
          </a>
        ) : (
          <Link href={sku.cta.href} className={ctaClass}>
            {sku.cta.label} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        )}
        <Link
          href={sku.url}
          className="text-xs text-slate-500 hover:text-sky-700 hover:underline text-center"
        >
          Learn more about {sku.name}
        </Link>
      </div>
    </article>
  );
}
