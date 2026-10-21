'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { STACK_STEPS, type StackStep } from '@/lib/techStack'

// The line head sits on this line of the viewport while scrolling.
const HEAD_LINE = 'start 60%'
const TAIL_LINE = 'end 60%'
// A card clears from dark and blurred while its top edge travels up from near the bottom of the viewport.
const CARD_ENTER = ['start 96%', 'start 50%'] as const
// It stays face-down until it is nearing the middle of the viewport, then flips as it climbs:
// the flip starts when the card's centre is 74% down the screen and finishes at 52%.
const CARD_FLIP = ['center 74%', 'center 52%'] as const
const STREAM_START_MS = 140
const STREAM_MAX_MS = 300

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}

/** Perplexity-style answer stream: the words resolve from blur, one after another. */
function StreamText({ text, play }: { text: string; play: boolean }) {
  const words = text.split(' ')
  const step = Math.min(12, STREAM_MAX_MS / words.length)
  return (
    <p className="ts-how" data-play={play}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="ts-word" style={{ transitionDelay: `${STREAM_START_MS + i * step}ms` }}>
            {word}
          </span>{' '}
        </span>
      ))}
    </p>
  )
}

interface RowProps {
  step: StackStep
  index: number
  /** The line has reached this card's circle. */
  reached: boolean
  current: boolean
  reduce: boolean
  nodeRef: (el: HTMLSpanElement | null) => void
}

function StackRow({ step, index, reached, current, reduce, nodeRef }: RowProps) {
  const side = index % 2 === 0 ? 'left' : 'right'
  const cardRef = useRef<HTMLDivElement>(null)

  // scroll-driven entrance: dark + blurred, then clear; the flip follows later, near the middle of the screen
  const { scrollYProgress } = useScroll({ target: cardRef, offset: [...CARD_ENTER] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })
  const clear = useTransform(p, [0, 0.5], [0, 1], { clamp: true })
  const filter = useTransform(clear, (c) => {
    if (c >= 1) return 'none'
    return `blur(${((1 - c) * 16).toFixed(2)}px) brightness(${(0.12 + c * 0.88).toFixed(3)})`
  })
  const { scrollYProgress: flipRaw } = useScroll({ target: cardRef, offset: [...CARD_FLIP] })
  const flip = useSpring(flipRaw, { stiffness: 140, damping: 26, mass: 0.4 })
  const rotateY = useTransform(flip, [0, 1], [180, 0], { clamp: true })

  const [flipped, setFlipped] = useState(false)
  const [played, setPlayed] = useState(false)
  useMotionValueEvent(flip, 'change', (v) => setFlipped(v > 0.82))
  useEffect(() => {
    if (flipped) setPlayed(true)
  }, [flipped])

  const on = reduce || flipped
  const faceStyle = reduce ? undefined : { filter }

  return (
    <div className="ts-row" data-side={side}>
      <span ref={nodeRef} className="ts-node" data-on={reached} aria-hidden />

      <div ref={cardRef} className="ts-card" data-current={current && on}>
        <motion.div className="ts-flip" style={reduce ? undefined : { rotateY }}>
          <motion.article className="ts-face ts-front" style={faceStyle} aria-label={`${step.verb} with ${step.title}`}>
            <header className="ts-head">
              <span className="ts-logo">
                <Image src={step.tool.src} alt="" width={48} height={48} />
              </span>
              <div className="ts-head-text">
                <p className="ts-tool">{step.title}</p>
                <h4 className="ts-verb" data-on={on}>
                  {step.verb}
                </h4>
              </div>
            </header>

            <div>
              <p className="ts-label">How I use it</p>
              <StreamText text={step.how} play={reduce || played} />
            </div>
          </motion.article>

          <motion.div className="ts-face ts-back" style={faceStyle} aria-hidden>
            <span className="ts-back-logo">
              <Image src={step.tool.src} alt="" width={96} height={96} />
            </span>
            <span className="ts-back-title">{step.title}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function TechStackTimeline() {
  const reduce = usePrefersReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const nodeEls = useRef<(HTMLSpanElement | null)[]>([])
  const [nodeYs, setNodeYs] = useState<number[]>([])
  const [reachedCount, setReachedCount] = useState(0)

  const trackH = useMotionValue(1)
  const spineLen = useMotionValue(1)

  const { scrollYProgress } = useScroll({ target: trackRef, offset: [HEAD_LINE, TAIL_LINE] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  const headY: MotionValue<number> = useTransform([smooth, trackH, spineLen], (v: number[]) =>
    Math.max(0, Math.min(v[0] * v[1], v[2]))
  )

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const top = track.getBoundingClientRect().top
      const ys: number[] = []
      for (const el of nodeEls.current) {
        if (!el) return
        const r = el.getBoundingClientRect()
        ys.push(Math.round(r.top - top + r.height / 2))
      }
      setNodeYs((prev) => (prev.join() === ys.join() ? prev : ys))
      trackH.set(track.offsetHeight)
      spineLen.set(ys[ys.length - 1] ?? 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [trackH, spineLen])

  const update = useCallback(
    (y: number) => {
      let n = 0
      for (const ny of nodeYs) if (y >= ny) n++
      setReachedCount(n)
    },
    [nodeYs]
  )
  useMotionValueEvent(headY, 'change', update)
  useEffect(() => update(headY.get()), [update, headY])

  const count = reduce ? STACK_STEPS.length : reachedCount

  return (
    <div className="ts-root" data-reduce={reduce}>
      <div ref={trackRef} className="ts-track">
        <div className="ts-blobs" aria-hidden>
          <span className="ts-blob ts-blob-a" />
          <span className="ts-blob ts-blob-b" />
          <span className="ts-blob ts-blob-c" />
        </div>

        {STACK_STEPS.map((step, i) => (
          <StackRow
            key={step.id}
            step={step}
            index={i}
            reached={i < count}
            current={i === count - 1}
            reduce={reduce}
            nodeRef={(el) => {
              nodeEls.current[i] = el
            }}
          />
        ))}
      </div>
    </div>
  )
}
