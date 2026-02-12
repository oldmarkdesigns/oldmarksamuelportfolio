'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

type Recommendation = {
  id: string
  quote: string
  meta: string
  author: string
  role: string
  imageSrc?: string
  imageAlt?: string
  initials: string
  linkedinHref?: string
  footnote: string
  isMock?: boolean
}

const recommendations: Recommendation[] = [
  {
    id: 'anders-boman',
    quote:
      '“I have worked together with Samuel for just over a year at MyMedicalData System. Samuel is very skilled in product design and has truly contributed to the development of our platform and the Hälsa+ app. He is very easy to work with and demonstrates great flexibility and a strong understanding of problems. I can warmly recommend Samuel for similar assignments in the future.”',
    meta: 'January 27, 2026 · Anders managed Samuel directly',
    author: 'Anders Boman',
    role: 'CEO MyMedicalData Systems AB · Senior Advisor in Healthcare and Life Science',
    imageSrc: '/Portfolio Assets/Work/MMD/Anders Boman.png',
    imageAlt: 'Portrait of Anders Boman',
    initials: 'AB',
    linkedinHref: 'https://www.linkedin.com/in/anders-boman-289a6b107/',
    footnote: 'Quote translated from Swedish.',
  },
  {
    id: 'praveen-natarajan',
    quote:
      '“I have worked with Samuel for a little over a year and he\'s extremely professional and has a very keen eye to detail. He also comes up with creative yet very practical ways to solve UX issues and has the user in mind while doing so. Samuel is also very flexible in accommodating changes and also very agile in coming up with alternative solutions when one solution doesn\'t work. He\'s an asset to any organization and will contribute immensely to them.”',
    meta: 'February 11, 2026 · Praveen partnered cross-functionally with Samuel as a product manager',
    author: 'Praveen Natarajan',
    role: 'COO @ Nytt IQ | Process Improvement, Industrial Technology',
    initials: 'PN',
    linkedinHref: 'https://www.linkedin.com/in/praveen-natarajan/',
    footnote: 'Original quote in English.',
  },
]

