'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Gift, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '@/lib/analytics';

// 7-day TTL (in localStorage) so the popup respects a user's "no" across
// sessions. sessionStorage cleared every tab close, which made the popup
// re-fire on the same user repeatedly — annoying and against UX policy.
const SHOWN_KEY = 'exit-popup-shown-at';
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function shouldShow(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const ts = Number(window.localStorage.getItem(SHOWN_KEY) || 0);
    if (!ts) return true;
    return Date.now() - ts > TTL_MS;
  } catch {
    return true;
  }
}

function markShown() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SHOWN_KEY, String(Date.now()));
  } catch {
    // localStorage unavailable (private mode quota, etc.) — fail silent
  }
}

export function ExitIntentPopup() {
  // `armed` defers attaching any listeners (mouseleave/scroll) until the
  // browser is idle. The popup chunk itself is already lazy-loaded via
  // `LazyExitIntentPopup` (see src/lib/lazy-components.ts), but even after
  // hydration we don't need to compete with first-paint critical work —
  // arming on `requestIdleCallback` keeps INP/TBT clean. The user-visible
  // behaviour (exit-intent + scroll trigger + 7-day TTL) is unchanged.
  const [armed, setArmed] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  // Track when the popup first became visible so dismiss can report ttl_s.
  // Ref (not state) because we don't need to re-render when it changes.
  const shownAtRef = useRef<number | null>(null);

  const reveal = useCallback(() => {
    setShow(true);
    markShown();
    if (shownAtRef.current == null) {
      shownAtRef.current = Date.now();
      trackEvent('popup_show', { popup: 'exit-intent' });
    }
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !dismissed && shouldShow()) {
      reveal();
    }
  }, [dismissed, reveal]);

  // Arm on idle. `requestIdleCallback` is Chromium/Firefox; Safari falls back
  // to setTimeout. The 2s timeout cap ensures we still arm on a busy main
  // thread within a sensible window so users on slow devices aren't denied
  // the opt-in path entirely.
  useEffect(() => {
    let cancelled = false;
    const arm = () => {
      if (!cancelled) setArmed(true);
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(arm, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(arm, 1500);
    }
    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Wait until idle-armed before installing listeners — this is the only
    // gate; the rest of the trigger logic (mobile scroll-time vs desktop
    // mouse-leave + 7-day TTL via shouldShow()) is unchanged.
    if (!armed) return;

    // Don't show on mobile (use scroll-based trigger instead)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: show after 60% scroll + 30s on page
      let scrollTriggered = false;
      const startTime = Date.now();

      const onScroll = () => {
        if (scrollTriggered || dismissed || !shouldShow()) return;
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const timeOnPage = Date.now() - startTime;
        if (scrollPercent > 0.6 && timeOnPage > 30000) {
          scrollTriggered = true;
          reveal();
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    } else {
      // Desktop: exit intent
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [armed, handleMouseLeave, dismissed, reveal]);

  function handleDismiss() {
    const ttl_s = shownAtRef.current
      ? Math.max(0, Math.round((Date.now() - shownAtRef.current) / 1000))
      : undefined;
    trackEvent('popup_dismiss', { popup: 'exit-intent', ttl_s });
    setShow(false);
    setDismissed(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/guide-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'exit-intent-popup' }),
      });
      trackEvent('popup_convert', { popup: 'exit-intent' });
    } catch {}
    setSubmitted(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[50%] -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[9999] w-auto sm:w-[520px] max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-10"
                aria-label="Close"
              >
                <X className="size-5 text-slate-400" />
              </button>

              {/* Header gradient */}
              <div className="bg-gradient-to-br from-sky-600 to-sky-800 px-8 pt-8 pb-10 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/5 blur-2xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider mb-4">
                    <Gift className="size-3.5" /> Before you go
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold leading-tight">
                    Free: 5 AI Automations Guide
                  </h2>
                  <p className="mt-3 text-sky-100 text-[15px] leading-relaxed">
                    The exact playbook Australian SMEs use to save 60% on admin time. Yours free — no pitch attached.
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-7">
                {!submitted ? (
                  <>
                    <div className="space-y-3 mb-6">
                      {[
                        'Invoice reconciliation automation (Xero/MYOB)',
                        'AI customer support that resolves 80% of tickets',
                        'Automated weekly KPI reports',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <Sparkles className="size-4 text-sky-600 flex-shrink-0" />
                          <span className="text-[14px] text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                      />
                      <button
                        type="submit"
                        className="btn-cta w-full py-3.5 rounded-xl text-[14px] font-semibold cursor-pointer inline-flex items-center justify-center gap-2"
                      >
                        Send me the free guide <ArrowRight className="size-4" />
                      </button>
                      <p className="text-[11px] text-slate-400 text-center">
                        No spam. Unsubscribe anytime. 2,400+ SME operators already subscribed.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="size-12 text-emerald-500 mx-auto mb-3" />
                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">Check your inbox!</h3>
                    <p className="text-sm text-slate-600">Your guide is on its way to <strong>{email}</strong>.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-8 pb-6 text-center">
                <button
                  onClick={handleDismiss}
                  className="text-[12px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  No thanks, I&rsquo;ll figure it out myself
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
