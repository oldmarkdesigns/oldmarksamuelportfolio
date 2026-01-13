'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Helper function to get theme from localStorage
function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') {
    return stored as Theme
  }
  return null
}

// Helper function to apply theme class to document
function applyThemeClass(theme: Theme) {
  if (typeof window === 'undefined') return
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.remove('light')
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
    root.classList.add('light')
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme - read from localStorage or default to dark
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = getStoredTheme()
      const initialTheme = stored || 'dark'
      // Apply immediately
      applyThemeClass(initialTheme)
      return initialTheme
    }
    return 'dark'
  })

  // Sync theme with document and localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    applyThemeClass(theme)
    localStorage.setItem('theme', theme)
    
    // Update html and body background colors
    const bgColor = theme === 'dark' ? '#0a0a0a' : '#fafafa'
    document.documentElement.style.backgroundColor = bgColor
    document.body.style.backgroundColor = bgColor
    
    // Update theme-color meta tag for mobile browsers
    let themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.setAttribute('name', 'theme-color')
      document.head.appendChild(themeColorMeta)
    }
    themeColorMeta.setAttribute('content', bgColor)
  }, [theme])

  // Listen for storage changes (in case theme is changed in another tab)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const newTheme = e.newValue as Theme
        if (newTheme === 'dark' || newTheme === 'light') {
          setTheme(newTheme)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Ensure theme is correct on mount (double-check)
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const stored = getStoredTheme()
    if (stored && stored !== theme) {
      setTheme(stored)
    } else {
      // Ensure document class matches state
      applyThemeClass(theme)
      // Set initial background colors
      document.documentElement.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#fafafa'
      document.body.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#fafafa'
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      // Apply immediately
      if (typeof window !== 'undefined') {
        applyThemeClass(newTheme)
        localStorage.setItem('theme', newTheme)
      }
      return newTheme
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
