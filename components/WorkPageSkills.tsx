import { ToolBadges } from '@/components/ToolBadges'
import type { SkillCard } from '@/lib/tools'

export default function WorkPageSkills({ skills, id = 'skills' }: { skills: readonly SkillCard[]; id?: string }) {
  return (
    <section id={id} className="scroll-mt-20 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Skills & Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="relative rounded-xl border border-gray-300/70 dark:border-gray-700/50 p-4"
          >
            <ToolBadges items={skill.tools} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 pr-16">{skill.category}</p>
            <h3 className="text-base font-semibold text-white text-gray-900 mb-1">{skill.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
