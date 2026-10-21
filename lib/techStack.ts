export interface StepTool {
  name: string
  src: string
}

// Vector marks for crisp rendering at any size (Simple Icons, plus the Figma mark).
const ICON = '/Portfolio Assets/Tool Icons'
const figma: StepTool = { name: 'Figma', src: `${ICON}/figma.svg` }
const claude: StepTool = { name: 'Claude', src: `${ICON}/claude.svg` }
const cursor: StepTool = { name: 'Cursor', src: `${ICON}/cursor.svg` }
const storybook: StepTool = { name: 'Storybook', src: `${ICON}/storybook.svg` }
const posthog: StepTool = { name: 'PostHog', src: `${ICON}/posthog.svg` }

export interface StackStep {
  id: string
  verb: string
  title: string
  tool: StepTool
  how: string
}

// DRAFT copy: review and edit the `how` strings.
export const STACK_STEPS: readonly StackStep[] = [
  {
    id: 'figma',
    verb: 'Sketch',
    title: 'Figma',
    tool: figma,
    how: 'Every project starts here. I sketch low-fidelity concepts, test flows on rough frames and settle the layout before anything gets polished.',
  },
  {
    id: 'claude',
    verb: 'Prototype',
    title: 'Claude Code / Claude Design',
    tool: claude,
    how: 'I research the problem, map flows and write specs with Claude, then turn the sketch into a working prototype with Claude Design and Claude Code.',
  },
  {
    id: 'cursor',
    verb: 'Review',
    title: 'Cursor',
    tool: cursor,
    how: 'I open the code in Cursor to edit it by hand and review every change, in React, TypeScript and Tailwind. AI helps me read unfamiliar code and catch issues before it ships through Git.',
  },
  {
    id: 'storybook',
    verb: 'Systemize',
    title: 'Storybook',
    tool: storybook,
    how: 'Repeated patterns become components with documented states, tokens and accessibility checks against WCAG 2.2, so design and code stay in sync.',
  },
  {
    id: 'posthog',
    verb: 'Measure',
    title: 'PostHog',
    tool: posthog,
    how: 'After launch I watch funnels and session replays to see where people actually get stuck. What I find goes straight into the next round of sketches.',
  },
]
