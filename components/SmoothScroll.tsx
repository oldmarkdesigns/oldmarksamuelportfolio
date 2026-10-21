'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { setSmoothScrollInstance } from '@/lib/smoothScroll'

// Eased wheel scrolling for the whole site. Touch keeps its native momentum, and visitors
// who ask for reduced motion keep plain native scrolling (Lenis is never created for them).
//
// lenis is pinned to 1.3.21 on purpose: Next 13.5's SWC minifier miscompiles 1.3.27 (and likely
// 1.3.26+, which added reduced-motion handling), hardcoding lerp: 1. The glide then silently
// vanishes in production builds while dev looks fine. Check a production build before bumping it.
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis: Lenis | null = null

    const sync = () => {
      if (reducedMotion.matches) {
        lenis?.destroy()
        lenis = null
      } else if (!lenis) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.1,
          // let scrollable boxes (textareas, wide tables) scroll themselves
          allowNestedScroll: true,
          // drop any glide in flight when a link opens another page
          stopInertiaOnNavigate: true,
        })
      }
      setSmoothScrollInstance(lenis)
    }

    sync()
    reducedMotion.addEventListener('change', sync)

    return () => {
      reducedMotion.removeEventListener('change', sync)
      lenis?.destroy()
      setSmoothScrollInstance(null)
    }
  }, [])

  return null
}
