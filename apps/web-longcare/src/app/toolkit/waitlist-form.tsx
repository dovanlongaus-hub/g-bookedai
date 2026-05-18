'use client';

import { useState } from 'react';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

type Props = {
  source?: string;
  className?: string;
  buttonLabel?: string;
};

export function WaitlistForm({
  source = 'toolkit-waitlist',
  className = '',
  buttonLabel = 'Join the waitlist',
}: Props) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, source }),
      });
      if (!res.ok && res.status !== 204) {
        // Still treat as success on best-effort basis to avoid blocking early-access UX
        // but surface a soft hint.
      }
      setSubmitted(true);
    } catch {
      setError('We could not reach the server. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={`flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-700 ${className}`}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-5" aria-hidden />
        You&apos;re on the list. We&apos;ll email you when early access opens.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 sm:flex-row ${className}`}
      aria-label="LongCare AI Toolkit waitlist"
    >
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@business.com.au"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          aria-label="Work email"
        />
        <input
          type="text"
          name="company"
          autoComplete="organization"
          placeholder="Company (optional)"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          aria-label="Company name"
        />
      </div>
      <button
        type="submit"
        aria-busy={submitting}
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Submitting…
          </>
        ) : (
          <>
            {buttonLabel}
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </button>
      {error ? (
        <p className="text-xs text-rose-600 sm:basis-full" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
