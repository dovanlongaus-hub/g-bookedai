'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  GraduationCap,
  Cpu,
  Target,
  BookOpen,
  ArrowRight,
  Check,
  Minus,
  TrendingUp,
  AlertTriangle,
  Compass,
  Quote,
  Star,
  ShieldCheck,
  Award,
  FileCheck,
  Workflow,
  BarChart3,
  Sparkles,
  Zap,
  Users,
  PlayCircle,
  HeartPulse,
  Rocket,
  LineChart,
  Search,
  Infinity as InfinityIcon,
  User,
  Building2,
  Briefcase,
  Cloud,
  ShieldHalf,
  Bot,
  Network,
  Wrench,
  Globe,
  Lightbulb,
  Handshake,
  MapPin,
} from 'lucide-react';
import { ROICalculator } from '@/components/roi-calculator';
import { MembershipSection } from '@/components/membership-section';
import { ReviewSection } from '@/components/review-section';
import { ProgressTrackerPreview } from '@/components/progress-tracker';
import { CertificateShowcase } from '@/components/certificate-share';

/* ── Animation (respects prefers-reduced-motion) ────────── */

function useMotionProps() {
  const reduced = useReducedMotion();
  const fadeUp = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
      };
  const stagger = reduced
    ? { visible: {} }
    : { visible: { transition: { staggerChildren: 0.06 } } };
  return { fadeUp, stagger };
}

/* ── Data ────────────────────────────────────────────────── */

const stats = [
  { value: '150+', label: 'SMEs & operators trained', icon: Users },
  { value: '4.9', suffix: '/5', label: 'Avg mentor rating (47 reviews)', icon: Star },
  { value: '60%', label: 'Average time saved on ops', icon: Zap },
  { value: '$2.4M', label: 'Revenue impact delivered', icon: TrendingUp },
];

const painPoints = [
  { icon: AlertTriangle, title: 'Tools change weekly.', desc: 'New models, new agents, new prices. It is exhausting to keep up — and easy to spend money on the wrong thing.' },
  { icon: Compass, title: 'Generic courses miss the brief.', desc: 'Most training is American, generic, and ignores how Australian SMEs actually run their compliance and books.' },
  { icon: TrendingUp, title: 'Implementation never finishes.', desc: 'Pilots stall. Vendors disappear. Teams get tired. You need someone who stays until the system pays for itself.' },
];

const caseStudies = [
  {
    client: 'Cygnus Logistics', sector: 'Logistics · Melbourne', initials: 'CL',
    challenge: 'Three days of monthly admin: invoice reconciliation, driver logs, compliance reporting — all manual.',
    solution: 'AI agent auto-reconciles invoices against POs, extracts driver log data, pre-fills compliance forms.',
    results: [{ metric: '3 days → 45 min', label: 'Monthly admin' }, { metric: '98.6%', label: 'Accuracy' }, { metric: '12 weeks', label: 'Full payback' }],
    quote: 'The agent ran reliably from week two. We have not touched it since.',
    person: 'Sarah Chen, Operations Manager',
  },
  {
    client: 'TechFlow Solutions', sector: 'SaaS · Brisbane', initials: 'TF',
    challenge: 'Growing support tickets. CEO handling Tier-1 queries personally. No capacity to hire.',
    solution: 'AI customer service agent integrated with knowledge base. Escalation rules for complex issues.',
    results: [{ metric: '80%', label: 'Auto-resolved' }, { metric: '$8,400/mo', label: 'Cost saved' }, { metric: '< 2 min', label: 'Response time' }],
    quote: 'The strategy sprint paid for itself before the second invoice.',
    person: 'James Mitchell, Founder',
  },
  {
    client: 'Northwind Group', sector: 'Agency · Sydney', initials: 'NW',
    challenge: 'Considered automating campaign analytics. Scope unclear. High risk of over-engineering.',
    solution: 'Strategy audit revealed two high-ROI automations and one the team should NOT pursue — saving $120K+.',
    results: [{ metric: '2 shipped', label: 'Automations' }, { metric: '$120K+', label: 'Waste avoided' }, { metric: '5 weeks', label: 'Audit → live' }],
    quote: 'They told us what NOT to automate. That is what good consulting looks like.',
    person: 'Priya Sharma, Marketing Director',
  },
];

