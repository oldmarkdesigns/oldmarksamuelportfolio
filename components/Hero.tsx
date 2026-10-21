'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, DownloadSimple, EnvelopeSimple, LinkedinLogo, Moon, Sun, type Icon } from '@phosphor-icons/react'
import { useTheme } from '@/contexts/ThemeContext'
import { scrollToElement } from '@/lib/smoothScroll'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const SWITCH_SPRING = { type: 'spring', stiffness: 78, damping: 15, mass: 1 } as const
const HOVER_SPRING = { type: 'spring', stiffness: 150, damping: 18, mass: 1 } as const

/** Light / Dark switch: two round icon slots in a capsule on the left edge. A quiet circle slides
    between them on a spring (it stretches a little while it travels), the sun turns slowly while it
    is lit, and the moon rocks gently. */
function ThemeSwitch() {
  const reduce = useReducedMotion()
  const { theme, toggleTheme } = useTheme()
  const choose = (next: 'light' | 'dark') => {
    if (theme !== next) toggleTheme()
  }
  const options = [
    { id: 'light' as const, label: 'Light mode', Icon: Sun },
    { id: 'dark' as const, label: 'Dark mode', Icon: Moon },
  ]
  return (
    <motion.div
      className="hero-switch"
      role="group"
      aria-label="Color theme"
      whileHover={reduce ? undefined : { scale: 1.04 }}
      transition={HOVER_SPRING}
    >
      {options.map(({ id, label, Icon }) => {
        const active = theme === id
        return (
          <motion.button
            key={id}
            type="button"
            className="hero-switch-btn"
            aria-pressed={active}
            aria-label={label}
            onClick={() => choose(id)}
            whileTap={reduce ? undefined : { scale: 0.94 }}
            whileHover={reduce || active ? undefined : { rotate: id === 'light' ? 10 : -10 }}
            transition={HOVER_SPRING}
          >
            {active && (
              <motion.span
                layoutId="hero-switch-thumb"
                className="hero-switch-thumb"
                transition={reduce ? { duration: 0 } : SWITCH_SPRING}
              >
                {/* the drop stretches as it travels, then squashes as it lands */}
                <motion.span
                  className="hero-switch-drop"
                  initial={reduce ? false : { scaleY: 1.1, scaleX: 0.94 }}
                  animate={{ scaleY: 1, scaleX: 1 }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 14, mass: 1 }}
                />
              </motion.span>
            )}
            <motion.span
              className="hero-switch-icon"
              data-active={active}
              initial={false}
              animate={
                reduce
                  ? undefined
                  : id === 'light'
                    ? active
                      ? { rotate: 360, scale: 1 }
                      : { rotate: 0, scale: 0.9 }
                    : active
                      ? { rotate: [0, -5, 3, 0], scale: 1 }
                      : { rotate: 0, scale: 0.9 }
              }
              transition={
                reduce
                  ? undefined
                  : id === 'light' && active
                    ? { rotate: { duration: 22, repeat: Infinity, ease: 'linear' }, scale: SWITCH_SPRING }
                    : { ...SWITCH_SPRING, rotate: id === 'dark' && active ? { duration: 1.3, ease: 'easeInOut', delay: 0.15 } : SWITCH_SPRING }
              }
            >
              <Icon size={18} weight="fill" aria-hidden />
            </motion.span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

/** Round portrait in the top-left corner. As the page scrolls it hands over to the navbar's collapsed circle. */
function Avatar() {
  return <span className="hero-avatar" role="img" aria-label="Portrait of Samuel Oldmark" />
}

const PILL = 48
const PILL_SPRING = { type: 'spring', stiffness: 380, damping: 26, mass: 0.8 } as const

interface PillButtonProps {
  label: string
  Icon: Icon
  fx: 'download' | 'linkedin' | 'mail'
  /** Which edge the button stays anchored to while it opens. */
  anchor: 'left' | 'right'
  primary?: boolean
  href: string
  download?: string
  external?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

/** A round icon button. On hover or focus it springs open to show its label. */
function PillButton({ label, Icon, fx, anchor, primary, href, download, external, onClick }: PillButtonProps) {
  const reduce = useReducedMotion()
  const labelRef = useRef<HTMLSpanElement>(null)
  const [labelW, setLabelW] = useState(0)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    setLabelW(labelRef.current?.scrollWidth ?? 0)
  }, [label])

  return (
    <motion.a
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      aria-label={label}
      className={`hero-pill hero-pill-${anchor}${primary ? ' hero-pill-primary' : ''}`}
      data-open={open}
      data-fx={fx}
      initial={false}
      animate={{ width: open ? PILL + labelW : PILL }}
      transition={reduce ? { duration: 0 } : PILL_SPRING}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span className="hero-pill-icon">
        <Icon size={18} weight={fx === 'linkedin' ? 'fill' : 'bold'} aria-hidden />
      </span>
      <span ref={labelRef} className="hero-pill-label" aria-hidden>
        {label}
      </span>
    </motion.a>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // the two headline lines drift apart and fade as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const line1X = useTransform(scrollYProgress, (v) => v * -70)
  const line2X = useTransform(scrollYProgress, (v) => v * 70)
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="hero-root relative min-h-[100dvh] flex flex-col overflow-hidden px-14 md:px-20 lg:px-24 pt-24 pb-8 md:pb-10"
    >
      <div className="hero-glows" aria-hidden>
        <span className="hero-glow hero-glow-a" />
      </div>

      {/* top-left corner */}
      <div className="hero-corner hero-corner-left hero-reveal" style={{ '--d': '400ms' } as React.CSSProperties}>
        <Avatar />
      </div>

      {/* top-right corner */}
      <div className="hero-corner hero-corner-right hero-reveal" style={{ '--d': '400ms' } as React.CSSProperties}>
        <PillButton
          label="Download resume"
          Icon={DownloadSimple}
          fx="download"
          anchor="right"
          href="/Portfolio%20Assets/Resumes/Samuel-Oldmark-Product-Designer-CV.pdf"
          download="Samuel-Oldmark-Product-Designer-CV.pdf"
        />
        <PillButton
          label="LinkedIn"
          Icon={LinkedinLogo}
          fx="linkedin"
          anchor="right"
          href="https://www.linkedin.com/in/samuel-oldmark-31055a1a8/"
          external
        />
        <PillButton
          label="Let's connect"
          Icon={EnvelopeSimple}
          fx="mail"
          anchor="right"
          primary
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToElement('#contact')
          }}
        />
      </div>

      {/* left edge: light / dark */}
      <div className="hero-edge hero-edge-left hero-reveal" style={{ '--d': '500ms' } as React.CSSProperties}>
        <ThemeSwitch />
      </div>

      {/* right edge: location */}
      <div className="hero-edge hero-edge-right hero-reveal" style={{ '--d': '500ms' } as React.CSSProperties}>
        <span className="hero-vertical hero-meta">
          <span className="flag-se" aria-hidden />
          <span>Stockholm, Sweden</span>
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        {/* status and headline, centred */}
        <motion.div
          className="flex flex-1 flex-col items-center justify-center text-center"
          style={reduce ? undefined : { opacity: fade }}
        >
          <div
            className="hero-reveal hero-status mb-6 inline-flex items-center gap-2 text-sm"
            style={{ '--d': '100ms' } as React.CSSProperties}
          >
            <span className="hero-dot" aria-hidden />
            Available for work
          </div>
          <h1 aria-label="Product Designer & Builder" className={`hero-title ${inter.className}`}>
            <div className="hero-reveal" style={{ '--d': '180ms' } as React.CSSProperties} aria-hidden>
              <motion.div style={reduce ? undefined : { x: line1X }}>Product Designer</motion.div>
            </div>
            <div className="hero-reveal hero-title-soft" style={{ '--d': '320ms' } as React.CSSProperties} aria-hidden>
              <motion.div className="hero-gradient" style={reduce ? undefined : { x: line2X }}>
                &amp; Builder
              </motion.div>
            </div>
          </h1>
        </motion.div>

        {/* bottom row: the intro */}
        <div
          className="hero-reveal flex items-end justify-between gap-8"
          style={{ '--d': '520ms' } as React.CSSProperties}
        >
          <div className="min-w-0 max-w-[26rem]">
            <p className="hero-intro">
              I&apos;m Samuel Oldmark, a Stockholm-based product designer who combines <strong>UX/UI craft</strong> with{' '}
              <strong>frontend fluency</strong> to turn complex ideas into <strong>shipped web and mobile products</strong>{' '}
              people trust.
            </p>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                scrollToElement('#about')
              }}
              className="hero-more"
            >
              Know more
              <ArrowRight className="hero-more-arrow" size={16} weight="regular" aria-hidden />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
