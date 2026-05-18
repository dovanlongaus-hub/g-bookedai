export type RoadmapStatus = 'now' | 'next' | 'later' | 'shipped';

export type RoadmapAudience = 'individual' | 'startup' | 'sme' | 'organisation';

export type RoadmapCategory =
  | 'platform'
  | 'content'
  | 'integration'
  | 'pricing'
  | 'community';

export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  audience: RoadmapAudience[];
  estimatedQuarter?: string;
  category: RoadmapCategory;
  shippedDate?: string;
};

export const roadmapItems: RoadmapItem[] = [
  // ───────────────── NOW (active development) ─────────────────
  {
    id: 'ai-readiness-v2',
    title: 'AI Readiness Assessment v2 — Vertex AI scoring',
    description:
      'Re-scoring engine moves from rules-based to Vertex AI gemini-1.5-pro with sector benchmarks and prioritised remediation plan.',
    status: 'now',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q2 2026',
    category: 'platform',
  },
  {
    id: 'toolkit-beta-3',
    title: 'Toolkit beta — first 3 apps live',
    description:
      'Quote Generator, Email Triage, and Meeting Notes ship as guided assistants with audit logs and budget caps.',
    status: 'now',
    audience: ['sme', 'startup'],
    estimatedQuarter: 'Q2 2026',
    category: 'platform',
  },
  {
    id: 'firebase-auth-migration',
    title: 'Firebase Auth migration (Google-first)',
    description:
      'Replacing JWT-only flow with Google Identity Platform (Firebase Auth) for SSO and 2FA. OpenAI OAuth fallback retained.',
    status: 'now',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q2 2026',
    category: 'platform',
  },
  {
    id: 'github-actions-deploy',
    title: 'GitHub Actions Cloud Run deploy on tag',
    description:
      'Tag-driven release pipeline (git tag v1.0.0) builds the standalone repo, pushes to Artifact Registry, and deploys to Cloud Run with WIF. Awaiting operator-supplied GCP secrets.',
    status: 'now',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q2 2026',
    category: 'platform',
  },

  // ───────────────── NEXT (next 90 days) ─────────────────
  {
    id: 'toolkit-7-apps',
    title: 'Toolkit complete — 7 apps live',
    description:
      'Add Proposal Builder, Customer Support Drafts, Scheduling Assistant, and Document Summariser to round out the SME toolkit.',
    status: 'next',
    audience: ['sme', 'startup'],
    estimatedQuarter: 'Q3 2026',
    category: 'platform',
  },
  {
    id: 'agent-pilot-programme',
    title: 'Agent pilot programme open',
    description:
      'Application-only pilot for 10 Australian SMEs to deploy custom agents with named owners, KPIs, and a 90-day evaluation.',
    status: 'next',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q3 2026',
    category: 'community',
  },
  {
    id: 'mentor-ai-notes-share',
    title: 'Mentor session AI notes — auto-share',
    description:
      'Post-session Gemini summaries land in Google Docs and email automatically with consented redaction of sensitive content.',
    status: 'next',
    audience: ['individual', 'sme'],
    estimatedQuarter: 'Q3 2026',
    category: 'integration',
  },
  {
    id: 'mobile-readiness',
    title: 'Mobile-friendly readiness assessment',
    description:
      'Re-flowed assessment UI with progress save, offline-tolerant submission, and shareable result cards.',
    status: 'next',
    audience: ['individual', 'sme'],
    estimatedQuarter: 'Q3 2026',
    category: 'platform',
  },
  {
    id: 'pacific-locales',
    title: 'Pacific locales — NZ and SG storefronts',
    description:
      'Soft launch of New Zealand (en-NZ) and Singapore (en-SG) variants with currency and timezone defaults.',
    status: 'next',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q3 2026',
    category: 'content',
  },
  {
    id: 'phase-2-i18n-server',
    title: 'Phase 2 i18n — server-side locale routing',
    description:
      'Promote vi / zh-CN slots from reserved hreflang entries to live next-intl server-side routes with translated metadata and structured data.',
    status: 'next',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q3 2026',
    category: 'content',
  },

  // ───────────────── LATER (6+ months) ─────────────────
  {
    id: 'multi-locale-routing',
    title: 'Multi-locale full migration (vi / zh routing)',
    description:
      'Full /vi and /zh URL routing with translated metadata, schema, and locale-specific case studies.',
    status: 'later',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q4 2026',
    category: 'content',
  },
  {
    id: 'public-api-marketplace',
    title: 'Public API + partner marketplace',
    description:
      'OpenAPI 3.1 endpoints for Booking, Toolkit, and Agents, plus a curated marketplace for AU integration partners.',
    status: 'later',
    audience: ['organisation'],
    estimatedQuarter: 'Q1 2027',
    category: 'integration',
  },
  {
    id: 'enterprise-sso',
    title: 'Enterprise SSO (SAML 2.0 + SCIM)',
    description:
      'Okta, Microsoft Entra ID, and Google Workspace SSO with SCIM user provisioning and just-in-time roles.',
    status: 'later',
    audience: ['organisation'],
    estimatedQuarter: 'Q1 2027',
    category: 'platform',
  },
  {
    id: 'ai-tutor-academy',
    title: 'AI tutor in Academy',
    description:
      'Conversational tutor for the 40-lesson library, grounded only on lesson transcripts with citations and a feedback loop.',
    status: 'later',
    audience: ['individual', 'sme'],
    estimatedQuarter: 'Q4 2026',
    category: 'content',
  },
  {
    id: 'advanced-bootcamps-certifications',
    title: 'Lesson 15+: Advanced bootcamps + certifications',
    description:
      'Extend the Academy library beyond lesson 14 with advanced bootcamps, capstone projects, and assessed certifications for AU SME practitioners.',
    status: 'later',
    audience: ['individual', 'sme', 'organisation'],
    estimatedQuarter: 'Q4 2026',
    category: 'content',
  },
  {
    id: 'stripe-metered-toolkit',
    title: 'Stripe metered billing for toolkit',
    description:
      'Per-run and per-token metering for Toolkit assistants with monthly GST-inclusive invoicing, budget caps, and admin approval for over-budget spend.',
    status: 'later',
    audience: ['sme', 'organisation'],
    estimatedQuarter: 'Q4 2026',
    category: 'pricing',
  },

  // ───────────────── SHIPPED (recent) ─────────────────
  {
    id: 'ship-ai-readiness',
    title: 'AI Readiness Assessment v1',
    description:
      'Free 12-question assessment with sector benchmarks at /resources/ai-readiness.',
    status: 'shipped',
    audience: ['sme', 'organisation'],
    category: 'platform',
    shippedDate: '2026-05-06',
  },
  {
    id: 'ship-toolkit-landing',
    title: 'Toolkit landing pages',
    description:
      'Public landing pages for the seven AI assistants — pricing, scope, and risk notes per app.',
    status: 'shipped',
    audience: ['sme', 'startup'],
    category: 'platform',
    shippedDate: '2026-05-09',
  },
  {
    id: 'ship-agents-marketplace',
    title: 'Agents marketplace (preview)',
    description:
      'Browseable directory of vertical agents for healthcare, legal, retail, and trades with explainability notes.',
    status: 'shipped',
    audience: ['sme', 'organisation'],
    category: 'platform',
    shippedDate: '2026-05-07',
  },
  {
    id: 'ship-academy-40',
    title: 'AI Academy — 40 free lessons',
    description:
      'Forty free lessons covering prompt fundamentals, governance, and per-industry playbooks.',
    status: 'shipped',
    audience: ['individual', 'sme'],
    category: 'content',
    shippedDate: '2026-05-10',
  },
  {
    id: 'ship-case-studies',
    title: 'Case studies library',
    description:
      'Five Australian SME case studies with measured outcomes and client-quoted lessons learned.',
    status: 'shipped',
    audience: ['sme', 'organisation'],
    category: 'content',
    shippedDate: '2026-05-10',
  },
  {
    id: 'ship-atom-rss-feeds',
    title: 'Atom RSS feeds — blog, changelog, case studies',
    description:
      'Three Atom 1.0 feeds at /blog/rss.xml, /changelog/rss.xml, and /case-studies/rss.xml for subscribers and aggregators.',
    status: 'shipped',
    audience: ['individual', 'sme', 'startup', 'organisation'],
    category: 'content',
    shippedDate: '2026-05-11',
  },
  {
    id: 'ship-avif-images',
    title: 'AVIF image format support',
    description:
      'Image pipeline now serves AVIF with WebP fallback via sharp + libvips 8.17 — 91% smaller hero image transfer size.',
    status: 'shipped',
    audience: ['individual', 'sme', 'startup', 'organisation'],
    category: 'platform',
    shippedDate: '2026-05-11',
  },
  {
    id: 'ship-academy-70',
    title: 'AI Academy — 70 free lessons',
    description:
      'Library expanded to 70 free lessons (14 per path across 5 paths, ~46,000 words total).',
    status: 'shipped',
    audience: ['individual', 'sme'],
    category: 'content',
    shippedDate: '2026-05-12',
  },
];
