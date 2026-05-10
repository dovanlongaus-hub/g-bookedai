/**
 * Pre-computed search corpus for client-side fuzzy search.
 *
 * Total: ~80 items covering all routes from sitemap.ts.
 * Updated by hand — keep in sync when adding new pages.
 *
 * Categories: Service | Agent | Toolkit | Solution | Academy | Resource |
 *             Governance | Community | Blog | Page
 */

export type SearchCategory =
  | 'Service'
  | 'Agent'
  | 'Toolkit'
  | 'Solution'
  | 'Academy'
  | 'Resource'
  | 'Governance'
  | 'Community'
  | 'Blog'
  | 'Page';

export type SearchItem = {
  title: string;
  description: string;
  url: string;
  category: SearchCategory;
  keywords: string[];
  industry?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
};

export const searchIndex: SearchItem[] = [
  // ─────────────────── Pages ───────────────────
  {
    title: 'LongCare AU — AI Mentor & Learning',
    description:
      'Book AI mentoring, deploy industry agents, and learn AI for Australian SMEs and professionals.',
    url: '/',
    category: 'Page',
    keywords: ['home', 'longcare', 'AI mentor', 'AI Australia', 'AI training', 'SME'],
  },
  {
    title: 'About LongCare',
    description:
      'Our mission, methodology, and the team behind LongCare AU — Dr. Long Do and the AI learning assistant.',
    url: '/about',
    category: 'Page',
    keywords: ['about', 'mission', 'team', 'Dr Long Do', 'methodology', 'company'],
  },
  {
    title: 'Contact LongCare',
    description: 'Email, WhatsApp, and AI chat support for AI mentoring questions and bookings.',
    url: '/contact',
    category: 'Page',
    keywords: ['contact', 'support', 'whatsapp', 'email', 'help', 'enquiry'],
  },
  {
    title: 'FAQ — Frequently Asked Questions',
    description:
      'Answers about AI mentor sessions, payments, refunds, Google Meet, and how LongCare works.',
    url: '/faq',
    category: 'Page',
    keywords: ['faq', 'questions', 'answers', 'help', 'support', 'refund', 'payment'],
  },
  {
    title: 'How It Works — Booking Guide',
    description: '6-step guide from your first booking through session notes and follow-up actions.',
    url: '/how-it-works',
    category: 'Page',
    keywords: ['how it works', 'guide', 'process', 'workflow', 'booking', 'steps'],
  },
  {
    title: 'Beginner Guide to AI',
    description:
      'A practical starter guide explaining what AI is, why it matters for Australian businesses, and how to begin.',
    url: '/guide',
    category: 'Page',
    keywords: ['guide', 'beginner', 'AI basics', 'introduction', 'learn AI', 'starter'],
  },
  {
    title: 'Referral Program',
    description: 'Refer a friend or colleague and earn credit towards your next AI mentoring session.',
    url: '/referral',
    category: 'Page',
    keywords: ['referral', 'invite', 'rewards', 'credit', 'partner', 'affiliate'],
  },
  {
    title: 'Customer Testimonials',
    description: 'Real stories from Australian SMEs and professionals who transformed with LongCare AI mentoring.',
    url: '/testimonials',
    category: 'Page',
    keywords: ['testimonials', 'reviews', 'case studies', 'stories', 'success', 'feedback'],
  },
  {
    title: 'Privacy Policy',
    description:
      'How we collect, use, and protect your data — Australian Privacy Act (APP 1–13) compliant.',
    url: '/privacy',
    category: 'Page',
    keywords: ['privacy', 'data', 'GDPR', 'APP', 'Australian Privacy Act', 'compliance'],
  },
  {
    title: 'Terms of Service',
    description: 'Booking policy, payment terms, cancellation, refunds, and legal liability for LongCare AU.',
    url: '/terms',
    category: 'Page',
    keywords: ['terms', 'service', 'legal', 'policy', 'booking terms', 'cancellation'],
  },

  // ─────────────────── Services ───────────────────
  {
    title: 'AI Services Hub',
    description: 'Browse all AI mentoring services — Starter sessions, deep-dive Mentor hours, and packages.',
    url: '/services',
    category: 'Service',
    keywords: ['services', 'mentoring', 'AI coaching', 'plans', 'pricing', 'all services'],
  },
  {
    title: '30-Min AI Starter Session — $29',
    description:
      'Quick 30-minute introduction to AI tools, prompts, and workflows — perfect first step for SMEs.',
    url: '/services/ai-starter',
    category: 'Service',
    keywords: ['starter', '30 min', '$29', 'beginner', 'introduction', 'first session', 'cheap'],
  },
  {
    title: '1-Hour AI Mentor Session — $99',
    description:
      'Personalised 1-hour deep-dive into your AI workflow, prompts, and automation roadmap via Google Meet.',
    url: '/services/ai-mentor',
    category: 'Service',
    keywords: ['mentor', '1 hour', '$99', 'coaching', 'deep dive', 'Google Meet', 'personalised'],
  },
  {
    title: 'AI Mentoring Packages — 5 & 10 Sessions',
    description:
      'Multi-session bundles for ongoing AI transformation — 5-session ($450) and 10-session ($850) plans.',
    url: '/services/packages',
    category: 'Service',
    keywords: ['packages', 'bundle', '5 sessions', '10 sessions', 'discount', '$450', '$850'],
  },

  // ─────────────────── Resources ───────────────────
  {
    title: 'Resources Hub',
    description: 'Free AI tools, calculators, readiness checks, and downloads for Australian businesses.',
    url: '/resources',
    category: 'Resource',
    keywords: ['resources', 'tools', 'free', 'downloads', 'guides', 'calculators'],
  },
  {
    title: 'AI Readiness Assessment',
    description: 'Free 10-minute assessment to score your business AI readiness across 5 dimensions.',
    url: '/resources/ai-readiness',
    category: 'Resource',
    keywords: ['readiness', 'assessment', 'quiz', 'score', 'maturity', 'audit', 'free'],
  },
  {
    title: 'AI ROI Calculator',
    description: 'Calculate the ROI of AI automation for your business — hours saved and dollars returned.',
    url: '/resources/roi-calculator',
    category: 'Resource',
    keywords: ['ROI', 'calculator', 'return on investment', 'savings', 'value', 'business case'],
  },

  // ─────────────────── Academy ───────────────────
  {
    title: 'LongCare Academy',
    description:
      'Self-paced AI learning paths for beginners through advanced — from prompts to enterprise automation.',
    url: '/academy',
    category: 'Academy',
    keywords: ['academy', 'courses', 'learning', 'training', 'self paced', 'AI school'],
  },
  {
    title: 'Beginner AI Path',
    description: 'Start from zero — learn AI fundamentals, ChatGPT, and your first useful prompts.',
    url: '/academy/beginner-ai',
    category: 'Academy',
    keywords: ['beginner', 'fundamentals', 'ChatGPT', 'first steps', 'newcomers', 'AI 101'],
    difficulty: 'Beginner',
  },
  {
    title: 'AI for Business Path',
    description: 'Apply AI to common SME workflows — sales, marketing, ops, and customer service.',
    url: '/academy/ai-for-business',
    category: 'Academy',
    keywords: ['business', 'SME', 'workflows', 'marketing', 'sales', 'operations'],
    difficulty: 'Intermediate',
  },
  {
    title: 'AI Productivity Path',
    description: 'Cut admin time by 40% with AI productivity workflows for emails, docs, and meetings.',
    url: '/academy/ai-productivity',
    category: 'Academy',
    keywords: ['productivity', 'time saving', 'workflows', 'email', 'docs', 'meetings'],
    difficulty: 'Intermediate',
  },
  {
    title: 'Prompt Engineering Path',
    description: 'Master prompt engineering — from basic prompts to advanced multi-step reasoning chains.',
    url: '/academy/prompt-engineering',
    category: 'Academy',
    keywords: ['prompt engineering', 'prompts', 'CTFC', 'reasoning', 'advanced prompts', 'LLM'],
    difficulty: 'Advanced',
  },
  {
    title: 'AI Automation Path',
    description: 'Build end-to-end AI automations connecting tools, agents, and approval workflows.',
    url: '/academy/ai-automation',
    category: 'Academy',
    keywords: ['automation', 'agents', 'workflows', 'integration', 'no-code', 'enterprise AI'],
    difficulty: 'Advanced',
  },

  // ─────────────────── Solutions (Industry) ───────────────────
  {
    title: 'Industry Solutions',
    description: 'AI playbooks tailored to Australian industries — healthcare, retail, hospitality, trades, and more.',
    url: '/solutions',
    category: 'Solution',
    keywords: ['solutions', 'industries', 'verticals', 'use cases', 'playbooks'],
  },
  {
    title: 'Healthcare AI Solution',
    description: 'AI for clinics and allied health — patient intake, scheduling, notes, and compliance support.',
    url: '/solutions/healthcare',
    category: 'Solution',
    industry: 'Healthcare',
    keywords: ['healthcare', 'clinics', 'medical', 'allied health', 'patient', 'GP', 'aged care'],
  },
  {
    title: 'Retail AI Solution',
    description: 'AI for retail SMEs — product copy, inventory insights, customer chat, and e-commerce automation.',
    url: '/solutions/retail',
    category: 'Solution',
    industry: 'Retail',
    keywords: ['retail', 'shop', 'e-commerce', 'inventory', 'product copy', 'Shopify'],
  },
  {
    title: 'Hospitality AI Solution',
    description: 'AI for cafes, restaurants, and hotels — bookings, reviews, menu writing, and guest service.',
    url: '/solutions/hospitality',
    category: 'Solution',
    industry: 'Hospitality',
    keywords: ['hospitality', 'restaurants', 'cafes', 'hotels', 'bookings', 'reviews', 'menu'],
  },
  {
    title: 'Real Estate AI Solution',
    description: 'AI for agents and property managers — listings, comms, contracts, and lead qualification.',
    url: '/solutions/real-estate',
    category: 'Solution',
    industry: 'Real Estate',
    keywords: ['real estate', 'property', 'agents', 'listings', 'rental', 'tenants', 'sales'],
  },
  {
    title: 'Trades & Construction AI Solution',
    description: 'AI for tradies and construction SMEs — quotes, invoicing, scheduling, and SOP capture.',
    url: '/solutions/trades',
    category: 'Solution',
    industry: 'Trades',
    keywords: ['trades', 'tradies', 'construction', 'plumbers', 'electricians', 'quotes', 'jobs'],
  },
  {
    title: 'Education AI Solution',
    description: 'AI for tutors, schools, and RTOs — lesson planning, marking, and learner support.',
    url: '/solutions/education',
    category: 'Solution',
    industry: 'Education',
    keywords: ['education', 'teachers', 'tutors', 'schools', 'RTO', 'learning', 'marking'],
  },
  {
    title: 'Professional Services AI Solution',
    description: 'AI for accountants, lawyers, and consultants — research, drafting, and client comms.',
    url: '/solutions/professional-services',
    category: 'Solution',
    industry: 'Professional Services',
    keywords: ['professional services', 'accountants', 'lawyers', 'consultants', 'drafting', 'legal'],
  },

  // ─────────────────── Toolkit ───────────────────
  {
    title: 'AI Toolkit',
    description: 'Ready-to-use AI tools for everyday business tasks — emails, docs, proposals, and more.',
    url: '/toolkit',
    category: 'Toolkit',
    keywords: ['toolkit', 'tools', 'apps', 'utilities', 'productivity'],
  },
  {
    title: 'Email Assistant',
    description: 'AI email assistant — draft, reply, and clean up your inbox 5× faster.',
    url: '/toolkit/email-assistant',
    category: 'Toolkit',
    keywords: ['email', 'inbox', 'reply', 'draft', 'gmail', 'outlook'],
  },
  {
    title: 'Document Generator',
    description: 'Generate SOPs, policies, briefs, and reports from a few prompts — branded and editable.',
    url: '/toolkit/document-generator',
    category: 'Toolkit',
    keywords: ['document', 'generator', 'SOP', 'policy', 'reports', 'docs', 'templates'],
  },
  {
    title: 'Proposal Writer',
    description: 'Win more work — generate professional client proposals in minutes with AI.',
    url: '/toolkit/proposal-writer',
    category: 'Toolkit',
    keywords: ['proposal', 'quote', 'sales', 'client', 'pitch', 'tender', 'rfp'],
  },
  {
    title: 'Meeting Assistant',
    description: 'Auto-summarise meetings, capture action items, and send recap emails — works with Google Meet.',
    url: '/toolkit/meeting-assistant',
    category: 'Toolkit',
    keywords: ['meeting', 'notes', 'transcription', 'summary', 'Google Meet', 'Zoom', 'minutes'],
  },
  {
    title: 'Customer Support Assistant',
    description: 'AI customer support — handle tier-1 enquiries, FAQs, and ticket triage 24/7.',
    url: '/toolkit/customer-support',
    category: 'Toolkit',
    keywords: ['customer support', 'helpdesk', 'tickets', 'FAQ', 'chatbot', 'service'],
  },
  {
    title: 'Social Media Assistant',
    description: 'Generate, schedule, and analyse social posts across LinkedIn, Instagram, Facebook, and X.',
    url: '/toolkit/social-media',
    category: 'Toolkit',
    keywords: ['social media', 'LinkedIn', 'Instagram', 'Facebook', 'posts', 'content', 'X'],
  },
  {
    title: 'HR Assistant',
    description: 'AI HR helper — job descriptions, screening, onboarding docs, and Australian Fair Work-aware advice.',
    url: '/toolkit/hr-assistant',
    category: 'Toolkit',
    keywords: ['HR', 'human resources', 'recruitment', 'jobs', 'onboarding', 'Fair Work'],
  },

  // ─────────────────── Agents ───────────────────
  {
    title: 'AI Agents Marketplace',
    description: 'Browse and deploy ready-made AI agents for your business — admin, sales, support, and more.',
    url: '/agents',
    category: 'Agent',
    keywords: ['agents', 'marketplace', 'AI agents', 'deploy', 'autonomous'],
  },
  {
    title: 'Business Agents',
    description: 'Cross-functional AI agents for SME operations — admin, sales, scheduling, and reporting.',
    url: '/agents/business',
    category: 'Agent',
    keywords: ['business', 'operations', 'general', 'cross-functional', 'SME'],
  },
  {
    title: 'Industry Agents',
    description: 'Vertical-specific AI agents tuned for healthcare, property, retail, and more.',
    url: '/agents/industry',
    category: 'Agent',
    keywords: ['industry', 'vertical', 'specialised', 'industry-specific'],
  },
  {
    title: 'Automation Packages',
    description: 'Pre-built multi-agent automation packages with workflow templates and integrations.',
    url: '/agents/automation-packages',
    category: 'Agent',
    keywords: ['automation', 'packages', 'bundle', 'workflows', 'multi-agent'],
  },
  {
    title: 'Agent Deployment Services',
    description: 'White-glove agent deployment — integration, training, and ongoing optimisation.',
    url: '/agents/deployment-services',
    category: 'Agent',
    keywords: ['deployment', 'managed', 'white glove', 'consulting', 'integration', 'service'],
  },
  {
    title: 'Admin Agent',
    description: 'AI admin assistant — handles scheduling, email triage, and routine office tasks.',
    url: '/agents/admin',
    category: 'Agent',
    keywords: ['admin', 'office', 'EA', 'executive assistant', 'scheduling', 'admin support'],
  },
  {
    title: 'HR Agent',
    description: 'AI HR agent — recruitment, onboarding, leave queries, and policy guidance.',
    url: '/agents/hr',
    category: 'Agent',
    keywords: ['HR', 'recruitment', 'people', 'onboarding', 'leave', 'employee'],
  },
  {
    title: 'Customer Service Agent',
    description: 'AI customer service agent — 24/7 enquiry handling, ticket routing, and CSAT tracking.',
    url: '/agents/customer-service',
    category: 'Agent',
    keywords: ['customer service', 'support', 'helpdesk', 'tickets', '24/7', 'CSAT'],
  },
  {
    title: 'Sales Agent',
    description: 'AI sales agent — lead qualification, follow-ups, proposal drafts, and CRM hygiene.',
    url: '/agents/sales',
    category: 'Agent',
    keywords: ['sales', 'leads', 'CRM', 'pipeline', 'follow-up', 'qualification'],
  },
  {
    title: 'Scheduling Agent',
    description: 'AI scheduling agent — books, reschedules, and confirms appointments across calendars.',
    url: '/agents/scheduling',
    category: 'Agent',
    keywords: ['scheduling', 'calendar', 'bookings', 'appointments', 'reminders'],
  },
  {
    title: 'Marketing Agent',
    description: 'AI marketing agent — multi-channel content, campaigns, and 8-channel social distribution.',
    url: '/agents/marketing',
    category: 'Agent',
    keywords: ['marketing', 'content', 'campaigns', 'social', 'SEO', 'newsletters'],
  },
  {
    title: 'Healthcare Agent',
    description: 'AI agent for clinics — patient intake, appointment reminders, and clinical note assistance.',
    url: '/agents/healthcare',
    category: 'Agent',
    industry: 'Healthcare',
    keywords: ['healthcare', 'clinical', 'patient', 'GP', 'medical', 'aged care', 'allied health'],
  },
  {
    title: 'Property Agent',
    description: 'AI agent for real estate — listing copy, tenant comms, contract checks, and lead nurture.',
    url: '/agents/property',
    category: 'Agent',
    industry: 'Real Estate',
    keywords: ['property', 'real estate', 'listings', 'tenant', 'contracts', 'leasing'],
  },
  {
    title: 'Retail Agent',
    description: 'AI agent for retail SMEs — product copy, customer chat, inventory alerts, and reviews.',
    url: '/agents/retail',
    category: 'Agent',
    industry: 'Retail',
    keywords: ['retail', 'shop', 'e-commerce', 'product', 'inventory', 'reviews'],
  },
  {
    title: 'Hospitality Agent',
    description: 'AI agent for cafes, restaurants, and hotels — bookings, menu copy, and guest replies.',
    url: '/agents/hospitality',
    category: 'Agent',
    industry: 'Hospitality',
    keywords: ['hospitality', 'restaurants', 'cafes', 'hotels', 'guests', 'bookings'],
  },
  {
    title: 'Recruitment Agent',
    description: 'AI agent for recruiters — sourcing, JD writing, candidate screening, and interview prep.',
    url: '/agents/recruitment',
    category: 'Agent',
    keywords: ['recruitment', 'hiring', 'recruiter', 'screening', 'sourcing', 'candidates', 'JD'],
  },
  {
    title: 'Education Agent',
    description: 'AI agent for tutors, schools, and RTOs — lesson plans, marking, and learner Q&A.',
    url: '/agents/education',
    category: 'Agent',
    industry: 'Education',
    keywords: ['education', 'teachers', 'tutors', 'lesson plans', 'marking', 'students'],
  },

  // ─────────────────── Governance ───────────────────
  {
    title: 'AI Governance Hub',
    description: 'Australian AI governance — policies, risk, and responsible AI frameworks for SMEs.',
    url: '/governance',
    category: 'Governance',
    keywords: ['governance', 'compliance', 'AI policy', 'responsible AI', 'risk', 'Australia'],
  },
  {
    title: 'AI Policies & Guidelines',
    description: 'Templates and starters for AI usage policies, acceptable use, and data handling.',
    url: '/governance/policies',
    category: 'Governance',
    keywords: ['policies', 'AUP', 'guidelines', 'templates', 'data handling', 'rules'],
  },
  {
    title: 'AI Risk Assessment',
    description: 'Identify and mitigate AI risks — bias, privacy, hallucination, and operational impact.',
    url: '/governance/risk-assessment',
    category: 'Governance',
    keywords: ['risk', 'assessment', 'audit', 'bias', 'privacy', 'hallucination', 'mitigation'],
  },
  {
    title: 'Responsible AI Framework',
    description: 'Build AI responsibly — transparency, explainability, fairness, and human oversight.',
    url: '/governance/responsible-ai',
    category: 'Governance',
    keywords: ['responsible AI', 'ethics', 'fairness', 'transparency', 'oversight', 'trust'],
  },

  // ─────────────────── Community ───────────────────
  {
    title: 'LongCare Community',
    description: 'Join the Australian AI practitioner community — events, workshops, partners, and network.',
    url: '/community',
    category: 'Community',
    keywords: ['community', 'network', 'practitioners', 'meetup', 'group'],
  },
  {
    title: 'Community Events',
    description: 'Upcoming AI events, webinars, and meet-ups across Australia — virtual and in-person.',
    url: '/community/events',
    category: 'Community',
    keywords: ['events', 'webinars', 'meetups', 'conferences', 'calendar'],
  },
  {
    title: 'AI Workshops',
    description: 'Hands-on AI workshops — small-group sessions on prompts, agents, and automation.',
    url: '/community/workshops',
    category: 'Community',
    keywords: ['workshops', 'training', 'hands-on', 'small group', 'practical'],
  },
  {
    title: 'AI Bootcamps',
    description: 'Intensive multi-day AI bootcamps — go from beginner to deploying agents in one week.',
    url: '/community/bootcamps',
    category: 'Community',
    keywords: ['bootcamps', 'intensive', 'multi-day', 'training', 'fast track'],
  },
  {
    title: 'Partner Network',
    description: 'Our partner ecosystem — implementation partners, technology providers, and resellers.',
    url: '/community/partners',
    category: 'Community',
    keywords: ['partners', 'ecosystem', 'resellers', 'implementation', 'channel'],
  },
  {
    title: 'Practitioner Network',
    description: 'Connect with Australian AI practitioners — directory, intros, and project collaboration.',
    url: '/community/network',
    category: 'Community',
    keywords: ['network', 'directory', 'practitioners', 'connect', 'community'],
  },

  // ─────────────────── Blog ───────────────────
  {
    title: 'LongCare Blog',
    description: 'Latest articles on AI for Australian SMEs, prompt engineering, and automation playbooks.',
    url: '/blog',
    category: 'Blog',
    keywords: ['blog', 'articles', 'insights', 'news', 'guides'],
  },
  {
    title: 'Getting Started with AI',
    description: 'A beginner-friendly guide to AI tools, prompts, and your first useful workflow.',
    url: '/blog/getting-started-with-ai',
    category: 'Blog',
    keywords: ['beginner', 'getting started', 'introduction', 'AI 101', 'first steps'],
  },
  {
    title: 'Prompt Engineering Basics',
    description: 'Learn the CTFC framework for writing better prompts that get reliable AI outputs.',
    url: '/blog/prompt-engineering-basics',
    category: 'Blog',
    keywords: ['prompts', 'CTFC', 'framework', 'prompt engineering', 'basics'],
  },
  {
    title: 'AI Tools for Small Business',
    description: 'A curated list of AI tools that deliver real ROI for Australian small businesses.',
    url: '/blog/ai-tools-for-small-business',
    category: 'Blog',
    keywords: ['tools', 'small business', 'SME', 'apps', 'recommended', 'ROI'],
  },
  {
    title: 'ChatGPT vs Gemini — Which Is Best?',
    description: 'A practical 2026 comparison of ChatGPT and Google Gemini for Australian SMEs.',
    url: '/blog/chatgpt-vs-gemini',
    category: 'Blog',
    keywords: ['ChatGPT', 'Gemini', 'comparison', 'OpenAI', 'Google', 'review'],
  },
  {
    title: 'AI Automation for SMEs',
    description: 'How small Australian businesses use AI agents and automations to save 15+ hours per week.',
    url: '/blog/ai-automation-for-sme',
    category: 'Blog',
    keywords: ['automation', 'SME', 'agents', 'time saving', 'workflows'],
  },

  // ─────────────────── High-value extras / synonyms ───────────────────
  {
    title: 'Pricing & Plans',
    description: 'Compare AI mentor pricing — Starter, Mentor hour, and 5/10-session packages with Australian GST.',
    url: '/services',
    category: 'Service',
    keywords: ['pricing', 'plans', 'cost', 'price', 'how much', 'GST', '$29', '$99', '$450'],
  },
  {
    title: 'Book an AI Session',
    description: 'Book a Starter or Mentor session — Google Meet, Australian timezone, instant calendar invite.',
    url: '/services/ai-mentor',
    category: 'Service',
    keywords: ['book', 'booking', 'schedule', 'appointment', 'reserve', 'Google Meet'],
  },
  {
    title: 'AI Chat Assistant',
    description: 'Chat with our 24/7 AI assistant — answers questions, recommends services, and helps you book.',
    url: '/contact',
    category: 'Page',
    keywords: ['chat', 'AI assistant', 'chatbot', 'help', '24/7', 'instant'],
  },
];
