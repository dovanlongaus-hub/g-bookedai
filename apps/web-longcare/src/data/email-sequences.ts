// Email sequence templates triggered after a lead magnet signup.
// Sequences are referenced by `LeadMagnet.emailSequence` and the upstream
// notification service is expected to honour the same IDs. All copy is
// written in Australian English with concrete, helpful guidance.

export type EmailInSequence = {
  /** Days after signup. 0 = sent immediately (after the auto-response). */
  day: number;
  subject: string;
  preheader: string;
  bodyMarkdown: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export type EmailSequence = {
  id: string;
  name: string;
  description: string;
  /** Used by the scheduler to know when to mark the sequence complete. */
  totalDays: number;
  emails: EmailInSequence[];
};

export const emailSequences: EmailSequence[] = [
  // ---------------------------------------------------------------------------
  // 1. Newsletter welcome — 3 emails over 7 days
  // ---------------------------------------------------------------------------
  {
    id: 'newsletter-welcome',
    name: 'Newsletter Welcome',
    description:
      'Three-email welcome series for new newsletter subscribers. Sets expectations and surfaces the most useful evergreen content.',
    totalDays: 7,
    emails: [
      {
        day: 0,
        subject: 'Welcome to the LongCare AU newsletter',
        preheader: 'Here is what to expect each week, and a quick win to start with.',
        bodyMarkdown: `# G'day,

Thanks for subscribing. You are now on the list with about 2,000 other Australian operators who want practical AI guidance — not hype.

**Each Monday you will receive:**

- **5 things worth your attention** — short links curated for AU SMEs.
- **One case study** — what an Australian business shipped that week, what it cost, what they learned.
- **One tool we tested** — honest take, with a "would I pay for this?" verdict.

**A quick win while you wait for Monday:** the [AI Readiness Assessment](https://longcare.au/resources/ai-readiness) takes six minutes and gives you a maturity score plus three prioritised next steps. Most readers tell us it reframes where to start.

If the newsletter is not for you, the unsubscribe link is at the bottom of every email. No hard feelings.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Take the AI Readiness Assessment',
        ctaUrl: '/resources/ai-readiness',
      },
      {
        day: 3,
        subject: 'The 3 reads new subscribers find most useful',
        preheader: 'Hand-picked from the archive for someone in your shoes.',
        bodyMarkdown: `Hi again,

Quick one. New readers tell us these three pieces save the most time:

1. **[The 30-day AI rollout plan for SMEs](https://longcare.au/blog)** — a week-by-week checklist that has been used by more than 80 Australian businesses.
2. **[AI cost benchmarks (AUD)](https://longcare.au/cloud-advisory)** — what teams of 5, 25 and 100 actually spend on Gemini, OpenAI and supporting tooling.
3. **[Prompt patterns that work for sales and support](https://longcare.au/academy/prompt-engineering/lessons/prompt-templates-for-sme)** — eight patterns with real before/after examples.

Pick whichever feels closest to what you are working on this week.

Cheers,
Long`,
        ctaLabel: 'Browse the blog archive',
        ctaUrl: '/blog',
      },
      {
        day: 7,
        subject: 'One question — what should we cover next?',
        preheader: 'A 10-second reply helps us shape the next four weeks.',
        bodyMarkdown: `Hi,

Now that you have had a week with us, one question:

**What is the AI question keeping you up at night right now?**

Hit reply. One sentence is fine. We read every response and the most common topics shape the next four weeks of newsletter content.

If you would rather skip the email and chat live, the [discovery call](https://longcare.au/discovery-call) is free for the first 20 minutes.

Cheers,
Long`,
        ctaLabel: 'Book a discovery call',
        ctaUrl: '/discovery-call',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Post-quiz — 5 emails over 14 days
  // ---------------------------------------------------------------------------
  {
    id: 'post-quiz',
    name: 'Post-Quiz Nurture',
    description:
      'Sent after a user completes the AI Readiness Assessment. Walks them from score to first concrete play to a discovery call.',
    totalDays: 14,
    emails: [
      {
        day: 0,
        subject: 'Your AI Readiness Score and what to do next',
        preheader: 'A short recap of your score plus the highest-leverage next step.',
        bodyMarkdown: `# Your AI Readiness Score is in.

Thanks for taking the assessment. The PDF version of your result is attached. Three quick observations from the responses we see most often:

- **Most teams under-invest in data quality.** Even a basic CRM clean-up before any AI rollout pays back in weeks.
- **The bottleneck is rarely the model.** It is usually a process owner who is not clear on what success looks like.
- **Start with one workflow, not a strategy.** A single shipped automation beats six months of planning.

**Your highest-leverage next step:** pick the recommendation marked "Start here" in your report and give yourself two weeks to ship it. If you would like a second pair of eyes, reply to this email.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'View your full report',
        ctaUrl: '/resources/ai-readiness',
      },
      {
        day: 2,
        subject: 'Your top opportunity — start here',
        preheader: 'One specific play that fits your readiness level.',
        bodyMarkdown: `Hi,

Following on from your readiness score, here is the one play we would prioritise this fortnight.

**The play: Customer-email triage.**

If your inbox handles more than 30 customer emails per week, an AI triage layer that drafts replies and tags by intent typically saves 4–6 hours of operator time. We have shipped this for nine Australian businesses; the average build time is two days and ongoing cost sits between AUD 30 and AUD 90 per month.

**To run this yourself, you need three things:**

1. A shared inbox you can copy emails out of (Gmail or Outlook both work).
2. An "intent taxonomy" — typically 6 to 10 categories like "refund request", "product question", "booking change".
3. Someone with two clear hours to set up the prompt and tweak it for a week.

If you want the prompt template we use, [it is here](https://longcare.au/academy/prompt-engineering/lessons/prompt-templates-for-sme). If you want us to build it with you, the discovery call below is the fastest path.

Cheers,
Long`,
        ctaLabel: 'Book a 20-minute discovery call',
        ctaUrl: '/discovery-call',
      },
      {
        day: 5,
        subject: 'What we would build first (a real example)',
        preheader: 'How a Brisbane SME shipped their first AI workflow in 9 days.',
        bodyMarkdown: `Hi,

A short case study, because abstract advice is rarely useful.

**Background.** A 12-person logistics SME in Brisbane, AUD 4.6M revenue, owner-operated. Their readiness score was a 38 — exactly average for AU SMEs.

**What they shipped (in 9 days).** A quote-drafting workflow that takes a customer enquiry email, looks up the relevant rate card, and produces a draft quote in their format. Operator reviews and sends.

**The numbers.**
- Build cost: AUD 1,800 (mostly time, not tools).
- Ongoing cost: AUD 42 per month in API spend.
- Time saved: ~6 hours per week, freeing the office manager for higher-value work.
- Payback period: 6 weeks.

**Why it worked.** They picked a workflow with high volume and low ambiguity, kept a human in the loop, and measured one number (time-to-quote).

If a similar play makes sense for your business, reply with a one-line description of what you do and I will tell you whether it would fit.

Cheers,
Long`,
        ctaLabel: 'Read more case studies',
        ctaUrl: '/testimonials',
      },
      {
        day: 9,
        subject: 'How to involve your team without scaring them',
        preheader: 'Change management for AI — the bit most rollouts skip.',
        bodyMarkdown: `Hi,

Most failed AI rollouts we have audited failed for one reason: the team was not on board. The technology worked. The people did not trust it.

**Three things that move the needle:**

1. **Name a "human-in-the-loop" reviewer for every workflow.** Until trust is earned, AI drafts; humans send.
2. **Publish a one-page AI policy.** Plain English. What we use AI for, what we do not, and what data is off-limits. Our [free policy templates](https://longcare.au/governance/policies) cover this in 6 documents.
3. **Show the time saved as personal benefit, not headcount risk.** "You will get an hour back each Friday afternoon" lands better than "we are automating tasks".

The teams that get this right typically see adoption double in the first month.

If you would like our 90-minute change management workshop slides (the same deck we use with paying clients), reply "team" and I will send them through.

Cheers,
Long`,
        ctaLabel: 'Download policy templates',
        ctaUrl: '/governance/policies',
      },
      {
        day: 14,
        subject: 'Ready to chat? Discovery call is free',
        preheader: 'No pitch — 20 minutes to map your next 90 days.',
        bodyMarkdown: `Hi,

Two weeks since the assessment. Wanted to check in.

If you have shipped your first workflow — well done. Reply and tell me how it went; I share the best stories (anonymised) in the newsletter.

If you have not, that is normal. The most common blocker is "I am not sure which play to pick first". The free 20-minute [discovery call](https://longcare.au/discovery-call) is built exactly for that — by the end you will have:

- A ranked list of 3 plays for your business.
- Honest cost and time estimates for each.
- A clear sense of whether you can build it in-house or whether outside help is worth the spend.

No pitch, no follow-up unless you want it.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Book a discovery call',
        ctaUrl: '/discovery-call',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. SME onboarding — 5 emails over 21 days
  // ---------------------------------------------------------------------------
  {
    id: 'sme-onboarding',
    name: 'SME Onboarding',
    description:
      'Triggered after the SME guide download or the cloud cost checklist. Three weeks of practical SME-focused content.',
    totalDays: 21,
    emails: [
      {
        day: 0,
        subject: 'Your SME AI Guide is ready',
        preheader: 'Plus the one chapter most readers start with.',
        bodyMarkdown: `# Your guide is ready.

The 24-page PDF is attached. If your inbox blocks attachments, the same content is at [longcare.au/guide](https://longcare.au/guide).

**Where most SMEs start.** Chapter 3 — "The 30-day rollout plan" — is what most readers turn to first. It is a week-by-week checklist with realistic time and cost estimates in AUD.

I will send a short email every few days for the next three weeks with one practical idea each time. If that is not useful, the unsubscribe link is at the bottom.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Open the guide',
        ctaUrl: '/guide',
      },
      {
        day: 3,
        subject: 'The 3 mistakes nearly every SME makes',
        preheader: 'And the simple fix for each.',
        bodyMarkdown: `Hi,

After auditing more than 100 Australian SME AI rollouts, three mistakes show up over and over. Here they are with the fix for each.

**1. Buying tools before defining the workflow.**

It is tempting to start with "we should use ChatGPT". Resist. Define the workflow first — input, decision, output — then pick the tool. Otherwise you are paying for licences you will not use.

**2. Skipping data hygiene.**

If your CRM is half-empty or your product data lives in three spreadsheets, AI will amplify the mess. Spend a fortnight cleaning before you spend a dollar on AI.

**3. Treating AI as a project, not a practice.**

The teams that win make AI part of weekly rituals. A 30-minute "what shipped, what saved time" review on Fridays beats a six-month transformation programme.

The [AI Readiness Assessment](https://longcare.au/resources/ai-readiness) catches all three before they cost you money.

Cheers,
Long`,
        ctaLabel: 'Take the readiness assessment',
        ctaUrl: '/resources/ai-readiness',
      },
      {
        day: 8,
        subject: 'AI cost benchmarks for AU SMEs',
        preheader: 'What a team of 5, 25 and 100 actually spend.',
        bodyMarkdown: `Hi,

The single most-asked question we get from SME owners: "What does this actually cost?"

Honest benchmarks, in AUD per month, based on our own client base:

**Team of 5 (typical micro-business).**
- Tools: AUD 80–180 per month.
- API spend: AUD 20–60.
- Time saved: 6–12 hours per week.

**Team of 25 (small SME).**
- Tools: AUD 400–900 per month.
- API spend: AUD 100–350.
- Time saved: 30–60 hours per week.

**Team of 100 (mid-market).**
- Tools: AUD 1,500–4,000 per month.
- API spend: AUD 600–2,500.
- Time saved: 150–300 hours per week.

The [Cloud Cost Control Checklist](https://longcare.au/cloud-advisory) covers the 14 settings that keep these numbers from blowing out.

Cheers,
Long`,
        ctaLabel: 'Read the cost checklist',
        ctaUrl: '/cloud-advisory',
      },
      {
        day: 14,
        subject: 'What changes when AI is everywhere',
        preheader: 'Three shifts in how we work — practical, not philosophical.',
        bodyMarkdown: `Hi,

Halfway through this onboarding sequence. Stepping back for one bigger-picture email.

**Three shifts every Australian SME we work with is navigating right now:**

1. **Drafting becomes free.** Anything that was "I will write a first draft" now starts with AI. The bottleneck moves to judgement and editing.
2. **The cost of trying something new approaches zero.** A landing page test, a new email template, a process variation — all become two-hour experiments instead of two-week projects.
3. **Compliance gets harder before it gets easier.** Privacy, IP, accuracy — the rules are tightening and the obligations sit with directors. The [policy templates](https://longcare.au/governance/policies) help.

The SMEs that thrive are the ones that lean into all three. The ones that struggle pick one and ignore the others.

Cheers,
Long`,
        ctaLabel: 'Browse policy templates',
        ctaUrl: '/governance/policies',
      },
      {
        day: 21,
        subject: 'Three weeks in — your next move',
        preheader: 'Where to go from here, depending on what you have shipped.',
        bodyMarkdown: `Hi,

Final email in this series. Where to go next depends on where you are.

**If you have shipped your first workflow:** the [Prompt Template Pack](https://longcare.au/academy/prompt-engineering/lessons/prompt-templates-for-sme) accelerates the next three. The [community](https://longcare.au/community/network) is the best place to share what worked.

**If you are still picking your first play:** book a [discovery call](https://longcare.au/discovery-call). 20 minutes, free, no pitch. We will rank three plays for your business and you can take it from there.

**If you want to hand the build to someone:** the [AI Agent Pilot Programme](https://longcare.au/agents) takes 5 SMEs per quarter and co-builds the first agent with you. Limited spots.

Whichever you pick — keep me posted. Hit reply any time.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Book a discovery call',
        ctaUrl: '/discovery-call',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Governance onboarding — 3 emails over 7 days
  // ---------------------------------------------------------------------------
  {
    id: 'governance-onboarding',
    name: 'Governance Onboarding',
    description:
      'For users who downloaded the AI policy templates. Helps them adopt and customise the templates safely.',
    totalDays: 7,
    emails: [
      {
        day: 0,
        subject: 'Your AI policy templates are ready',
        preheader: 'Plus a 30-minute customisation guide.',
        bodyMarkdown: `# Templates ready.

The six policy templates are attached as Word and Markdown. Aligned to the Australian Privacy Principles (APP 1-13) and reviewed by an Australian-qualified legal advisor in March 2026.

**Customise in this order — it takes about 30 minutes:**

1. **Acceptable Use Policy.** Replace placeholder org name, list approved tools.
2. **Data Handling Policy.** Mark which data classes are off-limits for any AI tool.
3. **Vendor Assessment Checklist.** Run it against your top three current vendors.
4. **Incident Response Plan.** Add the on-call contact and escalation tree.
5. **Training & Awareness.** Schedule the 60-minute team session.
6. **Audit & Review Cadence.** Pick quarterly or six-monthly.

If anything is unclear, reply to this email.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Open the policy hub',
        ctaUrl: '/governance/policies',
      },
      {
        day: 3,
        subject: 'The bit most policies miss',
        preheader: 'A practical incident playbook — not a paper exercise.',
        bodyMarkdown: `Hi,

Most AI policies we audit are well-written and never used. Why? They are designed to satisfy a board, not to be picked up at 3pm on a Tuesday when something has gone wrong.

**The fix: a one-page incident playbook with three columns.**

| If this happens | Do this | Tell this person |

Examples that should be in your playbook:

- **A staff member pasted client data into a public AI tool.** → Pull the chat log if available, document the data class, notify Privacy Officer within 24 hours.
- **An AI-drafted reply contained a factual error and was sent.** → Notify customer with a correction, log the incident, review prompt safeguards.
- **A vendor announces a data breach.** → Identify what data we share with them, notify our customers if their data is affected, document for OAIC if reportable.

If you would like a populated example, reply "playbook" and I will send the version we use internally.

Cheers,
Long`,
      },
      {
        day: 7,
        subject: 'Final step — making the policy real',
        preheader: 'A 30-minute meeting agenda for your team.',
        bodyMarkdown: `Hi,

Last note in this short series. The single most important step is the one most teams skip: actually rolling the policy out.

**A 30-minute team meeting agenda that works:**

- **(5 min) Why we are doing this.** Frame it as "we want to use AI well, safely". Not "we are worried about something".
- **(10 min) Walk through the Acceptable Use Policy.** Three examples of "yes", three of "no".
- **(10 min) Open Q&A.** Most questions will be about specific tools or specific data — capture the answers in a shared FAQ.
- **(5 min) Commitment.** Everyone reads the policy this week and replies to a Slack/Teams thread acknowledging it.

That is it. You have moved from "we should have a policy" to "we have a policy and the team knows what it says".

If your organisation needs a stronger framework — board reporting, vendor due-diligence, audit trails — the [Cloud Advisory programme](https://longcare.au/cloud-advisory) is the next step up.

Cheers,
Long`,
        ctaLabel: 'Explore Cloud Advisory',
        ctaUrl: '/cloud-advisory',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Toolkit launch — 4 emails over 30 days
  // ---------------------------------------------------------------------------
  {
    id: 'toolkit-launch',
    name: 'Toolkit Waitlist',
    description:
      'For waitlist signups for the AI Toolkit launching Q3 2026. Builds anticipation and surfaces preview features.',
    totalDays: 30,
    emails: [
      {
        day: 0,
        subject: 'You are on the AI Toolkit waitlist',
        preheader: 'Here is what is launching, and when.',
        bodyMarkdown: `# Welcome to the waitlist.

You are now in the queue for the LongCare AI Toolkit — 7 mini-apps purpose-built for Australian SMEs.

**What is launching (Q3 2026):**

1. **Pricing Helper.** Drafts AUD pricing options with margin maths.
2. **BAS Draft Assistant.** Pre-fills the box-by-box BAS reconciliation notes.
3. **Hiring Filter.** Triages CVs against your role brief.
4. **Customer Email Triage.** Tags incoming email by intent and drafts replies.
5. **Quote Drafting.** Turns enquiries into branded quote drafts.
6. **Meeting Notes Synthesiser.** From transcript to action items.
7. **SOP Generator.** Turns a five-minute walkthrough into a documented SOP.

Waitlist members get 60 days free at launch and a 30% lifetime discount.

I will send a short progress note every 7–10 days until launch.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Browse the toolkit overview',
        ctaUrl: '/toolkit',
      },
      {
        day: 7,
        subject: 'First preview — Pricing Helper demo',
        preheader: '90-second walkthrough of the first toolkit app.',
        bodyMarkdown: `Hi,

The Pricing Helper is the first toolkit app entering closed beta this week. Quick preview.

**The problem it solves.** Quoting takes ages because you have to re-derive margin, GST, and bundle pricing every time. The maths is not hard, but it is repetitive.

**What it does.**

1. You paste in a customer enquiry.
2. It identifies the products or services mentioned.
3. It produces three pricing options — Standard, Premium, Enterprise — with margin and GST already calculated.
4. You review, edit, send.

**Beta feedback so far:** "saved me 25 minutes per quote, and we are quoting more often because of it" — Sarah, Geelong professional services.

If you want to be a closed-beta tester (free, in exchange for honest feedback), reply "beta".

Cheers,
Long`,
        ctaLabel: 'See the toolkit roadmap',
        ctaUrl: '/toolkit',
      },
      {
        day: 16,
        subject: 'BAS season is coming — here is some help',
        preheader: 'The BAS Draft Assistant is the most-requested toolkit app.',
        bodyMarkdown: `Hi,

We surveyed waitlist members last week. The BAS Draft Assistant is the most-requested app by a country mile, with the Hiring Filter a close second.

**On BAS Draft Assistant:** it does not file your BAS — your accountant does. It produces the box-by-box reconciliation notes that you would otherwise spend three hours pulling together each quarter. Output is reviewed by a human, always.

**On Hiring Filter:** it scores CVs 1–10 against your role brief, with a one-paragraph "why" for each score. Based on early-access tests, it cuts initial CV review time by about 70%.

We will not ship anything that is not measurably better than doing it yourself. If you have a specific pain point you want addressed in the toolkit, reply with one sentence describing it.

Cheers,
Long`,
      },
      {
        day: 30,
        subject: 'Toolkit launch update + your priority access',
        preheader: 'When you can start using it, and what to expect.',
        bodyMarkdown: `Hi,

A month in, here is where we are.

**Launch window:** Q3 2026, on track. Likely a phased rollout — Pricing Helper and Email Triage first, then the rest at a pace of one app per fortnight.

**Your priority access.** Waitlist members get a private link two weeks before public launch and 60 days free. We will email you that link directly when it is ready.

**Until then:** the [SME Prompt Template Pack](https://longcare.au/academy/prompt-engineering/lessons/prompt-templates-for-sme) is the closest free equivalent and is ready to use today. Many waitlist members are using it as a stop-gap.

Anything you wish the toolkit did that I have not mentioned? Reply and let me know.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Use the prompt pack now',
        ctaUrl: '/academy/prompt-engineering/lessons/prompt-templates-for-sme',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Agent pilot — 3 emails over 7 days
  // ---------------------------------------------------------------------------
  {
    id: 'agent-pilot',
    name: 'Agent Pilot Programme',
    description:
      'For SMEs who registered interest in the 5-spot AI Agent Pilot. Confirms eligibility, screens fit, books the discovery call.',
    totalDays: 7,
    emails: [
      {
        day: 0,
        subject: 'Thanks for applying — Agent Pilot next steps',
        preheader: 'Three short questions and an indicative timeline.',
        bodyMarkdown: `# Thanks for putting your hand up.

Five spots, lots of applicants — so we will be in touch within 3 business days with whether your application moves to the discovery stage.

**While you wait, three short questions.** Reply with your answers and your application moves up the queue:

1. **What is the workflow you would automate first?** One sentence is fine.
2. **What does that workflow currently cost you per month** (in time or money)?
3. **Who would be the day-to-day "owner" of the agent inside your business?**

**Indicative timeline if you are selected.**

- Week 1: Discovery + scoping call (90 minutes).
- Weeks 2–3: Build sprint with you and one of our engineers.
- Week 4: Live deployment + handover docs.
- Weeks 5–8: Weekly check-ins, performance review, optimisation.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Read the full pilot brief',
        ctaUrl: '/agents',
      },
      {
        day: 3,
        subject: 'What we are looking for in pilot SMEs',
        preheader: 'And what would disqualify your application.',
        bodyMarkdown: `Hi,

Quick honesty email. Here is who we are looking for, and who we politely turn away.

**Strong fit:**

- A specific workflow with measurable cost (time or money) of more than 5 hours per week.
- An owner or operator who can make decisions inside the engagement window.
- Willingness to share anonymised metrics post-launch.

**Not a fit (yet):**

- "We want AI but we are not sure where to start." → Take the [readiness assessment](https://longcare.au/resources/ai-readiness) first.
- Heavy regulatory constraints we cannot quickly map (e.g. medical device classification). → Cloud Advisory is a better starting point.
- Less than AUD 250k annual revenue. → The economics rarely work; the [discovery call](https://longcare.au/discovery-call) is a better fit.

If we politely decline, it is not personal — and the door stays open.

Cheers,
Long`,
      },
      {
        day: 7,
        subject: 'Pilot decision update',
        preheader: 'Whether you are in the next cohort or the one after.',
        bodyMarkdown: `Hi,

Decisions for this cohort go out this week. If you are selected, you will receive a separate calendar invite for the discovery + scoping call.

**If you are not in this cohort:** you are automatically rolled into consideration for the next one (next quarter). In the meantime, the [discovery call](https://longcare.au/discovery-call) is the fastest way to scope something smaller you can ship in-house.

Either way — thank you for raising your hand. The level of applications this round was excellent and made the selection genuinely difficult.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Book a discovery call',
        ctaUrl: '/discovery-call',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Starter email course — 5 emails over 5 days
  // ---------------------------------------------------------------------------
  {
    id: 'starter-course',
    name: '5-Day AI Starter Email Course',
    description:
      'One short, daily email for 5 days. By Friday the subscriber has shipped one useful AI workflow.',
    totalDays: 5,
    emails: [
      {
        day: 0,
        subject: 'Day 1 — Pick your one workflow',
        preheader: 'The single most important decision in this course.',
        bodyMarkdown: `# Day 1: pick your one workflow.

Welcome to the 5-day starter course. Each email takes 10 minutes. By Friday you will have shipped one useful AI workflow.

**Today: pick the workflow.**

Use this filter:

1. **Volume.** Does it happen at least 5 times a week?
2. **Repetitive.** Are the steps roughly the same each time?
3. **Time-sensitive.** Would saving an hour per week be valuable?

Examples that score well: drafting customer email replies, summarising meetings, triaging inbound enquiries, writing first-draft job ads.

**Hit reply with the workflow you picked.** I read every reply and the most common ones get worked into a follow-up email later in the course.

Tomorrow: the prompt that turns it into AI work.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
      },
      {
        day: 1,
        subject: 'Day 2 — Write the prompt',
        preheader: 'A 4-part prompt template that works for 80% of SME use cases.',
        bodyMarkdown: `# Day 2: the prompt.

Most prompts are too short. The ones that work follow a 4-part structure.

**1. Role.** "You are an experienced [X] at an Australian [type of business]."

**2. Task.** "Your job is to [specific outcome]. The audience is [who]."

**3. Inputs.** "I will give you [specific data]. Use only this; do not invent details."

**4. Output format.** "Return [exact format]. Use Australian English. Keep under [N] words."

Try this for your workflow today. It will not be perfect on the first try — that is fine.

The full pack of 8 SME prompt templates is [here](https://longcare.au/academy/prompt-engineering/lessons/prompt-templates-for-sme) if you want a head start.

Tomorrow: connecting it to your tools.

Cheers,
Long`,
        ctaLabel: 'Browse prompt templates',
        ctaUrl: '/academy/prompt-engineering/lessons/prompt-templates-for-sme',
      },
      {
        day: 2,
        subject: 'Day 3 — Connect it to your tools',
        preheader: 'No-code routes for Gmail, Outlook, Slack, and shared drives.',
        bodyMarkdown: `# Day 3: connecting it.

You have a workflow and a prompt. Now you need to plug them together so it actually saves time.

**Three patterns that cover most SME use cases.**

**Pattern A: Copy-paste.** Open your AI tool, paste input, paste output. Time-saving but manual. Good for low-volume workflows.

**Pattern B: A "helper" inside your existing tool.** Gmail and Outlook both support AI side-panels. Slack has Claude and ChatGPT integrations. Most SMEs start here.

**Pattern C: An automation tool in the middle.** Zapier, Make, or n8n connect a trigger (new email, form submission) to an AI step. Worth it when volume crosses about 20 events per day.

Pick the lightest pattern that works. Resist building Pattern C until you have outgrown Pattern B.

Tomorrow: how to test it without breaking anything.

Cheers,
Long`,
      },
      {
        day: 3,
        subject: 'Day 4 — Test it safely',
        preheader: 'A 30-minute test plan that catches 90% of issues.',
        bodyMarkdown: `# Day 4: testing.

Before this goes live, run it through three tests. Total time: 30 minutes.

**Test 1: 10 happy-path examples.** Pick 10 typical inputs from the past month. Run them through the prompt. Spot-check 3 of the outputs in detail.

**Test 2: 3 edge cases.** Find 3 unusual inputs (very short, very long, ambiguous). The output should fail gracefully — either say "I cannot help with this" or flag uncertainty. Outputs that confidently invent answers are a red flag.

**Test 3: 1 hostile input.** Try to make it do something it should not (recommend something dodgy, ignore the brand voice, leak data). If it complies, tighten the prompt with explicit "do not" rules.

Score honestly. If anything is below 8/10, fix it before shipping.

Tomorrow: ship it, measure it, and what comes next.

Cheers,
Long`,
      },
      {
        day: 4,
        subject: 'Day 5 — Ship it and measure',
        preheader: 'The one number to track, plus where to go from here.',
        bodyMarkdown: `# Day 5: ship and measure.

Today: turn it on. Send the first real output (with a human review). Pat yourself on the back — most SMEs talk about AI for months without shipping anything.

**The one number to track.** Pick the simplest measure of "did this save time?" — typically minutes per task, or tasks-per-hour. Write it down today, write it down again in 30 days, compare.

**Where to go from here.**

- **The newsletter** is the lightest-touch ongoing support — Mondays only. [Subscribe](https://longcare.au/community/network).
- **The [readiness assessment](https://longcare.au/resources/ai-readiness)** finds the next play after this one.
- **A [discovery call](https://longcare.au/discovery-call)** if you want a second pair of eyes on what to do next.

Reply and tell me what you shipped this week. Best stories make it (anonymised) into the newsletter.

Cheers,
Dr. Long Do
Founder, LongCare AU`,
        ctaLabel: 'Take the readiness assessment',
        ctaUrl: '/resources/ai-readiness',
      },
    ],
  },
];

export function getEmailSequenceById(id: string): EmailSequence | undefined {
  return emailSequences.find((s) => s.id === id);
}

export function getTotalEmailCount(): number {
  return emailSequences.reduce((acc, s) => acc + s.emails.length, 0);
}
