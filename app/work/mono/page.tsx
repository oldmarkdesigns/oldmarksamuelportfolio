import CaseStudyPage, { CaseStudyData } from '@/components/CaseStudyPage'

const monoCaseStudy: CaseStudyData = {
  title: 'Mono',
  imageQuality: 100,
  titleLogo: {
    darkSrc: '/Portfolio Assets/Work/Mono/mono-logo-dark.png',
    lightSrc: '/Portfolio Assets/Work/Mono/mono-logo-light.png',
    alt: 'Mono wordmark',
    width: 1075,
    height: 370,
    maxWidth: 130,
  },
  tagline:
    'A self-initiated concept where I designed and built an end-to-end design-system product flow, from first setup to editable token and component surfaces.',
  backHref: '/#work',
  liveHref: 'https://mono-puce-one.vercel.app/',
  liveLabel: 'Visit live prototype',
  heroImage: {
    src: '/Portfolio Assets/Work/Mono/designtokens.png',
    alt: 'Mono design tokens overview screen.',
    width: 1886,
    height: 929,
  },
  heroCaption:
    'Design Tokens overview in Mono with structured token categories and editing workflow.',
  snapshot: {
    role: 'Independent Product Designer + Frontend Builder (React/TypeScript)',
    timeline: 'January-February 2026',
    team: 'Solo concept project (no customers or clients involved)',
    problem:
      'Most design-system tools either overwhelm first-time users or hide too much control. I wanted to design a concept that supports both fast starts and deep editing across the same product.',
    measurableOutcomes: [
      '14 routed product surfaces implemented in the prototype shell (source: src/App.tsx route map, audited February 2026).',
      '10 core feature screens designed and built in one coherent flow (home light/dark, create-from-scratch state, AI generation, import from code, design tokens, colors, typography, buttons, component builder).',
      '3 import methods designed in one flow (file upload, GitHub repository, URL import) with a 5-step progress state model.',
    ],
  },
  summary: [
    'Mono is a self-initiated concept I built to test a complete design-system product journey, not just isolated UI screens. I designed the UX and implemented the frontend so every feature could be evaluated in a working flow.',
    'The concept covers multiple entry paths and production-like editing surfaces: create from scratch, generate with AI, import from code, and structured editing across tokens and components.',
  ],
  problemStatement:
    'I wanted Mono to answer one practical question: can a single product let users move from zero to a usable design-system foundation quickly, while still offering detailed control over colors, typography, buttons, and components?',
  constraints: [
    'Solo scope required tight prioritization around high-signal flows instead of full feature completeness.',
    'No customers, clients, or delivery stakeholders were involved, so I set the product direction and success criteria myself.',
    'No production backend in this phase, so persistence and user/workspace context were handled through local storage.',
    'No live user analytics yet, so outcomes are framed as shipped scope plus realistic product-readiness proxies.',
  ],
  ownership: {
    owned: [
      'Product framing, information architecture, and UX/UI for dashboard, creator, import, and settings flows.',
      'Frontend implementation in React + TypeScript + Tailwind + Zustand persistence.',
      'Interaction details for multi-path creation, processing states, and token editing surfaces.',
    ],
    shared: [
      'No shared ownership in this phase; product direction and execution were independently driven by me.',
      'External references were used only as market benchmarking, not as stakeholder requirements.',
      'All roadmap and quality decisions were self-managed in a solo concept cycle.',
    ],
    outOfScope: [
      'Real backend ingestion pipeline and asynchronous job orchestration.',
      'Live team collaboration, permissions, and enterprise security controls.',
      'Production validation with instrumented activation and retention funnels.',
    ],
  },
  decisions: [
    {
      title: 'Design parallel entry paths for different starting points',
      decision:
        'I built two explicit creation paths: a manual create-from-scratch state and an AI-assisted generation flow, both converging into the same editable system.',
      why:
        'Different users start differently. Some need immediate structure, others want full control from the first click.',
      result:
        'Mono supports both starting behaviors without forking into separate products or inconsistent data models.',
    },
    {
      title: 'Make code import transparent and staged',
      decision:
        'I designed Import from Code with three source options and explicit progress steps (uploading, analyzing, extracting, generating, complete).',
      why:
        'A single spinner hides what is happening and reduces trust in AI-assisted setup.',
      result:
        'The flow communicates system behavior clearly and creates a ready pattern for future real backend processing.',
    },
    {
      title: 'Treat editing surfaces as first-class product modules',
      decision:
        'I built dedicated screens for design tokens, color scheme, typography, buttons, and component builder instead of hiding these in one overloaded panel.',
      why:
        'Focused surfaces reduce cognitive load and make progression through setup/editing clearer.',
      result:
        'The concept demonstrates a modular editing system that feels navigable and scalable as feature depth grows.',
    },
  ],
  beforeAfter: {
    title: 'Two onboarding paths: manual setup vs AI generation',
    description:
      'Mono intentionally supports two valid starting modes so users can choose speed or control, then land in the same product model.',
    before: {
      src: '/Portfolio Assets/Work/Mono/designsystems-createfromscratch-state.png',
      alt: 'Mono create-from-scratch state in the design systems flow.',
      width: 1886,
      height: 929,
      caption: 'Manual path: create from scratch for full control from the start.',
    },
    after: {
      src: '/Portfolio Assets/Work/Mono/generatewithai.png',
      alt: 'Mono AI generation flow for creating a design system.',
      width: 1886,
      height: 929,
      caption: 'AI path: generate a starter system quickly and refine afterward.',
    },
    annotations: [
      'Both paths intentionally converge into the same editable product structure.',
      'Entry options reduce first-step friction without sacrificing later control.',
      'UI copy and hierarchy keep the two modes distinct but consistent.',
    ],
  },
  mediaLayout: 'single-column',
  supportingVisuals: [
    {
      src: '/Portfolio Assets/Work/Mono/importfromcode.png',
      alt: 'Import from Code feature screen with method options.',
      width: 1886,
      height: 929,
      caption: 'Import from Code: supports file upload, GitHub repositories, and URL-based import.',
    },
    {
      src: '/Portfolio Assets/Work/Mono/designtokens.png',
      alt: 'Design tokens overview screen in Mono.',
      width: 1886,
      height: 929,
      caption: 'Design Tokens overview: central place for token status and organization.',
    },
    {
      src: '/Portfolio Assets/Work/Mono/colorscheme.png',
      alt: 'Color scheme editing screen in Mono.',
      width: 1886,
      height: 929,
      caption: 'Color Scheme editor: dedicated surface for palette creation and adjustments.',
    },
    {
      src: '/Portfolio Assets/Work/Mono/typograpghy.png',
      alt: 'Typography screen in Mono.',
      width: 1886,
      height: 929,
      caption: 'Typography module: focused scale and type controls.',
    },
    {
      src: '/Portfolio Assets/Work/Mono/buttons.png',
      alt: 'Buttons editing surface in Mono.',
      width: 1886,
      height: 929,
      caption: 'Buttons module: component-level editing for common interactive patterns.',
    },
    {
      src: '/Portfolio Assets/Work/Mono/componentbuilder.png',
      alt: 'Component builder screen in Mono.',
      width: 1886,
      height: 929,
      caption: 'Component Builder: expansion path from token work into reusable UI parts.',
    },
  ],
  outcomes: {
    intro:
      'This is a solo concept outcome set, so evidence focuses on shipped scope and feature completeness rather than customer performance.',
    metrics: [
      {
        type: 'Measured',
        value: '14 routes',
        label: 'Implemented in the application shell',
        context:
          'Counted from defined routes in src/App.tsx during February 2026 code audit.',
      },
      {
        type: 'Measured',
        value: '10 feature screens',
        label: 'Delivered across onboarding and editing workflows',
        context:
          'Covers home (light/dark), manual setup, AI generation, import from code, design tokens, colors, typography, buttons, and component builder.',
      },
      {
        type: 'Measured',
        value: '3 methods + 5 states',
        label: 'Import from Code architecture',
        context:
          'Import supports file, GitHub, and URL input with explicit staged progress feedback.',
      },
    ],
    note:
      'Note: This is an independent concept build with no customer deployment. Usage, activation, and retention metrics require production release and instrumentation in a next phase.',
  },
  nextImprovements: [
    'Connect real repository parsing and async processing jobs to replace simulated import progress.',
    'Run usability tests focused on time-to-first-system and first-publish completion rate.',
    'Add collaboration permissions and review workflows for multi-user team environments.',
  ],
}

export default function MonoPage() {
  return <CaseStudyPage caseStudy={monoCaseStudy} />
}
