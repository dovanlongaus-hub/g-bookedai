'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

type Props = {
  label: string;
  href: string;
  storageKey?: string;
  /** Milliseconds to wait before showing if user has not scrolled past the threshold. Defaults to 800ms. */
  showAfterMs?: number;
  /** Pixels of scroll that immediately reveal the CTA. Defaults to 600. */
  scrollThreshold?: number;
};

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const DEFAULT_KEY = 'sticky-cta-dismissed-at';

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function StickyBottomCTA({
  label,
  href,
  storageKey = DEFAULT_KEY,
  showAfterMs = 800,
  scrollThreshold = 600,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Check storage TTL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const ts = Number(raw);
        if (!Number.isNaN(ts) && Date.now() - ts < DEFAULT_TTL_MS) {
          // dismissed within TTL
          setDismissed(true);
          return;
        }
        // TTL expired — clear stale entry
        window.localStorage.removeItem(storageKey);
      }
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [storageKey]);

  // Reveal logic: 5s timer OR scroll past threshold OR initial wait (showAfterMs)
  useEffect(() => {
    if (dismissed) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setVisible(true);
    };

    const onScroll = () => {
      if (window.scrollY > scrollThreshold) reveal();
    };

    const fastTimer = window.setTimeout(reveal, showAfterMs);
    const fallbackTimer = window.setTimeout(reveal, 5000);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(fastTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [dismissed, scrollThreshold, showAfterMs]);

  function handleDismiss() {
    setDismissed(true);
    setVisible(false);
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // ignore
    }
  }

  if (dismissed || !visible) return null;

  const linkClass =
    'flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-sky-800';

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[85] block md:hidden"
      role="region"
      aria-label="Sticky call to action"
    >
      <div className="border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md safe-bottom">
        <div className="mx-auto flex max-w-md items-center gap-3">
          {isExternal(href) ? (
            <a href={href} rel="noopener noreferrer" className={linkClass}>
              {label}
              <ArrowRight className="size-4" />
            </a>
          ) : (
            <a href={href} className={linkClass}>
              {label}
              <ArrowRight className="size-4" />
            </a>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
