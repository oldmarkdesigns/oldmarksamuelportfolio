'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState, useEffect, useLayoutEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { scrollToElement } from '@/lib/smoothScroll'
import ContactOverlay from './ContactOverlay'

const CIRCLE = 48
const BAR_H = 50
// springs for opening, closing and the return to the top: lively, with a clear overshoot
const X_SPRING = { type: 'spring', stiffness: 190, damping: 15, mass: 0.9 } as const
const SIZE_SPRING = { type: 'spring', stiffness: 300, damping: 15, mass: 0.8 } as const
// the last step of the collapse, once the bar has swallowed the portrait: very elastic
const SETTLE_SPRING = { type: 'spring', stiffness: 320, damping: 10, mass: 0.9 } as const
const EASE_SLOW = [0.45, 0, 0.25, 1] as const
const EASE_DASH = [0.12, 0.9, 0.18, 1] as const // fast start, long deceleration

interface Tween {
  duration: number
  ease: readonly [number, number, number, number]
}

/** Animates a motion value and resolves when it finishes. */
const wait = (mv: MotionValue<number>, to: number, tween: Tween) =>
  new Promise<void>((resolve) => {
    animate(mv, to, { duration: tween.duration, ease: [...tween.ease], onComplete: () => resolve() })
  })

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const pillRef = useRef<HTMLDivElement>(null)

  // scrolled away from the very top: the bar contracts into a circle in the top-left corner,
  // and the portrait becomes that circle
  const { scrollY } = useScroll()
  const [compact, setCompact] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setCompact((prev) => (prev ? y > 8 : y > 24)))
  useEffect(() => setCompact(window.scrollY > 24), [])

  const [open, setOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const closeContact = useCallback(() => setContactOpen(false), [])
  // true once the collapse has finished: only then does the portrait appear
  const [landed, setLanded] = useState(false)
  const [vw, setVw] = useState(1024)
  const [coarse, setCoarse] = useState(false)
  const [contentW, setContentW] = useState(190)
  const [measured, setMeasured] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const desktop = vw >= 768

  useLayoutEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    setCoarse(window.matchMedia('(hover: none)').matches)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // natural width of the row of links, so the bar can hug them
  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => {
      setContentW(el.offsetWidth)
      setMeasured(true)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [pathname])

  // on touch screens the bar opens with a tap and closes with a tap elsewhere
  useEffect(() => {
    if (!coarse || !open) return
    const onDown = (e: PointerEvent) => {
      if (!pillRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [coarse, open])

  useEffect(() => {
    if (pathname !== '/') return
    const hash = window.location.hash
    if (!hash) return

    const raf = window.requestAnimationFrame(() => scrollToElement(hash))
    return () => window.cancelAnimationFrame(raf)
  }, [pathname])

  const navItems = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About me' },
    { href: '#contact', label: 'Contact' },
  ]
  // same fill, edge and blur as the tech stack cards
  const glassBlur = 'blur(18px) saturate(150%)'
  const glassSurfaceColor = theme === 'dark' ? 'rgba(31, 41, 55, 0.2)' : 'rgba(255, 255, 255, 0.95)'

  const navigateToSection = (href: string) => {
    if (coarse) setOpen(false)
    // Contact opens the contact overlay on every page instead of scrolling to the footer
    if (href === '#contact') {
      setContactOpen(true)
      return
    }
    if (pathname === '/') {
      scrollToElement(href)
      return
    }

    router.push(`/${href}`)
  }

  const goHome = () => {
    if (pathname === '/') scrollToElement('#home')
    else router.push('/')
  }

  // links show at the top of the page on wide screens, and whenever the circle is open
  const expanded = open || (!compact && desktop)
  const width = !expanded ? CIRCLE : compact ? contentW + 88 : contentW + 64
  const height = compact || !desktop ? CIRCLE : BAR_H
  const margin = desktop ? 30 : 14
  // on mobile the menu sits in the top-left corner; on wide screens it starts centred
  const x = compact || !desktop ? margin : (vw - width) / 2
  const y = 12 + (BAR_H - height) / 2
  const showIcon = !compact && !desktop && !expanded

  // position and size are motion values so the collapse can be choreographed in steps
  const mx = useMotionValue(x)
  const my = useMotionValue(y)
  const mw = useMotionValue(width)
  const mh = useMotionValue(height)
  // The portrait is never bigger than the bar's inner circle, so it cannot be cropped whatever the spring
  // is doing. At the end of the collapse it springs back up to the full circle: `pop` runs 0.8 to 1.
  const pop = useMotionValue(1)
  const avatarSize = useTransform([mh, pop], (v: number[]) => Math.max(v[0] - 2, 0) * Math.min(1, v[1]))
  const avatarOffset = useTransform([mh, avatarSize], (v: number[]) => (Math.max(v[0] - 2, 0) - v[1]) / 2)
  const runId = useRef(0)
  const initialised = useRef(false)
  const prevCompact = useRef(compact)

  useEffect(() => {
    const token = ++runId.current
    const alive = () => runId.current === token
    pop.set(1)
    if (!compact) setLanded(false)
    const snap = () => {
      mx.set(x)
      my.set(y)
      mw.set(width)
      mh.set(height)
    }
    if (!measured || !initialised.current || reduce) {
      snap()
      if (compact) setLanded(true)
      initialised.current = measured
      prevCompact.current = compact
      return
    }
    const justCollapsed = compact && !prevCompact.current
    prevCompact.current = compact

    if (!justCollapsed || !desktop) {
      // opening, closing and the return to the top: springs (mobile is already in the corner, so it
      // skips the choreographed collapse too)
      if (compact) setLanded(true)
      const controls = [
        animate(mx, x, X_SPRING),
        animate(my, y, X_SPRING),
        animate(mw, width, SIZE_SPRING),
        animate(mh, height, SIZE_SPRING),
      ]
      return () => controls.forEach((c) => c.stop())
    }

    // The collapse, in three steps. The bar stays plain until it has landed.
    setLanded(false)
    const all = (...ps: Promise<void>[]) => Promise.all(ps)
    ;(async () => {
      // 1. slowly shrink and change shape, still in the middle of the screen
      const midW = 124
      const midH = 40
      const slow = { duration: 0.46, ease: EASE_SLOW }
      await all(
        wait(mx, (vw - midW) / 2, slow),
        wait(my, 12 + (BAR_H - midH) / 2, slow),
        wait(mw, midW, slow),
        wait(mh, midH, slow)
      )
      if (!alive()) return
      // 2. shoot to the left and slow down as it reaches the portrait, rounding off on the way
      const reach = 58
      const dash = { duration: 0.5, ease: EASE_DASH }
      await all(
        wait(mx, margin - (reach - CIRCLE) / 2, dash),
        wait(my, 12 + (BAR_H - reach) / 2, dash),
        wait(mw, reach, dash),
        wait(mh, reach, dash)
      )
      if (!alive()) return
      // 3. it now covers the portrait; settle into the collapsed circle with a springy wobble,
      //    and the portrait springs into it
      setLanded(true)
      pop.set(0.8)
      animate(pop, 1, SETTLE_SPRING)
      animate(mx, margin, SETTLE_SPRING)
      animate(my, 12 + (BAR_H - CIRCLE) / 2, SETTLE_SPRING)
      animate(mw, CIRCLE, SETTLE_SPRING)
      animate(mh, CIRCLE, SETTLE_SPRING)
    })()
    return () => {
      runId.current++
    }
  }, [x, y, width, height, compact, measured, reduce, vw, desktop, margin, mx, my, mw, mh, pop])

  // the hero's own portrait steps aside once the bar has landed, and comes back on the way up
  useEffect(() => {
    const root = document.documentElement
    if (compact && landed) root.dataset.navCompact = 'true'
    else delete root.dataset.navCompact
  }, [compact, landed])

  return (
    <>
    <nav className="site-nav pointer-events-none fixed inset-x-0 top-0 z-[9999]" aria-label="Main">
      <motion.div
        ref={pillRef}
        className={`site-nav-pill pointer-events-auto absolute left-0 top-0 overflow-hidden border rounded-full ${
          theme === 'dark' ? 'border-[rgba(55,65,81,0.3)]' : 'border-[#d1d5db]'
        }`}
        style={{ x: mx, y: my, width: mw, height: mh }}
        onHoverStart={() => !coarse && setOpen(true)}
        onHoverEnd={() => !coarse && setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
        }}
      >
        <div
          className="site-nav-glass pointer-events-none absolute inset-0"
          style={{
            backgroundColor: glassSurfaceColor,
            backdropFilter: glassBlur,
            WebkitBackdropFilter: glassBlur,
          }}
          aria-hidden
        />

        {/* the links, shown while the bar is open */}
        <motion.div
          className="absolute left-0 top-0 flex h-full items-center whitespace-nowrap"
          initial={false}
          animate={{ opacity: expanded ? 1 : 0, paddingLeft: compact ? 56 : 32 }}
          transition={{ duration: reduce ? 0 : 0.18, delay: expanded && !reduce ? 0.12 : 0 }}
          style={{ paddingRight: 32, pointerEvents: expanded ? 'auto' : 'none' }}
        >
          <div ref={contentRef} className="flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={expanded ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault()
                  navigateToSection(item.href)
                }}
                className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  pathname === item.href || (typeof window !== 'undefined' && window.location.hash === item.href)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            {/* On the home page the light / dark switch lives in the hero; other pages keep it here */}
            {pathname !== '/' && (
              <button
                onClick={toggleTheme}
                tabIndex={expanded ? 0 : -1}
                className="-ml-2 p-1.5 text-gray-300 hover:text-white transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </motion.div>

        {/* the portrait: it becomes the collapsed circle, and is a home button */}
        <motion.button
          type="button"
          className="nav-avatar absolute left-0 top-0"
          aria-label="Home, back to the top"
          tabIndex={compact && landed ? 0 : -1}
          onClick={() => {
            if (coarse && !expanded) setOpen(true)
            else goHome()
          }}
          initial={false}
          animate={{ opacity: compact && landed ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : compact ? 0.12 : 0.1 }}
          style={{
            width: avatarSize,
            height: avatarSize,
            x: avatarOffset,
            y: avatarOffset,
            pointerEvents: compact && landed ? 'auto' : 'none',
          }}
        />

        {/* mobile, at the top of the page: a two-line menu icon that opens the links */}
        <motion.button
          type="button"
          className="absolute left-0 top-0 grid h-full w-12 place-items-center text-gray-300 hover:text-white"
          aria-label="Open menu"
          aria-expanded={expanded}
          tabIndex={showIcon ? 0 : -1}
          onClick={() => setOpen(true)}
          initial={false}
          animate={{ opacity: showIcon ? 1 : 0, scale: showIcon ? 1 : 0.6 }}
          transition={{ duration: reduce ? 0 : 0.16 }}
          style={{ pointerEvents: showIcon ? 'auto' : 'none' }}
        >
          <span className="relative block h-3 w-4" aria-hidden>
            <span className="absolute left-0 top-[1px] block h-[2px] w-4 rounded-full bg-current" />
            <span className="absolute left-0 top-[9px] block h-[2px] w-4 rounded-full bg-current" />
          </span>
        </motion.button>
      </motion.div>
    </nav>
    <ContactOverlay open={contactOpen} onClose={closeContact} />
    </>
  )
}
