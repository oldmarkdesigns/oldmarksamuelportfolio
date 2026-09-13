'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { TOOLS } from '@/lib/tools'
import { ToolBadges } from '@/components/ToolBadges'

const responsibilities = [
  'Sole designer and developer on every engagement — brand identity, UX/UI, frontend build, and post-launch iteration.',
  'Run the full process solo: client conversations, design decisions, implementation, and delivery.',
  'Typical delivery window: two to three weeks from first brief to a shipped, live product.',
]

const process = [
  { step: '01', title: 'Understand', description: 'Start with the problem: the users, the constraints, and what success looks like. No assumptions.' },
  { step: '02', title: 'Design', description: 'Wireframes, flows and high-fidelity UI in Figma, reviewed with the client until it is right.' },
  { step: '03', title: 'Build', description: 'Frontend development or no-code delivery depending on the stack. Pixel-perfect, responsive, fast.' },
  { step: '04', title: 'Optimize', description: 'Post-launch audits, A/B testing, and iteration based on real usage.' },
]

const toolsUsedMost = [TOOLS.gemini, TOOLS.claude, TOOLS.cursor, TOOLS.webflow, TOOLS.wordpress, TOOLS.figma, TOOLS.goldfish]

const skills = [
  {
    category: 'Development',
    name: 'Web development',
    description: 'Designing, building and maintaining complete websites end-to-end.',
    tools: [TOOLS.webflow, TOOLS.wordpress, TOOLS.cursor, TOOLS.claude],
  },
  {
    category: 'Design',
    name: 'App design',
    description: 'End-to-end UX and UI for web and mobile, taken through to handoff.',
    tools: [TOOLS.figma, TOOLS.claude],
  },
  {
    category: 'Design',
    name: 'Design systems',
    description: 'Tokens, component libraries and documentation that scale with the product.',
    tools: [TOOLS.figma, TOOLS.claude],
  },
  {
    category: 'Design',
    name: 'Prototyping',
    description: 'Clickable prototypes for user testing and stakeholder demos.',
    tools: [TOOLS.figma, TOOLS.claude],
  },
  {
    category: 'Optimization',
    name: 'UX audits & accessibility',
    description: 'Reviews against usability heuristics and WCAG 2.2, with concrete fixes.',
    tools: [TOOLS.claude],
  },
]

const projects = [
  {
    name: 'NO20',
    tag: 'Brand identity · Web design · Copywriting',
    context: 'A luxury floating home in the Stockholm archipelago.',
    role: ['Brand identity', 'Web design & development', 'Copywriting (SV + EN)', 'Photography guidelines', 'Typography system'],
    decisions: [
      'Pulled the color palette directly from the location itself — dark forest green, night-black water, and the muted sage of reeds and juniper — instead of a generic brand palette.',
      'Paired a classical serif for headlines with an airy sans-serif for body copy, mirroring the brief: historic form with modern comfort.',
      'Built mobile-first, since roughly half of visitors arrive on mobile, with touch-optimized navigation throughout.',
    ],
    outcome: 'Shipped in three weeks from brief to launch, delivered bilingually in Swedish and English.',
    image: {
      src: '/Portfolio Assets/Work/Oldmark Studio/no20-hero.png',
      alt: 'NO20 website hero, a floating home in the Stockholm archipelago.',
      width: 2848,
      height: 1496,
    },
    liveHref: 'https://no20.se/',
    tools: [TOOLS.figma],
  },
  {
    name: 'Sea4You',
    tag: 'Web development · Redesign',
    context: "A redesign for Sweden's Targa boat dealer.",
    role: ['Web design & redesign', 'Frontend development', 'Component library', 'Content structure for maintenance'],
    decisions: [
      'Rebuilt the site around a component library specifically so the (non-technical) client team could add new boat models and update content themselves, without needing a developer for every change.',
      'Focused the redesign on a clearer, more modern visual expression that matches the brand\'s quality positioning, without a full re-brand.',
    ],
    outcome: 'The client now maintains and extends the site independently — new listings and content changes ship without developer involvement.',
    image: {
      src: '/Portfolio Assets/Work/Oldmark Studio/sea4you-hero.png',
      alt: 'Sea4You website hero, a Swedish boat dealer.',
      width: 2840,
      height: 1364,
    },
    liveHref: 'https://www.sea4you.se/',
    tools: [TOOLS.figma, TOOLS.cursor],
  },
]

