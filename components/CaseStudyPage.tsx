'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

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

export interface CaseStudyData {
  title: string
  titleLogo?: CaseStudyTitleLogo
  imageQuality?: number
  tagline: string
  backHref: string
  liveHref?: string
  liveLabel?: string
  heroImage: CaseStudyImage
  heroCaption?: string
  snapshot: OutcomeSnapshot
  summary: string[]
  problemStatement: string
  constraints: string[]
  ownership: OwnershipModel
  decisions: DecisionItem[]
  beforeAfter: BeforeAfterBlock
  supportingVisuals?: CaseStudyImage[]
  mediaLayout?: 'default' | 'single-column'
  outcomes: OutcomesSection
  nextImprovements: string[]
}

interface CaseStudyPageProps {
  caseStudy: CaseStudyData
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const { theme } = useTheme()
  const isSingleColumnMedia = caseStudy.mediaLayout === 'single-column'
  const imageQuality = caseStudy.imageQuality ?? 85
  const sections = useMemo(
    () => [
      { id: 'project-overview', label: 'Project overview' },
      { id: 'snapshot', label: 'Outcome snapshot' },
      { id: 'summary', label: '30-second summary' },
      { id: 'problem', label: 'Problem + constraints' },
      { id: 'role', label: 'My role + ownership' },
      { id: 'decisions', label: 'Key decisions' },
      { id: 'outcomes', label: 'Outcomes' },
      { id: 'next', label: "What I'd improve" },
    ],
    []
  )

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
              <p className="cs-eyebrow">Case Study</p>
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
            </section>

            <section id="summary" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">1. 30-second summary</h2>
              <div className="cs-prose">
                {caseStudy.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="problem" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">2. Problem + constraints</h2>
              <div className="cs-prose">
                <p>{caseStudy.problemStatement}</p>
              </div>
              <ul className="cs-list cs-list-compact">
                {caseStudy.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            </section>

            <section id="role" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">3. My role + ownership boundaries</h2>
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
            </section>

            <section id="decisions" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">4. Key decisions</h2>
              <div className="cs-decision-grid">
                {caseStudy.decisions.map((item, index) => (
                  <article key={item.title} className="cs-surface-card">
                    <h3 className="cs-card-title">
                      {index + 1}. {item.title}
                    </h3>
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
                  </article>
                ))}
              </div>

              <figure className="cs-before-after">
                <h3 className="cs-card-title">{caseStudy.beforeAfter.title}</h3>
                {caseStudy.beforeAfter.description ? <p className="cs-copy">{caseStudy.beforeAfter.description}</p> : null}
                <div className={`cs-before-after-grid ${isSingleColumnMedia ? 'is-single-column' : ''}`}>
                  <div className="cs-media-panel">
                    <p className="cs-media-label">Before</p>
                    <div className="cs-media-frame">
                      <Image
                        src={caseStudy.beforeAfter.before.src}
                        alt={caseStudy.beforeAfter.before.alt}
                        width={caseStudy.beforeAfter.before.width}
                        height={caseStudy.beforeAfter.before.height}
                        className="cs-media-image"
                        quality={imageQuality}
                        sizes={isSingleColumnMedia ? '(max-width: 1024px) 100vw, 760px' : '(max-width: 1024px) 100vw, 360px'}
                      />
                      {caseStudy.beforeAfter.before.caption ? (
                        <figcaption className="cs-caption">{caseStudy.beforeAfter.before.caption}</figcaption>
                      ) : null}
                    </div>
                  </div>
                  <div className="cs-media-panel">
                    <p className="cs-media-label">After</p>
                    <div className="cs-media-frame">
                      <Image
                        src={caseStudy.beforeAfter.after.src}
                        alt={caseStudy.beforeAfter.after.alt}
                        width={caseStudy.beforeAfter.after.width}
                        height={caseStudy.beforeAfter.after.height}
                        className="cs-media-image"
                        quality={imageQuality}
                        sizes={isSingleColumnMedia ? '(max-width: 1024px) 100vw, 760px' : '(max-width: 1024px) 100vw, 360px'}
                      />
                      {caseStudy.beforeAfter.after.caption ? (
                        <figcaption className="cs-caption">{caseStudy.beforeAfter.after.caption}</figcaption>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="cs-callout">
                  <p className="cs-label">Annotations</p>
                  <ul className="cs-list cs-list-compact">
                    {caseStudy.beforeAfter.annotations.map((annotation) => (
                      <li key={annotation}>{annotation}</li>
                    ))}
                  </ul>
                </div>
              </figure>

              {caseStudy.supportingVisuals && caseStudy.supportingVisuals.length > 0 ? (
                <div className={`cs-visual-grid ${isSingleColumnMedia ? 'is-single-column' : ''}`}>
                  {caseStudy.supportingVisuals.map((visual) => (
                    <figure key={visual.src} className="cs-media-frame">
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        width={visual.width}
                        height={visual.height}
                        className="cs-media-image"
                        quality={imageQuality}
                        sizes={isSingleColumnMedia ? '(max-width: 1024px) 100vw, 760px' : '(max-width: 1024px) 100vw, 360px'}
                      />
                      {visual.caption ? <figcaption className="cs-caption">{visual.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              ) : null}
            </section>

            <section id="outcomes" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">5. Outcomes</h2>
              <p className="cs-copy">{caseStudy.outcomes.intro}</p>
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
              {caseStudy.outcomes.note ? <p className="cs-note">{caseStudy.outcomes.note}</p> : null}
            </section>

            <section id="next" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">6. What I&rsquo;d improve next</h2>
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
