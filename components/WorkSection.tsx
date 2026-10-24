'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {
  AnimatePresence,
  motion,
  stagger,
  useAnimate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type AnimationPlaybackControls,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { scrollToPosition } from '@/lib/smoothScroll'
import './WorkSection.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const allWork = [
  {
    id: 'office-rental-platform',
    headline: ['Office rental', 'platform'],
    title: 'Office rental platform',
    description: 'Building a self-serve marketplace for renting commercial space in Stockholm — owning the business case, product design, React frontend and Convex backend.',
    year: '2026',
    tags: ['Product Strategy', 'UX/UI', 'Full-Stack Build', 'Marketplace'],
    projectTag: 'Personal side project',
    coverImage: '/Portfolio Assets/Work/LOA/loa-card.jpg',
    href: '/work/office-rental-platform',
  },
  {
    id: 'seb',
    headline: ['SEB', 'transaction search'],
    title: 'SEB',
    description: 'A self-directed fintech UX analysis of transaction search and filtering in SEB’s mobile banking app, benchmarked against Klarna.',
    year: '2026',
    tags: ['Fintech', 'UX Analysis', 'Product Design', 'Mobile App'],
    projectTag: 'Case study',
    coverImage: '/Portfolio Assets/Work/SEB_Case_Study/seb-cover.png',
    href: '/work/seb',
  },
  {
    id: 'bontouch',
    headline: ['Framna', 'design internship'],
    title: 'Framna (earlier Bontouch)',
    description: 'UI Design Internship working on product design and design systems for various client projects.',
    year: '2024',
    tags: ['UI Design', 'Design System', 'Product Design'],
    projectTag: 'Internship',
    coverImage: '/Portfolio Assets/Work/Bontouch/Assets/Bontouch Background Cover.png',
    href: '/work/bontouch',
  },
  {
    id: 'mymedicaldata',
    headline: ['Hälsa+', 'health app'],
    title: 'Hälsa+',
    description: 'Designing Hälsa+, a health-focused mobile app, as the sole product designer on the team.',
    year: '2025',
    tags: ['UX Design', 'UI Design', 'Mobile App', 'Health'],
    projectTag: 'Contract',
    coverImage: '/Portfolio Assets/Work/MMD/MMDCover.png',
    href: '/work/mymedicaldata',
  },
  {
    id: 'zanlugproperties',
    headline: ['Zanlüg', 'Properties'],
    title: 'Zanlüg Properties',
    description: 'Designing a luxury property showcase website connecting travelers with exclusive retreats.',
    year: '2026',
    tags: ['Web Design', 'Luxury Branding', 'Property Showcase'],
    projectTag: 'Contract',
    coverImage: '/Portfolio Assets/Work/Zanlug Properties/zanlug-work-thumbnail.png',
    href: '/work/zanlugproperties',
  },
  {
    id: 'hemma',
    headline: ['Hemma', 'home log for iPhone'],
    title: 'Hemma',
    description: 'A Swedish-first iPhone app that keeps a home’s log, documents and costs in one place. Designed and built in SwiftUI, still in development.',
    year: '2026',
    tags: ['Product Design', 'UX/UI', 'iOS App'],
    projectTag: 'Personal project',
    coverImage: '/Portfolio Assets/Work/Hemma/hemma-card.jpg',
    href: '/work/hemma',
  },
  {
    id: 'oldmarkstudio',
    headline: ['Oldmark', 'Studio'],
    title: 'Oldmark Studio',
    description: 'My own design & development agency for founders and product teams who need digital work done well.',
    year: '2024',
    tags: ['Agency', 'Web Design', 'Web Development'],
    projectTag: 'Agency',
    coverImage: '/Portfolio Assets/Work/Oldmark Studio/oldmark-studio-thumbnail-photo.jpg',
    href: '/work/oldmarkstudio',
  },
  {
    id: 'moments',
    headline: ['Moments', 'plugin and pricing'],
    title: 'Moments',
    description: 'Designing plugin interfaces and pricing pages with focus on clarity and conversion.',
    year: '2024',
    tags: ['Plugin Design', 'Pricing', 'UI Design'],
    projectTag: 'Concept',
    coverImage: '/Portfolio Assets/Work/Moments/Plugin.png',
    href: '/work/moments',
  },
  {
    id: 'djungelbyran',
    headline: ['Djungelbyrån', 'brand and web'],
    title: 'Djungelbyrån',
    description: 'Brand identity and web design project creating a cohesive visual language.',
    year: '2022',
    tags: ['Branding', 'Web Design', 'Identity'],
    projectTag: 'Contract',
    coverImage: '/Portfolio Assets/Work/Djungelbyran/Work Cover.png',
    href: '/work/djungelbyran',
  },
]

