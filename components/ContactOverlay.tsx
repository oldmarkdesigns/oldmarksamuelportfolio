'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, LinkedinLogo, X } from '@phosphor-icons/react'
import { startSmoothScroll, stopSmoothScroll } from '@/lib/smoothScroll'

const EMAIL = 'samuel@oldmark.se'
const LINKEDIN = 'https://www.linkedin.com/in/samuel-oldmark-31055a1a8/'
const CARD_SPRING = { type: 'spring', stiffness: 320, damping: 28, mass: 0.9 } as const

interface ContactOverlayProps {
  open: boolean
  onClose: () => void
}

/** Contact card that opens over the page: email with a copy button, and a link to LinkedIn. */
export default function ContactOverlay({ open, onClose }: ContactOverlayProps) {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    // hand focus back to whatever opened the overlay once it closes
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stopSmoothScroll()
    window.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      startSmoothScroll()
      window.removeEventListener('keydown', onKeyDown)
      opener?.focus()
    }
  }, [open, onClose])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-overlay-title"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          <motion.div
            className="contact-card"
            onClick={(event) => event.stopPropagation()}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={reduce ? { duration: 0 } : CARD_SPRING}
          >
            <button ref={closeRef} type="button" className="contact-close" onClick={onClose} aria-label="Close">
              <X size={18} weight="bold" aria-hidden />
            </button>

            <h2 id="contact-overlay-title" className="contact-title font-serif">
              Let&apos;s connect
            </h2>
            <p className="contact-lead">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <p className="contact-label">Email me at</p>
            <div className="contact-row">
              <a href={`mailto:${EMAIL}`} className="contact-email">
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copyToClipboard}
                className="contact-copy"
                aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
              >
                {copied ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>

            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="contact-linkedin">
              <LinkedinLogo size={18} weight="fill" aria-hidden />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={16} weight="bold" className="contact-linkedin-arrow" aria-hidden />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
