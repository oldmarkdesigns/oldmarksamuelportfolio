'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Hero() {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-6 md:pt-16">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-2 md:py-12">
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-2 md:mb-6 leading-tight tracking-tight text-center ${
          theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          <div className="inline-block" style={{ marginLeft: '-8%' }}>CREATIVE</div>
          <br />
          <div className="inline-block" style={{ marginRight: '-8%' }}>PRODUCT</div>
          <br />
          <div>DESIGNER</div>
        </h1>
        
        <p className={`text-lg md:text-xl mb-2 md:mb-6 max-w-2xl mx-auto leading-relaxed text-center ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          Hello there, I'm Samuel - I design web and mobile apps that are user-friendly, beautiful & convert your target audience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2 md:mb-6">
          <div className="flex items-center gap-2 text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-base">Stockholm, Sweden</span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 mb-8 md:mb-0">
          <span className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white">
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: '#B0E0E6',
                boxShadow: '0 0 4px rgba(176, 224, 230, 0.5), 0 0 8px rgba(176, 224, 230, 0.3)',
              }}
            />
            Available for work
          </span>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector('#contact')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              theme === 'light'
                ? 'border border-gray-300 hover:border-gray-600 text-gray-900 hover:bg-gray-200/50 hover:text-gray-800'
                : 'border border-gray-600 hover:border-gray-500 text-white hover:bg-gray-700/20 hover:text-gray-200'
            }`}
          >
            Let's connect
          </a>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={() => {
          const element = document.querySelector('#work')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
        className={`absolute bottom-16 md:bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 transition-opacity duration-500 cursor-pointer hover:opacity-80 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to work section"
      >
        <p className="text-sm text-gray-400">Scroll down to read more</p>
        <svg 
          className="w-5 h-5 text-gray-400 animate-smooth-bounce"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}

