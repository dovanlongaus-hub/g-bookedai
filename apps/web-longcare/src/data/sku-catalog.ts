/**
 * SKU Catalog — Single source of truth for all LongCare AU pricing.
 *
 * Used by:
 * - /compare        — full canonical comparison
 * - /get-started-guide — recommendation engine
 * - PricingComparison component
 *
 * All prices are AUD inclusive of 10% GST.
 */

export type SKUTier = 'individual' | 'startup' | 'sme' | 'organisation';
export type SKUCategory =
  | 'consult'
  | 'session'
  | 'package'
  | 'subscription'
  | 'engagement'
  | 'workshop'
  | 'bootcamp';

export type SKU = {
  id: string;
  name: string;
  category: SKUCategory;
  tiers: SKUTier[];
  priceAud: number;
  priceLabel: string;
  unit: string;
  description: string;
  highlights: string[];
  cta: { label: string; href: string };
  url: string;
  highlight?: boolean;
  badge?: string;
};

export const TIER_LABELS: Record<SKUTier, string> = {
  individual: 'Individual',
  startup: 'Startup / Founder',
  sme: 'SME',
  organisation: 'Organisation',
};

export const CATEGORY_LABELS: Record<SKUCategory, string> = {
  consult: 'Consult',
  session: 'Session',
  package: 'Package',
  subscription: 'Subscription',
  engagement: 'Engagement',
  workshop: 'Workshop',
  bootcamp: 'Bootcamp',
};

