'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], summary, label, [data-cursor="grow"]'
const TEXT_FIELDS = 'input, textarea, select, [contenteditable="true"]'

/** A white circle that replaces the pointer on mouse devices. It inverts what it sits over
    (mix-blend-mode: difference) and grows over links and buttons. Touch devices keep their normal behaviour. */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      const target = e.target instanceof Element ? e.target : null
      el.dataset.grow = String(!!target?.closest(INTERACTIVE))
      el.dataset.hidden = String(!!target?.closest(TEXT_FIELDS))
      root.classList.toggle('cursor-text-field', !!target?.closest(TEXT_FIELDS))
      el.style.opacity = ''
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }
    const onDown = () => (el.dataset.press = 'true')
    const onUp = () => (el.dataset.press = 'false')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      root.classList.remove('has-custom-cursor', 'cursor-text-field')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="custom-cursor" aria-hidden />
}
