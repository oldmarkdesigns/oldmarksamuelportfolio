'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ExperienceEducationSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })

  return (
    <section className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div ref={sectionRef} className={`transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div ref={contentRef} className={`space-y-12 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Experience Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-shrink-0 md:w-32">
              <h3 className="text-xl md:text-2xl font-serif font-medium text-white text-gray-900">Experience</h3>
            </div>
            <div className="flex-1 space-y-8">
              <div>
                <Link
                  href="/work/mymedicaldata"
                  className="block mb-2"
                >
                  <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 hover:text-gray-300 text-gray-600 transition-colors">
                    UX & UI Design Intern – My Medical Data | Hälsa+
                  </h4>
                </Link>
                
                <p className="text-sm md:text-base mb-3" style={{ color: '#60A5FA' }}>
                  Jan 2025 - Present
                </p>
                
                <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  I am doing an internship at My Medical Data, where I am designing and planning a new mobile app called Hälsa+ focused on health. As the only designer on the team, my role is to provide UX and UI solutions while also acting as a bridge between development, design, and stakeholders.

                  When I joined, there was already a demo app built from scratch, but it had room for both UX and UI improvements. This experience has been very insightful, and I have expanded my skills by taking on new tasks and challenges that I hadn't faced before.
                </div>
              </div>
              <div>
                <Link
                  href="/work/bontouch"
                  className="block mb-2"
                >
                  <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 hover:text-gray-300 text-gray-600 transition-colors">
                    UI Design Intern – Bontouch
                  </h4>
                </Link>
                
                <p className="text-sm md:text-base mb-3" style={{ color: '#60A5FA' }}>
                  Nov 2023 - May 2024
                </p>
                
                <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  I completed my five-month internship at Bontouch in Stockholm two months ago, which was a part of my education. My main focus was on UI design, though I was also involved in UX work. During my internship at Bontouch, I had the opportunity to work with a real product and participate in client meetings. I collaborated with experienced designers and developers, gaining a deeper understanding of all aspects related to a digital product, as well as how collaboration between different skill sets can be executed.
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-shrink-0 md:w-32">
              <h3 className="text-xl md:text-2xl font-serif font-medium text-white text-gray-900">Education</h3>
            </div>
            <div className="flex-1 space-y-8">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white text-gray-900 mb-2">
                  UX/UI Design with Frontend Competence – Chas Academy
                </h4>
                
                <p className="text-sm md:text-base mb-4" style={{ color: '#60A5FA' }}>
                  Sep 2022 - June 2024
                </p>
                
                <div className="text-white text-gray-900 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  At Chas Academy, I completed a two-year program in UX/UI Design with Frontend Competence, which included a 5-month internship. Through this program, I gained hands-on experience working as a product designer across various areas. The course's frontend development component supported my long-term goal of becoming a well-rounded product designer.

                  The program covered:

                  • Frontend Development with React
                  • A 5-month internship
                  • Interaction Design
                  • UI/UX Design
                  • IT Tech and Operations
                  • Project Management
                  • Agile work methods
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

