'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

type Point = {
  x: number
  y: number
}

export default function TriangleCursor() {
  const { theme } = useTheme()
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncEnabled = () => {
      setEnabled(finePointerQuery.matches && !reducedMotionQuery.matches)
    }

    syncEnabled()

    finePointerQuery.addEventListener('change', syncEnabled)
    reducedMotionQuery.addEventListener('change', syncEnabled)

    return () => {
      finePointerQuery.removeEventListener('change', syncEnabled)
      reducedMotionQuery.removeEventListener('change', syncEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled || !cursorRef.current || typeof window === 'undefined') {
      document.body.classList.remove('custom-triangle-cursor')
      return
    }

    document.body.classList.add('custom-triangle-cursor')

    const cursor = cursorRef.current
    const target: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current: Point = { ...target }
    let initialized = false
    let lastMoveAt = 0
    let raf = 0

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return

      target.x = event.clientX
      target.y = event.clientY
      lastMoveAt = performance.now()

      if (!initialized) {
        current.x = target.x
        current.y = target.y
        initialized = true
      }
    }

    const onPointerLeave = () => {
      lastMoveAt = 0
    }

    const tick = () => {
      const now = performance.now()
      const follow = 0.32

      current.x += (target.x - current.x) * follow
      current.y += (target.y - current.y) * follow

      if (Math.abs(target.x - current.x) < 0.08) current.x = target.x
      if (Math.abs(target.y - current.y) < 0.08) current.y = target.y

      const idleMs = lastMoveAt > 0 ? now - lastMoveAt : 9999
      const baseOpacity = 0.62
      let opacity = 0

      if (initialized) {
        if (idleMs <= 6000) {
          opacity = baseOpacity
        } else if (idleMs < 6600) {
          const fadeProgress = (idleMs - 6000) / 600
          opacity = baseOpacity * (1 - fadeProgress)
        }
      }

      const velocityX = target.x - current.x
      const velocityY = target.y - current.y
      const velocity = Math.min(Math.hypot(velocityX, velocityY), 16)
      const scale = 0.998 + (velocity / 16) * 0.005
      const rotate = -68 + Math.max(-1, Math.min(1, velocityY * 0.03))

      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-3px, -4px) rotate(${rotate}deg) scale(${scale})`
      cursor.style.opacity = opacity.toFixed(3)

      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('mouseleave', onPointerLeave)

    raf = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('mouseleave', onPointerLeave)
      document.body.classList.remove('custom-triangle-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      className={`triangle-cursor ${theme === 'light' ? 'is-light' : 'is-dark'}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="triangle-cursor-svg">
        <polygon points="2,2 20,12 2,22 6.75,12" />
      </svg>
    </div>
  )
}
