'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Children, cloneElement, isValidElement, useEffect, useMemo, useState } from 'react'

const IMG = '/Portfolio Assets/Work/LOA'

type FigProps = {
  src: string
  alt: string
  w: number
  h: number
  caption?: string
  maxWidth?: number
  className?: string
  priority?: boolean
  /** inside a TwoUp / grid — skip the standalone vertical margin */
  bare?: boolean
}

function Fig({ src, alt, w, h, caption, maxWidth, className, priority, bare }: FigProps) {
  return (
    <figure
      className={`cs-media-frame ${bare ? '' : 'cs-media-block'} ${className ?? ''}`}
      style={maxWidth ? { maxWidth, marginInline: 'auto' } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        quality={90}
        priority={priority}
        sizes="(max-width: 640px) 88vw, 760px"
        className="cs-media-image"
      />
      {caption ? <figcaption className="cs-caption">{caption}</figcaption> : null}
    </figure>
  )
}

function TwoUp({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="cs-media-block">
      <div className="cs-visual-grid">
        {Children.map(children, (child) =>
          isValidElement<FigProps>(child) ? cloneElement(child, { bare: true }) : child
        )}
      </div>
      {caption ? <figcaption className="cs-media-caption">{caption}</figcaption> : null}
    </figure>
  )
}

function Gallery({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="cs-media-block">
      <div className="cs-gallery">
        {Children.map(children, (child) =>
          isValidElement<FigProps>(child) ? cloneElement(child, { bare: true }) : child
        )}
      </div>
      {caption ? <figcaption className="cs-media-caption">{caption}</figcaption> : null}
    </figure>
  )
}

const strokeProps = {
  stroke: 'currentColor',
  strokeWidth: 1.4,
  fill: 'none',
  vectorEffect: 'non-scaling-stroke' as const,
}

/* --- Diagram: system architecture --- */
function ArchitectureDiagram({ caption }: { caption?: string }) {
  return (
    <figure className="cs-media-block">
    <div className="cs-diagram" role="img" aria-label="System architecture: a Vite/React single-page app talks to a Convex backend for data and to WorkOS AuthKit for identity; Convex verifies the WorkOS JWT. Google Maps, Archilogic and PostHog are client-side SDKs loaded in the browser.">
      <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Browser */}
        <rect x="16" y="86" width="184" height="100" rx="14" {...strokeProps} />
        <text x="108" y="122" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">Browser</text>
        <text x="108" y="144" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.72">Vite + React 18 SPA</text>
        <text x="108" y="161" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.72">client router, Tailwind</text>

        {/* Convex */}
        <rect x="286" y="14" width="208" height="104" rx="14" {...strokeProps} />
        <text x="390" y="44" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">Convex</text>
        <text x="390" y="66" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.72">queries &middot; mutations</text>
        <text x="390" y="83" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.72">reactive document DB</text>
        <text x="390" y="100" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.72">11 tables &middot; file storage</text>

        {/* WorkOS */}
        <rect x="286" y="154" width="208" height="90" rx="14" {...strokeProps} />
        <text x="390" y="184" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">WorkOS AuthKit</text>
        <text x="390" y="206" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.72">hosted sign-in, Google OAuth</text>
        <text x="390" y="223" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.72">issues signed JWT</text>

        {/* Client SDKs */}
        <rect x="556" y="44" width="150" height="170" rx="14" {...strokeProps} strokeDasharray="4 4" />
        <text x="631" y="74" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="currentColor">Client SDKs</text>
        <text x="631" y="106" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.8">Google Maps</text>
        <text x="631" y="129" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.8">Archilogic 3D</text>
        <text x="631" y="152" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.8">PostHog</text>
        <text x="631" y="186" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">maps, 3D plans,</text>
        <text x="631" y="200" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">analytics</text>

        {/* edges */}
        <path d="M200 120 C 236 104, 250 74, 286 66" {...strokeProps} markerEnd="url(#arch-arrow)" markerStart="url(#arch-arrow)" />
        <text x="240" y="82" textAnchor="middle" fontSize="10.5" fill="currentColor" opacity="0.7">data</text>
        <path d="M200 152 C 236 170, 250 192, 286 200" {...strokeProps} markerEnd="url(#arch-arrow)" markerStart="url(#arch-arrow)" />
        <text x="240" y="196" textAnchor="middle" fontSize="10.5" fill="currentColor" opacity="0.7">sign-in</text>
        <path d="M390 154 L390 118" {...strokeProps} markerEnd="url(#arch-arrow)" />
        <text x="402" y="139" textAnchor="start" fontSize="10.5" fill="currentColor" opacity="0.7">verify JWT</text>
        {/* browser -> client SDKs, routed along the bottom */}
        <path d="M108 186 L108 274 L631 274 L631 214" {...strokeProps} strokeDasharray="3 4" opacity="0.5" markerEnd="url(#arch-arrow)" />
        <text x="370" y="288" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.5">bundled &amp; run in the browser</text>
      </svg>
    </div>
      {caption ? <figcaption className="cs-media-caption">{caption}</figcaption> : null}
    </figure>
  )
}

