'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About me' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-4xl px-4 animate-slide-down-from-top">
      {/* Rounded navigation bar */}
      <div 
        className={`${isScrolled ? 'backdrop-blur-3xl' : 'backdrop-blur-xl'} border rounded-full px-3 py-1.5 flex items-center justify-between transition-all duration-500 ease-out ${
          theme === 'dark' 
            ? 'bg-[rgba(10,10,10,0.4)] border-[rgba(22,101,52,0.2)]' 
            : 'bg-[rgba(243,244,246,0.35)] border-[rgba(209,213,219,0.6)]'
        }`}
      >
        {/* Left side: Profile picture and name */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            if (pathname === '/') {
              const element = document.querySelector('#home')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            } else {
              router.push('/')
              // Wait for navigation to complete, then scroll
              setTimeout(() => {
                const element = document.querySelector('#home')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }, 50)
            }
          }}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-green-800/30">
            <Image
              src="/Portfolio Assets/ProfilePic.jpg"
              alt="Samuel Oldmark"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="text-white font-medium text-xs md:text-sm whitespace-nowrap">Samuel Oldmark</span>
        </a>

        {/* Center: Navigation links */}
        <div className="hidden md:flex items-center space-x-5 flex-1 justify-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                if (pathname === '/') {
                  const element = document.querySelector(item.href)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                } else {
                  router.push('/')
                  // Wait for navigation to complete, then scroll to section
                  setTimeout(() => {
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 50)
                }
              }}
              className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                pathname === item.href || (typeof window !== 'undefined' && window.location.hash === item.href)
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right side: Theme toggle, separator, and LinkedIn */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Theme toggle - Sun icon when dark mode, Moon icon when light mode */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-gray-300 hover:text-white transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              // Sun icon (clicking switches to light mode)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon icon (clicking switches to dark mode)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Separator */}
          <div className="h-4 w-px bg-green-800/30"></div>

          {/* LinkedIn button */}
          <a
            href="https://www.linkedin.com/in/samuel-oldmark-31055a1a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 border border-gray-600 hover:border-gray-500 rounded-full px-3 py-1 transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-white text-xs font-medium hidden sm:inline">LinkedIn</span>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-[9998]"
            onClick={() => setIsMenuOpen(false)}
          />
          <div 
            className={`md:hidden relative z-[9999] mt-2 ${isScrolled ? 'backdrop-blur-3xl' : 'backdrop-blur-xl'} border rounded-2xl p-3 transition-all duration-500 ease-out ${
              theme === 'dark' 
                ? 'bg-[rgba(10,10,10,0.4)] border-[rgba(22,101,52,0.2)]' 
                : 'bg-[rgba(243,244,246,0.35)] border-[rgba(209,213,219,0.6)]'
            }`}
          >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                setIsMenuOpen(false)
                if (pathname === '/') {
                  const element = document.querySelector(item.href)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                } else {
                  router.push('/')
                  // Wait for navigation to complete, then scroll to section
                  setTimeout(() => {
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 50)
                }
              }}
              className={`block py-3 text-base font-medium transition-colors cursor-pointer ${
                pathname === item.href || (typeof window !== 'undefined' && window.location.hash === item.href)
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
            >
              {item.label}
            </a>
          ))}
          </div>
        </>
      )}
    </nav>
  )
}

