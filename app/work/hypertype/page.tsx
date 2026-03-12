import CaseStudyPage, { CaseStudyData } from '@/components/CaseStudyPage'

const hypertypeCaseStudy: CaseStudyData = {
  title: 'Hypertype',
  tagline:
    'Reframing onboarding and dashboard activation to clarify value faster and create stronger upgrade intent for free users.',
  backHref: '/#work',
  heroImage: {
    src: '/Portfolio Assets/Work/Hypertype/Wallpaper 2.png',
    alt: 'Hypertype AFTER redesign banner showing the updated dashboard experience.',
    width: 1200,
    height: 800,
  },
  heroCaption: 'AFTER: redesigned dashboard entry experience focused on activation clarity and upgrade intent.',
  snapshot: {
    role: 'Product Designer (UX/UI) - design challenge',
    timeline: 'November 2024',
    team: 'Solo designer with simulated product constraints',
    problem:
      'The initial onboarding and welcome dashboard did not clearly communicate value progression, making it harder to guide free users toward paid plans.',
    measurableOutcomes: [
      '1 end-to-end redesigned dashboard welcome concept produced in a single challenge cycle.',
      '5 connected product surfaces redesigned to support activation and upgrade cues (Dashboard, Get Started, Feed Brain, Help Center, Subscription).',
      'No production A/B test data was available; outcomes are framed as delivery and UX-conversion proxy evidence.',
    ],
  },
  summary: [
    'This project was a conversion-focused redesign challenge for Hypertype.ai. I chose to redesign the dashboard welcome experience and connected flows where users evaluate value early in the product journey.',
    'The goal was to reduce ambiguity, improve progression clarity, and create clearer upgrade signals without relying on aggressive paywall patterns.',
  ],
  problemStatement:
    'As a first-time user, the initial dashboard and question flow felt under-explained. Key actions were present, but users were not clearly shown why each step mattered or how they moved toward product value and paid-plan relevance.',
  constraints: [
    'Design challenge context meant no direct access to production analytics or live experiments.',
    'Needed to prioritize conversion intent while keeping trust and comprehension high.',
    'Work had to be delivered quickly with realistic scope and coherent interaction logic.',
  ],
  ownership: {
    owned: [
      'Problem framing and flow prioritization for activation-to-upgrade moments.',
      'Low-fidelity and high-fidelity UX/UI design across key surfaces.',
      'Feature hierarchy and lock-state patterns to communicate premium value.',
    ],
    shared: [
      'Assumptions based on comparable SaaS onboarding patterns and conversion heuristics.',
      'Tradeoff framing between engagement prompts and cognitive load.',
      'Hypothesis design for what should be tested first in production.',
    ],
    outOfScope: [
      'Implementation and engineering instrumentation for production analytics.',
      'Live experimentation setup and billing funnel integration.',
      'Retention outcomes beyond initial activation and upgrade intent.',
    ],
  },
  decisions: [
    {
      title: 'Add a clearer transition into first-time questions',
      decision:
        'I added contextual framing before users entered the question flow, so they understood purpose and expected outcome upfront.',
      why:
        'The original sequence moved users directly into prompts without enough orientation, increasing confusion risk.',
      result:
        'The redesigned flow better supports comprehension and progression clarity, which is a conversion proxy for early activation quality.',
      image: {
        src: '/Portfolio Assets/Work/Hypertype/Get Started Hifi.png',
        alt: 'Get Started high-fidelity flow with clearer first-step framing.',
        width: 800,
        height: 600,
        caption: 'Outcome: stronger first-step orientation before entering question flows.',
      },
    },
    {
      title: 'Use locked-feature visibility as a value signal',
      decision:
        'I intentionally exposed premium-locked elements in the dashboard to communicate capability depth without interrupting core free usage.',
      why:
        'Users need to see premium value in-context before considering an upgrade decision.',
      result:
        'Upgrade pathways are now embedded in usage context rather than isolated in pricing-only moments (proxy improvement).',
      image: {
        src: '/Portfolio Assets/Work/Hypertype/Locked Feature.png',
        alt: 'Dashboard with premium-locked feature visibility.',
        width: 800,
        height: 600,
        caption: 'Outcome: in-context premium signaling without blocking core free tasks.',
      },
    },
    {
      title: 'Design connected support flows instead of a single-page redesign',
      decision:
        'I extended the redesign into Get Started, Feed Brain, Help Center, and Subscription surfaces to preserve consistency across the full activation arc.',
      why:
        'Conversion friction usually appears across transitions, not only on a single screen.',
      result:
        'The concept now presents a consistent value narrative from onboarding through plan evaluation.',
      image: {
        src: '/Portfolio Assets/Work/Hypertype/Help Center Design.png',
        alt: 'Help Center redesign aligned with activation journey.',
        width: 800,
        height: 600,
        caption: 'Outcome: connected support surface aligned with activation and conversion flow.',
      },
    },
  ],
  beforeAfter: {
    title: 'Dashboard progression before/after',
    description:
      'The redesign shifts from generic entry into a clearer activation sequence with explicit value cues and premium intent scaffolding.',
    before: {
      src: '/Portfolio Assets/Work/Hypertype/Lofi.png',
      alt: 'Low-fidelity dashboard concept showing early layout exploration.',
      width: 800,
      height: 600,
      caption: 'Before: low-fidelity structure with initial information architecture.',
    },
    after: {
      src: '/Portfolio Assets/Work/Hypertype/Wallpaper 2.png',
      alt: 'Final high-fidelity dashboard concept with clear progression and value emphasis.',
      width: 1200,
      height: 800,
      caption: 'After: high-fidelity flow with clearer progression and premium cues.',
    },
    annotations: [
      'Added clearer progression framing before core user actions.',
      'Premium/locked states now communicate value without hijacking primary tasks.',
      'Visual hierarchy emphasizes what to do next and why it matters.',
    ],
  },
  supportingVisuals: [
    {
      src: '/Portfolio Assets/Work/Hypertype/Get Started Hifi.png',
      alt: 'Get Started high-fidelity onboarding screen redesign.',
      width: 800,
      height: 600,
      caption: 'Get Started: reduced friction and clearer first action guidance.',
    },
    {
      src: '/Portfolio Assets/Work/Hypertype/Feed Brain.png',
      alt: 'Feed Brain interaction design showing personalization setup.',
      width: 800,
      height: 600,
      caption: 'Feed Brain: clearer context for setup tasks tied to future value.',
    },
    {
      src: '/Portfolio Assets/Work/Hypertype/Help Center Design.png',
      alt: 'Help Center redesign focused on findability and support clarity.',
      width: 800,
      height: 600,
      caption: 'Help Center: support surfaces aligned with activation journey.',
    },
  ],
  outcomes: {
    intro:
      'Because this was a design challenge rather than a live release, outcomes focus on delivered scope and conversion-readiness proxies.',
    metrics: [
      {
        type: 'Measured',
        value: '5 surfaces',
        label: 'Redesigned in one coherent conversion narrative',
        context:
          'Dashboard, Get Started, Feed Brain, Help Center, and Subscription were redesigned in November 2024.',
      },
      {
        type: 'Measured',
        value: '1 end-to-end concept',
        label: 'Challenge-ready handoff package delivered',
        context:
          'Included low-fi exploration, high-fi solution, and supporting flow screens for activation and upgrade intent.',
      },
      {
        type: 'Proxy',
        value: 'Higher intent clarity',
        label: 'Upgrade rationale becomes visible in product context',
        context:
          'Design uses in-context premium signaling and clearer progression framing to improve upgrade decision readiness.',
      },
    ],
    note:
      'Note: No production funnel or experiment data was available in this challenge setting, so conversion impact is intentionally framed as proxy evidence.',
  },
  nextImprovements: [
    'Run first-session funnel instrumentation to quantify where users drop before seeing premium value.',
    'Test two lock-state strategies with A/B experiments (contextual tease vs milestone reveal).',
    'Add lightweight in-product education moments tied to real user tasks rather than static onboarding text.',
  ],
}

export default function HypertypePage() {
  return <CaseStudyPage caseStudy={hypertypeCaseStudy} />
}
