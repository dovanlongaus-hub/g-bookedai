/**
 * Case Studies — central data store for /case-studies and /case-studies/[slug].
 *
 * Anonymised but realistic Australian SME stories. Every case study is
 * 600-900 words, AU English, AUD pricing, and links to SKUs in
 * `sku-catalog.ts` so readers can convert directly.
 *
 * Single source of truth. Do not duplicate copy elsewhere.
 */

export type Industry =
  | 'healthcare'
  | 'retail'
  | 'hospitality'
  | 'real-estate'
  | 'trades'
  | 'education'
  | 'professional-services'
  | 'logistics'
  | 'agriculture'
  | 'finance';

export const INDUSTRY_LABELS: Record<Industry, string> = {
  healthcare: 'Healthcare',
  retail: 'Retail',
  hospitality: 'Hospitality',
  'real-estate': 'Real Estate',
  trades: 'Trades',
  education: 'Education',
  'professional-services': 'Professional Services',
  logistics: 'Logistics',
  agriculture: 'Agriculture',
  finance: 'Finance',
};

export type CaseStudyHeroIllustration =
  | 'mentor'
  | 'agents'
  | 'toolkit'
  | 'solutions'
  | 'governance'
  | 'community';

export type CaseStudyIllustrationName =
  | 'flow-three-step'
  | 'flow-five-step'
  | 'flow-automation'
  | 'flow-assessment'
  | 'roi-quadrant'
  | 'infographic-stack'
  | 'infographic-comparison'
  | 'infographic-timeline';

export type CaseStudyServiceTier =
  | 'individual'
  | 'startup'
  | 'sme'
  | 'organisation';

export const TIER_LABELS: Record<CaseStudyServiceTier, string> = {
  individual: 'Individual',
  startup: 'Startup',
  sme: 'SME',
  organisation: 'Organisation',
};

export type CaseStudyMetric = {
  label: string;
  value: string;
  caption?: string;
};

export type CaseStudySection =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'list'; items: string[] }
  | { type: 'pullquote'; quote: string; attribution?: string }
  | { type: 'metrics-row'; metrics: CaseStudyMetric[] }
  | {
      type: 'illustration';
      name: CaseStudyIllustrationName;
      caption?: string;
    };

