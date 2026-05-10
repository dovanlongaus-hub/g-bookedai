'use client';

// Inner component for `SocialProofToast`. Lives in a separate file so that
// `next/dynamic` in the parent (./social-proof-toast.tsx) can code-split it
// into its own chunk. Keeping it inline in the parent would force Webpack
// to bundle the heavy deps (motion/react, lucide-react) into the parent's
// chunk regardless of the feature-flag dead-code-elimination.
//
// Behaviour preserved from the previous monolithic version:
//   - First toast appears after 15s.
//   - Each toast visible for 5s, then cycles to the next after 25-45s
//     (jittered so it doesn't look mechanical).
//   - Dismiss persists for the page lifetime (no localStorage).

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock } from 'lucide-react';

// Hardcoded sample bookings — only loaded into the bundle when the feature
// flag is on (this whole module is dynamic-imported under the flag).
const recentBookings = [
  { name: 'Sarah C.', service: 'AI Mentor Session', location: 'Melbourne', time: '2 hours ago' },
  { name: 'James M.', service: 'Strategy Sprint', location: 'Brisbane', time: '4 hours ago' },
  { name: 'Priya S.', service: 'AI Mentor Session', location: 'Sydney', time: '5 hours ago' },
  { name: 'Tom W.', service: '5-Session Package', location: 'Perth', time: '8 hours ago' },
  { name: 'Lisa H.', service: 'AI Starter Session', location: 'Adelaide', time: '12 hours ago' },
  { name: 'Mike R.', service: 'AI Mentor Session', location: 'Gold Coast', time: '1 day ago' },
  { name: 'Emma K.', service: 'Strategy Sprint', location: 'Hobart', time: '1 day ago' },
  { name: 'David L.', service: 'Implementation Project', location: 'Canberra', time: '2 days ago' },
];

export function SocialProofToastInner() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // First toast appears after 15 seconds
    const initialDelay = setTimeout(() => {
      setCurrentIndex(0);
      setVisible(true);
    }, 15000);

    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (currentIndex < 0 || dismissed) return;

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    // Show next after 25-45 seconds (random interval for authenticity)
    const nextTimer = setTimeout(() => {
      const nextIdx = (currentIndex + 1) % recentBookings.length;
      setCurrentIndex(nextIdx);
      setVisible(true);
    }, 25000 + Math.random() * 20000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, dismissed]);

  if (dismissed) return null;

  const booking = currentIndex >= 0 ? recentBookings[currentIndex] : null;

  return (
    <AnimatePresence>
      {visible && booking && (
        <motion.div
          initial={{ opacity: 0, y: 80, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-6 z-[100] max-w-[340px] hidden sm:block"
        >
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 pr-10 relative">
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer text-xs"
              aria-label="Dismiss notifications"
            >
              &times;
            </button>

            <div className="flex items-start gap-3">
              <div className="size-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0">
                <Calendar className="size-4 text-sky-700" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] text-slate-900 font-medium leading-snug">
                  <span className="font-semibold">{booking.name}</span> just booked a{' '}
                  <span className="text-sky-700 font-semibold">{booking.service}</span>
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="size-3" /> {booking.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="size-3" /> {booking.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified badge */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
              <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-medium">Verified by Longcare</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