export const skuCatalog: SKU[] = [
  // ───────────────────────── CONSULTS / FREE ENTRY ─────────────────────────
  {
    id: 'ai-readiness',
    name: 'AI Readiness Assessment',
    category: 'consult',
    tiers: ['individual', 'startup', 'sme', 'organisation'],
    priceAud: 0,
    priceLabel: 'Free',
    unit: '12 questions, ~6 min',
    description:
      'Maturity score plus ROI estimate across four dimensions. Personalised tier recommendation in under six minutes.',
    highlights: [
      '12 questions across 4 dimensions',
      'Tier match: Explore / Adopt / Scale',
      'Email PDF report',
      'No sign-up wall',
    ],
    cta: { label: 'Start free assessment', href: '/resources/ai-readiness' },
    url: '/resources/ai-readiness',
    badge: 'Free',
  },
  {
    id: 'discovery-call',
    name: 'Discovery Call',
    category: 'consult',
    tiers: ['startup', 'sme', 'organisation'],
    priceAud: 0,
    priceLabel: 'Free',
    unit: '20-min video call',
    description:
      'Twenty minutes with a senior practitioner. Top three opportunities, a realistic 90-day plan, and an honest fit check.',
    highlights: [
      'Recorded summary',
      'Written next-steps',
      'Recommended tier and budget',
      'No-pressure honest no when not a fit',
    ],
    cta: { label: 'Book discovery call', href: '/discovery-call' },
    url: '/discovery-call',
    badge: 'Free',
  },

  // ───────────────────────── 1:1 SESSIONS ─────────────────────────
  {
    id: 'ai-starter',
    name: 'AI Starter Session',
    category: 'session',
    tiers: ['individual', 'sme'],
    priceAud: 29,
    priceLabel: 'A$29',
    unit: '30-min consult',
    description:
      'Quick 1-on-1 to identify your first AI use case. Built for total beginners and solo operators.',
    highlights: [
      '30-min video session',
      'Personalised action plan',
      'Recording plus AI notes',
      'No prior AI experience needed',
    ],
    cta: { label: 'Book A$29 starter', href: 'https://book.longcare.au?service=ai-starter' },
    url: '/services/ai-starter',
  },
  {
    id: 'ai-mentor',
    name: 'AI Mentor Session',
    category: 'session',
    tiers: ['individual', 'startup', 'sme'],
    priceAud: 99,
    priceLabel: 'A$99',
    unit: '60-min mentor hour',
    description:
      'One-on-one mentoring for prompt engineering, workflow design, and tool selection across your stack.',
    highlights: [
      '60-min focused session',
      'Hands-on prompt engineering',
      'Workflow optimisation',
      'AI session notes and recordings',
    ],
    cta: { label: 'Book mentor hour', href: 'https://book.longcare.au?service=ai-mentor' },
    url: '/services/ai-mentor',
    highlight: true,
    badge: 'Most popular',
  },
  {
    id: 'founder-hour',
    name: 'Founder Hour',
    category: 'session',
    tiers: ['startup'],
    priceAud: 199,
    priceLabel: 'A$199',
    unit: '60-min founder advisory',
    description:
      'Pragmatic advisory hour for founders. Pricing, fundraising prep, AI strategy, and tough calls.',
    highlights: [
      'Senior founder operator',
      'Pre-call brief reviewed',
      'Action list within 24 hrs',
      'Single charge, no retainer',
    ],
    cta: { label: 'Book founder hour', href: 'https://book.longcare.au?service=founder-advisory' },
    url: '/startup/founder-advisory',
  },

  // ───────────────────────── PACKAGES (multi-session) ─────────────────────────
  {
    id: 'package-5',
    name: '5-Session Mentoring Package',
    category: 'package',
    tiers: ['individual', 'sme'],
    priceAud: 450,
    priceLabel: 'A$450',
    unit: '5 x 60-min sessions',
    description:
      'A structured five-session learning path. Save A$45 vs single sessions, with progress tracking and priority scheduling.',
    highlights: [
      'Structured curriculum',
      'Progress dashboard',
      'Priority scheduling',
      'Email support between sessions',
    ],
    cta: { label: 'Select 5-Pack', href: 'https://book.longcare.au?service=package-5' },
    url: '/services/packages',
  },
  {
    id: 'package-10',
    name: '10-Session Mentoring Package',
    category: 'package',
    tiers: ['individual', 'sme'],
    priceAud: 850,
    priceLabel: 'A$850',
    unit: '10 x 60-min sessions',
    description:
      'Comprehensive AI mastery program. Save A$150 with a dedicated mentor, custom AI project, and completion certificate.',
    highlights: [
      'Dedicated mentor assigned',
      'Custom AI project guidance',
      'Completion certificate',
      'Email plus chat support',
    ],
    cta: { label: 'Select 10-Pack', href: 'https://book.longcare.au?service=package-10' },
    url: '/services/packages',
    highlight: true,
    badge: 'Best value',
  },

  // ───────────────────────── ACADEMY (self-paced courses) ─────────────────────────
  {
    id: 'academy-beginner',
    name: 'Beginner AI Path',
    category: 'session',
    tiers: ['individual'],
    priceAud: 49,
    priceLabel: 'A$49',
    unit: '8 lessons, ~4 hrs',
    description:
      'Start from zero. Learn ChatGPT, Gemini, and the AI tools that matter to busy Australians.',
    highlights: [
      '8 lessons, ~4 hrs total',
      'Hands-on activities',
      'Lifetime access',
      'Certificate of completion',
    ],
    cta: { label: 'Browse path', href: '/academy/beginner-ai' },
    url: '/academy/beginner-ai',
  },
  {
    id: 'academy-business',
    name: 'AI for Business Path',
    category: 'session',
    tiers: ['individual', 'sme'],
    priceAud: 99,
    priceLabel: 'A$99',
    unit: '10 lessons, ~6 hrs',
    description:
      'Apply AI to sales, ops, and customer service in your business. Designed for SME owners.',
    highlights: [
      '10 lessons, ~6 hrs total',
      'Sales, ops, and CS workflows',
      'Templates included',
      'Certificate of completion',
    ],
    cta: { label: 'Browse path', href: '/academy/ai-for-business' },
    url: '/academy/ai-for-business',
  },
  {
    id: 'academy-automation',
    name: 'AI Automation Path',
    category: 'session',
    tiers: ['individual', 'startup', 'sme'],
    priceAud: 149,
    priceLabel: 'A$149',
    unit: 'Advanced multi-tool path',
    description:
      'Build autonomous workflows across your tools. The advanced track for technical operators.',
    highlights: [
      'Multi-tool automations',
      'API integrations',
      'Workflow case studies',
      'Certificate of completion',
    ],
    cta: { label: 'Browse path', href: '/academy/ai-automation' },
    url: '/academy/ai-automation',
  },

  // ───────────────────────── SUBSCRIPTIONS ─────────────────────────
  {
    id: 'toolkit-free',
    name: 'AI Toolkit (Free)',
    category: 'subscription',
    tiers: ['individual', 'startup', 'sme'],
    priceAud: 0,
    priceLabel: 'A$0',
    unit: '100 runs / month',
    description:
      'Eight AI productivity tools — email, docs, social, meetings — free up to 100 runs per month.',
    highlights: [
      '8 productivity tools',
      '100 free runs / month',
      'No credit card required',
      'Upgrade anytime',
    ],
    cta: { label: 'Try toolkit free', href: '/toolkit' },
    url: '/toolkit',
    badge: 'Free',
  },
  {
    id: 'toolkit-pro',
    name: 'AI Toolkit Pro',
    category: 'subscription',
    tiers: ['individual', 'startup', 'sme'],
    priceAud: 29,
    priceLabel: 'A$29/mo',
    unit: 'unlimited runs',
    description:
      'Unlimited runs across all eight tools. Email assistant, document generator, meeting summariser, and more.',
    highlights: [
      'Unlimited runs',
      'Priority queue',
      'Advanced templates',
      'Cancel anytime',
    ],
    cta: { label: 'Upgrade to Pro', href: '/toolkit' },
    url: '/toolkit',
  },
  {
    id: 'agents-business',
    name: 'AI Business Agents',
    category: 'subscription',
    tiers: ['sme', 'organisation'],
    priceAud: 199,
    priceLabel: 'From A$199/mo',
    unit: 'per agent, per month',
    description:
      'Six business agents — Admin, HR, Customer Service, Sales, Scheduling, Marketing. Deploy AI employees in your tools.',
    highlights: [
      'Admin / HR / CS / Sales / Scheduling / Marketing',
      'Web, email, WhatsApp, Slack, SMS',
      'Approval rules and audit log',
      'Pilot from A$199/mo',
    ],
    cta: { label: 'Browse agents', href: '/agents' },
    url: '/agents',
  },
  {
    id: 'agents-industry',
    name: 'AI Industry Agents',
    category: 'subscription',
    tiers: ['sme', 'organisation'],
    priceAud: 299,
    priceLabel: 'From A$299/mo',
    unit: 'per agent, per month',
    description:
      'Six industry-tuned agents — Healthcare, Property, Retail, Hospitality, Recruitment, Education — aware of AU tools and policies.',
    highlights: [
      'Cliniko, PropertyTree, Shopify, Lightspeed aware',
      'AU compliance baked in',
      'Approval workflow included',
      'Pilot from A$299/mo',
    ],
    cta: { label: 'Browse agents', href: '/agents' },
    url: '/agents',
  },
  {
    id: 'automation-packages',
    name: 'Automation Packages',
    category: 'subscription',
    tiers: ['sme', 'organisation'],
    priceAud: 449,
    priceLabel: 'A$449–799/mo',
    unit: 'bundle plus setup',
    description:
      'Pre-configured agent bundles for Customer Service, Sales Engine, Operations, or Industry Starter. Setup A$3K–5K.',
    highlights: [
      'Customer Service / Sales / Ops / Industry',
      'Bundled agents and integrations',
      'One-time setup A$3K–5K',
      'Saves A$2.5K–3K per month',
    ],
    cta: { label: 'See packages', href: '/agents/automation-packages' },
    url: '/agents/automation-packages',
  },
  {
    id: 'mentorship-retainer',
    name: 'Mentorship Retainer',
    category: 'subscription',
    tiers: ['startup'],
    priceAud: 1499,
    priceLabel: 'A$1,499/mo',
    unit: 'monthly retainer',
    description:
      'Monthly retainer for founder mentorship. Office hours, async Slack, and a senior operator on speed dial.',
    highlights: [
      'Two scheduled hours per month',
      'Async Slack support',
      'Investor warm intros where relevant',
      'Pause anytime',
    ],
    cta: { label: 'Apply for retainer', href: '/startup/mentorship' },
    url: '/startup/mentorship',
  },

  // ───────────────────────── ENGAGEMENTS (project-based) ─────────────────────────
  {
    id: 'deploy-quickstart',
    name: 'Quick Start Deployment',
    category: 'engagement',
    tiers: ['sme'],
    priceAud: 2500,
    priceLabel: 'A$2,500',
    unit: 'fixed engagement',
    description:
      'We build, configure, and deploy one AI agent end-to-end. Production in two weeks.',
    highlights: [
      'One agent, fully deployed',
      'Two-week timeline',
      'Includes training and handover',
      'Fixed price, no surprises',
    ],
    cta: { label: 'Start deployment', href: '/agents/deployment-services' },
    url: '/agents/deployment-services',
  },
  {
    id: 'deploy-custom',
    name: 'Custom Build',
    category: 'engagement',
    tiers: ['sme', 'organisation'],
    priceAud: 5000,
    priceLabel: 'A$5K–15K',
    unit: '4–8 weeks',
    description:
      'Custom multi-agent build with bespoke integrations. Workflow audit, design, build, deploy.',
    highlights: [
      'Multi-agent or custom logic',
      'Bespoke integrations',
      'Four-to-eight-week build',
      'Team training included',
    ],
    cta: { label: 'Discuss custom build', href: '/agents/deployment-services' },
    url: '/agents/deployment-services',
  },
  {
    id: 'deploy-enterprise',
    name: 'Enterprise Programme',
    category: 'engagement',
    tiers: ['organisation'],
    priceAud: 25000,
    priceLabel: 'From A$25,000',
    unit: 'multi-month programme',
    description:
      'Enterprise-grade rollout across departments with governance, change management, and post-launch support.',
    highlights: [
      'Multi-department rollout',
      'Governance and audit framework',
      'Change management support',
      'Post-launch SLAs',
    ],
    cta: { label: 'Talk to enterprise', href: '/contact' },
    url: '/agents/deployment-services',
    badge: 'Enterprise',
  },
  {
    id: 'cloud-architecture',
    name: 'Cloud Architecture Review',
    category: 'engagement',
    tiers: ['startup', 'sme', 'organisation'],
    priceAud: 2500,
    priceLabel: 'A$2,500',
    unit: 'fixed engagement',
    description:
      'Architecture and infra review for AI workloads. GCP, AWS, hybrid. Findings report plus prioritised roadmap.',
    highlights: [
      'Architecture diagrams reviewed',
      'Cost and security audit',
      'Prioritised roadmap',
      'Two-week turnaround',
    ],
    cta: { label: 'Request review', href: '/cloud-advisory/architecture-design' },
    url: '/cloud-advisory/architecture-design',
  },
  {
    id: 'startup-quarterly',
    name: 'Quarterly Founder Programme',
    category: 'engagement',
    tiers: ['startup'],
    priceAud: 3999,
    priceLabel: 'A$3,999',
    unit: '12-week programme',
    description:
      'Twelve weeks of structured advisory for founders. Strategy, product, GTM, and fundraising prep.',
    highlights: [
      'Weekly office hours',
      'Investor pitch coaching',
      'Pricing and unit economics',
      'Quarterly OKR planning',
    ],
    cta: { label: 'Apply for programme', href: '/startup/mentorship' },
    url: '/startup/mentorship',
  },

  // ───────────────────────── WORKSHOPS / BOOTCAMPS ─────────────────────────
  {
    id: 'workshops-public',
    name: 'Public AI Workshops',
    category: 'workshop',
    tiers: ['individual', 'sme'],
    priceAud: 149,
    priceLabel: 'A$149–199',
    unit: '2-hr live workshop',
    description:
      'Hands-on two-hour workshops on AI tools, prompting, and industry-specific use cases. Limit 12 attendees.',
    highlights: [
      'Live online with mentors',
      'Limit 12 per session',
      'Recording included',
      'Tailored private from A$1,200',
    ],
    cta: { label: 'See upcoming dates', href: '/community/workshops' },
    url: '/community/workshops',
  },
  {
    id: 'bootcamp-foundations',
    name: 'AI Foundations Bootcamp',
    category: 'bootcamp',
    tiers: ['individual', 'startup'],
    priceAud: 1499,
    priceLabel: 'A$1,499',
    unit: '4-week intensive',
    description:
      'Four-week intensive across foundations, tools, and deployment. A$200 in tool credits included.',
    highlights: [
      'Four weeks, ~6 hrs / week',
      'A$200 in AI tool credits',
      'Cohort community',
      'Capstone project',
    ],
    cta: { label: 'Apply for cohort', href: '/community/bootcamps' },
    url: '/community/bootcamps',
  },
  {
    id: 'bootcamp-build',
    name: 'AI Build Bootcamp',
    category: 'bootcamp',
    tiers: ['startup', 'sme'],
    priceAud: 1899,
    priceLabel: 'A$1,899',
    unit: '6-week build cohort',
    description:
      'Six-week build cohort. Deploy your own agent in production with mentor support and A$300 cloud credits.',
    highlights: [
      'Six weeks, ~8 hrs / week',
      'A$300 cloud credits',
      'Production deployment',
      'Demo day showcase',
    ],
    cta: { label: 'Apply for cohort', href: '/community/bootcamps' },
    url: '/community/bootcamps',
  },
];

