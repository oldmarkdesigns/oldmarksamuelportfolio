import Image from 'next/image'
import type { Tool } from '@/lib/tools'

export function ToolBadges({ items }: { items: readonly Tool[] }) {
  if (items.length === 0) return null

  return (
    <div className="absolute top-3 right-3 flex gap-1.5">
      {items.map((tool) => (
        <span
          key={tool.name}
          title={tool.name}
          className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0 shadow ${
            'contain' in tool && tool.contain ? 'p-1' : ''
          }`}
        >
          <Image
            src={tool.src}
            alt={tool.name}
            width={24}
            height={24}
            className={`w-full h-full ${'contain' in tool && tool.contain ? 'object-contain' : 'object-cover'}`}
          />
        </span>
      ))}
    </div>
  )
}

export function SkillsAndToolsGrid({ skills }: { skills: readonly { category: string; name: string; description: string; tools: readonly Tool[] }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skills.map((skill) => (
        <div key={skill.name} className="cs-surface-card relative">
          <ToolBadges items={skill.tools} />
          <p className="cs-label pr-16">{skill.category}</p>
          <h3 className="cs-card-title">{skill.name}</h3>
          <p className="cs-copy">{skill.description}</p>
        </div>
      ))}
    </div>
  )
}
