'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star, CheckCircle, Send } from 'lucide-react';

type PublishedReview = {
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  service: string;
  date: string;
};

// Published, permissioned customer reviews. Empty until we have real ones —
// we don't show placeholder or invented testimonials.
const existingReviews: PublishedReview[] = [];

function StarRating({ rating, interactive, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-0.5" role={interactive ? undefined : 'img'} aria-label={interactive ? undefined : `${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onChange?.(star) : undefined}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
          disabled={!interactive}
          aria-label={interactive ? `Rate ${star} ${star === 1 ? 'star' : 'stars'}` : undefined}
        >
          <Star
            className={`size-5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewSection() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', role: '', company: '', rating: 5, review: '', service: '', consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reduced = useReducedMotion();
  const fadeUp = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const stagger = reduced ? { visible: {} } : { visible: { transition: { staggerChildren: 0.06 } } };

  const hasReviews = existingReviews.length > 0;
  const avgRating = hasReviews
    ? (existingReviews.reduce((a, r) => a + r.rating, 0) / existingReviews.length).toFixed(1)
    : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <motion.div variants={fadeUp} className="max-w-2xl">
              <span className="eyebrow">Reviews</span>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                What clients say.
              </h2>
              {hasReviews ? (
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-3xl font-bold text-slate-900">{avgRating}</span>
                    <StarRating rating={Math.round(Number(avgRating))} />
                  </div>
                  <span className="text-sm text-slate-500">Based on {existingReviews.length} published {existingReviews.length === 1 ? 'review' : 'reviews'}</span>
                </div>
              ) : (
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  We&apos;re an early-stage practice — we publish customer reviews only with permission, and we don&apos;t invent them.
                  Worked with us? Your honest feedback helps other Australian SMEs decide.
                </p>
              )}
            </motion.div>

            <motion.button
              variants={fadeUp}
              onClick={() => setShowForm(!showForm)}
              aria-expanded={showForm}
              className="cursor-pointer btn-outline inline-flex items-center gap-2 px-5 py-3 text-[14px] font-semibold rounded-full"
            >
              <Send className="size-4" aria-hidden /> Leave a review
            </motion.button>
          </div>

          {/* Review form */}
          {showForm && !submitted && (
            <motion.div
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={reduced ? { duration: 0 } : undefined}
              className="mb-10 overflow-hidden"
            >
              <div className="trust-card p-8 sm:p-10 max-w-2xl">
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-5">Share your experience</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="review-name" className="block text-[13px] font-medium text-slate-700 mb-1.5">Name *</label>
                      <input
                        id="review-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="review-role" className="block text-[13px] font-medium text-slate-700 mb-1.5">Role</label>
                      <input
                        id="review-role"
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g., Operations Manager"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="review-company" className="block text-[13px] font-medium text-slate-700 mb-1.5">Company</label>
                      <input
                        id="review-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="review-service" className="block text-[13px] font-medium text-slate-700 mb-1.5">Service used</label>
                      <select
                        id="review-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      >
                        <option value="">Select...</option>
                        <option>AI Course</option>
                        <option>Mentor Session</option>
                        <option>Strategy Sprint</option>
                        <option>Implementation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[13px] font-medium text-slate-700 mb-1.5">Rating *</span>
                    <StarRating rating={formData.rating} interactive onChange={(r) => setFormData({ ...formData, rating: r })} />
                  </div>

                  <div>
                    <label htmlFor="review-text" className="block text-[13px] font-medium text-slate-700 mb-1.5">Your review *</label>
                    <textarea
                      id="review-text"
                      required
                      rows={4}
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      placeholder="Tell us about your experience..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 accent-sky-600"
                    />
                    <span className="text-[12px] text-slate-600">I consent to having my review published on the Longcare website with my first name and role.</span>
                  </label>

                  <button
                    type="submit"
                    aria-busy={submitting}
                    disabled={submitting}
                    className="btn-cta px-6 py-3 rounded-xl text-[14px] font-semibold cursor-pointer inline-flex items-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? 'Submitting…' : (
                      <>Submit review <Send className="size-4" aria-hidden /></>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {submitted && (
            <div className="mb-10 trust-card p-8 max-w-md bg-emerald-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-emerald-600" aria-hidden />
                <p className="text-sm font-semibold text-emerald-800">Thank you! Your review has been submitted for moderation.</p>
              </div>
            </div>
          )}

          {/* Published reviews grid */}
          {hasReviews && (
            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {existingReviews.map((review, i) => (
                <motion.article key={i} variants={fadeUp} className="trust-card p-7 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <StarRating rating={review.rating} />
                    <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200 text-[10px]">{review.service}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-[14px] leading-relaxed text-slate-700 italic">&ldquo;{review.review}&rdquo;</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                      {review.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-slate-900">{review.name}</div>
                      <div className="text-[11px] text-slate-500">{review.role}{review.company ? `, ${review.company}` : ''}</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
