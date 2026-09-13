'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const TOOL_LOGOS = [
  { id: 'claude', src: '/Portfolio Assets/Tool Icons/claude.png', alt: 'Claude', left: 45, top: 45, contain: false, width: 140, height: 140 },
  { id: 'chatgpt', src: '/Portfolio Assets/Tool Icons/chatgpt.png', alt: 'ChatGPT', left: 78, top: 28, contain: false, width: 140, height: 140 },
  { id: 'codex', src: '/Portfolio Assets/Tool Icons/codex.png', alt: 'Codex', left: 82, top: 68, contain: false, width: 140, height: 140 },
  { id: 'cursor', src: '/Portfolio Assets/Tool Icons/cursor.png', alt: 'Cursor', left: 14, top: 58, contain: false, width: 140, height: 140 },
  { id: 'goldfish', src: '/Portfolio Assets/Tool Icons/goldfish_logo.png', alt: 'Goldfish', left: 24, top: 16, contain: true, width: 140, height: 94 },
] as const

const NEARBY_RADIUS = 42
const PUSH_FACTOR = 0.5
const MAX_PUSH = 5
const SPRING = { type: 'spring' as const, stiffness: 350, damping: 20 }

function getPushedPosition(tool: { id: string; left: number; top: number }, hovered: (typeof TOOL_LOGOS)[number] | undefined) {
  if (!hovered || hovered.id === tool.id) return { left: tool.left, top: tool.top }
  const dx = tool.left - hovered.left
  const dy = tool.top - hovered.top
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist === 0 || dist >= NEARBY_RADIUS) return { left: tool.left, top: tool.top }
  const push = Math.min((NEARBY_RADIUS - dist) * PUSH_FACTOR, MAX_PUSH)
  return { left: tool.left + (dx / dist) * push, top: tool.top + (dy / dist) * push }
}