export type CaseStudy = {
  slug: string;
  title: string;
  customerName: string;
  customerInitials: string;
  industry: Industry;
  location: string;
  size: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  heroIllustration?: CaseStudyHeroIllustration;
  challenge: string;
  solution: string;
  outcomeMetrics: CaseStudyMetric[];
  servicesUsed: string[];
  durationWeeks: number;
  paybackMonths: number;
  serviceTier: CaseStudyServiceTier;
  pullQuote: { text: string; person: string; role: string };
  sections: CaseStudySection[];
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  // ---------------------------------------------------------------------------
  // 1) Cygnus Logistics — cuts monthly admin from 3 days to 45 minutes
  // ---------------------------------------------------------------------------
  {
    slug: 'cygnus-logistics-cuts-monthly-admin',
    title: 'How Cygnus Logistics cut monthly admin from three days to 45 minutes',
    customerName: 'Cygnus Logistics',
    customerInitials: 'CL',
    industry: 'logistics',
    location: 'Melbourne, VIC',
    size: '24 staff',
    publishedAt: '2026-04-12',
    updatedAt: '2026-05-02',
    excerpt:
      'A Melbourne freight operator replaced a three-day month-end admin grind with a supervised AI agent. 98.6% accuracy, 12-week payback, no headcount changes.',
    heroIllustration: 'agents',
    challenge:
      'Cygnus Logistics, a 24-staff freight operator running interstate runs out of Melbourne, was losing roughly three working days every month to admin. The operations manager, the bookkeeper, and a part-time compliance contractor would each spend a day matching invoices to purchase orders, transcribing driver logs, and pre-filling NHVR-style compliance forms. None of it was strategic. All of it was error-prone.',
    solution:
      'A single supervised AI agent was deployed to ingest invoice PDFs, match them against PO records in their existing accounting tool, extract structured fields from driver log photos, and pre-fill the recurring compliance templates for human review. The agent never auto-submits — every output is reviewed by an Australian-based human inside their own dashboard before anything leaves the building.',
    outcomeMetrics: [
      { label: 'Monthly admin time', value: '3 days → 45 min', caption: 'Per month, across 3 staff' },
      { label: 'Reconciliation accuracy', value: '98.6%', caption: 'Validated over first quarter' },
      { label: 'Payback period', value: '12 weeks', caption: 'Setup paid back via time saved' },
      { label: 'Annualised saving', value: '~A$11,200', caption: 'Time-back at blended rate' },
    ],
    servicesUsed: ['ai-mentor', 'package-5', 'agents-business'],
    durationWeeks: 12,
    paybackMonths: 3,
    serviceTier: 'sme',
    pullQuote: {
      text: 'The agent ran reliably from week two. We have not touched it since.',
      person: 'Sarah Chen',
      role: 'Operations Manager',
    },
    sections: [
      {
        type: 'paragraph',
        text: 'When Cygnus Logistics first reached out, the brief was unambiguous: month-end was breaking the team. The operations manager had three jobs — fleet planning, customer service, and admin — and admin was eating the other two. Their accounting platform was solid, their drivers logged shifts diligently, and their compliance officer had templates that worked. The problem was that none of these systems talked to each other in any meaningful way, and the human glue was costing them roughly 24 person-hours every month, plus another four hours of partner-firm bookkeeping time.',
      },
      {
        type: 'paragraph',
        text: 'The temptation in this kind of situation is to pitch a giant ERP migration or a custom integration platform. We pitched neither. Instead, the brief became: do not change a single tool the team already uses. Insert one supervised AI agent between those tools that handles the boring part — extraction, matching, drafting — and hand every output to a human for a thumbs-up. Keep the existing audit trail. Keep the existing accountant. Keep the existing fleet software. Just stop making people retype things.',
      },
      {
        type: 'heading',
        text: 'What we built',
      },
      {
        type: 'paragraph',
        text: 'The architecture was deliberately modest. A four-stage pipeline that the operations manager could explain to her board in under sixty seconds:',
      },
      {
        type: 'list',
        items: [
          'Ingest. Invoices and driver logs land in a monitored email inbox or shared folder. The agent picks them up automatically.',
          'Extract and match. The agent reads each document, pulls structured fields, and matches each invoice line against the open POs in the accounting tool.',
          'Pre-fill. Compliance templates are populated from the matched records. Anything ambiguous is flagged with a yellow badge.',
          'Review. The operations manager opens a dashboard, sees what is ready, and clicks through with a single keystroke per item. Anything she rejects is sent back for the agent to retry.',
        ],
      },
      {
        type: 'illustration',
        name: 'flow-automation',
        caption: 'The four-stage pipeline. The human review checkpoint is the entire trust mechanism.',
      },
      {
        type: 'heading',
        text: 'Outcomes after 90 days',
      },
      {
        type: 'paragraph',
        text: 'The first month was deliberately conservative. The agent handled extraction and matching, but the team still re-keyed everything into the compliance forms by hand. We were watching for false positives. There were none worth reporting. Month two, the team turned on pre-fill. Month three, the operations manager stopped opening the source PDFs at all and worked exclusively from the dashboard.',
      },
      {
        type: 'metrics-row',
        metrics: [
          { label: 'Time saved / month', value: '22 hrs' },
          { label: 'Match accuracy', value: '98.6%' },
          { label: 'Compliance breaches', value: '0' },
          { label: 'Annualised saving', value: 'A$11,200' },
        ],
      },
      {
        type: 'heading',
        text: 'What we would do differently',
      },
      {
        type: 'paragraph',
        text: 'Three lessons came out of this engagement that have shaped every logistics deployment since. First, the dashboard mattered far more than the model. The team trusted the system because they could see every decision in plain English alongside the source document. Second, the keystroke-to-approve interface was the difference between a tool that gets used and a tool that gets quietly abandoned. Third, we should have started with a smaller scope. We could have launched with just invoice matching in week four and added driver logs in week six rather than launching everything in week eight.',
      },
      {
        type: 'pullquote',
        quote: 'The agent ran reliably from week two. We have not touched it since.',
        attribution: 'Sarah Chen, Operations Manager',
      },
      {
        type: 'heading',
        text: 'Where Cygnus is now',
      },
      {
        type: 'paragraph',
        text: 'A year on, Cygnus has reinvested most of the recovered time into customer-facing work. The operations manager runs a weekly customer-success call she previously could not justify. Their bookkeeper now closes the month in a single afternoon instead of spreading it across the first week. The compliance contractor was let go from the monthly retainer and rebooked for an annual deep-dive instead. Same compliance posture, better unit economics. Next on the roadmap: a customer-facing freight tracking agent that draws on the same dashboard infrastructure we built for admin.',
      },
    ],
    tags: ['Logistics', 'Automation', 'Compliance'],
  },

  // ---------------------------------------------------------------------------
  // 2) TechFlow Solutions — AI customer service for a Brisbane SaaS
  // ---------------------------------------------------------------------------
  {
    slug: 'techflow-ai-customer-service-saas',
    title: 'TechFlow Solutions: how a Brisbane SaaS auto-resolved 80% of its support tickets',
    customerName: 'TechFlow Solutions',
    customerInitials: 'TF',
    industry: 'professional-services',
    location: 'Brisbane, QLD',
    size: '8 staff',
    publishedAt: '2026-03-18',
    updatedAt: '2026-04-22',
    excerpt:
      'A bootstrapped SaaS founder was personally answering 80+ tickets a day. Six weeks later, a grounded AI chatbot resolves 80% of them automatically — and customers prefer it.',
    heroIllustration: 'mentor',
    challenge:
      'TechFlow Solutions is an eight-person Brisbane SaaS with a tightly loved product and a customer-support problem. The founder, James, was personally clearing 80+ Tier-1 tickets a day before he could think about the roadmap. Hiring a support analyst was an option, but James was nervous about giving up the customer-conversation signal that had shaped the product. He needed Tier-1 to scale without losing the listening.',
    solution:
      'A six-week strategy sprint produced a grounded AI chatbot trained exclusively on TechFlow\'s help-centre articles, public release notes, and a vetted set of resolved-ticket transcripts. The bot answers within two minutes, escalates anything sentiment-negative or money-related to a human, and writes a one-line summary at the end of every conversation that James reviews each morning over coffee.',
    outcomeMetrics: [
      { label: 'Tickets auto-resolved', value: '80%', caption: 'Across the first 6 weeks live' },
      { label: 'Cost saved per month', value: 'A$8,400', caption: 'vs hiring a support analyst' },
      { label: 'First-response time', value: '< 2 min', caption: '24/7 across all timezones' },
      { label: 'Net Promoter Score', value: '+18', caption: 'After 90 days live' },
    ],
    servicesUsed: ['ai-starter', 'agents-business', 'toolkit-pro'],
    durationWeeks: 6,
    paybackMonths: 1,
    serviceTier: 'startup',
    pullQuote: {
      text: 'The strategy sprint paid for itself before the second invoice.',
      person: 'James Mitchell',
      role: 'Founder',
    },
    sections: [
      {
        type: 'paragraph',
        text: 'James Mitchell founded TechFlow Solutions in 2023 and grew it past A$1M ARR without a single dedicated support hire. By early 2026 he was the support team. Eighty plus tickets a day, almost all of them password resets, billing clarifications, integration walk-throughs, and the same six product questions on rotation. He genuinely loved talking to customers — that was how he knew which features to build. But he had stopped shipping. The product was beginning to feel stale, and his investors had noticed.',
      },
      {
        type: 'paragraph',
        text: 'When James first asked us about an AI chatbot, his framing was telling: "I want to keep the listening, lose the typing." That sentence shaped the entire engagement. We were not going to build a wall between James and his customers. We were going to give him a colleague who handled the boring 80% so he could focus on the interesting 20% — and still see every conversation through a daily summary.',
      },
      {
        type: 'heading',
        text: 'The three-step pipeline',
      },
      {
        type: 'paragraph',
        text: 'We built and shipped in six weeks using a deliberately simple architecture:',
      },
      {
        type: 'list',
        items: [
          'Ground. Index the help centre, public docs, and 200 hand-picked resolved tickets into a private knowledge base. Nothing the bot says comes from outside this corpus.',
          'Answer with guardrails. Sentiment detection, money-keyword detection, and a "I do not know — let me get a human" fallback. Every escalation tags James in Slack within ten seconds.',
          'Summarise. At the end of every conversation, the bot writes a single line. James reads them all over morning coffee. Total daily review time: under fifteen minutes.',
        ],
      },
      {
        type: 'illustration',
        name: 'flow-three-step',
        caption: 'Ground, answer, summarise. The summary loop is what kept the founder in the conversation.',
      },
      {
        type: 'heading',
        text: 'Outcomes that matter',
      },
      {
        type: 'paragraph',
        text: 'Six weeks after launch, eighty per cent of inbound tickets were closed without James touching them. The hire he had been quietly budgeting for — about A$8,400 a month all-in for a junior support analyst in Brisbane — was no longer needed. First-response time dropped from "whenever James woke up" to under two minutes around the clock. NPS, which we measured before and after, climbed eighteen points.',
      },
      {
        type: 'metrics-row',
        metrics: [
          { label: 'Tickets / month', value: '~2,400' },
          { label: 'Auto-resolved', value: '80%' },
          { label: 'Founder hours / week', value: '36 → 6' },
          { label: 'Cost saved / mo', value: 'A$8,400' },
        ],
      },
      {
        type: 'heading',
        text: 'What surprised us',
      },
      {
        type: 'paragraph',
        text: 'The thing that surprised everyone — including us — was that NPS went up, not down. We had braced for "I want to talk to a human" complaints. They did not arrive in any meaningful volume. The reason, in hindsight, was the two-minute response time. Customers will accept a bot that responds in two minutes much more readily than they will accept a human who responds in twelve hours. Speed, it turns out, is itself a feature of empathy.',
      },
      {
        type: 'pullquote',
        quote: 'The strategy sprint paid for itself before the second invoice.',
        attribution: 'James Mitchell, Founder, TechFlow Solutions',
      },
      {
        type: 'heading',
        text: 'Where TechFlow goes next',
      },
      {
        type: 'paragraph',
        text: 'James used the recovered time to ship two long-overdue product features in Q2. Customer churn fell three points the same quarter — almost certainly causally related, though we will not claim sole credit. The next stage of the roadmap is a sales-qualification agent that runs against inbound demo requests using the same grounding-and-escalation pattern. He has also asked us to set up a quarterly review to check the bot has not drifted as the product evolves. That is the right instinct. Grounded chatbots need pruning, not just planting.',
      },
    ],
    tags: ['Customer Service', 'SaaS', 'Startup'],
  },

  // ---------------------------------------------------------------------------
  // 3) Northwind Agency — strategy audit prevented A$120K of waste
  // ---------------------------------------------------------------------------
  {
    slug: 'northwind-marketing-strategy-audit',
    title: 'Northwind Agency: a five-week strategy audit that prevented A$120K of AI waste',
    customerName: 'Northwind Agency',
    customerInitials: 'NA',
    industry: 'professional-services',
    location: 'Sydney, NSW',
    size: '15 staff',
    publishedAt: '2026-02-26',
    updatedAt: '2026-04-08',
    excerpt:
      'A Sydney marketing agency was about to over-engineer its AI investment. A five-week audit shipped two high-ROI automations and told them what NOT to automate.',
    heroIllustration: 'governance',
    challenge:
      'Northwind Agency, a 15-person Sydney marketing shop, was a year into AI adoption and starting to lose the plot. Three different team leads were piloting three different platforms. The leadership team had been quoted A$180K for a "full agency AI transformation". The founder, Priya, had a quiet suspicion that most of it would never get used. She wanted a senior outside view that was not selling a build.',
    solution:
      'A five-week strategy audit mapped every existing workflow against an effort-versus-ROI quadrant. Two automations were greenlit and shipped during the audit itself: campaign-brief drafting and weekly client reporting. Six others were explicitly ruled out — including the agency-wide content engine that was the centrepiece of the original A$180K proposal.',
    outcomeMetrics: [
      { label: 'Automations shipped', value: '2', caption: 'Within the 5-week audit' },
      { label: 'Waste avoided', value: 'A$120K+', caption: 'vs the original proposal' },
      { label: 'Audit to live', value: '5 weeks', caption: 'End-to-end' },
      { label: 'Campaign output', value: '+22%', caption: 'Q1 vs the prior quarter' },
    ],
    servicesUsed: ['ai-mentor', 'package-5', 'cloud-architecture'],
    durationWeeks: 5,
    paybackMonths: 2,
    serviceTier: 'sme',
    pullQuote: {
      text: 'They told us what NOT to automate. That is what good consulting looks like.',
      person: 'Priya Raman',
      role: 'Founder & CEO, Northwind Agency',
    },
    sections: [
      {
        type: 'paragraph',
        text: 'Northwind Agency does brand-led marketing for mid-market Australian clients — most of them in financial services, professional services, and not-for-profit. Priya, the founder, had been an early believer in AI. By the start of 2026 she was an early sceptic. Three of her team leads had each picked a different platform. None of the three pilots talked to each other. None of them had a measurable ROI. And a competing agency had just published a LinkedIn post about their "fully AI-native creative studio" that, on closer reading, was almost entirely vapour.',
      },
      {
        type: 'paragraph',
        text: 'The proposal that landed on her desk that week — A$180K, six-month "agency-wide AI transformation" — would have made the situation worse. It would have layered a fourth platform on top of the three already in flight. She wanted a second opinion. Specifically, she wanted someone who would tell her where to spend money and where not to. We took the brief and made the no-build version of it the entire deliverable.',
      },
      {
        type: 'heading',
        text: 'The audit method',
      },
      {
        type: 'paragraph',
        text: 'Five weeks. Three artefacts. We mapped Northwind\'s 41 recurring workflows onto an effort-versus-impact quadrant, scored each one for AI-suitability, and stress-tested the top eight with the team leads who actually do the work. The output was a single page that anyone in the agency could read in three minutes.',
      },
      {
        type: 'illustration',
        name: 'roi-quadrant',
        caption: 'The effort-vs-impact quadrant. Top-left wins. Top-right buys you a meeting. Bottom is the no-go.',
      },
      {
        type: 'heading',
        text: 'What we automated',
      },
      {
        type: 'paragraph',
        text: 'Two workflows landed cleanly in the high-impact, low-effort quadrant. We shipped both during the audit, before the final report was even drafted. The first was campaign-brief drafting — taking a one-page client intake and producing a structured creative brief that the senior strategist would then refine. The second was weekly client reporting — reading the campaign metrics and writing the narrative paragraph that account managers used to bookend the data.',
      },
      {
        type: 'list',
        items: [
          'Campaign-brief drafting. Senior strategists now spend 25% less time on the bottom of the funnel and 25% more on positioning.',
          'Weekly client reporting. Account managers reclaimed roughly two hours a week each. Reports go out a day earlier.',
          'No new platform was bought. Both automations run inside tools the agency already pays for.',
        ],
      },
      {
        type: 'heading',
        text: 'What we explicitly did not automate',
      },
      {
        type: 'paragraph',
        text: 'This is the part that mattered. The original A$180K proposal centred on an "agency-wide content engine" — an AI system that would generate a steady stream of social posts, blog drafts, and ad copy across the whole client roster. We recommended against it. Northwind\'s competitive advantage is brand voice. Generic content production is not where their margin lives. Spending six months and A$120K building a generic content engine would have moved them in exactly the wrong direction. We told Priya that. She agreed. The proposal was declined, the budget was redirected to two senior creative hires, and Q1 campaign output went up 22% on the back of those hires alone.',
      },
      {
        type: 'metrics-row',
        metrics: [
          { label: 'Workflows audited', value: '41' },
          { label: 'Automations shipped', value: '2' },
          { label: 'Waste avoided', value: 'A$120K+' },
          { label: 'Campaign output', value: '+22%' },
        ],
      },
      {
        type: 'pullquote',
        quote: 'They told us what NOT to automate. That is what good consulting looks like.',
        attribution: 'Priya Raman, Founder & CEO, Northwind Agency',
      },
      {
        type: 'heading',
        text: 'The lesson for other agencies',
      },
      {
        type: 'paragraph',
        text: 'Almost every marketing agency we speak to is being pitched a content engine. Almost none of them need one. The question worth asking is: which parts of our service does AI commoditise, and which parts does it amplify? If you are an agency selling brand voice, AI is not your replacement engine — it is your senior strategist\'s personal assistant. We will defend that distinction every time, including when it costs us a build engagement. Northwind is now a quarterly retainer client. The strategy work compounds; the build work would not have.',
      },
    ],
    tags: ['Marketing', 'Strategy', 'Audit'],
  },

  // ---------------------------------------------------------------------------
  // 4) Bendigo medical practice — Medicare claims + AHPRA-aligned content
  // ---------------------------------------------------------------------------
  {
    slug: 'bendigo-medical-practice-medicare-claims',
    title: 'A Victorian regional medical practice cut admin 40% without compromising AHPRA standards',
    customerName: 'A Victorian regional medical practice',
    customerInitials: 'RP',
    industry: 'healthcare',
    location: 'Bendigo, VIC',
    size: '6 GPs + 4 admin',
    publishedAt: '2026-02-04',
    updatedAt: '2026-04-30',
    excerpt:
      'Anonymised. A regional GP practice combined a supervised Medicare claim drafter, AHPRA-aligned content review, and an after-hours patient FAQ bot — without changing any clinical judgement.',
    heroIllustration: 'governance',
    challenge:
      'A Victorian regional GP practice — six GPs and four administrative staff — was losing too much clinician time to non-clinical work. Medicare claims rework, AHPRA-aligned patient education content, and after-hours FAQ phone calls were eating at least one full day per GP per month. The principal GP was clear that nothing we built could touch clinical judgement, modify clinical records, or operate without a clinician sign-off.',
    solution:
      'Three narrow, supervised tools were deployed under a strict governance frame. A Medicare claim drafter that proposes a code and rationale for human review. An AHPRA-aligned content reviewer that flags any patient-education draft against the regulator\'s advertising guidelines. An after-hours FAQ chatbot that answers only from the practice\'s public website and explicitly tells callers to phone the on-call line for anything clinical.',
    outcomeMetrics: [
      { label: 'Admin time per GP', value: '−40%', caption: 'Compared to the prior quarter' },
      { label: 'Compliance breaches', value: '0', caption: 'Across the 6-month review' },
      { label: 'After-hours FAQ', value: '24/7', caption: 'Previously: voicemail only' },
      { label: 'Monthly cost saving', value: 'A$4,200', caption: 'Reduced bureau workload' },
    ],
    servicesUsed: ['agents-industry', 'cloud-architecture', 'ai-mentor'],
    durationWeeks: 8,
    paybackMonths: 4,
    serviceTier: 'sme',
    pullQuote: {
      text: 'The AHPRA-aligned content review check has caught two near-misses on patient education we would have missed.',
      person: 'Principal GP',
      role: 'Bendigo, VIC',
    },
    sections: [
      {
        type: 'paragraph',
        text: 'This case study is anonymised at the practice\'s request, in line with the Australian Privacy Principles and AHPRA advertising guidelines. The customer is a six-GP general practice in regional Victoria with four administrative staff, an established Medicare billing relationship through a third-party bureau, and a well-loved place in its community. None of those facts are at risk in this story. What was at risk was clinician burnout. The principal GP was working twelve-hour days, half of which were not clinical.',
      },
      {
        type: 'paragraph',
        text: 'The brief was unusually clear. Three rules, all immutable. First: nothing AI does may modify a clinical record. Second: every Medicare claim, every patient-facing piece of content, every patient-message draft must be reviewed by a human clinician or practice manager before it goes anywhere. Third: anything that smells like clinical advice must redirect to a clinician, full stop. Inside those rules, we had room to build.',
      },
      {
        type: 'heading',
        text: 'The five-step pipeline',
      },
      {
        type: 'illustration',
        name: 'flow-five-step',
        caption: 'Ingest, ground, draft, review, log. Human review is a non-removable gate.',
      },
      {
        type: 'paragraph',
        text: 'Each of the three tools shares the same five-step shape: ingest a document or query, ground against an approved corpus, draft an output, route to a human reviewer, log the decision in an immutable audit trail. The Medicare drafter grounds against the MBS. The content reviewer grounds against the AHPRA advertising guidelines and the practice\'s own brand book. The FAQ bot grounds against only the public-facing pages of the practice website and a single FAQ page that the practice manager owns.',
      },
      {
        type: 'heading',
        text: 'AU compliance posture',
      },
      {
        type: 'list',
        items: [
          'Australian Privacy Principles (APP). All personally identifying information stays in Australian-hosted infrastructure with explicit retention rules.',
          'AHPRA advertising guidelines. The content reviewer flags testimonials, comparative claims, and any wording that risks misleading vulnerable patients.',
          'Medicare claims. Every claim is human-reviewed before submission. The agent never auto-files anything.',
          'Clinical scope. The FAQ bot has a hard-coded refusal pattern for any query containing clinical signals — and a banner that says "for clinical advice, please call us".',
        ],
      },
      {
        type: 'heading',
        text: 'What changed in 90 days',
      },
      {
        type: 'paragraph',
        text: 'After ninety days the principal GP measured admin time across the six clinicians. It was down forty per cent on average — closer to fifty per cent for the two GPs who had embraced the drafter the fastest. The bureau\'s monthly invoice dropped roughly A$4,200 because their workload had compressed. Importantly, the practice manager reported zero compliance breaches across the review window, and the AHPRA-aligned reviewer flagged two near-misses on patient education content that the practice agreed it would have published unchanged otherwise.',
      },
      {
        type: 'metrics-row',
        metrics: [
          { label: 'Admin time / GP', value: '−40%' },
          { label: 'Compliance issues', value: '0' },
          { label: 'After-hours FAQ', value: '24/7 live' },
          { label: 'Bureau cost / mo', value: '−A$4,200' },
        ],
      },
      {
        type: 'pullquote',
        quote: 'The AHPRA-aligned content review check has caught two near-misses on patient education we would have missed.',
        attribution: 'Principal GP, Bendigo VIC',
      },
      {
        type: 'heading',
        text: 'What we will and will not extend',
      },
      {
        type: 'paragraph',
        text: 'The practice has asked about extending the pattern to recall management and to chronic-disease care plans. We have agreed to the recall extension because it is administrative — generating recall letters from a structured registry, with human sign-off. We have declined the care-plan extension. Care plans are clinical artefacts and our governance principle is unambiguous: AI does not write clinical content unsupervised, and we will not pretend otherwise. The principal GP\'s response was the right one — she said the boundary is the reason the rest of the work was trustworthy.',
      },
      {
        type: 'paragraph',
        text: 'For other practices considering this pattern: start with one workflow, write the governance rules in plain English before you write any code, and budget for the human review time on day one. The systems work because they are slow at the right moments. That is the whole point.',
      },
    ],
    tags: ['Healthcare', 'Medicare', 'AHPRA', 'Regional'],
  },

  // ---------------------------------------------------------------------------
  // 5) Surry Hills cafe group — multilingual menus + review replies
  // ---------------------------------------------------------------------------
  {
    slug: 'surry-hills-cafe-multilingual-menus',
    title: 'A Sydney cafe group went multilingual in four weeks — and bookings rose 12%',
    customerName: 'A Sydney cafe group',
    customerInitials: 'CG',
    industry: 'hospitality',
    location: 'Surry Hills, NSW',
    size: '3 venues, 22 staff',
    publishedAt: '2026-01-20',
    updatedAt: '2026-04-15',
    excerpt:
      'Anonymised. A three-venue Sydney cafe operator launched menus in five languages, cleared its review-reply backlog, and got six hours a week of owner time back.',
    heroIllustration: 'community',
    challenge:
      'A three-venue Sydney cafe group serving Surry Hills, Redfern, and Newtown was losing repeat tourist business because its menus existed only in English and its review-reply backlog stretched three weeks. Six different language groups appeared regularly in the customer base — Mandarin, Cantonese, Vietnamese, Korean, Japanese, and Spanish — and the owner-operator was personally drafting every supplier email and review reply on top of running service.',
    solution:
      'Three small AI tools were rolled out in four weeks. A menu translator that produces print-ready PDFs in five customer languages with seasonal updates handled in twenty minutes. A review-reply assistant that drafts tone-matched responses across the venues\' three slightly different brand voices. A supplier-comms drafter that turns three-line owner notes into clean, polite, professional emails to roasters, dairies, and bakers.',
    outcomeMetrics: [
      { label: 'Languages live', value: '5', caption: 'Plus English' },
      { label: 'Review-reply time', value: '< 4 hrs', caption: 'Was 3 weeks' },
      { label: 'Owner time freed', value: '6 hrs / week', caption: 'Across all 3 venues' },
      { label: 'Repeat bookings', value: '+12%', caption: 'Q1 vs Q4 2025' },
    ],
    servicesUsed: ['ai-starter', 'agents-industry', 'toolkit-pro'],
    durationWeeks: 4,
    paybackMonths: 2,
    serviceTier: 'sme',
    pullQuote: {
      text: 'Tourist visitors message in their own language and get menus in their own language. Bookings up.',
      person: 'Owner-operator',
      role: 'Surry Hills, NSW',
    },
    sections: [
      {
        type: 'paragraph',
        text: 'This Sydney cafe group runs three venues across Surry Hills, Redfern, and Newtown. The owner-operator — anonymous at her own request, mostly because she does not want her competitors to copy the playbook — has been running the group for nine years. Her brand is the warmth of the staff, the consistency of the coffee, and the fact that regulars are remembered. She did not want any of that to change. She just wanted to stop spending Sundays catching up on review replies and supplier emails.',
      },
      {
        type: 'paragraph',
        text: 'The trigger was a TripAdvisor review left in Mandarin that complained, accurately, that the menu had no Mandarin version. The reviewer left a four-star rating with a polite note that they would not be back unless that changed. The owner-operator showed us the review on the same call she signed our engagement letter. "If we lost one of those, we have lost a hundred."',
      },
      {
        type: 'heading',
        text: 'The three-tool stack',
      },
      {
        type: 'illustration',
        name: 'flow-three-step',
        caption: 'Translate, reply, draft. Three small tools, one consistent brand voice.',
      },
      {
        type: 'list',
        items: [
          'Menu translator. Pulls the master English menu, produces print-ready PDFs in Mandarin, Cantonese, Vietnamese, Korean, and Spanish. Seasonal updates take twenty minutes end-to-end.',
          'Review-reply assistant. Drafts tone-matched replies for each of the three venues\' brand voices. Owner reviews and presses send.',
          'Supplier-comms drafter. Turns a three-line note into a clean professional email. Used most often for orders, complaints, and seasonal pauses.',
        ],
      },
      {
        type: 'heading',
        text: 'What four weeks looked like',
      },
      {
        type: 'paragraph',
        text: 'Week one was discovery and brand-voice capture. We sat with the owner-operator and her two longest-tenured baristas and recorded the difference in tone between the three venues — the Surry Hills flagship is warmer and more verbose; Redfern is shorter and a touch dryer; Newtown is the youngest and the most playful. Week two we shipped the menu translator and got the printer queued. Week three we shipped the review-reply assistant and cleared the three-week backlog in a single 90-minute session. Week four we shipped the supplier drafter and trained the venue managers.',
      },
      {
        type: 'metrics-row',
        metrics: [
          { label: 'Languages live', value: '5' },
          { label: 'Reply time', value: '< 4 hrs' },
          { label: 'Owner hrs / wk', value: '+6' },
          { label: 'Repeat bookings', value: '+12%' },
        ],
      },
      {
        type: 'heading',
        text: 'What the regulars noticed',
      },
      {
        type: 'paragraph',
        text: 'The owner-operator was nervous about one thing: that AI-drafted review replies would sound robotic and undo nine years of relationship-building. We took it seriously. Every reply still goes out under her name and is reviewed before sending — the assistant proposes, she disposes. The first week she edited roughly half of the drafts. By week four she was editing about one in eight. The regulars she asked could not tell the difference, and that was the only test that mattered.',
      },
      {
        type: 'pullquote',
        quote: 'Tourist visitors message in their own language and get menus in their own language. Bookings up.',
        attribution: 'Owner-operator, Surry Hills cafe group',
      },
      {
        type: 'heading',
        text: 'Where the upside came from',
      },
      {
        type: 'paragraph',
        text: 'Repeat bookings rose twelve per cent in the first quarter the languages were live, against a flat market. Some of that is mean reversion after a slow Q4. Most of it, the owner believes, is that international visitors who recognise their own language on a menu come back. The supplier drafter had a smaller but real benefit too: a roaster commented that her emails had become "noticeably more pleasant", which was very kind given that her emails had previously been four words long and sent at midnight.',
      },
      {
        type: 'paragraph',
        text: 'Six hours a week back is not a productivity headline. It is the difference between burning out and not burning out. That, more than any of the metrics in the table above, is what kept this engagement on the books. The next stage is a roster-drafting tool for the three venue managers, which we will scope in Q3. We are not in a hurry. The brand voice is the asset. We will not put it at risk for a marginal feature.',
      },
    ],
    tags: ['Hospitality', 'Multilingual', 'Sydney'],
  },
];

