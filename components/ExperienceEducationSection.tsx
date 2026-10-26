'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { ArrowUpRight, Eye } from '@phosphor-icons/react'
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll'
import './ExperienceEducationSection.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const LOGOS = '/Portfolio Assets/Experience Logos'

const ROLES = [
  {
    id: 'oldmark-studio',
    role: 'Founder & Product Designer',
    company: 'Oldmark Studio',
    logo: `${LOGOS}/oldmark_studio.png`,
    dates: 'May 2024 - Present',
    href: '/work/oldmarkstudio',
    text: 'I run my own agency, Oldmark Studio, where I work with multiple clients across different sectors. My work spans UX and UI design, design systems, websites, digital products, frontend development, and AI-assisted solutions. Working across varied projects has made me comfortable taking broad ownership, adapting quickly, and turning early ideas into polished, working experiences.',
  },
  {
    id: 'halsa-plus',
    role: 'Product Designer',
    company: 'My Medical Data | Hälsa+',
    logo: `${LOGOS}/halsa-plus-logo.png`,
    dates: 'Jan 2025 - Apr 2026',
    href: '/work/mymedicaldata',
    text: `I worked as a product designer at My Medical Data, where I designed and planned a new mobile app called Hälsa+ focused on health. As the only designer on the team, my role was to provide UX and UI solutions while also acting as a bridge between development, design, and stakeholders.

When I joined, there was already a demo app built from scratch, but it had room for both UX and UI improvements. This experience was very insightful, and I expanded my skills by taking on new tasks and challenges that I hadn't faced before.`,
  },
  {
    id: 'framna',
    role: 'UI Design Intern',
    company: 'Framna (earlier Bontouch)',
    logo: `${LOGOS}/framna_logo.png`,
    dates: 'Nov 2023 - May 2024',
    href: '/work/bontouch',
    text: 'I completed my five-month internship at Framna (earlier Bontouch) in Stockholm two months ago, which was a part of my education. My main focus was on UI design, though I was also involved in UX work. During my internship at Framna (earlier Bontouch), I had the opportunity to work with a real product and participate in client meetings. I collaborated with experienced designers and developers, gaining a deeper understanding of all aspects related to a digital product, as well as how collaboration between different skill sets can be executed.',
  },
] as const

const CHAS_MODULES = [
  'Frontend Development with React',
  'A 5-month internship',
  'Interaction Design',
  'UI/UX Design',
  'IT Tech and Operations',
  'Project Management',
  'Agile work methods',
] as const

const pad = (n: number) => String(n).padStart(2, '0')

function Crosshairs() {
  return (
    <>
      <span className="xp-plus" style={{ left: 0, top: 0 }} aria-hidden="true" />
      <span className="xp-plus" style={{ left: '100%', top: 0 }} aria-hidden="true" />
      <span className="xp-plus" style={{ left: 0, top: '100%' }} aria-hidden="true" />
      <span className="xp-plus" style={{ left: '100%', top: '100%' }} aria-hidden="true" />
    </>
  )
}

/** Experience as a dossier: an index of roles on the left, one role open on the right. All three
    panels share one grid cell, so the block keeps the height of the longest and nothing below it
    jumps when you switch; the closed ones are hidden with visibility, which also takes them out of
    the tab order and the accessibility tree. */
