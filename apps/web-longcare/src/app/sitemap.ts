import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://longcare.au';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },

    // Services hub
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/ai-starter`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/services/ai-mentor`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/services/packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Resources hub (P1)
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/resources/ai-readiness`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/resources/roi-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // Academy (P1)
    { url: `${baseUrl}/academy`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/academy/beginner-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/academy/ai-for-business`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/academy/ai-productivity`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/academy/prompt-engineering`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/academy/ai-automation`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/academy/lessons`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/what-is-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/ai-for-sme-overview`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/your-personal-ai-stack`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/prompt-anatomy`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/automation-basics`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/setting-up-tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/sales-and-marketing-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/email-and-meeting-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/prompt-templates-for-sme`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/zapier-vs-make-vs-n8n`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/your-first-10-prompts`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/ai-for-everyday-tasks`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/customer-service-ai-playbook`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/finance-and-admin-automation`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/document-and-research-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/spreadsheet-and-data-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/few-shot-examples`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/chain-of-thought`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/building-your-first-ai-workflow`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/ai-error-handling-and-monitoring`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/image-and-voice-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/ai-privacy-basics`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/marketing-content-engine`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/operations-and-supply`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/voice-and-dictation`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/ai-for-coding-and-tech`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/prompt-libraries-and-versioning`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/system-prompts-and-personas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/multi-step-agent-workflows`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/cost-and-rate-limit-management`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/your-first-ai-workflow`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/ai-for-australians`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/team-rollout-and-change-management`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/ai-vendor-selection`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/ai-for-decisions`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/keeping-up-with-ai-changes`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/tool-use-and-function-calling`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/rag-and-grounding`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/monitoring-and-observability`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/ai-automation-case-studies-au`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/working-with-ai-images`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/ai-pitfalls-and-fixes`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/measuring-team-productivity`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/ai-procurement-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/ai-for-learning-new-skills`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/personal-ai-assistant-build`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/structured-output-with-zod`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/evaluating-prompt-quality`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/event-driven-workflows`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/scaling-from-pilot-to-production`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/your-30-day-ai-routine`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/ai-capstone-mini-project`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/ai-budget-and-stakeholder-buy-in`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/ai-roi-business-case`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/ai-for-research-deep-mode`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/personal-okrs-with-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/prompt-debugging-checklist`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/multimodal-prompting-mastery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/security-and-secrets`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/disaster-recovery-and-rollback`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/lead-magnets`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },

    // Lessons 7+8 (sprint 6)
    { url: `${baseUrl}/academy/beginner-ai/lessons/building-your-ai-habit`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/beginner-ai/lessons/ai-myths-and-realities`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/hr-and-people-ops`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-for-business/lessons/measuring-ai-roi`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/ai-for-research-and-learning`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-productivity/lessons/personal-knowledge-base`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/output-validation-patterns`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/prompt-engineering/lessons/multimodal-prompting`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/data-pipelines-with-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/academy/ai-automation/lessons/integration-with-existing-tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Case studies + transparency pages (sprint 6)
    { url: `${baseUrl}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/case-studies/cygnus-logistics-cuts-monthly-admin`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/case-studies/techflow-ai-customer-service-saas`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/case-studies/northwind-marketing-strategy-audit`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/case-studies/bendigo-medical-practice-medicare-claims`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/case-studies/surry-hills-cafe-multilingual-menus`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/trust`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/roadmap`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/status`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/changelog`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },

    // Solutions (P2 preview)
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/solutions/healthcare`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/solutions/retail`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/solutions/hospitality`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/solutions/real-estate`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/solutions/trades`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/solutions/education`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/solutions/professional-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // Governance (P4 preview)
    { url: `${baseUrl}/governance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/governance/policies`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/governance/risk-assessment`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/governance/responsible-ai`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Community (P4 preview)
    { url: `${baseUrl}/community`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/community/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${baseUrl}/community/workshops`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${baseUrl}/community/bootcamps`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/community/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/community/network`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // Toolkit (P2)
    { url: `${baseUrl}/toolkit`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/toolkit/email-assistant`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/toolkit/document-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/toolkit/proposal-writer`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/toolkit/meeting-assistant`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/toolkit/customer-support`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/toolkit/social-media`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/toolkit/hr-assistant`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // Agents Marketplace (P3)
    { url: `${baseUrl}/agents`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/agents/business`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/agents/industry`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/agents/automation-packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/agents/deployment-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/agents/admin`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/hr`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/customer-service`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/sales`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/scheduling`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/marketing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/healthcare`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/property`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/retail`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/hospitality`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/recruitment`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/agents/education`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Startup advisory (V2.0)
    { url: `${baseUrl}/startup`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/startup/mentorship`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/startup/founder-advisory`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/startup/technical-mentorship`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/startup/innovation-strategy`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // Cloud & Infrastructure Advisory (V2.0)
    { url: `${baseUrl}/cloud-advisory`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/cloud-advisory/architecture-design`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/cloud-advisory/google-cloud`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/cloud-advisory/migration`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/cloud-advisory/scalability`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // Audience landings (V2.0)
    { url: `${baseUrl}/for`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/individuals`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/startups`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/smes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/organisations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Comparison + onboarding tools
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/discovery-call`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/get-started-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Support / company
    { url: `${baseUrl}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/referral`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogSlugs = [
    'getting-started-with-ai',
    'prompt-engineering-basics',
    'ai-tools-for-small-business',
    'chatgpt-vs-gemini',
    'ai-automation-for-sme',
    'ai-readiness-assessment-guide',
    'ai-for-australian-tradies',
    'ai-and-the-australian-privacy-act',
    'gemini-vs-claude-2026',
    'ai-readiness-by-industry-australia',
    'ai-for-australian-cafes-and-restaurants',
    'building-an-ai-readiness-roadmap',
    'prompt-injection-and-ai-security-for-sme',
    'cost-of-ai-tools-for-australian-business-2026',
    'ai-for-australian-real-estate-agents',
    'mentor-vs-course-vs-tool-which-do-you-need',
  ];

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...blogPages];
}
