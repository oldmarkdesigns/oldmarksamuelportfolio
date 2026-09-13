'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const LOGO_SIZE_CLASS = 'w-10 h-10 md:w-12 md:h-12 flex-shrink-0'
const LOGO_RADIUS_CLASS = 'rounded-[21.25%]'
const LOGO_CLASS = `${LOGO_SIZE_CLASS} object-contain`
const LOGO_CLASS_SQUARE_FILL = `${LOGO_SIZE_CLASS} object-cover ${LOGO_RADIUS_CLASS}`
const EXPERIENCE_LOGO_CLASS = `${LOGO_CLASS} ${LOGO_RADIUS_CLASS}`

export default function ExperienceEducationSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })
  const [showCertificate, setShowCertificate] = useState(false)

  useEffect(() => {
    if (!showCertificate) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowCertificate(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showCertificate])

  return (
    <section className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={sectionRef} className={`transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div ref={contentRef} className={`space-y-12 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Experience Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-shrink-0 md:w-32">
              <h3 className="text-xl md:text-2xl font-serif font-medium text-white text-gray-900">Experience</h3>
            </div>
            <div className="flex-1 space-y-8">
              <div className="flex gap-4 items-start">
                <Image
                  src="/Portfolio Assets/Experience Logos/oldmark_studio.png"
                  alt="Oldmark Studio"
                  width={160}
                  height={160}
                  className={EXPERIENCE_LOGO_CLASS}
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href="/work/oldmarkstudio"
                    className="block mb-2"
                  >
                    <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 hover:text-gray-300 text-gray-600 transition-colors">
                      Founder & Product Designer – Oldmark Studio
                    </h4>
                  </Link>

                  <p className="text-sm md:text-base mb-3" style={{ color: '#60A5FA' }}>
                    May 2024 - Present
                  </p>

                  <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    I run my own agency, Oldmark Studio, where I work with multiple clients across different sectors. My work spans UX and UI design, design systems, websites, digital products, frontend development, and AI-assisted solutions. Working across varied projects has made me comfortable taking broad ownership, adapting quickly, and turning early ideas into polished, working experiences.
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Image
                  src="/Portfolio Assets/Experience Logos/hälsa+_logo.png"
                  alt="Hälsa+"
                  width={160}
                  height={160}
                  className={EXPERIENCE_LOGO_CLASS}
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href="/work/mymedicaldata"
                    className="block mb-2"
                  >
                    <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 hover:text-gray-300 text-gray-600 transition-colors">
                      Product Designer – My Medical Data | Hälsa+
                    </h4>
                  </Link>

                  <p className="text-sm md:text-base mb-3" style={{ color: '#60A5FA' }}>
                    Jan 2025 - Apr 2026
                  </p>

                  <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    I worked as a product designer at My Medical Data, where I designed and planned a new mobile app called Hälsa+ focused on health. As the only designer on the team, my role was to provide UX and UI solutions while also acting as a bridge between development, design, and stakeholders.

                    When I joined, there was already a demo app built from scratch, but it had room for both UX and UI improvements. This experience was very insightful, and I expanded my skills by taking on new tasks and challenges that I hadn't faced before.
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Image
                  src="/Portfolio Assets/Experience Logos/framna_logo.png"
                  alt="Framna"
                  width={160}
                  height={160}
                  className={EXPERIENCE_LOGO_CLASS}
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href="/work/bontouch"
                    className="block mb-2"
                  >
                    <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 hover:text-gray-300 text-gray-600 transition-colors">
                      UI Design Intern – Framna (earlier Bontouch)
                    </h4>
                  </Link>

                  <p className="text-sm md:text-base mb-3" style={{ color: '#60A5FA' }}>
                    Nov 2023 - May 2024
                  </p>

                  <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    I completed my five-month internship at Framna (earlier Bontouch) in Stockholm two months ago, which was a part of my education. My main focus was on UI design, though I was also involved in UX work. During my internship at Framna (earlier Bontouch), I had the opportunity to work with a real product and participate in client meetings. I collaborated with experienced designers and developers, gaining a deeper understanding of all aspects related to a digital product, as well as how collaboration between different skill sets can be executed.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-shrink-0 md:w-32">
              <h3 className="text-xl md:text-2xl font-serif font-medium text-white text-gray-900">Education</h3>
            </div>
            <div className="flex-1 space-y-8">
              <div className="flex gap-4 items-start">
                <Image
                  src="/Portfolio Assets/Experience Logos/chas_academy_logo.png"
                  alt="Chas Academy"
                  width={160}
                  height={160}
                  className={LOGO_CLASS}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 mb-2">
                    UX/UI Design with Frontend Competence – Chas Academy
                  </h4>

                  <p className="text-sm md:text-base mb-4" style={{ color: '#60A5FA' }}>
                    Sep 2022 - June 2024
                  </p>

                  <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    At Chas Academy, I completed a two-year program in UX/UI Design with Frontend Competence, which included a 5-month internship. Through this program, I gained hands-on experience working as a product designer across various areas. The course's frontend development component supported my long-term goal of becoming a well-rounded product designer.

                    The program covered:

                    • Frontend Development with React
                    • A 5-month internship
                    • Interaction Design
                    • UI/UX Design
                    • IT Tech and Operations
                    • Project Management
                    • Agile work methods
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <p className="text-sm md:text-base mb-1" style={{ color: '#60A5FA' }}>
                      Certificate · 2024-06-26
                    </p>
                    <p className="text-sm md:text-base text-white text-gray-900 mb-4">
                      Chas Academy, Stockholm
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowCertificate(true)}
                      className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer border border-gray-300 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-500 text-gray-900 dark:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/20 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      <span>View certificate</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Image
                  src="/Portfolio Assets/Experience Logos/icon_collective_logo.png"
                  alt="Icon Collective"
                  width={160}
                  height={160}
                  className={LOGO_CLASS_SQUARE_FILL}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 mb-2">
                    Music Production & Business – Icon Collective
                  </h4>

                  <p className="text-sm md:text-base mb-4" style={{ color: '#60A5FA' }}>
                    Sep 2019 - Aug 2020
                  </p>

                  <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    Completed a one-year program in Music Production & Business at Icon Collective in Los Angeles, focusing on music production techniques, sound design, and the business aspects of the music industry.
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <p className="text-sm md:text-base mb-1" style={{ color: '#60A5FA' }}>
                      Certificate · 2020-09-14
                    </p>
                    <p className="text-sm md:text-base text-white text-gray-900">
                      Icon Collective, Los Angeles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {showCertificate ? (
        <div
          className="project-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Chas Academy certificate preview"
          onClick={() => setShowCertificate(false)}
        >
          <div
            className="project-lightbox-frame relative w-[min(92vw,900px)] h-[90vh] bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              aria-label="Close certificate preview"
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/80 text-white hover:bg-gray-900 transition-colors"
            >
              ✕
            </button>
            <iframe
              src="/Portfolio Assets/Certifications/examensbevis-chas-academy-samuel-oldmark-189997-4507.pdf"
              title="Chas Academy certificate"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}

