'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

type ResumeOption = {
  id: 'product-designer'
  label: string
  href: string
}

const RESUME_OPTIONS: ResumeOption[] = [
  {
    id: 'product-designer',
    label: 'Product Designer',
    href: '/Portfolio%20Assets/Resumes/Samuel-Oldmark-Product-Designer-CV.pdf',
  },
]

export default function ResumeDownloadButton() {
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Array<ResumeOption['id']>>(['product-designer'])
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const glassBlur = isScrolled ? 'blur(56px) saturate(185%)' : 'blur(46px) saturate(175%)'
  const glassSurfaceColor =
    theme === 'dark'
      ? isScrolled
        ? 'rgba(8, 10, 18, 0.78)'
        : 'rgba(8, 10, 18, 0.68)'
      : isScrolled
        ? 'rgba(248, 250, 252, 0.9)'
        : 'rgba(248, 250, 252, 0.82)'
  const hasSelection = selectedIds.length > 0
  const selectedCountLabel = useMemo(() => {
    if (selectedIds.length === 0) return 'No file selected'
    return `${selectedIds.length} selected`
  }, [selectedIds.length])

  const toggleOption = (id: ResumeOption['id']) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((value) => value !== id)
      }
      return [...prev, id]
    })
  }

  const handleDownload = () => {
    const selectedOptions = RESUME_OPTIONS.filter((option) => selectedIds.includes(option.id))
    if (!selectedOptions.length) return

    const uniqueHrefs = Array.from(new Set(selectedOptions.map((option) => option.href)))

    for (const href of uniqueHrefs) {
      const anchor = document.createElement('a')
      anchor.href = href
      anchor.download = href.split('/').pop() || ''
      anchor.rel = 'noopener'
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    }

    setIsOpen(false)
  }

  return (
    <div ref={rootRef} className="hidden md:flex fixed top-3 right-4 z-[10002] h-[42px] items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`resume-download-trigger relative overflow-hidden inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          theme === 'dark'
            ? 'border-gray-700/40 text-gray-100 hover:text-white'
            : 'border-[rgba(209,213,219,0.72)] text-gray-800 hover:text-gray-900'
        }`}
        aria-label="Download resume"
      >
        <span
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundColor: glassSurfaceColor,
            backdropFilter: glassBlur,
            WebkitBackdropFilter: glassBlur,
          }}
          aria-hidden
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          <svg className="resume-download-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v11m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
          <span>Download resume</span>
        </span>
      </button>

      {isOpen ? (
        <div
          className={`absolute right-0 top-full mt-2 w-[290px] rounded-2xl border p-3 ${
            theme === 'dark'
              ? 'border-gray-700/50'
              : 'border-[rgba(209,213,219,0.82)]'
          }`}
          style={{
            backgroundColor: glassSurfaceColor,
            backdropFilter: glassBlur,
            WebkitBackdropFilter: glassBlur,
          }}
        >
          <div className="space-y-2">
            {RESUME_OPTIONS.map((option) => {
              const checked = selectedIds.includes(option.id)

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleOption(option.id)}
                  className={`w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors ${
                    theme === 'dark'
                      ? 'border-gray-700/60 text-gray-200 hover:border-gray-500'
                      : 'border-gray-300 text-gray-800 hover:border-gray-500'
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded border text-[10px] ${
                      checked
                        ? theme === 'dark'
                          ? 'border-blue-400 bg-blue-500/20 text-blue-200'
                          : 'border-blue-500 bg-blue-100 text-blue-700'
                        : theme === 'dark'
                          ? 'border-gray-500'
                          : 'border-gray-400'
                    }`}
                    aria-hidden
                  >
                    {checked ? '✓' : ''}
                  </span>
                </button>
              )
            })}
          </div>

          <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{selectedCountLabel}</p>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!hasSelection}
            className={`mt-3 w-full rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              hasSelection
                ? theme === 'dark'
                  ? 'bg-white text-gray-900 hover:bg-gray-200'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
                : theme === 'dark'
                  ? 'bg-gray-700/70 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Download
          </button>
        </div>
      ) : null}
    </div>
  )
}
