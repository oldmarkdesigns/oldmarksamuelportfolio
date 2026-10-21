'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import './WorkSection.css'

const allWork = [
  {
    id: 'office-rental-platform',
    title: 'Office rental platform',
    description: 'Building a self-serve marketplace for renting commercial space in Stockholm — owning the business case, product design, React frontend and Convex backend.',
    year: '2026',
    tags: ['Product Strategy', 'UX/UI', 'Full-Stack Build', 'Marketplace'],
    projectTag: 'Personal side project',
    coverImage: '/Portfolio Assets/Work/LOA/loa-card.jpg',
    href: '/work/office-rental-platform',
  },
  {
    id: 'seb',
    title: 'SEB',
    description: 'A self-directed fintech UX analysis of transaction search and filtering in SEB’s mobile banking app, benchmarked against Klarna.',
    year: '2026',
    tags: ['Fintech', 'UX Analysis', 'Product Design', 'Mobile App'],
    projectTag: 'Case study',
    coverImage: '/Portfolio Assets/Work/SEB_Case_Study/seb_logo.png',
    href: '/work/seb',
  },
  {
    id: 'bontouch',
    title: 'Framna (earlier Bontouch)',
    description: 'UI Design Internship working on product design and design systems for various client projects.',
    year: '2024',
    tags: ['UI Design', 'Design System', 'Product Design'],
    projectTag: 'Internship',
    coverImage: '/Portfolio Assets/Work/Bontouch/Assets/Bontouch Background Cover.png',
    href: '/work/bontouch',
  },
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
    id: 'hemma',
    title: 'Hemma',
    description: 'A Swedish-first iPhone app that keeps a home’s log, documents and costs in one place. Designed and built in SwiftUI, still in development.',
    year: '2026',
    tags: ['Product Design', 'UX/UI', 'iOS App'],
    projectTag: 'Personal project',
    coverImage: '/Portfolio Assets/Work/Hemma/hemma-card.jpg',
    href: '/work/hemma',
  },
  {
    id: 'oldmarkstudio',
    title: 'Oldmark Studio',
    description: 'My own design & development agency for founders and product teams who need digital work done well.',
    year: '2024',
    tags: ['Agency', 'Web Design', 'Web Development'],
    projectTag: 'Agency',
    coverImage: '/Portfolio Assets/Work/Oldmark Studio/oldmark-studio-thumbnail-photo.jpg',
    href: '/work/oldmarkstudio',
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
  const { theme } = useTheme()
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
              <span className="work-pill">
                {work.projectTag}
              </span>
            </div>
          )}

          {/* Image */}
          <div
            className={`relative w-full aspect-[16/10] min-h-[160px] overflow-hidden rounded-xl ${
              work.id === 'bontouch' || work.id === 'moments' || work.id === 'hemma'
                ? 'bg-gray-950'
                : 'bg-gray-900'
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

  const visibleWork = allWork.filter(
    (work) =>
      work.id !== 'zanlugproperties' &&
      work.id !== 'moments' &&
      work.id !== 'djungelbyran'
  )

  return (
    <section id="work" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-4">
        <h2 className={`text-xl md:text-2xl font-serif font-medium mb-8 text-white transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Selected work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {visibleWork.map((work, index) => (
            <WorkItem key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
