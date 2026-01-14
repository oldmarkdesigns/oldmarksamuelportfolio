'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface WorkPageNavProps {
  sections: { id: string; label: string }[]
}

export default function WorkPageNav({ sections }: WorkPageNavProps) {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Set initial active section
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    
    // For "Overview", scroll to the very top (where content starts on page load)
    if (sectionId === 'overview') {
      // Find the main content container and scroll to its top
      const mainElement = document.querySelector('main')
      if (mainElement) {
        const mainPosition = mainElement.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: mainPosition,
          behavior: 'smooth',
        })
      } else {
        // Fallback to top of page
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      setActiveSection(sectionId)
      return
    }
    
    // For other sections, use the normal scroll behavior
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 120 // Increased offset to account for navbar and prevent title from being hidden
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
      setActiveSection(sectionId)
    }
  }

  return (
    <nav 
      className="sticky top-20 self-start w-32 flex-shrink-0 hidden md:block"
      style={{
        backgroundColor: 'transparent',
        background: 'transparent',
      }}
    >
      <div className="flex flex-col space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleSectionClick(e, section.id)}
            className={`text-sm font-medium transition-colors cursor-pointer py-2 ${
              activeSection === section.id
                ? 'dark:text-white text-gray-900'
                : 'dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-gray-900'
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