export default function AboutSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const hoveredLogo = TOOL_LOGOS.find((t) => t.id === hoveredTool)
  const clusterRef = useRef<HTMLDivElement>(null)
  const [clusterSize, setClusterSize] = useState(192)

  useEffect(() => {
    const el = clusterRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setClusterSize(entry.contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 ref={sectionRef} className={`text-xl md:text-2xl font-serif font-medium mb-8 text-white transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>About me</h2>
        
        <div ref={contentRef} className={`transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="about-intro-card relative overflow-hidden rounded-2xl p-4 sm:p-5 md:p-6">
            <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
              <div className="space-y-3">
                <div className="about-profile-frame relative overflow-hidden rounded-xl">
                  <Image
                    src="/Portfolio Assets/ProfilePicLarge-2026.png"
                    alt="Samuel Oldmark"
                    width={400}
                    height={600}
                    className="object-cover w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                  <div className="about-profile-meta pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <p className="about-profile-name text-sm font-medium">Product Designer</p>
                    <p className="about-profile-location text-xs mt-0.5">Stockholm, Sweden</p>
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <p className="about-kicker text-xs uppercase tracking-[0.18em] mb-3">Who I am</p>
                <h3 className="about-headline text-2xl md:text-3xl font-serif font-medium leading-tight mb-4">
                  I design calm, high-trust experiences for complex products.
                </h3>
                <p className="about-summary text-base leading-relaxed mb-5">
                  I focus on turning high-stakes product complexity into clear decisions, clear interfaces, and shipped outcomes.
                </p>

                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="about-chip px-3 py-1 rounded-full text-xs font-medium">
                    Trust-critical products
                  </span>
                  <span className="about-chip px-3 py-1 rounded-full text-xs font-medium">
                    UX + UI + Frontend
                  </span>
                  <span className="about-chip px-3 py-1 rounded-full text-xs font-medium">
                    Open to new role
                  </span>
                  <span className="about-chip px-3 py-1 rounded-full text-xs font-medium">
                    Problem framing to shipped UI
                  </span>
                  <span className="about-chip px-3 py-1 rounded-full text-xs font-medium">
                    Fast, decisive execution
                  </span>
                  <span className="about-chip px-3 py-1 rounded-full text-xs font-medium">
                    React / TypeScript / Tailwind
                  </span>
                </div>
              </div>
            </div>

            <div className="about-story relative mt-6 pt-6 space-y-4">
              <p className="about-story-text text-base leading-relaxed [text-wrap:pretty]">
                I&apos;m Samuel Oldmark, a product designer based in Stockholm focused on digital
                products where trust, clarity, and usability directly impact business results. I
                design end-to-end experiences across web and mobile, from problem framing and user
                flows to interface design and shipped implementation.
              </p>

              <p className="about-story-text text-base leading-relaxed [text-wrap:pretty]">
                I currently run my own agency, Oldmark Studio, where I work with multiple clients
                across different sectors. My work spans UX and UI design, design systems, websites,
                digital products, frontend development, and AI-assisted solutions. Working across
                varied projects has made me comfortable taking broad ownership, adapting quickly,
                and turning early ideas into polished, working experiences.
              </p>

              <p className="about-story-text text-base leading-relaxed [text-wrap:pretty]">
                I&apos;m currently looking for a product design role where I can lead meaningful
                product work, raise design quality, and help a strong team ship better outcomes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-800 border-gray-300 border-r-0 border-b-0 border-l-0">
          <h3 className="text-xl md:text-2xl font-serif font-medium mb-8 text-white">Skills & Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* UX Design Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">UX Design</h4>
              <div className="flex flex-col gap-3">
                {/* Figma */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <Image
                    src="/Portfolio Assets/Tool Icons/figma.png"
                    alt="Figma"
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Figma</span>
                </div>
                
                {/* Research */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Research</span>
                </div>
                
                {/* Prototyping */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Prototyping</span>
                </div>
                
                {/* User testing */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-white text-sm font-medium">User testing</span>
                </div>
                
                {/* EAA / WCAG 2.2 */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-white text-sm font-medium">EAA / WCAG 2.2</span>
                </div>
              </div>
            </div>
            
            {/* Frontend Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">Frontend</h4>
              <div className="flex flex-col gap-3">
                {/* HTML */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#E34F26">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L3.736 4.41l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">HTML</span>
                </div>
                
                {/* CSS / Tailwind */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#1572B6">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L3.736 4.41l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">CSS / Tailwind</span>
                </div>
                
                {/* JavaScript / TypeScript */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#F7DF1E">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.57 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.755 4.096 1.665 5.046 1.005.99-.695 1.155-1.815 1.005-2.835-.15-.915-.525-1.38-1.005-1.755-.48-.39-1.05-.585-1.47-.42-.36.15-.585.39-.705.75-.24.66-.165.915.045 1.14.24.24.75.36 1.2.24 1.14-.36 1.755-1.14 1.755-2.205 0-1.14-.75-1.755-1.755-2.205-.99-.42-2.34-.585-3.36-.36l-1.14.21c-1.14.24-1.965.78-2.34 1.755-.75 1.755-.24 4.185 1.14 5.046.99.6 2.34.75 3.36.36.99-.36 1.755-1.14 2.205-2.205.24-.66.36-1.38.24-2.205z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Javascript / Typescript</span>
                </div>
                
                {/* React */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#61DAFB">
                    <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(-60 12 12)"/>
                  </svg>
                  <span className="text-white text-sm font-medium">React</span>
                </div>
                
                {/* Git */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <svg className="w-5 h-5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Git</span>
                </div>
              </div>
            </div>
            
            {/* Web Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-lg">Web</h4>
              <div className="flex flex-col gap-3">
                {/* Framer */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <Image
                    src="/Portfolio Assets/Tool Icons/framer.png"
                    alt="Framer"
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Framer</span>
                </div>
                
                {/* Webflow */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <Image
                    src="/Portfolio Assets/Tool Icons/webflow.png"
                    alt="Webflow"
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Webflow</span>
                </div>
                
                {/* WordPress */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <Image
                    src="/Portfolio Assets/Tool Icons/wordpress.png"
                    alt="WordPress"
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">WordPress</span>
                </div>
                
                {/* Cursor */}
                <div className="flex items-center gap-3 px-4 py-2.5 border border-gray-700/50 rounded-2xl">
                  <Image
                    src="/Portfolio Assets/Tool Icons/cursor.png"
                    alt="Cursor"
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-white text-sm font-medium">Cursor</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Tools Section */}
          <div className="mt-8 px-5 pt-5 pb-8 border border-gray-700/50 rounded-2xl">
            <h4 className="font-semibold mb-5 text-white text-lg">AI Tools & How I Use Them</h4>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,220px)_1fr] gap-6 md:gap-5 items-center">
              {/* Tool logos — organic cluster, centered in the column */}
              <div ref={clusterRef} className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
                {TOOL_LOGOS.map((tool) => {
                  const isHovered = hoveredTool === tool.id
                  const pos = getPushedPosition(tool, hoveredLogo)
                  const pushX = ((pos.left - tool.left) / 100) * clusterSize
                  const pushY = ((pos.top - tool.top) / 100) * clusterSize
                  return (
                    <div
                      key={tool.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${tool.left}%`, top: `${tool.top}%`, zIndex: isHovered ? 20 : 10 }}
                      onMouseEnter={() => setHoveredTool(tool.id)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      <motion.div
                        animate={{ x: pushX, y: pushY }}
                        transition={SPRING}
                      >
                        <motion.span
                          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg"
                          initial={false}
                          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          {tool.alt}
                        </motion.span>
                        <motion.div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shadow-lg${tool.contain ? ' bg-white flex items-center justify-center p-1' : ''}`}
                          animate={{ scale: isHovered ? 1.18 : 1 }}
                          transition={SPRING}
                        >
                          <Image
                            src={tool.src}
                            alt={tool.alt}
                            width={tool.width}
                            height={tool.height}
                            quality={90}
                            className={tool.contain ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>

              {/* Corresponding text */}
              <div className="md:border-l md:border-gray-700/50 md:pl-8">
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">How I Use Them</p>
                <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside [text-wrap:pretty]">
                  <li>Quickly build and iterate on web app prototypes</li>
                  <li>Explore multiple implementation approaches efficiently</li>
                  <li>Reduce time from concept to working prototype</li>
                  <li>Brainstorm UX concepts and interaction flows</li>
                  <li>Write and refine product and technical specifications</li>
                  <li>Generate and explore visual ideas and imagery during the design phase</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
