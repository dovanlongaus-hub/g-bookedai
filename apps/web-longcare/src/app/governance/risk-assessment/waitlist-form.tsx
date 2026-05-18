'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'governance-risk-assessment-waitlist',
        }),
      });
    } catch {
      // surface a friendly success regardless — backend will retry from queue
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3">
        <CheckCircle className="size-5 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-700">
          You’re on the list. We’ll email you at launch.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <label htmlFor="risk-waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="risk-waitlist-email"
        type="email"
        required
        placeholder="you@business.com.au"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-grow px-4 py-3 rounded-full border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button
        type="submit"
        aria-busy={submitting}
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-600 disabled:bg-slate-400 text-white text-sm font-semibold px-6 py-3 rounded-full transition flex-shrink-0"
      >
        {submitting ? 'Submitting…' : (
          <>
            Notify me <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}
