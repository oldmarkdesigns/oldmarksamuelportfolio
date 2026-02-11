'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type PreviewImage = {
  src: string
  alt: string
}

type HoverPreview = {
  id: string
  top: number
  left: number
  width: number
  height: number
}

function resolvePreviewSrc(image: HTMLImageElement): string {
  const current = image.currentSrc || image.src || ''

  if (!current) return ''

  try {
    const parsed = new URL(current, window.location.origin)
    if (parsed.pathname === '/_next/image') {
      const rawUrl = parsed.searchParams.get('url')
      if (rawUrl) return decodeURIComponent(rawUrl)
    }
  } catch {
    return current
  }

  return current
}

function isWorkProjectImage(image: HTMLImageElement): boolean {
  if (image.dataset.lightboxIgnore === 'true') return false
  if (image.closest('.site-nav')) return false

  const src = resolvePreviewSrc(image)
  if (!src) return false

  return src.includes('/Portfolio Assets/Work/') || src.includes('/Portfolio%20Assets/Work/')
}

function getEventImage(target: HTMLElement): HTMLImageElement | null {
  const image = target.closest('img') as HTMLImageElement | null

  if (!image) return null
  if (!isWorkProjectImage(image)) return null

  return image
}

export default function WorkImageLightbox({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [preview, setPreview] = useState<PreviewImage | null>(null)
  const [hoverPreview, setHoverPreview] = useState<HoverPreview | null>(null)
  const isProjectPage = useMemo(
    () => Boolean(pathname && pathname.startsWith('/work/') && pathname !== '/work'),
    [pathname]
  )

  useEffect(() => {
    if (!preview) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreview(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [preview])

  useEffect(() => {
    const clearHover = () => setHoverPreview(null)

    window.addEventListener('scroll', clearHover, true)
    window.addEventListener('resize', clearHover)

    return () => {
      window.removeEventListener('scroll', clearHover, true)
      window.removeEventListener('resize', clearHover)
    }
  }, [])

  const handleCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isProjectPage) return

    const target = event.target as HTMLElement
    const image = getEventImage(target)
    if (!image) return

    const src = resolvePreviewSrc(image)
    if (!src) return

    const withinLink = image.closest('a')
    if (withinLink) {
      event.preventDefault()
    }

    setPreview({
      src,
      alt: image.alt || 'Project image preview',
    })
  }

  const handlePointerMoveCapture = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isProjectPage || preview) {
      setHoverPreview(null)
      return
    }

    if (event.pointerType && event.pointerType !== 'mouse') {
      setHoverPreview(null)
      return
    }

    const target = event.target as HTMLElement
    const image = getEventImage(target)

    if (!image) {
      setHoverPreview(null)
      return
    }

    const rect = image.getBoundingClientRect()
    if (rect.width < 140 || rect.height < 90) {
      setHoverPreview(null)
      return
    }

    const src = resolvePreviewSrc(image)
    const id = `${src}-${Math.round(rect.top)}-${Math.round(rect.left)}-${Math.round(rect.width)}-${Math.round(rect.height)}`

    setHoverPreview((prev) => {
      if (prev?.id === id) return prev
      return {
        id,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }
    })
  }

  return (
    <div
      className={`work-lightbox-root ${isProjectPage ? 'is-project-page' : ''}`}
      onClickCapture={handleCapture}
      onPointerMoveCapture={handlePointerMoveCapture}
      onPointerLeave={() => setHoverPreview(null)}
    >
      {children}

      {hoverPreview && !preview ? (
        <div
          className="project-image-hover-overlay"
          style={{
            top: hoverPreview.top,
            left: hoverPreview.left,
            width: hoverPreview.width,
            height: hoverPreview.height,
          }}
          aria-hidden
        >
          <span className="project-image-hover-label">Preview</span>
        </div>
      ) : null}

      {preview ? (
        <div className="project-lightbox-overlay" role="dialog" aria-modal="true" onClick={() => setPreview(null)}>
          <div className="project-lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img
              src={preview.src}
              alt={preview.alt}
              className="project-lightbox-image"
              onClick={() => setPreview(null)}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
