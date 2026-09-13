export const TOOLS = {
  gemini: { name: 'Gemini', src: '/Portfolio Assets/Tool Icons/gemini.png' },
  claude: { name: 'Claude', src: '/Portfolio Assets/Tool Icons/claude.png' },
  chatgpt: { name: 'ChatGPT', src: '/Portfolio Assets/Tool Icons/chatgpt.png' },
  cursor: { name: 'Cursor', src: '/Portfolio Assets/Tool Icons/cursor.png' },
  codex: { name: 'Codex', src: '/Portfolio Assets/Tool Icons/codex.png' },
  webflow: { name: 'Webflow', src: '/Portfolio Assets/Tool Icons/webflow.png' },
  wordpress: { name: 'WordPress', src: '/Portfolio Assets/Tool Icons/wordpress.png' },
  figma: { name: 'Figma', src: '/Portfolio Assets/Tool Icons/figma.png' },
  framer: { name: 'Framer', src: '/Portfolio Assets/Tool Icons/framer.png' },
  notion: { name: 'Notion', src: '/Portfolio Assets/Tool Icons/notion.png' },
  miro: { name: 'Miro', src: '/Portfolio Assets/Tool Icons/miro.svg' },
  goldfish: { name: 'Goldfish', src: '/Portfolio Assets/Tool Icons/goldfish_logo.png', contain: true },
} as const

export type Tool = (typeof TOOLS)[keyof typeof TOOLS]

export interface SkillCard {
  category: string
  name: string
  description: string
  tools: readonly Tool[]
}
