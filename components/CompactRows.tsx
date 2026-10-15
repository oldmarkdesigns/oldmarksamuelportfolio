import Image from 'next/image'
import type { ReactNode } from 'react'

/** Compact rows: a label on the left, the text on the right, several rows inside one card. Styles live in globals.css (.cs-rows, .cs-row). */

export function Row({
  title,
  kicker,
  asLabel,
  big,
  children,
}: {
  title: string
  kicker?: string
  asLabel?: boolean
  big?: boolean
  children: ReactNode
}) {
  return (
    <div className="cs-row">
      <div className="cs-row-head">
        {kicker ? <p className="cs-label cs-row-kicker">{kicker}</p> : null}
        {asLabel ? (
          <p className="cs-label cs-row-label">{title}</p>
        ) : (
          <h3 className={`cs-row-title ${big ? 'is-big' : ''}`}>{title}</h3>
        )}
      </div>
      <div className="cs-row-body">{children}</div>
    </div>
  )
}

export function RowList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="cs-list cs-list-compact">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

/** One card holding rows. */
export function RowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`cs-surface-card cs-rows ${className}`}>{children}</div>
}

type SkillTool = { name: string; src: string; contain?: boolean }

/** Skills & tools as rows: category and name on the left, description and tool icons on the right. */
export function CompactSkills({
  skills,
}: {
  skills: readonly { category: string; name: string; description: string; tools: readonly SkillTool[] }[]
}) {
  return (
    <RowCard>
      {skills.map((skill) => (
        <Row key={skill.name} title={skill.name} kicker={skill.category}>
          <p>{skill.description}</p>
          {skill.tools.length ? (
            <div className="cs-row-tools">
              {skill.tools.map((tool) => (
                <span
                  key={tool.name}
                  title={tool.name}
                  className={`w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0 ${
                    tool.contain ? 'p-0.5' : ''
                  }`}
                >
                  <Image
                    src={tool.src}
                    alt={tool.name}
                    width={20}
                    height={20}
                    className={`w-full h-full ${tool.contain ? 'object-contain' : 'object-cover'}`}
                  />
                </span>
              ))}
            </div>
          ) : null}
        </Row>
      ))}
    </RowCard>
  )
}
