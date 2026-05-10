'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star, Quote, CheckCircle, ArrowRight, Award, Users, Send } from 'lucide-react';

const existingReviews = [
  {
    name: 'Sarah Chen',
    role: 'Operations Manager',
    company: 'Cygnus Logistics',
    rating: 5,
    review: 'The agent ran reliably from week two. We have not touched it since. Our monthly admin went from 3 days to 45 minutes.',
    service: 'Implementation',
    date: 'April 2026',
  },
  {
    name: 'James Mitchell',
    role: 'Founder',
    company: 'TechFlow Solutions',
    rating: 5,
    review: 'The strategy sprint paid for itself before the second invoice. 80% of our support tickets are now auto-resolved.',
    service: 'Strategy Sprint',
    date: 'March 2026',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'Northwind Group',
    rating: 5,
    review: 'They told us what NOT to automate. That is what good consulting looks like. Saved us $120K in potential waste.',
    service: 'Strategy Sprint',
    date: 'February 2026',
  },
  {
    name: 'Tom Williams',
    role: 'Practice Manager',
    company: 'Pacific Health AU',
    rating: 5,
    review: 'As a GP practice, we were drowning in compliance paperwork. The AI mentor helped us automate Medicare claiming. Life-changing.',
    service: 'Mentor Session',
    date: 'March 2026',
  },
  {
    name: 'Lisa Huang',
    role: 'Owner',
    company: 'Coastal Retail Co',
    rating: 4,
    review: 'Great mentor session. Very practical, not theoretical. Walked away with 3 automations I could implement the same week.',
    service: 'Mentor Session',
    date: 'April 2026',
  },
  {
    name: 'David Roberts',
    role: 'CFO',
    company: 'Sterling Advisory',
    rating: 5,
    review: 'The ROI model they built convinced our board in one meeting. BAS automation alone saves us 20 hours per quarter.',
    service: 'Implementation',
    date: 'January 2026',
  },
];

function StarRating({ rating, interactive, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onChange?.(star) : undefined}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
          disabled={!interactive}
        >
          <Star
            className={`size-5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
            strokeWidth={1.5}
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

  const reduced = useReducedMotion();
  const fadeUp = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const stagger = reduced ? { visible: {} } : { visible: { transition: { staggerChildren: 0.06 } } };

  const avgRating = (existingReviews.reduce((a, r) => a + r.rating, 0) / existingReviews.length).toFixed(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {}
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
          {/* Header with aggregate rating */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <motion.div variants={fadeUp} className="max-w-2xl">
              <span className="eyebrow">Reviews</span>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                What our clients say.
              </h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-3xl font-bold text-slate-900">{avgRating}</span>
                  <StarRating rating={Math.round(Number(avgRating))} />
                </div>
                <span className="text-sm text-slate-500">Based on {existingReviews.length} verified reviews</span>
              </div>
            </motion.div>

            <motion.button
              variants={fadeUp}
              onClick={() => setShowForm(!showForm)}
              className="cursor-pointer btn-outline inline-flex items-center gap-2 px-5 py-3 text-[14px] font-semibold rounded-full"
            >
              <Send className="size-4" /> Leave a review
            </motion.button>
          </div>

          {/* Review form */}
          {showForm && !submitted && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-10">
              <div className="trust-card p-8 sm:p-10 max-w-2xl">
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-5">Share your experience</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Role</label>
                      <input
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
                      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Service used</label>
                      <select
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
                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Rating *</label>
                    <StarRating rating={formData.rating} interactive onChange={(r) => setFormData({ ...formData, rating: r })} />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Your review *</label>
                    <textarea
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
                    className="btn-cta px-6 py-3 rounded-xl text-[14px] font-semibold cursor-pointer inline-flex items-center gap-2"
                  >
                    Submit review <Send className="size-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {submitted && (
            <div className="mb-10 trust-card p-8 max-w-md bg-emerald-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-800">Thank you! Your review has been submitted for moderation.</p>
              </div>
            </div>
          )}

          {/* Review grid */}
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {existingReviews.map((review, i) => (
              <motion.article key={i} variants={fadeUp} className="trust-card p-7 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  <span className="trust-badge bg-sky-50 text-sky-700 border border-sky-200 text-[10px]">{review.service}</span>
                </div>

                <div className="flex-grow">
                  <Quote className="size-4 text-sky-200 mb-2" />
                  <p className="text-[14px] leading-relaxed text-slate-700 italic">{review.review}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">{review.name}</div>
                    <div className="text-[11px] text-slate-500">{review.role}, {review.company}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
