'use client'

import Image from 'next/image'
import { useState } from 'react'
import './TestimonialsSection.css'
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
    imageSrc: '/Portfolio Assets/Recommendations/Praveen.png',
    imageAlt: 'Portrait of Praveen Natarajan',
    initials: 'PN',
    linkedinHref: 'https://www.linkedin.com/in/praveen-natarajan/',
    footnote: 'Original quote in English.',
  },
]

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function TestimonialsSection() {
  const { theme } = useTheme()
  const light = theme === 'light'
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const [active, setActive] = useState(0)

  const total = recommendations.length
  const go = (index: number) => setActive(((index % total) + total) % total)

  const ink = light ? 'text-gray-900' : 'text-white'
  const muted = light ? 'text-gray-600' : 'text-gray-400'
  const hairline = light ? 'border-gray-300' : 'border-gray-700/60'

  return (
    <section className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2
          ref={sectionRef}
          className={`text-xl md:text-2xl font-serif font-medium mb-8 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${ink}`}
        >
          A word from collaborators
        </h2>

        <div ref={contentRef} className={`border-t pt-10 md:pt-12 ${hairline}`}>
          {/* every quote sits in the same grid cell, so the section is as tall as the longest one */}
          <div className="grid" aria-live="polite">
            {recommendations.map((r, i) => {
              const on = contentVisible && i === active
              return (
                <figure key={r.id} className="quote-item m-0" data-on={on} aria-hidden={!on}>
                  <blockquote
                    className={`font-serif text-xl md:text-[1.7rem] leading-[1.45] md:leading-[1.4] [text-wrap:pretty] ${ink}`}
                  >
                    {r.quote}
                  </blockquote>

                  <figcaption className="mt-8 md:mt-10 flex items-start gap-4">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      {r.imageSrc ? (
                        <Image
                          src={r.imageSrc}
                          alt={r.imageAlt || `Portrait of ${r.author}`}
                          fill
                          sizes="48px"
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full grid place-items-center text-sm font-semibold ${
                            light ? 'bg-gray-300 text-gray-900' : 'bg-gray-700 text-white'
                          }`}
                        >
                          {r.initials}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-medium ${ink}`}>{r.author}</p>
                      <p className={`text-sm mt-0.5 ${muted}`}>{r.role}</p>
                      <p className={`text-sm mt-1 ${muted}`}>{r.meta}</p>
                      {r.linkedinHref && (
                        <a
                          href={r.linkedinHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={on ? 0 : -1}
                          className={`mt-2 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 decoration-gray-500/60 hover:decoration-current transition-colors ${ink}`}
                        >
                          <LinkedInIcon />
                          <span>{r.author}</span>
                        </a>
                      )}
                      <p className={`text-xs mt-3 ${light ? 'text-gray-500' : 'text-gray-500'}`}>{r.footnote}</p>
                    </div>
                  </figcaption>
                </figure>
              )
            })}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {recommendations.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show recommendation ${i + 1}`}
                  aria-current={i === active}
                  className="group py-3"
                >
                  <span
                    className={`block h-[2px] rounded-full transition-all duration-300 ${
                      i === active
                        ? `w-10 ${light ? 'bg-gray-900' : 'bg-white'}`
                        : `w-6 ${light ? 'bg-gray-400 group-hover:bg-gray-700' : 'bg-gray-600 group-hover:bg-gray-300'}`
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {[
                { label: 'Show previous recommendation', delta: -1, d: 'M15 19l-7-7 7-7' },
                { label: 'Show next recommendation', delta: 1, d: 'M9 5l7 7-7 7' },
              ].map(({ label, delta, d }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go(active + delta)}
                  aria-label={label}
                  className={`h-9 w-9 rounded-full border grid place-items-center transition-colors ${
                    light
                      ? 'border-gray-300 text-gray-800 hover:border-gray-900'
                      : 'border-gray-700 text-gray-200 hover:border-gray-400'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
