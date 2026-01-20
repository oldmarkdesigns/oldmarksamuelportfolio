'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const allWork = [
  {
    id: 'mymedicaldata',
    title: 'Hälsa+',
    description: 'Designing Hälsa+, a health-focused mobile app, as the sole product designer on the team.',
    year: '2025',
    tags: ['UX Design', 'UI Design', 'Mobile App', 'Health'],
    projectTag: 'Contract',
    coverImage: '/Portfolio Assets/Work/MMD/MMDCover.png',
    href: '/work/mymedicaldata',
  },
  {
    id: 'bontouch',
    title: 'Bontouch (Framna)',
    description: 'UI Design Internship working on product design and design systems for various client projects.',
    year: '2024',
    tags: ['UI Design', 'Design System', 'Product Design'],
    projectTag: 'Internship',
    coverImage: '/Portfolio Assets/Work/Bontouch/Assets/Bontouch Background Cover.png',
    href: '/work/bontouch',
  },
  {
    id: 'zanlugproperties',
    title: 'Zanlüg Properties',
    description: 'Designing a luxury property showcase website connecting travelers with exclusive retreats.',
    year: '2026',
    tags: ['Web Design', 'Luxury Branding', 'Property Showcase'],
    projectTag: 'Contract',
    coverImage: '/Portfolio Assets/Work/Zanlug Properties/zanlug-work-thumbnail.png',
    href: '/work/zanlugproperties',
  },
  {
    id: 'hypertype',
    title: 'Hypertype',
    description: 'Product design project focusing on creating an intuitive and beautiful user experience.',
    year: '2024',
    tags: ['Product Design', 'UX/UI', 'Web App'],
    projectTag: 'Case',
    coverImage: '/Portfolio Assets/Work/Hypertype/Wallpaper 2.png',
    href: '/work/hypertype',
  },
  {
    id: 'moments',
    title: 'Moments',
    description: 'Designing plugin interfaces and pricing pages with focus on clarity and conversion.',
    year: '2024',
    tags: ['Plugin Design', 'Pricing', 'UI Design'],
    projectTag: 'Concept',
    coverImage: '/Portfolio Assets/Work/Moments/Plugin.png',
    href: '/work/moments',
  },
  {
    id: 'djungelbyran',
    title: 'Djungelbyrån',
    description: 'Brand identity and web design project creating a cohesive visual language.',
    year: '2022',
    tags: ['Branding', 'Web Design', 'Identity'],
    projectTag: 'Contract',
    coverImage: '/Portfolio Assets/Work/Djungelbyran/Work Cover.png',
    href: '/work/djungelbyran',
  },
]

function WorkItem({ work, index }: { work: typeof allWork[0], index: number }) {
  const { ref: workRef, isVisible: workVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    triggerOnce: true,
    delay: index * 100
  })

  return (
    <div
      ref={workRef}
      className={`h-full transition-all duration-700 ${
        workVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Link href={work.href} className="group block h-full">
        <div className="flex h-full flex-col bg-gray-800/20 border border-gray-700/30 rounded-2xl p-4 md:p-5 hover:border-gray-600/50 transition-all relative">
          {/* Project Tag - Upper Right */}
          {work.projectTag && (
            <div className="absolute top-5 right-5 md:top-6 md:right-6 z-10">
              <span className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-800/90 rounded-full border border-gray-600/70">
                {work.projectTag}
              </span>
            </div>
          )}

          {/* Image */}
          <div
            className={`relative w-full aspect-[16/10] min-h-[160px] overflow-hidden rounded-xl ${
              work.id === 'bontouch' || work.id === 'moments' ? 'bg-gray-950' : 'bg-gray-900'
            }`}
          >
            <Image
              src={work.coverImage}
              alt={work.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col mt-3">
            <div className="mb-1.5">
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
                  {work.title}
                </h3>
                <span className="text-sm text-gray-500 font-medium">{work.year}</span>
              </div>
            </div>

            <p className="text-gray-300 mb-3 leading-relaxed text-sm">
              {work.description}
            </p>

            <div className="mt-3 flex items-center text-gray-400 group-hover:text-white transition-colors">
              <span className="text-sm font-medium">View project</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function WorkSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { theme } = useTheme()
  const [showAllWork, setShowAllWork] = useState(false)

  const featuredWork = allWork.filter((work) => work.id === 'mymedicaldata' || work.id === 'bontouch')
  const moreWork = allWork.filter((work) => work.id !== 'mymedicaldata' && work.id !== 'bontouch')

  return (
    <section id="work" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div ref={sectionRef} className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className={`text-xl md:text-2xl font-serif font-medium mb-8 text-white transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Selected work</h2>
        
        {/* Featured work (always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {featuredWork.map((work, index) => (
            <WorkItem key={work.id} work={work} index={index} />
          ))}
        </div>

        {/* Additional work (collapsible with smooth animation) */}
        {moreWork.length > 0 && (
          <div
            className={`mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 overflow-hidden transition-all duration-500 ${
              showAllWork
                ? 'max-h-[2000px] opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {moreWork.map((work, index) => (
              <WorkItem key={work.id} work={work} index={featuredWork.length + index} />
            ))}
          </div>
        )}

        {/* Toggle for additional work (always below all cards) */}
        {moreWork.length > 0 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowAllWork((prev) => !prev)}
              className={`mx-auto flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
                theme === 'light'
                  ? 'border border-gray-300 hover:border-gray-600 text-gray-900 hover:bg-gray-200/50 hover:text-gray-800'
                  : 'border border-gray-600 hover:border-gray-500 text-white hover:bg-gray-700/20 hover:text-gray-200'
              }`}
            >
              <span>{showAllWork ? 'Show less work' : 'Show all work'}</span>
              <svg
                className={`h-4 w-4 transform transition-transform ${showAllWork ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

