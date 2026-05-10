'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Gift, ArrowRight, CheckCircle, Copy, Share2,
  Users, DollarSign, Sparkles, Heart, Mail
} from 'lucide-react';

const howItWorks = [
  { step: '1', icon: Share2, title: 'Share your link', desc: 'Send your unique referral link or code to colleagues and friends.' },
  { step: '2', icon: Users, title: 'They book a session', desc: 'Your referral signs up and books any paid service (course, mentor, sprint).' },
  { step: '3', icon: Gift, title: 'You both get $25', desc: 'Once they complete their first booking, you both receive $25 credit.' },
];

const tiers = [
  { referrals: '1-2', reward: '$25 credit per referral', total: 'Up to $50' },
  { referrals: '3-5', reward: '$35 credit per referral', total: 'Up to $175' },
  { referrals: '6-10', reward: '$50 credit per referral', total: 'Up to $500' },
  { referrals: '10+', reward: '$50 + free mentor session', total: 'Unlimited' },
];

export default function ReferralPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      setReferralCode(data.referralCode || 'LC-XXXXXX');
      setSubmitted(true);
    } catch {
      setReferralCode('LC-XXXXXX');
      setSubmitError('We had trouble generating your code, but here is a fallback. Please email us if it does not work.');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://longcare.au?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10 py-16 sm:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-amber-50 border border-amber-200 mb-4">
              <Gift className="size-8 text-amber-600" />
            </div>
            <span className="eyebrow block mb-3">Referral program</span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-bold text-slate-900 leading-tight">
              Give $25, get $25.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Know someone who could benefit from AI training? Refer them to Longcare and you&rsquo;ll both
              get $25 credit toward any service. No limits.
            </p>
          </div>

          {/* How it works */}
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {howItWorks.map((step) => (
              <div key={step.step} className="trust-card p-7 text-center">
                <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-sky-50 border border-sky-200 mb-4">
                  <step.icon className="size-5 text-sky-700" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
            {/* Left — get your code */}
            <div>
              {!submitted ? (
                <div className="trust-card p-8 sm:p-10">
                  <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Get your referral code</h2>
                  <p className="text-sm text-slate-600 mb-6">Enter your details and we&rsquo;ll generate your unique code instantly.</p>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-describedby="referral-form-error">
                    <div>
                      <label htmlFor="referral-name" className="block text-[13px] font-medium text-slate-700 mb-1.5">Your name</label>
                      <input
                        id="referral-name"
                        name="name"
                        type="text"
                        required
                        aria-required="true"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Sarah Chen"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="referral-email" className="block text-[13px] font-medium text-slate-700 mb-1.5">Your email</label>
                      <input
                        id="referral-email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={!!submitError}
                        aria-describedby={submitError ? 'referral-form-error' : undefined}
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      aria-busy={submitting}
                      disabled={submitting}
                      className="btn-cta w-full py-3.5 rounded-xl text-[14px] font-semibold cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? 'Generating…' : 'Generate my referral code'} <ArrowRight className="size-4" aria-hidden />
                    </button>
                    <div role="alert" aria-live="polite" id="referral-form-error" className="text-[12px] text-rose-600 min-h-[1em]">
                      {submitError}
                    </div>
                  </form>
                </div>
              ) : (
                <div className="trust-card p-8 sm:p-10">
                  <div className="text-center mb-6">
                    <CheckCircle className="size-12 text-emerald-500 mx-auto mb-3" />
                    <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">Your referral code is ready!</h2>
                    <p className="text-sm text-slate-600">Share it with your network to start earning credits.</p>
                  </div>

                  {/* Code display */}
                  <div className="bg-slate-900 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">Your code</div>
                      <div className="font-heading text-3xl font-bold text-white tracking-wider mb-4">{referralCode}</div>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={copyCode}
                          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[13px] font-medium text-white transition-colors"
                        >
                          <Copy className="size-3.5" /> {copied ? 'Copied!' : 'Copy code'}
                        </button>
                        <button
                          onClick={copyLink}
                          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-[13px] font-medium text-white transition-colors"
                        >
                          <Share2 className="size-3.5" /> Copy link
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Share options */}
                  <div className="space-y-3">
                    <a
                      href={`mailto:?subject=AI training that pays for itself&body=Hey! I've been using Longcare for AI training and it's been great. Use my referral code ${referralCode} to get $25 off your first session. https://longcare.au?ref=${referralCode}`}
                      className="cursor-pointer flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-all no-underline text-slate-700"
                    >
                      <Mail className="size-5 text-slate-500" />
                      <span className="text-[14px] font-medium">Share via email</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right — reward tiers */}
            <div className="space-y-6">
              <div className="trust-card p-8">
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-500" /> Reward tiers
                </h3>
                <div className="space-y-3">
                  {tiers.map((tier, i) => (
                    <div key={tier.referrals} className={`p-4 rounded-lg border ${i === tiers.length - 1 ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[14px] font-semibold text-slate-900">{tier.referrals} referrals</div>
                          <div className="text-[12px] text-slate-500">{tier.reward}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-[14px] font-bold ${i === tiers.length - 1 ? 'text-amber-700' : 'text-sky-700'}`}>{tier.total}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="trust-card p-6 bg-slate-50 border-slate-200">
                <h4 className="font-heading text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Heart className="size-4 text-rose-500" /> Why refer?
                </h4>
                <ul className="space-y-2 text-[13px] text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle className="size-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> Credits never expire</li>
                  <li className="flex items-start gap-2"><CheckCircle className="size-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> Works for any service ($29 course to $15K implementation)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="size-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> No limit on referrals</li>
                  <li className="flex items-start gap-2"><CheckCircle className="size-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> Your referral also gets $25 — everyone wins</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
