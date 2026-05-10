// Auto-response messages keyed by lead-magnet `apiSource`.
// `successTitle` and `successMessage` are shown in the UI immediately after
// submission. `emailSubject` and `emailBodyMarkdown` are the first email sent
// by the upstream notification service (in addition to the matched sequence).
//
// Each `apiSource` here should correspond to a `LeadMagnet.apiSource` in
// `lead-magnets.ts`.

export type AutoResponse = {
  apiSource: string;
  successTitle: string;
  successMessage: string;
  emailSubject?: string;
  emailBodyMarkdown?: string;
};

export const autoResponses: AutoResponse[] = [
  {
    apiSource: 'newsletter',
    successTitle: "You're in.",
    successMessage:
      'Check your inbox for a confirmation. The first weekly digest lands Monday morning Sydney time.',
    emailSubject: 'Welcome to the LongCare AU newsletter',
    emailBodyMarkdown: `# G'day,

Thanks for joining. Each Monday you will receive five things worth your attention, one Australian case study, and one tool we tested honestly.

If the newsletter is not for you, the unsubscribe link is at the bottom of every email.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'quiz-lead',
    successTitle: 'Score on its way.',
    successMessage:
      'Your AI Readiness Score and tailored next steps are landing in your inbox now. Check spam if it is not there in five minutes.',
    emailSubject: 'Your AI Readiness Score',
    emailBodyMarkdown: `# Your readiness score is in.

Open the attached PDF for your full report. The "Start here" recommendation at the top is the highest-leverage next step for someone at your readiness level.

I will follow up in two days with a specific play to consider.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'guide-lead',
    successTitle: 'Guide on the way.',
    successMessage:
      'The 24-page SME AI Guide PDF is in your inbox. Chapter 3 — the 30-day rollout plan — is where most readers start.',
    emailSubject: 'Your SME AI Guide is ready',
    emailBodyMarkdown: `# Your guide is ready.

The 24-page PDF is attached. If your inbox blocks attachments, read it online at https://longcare.au/guide.

I will send a short email every few days for the next three weeks with one practical idea each time.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'roi-calculator',
    successTitle: 'Estimate emailed.',
    successMessage:
      'A copy of your ROI estimate plus the underlying assumptions is in your inbox. No follow-up unless you ask for one.',
    emailSubject: 'Your AI ROI estimate',
    emailBodyMarkdown: `# Your ROI estimate.

The PDF copy of your estimate is attached, with the assumptions and inputs spelled out so your finance team can sense-check it.

If a number looks off, the calculator at https://longcare.au/resources/roi-calculator lets you re-run with different inputs.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'prompt-templates',
    successTitle: 'Templates ready.',
    successMessage:
      'The 8 SME prompt templates are in your inbox as a single Markdown file. Drop them straight into your AI tool of choice.',
    emailSubject: 'Your SME Prompt Template Pack',
    emailBodyMarkdown: `# 8 prompts, ready to use.

The Markdown file is attached. Each prompt has a "what it does", an "inputs you need", and a worked example.

Most readers start with the customer email triage prompt — it pays back fastest.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'governance-policy',
    successTitle: 'Policy templates sent.',
    successMessage:
      'The 6 AI policy templates are in your inbox in Word and Markdown formats. Follow the customisation order in the email.',
    emailSubject: 'Your AI policy templates are ready',
    emailBodyMarkdown: `# Templates ready.

Six policy templates, aligned to APP 1-13, attached as Word and Markdown.

Customise in this order: Acceptable Use, Data Handling, Vendor Assessment, Incident Response, Training, Audit Cadence. About 30 minutes total.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'toolkit-waitlist',
    successTitle: 'On the waitlist.',
    successMessage:
      'You will get the private link two weeks before public launch and 60 days free at launch. Progress notes every 7–10 days until then.',
    emailSubject: "You're on the AI Toolkit waitlist",
    emailBodyMarkdown: `# Welcome to the waitlist.

You are now in the queue for the LongCare AI Toolkit launching Q3 2026.

Waitlist members get the private link two weeks early plus 60 days free at launch. I will send short progress notes until then.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'agent-pilot',
    successTitle: 'Application received.',
    successMessage:
      'We will be in touch within 3 business days. To move up the queue, reply to the confirmation email with your top workflow and its current cost.',
    emailSubject: 'Agent Pilot application received',
    emailBodyMarkdown: `# Thanks for applying.

Five spots, lots of applicants. We will respond within 3 business days about whether your application moves to discovery.

To strengthen your application, reply with: (1) the workflow you would automate first, (2) what it costs you per month today, (3) who would own it inside your business.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'startup-discovery',
    successTitle: 'Call request received.',
    successMessage:
      'You will get a calendar link in the next email. Pick any 20-minute slot that works in your time zone.',
    emailSubject: 'Pick a time for your founder discovery call',
    emailBodyMarkdown: `# Booking link inside.

Pick any 20-minute slot that suits — the link is in this email.

Before the call: be ready to share your wedge in one sentence and the next milestone you are aiming for.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'community-network',
    successTitle: 'Welcome to the network.',
    successMessage:
      'Your Slack invite and LinkedIn group link are in your inbox. The next AU meet-up date is in there too.',
    emailSubject: 'Welcome to the AU AI Practitioner Network',
    emailBodyMarkdown: `# You're in.

The Slack invite link is below. The LinkedIn group is private — admit takes about 24 hours.

Sydney, Melbourne and Brisbane meet-ups happen monthly. Next dates are pinned in #announcements.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'cloud-cost-checklist',
    successTitle: 'Checklist sent.',
    successMessage:
      'The 14-point checklist plus the budget alert script is in your inbox. Most teams find at least three changes that pay back within a month.',
    emailSubject: 'Your AI + Cloud Cost Control Checklist',
    emailBodyMarkdown: `# Checklist attached.

14 points, ranked by impact. Items 1-4 typically move the needle most for SME spend.

The budget-alert script is included as a separate file — drop it into Cloud Run or Lambda and you will get a Slack ping when daily spend crosses your threshold.

Cheers,
Dr. Long Do`,
  },
  {
    apiSource: 'starter-course',
    successTitle: 'Day 1 sent.',
    successMessage:
      'The first email is in your inbox now. Five days, ten minutes each. By Friday you will have shipped one useful AI workflow.',
    emailSubject: 'Day 1 — Pick your one workflow',
    emailBodyMarkdown: `# Day 1: pick your one workflow.

Welcome to the 5-day starter course. Each email takes 10 minutes.

Today's task: pick the one workflow you want to automate. Use the volume + repetitive + time-sensitive filter in the email.

Cheers,
Dr. Long Do`,
  },
  // ---------------------------------------------------------------------------
  // Generic fallbacks for sources we have not catalogued yet. These ensure
  // the API never returns an empty response when an unknown source is posted.
  // ---------------------------------------------------------------------------
  {
    apiSource: 'exit-intent',
    successTitle: 'Saved your spot.',
    successMessage:
      'Thanks for sticking around. Your guide is on the way and the next newsletter lands Monday.',
  },
  {
    apiSource: 'social-proof',
    successTitle: 'Welcome aboard.',
    successMessage:
      'You will receive a welcome email shortly. Reply any time — every email reaches a real person.',
  },
  {
    apiSource: 'referral',
    successTitle: 'Referral logged.',
    successMessage:
      'We have noted your referral. If they sign up, your reward is credited to your account automatically.',
  },
];

export function getAutoResponseForSource(source: string | undefined): AutoResponse {
  if (!source) return defaultAutoResponse();
  const match = autoResponses.find((r) => r.apiSource === source);
  return match ?? defaultAutoResponse();
}

function defaultAutoResponse(): AutoResponse {
  // The newsletter response is the safest fallback — it is the most generic
  // welcome message and matches the historical default of /api/newsletter.
  return autoResponses[0];
}
