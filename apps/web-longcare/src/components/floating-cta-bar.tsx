'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, X, Download } from 'lucide-react';

// Shared scroll threshold so the mobile and desktop bars don't dual-trigger
// at the md breakpoint (~768px). Both appear once the user has clearly engaged
// past the hero, but Tailwind responsive classes ensure only one renders for
// any given viewport.
const SCROLL_THRESHOLD = 600;

export function FloatingCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (dismissed || sessionStorage.getItem('cta-bar-dismissed')) return;

    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  function handleDismiss() {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem('cta-bar-dismissed', 'true');
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={reduced ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 300 }}
          // Mobile only: hidden at md (>=768px) and above so it cannot
          // co-exist with DesktopStickyCTA on tablets/desktops.
          className="fixed bottom-0 left-0 right-0 z-[90] block md:hidden"
        >
          <div className="bg-slate-900 border-t border-slate-700 px-4 py-3 safe-bottom">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white truncate">Free 30-min AI consult</p>
                <p className="text-[10px] text-slate-300">No pitch — just a clear next step.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="https://book.longcare.au"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold rounded-full no-underline"
                >
                  Book now <ArrowRight className="size-3" aria-hidden />
                </a>
                <button
                  onClick={handleDismiss}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Dismiss this bar"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Desktop sticky CTA — shows on tablet/desktop (md+) once user scrolls past hero.
 * Uses the same SCROLL_THRESHOLD as the mobile bar but is restricted to md+
 * via Tailwind, so mobile and desktop bars are mutually exclusive across all
 * breakpoints (no dual CTA conflict at the sm/md boundary). Sits *below* the
 * fixed nav (top-16 ≈ 64px, z-40 < nav's z-50) so it never covers the header.
 */
export function DesktopStickyCTA() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: -100, opacity: 0 }}
          transition={reduced ? { duration: 0 } : undefined}
          // Tablet+desktop only: hidden below md (<768px) so it cannot
          // co-exist with FloatingCTABar on phones. Positioned under the nav.
          className="fixed top-16 left-0 right-0 z-40 hidden md:block"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
            <div className="mx-auto max-w-[1120px] px-8 sm:px-10 py-2.5 flex items-center justify-between">
              <span className="text-[13px] text-white font-medium">
                Ready to automate? Start with a free 30-min consult — no pitch, just a plan.
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="/guide"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-300 hover:text-white transition-colors no-underline cursor-pointer"
                >
                  <Download className="size-3.5" aria-hidden /> Free guide
                </a>
                <a
                  href="https://book.longcare.au"
                  rel="noopener noreferrer"
                  className="btn-cta inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold rounded-full no-underline"
                >
                  Book free consult <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
