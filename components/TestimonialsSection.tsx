'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function TestimonialsSection() {
  const { theme } = useTheme()
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })

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
          className={`rounded-2xl p-8 md:p-10 transition-all duration-700 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${theme === 'light' ? 'bg-gray-100/50 border border-gray-300/50' : 'bg-gray-800/20 border border-gray-700/50'}`}
        >
          <blockquote
            className={`text-xl md:text-2xl font-semibold mb-6 leading-relaxed ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            “I have worked together with Samuel for just over a year at MyMedicalData System. Samuel is very skilled
            in product design and has truly contributed to the development of our platform and the Hälsa+ app. He is
            very easy to work with and demonstrates great flexibility and a strong understanding of problems. I can
            warmly recommend Samuel for similar assignments in the future.”
          </blockquote>

          <p className={`text-sm mb-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            January 27, 2026 · Anders managed Samuel directly
          </p>

          <div
            className={`flex items-start gap-4 pt-6 border-t ${
              theme === 'light' ? 'border-gray-300/50' : 'border-gray-700/50'
            }`}
          >
            <div className="relative w-12 h-12 flex-shrink-0 pt-2">
              <Image
                src="/Portfolio Assets/Work/MMD/Anders Boman.png"
                alt="Portrait of Anders Boman"
                fill
                sizes="48px"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Anders Boman</p>
              <p className={`text-sm mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                CEO MyMedicalData Systems AB · Senior Advisor in Healthcare and Life Science
              </p>
              <a
                href="https://www.linkedin.com/in/anders-boman-289a6b107/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>Anders Boman</span>
              </a>
            </div>
          </div>

          <p
            className={`text-xs mt-4 text-right ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            Quote translated from Swedish.
          </p>
        </div>
      </div>
    </section>
  )
}