const pricingTiers = [
  {
    name: 'AI Starter', icon: BookOpen, price: 'A$29', unit: '30-min consult',
    desc: 'Single session. Get oriented, identify your highest-leverage AI use case.',
    features: [
      { text: '30-minute video consult', ok: true },
      { text: 'Personalised action plan', ok: true },
      { text: 'Recording + AI notes', ok: true },
      { text: 'Multi-session continuity', ok: false },
      { text: 'Workflow audit', ok: false },
      { text: 'Integration with your stack', ok: false },
      { text: 'Long-term partnership', ok: false },
    ],
    cta: 'Book starter', href: 'https://book.longcare.au?service=ai-starter', highlight: false,
  },
  {
    name: 'AI Mentor 1:1', icon: GraduationCap, price: 'A$99', unit: 'per hour',
    desc: 'Bring a real problem. Leave with a working prototype and AI notes.',
    features: [
      { text: 'Everything in Starter', ok: true },
      { text: '1-on-1 senior practitioner', ok: true },
      { text: 'Session recording + AI notes', ok: true },
      { text: 'Multi-session continuity', ok: false },
      { text: 'Workflow audit', ok: false },
      { text: 'Integration with your stack', ok: false },
      { text: 'Long-term partnership', ok: false },
    ],
    cta: 'Book a session', href: 'https://book.longcare.au?service=mentor-1h', highlight: false,
  },
  {
    name: '5-Session Pack', icon: Target, price: 'A$450', unit: '5 sessions · save A$45',
    desc: 'A 5-week journey to ship your first AI workflow. Most popular for SME operators.',
    features: [
      { text: 'Everything in Mentor', ok: true },
      { text: '5 × 1-hour sessions', ok: true },
      { text: 'Custom workflow audit', ok: true },
      { text: 'ROI model for your accountant', ok: true },
      { text: 'Stack integration', ok: true },
      { text: 'Long-term partnership', ok: false },
    ],
    cta: 'Start the pack', href: 'https://book.longcare.au?service=package-5', highlight: true,
  },
  {
    name: '10-Session Pack', icon: Rocket, price: 'A$850', unit: '10 sessions · save A$140',
    desc: 'Quarterly programme. Ship multiple workflows + ongoing optimisation.',
    features: [
      { text: 'Everything in 5-Session', ok: true },
      { text: '10 × 1-hour sessions', ok: true },
      { text: 'Multi-workflow build', ok: true },
      { text: 'Quarterly review + reroute', ok: true },
      { text: 'Priority booking', ok: true },
      { text: 'Long-term partnership', ok: true },
    ],
    cta: 'Start 10-session', href: 'https://book.longcare.au?service=package-10', highlight: false,
  },
  {
    name: 'Custom Enterprise', icon: Cpu, price: 'A$1.5K–3K+', unit: 'per engagement',
    desc: 'Multi-year AI partnership. Full agent deployment, team training, ongoing support.',
    features: [
      { text: 'Everything in 10-Session', ok: true },
      { text: 'End-to-end agent build', ok: true },
      { text: 'Team training + handover', ok: true },
      { text: '90-day post-launch support', ok: true },
      { text: 'Quarterly optimisation reviews', ok: true },
      { text: 'Multi-year roadmap', ok: true },
    ],
    cta: 'Scope a project', href: 'https://book.longcare.au?service=agentic-implementation', highlight: false,
  },
];

const integrations = [
  { name: 'Google Workspace', desc: 'Docs, Sheets, Calendar, Meet' },
  { name: 'Microsoft 365', desc: 'Outlook, Teams, SharePoint' },
  { name: 'Xero', desc: 'Invoicing, BAS, GST reports' },
  { name: 'MYOB', desc: 'Payroll, accounts, compliance' },
  { name: 'HubSpot', desc: 'CRM, email, deal pipeline' },
  { name: 'Stripe', desc: 'Payments, subscriptions' },
  { name: 'Slack', desc: 'Team comms, notifications' },
  { name: 'Zapier / Make', desc: 'Workflow orchestration' },
  { name: 'Shopify', desc: 'E-commerce, orders, inventory' },
  { name: 'Notion', desc: 'Docs, wikis, project mgmt' },
  { name: 'Airtable', desc: 'Databases, views, automations' },
  { name: 'Custom APIs', desc: 'REST / GraphQL integration' },
];

const team = [
  {
    name: 'Long Do', role: 'Lead AI Architect', initials: 'LD',
    credentials: ['Google Cloud Certified', '10+ yrs full-stack', 'Ex-enterprise consulting'],
    focus: 'Agentic implementation, system architecture, Google Cloud',
  },
  {
    name: 'AI Mentor Network', role: 'Senior Practitioners', initials: 'AI',
    credentials: ['Industry-vetted', 'AU-based', 'NDA on every engagement'],
    focus: 'Prompt engineering, workflow automation, strategy',
  },
];

const faqs = [
  { q: 'What does a Mentor Session look like?', a: 'A live, one-on-one video call with a senior AI practitioner. Bring a specific problem — a workflow, a model decision, a prompt — and leave with a working prototype, a recording, and AI-generated notes.' },
  { q: 'How is Implementation different from hiring a contractor?', a: 'We include a workflow audit, an ROI model for your accountant, integration with your stack (Xero, HubSpot, Google Workspace, Microsoft 365), team training, and 30 days of post-launch support. We measure in production before we close.' },
  { q: 'Do I need technical experience?', a: 'No. Our mentors have taught operations managers, lawyers, GPs, and tradespeople. Bring the business problem; we bring the technical translation.' },
  { q: 'How are payments handled?', a: 'Stripe for cards, or Australian bank transfer with a tax invoice. Every quote is GST-inclusive. Strategy and Implementation: 50% on signing, 50% on delivery.' },
  { q: 'What integrations do you support?', a: 'Google Workspace, Microsoft 365, Xero, MYOB, HubSpot, Stripe, Slack, Zapier, Make, Shopify, Notion, Airtable, and any system with a REST or GraphQL API.' },
  { q: 'Can I cancel or reschedule?', a: 'Free cancellation or rescheduling up to 24 hours before any session. Inside 24 hours, a small rebooking fee applies. Strategy sprints can be paused once at no cost.' },
];

/* ── Sections ────────────────────────────────────────────── */