/* --- Diagram: account + onboarding flow --- */
function AuthFlowDiagram({ caption }: { caption?: string }) {
  const boxes = [
    ['Landing', '“Skapa konto”, pick a role'],
    ['WorkOS AuthKit', 'hosted sign-in / Google'],
    ['/callback', 'exchange code, seal session'],
    ['syncWorkosSession', 'upsert Convex user from the token'],
    ['Onboarding', 'role-specific steps + Lokalprogram'],
    ['App home', 'routed by role & permissions'],
  ]
  return (
    <figure className="cs-media-block">
    <div className="cs-diagram" role="img" aria-label="Account flow: from the landing page the visitor picks a role, authenticates through WorkOS AuthKit, returns to the callback route, is synced into a Convex user record, completes a role-specific onboarding flow, and lands on a role-scoped app home.">
      <svg viewBox="0 0 720 286" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>
        {boxes.map((b, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          const x = 20 + col * 235
          const y = 20 + row * 148
          return (
            <g key={b[0]}>
              <rect x={x} y={y} width="205" height="92" rx="13" {...strokeProps} />
              <text x={x + 102} y={y + 34} textAnchor="middle" fontSize="13.5" fontWeight="600" fill="currentColor">
                {b[0]}
              </text>
              <text x={x + 102} y={y + 56} textAnchor="middle" fontSize="10.6" fill="currentColor" opacity="0.72">
                {b[1]}
              </text>
            </g>
          )
        })}
        {/* row 1 */}
        <path d="M225 66 L253 66" {...strokeProps} markerEnd="url(#flow-arrow)" />
        <path d="M460 66 L488 66" {...strokeProps} markerEnd="url(#flow-arrow)" />
        {/* wrap from callback (top-right) down to syncWorkosSession (bottom-left) */}
        <path d="M590 112 C 590 150, 122 144, 122 162" {...strokeProps} markerEnd="url(#flow-arrow)" opacity="0.75" />
        <text x="392" y="128" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.55">the app resumes the chosen role after the redirect</text>
        {/* row 2 */}
        <path d="M225 214 L253 214" {...strokeProps} markerEnd="url(#flow-arrow)" />
        <path d="M460 214 L488 214" {...strokeProps} markerEnd="url(#flow-arrow)" />
      </svg>
    </div>
      {caption ? <figcaption className="cs-media-caption">{caption}</figcaption> : null}
    </figure>
  )
}

/* --- Diagram: lead pipeline --- */
function PipelineDiagram({ flush }: { flush?: boolean }) {
  const stages = ['Ny', 'Kontaktad', 'Visning bokad', 'Förhandling', 'Vunnen']
  return (
    <div
      className={flush ? '' : 'cs-diagram'}
      style={
        flush
          ? { maxWidth: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginTop: 'var(--cs-space-4)' }
          : undefined
      }
      role="img"
      aria-label="Lead pipeline stages: Ny, Kontaktad, Visning bokad, Förhandling, Vunnen — with Förlorad as an exit at any point."
    >
      <svg
        viewBox="0 0 720 130"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: 'auto', minWidth: 380 }}
      >
        <defs>
          <marker id="pipe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>
        {stages.map((s, i) => {
          const x = 12 + i * 141
          return (
            <g key={s}>
              <rect x={x} y="34" width="118" height="40" rx="20" {...strokeProps} />
              <text x={x + 59} y="59" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
                {s}
              </text>
              {i < stages.length - 1 ? (
                <path d={`M${x + 118} 54 L${x + 141} 54`} {...strokeProps} markerEnd="url(#pipe-arrow)" />
              ) : null}
            </g>
          )
        })}
        <rect x="300" y="96" width="118" height="30" rx="15" {...strokeProps} strokeDasharray="4 4" />
        <text x="359" y="116" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">Förlorad</text>
        <path d="M300 111 C 200 111, 150 80, 130 76" {...strokeProps} opacity="0.5" markerEnd="url(#pipe-arrow)" />
        <path d="M418 111 C 520 111, 560 80, 585 76" {...strokeProps} opacity="0.5" markerEnd="url(#pipe-arrow)" />
      </svg>
    </div>
  )
}

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'snapshot', label: 'At a glance' },
  { id: 'opportunity', label: 'The opportunity' },
  { id: 'strategy', label: 'Product strategy' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'scope', label: 'What I built' },
  { id: 'landing', label: 'Landing page' },
  { id: 'search', label: 'Lediga lokaler' },
  { id: 'listing', label: 'Object listing page' },
  { id: 'panels', label: 'Admin & broker panels' },
  { id: 'backend', label: 'Backend & data' },
  { id: 'auth', label: 'Sign-up & onboarding' },
  { id: 'integrations', label: 'Integrations & tooling' },
  { id: 'next', label: 'Where it goes next' },
]

