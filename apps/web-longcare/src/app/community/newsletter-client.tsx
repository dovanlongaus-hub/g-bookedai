'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function CommunityNewsletter({ source = 'community' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
    } catch {}
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 py-2">
        <CheckCircle2 className="size-5 text-emerald-400" />
        <span className="text-sm font-medium text-emerald-300">Subscribed! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-grow px-4 py-3 rounded-full border border-slate-600 bg-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button
        type="submit"
        aria-busy={loading}
        disabled={loading}
        className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-full text-sm font-semibold cursor-pointer flex-shrink-0 disabled:opacity-60"
      >
        {loading ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );
}
