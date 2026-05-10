'use client';

import { useState } from 'react';
import { CheckCircle, Download, BookOpen, Zap, Target, BarChart3, ArrowRight } from 'lucide-react';

const highlights = [
  { icon: Zap, text: 'Invoice reconciliation — auto-match POs in Xero/MYOB' },
  { icon: Target, text: 'Customer support — AI agent that resolves 80% of Tier-1 tickets' },
  { icon: BarChart3, text: 'Report generation — weekly KPIs compiled and emailed automatically' },
  { icon: BookOpen, text: 'Data entry — extract info from PDFs, receipts, and forms' },
  { icon: Download, text: 'Meeting notes — AI-generated summaries with action items' },
];

export default function GuidePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/guide-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'guide-page' }),
      });
      if (!res.ok) throw new Error('submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError('We could not send the guide. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10 py-16 sm:py-24">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left — content */}
          <div>
            <span className="eyebrow">Free guide</span>
            <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 leading-tight">
              5 AI Automations Every Australian SME Should Ship First
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              A practical, no-code guide for business owners and operators. Each automation includes
              estimated setup time, monthly cost, expected ROI, and the exact tools you need.
            </p>

            <div className="mt-10">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-5">What&rsquo;s inside:</h2>
              <ul className="space-y-4">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="size-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <h.icon className="size-4 text-sky-700" strokeWidth={1.5} />
                    </div>
                    <span className="text-[15px] leading-relaxed text-slate-700">{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <span>PDF format</span>
              <span>12 pages</span>
              <span>Australian-focused</span>
              <span>No fluff</span>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:sticky lg:top-24">
            {!submitted ? (
              <div className="trust-card p-8 sm:p-10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-sky-50 border border-sky-200 mb-4">
                    <Download className="size-6 text-sky-700" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">Download the free guide</h3>
                  <p className="text-sm text-slate-500 mt-2">Enter your email and we&rsquo;ll send it instantly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <label htmlFor="guide-email" className="sr-only">Your email address</label>
                  <input
                    id="guide-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!submitError}
                    aria-describedby={submitError ? 'guide-form-error' : undefined}
                    inputMode="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                  />
                  <button
                    type="submit"
                    aria-busy={submitting}
                    disabled={submitting}
                    className="btn-cta w-full py-3.5 rounded-xl text-[14px] font-semibold cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Send me the guide'}
                  </button>
                  <div role="alert" aria-live="polite" id="guide-form-error" className="text-[12px] text-rose-600 text-center min-h-[1em]">
                    {submitError}
                  </div>
                  <p className="text-[11px] text-slate-400 text-center">
                    No spam. Unsubscribe anytime. We may also send you our fortnightly AI insights newsletter.
                  </p>
                </form>
              </div>
            ) : (
              <div className="trust-card p-8 sm:p-10 text-center bg-emerald-50 border-emerald-200">
                <CheckCircle className="size-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-emerald-900 mb-2">Check your inbox!</h3>
                <p className="text-sm text-emerald-700 mb-6">
                  The guide is on its way to <strong>{email}</strong>.
                </p>
                <div className="space-y-3">
                  <a href="/quiz" className="cursor-pointer block btn-cta py-3 rounded-xl text-[14px] font-semibold no-underline text-center">
                    Take the AI Readiness Quiz <ArrowRight className="size-4 inline ml-1" />
                  </a>
                  <a href="/" className="cursor-pointer block btn-outline py-3 rounded-xl text-[14px] font-semibold no-underline text-center">
                    Back to homepage
                  </a>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-[13px] text-slate-500">Already have the guide?</p>
              <a href="/quiz" className="text-[13px] font-semibold text-sky-700 hover:text-sky-800 no-underline cursor-pointer">
                Take the AI Readiness Quiz instead &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
