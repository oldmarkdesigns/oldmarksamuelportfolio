'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

const SEB_GREEN = '#013823'
const IMG = '/Portfolio Assets/Work/SEB_Case_Study'

type ShotProps = {
  src: string
  alt: string
  caption?: string
  className?: string
}

function Shot({ src, alt, caption, className }: ShotProps) {
  return (
    <figure className={`cs-media-frame ${className ?? ''}`}>
      <Image
        src={src}
        alt={alt}
        width={1206}
        height={2622}
        quality={90}
        sizes="(max-width: 640px) 88vw, 320px"
        className="cs-media-image"
      />
      {caption ? <figcaption className="cs-caption">{caption}</figcaption> : null}
    </figure>
  )
}

type FigProps = {
  src: string
  alt: string
  w: number
  h: number
  caption?: string
  maxWidth?: number
  className?: string
}

function Fig({ src, alt, w, h, caption, maxWidth, className }: FigProps) {
  return (
    <figure
      className={`cs-media-frame ${className ?? ''}`}
      style={maxWidth ? { maxWidth, marginInline: 'auto' } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        quality={95}
        sizes="(max-width: 640px) 88vw, 720px"
        className="cs-media-image"
      />
      {caption ? <figcaption className="cs-caption">{caption}</figcaption> : null}
    </figure>
  )
}

type StepProps = {
  img: string
  alt: string
  caption?: string
  w?: number
  h?: number
  mediaPos?: string
  children: React.ReactNode
}

function Step({ img, alt, caption, w = 1206, h = 2622, mediaPos, children }: StepProps) {
  return (
    <article
      className="cs-step"
      style={mediaPos ? ({ '--cs-step-media-pos': mediaPos } as React.CSSProperties) : undefined}
    >
      <div className="cs-step-body">{children}</div>
      <figure className="cs-step-media">
        <Image
          src={img}
          alt={alt}
          width={w}
          height={h}
          quality={92}
          sizes="(max-width: 1024px) 300px, 288px"
          className="cs-step-media-img"
        />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </article>
  )
}

function Carousel({ items, label }: { items: React.ReactNode[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [height, setHeight] = useState<number>()
  const [hintVisible, setHintVisible] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const hintDoneRef = useRef(false)
  const count = items.length

  const dismissHint = () => {
    hintDoneRef.current = true
    setHintVisible(false)
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root || hintDoneRef.current) return

    let showTimer = 0
    let hideTimer = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hintDoneRef.current) return
        observer.disconnect()
        // show almost immediately once the module enters the viewport; the short
        // delay just lets the fade-in register rather than popping in
        showTimer = window.setTimeout(() => {
          if (hintDoneRef.current) return
          setHintVisible(true)
          hideTimer = window.setTimeout(() => setHintVisible(false), 5500)
        }, 250)
      },
      { threshold: 0 }
    )
    observer.observe(root)

    return () => {
      observer.disconnect()
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => {
      const active = stage.querySelector<HTMLElement>('[data-state="active"]')
      if (active && active.offsetHeight > 0) setHeight(active.offsetHeight)
    }

    measure()
    const raf = requestAnimationFrame(measure)
    const timer = window.setTimeout(measure, 80)

    // observe only the active card (measuring its content height); observing the
    // stage would feed back on the height we set here
    const active = stage.querySelector<HTMLElement>('[data-state="active"]')
    const observer = active ? new ResizeObserver(measure) : null
    if (active && observer) observer.observe(active)
    window.addEventListener('resize', measure)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      observer?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [index])

  const go = (delta: number) => {
    if (!hintDoneRef.current) dismissHint()
    setIndex((i) => Math.min(count - 1, Math.max(0, i + delta)))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  return (
    <div
      className="cs-carousel"
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      <div className="cs-carousel-stage" ref={stageRef} style={height ? { height } : undefined}>
        <div className="cs-carousel-controls">
          <span className="cs-carousel-count" aria-live="polite">
            {index + 1} of {count}
          </span>
          <button
            type="button"
            className="cs-carousel-btn"
            aria-label="Previous step"
            disabled={index === 0}
            onClick={() => go(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="cs-carousel-btn"
            aria-label="Next step"
            disabled={index === count - 1}
            onClick={() => go(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {items.map((item, i) => {
          const offset = i - index
          let transform = 'translateX(16%) scale(0.85)'
          let opacity = 0
          let zIndex = 1
          if (offset === 0) {
            transform = 'translateX(0) scale(1)'
            opacity = 1
            zIndex = 4
          } else if (offset === 1) {
            transform = 'translateX(16%) scale(0.9)'
            opacity = 0.4
            zIndex = 3
          } else if (offset < 0) {
            transform = 'translateX(-108%) scale(0.94)'
            opacity = 0
            zIndex = 0
          }
          return (
            <div
              key={i}
              className="cs-carousel-card"
              data-state={offset === 0 ? 'active' : 'inactive'}
              aria-hidden={offset !== 0}
              style={{ transform, opacity, zIndex }}
            >
              {item}
            </div>
          )
        })}
      </div>
      <div className="cs-carousel-hint" data-visible={hintVisible} role="status">
        <span>Use the arrows to click through all {count} steps.</span>
        <button
          type="button"
          className="cs-carousel-hint-close"
          aria-label="Dismiss hint"
          onClick={dismissHint}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const sections = [
  { id: 'project-overview', label: 'Overview' },
  { id: 'snapshot', label: 'At a glance' },
  { id: 'summary', label: 'Summary' },
  { id: 'method', label: 'How I did this' },
  { id: 'current', label: 'How it works now' },
  { id: 'problems', label: 'Where it falls short' },
  { id: 'klarna', label: 'A look at Klarna' },
  { id: 'principles', label: 'Rules I set' },
  { id: 'proposal', label: 'The proposed flow' },
  { id: 'rows', label: 'The row: before & after' },
  { id: 'validate', label: "How I'd test it" },
]

export default function SebCaseStudyPage() {
  const sectionIds = useMemo(() => sections.map((section) => section.id), [])
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 180
      let current = sectionIds[0]

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element && scrollPosition >= element.offsetTop) {
          current = id
        }
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
            <header className="cs-hero" id="project-overview">
              <p className="cs-eyebrow">Case Study &middot; Self-directed</p>
              <div
                className="w-fit overflow-hidden rounded-lg px-4 py-3"
                style={{ backgroundColor: SEB_GREEN }}
              >
                <Image
                  src={`${IMG}/seb-logo-mark.png`}
                  alt="SEB logo"
                  width={274}
                  height={151}
                  quality={95}
                  data-lightbox-ignore="true"
                  className="block h-7 w-auto"
                />
              </div>
              <h1 className="cs-title">Improving transaction search in the SEB app</h1>
              <p className="cs-subtitle">
                A personal project. I looked at how you search and filter transactions in SEB&rsquo;s banking
                app, worked out what makes it hard, and drew a set of screens that fix it using SEB&rsquo;s
                existing style: filters that stay on screen, a way to pick a date range, an easier-to-read
                transaction row, and a search box you can ask a normal question &mdash; it then shows you the
                filters it used so you can change them. These are mockups, not real SEB work.
              </p>

              <div className="cs-actions">
                <Link href="/#work" className="cs-button cs-button-secondary">
                  Back to Work
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7 mt-2">
                <Shot
                  src={`${IMG}/seb-account-overview.png`}
                  alt="SEB account screen showing available balance, quick actions and a transaction list."
                  caption="Entry: search is one magnifier icon in the transaction header."
                />
                <Shot
                  src={`${IMG}/seb-search-empty.png`}
                  alt="SEB transaction search with an empty free-text field and the keyboard open."
                  caption="Search: one free-text field, three direction tabs, nothing else."
                />
                <Shot
                  src={`${IMG}/seb-search-results.png`}
                  alt="SEB transaction search results listed in reverse chronological order grouped by month."
                  caption="Results: a reverse-chronological list grouped only by month."
                />
              </div>
              <p className="cs-caption mt-5" style={{ borderTop: 'none', paddingTop: 0 }}>
                How SEB transaction search works today (iPhone app, September 2026). These are what I based the
                analysis on.
              </p>
            </header>

            <section id="snapshot" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">At a glance</h2>
              <div className="cs-snapshot-grid">
                <div className="cs-snapshot-item">
                  <p className="cs-label">What this is</p>
                  <p className="cs-copy">A personal project. Not work for SEB or a client.</p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">What it covers</p>
                  <p className="cs-copy">
                    How you search and filter transactions in the SEB iPhone app, and how readable the list is.
                  </p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">What I worked from</p>
                  <p className="cs-copy">
                    Six screenshots of the live apps &mdash; three from SEB, three from Klarna. I had no access
                    to SEB&rsquo;s team, data or research.
                  </p>
                </div>
                <div className="cs-snapshot-item">
                  <p className="cs-label">What I made</p>
                  <p className="cs-copy">This write-up, plus six mockups drawn in SEB&rsquo;s existing style.</p>
                </div>
              </div>

              <div className="cs-callout">
                <p className="cs-label">The main problem</p>
                <p className="cs-copy">
                  People usually remember a payment by what it was for, where they were, who they paid, or
                  roughly when. SEB&rsquo;s search only works if you already know the exact shop name or amount.
                  If you don&rsquo;t, you just scroll.
                </p>
              </div>
            </section>

            <section id="summary" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Summary</h2>
              <div className="cs-prose">
                <p>
                  <strong>The problem.</strong> SEB&rsquo;s search only helps if you can type the exact shop
                  name or amount. There is no filter by category, no way to pick a date range, and you
                  can&rsquo;t just ask a normal question.
                </p>
                <p>
                  <strong>What I found.</strong> The list you scroll through is also unreliable. Swish payments
                  show up as phone numbers. Some payments are misclassified &mdash; a software subscription
                  filed as a restaurant, a stockbroker filed as a mortgage &mdash; and a misclassified payment
                  also picks a misleading icon.
                </p>
                <p>
                  <strong>What I&rsquo;m proposing.</strong> Keep the SEB app as it is and add four things:
                  filters that stay on screen, a way to pick a date range, an easier-to-read transaction row,
                  and a search box you can ask a normal question. The question turns into the same filters,
                  shown on screen, plus a short answer &mdash; and you can change any of it.
                </p>
              </div>
            </section>

            <section id="method" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">How I did this</h2>
              <div className="cs-ownership-grid">
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">What I did</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>Went through the search screens one by one and wrote down every control and piece of information.</li>
                    <li>Listed the questions people actually have about their spending, then checked which ones the app can answer.</li>
                    <li>Checked the sample transactions for inaccurate names and misclassified categories.</li>
                    <li>Built the new screens using SEB&rsquo;s existing colours, fonts, spacing and components.</li>
                  </ul>
                </div>
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">What I couldn&rsquo;t do</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>I had no access to SEB&rsquo;s users, data or plans &mdash; this is based on six screenshots.</li>
                    <li>The mockups show interface ideas only. I&rsquo;m not claiming anything about how SEB&rsquo;s systems work or how it decides categories.</li>
                    <li>I didn&rsquo;t redesign the app in a new style. Everything stays in SEB&rsquo;s current look.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="current" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">How SEB search works today</h2>

              <Carousel
                label="How SEB search works today"
                items={[
                  <Step
                    key="c1"
                    img={`${IMG}/seb-account-overview.png`}
                    alt="SEB account overview with the Transactions header and a small search icon."
                    caption="The only way into search is the small magnifier, top right of the transaction list."
                  >
                    <h3 className="cs-card-title">1. Getting to search</h3>
                    <div className="cs-prose">
                      <p>
                        Search is one small magnifier icon above the transaction list. Tapping it opens an empty
                        box with the keyboard up &mdash; no recent searches, no filters, no suggestions. You have
                        to know what to type before anything helps.
                      </p>
                      <p>
                        The account screen does have one nice touch: a plain line saying &ldquo;Upcoming
                        transactions &mdash; 1 in the next 30 days&rdquo;. Nothing that simple shows up once you
                        start searching.
                      </p>
                    </div>
                  </Step>,
                  <Step
                    key="c2"
                    img={`${IMG}/seb-search-empty.png`}
                    alt="SEB search field with placeholder text and All / Outgoing / Incoming tabs."
                    caption="One text box plus an In / Out toggle. No filter for date, category, shop or amount."
                  >
                    <h3 className="cs-card-title">2. The search box and its filters</h3>
                    <div className="cs-prose">
                      <p>
                        The hint text is &ldquo;Search text, date and amount&rdquo;. It expects you to know how
                        to phrase it and doesn&rsquo;t tell you what actually works.
                      </p>
                      <p>
                        The only real controls are three tabs: All, Outgoing, Incoming. There is no filter for
                        date range, category, shop, account or amount.
                      </p>
                    </div>
                  </Step>,
                  <Step
                    key="c3"
                    img={`${IMG}/seb-search-results.png`}
                    alt="SEB search results showing Anthropic categorised as Restaurant and Nordnet Bank as Mortgage and interest."
                    caption="Anthropic filed as &ldquo;Restaurant&rdquo;; Nordnet Bank as &ldquo;Mortgage and interest&rdquo;; two rows shown as phone numbers."
                  >
                    <h3 className="cs-card-title">3. The results</h3>
                    <div className="cs-prose">
                      <p>
                        The results are just a list, newest first, split up by month. The biggest, boldest text
                        on each row is the shop or person &mdash; but for Swish payments that&rsquo;s a phone
                        number.
                      </p>
                      <p>
                        The category, which is the useful part, is the smallest text. The account balance after
                        each payment is shown on every row, right next to the amount, so both are harder to read.
                      </p>
                    </div>
                  </Step>,
                ]}
              />
            </section>

            <section id="problems" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Where it falls short</h2>
              <div className="cs-decision-grid">
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">A. Almost no filters</h3>
                  <p className="cs-copy">
                    The only filter is In or Out. There&rsquo;s no way to pick a date range &mdash; not even
                    &ldquo;last 3 months&rdquo; &mdash; so finding an old payment means scrolling month by month.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">B. It doesn&rsquo;t match how people remember payments</h3>
                  <p className="cs-copy">
                    People think &ldquo;groceries&rdquo;, &ldquo;that restaurant&rdquo;, &ldquo;money I sent
                    Anna&rdquo;, or &ldquo;early last month&rdquo;. Search only helps if you already know the
                    exact words the bank used or the exact amount.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">C. The name shown isn&rsquo;t consistent</h3>
                  <p className="cs-copy">
                    Swish payments show up as phone numbers, in the biggest spot on the row. Card payments show
                    a proper shop name. So half the list is easy to read and half isn&rsquo;t.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">D. Misclassified categories, and the icon repeats the mistake</h3>
                  <p className="cs-copy">
                    Anthropic (a software subscription) is filed as &ldquo;Restaurant&rdquo;. Nordnet Bank (a
                    stockbroker) is filed as &ldquo;Mortgage and interest&rdquo;. The icon is picked from the
                    category, so a misclassified category shows a misleading icon too &mdash; and there&rsquo;s
                    no obvious way to fix it.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">E. The icons don&rsquo;t help much</h3>
                  <p className="cs-copy">
                    Nearly every row has the same purple circle. It sits in the spot that draws the eye first
                    but tells you very little &mdash; and it actively misleads you when the category is misclassified.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">F. The useful things are the smallest</h3>
                  <p className="cs-copy">
                    A reference number you don&rsquo;t care about is the biggest text; the category you do care
                    about is the smallest. There&rsquo;s no time of day, no payment method, and no daily totals.
                  </p>
                </article>
              </div>
            </section>

            <section id="klarna" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">A quick look at Klarna</h2>
              <div className="cs-prose">
                <p>
                  Klarna&rsquo;s purchases screen only covers card and invoice payments, but its filtering is
                  well done: Date, Store and Source filters that stay on screen, a date filter with quick
                  presets and a custom range, real shop logos, and totals for each day. I&rsquo;m using it as a
                  reference for the direction to go, not something to copy. It also has an assistant button, but
                  I can&rsquo;t tell what it does from a screenshot, so I&rsquo;m not assuming anything about it.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
                <Shot
                  src={`${IMG}/klarna-search-filters.png`}
                  alt="Klarna search view with persistent Date, Store and Source filter chips above the list."
                />
                <Shot
                  src={`${IMG}/klarna-date-filter.png`}
                  alt="Klarna date filter sheet with preset ranges and a custom From / To date range."
                />
                <Shot
                  src={`${IMG}/klarna-purchases-home.png`}
                  alt="Klarna purchases list grouped by day with daily totals and merchant logos."
                />
              </div>
              <p className="cs-caption mt-5" style={{ borderTop: 'none', paddingTop: 0 }}>
                Left to right: filters that stay on screen; a date filter with presets and a custom range; the
                list grouped by day with totals and real shop logos.
              </p>
            </section>

            <section id="principles" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">Rules I set for myself</h2>
              <div className="cs-decision-grid">
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">1. Use SEB&rsquo;s existing look</h3>
                  <p className="cs-copy">
                    Same fonts, colours, spacing and components. You shouldn&rsquo;t be able to tell my screen
                    from a real SEB screen at a glance.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">2. Add to it, don&rsquo;t rebuild it</h3>
                  <p className="cs-copy">
                    Every change is a control added to a screen that&rsquo;s already there. The app&rsquo;s
                    structure and the way you get to search stay the same.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">3. One set of filters</h3>
                  <p className="cs-copy">
                    Date, category, shop, amount, account. Everything uses the same filters, including the
                    search box you can ask a question.
                  </p>
                </article>
                <article className="cs-surface-card">
                  <h3 className="cs-card-title">4. The AI is a shortcut, not a mystery</h3>
                  <p className="cs-copy">
                    Your question turns into the normal filters, shown on screen, plus a short answer. You can
                    change any of them. If the question isn&rsquo;t clear, it just opens the normal filters.
                  </p>
                </article>
              </div>
            </section>

            <section id="proposal" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">The proposed flow, step by step</h2>

              <div className="cs-callout">
                <p className="cs-label">About these mockups</p>
                <p className="cs-copy">
                  These screens are my own mockups. They are not real SEB work and are not connected to or
                  approved by SEB. I drew them in SEB&rsquo;s current style to show how the changes could fit
                  the existing app. They don&rsquo;t say anything about how SEB&rsquo;s systems work or what
                  SEB plans to do. The transactions shown are made up.
                </p>
              </div>

              <div className="cs-prose">
                <p>
                  Open search and see the filters &rarr; pick a date range &rarr; read a shorter, clearer list
                  &rarr; ask a question in plain words &rarr; change any filter the AI chose.
                </p>
              </div>

              <Carousel
                label="The proposed flow"
                items={[
                  <Step
                    key="p1"
                    img={`${IMG}/concept-01-search-filters.svg`}
                    alt="Mockup of the SEB search screen with a new row of filter buttons (Date, Category, Amount, Account) and a quiet 'Ask about your transactions' row below the existing tabs."
                    w={390}
                    h={848}
                    caption="Mockup &mdash; not real SEB work."
                  >
                    <h3 className="cs-card-title">Step 1 &mdash; Search, with filters on screen</h3>
                    <dl className="cs-dl">
                      <div>
                        <dt className="cs-label">What&rsquo;s new</dt>
                        <dd className="cs-copy">
                          A row of filter buttons &mdash; Date, Category, Amount, Account &mdash; under the
                          existing tabs, using SEB&rsquo;s pill shape. Below that, a quiet &ldquo;Ask about your
                          transactions&rdquo; row opens the question search.
                        </dd>
                      </div>
                      <div>
                        <dt className="cs-label">Why</dt>
                        <dd className="cs-copy">
                          You can see straight away that you can filter. The question search is there if you
                          want it, but it doesn&rsquo;t get in the way.
                        </dd>
                      </div>
                    </dl>
                  </Step>,
                  <Step
                    key="p2"
                    img={`${IMG}/concept-02-date-range.svg`}
                    alt="Mockup of a SEB pop-up sheet titled 'Date' with quick options (Any time, This month, Last 3 / 12 months, by year), a custom From/To range, and Clear and Apply buttons."
                    w={390}
                    h={848}
                    mediaPos="center bottom"
                    caption="Mockup &mdash; not real SEB work."
                  >
                    <h3 className="cs-card-title">Step 2 &mdash; Pick a date range</h3>
                    <dl className="cs-dl">
                      <div>
                        <dt className="cs-label">What&rsquo;s new</dt>
                        <dd className="cs-copy">
                          The Date button opens a normal SEB pop-up sheet: quick options like this month, last 3
                          months, last 12 months and by year, plus a From / To for an exact range. Clear and
                          Apply at the bottom.
                        </dd>
                      </div>
                      <div>
                        <dt className="cs-label">Why</dt>
                        <dd className="cs-copy">
                          This is the biggest thing missing today. One tap covers most cases, the From / To
                          covers the rest, and you can always undo it.
                        </dd>
                      </div>
                    </dl>
                  </Step>,
                  <Step
                    key="p3"
                    img={`${IMG}/concept-03-results.svg`}
                    alt="Mockup of a filtered SEB list (Groceries, June to August), with four numbered markers: 1 the filters you picked stay pinned at the top, 2 a line shows the count and total, 3 the shop name and category are the clearest text on each row and the running balance is gone, 4 the amount is unchanged."
                    w={390}
                    h={720}
                    caption="Mockup &mdash; not real SEB work."
                  >
                    <h3 className="cs-card-title">Step 3 &mdash; A shorter, clearer list</h3>
                    <ul className="cs-list cs-list-compact">
                      <li>
                        <strong>1 &mdash;</strong> The filters you picked stay pinned at the top. Tap one to
                        change it, tap &times; to clear it.
                      </li>
                      <li>
                        <strong>2 &mdash;</strong> A line at the top shows how many payments there are and the
                        total &mdash; the answer to &ldquo;how much&rdquo;.
                      </li>
                      <li>
                        <strong>3 &mdash;</strong> The shop name and category are the clearest text on each row.
                        The running balance is no longer shown in search results.
                      </li>
                      <li>
                        <strong>4 &mdash;</strong> The amount is the same size, weight and position as it is
                        today.
                      </li>
                    </ul>
                    <p className="cs-copy">
                      <strong>Why:</strong> you can skim the list by what you actually care about, and
                      &ldquo;how much did I spend&rdquo; is answered without adding anything up.
                    </p>
                  </Step>,
                  <Step
                    key="p4"
                    img={`${IMG}/concept-04-ai-search.svg`}
                    alt="Mockup of natural-language search in SEB: the user asks 'how much did I spend on groceries in august', a one-line answer summarises the total and count, and two editable filter buttons show what was applied, above the matching payments."
                    w={390}
                    h={848}
                    caption="Mockup &mdash; not real SEB work."
                  >
                    <h3 className="cs-card-title">Step 4 &mdash; Ask a question in plain words</h3>
                    <dl className="cs-dl">
                      <div>
                        <dt className="cs-label">What&rsquo;s new</dt>
                        <dd className="cs-copy">
                          You type something like &ldquo;how much did I spend on groceries in August&rdquo;. You
                          get a one-line answer, the filters it used (Category: Groceries, and the August dates)
                          shown as normal buttons you can tap, and the matching payments below.
                        </dd>
                      </div>
                      <div>
                        <dt className="cs-label">Why</dt>
                        <dd className="cs-copy">
                          You can ask the question you actually have. Showing the filters means you can check
                          the answer is right and fix it if it isn&rsquo;t.
                        </dd>
                      </div>
                    </dl>
                  </Step>,
                  <Step
                    key="p5"
                    img={`${IMG}/concept-05-edit-filter.svg`}
                    alt="Mockup of tapping the 'Category: Groceries' button from the answer: it opens a standard SEB category sheet with Groceries ticked, plus Clear and Apply buttons."
                    w={390}
                    h={848}
                    mediaPos="center bottom"
                    caption="Mockup &mdash; not real SEB work."
                  >
                    <h3 className="cs-card-title">Step 5 &mdash; Change a filter the AI picked</h3>
                    <dl className="cs-dl">
                      <div>
                        <dt className="cs-label">What&rsquo;s new</dt>
                        <dd className="cs-copy">
                          Tapping one of the filter buttons from the answer &mdash; here, Category &mdash; opens
                          the same pop-up you&rsquo;d use if you set the filter yourself. Nothing about the
                          AI&rsquo;s answer is locked.
                        </dd>
                      </div>
                      <div>
                        <dt className="cs-label">Why</dt>
                        <dd className="cs-copy">
                          People trust the answer more when they can see how it was worked out and change it.
                        </dd>
                      </div>
                    </dl>
                  </Step>,
                ]}
              />
            </section>

            <section id="rows" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">The transaction row: before and after</h2>
              <Fig
                src={`${IMG}/concept-row-anatomy.svg`}
                alt="The transaction row, before and after. Today: a reference number is the biggest text even when it's just a code, the category is the smallest text, the account balance is shown on every row, and the icon comes from a category that can be inaccurate. Concept: the shop name and category are the clearest things and stay the same size as today, the category can be changed in one tap, the account balance is not shown in search results, and a plain icon is used when the category isn't certain."
                w={800}
                h={760}
                className="mb-7"
                caption="Mockup &mdash; not real SEB work."
              />
              <ul className="cs-list cs-list-compact">
                <li>
                  <strong>Same size.</strong> The row height, the icon, the date and the amount on the right all
                  stay where they are.
                </li>
                <li>
                  <strong>Reordered.</strong> A proper shop name and a useful category become the clearest
                  things on the row. The account balance is no longer shown in search results.
                </li>
                <li>
                  <strong>Fixable.</strong> You can change a category in one tap from the payment&rsquo;s detail
                  screen. When the category isn&rsquo;t certain, the row shows a plain grey icon instead of a
                  confident but inaccurate one.
                </li>
              </ul>
            </section>

            <section id="validate" className="cs-section cs-section-divider">
              <h2 className="cs-section-title">How I&rsquo;d test this</h2>
              <div className="cs-ownership-grid">
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">Research</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>Ask people to write down the questions they have when they look at their transactions.</li>
                    <li>Ask people to find specific payments in the current app, and time how long it takes.</li>
                    <li>With permission, check a set of real transactions to see how often the category is misclassified.</li>
                  </ul>
                </div>
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">Testing the mockups</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>Show the screens without SEB&rsquo;s name and ask people whose app they think it is.</li>
                    <li>Compare asking a question vs. tapping filters &mdash; which is faster, and which do people trust more?</li>
                    <li>Does showing the filters behind an AI answer make people trust the answer more?</li>
                  </ul>
                </div>
                <div className="cs-surface-card">
                  <h3 className="cs-card-title">Numbers to watch</h3>
                  <ul className="cs-list cs-list-compact">
                    <li>How often people find what they&rsquo;re looking for, and how long it takes.</li>
                    <li>How often a search ends with someone scrolling and giving up.</li>
                    <li>How often people fix a category, and how often the same mistake comes back.</li>
                    <li>How many people contact support asking what a transaction is.</li>
                    <li>How many people use the question search, and how often they change the filters it picks.</li>
                  </ul>
                </div>
              </div>

              <p className="cs-note">
                I did this because I want to work on fintech products. It shows I can take a real app, work out
                what&rsquo;s actually holding it back, and suggest a fix that fits the product &mdash; keeping in
                mind that banks have to deal with trust, regulation and information they don&rsquo;t always have.
              </p>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
}