function RecommendationCard({
  recommendation,
  theme,
  stacked = false,
  className = '',
}: {
  recommendation: Recommendation
  theme: string
  stacked?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl p-8 md:p-10 h-full transition-all duration-500 ${
        theme === 'light'
          ? stacked
            ? 'bg-gray-100/80 border border-gray-300/55'
            : 'bg-[#f8fafc] border border-gray-300/65'
          : stacked
            ? 'bg-[rgba(9,16,30,0.8)] border border-gray-700/45'
            : 'bg-[#02060f] border border-gray-700/60 shadow-[0_24px_48px_rgba(2,8,22,0.5)]'
      } ${stacked ? 'opacity-75' : ''} ${className}`}
      style={
        stacked
          ? {
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 36%, rgba(0,0,0,0.08) 90%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 36%, rgba(0,0,0,0.08) 90%, rgba(0,0,0,0) 100%)',
            }
          : undefined
      }
    >
      <blockquote
        className={`text-xl md:text-2xl font-semibold mb-6 leading-relaxed ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}
      >
        {recommendation.quote}
      </blockquote>

      <p className={`text-sm mb-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{recommendation.meta}</p>

      <div
        className={`flex items-start gap-4 pt-6 border-t ${
          theme === 'light' ? 'border-gray-300/50' : 'border-gray-700/50'
        }`}
      >
        <div className="w-12 h-12 flex-shrink-0 pt-2">
          {recommendation.imageSrc ? (
            <div className="relative w-12 h-12">
              <Image
                src={recommendation.imageSrc}
                alt={recommendation.imageAlt || `Portrait of ${recommendation.author}`}
                fill
                sizes="48px"
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-12 h-12 rounded-full grid place-items-center text-sm font-semibold ${
                theme === 'light' ? 'bg-gray-300 text-gray-900' : 'bg-gray-700 text-white'
              }`}
            >
              {recommendation.initials}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start">
          <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{recommendation.author}</p>
          <p className={`text-sm mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{recommendation.role}</p>
          {recommendation.linkedinHref && (
            <a
              href={recommendation.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>{recommendation.author}</span>
            </a>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        {recommendation.isMock && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
              theme === 'light' ? 'bg-gray-200 text-gray-700' : 'bg-gray-700/70 text-gray-300'
            }`}
          >
            Mock
          </span>
        )}
        <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>{recommendation.footnote}</p>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const { theme } = useTheme()
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [deckHeight, setDeckHeight] = useState(520)
  const measureRefs = useRef<(HTMLDivElement | null)[]>([])

  const total = recommendations.length
  const hasMultiple = total > 1
  const activeRecommendation = recommendations[activeIndex]
  const backIndex = (activeIndex + 1) % total
  const backRecommendation = recommendations[backIndex]
  const stackOffset = 18

  const measureCards = useCallback(() => {
    const heights = measureRefs.current.map((node) => node?.getBoundingClientRect().height ?? 0)
    const maxHeight = Math.max(...heights, 0)

    if (!maxHeight) return

    setDeckHeight((prev) => (Math.abs(prev - maxHeight) > 1 ? Math.ceil(maxHeight) : prev))
  }, [])

  useLayoutEffect(() => {
    measureCards()
    const onResize = () => measureCards()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [measureCards, theme])

  useEffect(() => {
    const timer = window.setTimeout(() => measureCards(), 80)
    return () => window.clearTimeout(timer)
  }, [activeIndex, measureCards, theme])

  const goNext = () => {
    if (!hasMultiple) return
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % total)
  }

  const goPrev = () => {
    if (!hasMultiple) return
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }

  const goTo = (index: number) => {
    if (index === activeIndex) return
    const forwardDistance = (index - activeIndex + total) % total
    const backwardDistance = (activeIndex - index + total) % total
    setDirection(forwardDistance <= backwardDistance ? 1 : -1)
    setActiveIndex(index)
  }

  return (
    <section className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2
          ref={sectionRef}
          className={`text-xl md:text-2xl font-serif font-medium mb-8 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
        >
          A word from collaborators
        </h2>

        <div
          ref={contentRef}
          className={`transition-all duration-700 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="invisible pointer-events-none absolute left-0 right-0 top-0 -z-10" aria-hidden>
            {recommendations.map((recommendation, index) => (
              <div
                key={`measure-${recommendation.id}`}
                ref={(node) => {
                  measureRefs.current[index] = node
                }}
              >
                <RecommendationCard recommendation={recommendation} theme={theme} />
              </div>
            ))}
          </div>

          <div className="relative" style={{ height: deckHeight + stackOffset }}>
            {hasMultiple && (
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`back-${backRecommendation.id}`}
                  className="pointer-events-none absolute inset-x-2 top-0 z-0"
                  initial={{ y: -10, scale: 0.95, opacity: 0 }}
                  animate={{ y: -6, scale: 0.965, opacity: 0.78 }}
                  exit={{ y: -10, scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <RecommendationCard recommendation={backRecommendation} theme={theme} stacked />
                </motion.div>
              </AnimatePresence>
            )}

            <div className="absolute inset-x-0 z-10" style={{ top: stackOffset, height: deckHeight }}>
              <AnimatePresence mode="sync" initial={false} custom={direction}>
                <motion.div
                  key={activeRecommendation.id}
                  className="absolute inset-0 will-change-transform"
                  custom={direction}
                  initial={{
                    y: direction === 1 ? -28 : 28,
                    opacity: 0,
                    scale: 0.992,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    y: direction === 1 ? 28 : -28,
                    opacity: 0,
                    scale: 0.992,
                  }}
                  transition={{
                    y: { duration: 0.58, ease: [0.22, 0.8, 0.2, 1] },
                    scale: { duration: 0.58, ease: [0.22, 0.8, 0.2, 1] },
                    opacity: { duration: 0.44, ease: [0.22, 0.8, 0.2, 1] },
                  }}
                >
                  <RecommendationCard recommendation={activeRecommendation} theme={theme} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {recommendations.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show recommendation ${index + 1}`}
                    className={`rounded-full border transition-all duration-300 ${
                      isActive
                        ? theme === 'light'
                          ? 'w-8 h-2.5 bg-gray-900 border-gray-900'
                          : 'w-8 h-2.5 bg-white border-white'
                        : theme === 'light'
                          ? 'w-2.5 h-2.5 border-gray-500/80 bg-transparent hover:border-gray-900'
                          : 'w-2.5 h-2.5 border-gray-500/80 bg-transparent hover:border-white'
                    }`}
                  />
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Show previous recommendation"
                className={`h-9 w-9 rounded-full border grid place-items-center transition-colors ${
                  theme === 'light'
                    ? 'border-gray-300 text-gray-800 hover:border-gray-900'
                    : 'border-gray-700 text-gray-200 hover:border-gray-400'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Show next recommendation"
                className={`h-9 w-9 rounded-full border grid place-items-center transition-colors ${
                  theme === 'light'
                    ? 'border-gray-300 text-gray-800 hover:border-gray-900'
                    : 'border-gray-700 text-gray-200 hover:border-gray-400'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
