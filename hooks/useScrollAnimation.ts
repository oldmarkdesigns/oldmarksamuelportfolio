'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
    delay = 0,
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let observer: IntersectionObserver | null = null

    // Check initial visibility immediately and after layout
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      // Check if element is in or near viewport (with large buffer)
      const isInViewport = rect.top < viewportHeight + 1000 && rect.bottom > -1000
      return isInViewport
    }

    // Check immediately
    if (checkVisibility()) {
      setIsVisible(true)
      return // Don't set up observer if already visible
    }

    // Check after layout completes
    const timeoutId = setTimeout(() => {
      if (checkVisibility()) {
        setIsVisible(true)
        return
      }

      // Set up observer for elements not initially visible
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setIsVisible(true)
              }, delay)
              if (triggerOnce && observer) {
                observer.unobserve(entry.target)
              }
            } else if (!triggerOnce) {
              setIsVisible(false)
            }
          })
        },
        {
          threshold,
          rootMargin: '200px',
        }
      )

      observer.observe(element)
    }, 150)

    return () => {
      clearTimeout(timeoutId)
      if (observer && element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, delay])

  return { ref: elementRef, isVisible }
}
