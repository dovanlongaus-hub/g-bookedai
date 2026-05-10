// Central inventory of lead magnets used across the LongCare AU site.
// Single source of truth for the /lead-magnets hub, conversion components,
// and the /api/newsletter routing logic. Keep entries in Australian English
// and tag every magnet with the audience(s) it serves so the grid filters
// correctly.

export type LeadMagnetFormat =
  | 'pdf'
  | 'quiz'
  | 'calculator'
  | 'email-course'
  | 'template-pack'
  | 'workshop'
  | 'newsletter';

export type LeadMagnetAudience = 'individual' | 'startup' | 'sme' | 'organisation';

export type LeadMagnet = {
  id: string;
  title: string;
  description: string;
  format: LeadMagnetFormat;
  /** Landing page or trigger URL — internal route or full URL. */
  url: string;
  /** Value passed to /api/newsletter `source` field. Must be unique. */
  apiSource: string;
  /** ID matching an entry in `email-sequences.ts`. */
  emailSequence?: string;
  audience: LeadMagnetAudience[];
  /** Estimated minutes to read/use. Undefined for ongoing magnets like newsletters. */
  estimatedReadMinutes?: number;
  tags: string[];
  featured?: boolean;
};

export const leadMagnets: LeadMagnet[] = [
  {
    id: 'ai-readiness-quiz',
    title: 'AI Readiness Assessment',
    description:
      '12 questions, 6 minutes. Get your AI maturity score, ROI estimate, and 3 prioritised recommendations.',
    format: 'quiz',
    url: '/resources/ai-readiness',
    apiSource: 'quiz-lead',
    emailSequence: 'post-quiz',
    audience: ['individual', 'sme', 'startup', 'organisation'],
    estimatedReadMinutes: 6,
    tags: ['Free', 'Assessment'],
    featured: true,
  },
  {
    id: 'roi-calculator',
    title: 'AI ROI Calculator',
    description:
      'Estimate your AI savings in 60 seconds. Inputs in AUD; outputs include payback period and 12-month uplift.',
    format: 'calculator',
    url: '/resources/roi-calculator',
    apiSource: 'roi-calculator',
    audience: ['sme', 'startup', 'organisation'],
    estimatedReadMinutes: 1,
    tags: ['Free', 'Tool'],
  },
  {
    id: 'sme-ai-guide',
    title: 'Free SME AI Guide',
    description:
      '24-page practical guide to AI for Australian SMEs. Frameworks, real cost benchmarks, and a 30-day rollout plan.',
    format: 'pdf',
    url: '/guide',
    apiSource: 'guide-lead',
    emailSequence: 'sme-onboarding',
    audience: ['sme'],
    estimatedReadMinutes: 35,
    tags: ['Free PDF', 'AU SMEs'],
    featured: true,
  },
  {
    id: 'newsletter',
    title: 'LongCare Newsletter',
    description:
      'Weekly digest: 5 things worth your attention, 1 case study, 1 tool we tested. Aussie context, no fluff.',
    format: 'newsletter',
    url: '/community/network',
    apiSource: 'newsletter',
    emailSequence: 'newsletter-welcome',
    audience: ['individual', 'sme', 'startup', 'organisation'],
    tags: ['Weekly'],
    featured: true,
  },
  {
    id: 'prompt-templates',
    title: 'SME Prompt Template Pack',
    description:
      '8 ready-to-use prompts for common SME scenarios — sales emails, hiring briefs, customer support, BAS prep notes.',
    format: 'template-pack',
    url: '/academy/prompt-engineering/lessons/prompt-templates-for-sme',
    apiSource: 'prompt-templates',
    audience: ['sme', 'individual'],
    estimatedReadMinutes: 10,
    tags: ['Free Templates'],
  },
  {
    id: 'governance-policy-templates',
    title: 'AI Policy Templates',
    description:
      '6 customisable policy templates aligned to the Australian Privacy Principles (APP 1-13). Word + Markdown formats.',
    format: 'template-pack',
    url: '/governance/policies',
    apiSource: 'governance-policy',
    emailSequence: 'governance-onboarding',
    audience: ['sme', 'organisation'],
    estimatedReadMinutes: 15,
    tags: ['Free Templates', 'Compliance'],
  },
  {
    id: 'toolkit-waitlist',
    title: 'AI Toolkit Early Access',
    description:
      'Join the waitlist for 7 SME AI mini-apps — pricing helper, BAS draft assistant, hiring filter and more. Launching Q3 2026.',
    format: 'newsletter',
    url: '/toolkit',
    apiSource: 'toolkit-waitlist',
    emailSequence: 'toolkit-launch',
    audience: ['sme'],
    tags: ['Early Access'],
  },
  {
    id: 'agent-pilot',
    title: 'AI Agent Pilot Programme',
    description:
      'Be one of 5 pilot SMEs deploying an AI agent in Q3 2026. Co-funded build, weekly mentor support, full IP retained.',
    format: 'workshop',
    url: '/agents',
    apiSource: 'agent-pilot',
    emailSequence: 'agent-pilot',
    audience: ['sme', 'organisation'],
    tags: ['Pilot', 'Limited spots'],
  },
  {
    id: 'startup-discovery',
    title: 'Founder Discovery Call',
    description:
      'Free 20-minute discovery call for AI founders. Validate the wedge, sharpen positioning, identify the next milestone.',
    format: 'workshop',
    url: '/discovery-call',
    apiSource: 'startup-discovery',
    audience: ['startup'],
    estimatedReadMinutes: 20,
    tags: ['Free', '20 min'],
    featured: true,
  },
  {
    id: 'community-network',
    title: 'AU AI Practitioner Network',
    description:
      'Join 200+ AU SME AI practitioners on Slack and LinkedIn. Monthly meet-ups in Sydney, Melbourne and Brisbane.',
    format: 'newsletter',
    url: '/community/network',
    apiSource: 'community-network',
    audience: ['individual', 'sme', 'organisation'],
    tags: ['Community'],
  },
  {
    id: 'cloud-cost-checklist',
    title: 'AI + Cloud Cost Control Checklist',
    description:
      '14-point checklist to keep your Gemini, OpenAI and AWS spend under control. Includes a budget alert script.',
    format: 'pdf',
    url: '/cloud-advisory',
    apiSource: 'cloud-cost-checklist',
    emailSequence: 'sme-onboarding',
    audience: ['sme', 'organisation'],
    estimatedReadMinutes: 12,
    tags: ['Free PDF', 'Cost Control'],
  },
  {
    id: 'starter-email-course',
    title: '5-Day AI Starter Email Course',
    description:
      'One short email a day for 5 days. By Friday you will have shipped your first useful AI workflow.',
    format: 'email-course',
    url: '/get-started-guide',
    apiSource: 'starter-course',
    emailSequence: 'starter-course',
    audience: ['individual', 'sme'],
    estimatedReadMinutes: 25,
    tags: ['Free Course', '5 Days'],
  },
];

export function getLeadMagnetBySource(source: string): LeadMagnet | undefined {
  return leadMagnets.find((m) => m.apiSource === source);
}

export function getLeadMagnetsForAudience(audience: LeadMagnetAudience): LeadMagnet[] {
  return leadMagnets.filter((m) => m.audience.includes(audience));
}

export function getFeaturedLeadMagnets(): LeadMagnet[] {
  return leadMagnets.filter((m) => m.featured);
}