export default function OldmarkStudioPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'role', label: 'My role' },
      { id: 'process', label: 'Process' },
      { id: 'skills', label: 'Skills & tools' },
      { id: 'projects', label: 'Selected projects' },
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
    if (!element) return

    const offset = 92
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
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
            <header className="cs-hero" id="overview">
              <p className="cs-eyebrow">Independent Practice</p>
              <h1 className="cs-title">Oldmark Studio</h1>
              <p className="cs-subtitle">
                My own design & development practice, running alongside my product design work. As the sole
                designer and developer, I take on end-to-end web and product projects for early-stage founders —
                from brand identity through to a shipped, maintainable product.
              </p>
              <div className="cs-actions">
                <Link href="/#work" className="cs-button cs-button-secondary">
                  Back to Work
                </Link>
                <a
                  href="https://oldmarkstudio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-button cs-button-secondary"
                >
                  Visit oldmarkstudio.vercel.app ↗
                </a>
              </div>

              <div className="cs-media-frame" style={{ maxWidth: '300px' }}>
                <Image
                  src="/Portfolio Assets/Work/Oldmark Studio/hero-image.jpg"
                  alt="Samuel Oldmark, founder of Oldmark Studio."
                  width={3024}
                  height={4032}
                  className="cs-media-image"
                  sizes="(max-width: 640px) 60vw, 300px"
                  priority
                />
              </div>
            </header>

            <section id="role" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">My role</h2>
              <ul className="cs-list">
                {responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="process" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Process</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {process.map((item) => (
                  <div key={item.step} className="cs-surface-card">
                    <p className="cs-label">{item.step}</p>
                    <h3 className="cs-card-title">{item.title}</h3>
                    <p className="cs-copy">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="skills" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Skills & tools</h2>
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

              <p className="cs-label mt-6 mb-3">Tools I use most</p>
              <div className="flex flex-wrap gap-2">
                {toolsUsedMost.map((tool) => (
                  <span
                    key={tool.name}
                    className="about-chip inline-flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full text-sm font-medium"
                  >
                    <span
                      className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0 ${
                        'contain' in tool && tool.contain ? 'p-1' : ''
                      }`}
                    >
                      <Image
                        src={tool.src}
                        alt=""
                        width={24}
                        height={24}
                        className={`w-full h-full ${'contain' in tool && tool.contain ? 'object-contain' : 'object-cover'}`}
                      />
                    </span>
                    {tool.name}
                  </span>
                ))}
              </div>
            </section>

            <section id="projects" className="cs-section">
              <h2 className="cs-section-title">Selected projects</h2>
              <div className="flex flex-col">
                {projects.map((project, index) => (
                  <article
                    key={project.name}
                    className={index > 0 ? 'mt-14 pt-14 border-t border-[var(--cs-divider)]' : ''}
                  >
                    <div className="flex flex-col gap-5">
                      <div className="relative cs-media-frame overflow-hidden" style={{ maxWidth: '480px' }}>
                        <Image
                          src={project.image.src}
                          alt={project.image.alt}
                          width={project.image.width}
                          height={project.image.height}
                          className="cs-media-image"
                          sizes="(max-width: 640px) 100vw, 480px"
                          data-lightbox-ignore="true"
                        />
                        <ToolBadges items={project.tools} />
                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                          <a
                            href={project.liveHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cs-button cs-button-live"
                            data-lightbox-ignore="true"
                          >
                            Visit live site ↗
                          </a>
                        </div>
                      </div>

                      <div>
                        <p className="cs-label">
                          0{index + 1} · {project.tag}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl font-medium text-white mt-2 mb-2">
                          {project.name}
                        </h3>
                        <p className="cs-copy mb-4">{project.context}</p>

                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.role.map((item) => (
                            <span key={item} className="about-chip px-3 py-1 rounded-full text-xs font-medium">
                              {item}
                            </span>
                          ))}
                        </div>

                        <p className="cs-label mb-2">Key decisions</p>
                        <ul className="cs-list cs-list-compact mb-4">
                          {project.decisions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>

                        <p className="cs-copy">
                          <span className="cs-label">Outcome — </span>
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
}