// ─────────────────────────── HELPERS ───────────────────────────

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}

export function getCaseStudiesByIndustry(industry: Industry): CaseStudy[] {
  return caseStudies.filter((c) => c.industry === industry);
}

export function getCaseStudiesByTier(tier: CaseStudyServiceTier): CaseStudy[] {
  return caseStudies.filter((c) => c.serviceTier === tier);
}

export function getSortedCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getRelatedCaseStudies(current: CaseStudy, limit = 3): CaseStudy[] {
  // Score: same industry +3, shared tag +1, same tier +1
  const scored = caseStudies
    .filter((c) => c.slug !== current.slug)
    .map((c) => {
      let score = 0;
      if (c.industry === current.industry) score += 3;
      if (c.serviceTier === current.serviceTier) score += 1;
      const sharedTags = c.tags.filter((t) => current.tags.includes(t)).length;
      score += sharedTags;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score || (a.c.publishedAt < b.c.publishedAt ? 1 : -1));
  return scored.slice(0, limit).map((s) => s.c);
}

export function getAvailableIndustries(): Industry[] {
  const set = new Set<Industry>();
  for (const c of caseStudies) set.add(c.industry);
  return Array.from(set);
}

export function getAvailableTiers(): CaseStudyServiceTier[] {
  const set = new Set<CaseStudyServiceTier>();
  for (const c of caseStudies) set.add(c.serviceTier);
  return Array.from(set);
}

export function countWords(study: CaseStudy): number {
  let total = 0;
  total += (study.challenge ?? '').split(/\s+/).filter(Boolean).length;
  total += (study.solution ?? '').split(/\s+/).filter(Boolean).length;
  for (const s of study.sections) {
    if (s.type === 'paragraph' || s.type === 'heading') {
      total += (s.text ?? '').split(/\s+/).filter(Boolean).length;
    } else if (s.type === 'list') {
      total += s.items.reduce((a, i) => a + i.split(/\s+/).filter(Boolean).length, 0);
    } else if (s.type === 'pullquote') {
      total += (s.quote ?? '').split(/\s+/).filter(Boolean).length;
    } else if (s.type === 'metrics-row') {
      total += s.metrics.reduce(
        (a, m) =>
          a +
          (m.label ?? '').split(/\s+/).filter(Boolean).length +
          (m.value ?? '').split(/\s+/).filter(Boolean).length +
          (m.caption ?? '').split(/\s+/).filter(Boolean).length,
        0,
      );
    } else if (s.type === 'illustration') {
      total += (s.caption ?? '').split(/\s+/).filter(Boolean).length;
    }
  }
  return total;
}
