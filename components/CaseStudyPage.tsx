'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { SkillsAndToolsGrid } from '@/components/ToolBadges'
import { CompactSkills, Row, RowList } from '@/components/CompactRows'
import type { SkillCard } from '@/lib/tools'

interface CaseStudyImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

interface OutcomeSnapshot {
  role: string
  timeline: string
  team: string
  problem: string
  measurableOutcomes: string[]
}

interface DecisionItem {
  title: string
  decision: string
  why: string
  result: string
  image?: CaseStudyImage
  additionalImages?: CaseStudyImage[]
}

interface OwnershipModel {
  owned: string[]
  shared: string[]
  outOfScope: string[]
}

interface BeforeAfterBlock {
  title: string
  description?: string
  before: CaseStudyImage
  after: CaseStudyImage
  annotations: string[]
}

interface OutcomeMetric {
  value: string
  label: string
  context: string
  type: 'Measured' | 'Proxy'
}

interface OutcomesSection {
  intro: string
  metrics: OutcomeMetric[]
  note?: string
}

interface CaseStudyTitleLogo {
  lightSrc: string
  darkSrc: string
  alt: string
  width: number
  height: number
  maxWidth?: number
}

interface TitledPoint {
  title: string
  body: string
}

interface ApproachItem {
  title: string
  body: string
  /** What is still only planned for this principle. Shown after the body, so built and planned stay apart. */
  planned?: string
}

interface SolutionStep {
  title: string
  text: string
  image: CaseStudyImage
}

interface SolutionList {
  label: string
  title: string
  items: string[]
}

interface SolutionBlock {
  intro: string[]
  steps: SolutionStep[]
  built: SolutionList
  planned: SolutionList
  note?: string
}

export interface CaseStudyData {
  title: string
  /** Small line above the title. Defaults to "Case Study". */
  eyebrow?: string
  /** Show the card sections as compact rows (label left, text right) inside one card each. */
  compact?: boolean
  titleLogo?: CaseStudyTitleLogo
  imageQuality?: number
  beforeAfterDecisionIndex?: number
  tagline: string
  backHref: string
  liveHref?: string
  liveLabel?: string
  heroImage: CaseStudyImage
  heroCaption?: string
  snapshot: OutcomeSnapshot
  summary: string[]
  problemStatement: string
  /** Optional cards between the problem statement and the constraints, e.g. one per kind of user. */
  problemPoints?: TitledPoint[]
  constraints: string[]
  ownership: OwnershipModel
  /** Optional "Design approach" section: the principles behind the decisions. */
  approach?: { intro: string; items: ApproachItem[] }
  /** Optional "Solution" section: a walk through what exists, and what is built versus only planned. */
  solution?: SolutionBlock
  decisions: DecisionItem[]
  beforeAfter?: BeforeAfterBlock
  supportingVisuals?: CaseStudyImage[]
  mediaLayout?: 'default' | 'single-column'
  skillsAndTools?: SkillCard[]
  /** Section title for the outcomes. Defaults to "Outcomes". */
  outcomesTitle?: string
  outcomes: OutcomesSection
  /** Section title for the closing list. Defaults to "What I’d improve next". */
  nextTitle?: string
  nextImprovements: string[]
}

interface CaseStudyPageProps {
  caseStudy: CaseStudyData
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const { theme } = useTheme()
  const imageQuality = caseStudy.imageQuality ?? 85
  const sections = useMemo(
    () =>
      [
        { id: 'project-overview', label: 'Project overview' },
        { id: 'snapshot', label: 'Outcome snapshot' },
        { id: 'summary', label: '30-second summary' },
        { id: 'problem', label: 'Problem + constraints' },
        { id: 'role', label: 'My role + ownership' },
        caseStudy.approach ? { id: 'approach', label: 'Design approach' } : null,
        caseStudy.solution ? { id: 'solution', label: 'Solution' } : null,
        { id: 'decisions', label: 'Key decisions' },
        caseStudy.skillsAndTools ? { id: 'skills', label: 'Skills & tools' } : null,
        { id: 'outcomes', label: caseStudy.outcomesTitle ?? 'Outcomes' },
        { id: 'next', label: caseStudy.nextTitle ?? "What I'd improve" },
      ].filter((section): section is { id: string; label: string } => section !== null),
    [caseStudy.skillsAndTools, caseStudy.approach, caseStudy.solution, caseStudy.outcomesTitle, caseStudy.nextTitle]
  )

