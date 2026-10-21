import type Lenis from 'lenis'

// Set by <SmoothScroll />. Stays null while Lenis is off (reduced motion, before mount),
// and every helper below then falls back to the browser's own scrolling.
let lenis: Lenis | null = null

export function setSmoothScrollInstance(instance: Lenis | null) {
  lenis = instance
}

function nativeBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const JUMP = { duration: 1.2, easing: easeInOutCubic }

/** Smooth-scroll to an element (or a CSS selector), landing below its scroll-margin like scrollIntoView. */
export function scrollToElement(target: HTMLElement | string) {
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!element) return

  if (lenis) {
    lenis.scrollTo(element, JUMP)
  } else {
    element.scrollIntoView({ behavior: nativeBehavior(), block: 'start' })
  }
}

/** Smooth-scroll the page to a vertical offset in px. */
export function scrollToPosition(top: number) {
  if (lenis) {
    lenis.scrollTo(top, JUMP)
  } else {
    window.scrollTo({ top, behavior: nativeBehavior() })
  }
}

/** Freeze page scrolling while a modal is open. Pair with startSmoothScroll(). */
export function stopSmoothScroll() {
  lenis?.stop()
}

export function startSmoothScroll() {
  lenis?.start()
}
