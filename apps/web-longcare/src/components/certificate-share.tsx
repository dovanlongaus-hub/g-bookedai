'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Award, ExternalLink, Share2, ArrowRight, Download } from 'lucide-react';

const certificates = [
  {
    name: 'AI Foundations for Business',
    issuer: 'Longcare AU',
    level: 'Foundation',
    hours: 8,
    modules: 5,
    color: 'sky',
    skills: ['Prompt Engineering', 'AI Strategy', 'Tool Selection', 'ROI Analysis'],
  },
  {
    name: 'Prompt Engineering Mastery',
    issuer: 'Longcare AU',
    level: 'Intermediate',
    hours: 12,
    modules: 8,
    color: 'emerald',
    skills: ['Advanced Prompting', 'Chain-of-Thought', 'System Design', 'Evaluation'],
  },
  {
    name: 'AI Agent Builder',
    issuer: 'Longcare AU',
    level: 'Advanced',
    hours: 20,
    modules: 12,
    color: 'violet',
    skills: ['Agent Architecture', 'Tool Integration', 'Testing', 'Deployment', 'Monitoring'],
  },
];

export function CertificateShowcase() {
  const reduced = useReducedMotion();
  const fadeUp = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const stagger = reduced ? { visible: {} } : { visible: { transition: { staggerChildren: 0.06 } } };

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow">Certificates</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Earn credentials. Share your expertise.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
            Complete courses and earn verifiable certificates you can share on LinkedIn and add to your CV.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {certificates.map((cert) => (
            <motion.div key={cert.name} variants={fadeUp} className="trust-card overflow-hidden">
              {/* Certificate header */}
              <div className={`px-7 pt-7 pb-5 bg-gradient-to-br ${
                cert.color === 'sky' ? 'from-sky-50 to-sky-100/50' :
                cert.color === 'emerald' ? 'from-emerald-50 to-emerald-100/50' :
                'from-violet-50 to-violet-100/50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`size-11 rounded-xl flex items-center justify-center ${
                    cert.color === 'sky' ? 'bg-sky-100 border border-sky-200' :
                    cert.color === 'emerald' ? 'bg-emerald-100 border border-emerald-200' :
                    'bg-violet-100 border border-violet-200'
                  }`}>
                    <Award className={`size-5 ${
                      cert.color === 'sky' ? 'text-sky-700' :
                      cert.color === 'emerald' ? 'text-emerald-700' :
                      'text-violet-700'
                    }`} strokeWidth={1.5} />
                  </div>
                  <span className={`trust-badge text-[10px] ${
                    cert.color === 'sky' ? 'bg-sky-100 text-sky-700 border border-sky-200' :
                    cert.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                    'bg-violet-100 text-violet-700 border border-violet-200'
                  }`}>
                    {cert.level}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 leading-snug">{cert.name}</h3>
                <p className="text-[12px] text-slate-500 mt-1">Issued by {cert.issuer}</p>
              </div>

              {/* Certificate details */}
              <div className="px-7 py-5">
                <div className="flex items-center gap-4 text-[12px] text-slate-500 mb-4">
                  <span>{cert.hours} hours</span>
                  <span>{cert.modules} modules</span>
                </div>

                <div className="mb-5">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills covered</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share buttons */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button
                    className="cursor-pointer flex-grow inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-[12px] font-semibold transition-colors"
                    title="Share on LinkedIn"
                  >
                    <ExternalLink className="size-3.5" /> Add to LinkedIn
                  </button>
                  <button
                    className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[12px] font-medium text-slate-600 transition-colors"
                    title="Download certificate"
                  >
                    <Download className="size-3.5" />
                  </button>
                  <button
                    className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[12px] font-medium text-slate-600 transition-colors"
                    title="Share link"
                  >
                    <Share2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* LinkedIn integration highlight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="trust-card p-8 sm:p-10 bg-gradient-to-r from-[#0A66C2]/5 to-transparent border-[#0A66C2]/20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="size-14 rounded-2xl bg-[#0A66C2] flex items-center justify-center flex-shrink-0">
              <ExternalLink className="size-7 text-white" />
            </div>
            <div className="flex-grow">
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">LinkedIn-ready credentials</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Every certificate includes a unique verification URL and can be added directly to your LinkedIn
                profile — making your AI skills visible to recruiters, clients, and your professional network.
              </p>
            </div>
            <a
              href="/courses"
              className="cursor-pointer btn-cta inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold rounded-full no-underline flex-shrink-0"
            >
              Start earning <ArrowRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
