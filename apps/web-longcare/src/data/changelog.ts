export type ChangelogCategory =
  | 'platform'
  | 'content'
  | 'integration'
  | 'pricing'
  | 'community'
  | 'fix';

export type ChangelogAudience =
  | 'individual'
  | 'startup'
  | 'sme'
  | 'organisation';

export type ChangelogEntry = {
  date: string; // ISO date
  version: string; // e.g. "2026.05"
  title: string;
  categories: ChangelogCategory[];
  audience?: ChangelogAudience[];
  changes: string[];
};

// Reverse-chronological. Most recent first.
export const changelog: ChangelogEntry[] = [
  {
    date: '2026-05-10',
    version: '2026.05.6',
    title:
      'Sprint 6 — 40 free lessons, 5 case studies, Trust Center launch',
    categories: ['content', 'platform', 'community'],
    audience: ['individual', 'sme', 'organisation'],
    changes: [
      'Academy library expanded to 40 free lessons across prompt design, governance, and industry playbooks.',
      'Five Australian SME case studies published with measured outcomes (revenue, time saved, NPS).',
      'New /trust Trust Center: data residency, sub-processors, training-data stance, compliance posture.',
      'Public roadmap (/roadmap) and service status (/status) pages added for transparency.',
      'Changelog (this page) now lives at /changelog with category filters.',
    ],
  },
  {
    date: '2026-05-09',
    version: '2026.05.5',
    title: 'Sprint 5 — Lessons 5 + 6, six industry blog posts, newsletter pipeline',
    categories: ['content', 'integration'],
    audience: ['individual', 'sme'],
    changes: [
      'Two new Academy lessons published: "Grounding & RAG basics" and "Prompt review checklists".',
      'Six AU industry blog posts shipped: healthcare, legal, retail, hospitality, trades, professional services.',
      'Newsletter pipeline migrated to Mailgun AU with double opt-in and unsubscribe one-click.',
      'Resource hub now exposes downloadable lead magnets behind email gate with audit trail.',
    ],
  },
  {
    date: '2026-05-08',
    version: '2026.05.4',
    title: 'Sprint 4 — i18n proof, 4 industry hero illustrations, comparison page',
    categories: ['content', 'platform'],
    audience: ['sme', 'organisation'],
    changes: [
      'Vietnamese and Mandarin proof-of-concept routes (/vi, /zh) for Mentor and Toolkit pages.',
      'Four new branded SVG hero illustrations: healthcare, hospitality, real estate, trades.',
      'Comparison page (/compare) added — LongCare vs DIY ChatGPT vs offshore consultancies.',
      'Site search index now covers blog, lessons, governance documents, and case studies.',
    ],
  },
  {
    date: '2026-05-07',
    version: '2026.05.3',
    title: 'Sprint 3 — Toolkit, Agents, Solutions launch',
    categories: ['platform', 'content'],
    audience: ['sme', 'startup'],
    changes: [
      'Toolkit landing pages published for the planned seven SME assistants.',
      'Agents marketplace (preview) live at /agents with vertical filters.',
      'New /solutions hub mapping problems → recommended Toolkit and Agent pairings.',
      'Pricing page rewritten: simpler tiers, GST-inclusive, and "no auto-spend" guarantee.',
    ],
  },
  {
    date: '2026-05-06',
    version: '2026.05.2',
    title: 'Sprint 2 — Resources hub, AI Readiness Assessment, Academy',
    categories: ['platform', 'content'],
    audience: ['individual', 'sme', 'organisation'],
    changes: [
      'AI Readiness Assessment (12 questions) launched at /resources/ai-readiness.',
      'AI Academy public skeleton with first 6 free lessons.',
      'Resources hub indexes templates, lead magnets, and lessons in one place.',
      'Governance suite (/governance) ships with policies, risk assessment, responsible-AI framework.',
    ],
  },
  {
    date: '2026-05-05',
    version: '2026.05.1',
    title: 'Sprint 1 — Site stabilisation + 26-task hardening',
    categories: ['platform', 'fix'],
    changes: [
      'Lighthouse score lifted to 96+ across home, services, pricing, and contact pages.',
      'Schema.org coverage extended: Organization, Service, FAQPage, BreadcrumbList, Article.',
      'Sitemap.xml and robots.txt regenerated; canonical URLs enforced site-wide.',
      'Accessibility pass: WCAG 2.2 AA audit completed and 18 issues remediated.',
      'Image pipeline switched to next/image with AVIF + WebP and responsive sizes.',
    ],
  },
  {
    date: '2026-05-04',
    version: '2026.05.0',
    title: 'Site v2.0 — Australian SME AI ecosystem',
    categories: ['platform', 'content', 'community'],
    audience: ['individual', 'sme', 'organisation'],
    changes: [
      'Complete site refresh as an Australian SME AI ecosystem (Mentor + Toolkit + Agents + Academy).',
      'Brand kit refreshed with sky-700 accent, slate neutrals, and four hand-drawn industry illustrations.',
      'Booking flow now displays GST inclusive pricing and bank-transfer fallback alongside Stripe.',
      'Footer and navigation reorganised around four pillars: Learn, Do, Hire, Govern.',
    ],
  },
  {
    date: '2026-04-15',
    version: '2026.04.0',
    title: 'Initial launch — Mentor sessions only',
    categories: ['platform', 'community'],
    audience: ['individual'],
    changes: [
      'longcare.au goes live with the AI Mentor service: 1:1 video sessions via Google Meet.',
      'Stripe AU checkout, Calendar booking, and Gmail confirmations wired end-to-end.',
      'First 50 founding-member discount codes issued to early adopters.',
      'Privacy policy and terms reviewed by Australian counsel before launch.',
    ],
  },
];
