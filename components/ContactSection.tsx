'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const email = 'samuel@oldmark.se'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-xl md:text-2xl font-serif font-medium mb-4 text-white">Contact</h2>
        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-md mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-2">Email me at</p>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${email}`}
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              {email}
            </a>
            <button
              onClick={copyToClipboard}
              className="p-1.5 text-gray-400 hover:text-gray-300 transition-colors"
              aria-label="Copy email to clipboard"
            >
              {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