function Experience() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = ROLES.length - 1
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (active === last ? 0 : active + 1)
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (active === 0 ? last : active - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="xp-block xp-exp">
      <div className="xp-index">
        <h2 className="xp-label">Experience</h2>
        <div className="xp-tabs" role="tablist" aria-label="Experience" aria-orientation="vertical" onKeyDown={onKeyDown}>
          {ROLES.map((r, i) => (
            <button
              key={r.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`xp-tab-${r.id}`}
              aria-selected={i === active}
              aria-controls={`xp-panel-${r.id}`}
              tabIndex={i === active ? 0 : -1}
              className="xp-tab"
              onClick={() => setActive(i)}
            >
              <span className="xp-plus xp-tab-mark" aria-hidden="true" />
              <Image src={r.logo} alt="" width={80} height={80} className="xp-logo" />
              <span className="xp-tab-text">
                <span className="xp-tab-company">{r.company}</span>
                <span className="xp-tab-dates">{r.dates}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="xp-panels">
        {ROLES.map((r, i) => (
          <div
            key={r.id}
            id={`xp-panel-${r.id}`}
            role="tabpanel"
            aria-labelledby={`xp-tab-${r.id}`}
            data-on={i === active}
            className="xp-panel"
          >
            <p className="xp-label xp-count" aria-hidden="true">
              <b>{pad(i + 1)}</b> / {pad(ROLES.length)}
            </p>
            <h3 className="xp-title">
              <span>{r.role}</span>
              <span className="xp-title-soft">{r.company}</span>
            </h3>
            <p className="xp-dates">{r.dates}</p>
            <p className="xp-text">{r.text}</p>
            <Link href={r.href} className="xp-link">
              View case study
              <ArrowUpRight size={13} weight="bold" aria-hidden />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Education: each programme set out as a certificate. */
function Education({ onViewCertificate }: { onViewCertificate: () => void }) {
  return (
    <div className="xp-block xp-edu">
      <h2 className="xp-label">Education</h2>
      <div className="xp-docs">
        <article className="xp-doc">
          <header className="xp-doc-head">
            <Image src={`${LOGOS}/chas_academy_logo.png`} alt="Chas Academy" width={160} height={160} className="xp-logo xp-logo-contain" />
            <div>
              <p className="xp-doc-school">Chas Academy</p>
              <p className="xp-doc-city">Stockholm</p>
            </div>
          </header>
          <h3 className="xp-doc-program">UX/UI Design with Frontend Competence</h3>
          <p className="xp-doc-text">
            At Chas Academy, I completed a two-year program in UX/UI Design with Frontend Competence, which included a 5-month
            internship. Through this program, I gained hands-on experience working as a product designer across various areas.
            The course&apos;s frontend development component supported my long-term goal of becoming a well-rounded product designer.
          </p>
          <p className="xp-label xp-doc-sub">The program covered</p>
          <ul className="xp-modules">
            {CHAS_MODULES.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <footer className="xp-doc-foot">
            <dl className="xp-doc-facts">
              <div>
                <dt className="xp-label">Studied</dt>
                <dd>Sep 2022 - June 2024</dd>
              </div>
              <div>
                <dt className="xp-label">Certificate</dt>
                <dd className="xp-tabular">2024-06-26</dd>
              </div>
            </dl>
            <div className="xp-doc-actions">
              <button type="button" className="xp-btn" onClick={onViewCertificate}>
                View certificate
                <Eye size={15} weight="bold" aria-hidden />
              </button>
            </div>
          </footer>
          <Crosshairs />
        </article>

        <article className="xp-doc">
          <header className="xp-doc-head">
            <Image src={`${LOGOS}/icon_collective_logo.png`} alt="Icon Collective" width={160} height={160} className="xp-logo" />
            <div>
              <p className="xp-doc-school">Icon Collective</p>
              <p className="xp-doc-city">Los Angeles</p>
            </div>
          </header>
          <h3 className="xp-doc-program">Music Production &amp; Business</h3>
          <p className="xp-doc-text">
            Completed a one-year program in Music Production &amp; Business at Icon Collective in Los Angeles, focusing on music
            production techniques, sound design, and the business aspects of the music industry.
          </p>
          <footer className="xp-doc-foot">
            <dl className="xp-doc-facts">
              <div>
                <dt className="xp-label">Studied</dt>
                <dd>Sep 2019 - Aug 2020</dd>
              </div>
              <div>
                <dt className="xp-label">Certificate</dt>
                <dd className="xp-tabular">2020-09-14</dd>
              </div>
            </dl>
          </footer>
          <Crosshairs />
        </article>
      </div>
    </div>
  )
}

export default function ExperienceEducationSection() {
  const [showCertificate, setShowCertificate] = useState(false)

  useEffect(() => {
    if (!showCertificate) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowCertificate(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stopSmoothScroll()
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      startSmoothScroll()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showCertificate])

  return (
    <section className={`xp ${inter.className} bg-transparent relative`}>
      <Experience />
      <Education onViewCertificate={() => setShowCertificate(true)} />

      {showCertificate ? (
        <div
          className="project-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Chas Academy certificate preview"
          onClick={() => setShowCertificate(false)}
        >
          <div
            className="project-lightbox-frame relative w-[min(92vw,900px)] h-[90vh] bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              aria-label="Close certificate preview"
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/80 text-white hover:bg-gray-900 transition-colors"
            >
              ✕
            </button>
            <iframe
              src="/Portfolio Assets/Certifications/examensbevis-chas-academy-samuel-oldmark-189997-4507.pdf"
              title="Chas Academy certificate"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
