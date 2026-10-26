'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PROJECT_ORDER } from '@/lib/projects'
import { scrollToElement } from '@/lib/smoothScroll'

export interface ProjectSection {
  id: string
  label: string
}

export interface ProjectCoverImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProjectMetaItem {
  label: string
  value: React.ReactNode
}

/**
 * The "on this page" rail. It hangs from the nav portrait once the nav has collapsed into the
 * top-left circle (html[data-nav-compact]), so the two read as one piece of chrome.
 */
export function ProjectRail({ sections }: { sections: ProjectSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const update = () => {
      const line = window.scrollY + window.innerHeight * 0.3
      let current = sections[0]?.id ?? ''
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top + window.scrollY <= line) current = section.id
      }
      setActive(current)
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sections])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const element = document.getElementById(id)
    if (!element) return
    scrollToElement(element)
    setActive(id)
  }

  const index = Math.max(0, sections.findIndex((section) => section.id === active))

  return (
    <nav className="pj-rail" aria-label="On this page">
      <span className="pj-rail-track" style={{ height: `calc(var(--pj-rail-row) * ${sections.length - 0.5} + 1.5rem)` }} />
      <span className="pj-rail-stem" style={{ height: `calc(var(--pj-rail-row) * ${index + 0.5} + 1.5rem)` }} />
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={section.id === active ? 'is-active' : undefined}
          aria-current={section.id === active ? 'location' : undefined}
          onClick={(event) => handleClick(event, section.id)}
        >
          <span className="pj-rail-dot" />
          <span className="pj-rail-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="pj-rail-label">{section.label}</span>
        </a>
      ))}
    </nav>
  )
}

/** Full-bleed cover: the image whole and uncropped, over a blurred wash of itself. */
export function ProjectCover({ image, quality = 85 }: { image: ProjectCoverImage; quality?: number }) {
  return (
    <div className="pj-cover">
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        quality={30}
        sizes="40vw"
        className="pj-cover-wash"
        data-lightbox-ignore="true"
      />
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={quality}
        priority
        sizes="(max-width: 1024px) 100vw, 1280px"
        className="pj-cover-image"
        data-lightbox-ignore="true"
      />
    </div>
  )
}

/** Short facts under the title: role, timeline, team and so on. */
export function ProjectMeta({ items }: { items: ProjectMetaItem[] }) {
  return (
    <dl className="pj-meta">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Previous and next project, wrapping around at either end of the list. */
export function ProjectPager() {
  const pathname = usePathname()
  const index = PROJECT_ORDER.findIndex((project) => project.href === pathname)
  if (index === -1) return null

  const count = PROJECT_ORDER.length
  const links = [
    { dir: 'Previous', project: PROJECT_ORDER[(index - 1 + count) % count] },
    { dir: 'Next', project: PROJECT_ORDER[(index + 1) % count] },
  ]

  return (
    <nav className="pj-pager" aria-label="More projects">
      {links.map(({ dir, project }) => (
        <Link key={dir} href={project.href} className={`pj-pager-link is-${dir.toLowerCase()}`}>
          <span className="pj-pager-thumb">
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 380px"
              className="pj-pager-image"
              data-lightbox-ignore="true"
            />
          </span>
          <span className="pj-pager-dir">
            {dir === 'Previous' ? '← ' : ''}
            {dir} project
            {dir === 'Next' ? ' →' : ''}
          </span>
          <span className="pj-pager-title">{project.title}</span>
        </Link>
      ))}
    </nav>
  )
}

/** Page frame shared by every project page: cover, rail, and one centred reading column. */
export function ProjectShell({
  sections,
  cover,
  coverQuality,
  children,
}: {
  sections: ProjectSection[]
  cover?: ProjectCoverImage
  coverQuality?: number
  children: React.ReactNode
}) {
  return (
    <main className={`cs-page${cover ? ' has-cover' : ''}`}>
      {cover ? <ProjectCover image={cover} quality={coverQuality} /> : null}
      <ProjectRail sections={sections} />
      <div className="cs-shell">
        <article className="cs-main">{children}</article>
        <ProjectPager />
      </div>
    </main>
  )
}