  // Section numbers follow the sections that are actually shown (Skills & tools is not numbered).
  const numbered = [
    'summary',
    'problem',
    'role',
    ...(caseStudy.approach ? ['approach'] : []),
    ...(caseStudy.solution ? ['solution'] : []),
    'decisions',
    'outcomes',
    'next',
  ]
  const num = (id: string) => `${numbered.indexOf(id) + 1}.`

  const [activeSection, setActiveSection] = useState(sections[0].id)

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 180
      let currentSection = sections[0].id

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && scrollPosition >= element.offsetTop) {
          currentSection = section.id
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    updateActiveSection()

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sections])

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    const element = document.getElementById(sectionId)

    if (!element) {
      return
    }

    const offset = 92
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset

    window.scrollTo({
      top,
      behavior: 'smooth',
    })

    setActiveSection(sectionId)
  }

  return (
    <main className="cs-page">
      <div className="cs-shell">
        <div className="cs-grid">
          <aside className="cs-toc" aria-label="On this page">
            <div className="cs-toc-card">
              <nav>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`cs-toc-link ${activeSection === section.id ? 'is-active' : ''}`}
                    onClick={(event) => handleNavClick(event, section.id)}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="cs-main">
            <header className="cs-hero" id="project-overview">
              <p className="cs-eyebrow">{caseStudy.eyebrow ?? 'Case Study'}</p>
              {caseStudy.titleLogo ? (
                <div
                  className="cs-title-logo-wrap"
                  style={
                    caseStudy.titleLogo.maxWidth
                      ? { maxWidth: `min(${caseStudy.titleLogo.maxWidth}px, 82vw)` }
                      : undefined
                  }
                >
                  <Image
                    src={theme === 'light' ? caseStudy.titleLogo.lightSrc : caseStudy.titleLogo.darkSrc}
                    alt={caseStudy.titleLogo.alt}
                    width={caseStudy.titleLogo.width}
                    height={caseStudy.titleLogo.height}
                    className="cs-title-logo"
                    data-lightbox-ignore="true"
                    quality={imageQuality}
                    sizes="(max-width: 1024px) 70vw, 560px"
                    priority
                  />
                </div>
              ) : (
                <h1 className="cs-title">{caseStudy.title}</h1>
              )}
              <p className="cs-subtitle">{caseStudy.tagline}</p>

              <div className="cs-actions">
                <Link href={caseStudy.backHref} className="cs-button cs-button-secondary">
                  Back to Work
                </Link>
                {caseStudy.liveHref ? (
                  <a
                    href={caseStudy.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-button cs-button-primary"
                  >
                    {caseStudy.liveLabel || 'Visit project'}
                  </a>
                ) : null}
              </div>

              <figure className="cs-media-frame">
                <Image
                  src={caseStudy.heroImage.src}
                  alt={caseStudy.heroImage.alt}
                  width={caseStudy.heroImage.width}
                  height={caseStudy.heroImage.height}
                  className="cs-media-image"
                  data-lightbox-ignore="true"
                  quality={imageQuality}
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
                {caseStudy.heroCaption ? <figcaption className="cs-caption">{caseStudy.heroCaption}</figcaption> : null}
              </figure>
            </header>

            <section id="snapshot" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Outcome Snapshot</h2>
              {caseStudy.compact ? (
                <div className="cs-surface-card cs-rows">
                  <Row title="Role" asLabel>
                    <p>{caseStudy.snapshot.role}</p>
                  </Row>
                  <Row title="Timeline" asLabel>
                    <p>{caseStudy.snapshot.timeline}</p>
                  </Row>
                  <Row title="Team" asLabel>
                    <p>{caseStudy.snapshot.team}</p>
                  </Row>
                  <Row title="Problem" asLabel>
                    <p>{caseStudy.snapshot.problem}</p>
                  </Row>
                  <Row title="Measurable outcomes" asLabel>
                    <RowList items={caseStudy.snapshot.measurableOutcomes} />
                  </Row>
                </div>
              ) : (
                <>
              <div className="cs-snapshot-grid">
                <div className="cs-snapshot-item">
                  <p className="cs-label">Role</p>
                  <p className="cs-copy">{caseStudy.snapshot.role}</p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">Timeline</p>
                  <p className="cs-copy">{caseStudy.snapshot.timeline}</p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">Team</p>
                  <p className="cs-copy">{caseStudy.snapshot.team}</p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">Problem</p>
                  <p className="cs-copy">{caseStudy.snapshot.problem}</p>
                </div>
              </div>

              <div className="cs-callout">
                <p className="cs-label">Measurable outcomes</p>
                <ul className="cs-list">
                  {caseStudy.snapshot.measurableOutcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
                </>
              )}
            </section>

            <section id="summary" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">{num('summary')} 30-second summary</h2>
              <div className="cs-prose">
                {caseStudy.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="problem" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">{num('problem')} Problem + constraints</h2>
              <div className="cs-prose">
                <p>{caseStudy.problemStatement}</p>
              </div>
              {caseStudy.compact ? (
                <div className="cs-surface-card cs-rows">
                  {caseStudy.problemPoints?.map((point) => (
                    <Row key={point.title} title={point.title}>
                      <p>{point.body}</p>
                    </Row>
                  ))}
                  <Row title="Constraints">
                    <RowList items={caseStudy.constraints} />
                  </Row>
                </div>
              ) : null}
              {!caseStudy.compact && caseStudy.problemPoints ? (
                <div className="cs-ownership-grid">
                  {caseStudy.problemPoints.map((point) => (
                    <div key={point.title} className="cs-surface-card">
                      <h3 className="cs-card-title">{point.title}</h3>
                      <p className="cs-copy">{point.body}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              {!caseStudy.compact && caseStudy.problemPoints ? <p className="cs-label cs-label-block">Constraints</p> : null}
              {!caseStudy.compact ? (
                <ul className="cs-list cs-list-compact">
                  {caseStudy.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              ) : null}
            </section>

            <section id="role" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">{num('role')} My role + ownership boundaries</h2>
              {caseStudy.compact ? (
                <div className="cs-surface-card cs-rows">
                  <Row title="I owned">
                    <RowList items={caseStudy.ownership.owned} />
                  </Row>
                  <Row title="I shared">
                    <RowList items={caseStudy.ownership.shared} />
                  </Row>
                  <Row title="Out of scope">
                    <RowList items={caseStudy.ownership.outOfScope} />
                  </Row>
                </div>
              ) : (
              <div className="cs-ownership-grid">
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">I owned</h3>
                  <ul className="cs-list cs-list-compact">
                    {caseStudy.ownership.owned.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">I shared</h3>
                  <ul className="cs-list cs-list-compact">
                    {caseStudy.ownership.shared.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">Out of scope</h3>
                  <ul className="cs-list cs-list-compact">
                    {caseStudy.ownership.outOfScope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              )}
            </section>

            {caseStudy.approach ? (
              <section id="approach" className="cs-section cs-section-divider">
                <h2 className="cs-section-title">{num('approach')} Design approach</h2>
                <div className="cs-prose">
                  <p>{caseStudy.approach.intro}</p>
                </div>
                <div className="cs-surface-card cs-rows">
                  {caseStudy.approach.items.map((item) => (
                    <Row key={item.title} title={item.title}>
                      <p>
                        {item.body}
                        {item.planned ? (
                          <span className="cs-row-planned">
                            {' '}
                            <strong>Planned:</strong> {item.planned}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                  ))}
                </div>
              </section>
            ) : null}

            {caseStudy.solution ? (
              <section id="solution" className="cs-section cs-section-divider">
                <h2 className="cs-section-title">{num('solution')} Solution</h2>
                <div className="cs-prose">
                  {caseStudy.solution.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {caseStudy.solution.steps.map((step) => (
                  <div key={step.title} className="cs-tour">
                    <h3 className="cs-card-title">{step.title}</h3>
                    <div className="cs-prose">
                      <p>{step.text}</p>
                    </div>
                    <figure className="cs-media-frame cs-tour-media">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={step.image.width}
                        height={step.image.height}
                        className="cs-media-image"
                        quality={imageQuality}
                        sizes="(max-width: 1024px) 100vw, 760px"
                      />
                      {step.image.caption ? <figcaption className="cs-caption">{step.image.caption}</figcaption> : null}
                    </figure>
                  </div>
                ))}

                {caseStudy.compact ? (
                  <div className="cs-ownership-grid cs-built-grid">
                    <div className="cs-surface-card cs-rows">
                      <Row title={caseStudy.solution.built.title} kicker={caseStudy.solution.built.label}>
                        <RowList items={caseStudy.solution.built.items} />
                      </Row>
                    </div>
                    <div className="cs-surface-card cs-rows is-planned">
                      <Row title={caseStudy.solution.planned.title} kicker={caseStudy.solution.planned.label}>
                        <RowList items={caseStudy.solution.planned.items} />
                      </Row>
                    </div>
                  </div>
                ) : (
                <div className="cs-ownership-grid cs-built-grid">
                  <div className="cs-surface-card">
                    <p className="cs-label">{caseStudy.solution.built.label}</p>
                    <h3 className="cs-card-title">{caseStudy.solution.built.title}</h3>
                    <ul className="cs-list cs-list-compact">
                      {caseStudy.solution.built.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cs-surface-card is-planned">
                    <p className="cs-label">{caseStudy.solution.planned.label}</p>
                    <h3 className="cs-card-title">{caseStudy.solution.planned.title}</h3>
                    <ul className="cs-list cs-list-compact">
                      {caseStudy.solution.planned.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}
                {caseStudy.solution.note ? <p className="cs-note">{caseStudy.solution.note}</p> : null}
              </section>
            ) : null}

            <section id="decisions" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">{num('decisions')} Key decisions</h2>
              <div className="cs-decision-grid">
                {caseStudy.decisions.map((item, index) => (
                  <article key={item.title} className="cs-surface-card">
                    <h3 className="cs-card-title">
                      {index + 1}. {item.title}
                    </h3>
                    {caseStudy.compact ? (
                      <div className="cs-rows-inline">
                        <Row title="Decision" asLabel>
                          <p>{item.decision}</p>
                        </Row>
                        <Row title="Why" asLabel>
                          <p>{item.why}</p>
                        </Row>
                        <Row title="Result" asLabel>
                          <p>{item.result}</p>
                        </Row>
                      </div>
                    ) : (
                    <dl className="cs-dl">
                      <div>
                        <dt className="cs-label">Decision</dt>
                        <dd className="cs-copy">{item.decision}</dd>
                      </div>
                      <div>
                        <dt className="cs-label">Why</dt>
                        <dd className="cs-copy">{item.why}</dd>
                      </div>
                      <div>
                        <dt className="cs-label">Result</dt>
                        <dd className="cs-copy">{item.result}</dd>
                      </div>
                    </dl>
                    )}
                    {caseStudy.beforeAfter && index === caseStudy.beforeAfterDecisionIndex ? (
                      <article className="cs-before-after">
                        <div className="cs-before-after-grid">
                          <figure className="cs-media-panel">
                            <p className="cs-media-label">Before</p>
                            <div className="cs-media-frame">
                              <Image
                                src={caseStudy.beforeAfter.before.src}
                                alt={caseStudy.beforeAfter.before.alt}
                                width={caseStudy.beforeAfter.before.width}
                                height={caseStudy.beforeAfter.before.height}
                                className="cs-media-image"
                                quality={imageQuality}
                                sizes="(max-width: 1024px) 100vw, 760px"
                              />
                              {caseStudy.beforeAfter.before.caption ? (
                                <figcaption className="cs-caption">{caseStudy.beforeAfter.before.caption}</figcaption>
                              ) : null}
                            </div>
                          </figure>
                          <figure className="cs-media-panel">
                            <p className="cs-media-label">After</p>
                            <div className="cs-media-frame">
                              <Image
                                src={caseStudy.beforeAfter.after.src}
                                alt={caseStudy.beforeAfter.after.alt}
                                width={caseStudy.beforeAfter.after.width}
                                height={caseStudy.beforeAfter.after.height}
                                className="cs-media-image"
                                quality={imageQuality}
                                sizes="(max-width: 1024px) 100vw, 760px"
                              />
                              {caseStudy.beforeAfter.after.caption ? (
                                <figcaption className="cs-caption">{caseStudy.beforeAfter.after.caption}</figcaption>
                              ) : null}
                            </div>
                          </figure>
                        </div>
                        <ul className="cs-list cs-list-compact">
                          {caseStudy.beforeAfter.annotations.map((annotation) => (
                            <li key={annotation}>{annotation}</li>
                          ))}
                        </ul>
                        {item.image ? (
                          <figure className="cs-decision-media">
                            <div className="cs-media-frame">
                              <Image
                                src={item.image.src}
                                alt={item.image.alt}
                                width={item.image.width}
                                height={item.image.height}
                                className="cs-media-image"
                                quality={imageQuality}
                                sizes="(max-width: 1024px) 100vw, 760px"
                              />
                              {item.image.caption ? <figcaption className="cs-caption">{item.image.caption}</figcaption> : null}
                            </div>
                          </figure>
                        ) : null}
                      </article>
                    ) : item.image ? (
                      <figure className="cs-decision-media">
                        <div className="cs-media-frame">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width}
                            height={item.image.height}
                            className="cs-media-image"
                            quality={imageQuality}
                            sizes="(max-width: 1024px) 100vw, 760px"
                          />
                          {item.image.caption ? <figcaption className="cs-caption">{item.image.caption}</figcaption> : null}
                        </div>
                      </figure>
                    ) : null}
                    {index !== caseStudy.beforeAfterDecisionIndex && item.additionalImages?.length
                      ? item.additionalImages.map((extraImage) => (
                          <figure key={`${item.title}-${extraImage.src}`} className="cs-decision-media">
                            <div className="cs-media-frame">
                              <Image
                                src={extraImage.src}
                                alt={extraImage.alt}
                                width={extraImage.width}
                                height={extraImage.height}
                                className="cs-media-image"
                                quality={imageQuality}
                                sizes="(max-width: 1024px) 100vw, 760px"
                              />
                              {extraImage.caption ? <figcaption className="cs-caption">{extraImage.caption}</figcaption> : null}
                            </div>
                          </figure>
                        ))
                      : null}
                  </article>
                ))}
              </div>
            </section>

            {caseStudy.skillsAndTools ? (
              <section id="skills" className="cs-section cs-section-divider">
                <h2 className="cs-section-title">Skills & tools</h2>
                {caseStudy.compact ? (
                  <CompactSkills skills={caseStudy.skillsAndTools} />
                ) : (
                  <SkillsAndToolsGrid skills={caseStudy.skillsAndTools} />
                )}
              </section>
            ) : null}

            <section id="outcomes" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">
                {num('outcomes')} {caseStudy.outcomesTitle ?? 'Outcomes'}
              </h2>
              <p className="cs-copy">{caseStudy.outcomes.intro}</p>
              {caseStudy.compact ? (
                <div className="cs-surface-card cs-rows cs-metric-grid">
                  {caseStudy.outcomes.metrics.map((metric) => (
                    <Row key={`${metric.value}-${metric.label}`} title={metric.value} kicker={metric.type} big>
                      <p className="cs-row-strong">{metric.label}</p>
                      <p>{metric.context}</p>
                    </Row>
                  ))}
                </div>
              ) : (
              <div className="cs-metric-grid">
                {caseStudy.outcomes.metrics.map((metric) => (
                  <article key={`${metric.value}-${metric.label}`} className="cs-surface-card cs-metric-card">
                    <p className="cs-metric-type">{metric.type}</p>
                    <p className="cs-metric-value">{metric.value}</p>
                    <h3 className="cs-card-title">{metric.label}</h3>
                    <p className="cs-copy">{metric.context}</p>
                  </article>
                ))}
              </div>
              )}
              {caseStudy.outcomes.note ? <p className="cs-note">{caseStudy.outcomes.note}</p> : null}
            </section>

            <section id="next" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">
                {num('next')} {caseStudy.nextTitle ?? 'What I’d improve next'}
              </h2>
              <ul className="cs-list">
                {caseStudy.nextImprovements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
}