function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
      {/* SEO + a11y: structured text version of banner content */}
      <div className="sr-only">
        <h1 id="hero-heading">
          AI Transformation for Next Generation of Businesses — Learn AI. Build Faster. Grow Smarter.
        </h1>
        <p>
          LongCare.au is an AI training, mentorship, and implementation ecosystem helping
          individuals, startups, SMEs, and organisations across Australia accelerate growth
          through practical AI education, consulting, implementation, automation, and scalable
          innovation systems. Built on Google Cloud. Long Term Care. AI Powered. Future Ready.
        </p>
        <ul>
          <li>For Individuals — start with the A$29 AI Starter consult</li>
          <li>For SMEs — readiness assessment and 5/10-Session packs</li>
          <li>For Organisations — multi-year custom AI transformation</li>
        </ul>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] border border-slate-200">
          <Image
            src="/longcare.au_banner_10%20may_latest.png"
            alt="LongCare.au — AI Transformation for the Next Generation of Businesses. Learn AI. Build Faster. Grow Smarter. Helping individuals, SMEs, and organisations across Australia with practical AI education, consulting, implementation, and scalable automation. Built on Google Cloud, proudly Australian."
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="w-full h-auto block"
          />

          {/* Logo overlay — top-left LongCare.au lockup → home */}
          <a
            href="/"
            aria-label="LongCare.au — go to home"
            className="absolute hover:bg-white/10 rounded-md transition-colors"
            style={{ left: '3%', top: '4%', width: '24%', height: '12%' }}
          />

          {/* Audience pill overlays — top of banner (INDIVIDUALS · SMEs · ORGANISATIONS) */}
          <a
            href="#who-we-serve"
            aria-label="For Individuals"
            className="absolute hover:bg-emerald-100/30 rounded-md transition-colors"
            style={{ left: '4%', top: '17%', width: '13%', height: '4%' }}
          />
          <a
            href="#who-we-serve"
            aria-label="For SMEs"
            className="absolute hover:bg-emerald-100/30 rounded-md transition-colors"
            style={{ left: '17.5%', top: '17%', width: '7%', height: '4%' }}
          />
          <a
            href="#who-we-serve"
            aria-label="For Organisations"
            className="absolute hover:bg-emerald-100/30 rounded-md transition-colors"
            style={{ left: '25%', top: '17%', width: '14%', height: '4%' }}
          />

          {/* Primary CTA overlay — Start Your AI Journey → free discovery call */}
          <a
            href="/discovery-call"
            aria-label="Start Your AI Journey — book a free 20-minute discovery call"
            className="absolute hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            style={{ left: '4%', top: '63.5%', width: '19%', height: '6.2%' }}
          />

          {/* Secondary CTA overlay — Watch Video (opens the 60-second intro mp4) */}
          <a
            href="/longcare-intro.mp4"
            target="_blank"
            rel="noopener"
            aria-label="Watch the 60-second introduction video — how LongCare works"
            className="absolute hover:bg-sky-50/30 rounded-full transition-colors cursor-pointer"
            style={{ left: '23%', top: '63.5%', width: '15%', height: '6.2%' }}
          />

          {/* Right-side floating tech badges (4 service categories) */}
          <a
            href="/services/ai-mentor"
            aria-label="AI Education — practical skills, real-world impact"
            className="absolute hover:bg-white/10 rounded-xl transition-colors"
            style={{ left: '49%', top: '36%', width: '13%', height: '9%' }}
          />
          <a
            href="/discovery-call"
            aria-label="AI Consulting — strategy, roadmap, results"
            className="absolute hover:bg-white/10 rounded-xl transition-colors"
            style={{ left: '63%', top: '6%', width: '15%', height: '10%' }}
          />
          <a
            href="/agents"
            aria-label="AI Implementation — custom solutions, seamless execution"
            className="absolute hover:bg-white/10 rounded-xl transition-colors"
            style={{ left: '83%', top: '14%', width: '15%', height: '10%' }}
          />
          <a
            href="/solutions"
            aria-label="Automation Systems — intelligent workflows, scalable growth"
            className="absolute hover:bg-white/10 rounded-xl transition-colors"
            style={{ left: '83%', top: '47%', width: '15%', height: '10%' }}
          />

          {/* 4-service strip overlays (bottom panel) */}
          <a
            href="/services/ai-mentor"
            aria-label="AI Education & Training — practical AI learning and mentorship"
            className="absolute hover:bg-sky-50/40 rounded-xl transition-colors"
            style={{ left: '3.5%', top: '71%', width: '22%', height: '15%' }}
          />
          <a
            href="/discovery-call"
            aria-label="AI Consulting & Strategy — expert guidance to build winning AI strategies"
            className="absolute hover:bg-sky-50/40 rounded-xl transition-colors"
            style={{ left: '26.5%', top: '71%', width: '22%', height: '15%' }}
          />
          <a
            href="/agents"
            aria-label="AI Implementation & Integration — end-to-end implementation of AI solutions"
            className="absolute hover:bg-sky-50/40 rounded-xl transition-colors"
            style={{ left: '49.5%', top: '71%', width: '22%', height: '15%' }}
          />
          <a
            href="/solutions"
            aria-label="Automation & Scaling — scalable automation systems that streamline operations"
            className="absolute hover:bg-sky-50/40 rounded-xl transition-colors"
            style={{ left: '72.5%', top: '71%', width: '22%', height: '15%' }}
          />

          {/* Trust bar overlays (5 items in dark navy strip — span full width) */}
          <a
            href="/testimonials"
            aria-label="Trusted by Businesses across Australia"
            className="absolute hover:bg-white/5 rounded-md transition-colors"
            style={{ left: '1%', top: '88%', width: '19.4%', height: '11.5%' }}
          />
          <a
            href="/cloud-advisory"
            aria-label="Built on Google Cloud — secure, scalable, future-ready"
            className="absolute hover:bg-white/5 rounded-md transition-colors"
            style={{ left: '20.4%', top: '88%', width: '19.4%', height: '11.5%' }}
          />
          <a
            href="/how-it-works"
            aria-label="End-to-End Support — from learning to implementation and beyond"
            className="absolute hover:bg-white/5 rounded-md transition-colors"
            style={{ left: '39.8%', top: '88%', width: '19.4%', height: '11.5%' }}
          />
          <a
            href="/about"
            aria-label="Proudly Australian — empowering local businesses and communities"
            className="absolute hover:bg-white/5 rounded-md transition-colors"
            style={{ left: '59.2%', top: '88%', width: '19.4%', height: '11.5%' }}
          />
          <a
            href="/case-studies"
            aria-label="Results That Matter — practical AI solutions that drive real growth"
            className="absolute hover:bg-white/5 rounded-md transition-colors"
            style={{ left: '78.6%', top: '88%', width: '19.4%', height: '11.5%' }}
          />
        </div>

        {/* Mobile/below-fold supporting CTA row (real buttons in case overlays are hard to hit on tiny screens) */}
        <div className="mt-6 mb-2 flex flex-wrap justify-center gap-3 sm:hidden">
          <a
            href="/discovery-call"
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold rounded-full text-white no-underline"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #0284C7 100%)',
              boxShadow: '0 6px 18px -6px rgba(124,58,237,0.5)',
            }}
          >
            <Rocket className="size-4" aria-hidden /> Start Your AI Journey
          </a>
          <a
            href="/longcare-intro.mp4"
            target="_blank"
            rel="noopener"
            className="cursor-pointer btn-outline inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold rounded-full no-underline"
          >
            <PlayCircle className="size-4" aria-hidden /> Watch Video
          </a>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-[#F8FAFC]">
      {/* Soft decorative gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full bg-sky-200/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-40 -left-40 size-[420px] rounded-full bg-emerald-100/50 blur-3xl" />
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at top, black 50%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-[1120px] px-8 sm:px-10 pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center">
          {/* LEFT — copy */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Brand sub-tagline (above headline) */}
            <motion.div variants={fadeUp} className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 mb-3">
              LONG TERM CARE · AI POWERED · FUTURE READY
            </motion.div>

            {/* Audience pills row — INDIVIDUALS · SMEs · ORGANISATIONS */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 sm:gap-4 flex-wrap mb-6 text-[12px] font-semibold tracking-[0.08em] text-emerald-700"
              aria-label="Audiences served"
            >
              <a href="#who-we-serve" className="inline-flex items-center gap-1.5 hover:text-emerald-800 transition-colors no-underline cursor-pointer">
                <User className="size-4" strokeWidth={1.75} aria-hidden /> INDIVIDUALS
              </a>
              <span className="text-slate-300" aria-hidden>|</span>
              <a href="#who-we-serve" className="inline-flex items-center gap-1.5 hover:text-emerald-800 transition-colors no-underline cursor-pointer">
                <Briefcase className="size-4" strokeWidth={1.75} aria-hidden /> SMEs
              </a>
              <span className="text-slate-300" aria-hidden>|</span>
              <a href="#who-we-serve" className="inline-flex items-center gap-1.5 hover:text-emerald-800 transition-colors no-underline cursor-pointer">
                <Building2 className="size-4" strokeWidth={1.75} aria-hidden /> ORGANISATIONS
              </a>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-[34px] sm:text-[48px] lg:text-[60px] xl:text-[68px] font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              AI Transformation for Next Generation of Businesses
            </motion.h1>

            {/* Gradient tagline — Learn AI. Build Faster. Grow Smarter. */}
            <motion.p
              variants={fadeUp}
              className="mt-5 font-heading text-[22px] sm:text-[28px] lg:text-[32px] font-semibold leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                Learn AI. Build Faster. Grow Smarter.
              </span>
            </motion.p>

            <motion.p variants={fadeUp} className="mt-5 max-w-[620px] text-base sm:text-lg leading-relaxed text-slate-600">
              Helping <span className="font-semibold text-slate-900">individuals, startups, and SMEs</span>{' '}
              accelerate growth through practical AI{' '}
              <span className="font-semibold text-slate-900">education, consulting, implementation, and scalable automation systems</span>.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/discovery"
                className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-semibold rounded-full text-white no-underline transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #0284C7 100%)',
                  boxShadow: '0 6px 24px -8px rgba(124,58,237,0.45), 0 2px 6px rgba(37,99,235,0.25)',
                }}
              >
                <Rocket className="size-4" aria-hidden /> Start Your AI Journey
              </a>
              <a
                href="/how-it-works"
                className="cursor-pointer btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-semibold rounded-full no-underline"
              >
                <PlayCircle className="size-4" aria-hidden /> Watch Video
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-600" aria-hidden /> No-pitch first call
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileCheck className="size-3.5 text-sky-600" aria-hidden /> GST-inclusive
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-3.5 text-amber-600" aria-hidden /> ABN-registered
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — visual preview card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Floating service badges (4 corners — match banner tech badges) */}
            <a
              href="#ecosystem"
              className="absolute -top-5 -left-6 z-20 trust-card !bg-white/95 backdrop-blur-sm px-3.5 py-2.5 flex items-center gap-2.5 no-underline cursor-pointer hover:scale-[1.02] transition-transform shadow-[0_8px_30px_-8px_rgba(15,23,42,0.18)]"
              aria-label="AI Training and Mentorship"
            >
              <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="size-4 text-emerald-700" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">AI Training</div>
                <div className="text-[12px] font-bold text-slate-900">&amp; Mentorship</div>
              </div>
            </a>

            <a
              href="/discovery"
              className="absolute -top-3 -right-6 z-20 trust-card !bg-white/95 backdrop-blur-sm px-3.5 py-2.5 flex items-center gap-2.5 no-underline cursor-pointer hover:scale-[1.02] transition-transform shadow-[0_8px_30px_-8px_rgba(15,23,42,0.18)]"
              aria-label="AI Strategy Consulting"
            >
              <div className="size-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0">
                <Target className="size-4 text-sky-700" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">AI Strategy</div>
                <div className="text-[12px] font-bold text-slate-900">Consulting</div>
              </div>
            </a>

            <a
              href="/agents"
              className="absolute -bottom-5 -left-5 z-20 trust-card !bg-white/95 backdrop-blur-sm px-3.5 py-2.5 flex items-center gap-2.5 no-underline cursor-pointer hover:scale-[1.02] transition-transform shadow-[0_8px_30px_-8px_rgba(15,23,42,0.18)]"
              aria-label="AI Automation and Implementation"
            >
              <div className="size-9 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0">
                <Cpu className="size-4 text-violet-700" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">AI Automation</div>
                <div className="text-[12px] font-bold text-slate-900">&amp; Implementation</div>
              </div>
            </a>

            <a
              href="/solutions"
              className="absolute -bottom-3 -right-6 z-20 trust-card !bg-white/95 backdrop-blur-sm px-3.5 py-2.5 flex items-center gap-2.5 no-underline cursor-pointer hover:scale-[1.02] transition-transform shadow-[0_8px_30px_-8px_rgba(15,23,42,0.18)]"
              aria-label="Innovation and Growth"
            >
              <div className="size-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="size-4 text-amber-700" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Innovation</div>
                <div className="text-[12px] font-bold text-slate-900">&amp; Growth</div>
              </div>
            </a>

            {/* Main preview card */}
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
              {/* Mock window header */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                <span className="size-2.5 rounded-full bg-rose-300" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-300" />
                <span className="ml-3 text-[11px] font-medium text-slate-400">app.longcare.au · Mentor session</span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* User msg */}
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600 flex-shrink-0">
                    JM
                  </div>
                  <div className="rounded-xl rounded-tl-sm bg-slate-50 border border-slate-100 px-4 py-2.5 text-[13px] text-slate-700 leading-relaxed">
                    My team spends 3 days/month reconciling Xero invoices. Where do I start?
                  </div>
                </div>

                {/* AI msg */}
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="size-4 text-white" strokeWidth={2} aria-hidden />
                  </div>
                  <div className="flex-1">
                    <div className="rounded-xl rounded-tl-sm bg-sky-50/70 border border-sky-100 px-4 py-2.5 text-[13px] text-slate-800 leading-relaxed">
                      Build an agent that matches POs to invoices and flags exceptions. Typical setup:{' '}
                      <span className="font-semibold text-sky-700">12 weeks payback</span>. Want a live demo?
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                        <Workflow className="size-3" aria-hidden /> Xero
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                        <Cpu className="size-3" aria-hidden /> Gemini Agent
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                        <FileCheck className="size-3" aria-hidden /> ROI Model
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA row */}
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[12px] text-slate-500">
                    <PlayCircle className="size-4 text-sky-600" aria-hidden />
                    Session recording + AI notes
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    Live · streaming
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesStrip() {
  const { fadeUp, stagger } = useMotionProps();
  const services = [
    {
      icon: GraduationCap,
      title: 'AI Training & Education',
      desc: 'Practical AI skills and mentorship to accelerate your learning journey.',
      href: '/services/ai-mentor',
      cta: 'Browse training',
      iconTone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      icon: Compass,
      title: 'AI Consulting & Strategy',
      desc: 'Expert guidance to build the right AI strategy and roadmap for your business.',
      href: '/discovery',
      cta: 'Book a strategy call',
      iconTone: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      icon: Cpu,
      title: 'AI Implementation & Automation',
      desc: 'Custom AI solutions and automation that drive efficiency, reduce cost and scale fast.',
      href: '/agents',
      cta: 'See agents',
      iconTone: 'bg-violet-50 text-violet-700 border-violet-200',
    },
    {
      icon: Rocket,
      title: 'Startup & SME Innovation',
      desc: 'Build, launch and grow with AI-powered innovation systems and frameworks.',
      href: '/solutions',
      cta: 'Explore solutions',
      iconTone: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <section id="services-strip" className="relative bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10 py-12 sm:py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => (
            <motion.a
              key={s.title}
              variants={fadeUp}
              href={s.href}
              className="group trust-card p-6 flex flex-col cursor-pointer no-underline"
            >
              <div className={`size-12 rounded-2xl border flex items-center justify-center ${s.iconTone}`}>
                <s.icon className="size-6" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-[17px] font-semibold text-slate-900 leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600 flex-grow">
                {s.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-700 group-hover:text-sky-800 transition-colors">
                {s.cta} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  const { fadeUp, stagger } = useMotionProps();
  const items = [
    {
      icon: Lightbulb,
      title: 'Practical AI Solutions',
      desc: 'Real-world impact that drives growth.',
    },
    {
      icon: Handshake,
      title: 'End-to-End Support',
      desc: 'From learning to implementation.',
    },
    {
      icon: Cloud,
      title: 'Built on Google Cloud',
      desc: 'Secure. Scalable. Future-ready.',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Partner',
      desc: 'Helping businesses succeed with AI.',
    },
    {
      icon: MapPin,
      title: 'Proudly Australia',
      desc: 'Empowering local businesses & communities.',
    },
  ];

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
      }}
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.18]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(56,189,248,0.4), transparent 50%), radial-gradient(circle at 80% 50%, rgba(167,139,250,0.3), transparent 50%)',
      }} />
      <div className="relative mx-auto max-w-[1120px] px-8 sm:px-10 py-8 sm:py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {items.map((it) => (
            <motion.div key={it.title} variants={fadeUp} className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <it.icon className="size-5 text-sky-300" strokeWidth={1.5} aria-hidden />
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-[13px] font-semibold text-white">{it.title}</div>
                <div className="text-[12px] text-slate-300 mt-0.5 leading-snug">{it.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhoWeServe() {
  const { fadeUp, stagger } = useMotionProps();
  const segments = [
    {
      icon: User,
      title: 'Individuals',
      audience: 'Professionals · Freelancers · Career changers · AI learners',
      entry: 'Start with the A$29 AI Starter consult',
      cta: { label: 'Browse courses', href: 'https://book.longcare.au?service=ai-starter' },
      tone: 'border-sky-200 bg-sky-50/40',
      iconTone: 'bg-sky-100 text-sky-700 border-sky-200',
    },
    {
      icon: Rocket,
      title: 'Startups',
      audience: 'Early-stage founders · AI startups · SaaS · Digital businesses',
      entry: 'Founder advisory · MVP build · Fundraising · Cloud deployment',
      cta: { label: 'Founder advisory', href: '/discovery' },
      tone: 'border-emerald-200 bg-emerald-50/40',
      iconTone: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      icon: Briefcase,
      title: 'SMEs',
      audience: 'Retail · Services · Agencies · Trades · Local enterprises',
      entry: 'Readiness assessment → 5/10-Session pack → workflow automation',
      cta: { label: 'Take the AI Quiz', href: '/quiz' },
      tone: 'border-amber-200 bg-amber-50/40',
      iconTone: 'bg-amber-100 text-amber-700 border-amber-200',
    },
    {
      icon: Building2,
      title: 'Organisations',
      audience: 'Innovation teams · Transformation programmes · Corporate L&D',
      entry: 'Custom A$1,500–3,000+ engagement · Executive workshops',
      cta: { label: 'Scope an engagement', href: 'https://book.longcare.au?service=agentic-implementation' },
      tone: 'border-violet-200 bg-violet-50/40',
      iconTone: 'bg-violet-100 text-violet-700 border-violet-200',
    },
  ];

  return (
    <section id="who-we-serve" className="py-20 sm:py-24 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-2xl mb-12"
        >
          <motion.span variants={fadeUp} className="eyebrow">Who we serve</motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900"
          >
            Built for everyone in the AI economy.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
            One ecosystem, four entry points. Whether you are exploring AI for the first time
            or running a 50-person organisation, there is a clear next step.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {segments.map((s) => (
            <motion.article
              key={s.title}
              variants={fadeUp}
              className={`trust-card p-6 flex flex-col ${s.tone}`}
            >
              <div className={`size-11 rounded-xl border flex items-center justify-center ${s.iconTone}`}>
                <s.icon className="size-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-xl font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">{s.audience}</p>
              <p className="mt-3 text-[13px] text-slate-700 leading-relaxed font-medium">
                {s.entry}
              </p>
              <a
                href={s.cta.href}
                rel={s.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-700 hover:text-sky-800 transition-colors no-underline cursor-pointer"
              >
                {s.cta.label} <ArrowRight className="size-3.5" />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EcosystemPillars() {
  const { fadeUp, stagger } = useMotionProps();
  const pillars = [
    {
      icon: GraduationCap,
      title: 'AI Learning & Mentorship',
      desc: 'Learning paths, certifications, AI mentor system, practice lab.',
      span: 'sm:col-span-2 lg:col-span-2',
      tone: 'from-sky-50 to-white',
    },
    {
      icon: Wrench,
      title: 'SME Transformation',
      desc: 'Readiness assessment, business toolkit, workflow automation, industry templates.',
      span: '',
      tone: 'from-emerald-50 to-white',
    },
    {
      icon: Bot,
      title: 'AI Agent Marketplace',
      desc: 'Deployable AI employees: HR, sales, support, scheduling, marketing.',
      span: '',
      tone: 'from-violet-50 to-white',
    },
    {
      icon: ShieldHalf,
      title: 'Governance & Compliance',
      desc: 'AI policy templates, risk assessment, APP 1–13, ACL, WCAG 2.2 AA.',
      span: '',
      tone: 'from-amber-50 to-white',
    },
    {
      icon: Network,
      title: 'Community & Ecosystem',
      desc: 'Founder network, partner programs, university and accelerator partnerships.',
      span: '',
      tone: 'from-rose-50 to-white',
    },
    {
      icon: Rocket,
      title: 'Startup Mentorship & Advisory',
      desc: 'Founder advisory, MVP build, fundraising prep, AI go-to-market strategy.',
      span: '',
      tone: 'from-sky-50 to-white',
    },
    {
      icon: Cloud,
      title: 'Cloud & Infrastructure Advisory',
      desc: 'Google Cloud architecture, Vertex AI deployment, migration, scalability planning.',
      span: 'sm:col-span-2 lg:col-span-2',
      tone: 'from-emerald-50 to-white',
    },
  ];

  return (
    <section id="ecosystem" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <motion.span variants={fadeUp} className="eyebrow">The ecosystem</motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900"
            >
              Seven pillars. One AI partner.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed text-base max-w-md">
            Education, implementation, governance, and ecosystem — combined into a single
            AI operating system for Australian businesses.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              className={`trust-card p-6 sm:p-7 bg-gradient-to-br ${p.tone} ${p.span}`}
            >
              <div className="size-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <p.icon className="size-5 text-sky-700" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-slate-900 leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">{p.desc}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* Google Cloud for Startups callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mt-10 trust-card p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <div className="size-12 rounded-xl bg-gradient-to-br from-blue-50 to-sky-100 border border-sky-200 flex items-center justify-center flex-shrink-0">
            <Globe className="size-6 text-sky-700" strokeWidth={1.5} aria-hidden />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-sky-700 mb-1">
              Google Cloud · Startup Ecosystem
            </div>
            <h3 className="font-heading text-lg font-semibold text-slate-900">
              Cloud-native, AI-first, built on Google Cloud.
            </h3>
            <p className="mt-1 text-[14px] text-slate-600 leading-relaxed max-w-2xl">
              Vertex AI · Gemini · Cloud Run · Firestore · BigQuery · Pub/Sub · Cloud Storage. Every
              implementation we ship runs on the same scalable, compliant infrastructure.
            </p>
          </div>
          <a
            href="#integrations"
            className="cursor-pointer btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold rounded-full no-underline whitespace-nowrap"
          >
            See the stack
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StatStrip() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section className="relative bg-gradient-to-br from-sky-50 via-white to-emerald-50/40 border-y border-slate-200 overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: 'radial-gradient(circle at 25% 0%, rgba(14,165,233,0.08), transparent 50%), radial-gradient(circle at 75% 100%, rgba(16,185,129,0.08), transparent 50%)',
      }} />
      <div className="relative mx-auto max-w-[1120px] px-8 sm:px-10 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`text-center ${i > 0 ? 'md:border-l md:border-slate-200/80' : ''}`}
            >
              <div className="inline-flex items-center justify-center size-10 rounded-xl bg-white border border-slate-200 shadow-sm mb-3">
                <s.icon className="size-4 text-sky-700" strokeWidth={2} aria-hidden />
              </div>
              <div className="stat-number text-4xl sm:text-5xl text-slate-900">
                {s.value}
                {s.suffix && <span className="text-slate-400 text-2xl ml-1 font-normal">{s.suffix}</span>}
              </div>
              <div className="mt-2 text-sm text-slate-600 max-w-[180px] mx-auto leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CareJourney() {
  const { fadeUp, stagger } = useMotionProps();
  const stages = [
    {
      icon: Search,
      label: 'Month 0',
      title: 'Discover',
      desc: 'Free 30-min assessment. We map your highest-ROI workflows and identify what NOT to automate.',
      pill: 'A$0',
      pillTone: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    {
      icon: GraduationCap,
      label: 'Month 1–3',
      title: 'Mentor',
      desc: 'Weekly 1:1 sessions. Build your first AI workflow. Train your team on prompt engineering.',
      pill: 'A$99–450',
      pillTone: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      icon: Rocket,
      label: 'Month 3–6',
      title: 'Implement',
      desc: 'Ship production agents. Integrate with Xero, Microsoft 365, your stack. ROI in production.',
      pill: 'A$850+',
      pillTone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      icon: InfinityIcon,
      label: 'Month 6+',
      title: 'Compound',
      desc: 'Quarterly reviews. New use cases as the AI landscape shifts. Multi-year partnership.',
      pill: 'Ongoing',
      pillTone: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];
  return (
    <section id="journey" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-2xl mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow">Your AI care journey</motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900"
          >
            A 12-month plan, not a 1-hour pitch.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
            Most AI vendors disappear after the demo. We stay through discovery, build,
            launch, and quarterly tune-up — for as long as the system keeps paying back.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="relative"
        >
          {/* Connecting line — desktop only */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-slate-200 via-sky-300 to-emerald-300"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className="trust-card p-6 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="size-14 rounded-2xl bg-white border-2 border-sky-200 flex items-center justify-center shadow-sm relative z-10">
                    <s.icon className="size-6 text-sky-700" strokeWidth={1.75} aria-hidden />
                  </div>
                  <span
                    className={`trust-badge border ${s.pillTone}`}
                  >
                    {s.pill}
                  </span>
                </div>
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-400 mb-1">
                  {s.label}
                </div>
                <h3 className="font-heading text-xl font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{s.desc}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 trust-card p-6 sm:p-8 bg-gradient-to-r from-sky-50/60 via-white to-emerald-50/40"
        >
          <div className="flex items-start gap-4">
            <div className="size-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <LineChart className="size-5 text-emerald-700" strokeWidth={1.75} aria-hidden />
            </div>
            <div>
              <div className="font-heading text-lg font-semibold text-slate-900">
                Average client retention: 14 months
              </div>
              <p className="text-[14px] text-slate-600 mt-1 max-w-xl leading-relaxed">
                72% of operators continue past the initial sprint into long-term partnership.
                We measure success in years, not invoices.
              </p>
            </div>
          </div>
          <a
            href="/discovery"
            className="cursor-pointer btn-cta inline-flex items-center gap-2 px-5 py-3 text-[14px] font-semibold rounded-full no-underline whitespace-nowrap"
          >
            Start the journey <ArrowRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="max-w-2xl">
          <motion.span variants={fadeUp} className="eyebrow">The challenge</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Most AI initiatives stall before they start.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">Three patterns we see in every intake call.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="mt-14 grid gap-6 md:grid-cols-3">
          {painPoints.map((p, i) => (
            <motion.article key={i} variants={fadeUp} className="trust-card p-8">
              <div className="flex items-center justify-between mb-5">
                <span className="trust-badge bg-sky-50 text-sky-700">0{i + 1}</span>
                <p.icon className="size-5 text-slate-400" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{p.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section id="results" className="py-20 sm:py-28 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="max-w-2xl mb-14">
          <motion.span variants={fadeUp} className="eyebrow">Case studies</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Real results from real businesses.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
            Before/after metrics from three engagements — published with operator permission.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="space-y-6">
          {caseStudies.map((cs, i) => (
            <motion.article key={i} variants={fadeUp} className="trust-card overflow-hidden">
              <div className="grid lg:grid-cols-[1fr_280px]">
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="size-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-[10px] font-bold text-sky-700">{cs.initials}</div>
                    <span className="text-[13px] font-semibold text-slate-900">{cs.client}</span>
                    <span className="text-[12px] text-slate-500">{cs.sector}</span>
                  </div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className="eyebrow text-slate-400 !text-[11px] mb-2">Challenge</div>
                      <p className="text-[15px] leading-relaxed text-slate-700">{cs.challenge}</p>
                    </div>
                    <div>
                      <div className="eyebrow text-slate-400 !text-[11px] mb-2">What we built</div>
                      <p className="text-[15px] leading-relaxed text-slate-700">{cs.solution}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-3">
                    <Quote className="size-4 text-sky-600/50 flex-shrink-0 mt-1" strokeWidth={1.5} aria-hidden />
                    <div>
                      <p className="text-[15px] leading-relaxed text-slate-800 italic">{cs.quote}</p>
                      <p className="mt-1.5 text-[12px] text-slate-500">{cs.person}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:border-l border-t lg:border-t-0 border-slate-100 bg-gradient-to-br from-sky-50/60 to-white p-8 flex flex-col justify-center gap-5">
                  <div className="eyebrow text-slate-400 !text-[11px]">Results</div>
                  {cs.results.map((r, j) => (
                    <div key={j}>
                      <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">{r.metric}</div>
                      <div className="text-[13px] text-slate-500 mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="text-center max-w-2xl mx-auto mb-14">
          <motion.span variants={fadeUp} className="eyebrow">Transparent pricing</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Start small. Upgrade when the data justifies it.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">All prices GST-inclusive. No lock-in contracts.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {pricingTiers.map((t) => (
              <div key={t.name} className={`trust-card flex flex-col overflow-hidden ${t.highlight ? 'ring-2 ring-sky-600 relative' : ''}`}>
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-sky-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    <Star className="size-3" aria-hidden /> Most popular
                  </div>
                )}
                <div className="p-7 flex-grow">
                  <div className="flex items-center gap-2.5 mb-4">
                    <t.icon className="size-5 text-sky-700" strokeWidth={1.5} aria-hidden />
                    <span className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">{t.name}</span>
                  </div>
                  <div className="font-heading text-3xl font-bold text-slate-900">{t.price}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{t.unit}</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{t.desc}</p>
                  <ul className="mt-6 space-y-2.5">
                    {t.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[13px]">
                        {f.ok
                          ? <Check className="size-4 text-emerald-600 flex-shrink-0" strokeWidth={2.5} aria-hidden />
                          : <Minus className="size-4 text-slate-300 flex-shrink-0" strokeWidth={2} aria-hidden />
                        }
                        <span className={f.ok ? 'text-slate-700' : 'text-slate-400'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-7 pb-7">
                  <a href={t.href} rel="noopener noreferrer" className={`cursor-pointer block text-center no-underline rounded-full py-3 text-[14px] font-semibold transition-all ${t.highlight ? 'btn-cta' : 'btn-outline'}`}>
                    {t.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Integrations() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section id="integrations" className="py-20 sm:py-28 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <motion.span variants={fadeUp} className="eyebrow">Integrations</motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Connects to your existing stack.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed text-base max-w-md">
            We build on tools you already pay for. No vendor lock-in. No parallel systems.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {integrations.map((ig) => (
            <motion.div key={ig.name} variants={fadeUp} className="trust-card p-6 flex items-center gap-4">
              <div className="size-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                <Workflow className="size-5 text-slate-500" strokeWidth={1.5} aria-hidden />
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-slate-800 truncate">{ig.name}</div>
                <div className="text-[12px] text-slate-500 mt-0.5 truncate">{ig.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="max-w-2xl mb-14">
          <motion.span variants={fadeUp} className="eyebrow">The team</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Who you will work with.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
            Industry-vetted practitioners. No juniors on client work.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="grid md:grid-cols-2 gap-6">
          {team.map((t) => (
            <motion.div key={t.name} variants={fadeUp} className="trust-card p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800 text-white flex items-center justify-center font-heading text-lg font-bold flex-shrink-0 shadow-md shadow-sky-200">{t.initials}</div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-slate-900">{t.name}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{t.role}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.credentials.map((c) => (
                  <span key={c} className="trust-badge border border-slate-200 bg-slate-50 text-slate-600">
                    <Award className="size-3 text-amber-600" aria-hidden /> {c}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-800">Focus:</span> {t.focus}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-[1120px] px-8 sm:px-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 lg:gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow">FAQ</motion.span>
            <motion.h2 variants={fadeUp} className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Common questions.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-slate-600">
              Six things operators ask before booking the first call.
            </motion.p>
            <motion.a variants={fadeUp} href="/discovery" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors no-underline cursor-pointer">
              Still unsure? Book a free assessment <ArrowRight className="size-4" />
            </motion.a>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <Accordion className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-200 px-0 last:border-b-0">
                  <AccordionTrigger className="cursor-pointer py-5 text-left font-heading text-[16px] sm:text-[18px] font-semibold text-slate-900 hover:text-sky-700 hover:no-underline [&>svg]:size-5 [&>svg]:text-slate-400">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-relaxed text-slate-600 max-w-[56ch]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { fadeUp, stagger } = useMotionProps();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50/60">
      {/* Decorative orbs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[700px] rounded-full opacity-30 blur-[120px]" style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 size-[400px] rounded-full opacity-25 blur-[100px]" style={{ background: 'radial-gradient(circle, #34D399 0%, transparent 70%)' }} />

      <div className="relative mx-auto max-w-[1120px] px-8 sm:px-10 pt-24 sm:pt-32 pb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="max-w-3xl">
          <motion.span variants={fadeUp} className="eyebrow">Ready when you are</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-heading text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight text-slate-900">
            Make AI quietly compound{' '}
            <span className="bg-gradient-to-r from-sky-700 to-emerald-600 bg-clip-text text-transparent">
              for your business.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Start with a 30-minute consult. We will tell you the truth about whether AI fits your problem — and what to do first if it does.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/discovery" className="cursor-pointer btn-cta inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold rounded-full no-underline">
              Free 30-min AI assessment <ArrowRight className="size-4" />
            </a>
            <a href="/referral" className="cursor-pointer btn-outline inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold rounded-full no-underline">
              Refer & earn $25
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600" aria-hidden /> No-pitch guarantee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileCheck className="size-3.5 text-sky-600" aria-hidden /> GST-inclusive quote
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="size-3.5 text-amber-600" aria-hidden /> APP 1-13 compliant
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <main id="main-content" className="bg-[#F8FAFC]">
      <HeroBanner />
      <WhoWeServe />
      <StatStrip />
      <CareJourney />
      <EcosystemPillars />
      <Problem />
      <CaseStudies />
      <ROICalculator />
      <Pricing />
      <MembershipSection />
      <ReviewSection />
      <ProgressTrackerPreview />
      <CertificateShowcase />
      <Integrations />
      <TeamSection />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
