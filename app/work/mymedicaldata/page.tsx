import CaseStudyPage, { CaseStudyData } from '@/components/CaseStudyPage'

const myMedicalDataCaseStudy: CaseStudyData = {
  title: 'MyMedicalData',
  beforeAfterDecisionIndex: 0,
  tagline:
    'Designing trust-critical health experiences across onboarding, emergency medical access, AI guidance, and the public website.',
  backHref: '/#work',
  liveHref: 'https://www.mymedicaldata.se/',
  liveLabel: 'Visit live site',
  heroImage: {
    src: '/Portfolio Assets/Work/MMD/MMDCover.png',
    alt: 'MyMedicalData product screens shown in a device mockup.',
    width: 1200,
    height: 800,
  },
  heroCaption: 'Primary product surfaces for the Halsa+ experience.',
  snapshot: {
    role: 'Product Designer (UX/UI) with frontend collaboration',
    timeline: 'January 2025 - Present',
    team: 'Small cross-functional team: founder, developers, healthcare-informed stakeholders, and me as sole designer',
    problem:
      'Users needed to trust a new health product fast, complete secure sign-in without confusion, and access critical medical information quickly when stressed.',
    measurableOutcomes: [
      '3 core experiences redesigned in one cycle (onboarding, Medical ID, AI chat) between January-April 2025.',
      'Product and marketing touchpoints were aligned under one design language in Q1 2025 (delivery proxy).',
      'Analytics instrumentation is still being expanded, so current outcomes combine shipped scope plus moderated feedback proxies.',
    ],
  },
  summary: [
    'I lead product design at MyMedicalData and work across both app and web surfaces. The highest-risk challenge was trust: users share sensitive health data, so every step had to feel clear, intentional, and safe.',
    'I focused on three high-impact flows - onboarding, Medical ID, and AI chat - while partnering closely with developers to move work from Figma into production-ready behavior.',
  ],
  problemStatement:
    'The product had promising functionality, but key flows did not yet communicate confidence clearly enough for healthcare contexts. The goal was to reduce friction in first use while making critical information easier to understand under pressure.',
  constraints: [
    'Healthcare context raised the bar for clarity, readability, and perceived reliability.',
    'BankID needed to be visible as the primary path without overwhelming first-time users.',
    'Limited analytics coverage during this phase required relying on delivery and usability proxies.',
  ],
  ownership: {
    owned: [
      'UX/UI design for onboarding, Medical ID, and AI chat flows.',
      'Interaction patterns, visual hierarchy, and handoff documentation in Figma.',
      'Website experience updates to keep product and marketing language consistent.',
    ],
    shared: [
      'Feature scoping and implementation tradeoffs with developers and founder.',
      'Moderated review sessions to validate readability and confidence signals.',
      'Iteration planning based on technical constraints and release timing.',
    ],
    outOfScope: [
      'Clinical policy decisions and medical recommendation standards.',
      'Backend data integration and security infrastructure implementation.',
      'Model training and evaluation strategy for AI responses.',
    ],
  },
  decisions: [
    {
      title: 'Combine BankID-first entry with feature-led onboarding',
      decision:
        'I redesigned onboarding so BankID is the primary first action, then structured the next steps to progressively introduce key app features and what each one is for.',
      why:
        'The previous flow made secure sign-in feel secondary and did not clearly explain product value early, so users lacked both trust cues and feature context during first use.',
      result:
        'The updated flow reduces hesitation at sign-in and gives users a clearer understanding of core features by the time onboarding is complete, improving readiness for first real use.',
      image: {
        src: '/Portfolio Assets/Work/MMD/OnboardingFlow.png',
        alt: 'Onboarding flow showing progressive feature and information reveal across steps.',
        width: 2610,
        height: 1431,
        caption: 'Progressive onboarding: each step adds key information and product features before first use.',
      },
    },
    {
      title: 'Design Medical ID for emergency-time scanning',
      decision:
        'I structured Medical ID around high-priority fields first (allergies, medication, contacts) with clear read and edit states.',
      why:
        'Emergency scenarios demand fast comprehension; dense layouts fail when users or caregivers are under stress.',
      result:
        'The resulting information hierarchy became the reference model for implementation and stakeholder sign-off of emergency data presentation.',
      image: {
        src: '/Portfolio Assets/Work/MMD/Medical ID Flow.png',
        alt: 'Medical ID flow screens with emergency fields prioritized.',
        width: 800,
        height: 600,
        caption: 'Outcome: emergency-first Medical ID hierarchy for faster scanning.',
      },
    },
    {
      title: 'Add transparency patterns to AI chat responses',
      decision:
        'I introduced response framing that separates answer, context, and next step so users can understand what the AI is basing guidance on.',
      why:
        'Health-related AI needs explicit guardrails to avoid black-box behavior and reduce over-trust.',
      result:
        'Prototype reviews reported stronger confidence in response clarity, and the pattern is now used as the baseline for follow-up chat scenarios (proxy outcome).',
      image: {
        src: '/Portfolio Assets/Work/MMD/ChatMockup.png',
        alt: 'AI chat interface showing answer, context, and next-step structure.',
        width: 800,
        height: 600,
        caption: 'Outcome: transparent AI response structure with clearer guidance framing.',
      },
      additionalImages: [
        {
          src: '/Portfolio Assets/Work/MMD/halsa-gpt.png',
          alt: 'Halsa+ AI chat flow showing transparent health guidance and feature context.',
          width: 4040,
          height: 2148,
          caption: 'Additional AI onboarding/chat flow for feature guidance and contextual responses.',
        },
      ],
    },
  ],
  beforeAfter: {
    title: 'Onboarding before/after: secure entry made obvious',
    description:
      'The same flow was rebuilt to reduce ambiguity around the first action and to align visual hierarchy with user expectations.',
    before: {
      src: '/Portfolio Assets/Work/MMD/OldOnboarding.png',
      alt: 'Legacy onboarding layout where secure sign-in was less prominent.',
      width: 800,
      height: 600,
      caption: 'Before: lower emphasis on secure sign-in path.',
    },
    after: {
      src: '/Portfolio Assets/Work/MMD/Future Design-App-Login Flow.png',
      alt: 'Updated onboarding flow with secure sign-in prioritized and clearer step progression.',
      width: 1200,
      height: 800,
      caption: 'After: BankID-first hierarchy with clearer step progression.',
    },
    annotations: [
      'Secure sign-in is now a first-glance action instead of a secondary choice.',
      'Copy and hierarchy were reduced to essentials for faster orientation.',
      'Visual rhythm and spacing now match the broader product system.',
    ],
  },
  supportingVisuals: [
    {
      src: '/Portfolio Assets/Work/MMD/Medical ID Flow.png',
      alt: 'Medical ID flow screens showing emergency information structure.',
      width: 800,
      height: 600,
      caption: 'Medical ID flow focused on high-priority emergency fields.',
    },
    {
      src: '/Portfolio Assets/Work/MMD/halsa-gpt.png',
      alt: 'Halsa+ AI chat interface with contextual guidance and response framing.',
      width: 4040,
      height: 2148,
      caption: 'AI chat concept using answer, context, and next-step framing.',
    },
  ],
  outcomes: {
    intro:
      'During this phase, outcomes are a mix of shipped scope and validated proxy signals while product analytics coverage expands.',
    metrics: [
      {
        type: 'Measured',
        value: '3 core flows',
        label: 'Designed and shipped/prototyped in one delivery window',
        context:
          'Onboarding, Medical ID, and AI chat were completed between January-April 2025 across product workstreams.',
      },
      {
        type: 'Proxy',
        value: '1 shared system',
        label: 'App and website language aligned',
        context:
          'Component behavior, copy tone, and visual hierarchy were synchronized across product and web touchpoints in Q1 2025.',
      },
      {
        type: 'Proxy',
        value: 'Trust-first feedback',
        label: 'Clarity improved in stakeholder and usability reviews',
        context:
          'Review sessions consistently flagged onboarding clarity and emergency information readability as stronger in the updated flows.',
      },
    ],
    note:
      'Note: Activation, completion, and retention events are being instrumented; this case study intentionally labels current evidence as measured or proxy.',
  },
  nextImprovements: [
    'Instrument onboarding and Medical ID funnels to quantify completion and drop-off by step.',
    'Run larger external validation on AI response comprehension beyond internal/stakeholder reviews.',
    'Add dedicated accessibility stress-testing for dynamic type, screen readers, and low-attention emergency use.',
  ],
}

export default function MyMedicalDataPage() {
  return <CaseStudyPage caseStudy={myMedicalDataCaseStudy} />
}