// ───────────────────────── HELPERS ─────────────────────────

export function skusForTier(tier: SKUTier): SKU[] {
  return skuCatalog.filter((s) => s.tiers.includes(tier));
}

export function skusByCategory(cat: SKUCategory): SKU[] {
  return skuCatalog.filter((s) => s.category === cat);
}

export function findSKU(id: string): SKU | undefined {
  return skuCatalog.find((s) => s.id === id);
}

export function recommendSKUs(input: {
  tier: SKUTier;
  budgetMonthly: number;
  goal?: 'save-time' | 'build-product' | 'cut-costs' | 'train-team';
}): SKU[] {
  const { tier, budgetMonthly, goal } = input;
  const candidates = skusForTier(tier);

  // Filter by budget — engagements compared against ~3 months budget; subscriptions monthly.
  const affordable = candidates.filter((s) => {
    if (s.priceAud === 0) return true;
    if (s.category === 'subscription') return s.priceAud <= budgetMonthly;
    if (s.category === 'session' || s.category === 'consult' || s.category === 'workshop') {
      return s.priceAud <= budgetMonthly * 3;
    }
    if (s.category === 'package' || s.category === 'bootcamp') {
      return s.priceAud <= budgetMonthly * 4;
    }
    if (s.category === 'engagement') {
      return s.priceAud <= budgetMonthly * 6;
    }
    return true;
  });

  // Goal-based scoring
  const goalCategoryWeights: Record<string, Partial<Record<SKUCategory, number>>> = {
    'save-time': { subscription: 3, session: 2, package: 1 },
    'build-product': { engagement: 3, session: 2, bootcamp: 2 },
    'cut-costs': { subscription: 3, engagement: 2, package: 1 },
    'train-team': { workshop: 3, bootcamp: 3, session: 2, package: 2 },
  };

  const weights = goal ? goalCategoryWeights[goal] || {} : {};

  const scored = affordable.map((s) => ({
    sku: s,
    score:
      (weights[s.category] || 0) +
      (s.highlight ? 1 : 0) +
      (s.priceAud === 0 ? 0.5 : 0),
  }));

  scored.sort((a, b) => b.score - a.score || a.sku.priceAud - b.sku.priceAud);

  // Diversify by category — prefer up to 3 different categories
  const seen = new Set<SKUCategory>();
  const diversified: SKU[] = [];
  for (const s of scored) {
    if (diversified.length >= 3) break;
    if (!seen.has(s.sku.category)) {
      diversified.push(s.sku);
      seen.add(s.sku.category);
    }
  }
  // Backfill if fewer than 3
  for (const s of scored) {
    if (diversified.length >= 3) break;
    if (!diversified.includes(s.sku)) diversified.push(s.sku);
  }
  return diversified;
}