export default function OfficeRentalPlatformCaseStudyPage() {
  const sectionIds = useMemo(() => sections.map((s) => s.id), [])
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 180
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element && scrollPosition >= element.offsetTop) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    updateActiveSection()
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sectionIds])

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
              <p className="cs-eyebrow">Personal side project &middot; Solo build</p>
              <h1 className="cs-title">Office rental platform &mdash; a self-serve marketplace for commercial space</h1>
              <p className="cs-subtitle">
                A working web platform where property owners publish office, studio and retail space directly,
                and growing companies find and shortlist their next space without going through a broker. I run
                it as a personal side project: I set the strategy, designed the whole product, and built the
                frontend, the Convex backend, the data model and the auth and API integrations myself. This is
                a real running app with a real backend &mdash; it has not launched, so there are no live users
                or revenue yet.
              </p>

              <div className="cs-actions">
                <Link href="/#work" className="cs-button cs-button-secondary">
                  Back to Work
                </Link>
                <a
                  href="https://rentalplatform.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-button cs-button-primary"
                >
                  Visit live build
                </a>
              </div>

              <Fig
                src={`${IMG}/loa-landing-hero.jpg`}
                alt="The landing page: a serif headline reading “Hitta rätt kontor”, a seats-and-area search field, and a tenant testimonial card over a photo of central Stockholm."
                w={2400}
                h={1500}
                priority
                caption="The landing page. The product and copy are in Swedish; the market is Stockholm."
              />
            </header>

            {/* AT A GLANCE */}
            <section id="snapshot" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">At a glance</h2>
              <div className="cs-snapshot-grid">
                <div className="cs-snapshot-item">
                  <p className="cs-label">What this is</p>
                  <p className="cs-copy">
                    A self-serve B2B marketplace for renting commercial space in Stockholm. My own project,
                    not client work.
                  </p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">My role</p>
                  <p className="cs-copy">
                    Everything: business model, product strategy, UX and UI, frontend, backend, database
                    design, and the auth and third-party integrations.
                  </p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">Timeline</p>
                  <p className="cs-copy">
                    Roughly six months of evenings and weekends, March&ndash;September 2026, still ongoing.
                  </p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">Stack</p>
                  <p className="cs-copy">
                    Vite + React, Tailwind, Convex (backend + database), WorkOS AuthKit, Google Maps,
                    Archilogic, PostHog.
                  </p>
                </div>
              </div>

              <div className="cs-callout">
                <p className="cs-label">The core idea</p>
                <p className="cs-copy">
                  Stockholm&rsquo;s commercial rental market is large and stable but has seen little modern
                  product design. The bet is that a well-built self-serve platform can make the process
                  meaningfully faster than the broker-led norm. This case study is about designing and
                  building that platform, not about the commercial plan behind it.
                </p>
              </div>

              <div className="cs-tag-row">
                {[
                  'B2B marketplace',
                  'Product strategy',
                  'UX / UI',
                  'Design system',
                  'React',
                  'Convex',
                  'WorkOS',
                  'Auth & RBAC',
                  'Data modelling',
                  'Google Maps',
                  'Archilogic',
                  'PostHog',
                ].map((t) => (
                  <span key={t} className="cs-tag">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* THE OPPORTUNITY */}
            <section id="opportunity" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">The opportunity</h2>
              <div className="cs-prose">
                <p>
                  Renting commercial space in Stockholm still runs on brokers, phone calls and listings that
                  go stale. It is a large, stable market that has barely been touched by modern product
                  design &mdash; a slow, offline process where a faster one is clearly possible. That is what
                  the project is aimed at.
                </p>
              </div>
            </section>

            {/* PRODUCT STRATEGY */}
            <section id="strategy" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Product strategy</h2>
              <div className="cs-prose">
                <p>
                  The core idea is a self-serve marketplace: property owners list their own space and growing
                  companies find and book viewings directly, with the process designed to run quickly and
                  largely on its own. The rest of this case study is about designing and building that idea
                  end to end &mdash; the deeper commercial and product thinking sits in a separate plan.
                </p>
              </div>
            </section>

            {/* DISCOVERY */}
            <section id="discovery" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Discovery</h2>
              <div className="cs-prose">
                <p>
                  Before drawing screens I spent time in Miro: pulling apart how the established Swedish
                  rental platforms handle listing upload and tenant onboarding, sketching the flows for the
                  parts that would work differently here, and mapping how each kind of user would actually
                  come on board.
                </p>
              </div>

              <Fig
                src={`${IMG}/loa-discovery-teardown.jpg`}
                alt="A Miro board with two long rows of annotated wireframe screens — a screen-by-screen teardown of an incumbent rental platform's landlord listing-upload flow and its tenant flow, with sticky-note observations throughout."
                w={2000}
                h={976}
                caption="Competitor benchmarking — every step of two incumbent flows captured and annotated, screen by screen."
              />

              <Gallery caption="Flow sketches and adoption mapping done alongside the teardown, feeding straight into the onboarding, requirements and verification designs.">
                <Fig
                  src={`${IMG}/loa-discovery-flow.png`}
                  alt="A flowchart for the tenant requirements feature: create account, tailor a requirements spec, get a list of potential matches, contact an owner in one click."
                  w={1600}
                  h={1341}
                />
                <Fig
                  src={`${IMG}/loa-discovery-adoption.jpg`}
                  alt="A board mapping three routes a customer might take to adopt the platform, with notes on which route suits which kind of company."
                  w={1600}
                  h={1326}
                />
                <Fig
                  src={`${IMG}/loa-discovery-verification.png`}
                  alt="A flowchart of the broker verification flow: register, pick a property company, choose one of three verification methods, pass an approval check, then publish under the company."
                  w={1301}
                  h={1400}
                />
              </Gallery>

              <ul className="cs-list cs-list-compact">
                <li>Incumbent upload flows are long and loosely structured &mdash; the case for a shorter, guided publishing wizard on a fixed data template.</li>
                <li>Tenants re-enter the same requirements every time &mdash; the case for capturing them once as a reusable spec.</li>
                <li>Publishers aren&rsquo;t one persona &mdash; individuals, companies and their brokers each need a different way in, which is why onboarding is role-first and brokers go through verification.</li>
              </ul>
            </section>

            {/* WHAT I BUILT */}
            <section id="scope" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">What I designed and built</h2>
              <div className="cs-prose">
                <p>
                  This is not a set of mockups. It is a running application with a live backend, seeded with a
                  realistic Stockholm catalogue. The frontend is a single-page React app; the backend is
                  Convex, with the auth layer wired through WorkOS. The numbers below are counted from the
                  codebase.
                </p>
              </div>

              <div className="cs-num-grid">
                <div className="cs-num">
                  <p className="cs-num-value">~25k</p>
                  <p className="cs-num-label">lines of frontend code across 60+ components and pages</p>
                </div>
                <div className="cs-num">
                  <p className="cs-num-value">11</p>
                  <p className="cs-num-label">Convex tables with a typed schema and 30+ indexes</p>
                </div>
                <div className="cs-num">
                  <p className="cs-num-value">40+</p>
                  <p className="cs-num-label">Convex queries and mutations across 9 backend modules</p>
                </div>
                <div className="cs-num">
                  <p className="cs-num-value">3</p>
                  <p className="cs-num-label">user roles with route-level and backend permission enforcement</p>
                </div>
              </div>

              <ArchitectureDiagram caption="The frontend never trusts itself for identity: every protected read and write is authorised in Convex against the verified WorkOS token." />

              <h3 className="cs-card-title cs-subhead">
                Surfaces in the build
              </h3>
              <ul className="cs-list cs-list-compact">
                <li>Marketing site: landing page, &ldquo;how it works&rdquo;, Lokalprogram, pricing, FAQ.</li>
                <li>Account: role-first sign-up, sign-in, callback, forgot-password, four onboarding flows.</li>
                <li>Tenant app: <em>Lediga lokaler</em> search, object listing pages, gallery, shortlist, viewing requests, viewings, messages, profile, settings.</li>
                <li>Publisher: a 3-step publishing wizard, &ldquo;Dina objekt&rdquo; listing management with an in-panel editor.</li>
                <li>Broker panel: dashboard, own listings, lead CRM, messages, saved objects and searches.</li>
                <li>Company-admin panel: everything the broker panel has, plus a broker team, company profile, and a 9-module analytics view.</li>
              </ul>

              <figure className="cs-media-block">
              <div className="cs-matrix-wrap">
                <table className="cs-matrix">
                  <thead>
                    <tr>
                      <th scope="col">Capability</th>
                      <th scope="col">Hyresgäst</th>
                      <th scope="col">Mäklare</th>
                      <th scope="col">Bolagsadmin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Search, shortlist, book viewings</th>
                      <td>Yes</td>
                      <td>Yes</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <th scope="row">Save a Lokalprogram</th>
                      <td>Yes</td>
                      <td>&mdash;</td>
                      <td>&mdash;</td>
                    </tr>
                    <tr>
                      <th scope="row">Publish & manage listings</th>
                      <td>&mdash;</td>
                      <td>Own listings</td>
                      <td>All company listings</td>
                    </tr>
                    <tr>
                      <th scope="row">Lead CRM pipeline</th>
                      <td>&mdash;</td>
                      <td>Own leads</td>
                      <td>Company leads</td>
                    </tr>
                    <tr>
                      <th scope="row">Manage broker team</th>
                      <td>&mdash;</td>
                      <td>&mdash;</td>
                      <td>Approve / edit / remove</td>
                    </tr>
                    <tr>
                      <th scope="row">Analytics dashboard</th>
                      <td>&mdash;</td>
                      <td>Own performance</td>
                      <td>Company-wide, 9 modules</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <figcaption className="cs-media-caption">
                A company-admin implicitly holds the broker and tenant roles; roles are requested during
                onboarding and, for brokers, approved by a company admin.
              </figcaption>
              </figure>
            </section>

            {/* LANDING PAGE */}
            <section id="landing" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">The landing page</h2>
              <div className="cs-prose">
                <p>
                  The landing page is doing sales work, so it is deliberately editorial: a high-contrast serif
                  display face against a clean sans, alternating light and near-black sections for rhythm, and
                  real Stockholm photography. The hero headline cycles through space types
                  (&ldquo;kontor&rdquo;, &ldquo;coworking&rdquo;, &ldquo;studio&rdquo;, &ldquo;butik&rdquo;)
                  and the search field is functional &mdash; it runs a real query.
                </p>
                <p>
                  The two feature sections are scroll-driven modules. In &ldquo;Så fungerar det&rdquo; and the
                  Lokalprogram block, the left-hand step titles stay pinned while product mockups on the right
                  slide and swap as you scroll through the section &mdash; the mockups are built from the
                  actual UI, not flat images.
                </p>
              </div>

              <TwoUp caption="“Så fungerar det” — three steps rendered as UI mockups — and the Lokalprogram scroll module with pinned step titles.">
                <Fig
                  src={`${IMG}/loa-how-it-works.png`}
                  alt="The “Så fungerar det” section: heading “Tre steg till en snabbare uthyrningsprocess” with three cards — create an account and pick a role, search or publish, book and follow up."
                  w={2400}
                  h={1500}
                />
                <Fig
                  src={`${IMG}/loa-lokalprogram.png`}
                  alt="The Lokalprogram section: heading “Sätt upp ert lokalprogram innan ni börjar leta brett” with a mockup of a saved requirements card showing area, size, budget and term."
                  w={2400}
                  h={1500}
                />
              </TwoUp>
            </section>

            {/* LEDIGA LOKALER */}
            <section id="search" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Lediga lokaler &mdash; the search experience</h2>
              <div className="cs-prose">
                <p>
                  <em>Lediga lokaler</em> is the core tenant surface: a scrollable result list on the left, a
                  sticky Google Map with pins on the right, and a filter bar that becomes a compact sticky pill
                  as you scroll. Featured listings render as full-width horizontal cards; the rest as a
                  two-column grid. It is public &mdash; you can browse and open listings without an account,
                  and the sign-in wall only appears when you act.
                </p>
              </div>

              <Fig
                src={`${IMG}/loa-search.jpg`}
                alt="The Lediga lokaler search view on desktop: a scrollable result list of listing cards on the left, and a map card with location pins over central Stockholm on the right."
                w={1440}
                h={900}
                caption="Desktop search — result list on the left, map with pins on the right. Each card carries a mini gallery, verified / featured badges, price per m², availability and a one-tap “Boka visning”."
              />

              <div className="cs-decision-grid">
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">The full filter set</h3>
                  <p className="cs-copy">
                    Behind &ldquo;Visa alla filter&rdquo;: type, area, seats, min/max size, min/max budget,
                    move-in date, contract flexibility, transit distance, parking, layout, advertiser,
                    furnishing, and three toggles (operating costs included, accessibility-adapted,
                    eco-certified) &mdash; plus a 29-item amenities picker. Filters can be saved as named
                    presets and set to &ldquo;watch&rdquo;.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Contradiction detection</h3>
                  <p className="cs-copy">
                    If a combination of filters is impossible &mdash; area plus amenities too narrow together,
                    size and budget incompatible, or the whole query over-constrained &mdash; the UI says so
                    and suggests which constraint to loosen, instead of just showing zero results.
                  </p>
                </article>
              </div>

              <TwoUp caption="Left: the full filter panel. Right: AI search — a plain-language request that turns into the same filters, shown and editable.">
                <Fig
                  src={`${IMG}/loa-search-filters.png`}
                  alt="The “Alla filter” panel: dropdowns and inputs for type, size, move-in, furnishing, budget, contract, transit and layout, above a grid of amenity chips and a “Visa 25 resultat” button."
                  w={2400}
                  h={2366}
                />
                <Fig
                  src={`${IMG}/loa-search-ai.png`}
                  alt="The AI search panel: a chat-style panel headed “AI-sök” with suggested prompts and a typed request for a 15-person office on Södermalm under 90,000 kr."
                  w={1800}
                  h={1696}
                />
              </TwoUp>

              <p className="cs-copy">
                The AI search is honest about what it is: a deterministic Swedish request parser over the same
                match engine that powers the filters. It extracts district, type, budget, team size and
                &ldquo;ledig nu&rdquo;, merges them into the active filters, and returns the top matches with a
                short explanation. No black box &mdash; every choice it makes is a filter you can see and
                change.
              </p>
            </section>

            {/* OBJECT LISTING PAGE */}
            <section id="listing" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">The object listing page</h2>
              <div className="cs-prose">
                <p>
                  The listing page has to carry the whole decision. It opens with a gallery (with a full
                  lightbox and a PDF export), then the structured facts: size, capacity, description,
                  amenities. A sticky contact card holds availability, monthly rent, the responsible broker,
                  and the &ldquo;Boka visning&rdquo; and &ldquo;Kontakta uthyrare&rdquo; actions.
                </p>
                <p>
                  Below that: an interactive floor-plan and 3D walkthrough via an Archilogic model, a public
                  transit block with real lines and nearby stations, an area / neighbourhood section with a map
                  and street-view toggle, and a &ldquo;Liknande objekt&rdquo; row of ranked similar listings.
                </p>
              </div>

              <Fig
                src={`${IMG}/loa-listing.jpg`}
                alt="The object listing page: a three-image gallery with PDF, save and share actions; the title “Strandnära Studio Kontor” with size and capacity chips and amenities; the Archilogic 3D model panel; a public-transit block with lines and stations; and a sticky contact card showing 95,000 kr per month."
                w={2800}
                h={2624}
                caption="Gallery, structured facts, amenities and the 3D model panel, with a public-transit block and a sticky contact and booking card. The page continues with an area map, street view and a row of ranked similar listings."
              />
            </section>

            {/* ADMIN & BROKER PANELS */}
            <section id="panels" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Admin &amp; broker panels</h2>
              <div className="cs-prose">
                <p>
                  Publishers get a real back office, not a settings page. The broker panel and the
                  company-admin panel share one shell &mdash; a collapsible left sidebar, the same layout and
                  components &mdash; but differ in scope: a broker sees their own listings, leads and
                  performance; a company admin sees the whole company, plus the broker team and company-wide
                  analytics.
                </p>
              </div>

              <div className="cs-decision-grid">
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Lead CRM</h3>
                  <p className="cs-copy">
                    Every viewing request becomes a lead with a fit score and auto-generated match tags. Leads
                    move through a canonical pipeline, each with a side-panel of detail and an activity log
                    (note / call / email / viewing). The pipeline is the backbone of the &ldquo;minimal manual
                    operation&rdquo; principle.
                  </p>
                  <PipelineDiagram flush />
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Listing management &amp; publishing</h3>
                  <p className="cs-copy">
                    &ldquo;Dina objekt&rdquo; opens each listing into an in-panel editor, sectioned by base
                    info, amenities, images and terms, with a fixed action footer. Publishing runs through a
                    three-step wizard (Grundinfo &rarr; Villkor &rarr; Granska &amp; publicera) with a live
                    quality score, required-field validation, draft saving, and a duplicate-address signal.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Analytics</h3>
                  <p className="cs-copy">
                    The company-admin panel has a nine-module analytics view built on Recharts &mdash; KPI
                    overview, a views/enquiries trend, type distribution, per-area performance, a conversion
                    funnel, broker performance, a weekly-activity heatmap, a per-type trend and extended
                    metrics. It reads real data from the tenant&rsquo;s own listings and falls back to an
                    empty state rather than fake numbers.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Broker verification</h3>
                  <p className="cs-copy">
                    A broker requests to join a company by organisation number; the company admin gets a
                    notification and approves, edits or rejects. Approval grants the broker role, links the
                    membership, and notifies the broker. Removing a broker steps their roles back down safely.
                  </p>
                </article>
              </div>

              <p className="cs-note">
                These panels sit behind auth, so they are described here from the build rather than shown as
                screenshots &mdash; the public surfaces above are all live in the running app.
              </p>
            </section>

            {/* BACKEND & DATA */}
            <section id="backend" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Backend &amp; data architecture</h2>
              <div className="cs-prose">
                <p>
                  Convex holds the whole backend: a typed schema, the query/mutation functions, reactive
                  subscriptions that keep the UI live, and file storage for floor plans. WorkOS is registered
                  as a custom-JWT auth provider, so Convex verifies the token itself (RS256, JWKS from WorkOS)
                  and every function resolves the caller from that verified identity &mdash; never from
                  anything the client sends.
                </p>
              </div>

              <div className="cs-decision-grid">
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">The data model &mdash; 11 tables</h3>
                  <ul className="cs-list cs-list-compact">
                    <li><strong>Identity:</strong> users, companies, companyMemberships, notifications.</li>
                    <li><strong>Marketplace:</strong> listings, listingViews, favorites.</li>
                    <li><strong>Deal flow:</strong> viewings, leads, leadActivities.</li>
                    <li><strong>System:</strong> appMeta (seed markers, migration state).</li>
                  </ul>
                  <p className="cs-copy" style={{ marginTop: '0.75rem' }}>
                    Every table carries a stable public id alongside Convex&rsquo;s internal id, and a
                    hand-picked set of indexes (by owner, by status, by company, by user + listing, by
                    publisher + follow-up date) so list and pipeline queries stay index-backed.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Server-enforced rules</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>Draft listings are visible only to their owner, the owning company, and that company&rsquo;s brokers.</li>
                    <li>A listing&rsquo;s quality score is computed server-side from field completeness; publishing checks a minimum set of fields.</li>
                    <li>Leads are auto-qualified with budget / timing / team-size tags when a viewing request comes in.</li>
                    <li><code>updateMe</code> physically cannot patch a role; role changes go through a separate, checked mutation.</li>
                    <li>Sanitised user objects strip the token identifier and subject before they ever reach the client.</li>
                  </ul>
                </article>
              </div>

              <div className="cs-callout">
                <p className="cs-label">An auth-safety regression test</p>
                <p className="cs-copy">
                  Because the auth model got complex, I wrote a static check (<code>npm run
                  test:auth-safety</code>) that fails the build if a public role-escalation mutation
                  reappears, if <code>updateMe</code> starts accepting a role, if seeding stops being
                  env-gated, or if the user sanitiser stops stripping identity fields. It codifies the
                  invariants I kept almost breaking during refactors.
                </p>
              </div>

              <h3 className="cs-card-title cs-subhead">
                Migrations
              </h3>
              <p className="cs-copy">
                Schema changes ship as idempotent, dry-runnable backfills &mdash; normalising legacy lead and
                viewing statuses to a canonical pipeline, and widening listing images from bare URL strings to
                <code> {'{ url, order, tag }'} </code> objects before narrowing the schema back down. The
                pattern: widen the schema to accept both shapes, backfill, then narrow.
              </p>
            </section>

            {/* SIGN-UP & ONBOARDING */}
            <section id="auth" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Sign-up, sign-in &amp; onboarding</h2>
              <div className="cs-prose">
                <p>
                  Auth went through a full migration. The first version used Clerk; I moved the whole thing to
                  WorkOS AuthKit backed by Convex, because WorkOS&rsquo;s hosted AuthKit plus a custom-JWT
                  provider in Convex gave a cleaner split between identity and application data, and a path to
                  SSO later.
                </p>
                <p>
                  Sign-up is <strong>role-first</strong>: you choose &ldquo;I want to rent&rdquo; or &ldquo;I
                  want to rent out&rdquo; before you ever see WorkOS, so the intent survives the OAuth
                  round-trip. After WorkOS returns, the app lands on a quiet loading state (not a jarring blank
                  redirect), syncs the identity into a Convex user, and drops you into the onboarding flow for
                  your role.
                </p>
              </div>

              <AuthFlowDiagram caption="The account flow. Getting the role selection to survive the redirect — and never bounce the user back to it — took several iterations." />

              <div className="cs-decision-grid">
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Four onboarding flows</h3>
                  <ul className="cs-list cs-list-compact">
                    <li><strong>Tenant:</strong> build a Lokalprogram (17 fields), review. On finish it seeds the search filters.</li>
                    <li><strong>Broker:</strong> publisher profile, then a verification request to the company admin.</li>
                    <li><strong>Broker with program:</strong> both of the above.</li>
                    <li><strong>Company admin:</strong> company profile with organisation-number lookup and dedup against existing companies.</li>
                  </ul>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">Things that were fiddly on purpose</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>A brand-new Google sign-in for an unknown email must land in <em>Skapa konto</em>, not a login page, with name and email pre-filled but the account not yet created.</li>
                    <li>Drafts persist to local storage so a refresh mid-onboarding loses nothing.</li>
                    <li>A renter-only account and a company-admin account for the same email are reconciled on sign-in instead of colliding.</li>
                    <li>Back navigation works at every step, including role re-selection.</li>
                  </ul>
                </article>
              </div>

              <Fig
                src={`${IMG}/loa-signup.png`}
                alt="Sign-up step one: a card headed “Välkommen!” with two role cards, “Jag vill hyra” and “Jag vill hyra ut”, and a Fortsätt button."
                w={2400}
                h={1500}
                caption="Role-first sign-up — the choice is made before the WorkOS hand-off."
              />
            </section>

            {/* INTEGRATIONS & TOOLING */}
            <section id="integrations" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Integrations &amp; tooling</h2>
              <div className="cs-ownership-grid">
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">Third-party services</h3>
                  <ul className="cs-list cs-list-compact">
                    <li><strong>WorkOS AuthKit</strong> &mdash; hosted sign-in and Google OAuth; custom-JWT provider verified inside Convex; dev/preview/prod redirect and CORS config committed to the repo.</li>
                    <li><strong>Convex</strong> &mdash; backend functions, reactive database, file storage, env-gated seeding.</li>
                    <li><strong>Google Maps</strong> &mdash; result-list map, listing-area map and street view, custom map styling.</li>
                    <li><strong>Archilogic</strong> &mdash; embedded 2D/3D floor-plan and walkthrough on listing pages.</li>
                    <li><strong>PostHog</strong> (EU) &mdash; a typed analytics layer: search performed, signup completed, viewing requested, lead status changed, AI prompt submitted.</li>
                  </ul>
                </div>
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">Build &amp; data tooling</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>A Playwright scraper that pulls real office listings from a Stockholm property owner&rsquo;s site &mdash; with a robots.txt parser and polite rate limiting &mdash; to seed a credible catalogue.</li>
                    <li>The <code>test:auth-safety</code> static check described above.</li>
                    <li>A local mock-data seed so the app is usable on first boot without any network calls.</li>
                    <li>Deployment config for Vercel with per-branch preview auth.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* WHERE IT GOES NEXT */}
            <section id="next" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Where it goes next</h2>
              <div className="cs-prose">
                <p>
                  The platform is pre-launch. The honest status: the tenant and publisher surfaces are built
                  and working end-to-end on a real backend; the integrated messaging and offer flow is partial;
                  and nothing has been tested with real users yet.
                </p>
              </div>
              <ul className="cs-list">
                <li>Finish the integrated communication layer &mdash; offers, counter-offers, e-sign partner &mdash; so the whole deal closes in-platform.</li>
                <li>Replace the keyword-based AI search parser with a real model call, keeping the &ldquo;filters shown, always editable&rdquo; contract.</li>
                <li>Wire the Lokalprogram into an actual matching feed for owners, not just a saved spec.</li>
                <li>Seed 50&ndash;100 real listings and run a closed beta with a handful of owners and tenants; instrument time-to-first-qualified-lead and response time.</li>
                <li>Legal review of the platform-vs-broker line and the terms before any public launch.</li>
                <li>Swap the placeholder brand mark in the app header for a finished brand identity throughout.</li>
              </ul>

              <p className="cs-note">
                I built this to have one project where I owned the entire stack &mdash; the market case, the
                product decisions, the design system, the React frontend, the database schema, and the auth
                and API integration &mdash; and had to make them all agree with each other.
              </p>
            </section>

          </article>
        </div>
      </div>
    </main>
  )
}