function WorkItem({ work, index }: { work: typeof allWork[0], index: number }) {
  const { theme } = useTheme()
  const { ref: workRef, isVisible: workVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    triggerOnce: true,
    delay: index * 100
  })

  return (
    <div
      ref={workRef}
      className={`h-full transition-all duration-700 ${
        workVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Link href={work.href} className="group block h-full">
        <div className="flex h-full flex-col bg-gray-800/20 border border-gray-700/30 rounded-2xl p-4 md:p-5 hover:border-gray-600/50 transition-all relative">
          {/* Project Tag - Upper Right */}
          {work.projectTag && (
            <div className="absolute top-5 right-5 md:top-6 md:right-6 z-10">
              <span className="work-pill">
                {work.projectTag}
              </span>
            </div>
          )}

          {/* Image */}
          <div
            className={`relative w-full aspect-[16/10] min-h-[160px] overflow-hidden rounded-xl ${
              work.id === 'bontouch' || work.id === 'moments' || work.id === 'hemma'
                ? 'bg-gray-950'
                : 'bg-gray-900'
            }`}
          >
            <Image
              src={work.coverImage}
              alt={work.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col mt-3">
            <div className="mb-1.5">
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
                  {work.title}
                </h3>
                <span className="text-sm text-gray-500 font-medium">{work.year}</span>
              </div>
            </div>

            <p className="text-gray-300 mb-3 leading-relaxed text-sm">
              {work.description}
            </p>

            <div className="mt-3 flex items-center text-gray-400 group-hover:text-white transition-colors">
              <span className="text-sm font-medium">View project</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

type Work = (typeof allWork)[number]

const visibleWork = allWork.filter(
  (work) =>
    work.id !== 'zanlugproperties' &&
    work.id !== 'moments' &&
    work.id !== 'djungelbyran'
)

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EASE_IN_OUT_QUART: [number, number, number, number] = [0.76, 0, 0.24, 1]
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
const DARK_COVER = ['bontouch', 'moments', 'hemma']
// how far past a slice boundary (in projects) the scroll has to go before the next one takes the stage
const BOUNDARY_SLACK = 0.06

type IntroState = 'idle' | 'playing' | 'done'

const pad = (n: number) => String(n).padStart(2, '0')

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

/** Desktop Selected work: the section pins and page scroll steps through the projects sideways.
    The first time it pins, the grid draws itself and project 01 glides in from the right
    (Space skips it). Each project owns an equal slice of the section's scroll, so the arrows and
    ← / → keys just scroll to the middle of a slice. Every project stays mounted and moves between
    three resting places (passed, on stage, still to come), so a quick swipe just retargets the
    motion that's already running instead of queueing mounts and image loads. */
function WorkStage({ works }: { works: Work[] }) {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const [intro, setIntro] = useState<IntroState>('idle')
  const indexRef = useRef(0)
  const introRef = useRef<IntroState>('idle')
  const runs = useRef<AnimationPlaybackControls[]>([])
  const n = works.length

  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const railX = useTransform(scrollYProgress, [0, 1], ['0%', `${(n - 1) * 100}%`])

  const setIntroState = (next: IntroState) => {
    introRef.current = next
    setIntro(next)
  }

  // jump to the settled first project: run everything to its last frame, then, once framer has
  // flushed that frame, drop the inline styles so the elements fall back to their resting CSS
  const finishIntro = useCallback(() => {
    const current = runs.current
    runs.current = []
    current.forEach((run) => run.complete())
    setIntroState('done')
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        scope.current?.querySelectorAll<HTMLElement>('[data-intro-el]').forEach((el) => {
          el.style.removeProperty('opacity')
          el.style.removeProperty('transform')
          el.style.removeProperty('clip-path')
        })
      })
    )
  }, [scope])

  const runIntro = useCallback(() => {
    // 0–0.9s the grid draws out from the image's edges · 0.1–1.6s project 01 fades up and glides in
    // from the right while its window opens leftward, settling as it lands · 0.55s on the copy
    // rises line by line · ~1.05s the counter and navigation follow
    runs.current = [
      animate('.work-x-grid', { opacity: [0, 1] }, { duration: 0.3, ease: 'easeOut' }),
      animate('.work-x-gl-h', { scaleX: [0, 1] }, { duration: 1.1, delay: stagger(0.08), ease: EASE_OUT_EXPO }),
      animate('.work-x-gl-v', { scaleY: [0, 1] }, { duration: 1.1, delay: stagger(0.08, { startDelay: 0.1 }), ease: EASE_OUT_EXPO }),
      animate('.work-x-plus', { opacity: [0, 1], scale: [0.4, 1], rotate: [-90, 0] }, { duration: 0.6, delay: stagger(0.05, { startDelay: 0.4 }), ease: EASE }),
      animate(
        '.work-x-window',
        { clipPath: ['inset(0% 0% 0% 100% round 14px)', 'inset(0% 0% 0% 0% round 14px)'] },
        { duration: 1.2, delay: 0.1, ease: EASE_IN_OUT_QUART }
      ),
      animate('.work-x-media-scale', { opacity: [0, 1] }, { duration: 0.8, delay: 0.1, ease: 'easeOut' }),
      animate('.work-x-media-scale', { x: ['8%', '0%'], scale: [1.04, 1] }, { duration: 1.5, delay: 0.1, ease: EASE_OUT_EXPO }),
      animate('.work-x-shadow', { opacity: [0, 1] }, { duration: 0.9, delay: 0.55, ease: 'easeOut' }),
      animate('.work-x-copy-item[data-active="true"] .work-x-ln', { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: stagger(0.08, { startDelay: 0.55 }), ease: EASE }),
      animate('.work-x-chrome', { opacity: [0, 1], y: [8, 0] }, { duration: 0.5, delay: stagger(0.08, { startDelay: 1.05 }), ease: EASE }),
    ]
    const current = runs.current
    Promise.all(current).then(() => {
      if (runs.current === current) finishIntro()
    })
  }, [animate, finishIntro])

  // hold the entrance until project 01's image has decoded (at most a beat), so it never fades in
  // as an empty panel and then pops
  const playIntro = useCallback(() => {
    setIntroState('playing')
    const img = scope.current?.querySelector<HTMLImageElement>('.work-x-slide[data-active="true"] img')
    const ready = img ? Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 700))]) : Promise.resolve()
    ready.then(() => {
      if (introRef.current === 'playing' && runs.current.length === 0) runIntro()
    })
  }, [scope, runIntro])

  // start the intro as the section comes up through the middle of the screen, so it's arriving
  // while the stage settles into place instead of leaving an empty stage on the way; skip it when there is
  // nothing to introduce (reduced motion, or the page loaded already past project 01)
  const checkIntro = useCallback(() => {
    const track = trackRef.current
    if (introRef.current !== 'idle' || !track) return
    if (!window.matchMedia('(min-width: 768px)').matches) return
    const rect = track.getBoundingClientRect()
    if (rect.top > window.innerHeight * 0.5) return
    if (reduce || rect.bottom < window.innerHeight || indexRef.current > 0) finishIntro()
    else playIntro()
  }, [reduce, finishIntro, playIntro])

  useEffect(() => {
    checkIntro()
  }, [checkIntro])
  useMotionValueEvent(scrollY, 'change', checkIntro)

  // a little hysteresis around each slice boundary, so stopping a swipe right on the line can't
  // flick the project back and forth
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const at = p * n
    const current = indexRef.current
    let next = current
    if (at >= current + 1 + BOUNDARY_SLACK) next = Math.min(n - 1, Math.floor(at - BOUNDARY_SLACK))
    else if (at < current - BOUNDARY_SLACK) next = Math.max(0, Math.floor(at + BOUNDARY_SLACK))
    if (next === current) return
    indexRef.current = next
    setIndex(next)
    if (introRef.current === 'playing') finishIntro()
  })

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current
      if (!track || i < 0 || i >= n) return
      const top = track.getBoundingClientRect().top + window.scrollY
      const distance = track.offsetHeight - window.innerHeight
      scrollToPosition(top + ((i + 0.5) / n) * distance)
    },
    [n]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.code === 'Space' && introRef.current === 'playing') {
        e.preventDefault()
        finishIntro()
        return
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect || rect.top > 1 || rect.bottom < window.innerHeight - 1) return
      const next = indexRef.current + (e.key === 'ArrowRight' ? 1 : -1)
      if (next < 0 || next >= n) return
      e.preventDefault()
      goTo(next)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finishIntro, goTo, n])

  // where a project rests relative to the one on stage: -1 passed (off to the left), 1 still to come
  const place = (i: number) => Math.sign(i - index)
  const glide = reduce ? { duration: 0 } : { type: 'spring' as const, duration: 0.9, bounce: 0 }
  const fade = (onStage: boolean) =>
    onStage ? { duration: 0.5, delay: 0.1, ease: EASE } : { duration: 0.3, ease: 'easeOut' as const }
  // text hands over without overlapping: two titles on top of each other read as a smudge
  const textFade = (onStage: boolean) =>
    onStage ? { duration: 0.45, delay: 0.2, ease: EASE } : { duration: 0.18, ease: 'easeOut' as const }

  return (
    <div ref={trackRef} className="work-x-track" style={{ '--work-x-count': n } as React.CSSProperties}>
      <div ref={scope} className={`work-x-pin ${inter.className}`} data-intro={intro}>
        <div className="work-x-inner">
          <h2 className="work-x-label">Selected work</h2>

          <div className="work-x-copy">
            {works.map((work, i) => {
              const onStage = i === index
              return (
                <motion.div
                  key={work.id}
                  className="work-x-copy-item"
                  data-active={onStage}
                  aria-hidden={!onStage}
                  initial={false}
                  animate={{ opacity: onStage ? 1 : 0, x: reduce ? 0 : place(i) * 28 }}
                  transition={{ x: glide, opacity: textFade(onStage) }}
                >
                  <p className="work-x-eyebrow work-x-ln" data-intro-el>
                    <span>{work.projectTag}</span>
                    <i aria-hidden="true" />
                    <span>{work.year}</span>
                  </p>
                  <h3 className="work-x-title">
                    <span className="work-x-ln" data-intro-el>{work.headline[0]}</span>
                    <span className="work-x-ln work-x-title-soft" data-intro-el>{work.headline[1]}</span>
                  </h3>
                  <p className="work-x-desc work-x-ln" data-intro-el>{work.description}</p>
                  <Link href={work.href} className="work-x-cta work-x-ln" data-intro-el tabIndex={onStage ? undefined : -1}>
                    View case study
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="work-x-frame">
            <div className="work-x-grid" data-intro-el aria-hidden="true">
              <span className="work-x-gl work-x-gl-h work-x-gl-top" data-intro-el />
              <span className="work-x-gl work-x-gl-h work-x-gl-bottom" data-intro-el />
              <span className="work-x-gl work-x-gl-v work-x-gl-left" data-intro-el />
              <span className="work-x-gl work-x-gl-v work-x-gl-right" data-intro-el />
              <span className="work-x-plus" style={{ left: 0, top: 0 }} data-intro-el />
              <span className="work-x-plus" style={{ left: '100%', top: 0 }} data-intro-el />
              <span className="work-x-plus" style={{ left: 0, top: '100%' }} data-intro-el />
              <span className="work-x-plus" style={{ left: '100%', top: '100%' }} data-intro-el />
            </div>
            <p className="work-x-counter work-x-chrome" data-intro-el>
              <b>{pad(index + 1)}</b> / {pad(n)}
            </p>
            <div className="work-x-tilt">
              <div className="work-x-shadow" data-intro-el aria-hidden="true" />
              {/* every slide is clipped to this window, so the ones waiting either side never show */}
              <div className="work-x-window" data-intro-el>
                <div className="work-x-media-scale" data-intro-el>
                  {works.map((work, i) => {
                    const onStage = i === index
                    return (
                      <motion.div
                        key={work.id}
                        className={`work-x-slide ${DARK_COVER.includes(work.id) ? 'bg-gray-950' : 'bg-gray-900'}`}
                        data-active={onStage}
                        initial={false}
                        animate={{
                          opacity: onStage ? 1 : 0,
                          x: reduce ? '0%' : `${place(i) * 42}%`,
                          scale: onStage || reduce ? 1 : 0.94,
                          zIndex: onStage ? 2 : 1,
                        }}
                        transition={{ x: glide, scale: glide, opacity: fade(onStage), zIndex: { duration: 0 } }}
                      >
                        <Link href={work.href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
                          <Image src={work.coverImage} alt="" fill priority={i === 0} sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="work-x-nav work-x-chrome" data-intro-el>
            <span>Scroll or use</span>
            <button type="button" className="work-x-arrow" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous project">
              <ArrowLeft size={14} weight="bold" />
            </button>
            <button type="button" className="work-x-arrow" onClick={() => goTo(index + 1)} disabled={index === n - 1} aria-label="Next project">
              <ArrowRight size={14} weight="bold" />
            </button>
            <div className="work-x-rail" aria-hidden="true">
              <motion.i style={{ x: railX, width: `${100 / n}%` }} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {intro === 'playing' && (
            <motion.button
              type="button"
              className="work-x-skip"
              onClick={finishIntro}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0 }}
            >
              <kbd>Space</kbd> Skip intro
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function WorkSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="work" className="bg-transparent relative">
      {/* phones: the plain card list */}
      <div ref={sectionRef} className="md:hidden py-12 max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className={`text-xl font-serif font-medium mb-8 text-white transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Selected work</h2>
        <div className="grid grid-cols-1 gap-4">
          {visibleWork.map((work, index) => (
            <WorkItem key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <WorkStage works={visibleWork} />
      </div>
    </section>
  )
}
