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
    <section className="hidden py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 ref={sectionRef} className={`text-xl md:text-2xl font-serif font-medium mb-8 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>A word from collaborators</h2>
        
        <div ref={contentRef} className={`rounded-2xl p-8 md:p-10 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${theme === 'light' ? 'bg-gray-100/50 border border-gray-300/50' : 'bg-gray-800/20 border border-gray-700/50'}`}>
          <blockquote className={`text-2xl md:text-3xl font-bold mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            "Samuel has an impressive ability to create value through both UX design and development. His efforts have elevated our brand and our products."
          </blockquote>
          
          <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Referencing my time as a UX & UI Design Intern at Bontouch.
          </p>
          
          <Link
            href="/work/bontouch"
            className="inline-block text-blue-400 hover:text-blue-300 transition-colors mb-8"
          >
            Bontouch case study →
          </Link>
          
          <div className={`flex items-center gap-4 pt-6 border-t ${theme === 'light' ? 'border-gray-300/50' : 'border-gray-700/50'}`}>
            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
              <div className={`w-12 h-12 flex items-center justify-center font-semibold rounded-full avatar-gradient ${
                theme === 'light' 
                  ? 'bg-gray-200 text-gray-900' 
                  : 'bg-gradient-to-br from-gray-600 to-gray-800 text-white'
              }`}>
                CJ
              </div>
            </div>
            <div>
              <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Carl Johansson</p>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>CEO & Co-founder of Bontouch</p>
            </div>
          </div>
          
          <p className={`text-xs mt-4 text-right ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
            Quote translated from Swedish
          </p>
        </div>
      </div>
    </section>
  )
}

