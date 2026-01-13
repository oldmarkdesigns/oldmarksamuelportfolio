'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const allWork = [
  {
    id: 'mymedicaldata',
    title: 'MyMedicalData | Hälsa+',
    description: 'Designing and planning a new mobile app focused on health. As the only designer on the team, providing UX and UI solutions while bridging development, design, and stakeholders.',
    year: '2025',
    tags: ['UX Design', 'UI Design', 'Mobile App', 'Health'],
    coverImage: '/Portfolio Assets/Work/MMD/MMDCover.png',
    href: '/work/mymedicaldata',
  },
  {
    id: 'bontouch',
    title: 'Bontouch (Framna)',
    description: 'UI Design Internship working on product design and design systems for various client projects.',
    year: '2024',
    tags: ['UI Design', 'Design System', 'Product Design'],
    coverImage: '/Portfolio Assets/Work/Bontouch/Assets/DesignSystem.png',
    href: '/work/bontouch',
  },
  {
    id: 'hypertype',
    title: 'Hypertype',
    description: 'Product design project focusing on creating an intuitive and beautiful user experience.',
    year: '2024',
    tags: ['Product Design', 'UX/UI', 'Web App'],
    coverImage: '/Portfolio Assets/Work/Hypertype/Wallpaper 2.png',
    href: '/work/hypertype',
  },
  {
    id: 'moments',
    title: 'Moments',
    description: 'Designing plugin interfaces and pricing pages with focus on clarity and conversion.',
    year: '2024',
    tags: ['Plugin Design', 'Pricing', 'UI Design'],
    coverImage: '/Portfolio Assets/Work/Moments/Plugin.png',
    href: '/work/moments',
  },
  {
    id: 'djungelbyran',
    title: 'Djungelbyrån',
    description: 'Brand identity and web design project creating a cohesive visual language.',
    year: '2024',
    tags: ['Branding', 'Web Design', 'Identity'],
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
    <div ref={workRef} className={`transition-all duration-700 ${workVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <Link
        href={work.href}
        className="group block"
      >
              <div className="flex flex-col md:flex-row gap-6 items-stretch bg-gray-800/20 border border-gray-700/30 rounded-2xl p-6 hover:border-gray-600/50 transition-all">
                {/* Image */}
                <div className={`relative w-full md:w-1/3 md:h-full aspect-[4/3] md:aspect-auto min-h-[200px] overflow-hidden rounded-xl flex-shrink-0 ${work.id === 'bontouch' || work.id === 'moments' ? 'bg-gray-950' : 'bg-gray-900'}`}>
                  <Image
                    src={work.coverImage}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-gray-300 transition-colors">
                          {work.title}
                        </h3>
                        <span className="text-sm text-gray-500 font-medium">{work.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3 leading-relaxed text-sm md:text-base">
                    {work.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-gray-400 bg-gray-800/50 rounded-full border border-gray-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-5 flex items-center text-gray-400 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">View project</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  return (
    <section id="work" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div ref={sectionRef} className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className={`text-xl md:text-2xl font-serif font-medium mb-8 text-white transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Work</h2>
        
        <div className="space-y-6">
          {allWork.map((work, index) => (
            <WorkItem key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

