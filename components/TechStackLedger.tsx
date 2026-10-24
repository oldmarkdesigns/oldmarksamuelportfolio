'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { STACK_STEPS } from '@/lib/techStack'
import './TechStackLedger.css'

const pad = (n: number) => String(n).padStart(2, '0')

/** My tech stack as a ledger with a lens: numbered rows on the right, read top to bottom, and a
    framed lens on the left that stays put and shows the tool in focus. The row crossing the middle
    of the screen is the one in focus; it lights up and the others dim. */
export default function TechStackLedger() {
  const [active, setActive] = useState(0)
  const rowEls = useRef<(HTMLLIElement | null)[]>([])

  // the row in focus is the last one whose top has passed the middle of the screen (the first until
  // any has). Measured on every scroll rather than watched with an observer, so a fast flick that
  // carries a row clean past the middle in one frame still lands on the right one. The rows keep
  // their height whether or not they're in focus, so lighting one up never moves the others
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const middle = window.innerHeight / 2
      let next = 0
      rowEls.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= middle) next = i
      })
      setActive(next)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  const step = STACK_STEPS[active]

  return (
    <div className="tsx">
      <div className="tsx-side">
        <div className="tsx-sticky">
          <h3 className="tsx-label">My tech stack</h3>
          <p className="tsx-intro">These are the tools I use most often, though my stack varies by project.</p>

          <p className="tsx-count" aria-hidden="true">
            <b>{pad(active + 1)}</b> / {pad(STACK_STEPS.length)}
          </p>
          <div className="tsx-lens" aria-hidden="true">
            <span className="tsx-glow" />
            {STACK_STEPS.map((s, i) => (
              <span key={s.id} className="tsx-lens-tile" data-on={i === active}>
                <Image src={s.tool.src} alt="" width={64} height={64} />
              </span>
            ))}
            <span className="tsx-plus" style={{ left: 0, top: 0 }} />
            <span className="tsx-plus" style={{ left: '100%', top: 0 }} />
            <span className="tsx-plus" style={{ left: 0, top: '100%' }} />
            <span className="tsx-plus" style={{ left: '100%', top: '100%' }} />
          </div>
          <p className="tsx-caption" aria-hidden="true">
            <span>{step.title}</span>
          </p>
        </div>
      </div>

      <ol className="tsx-list">
        {STACK_STEPS.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => {
              rowEls.current[i] = el
            }}
            className="tsx-row"
            data-on={i === active}
          >
            <span className="tsx-n" aria-hidden="true">
              {pad(i + 1)}
            </span>
            <div className="tsx-body">
              <div className="tsx-top">
                {/* phones have no lens, so each row carries its own logo */}
                <span className="tsx-row-tile" aria-hidden="true">
                  <Image src={s.tool.src} alt="" width={28} height={28} />
                </span>
                <h4 className="tsx-verb">{s.verb}</h4>
                <span className="tsx-tool">{s.title}</span>
              </div>
              <p className="tsx-how">
                <span className="tsx-how-label">How I use it</span>
                {s.how}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
