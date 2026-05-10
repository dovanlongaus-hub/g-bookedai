'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const TIERS = [
  { value: 'referrer', label: 'Referrer (15% on first 12 months)' },
  { value: 'integration', label: 'Integration Partner' },
  { value: 'channel', label: 'Channel Partner' },
] as const;

export function PartnerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [partnerType, setPartnerType] = useState<typeof TIERS[number]['value']>('referrer');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    const tierLabel = TIERS.find((t) => t.value === partnerType)?.label ?? partnerType;
    const fullNotes = `[Partner Application] type=${partnerType} (${tierLabel}); company=${company}; details=${notes}`;

    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, notes: fullNotes }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please email partners@longcare.au directly.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <CheckCircle2 className="size-8 text-emerald-600 mx-auto" />
        <h3 className="mt-3 text-lg font-semibold text-emerald-900">Application received</h3>
        <p className="mt-1 text-sm text-emerald-800">
          We&apos;ll be in touch within 2 Australian business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-900">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-900">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-900">Company</span>
          <input
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-900">Partner tier</span>
          <select
            value={partnerType}
            onChange={(e) => setPartnerType(e.target.value as typeof partnerType)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {TIERS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-900">Tell us about your customer base</span>
          <textarea
            required
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Industries you serve, average customer size, where you&apos;re based in Australia…"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-sky-700 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold disabled:opacity-60"
      >
        {loading ? 'Submitting…' : 'Submit application'}
      </button>
      <p className="text-xs text-slate-500">
        We&apos;ll never share your information. Read our <a href="/privacy" className="underline">privacy notice</a>.
      </p>
    </form>
  );
}
