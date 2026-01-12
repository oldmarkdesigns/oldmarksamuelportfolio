'use client'

import Link from 'next/link'

const experience = [
  {
    id: 'mymedicaldata',
    company: 'My Medical Data | Hälsa+',
    role: 'UX & UI Design Intern',
    period: 'Jan 2025 - Present',
    link: '/work/mymedicaldata',
    description: "I am doing an internship at My Medical Data, where I am designing and planning a new mobile app called Hälsa+ focused on health. As the only designer on the team, my role is to provide UX and UI solutions while also acting as a bridge between development, design, and stakeholders.\n\nWhen I joined, there was already a demo app built from scratch, but it had room for both UX and UI improvements. This experience has been very insightful, and I have expanded my skills by taking on new tasks and challenges that I hadn't faced before.",
  },
  {
    id: 'bontouch',
    company: 'Bontouch',
    role: 'UI Design Intern',
    period: 'Nov 2023 - May 2024',
    link: '/work/bontouch',
    description: "I completed my five-month internship at Bontouch in Stockholm two months ago, which was a part of my education. My main focus was on UI design, though I was also involved in UX work.\n\nDuring my internship at Bontouch, I had the opportunity to work with a real product and participate in client meetings. I collaborated with experienced designers and developers, gaining a deeper understanding of all aspects related to a digital product, as well as how collaboration between different skill sets can be executed.",
  },
]

const education = [
  {
    id: 'chas',
    school: 'Chas Academy',
    program: 'UX/UI Design with Frontend Competence',
    period: 'Sep 2022 - June 2024',
    description: "At Chas Academy, I completed a two-year program in UX/UI Design with Frontend Competence, which included a 5-month internship. Through this program, I gained hands-on experience working as a product designer across various areas. The course's frontend development component supported my long-term goal of becoming a well-rounded product designer.\n\nThe program covered:\n\n• Frontend Development with React\n• A 5-month internship\n• Interaction Design\n• UI/UX Design\n• IT Tech and Operations\n• Project Management\n• Agile work methods",
  },
]

export default function Journey() {
  return (
    <section id="journey" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-12">
          {/* Experience Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-shrink-0 md:w-32">
              <h3 className="text-xl md:text-2xl font-serif font-medium text-white">Experience</h3>
            </div>
            <div className="flex-1 space-y-8">
              {experience.map((item) => (
                <div key={item.id}>
                  <Link
                    href={item.link}
                    className="block mb-2"
                  >
                    <h4 className="text-lg md:text-xl font-bold text-white hover:text-gray-300 transition-colors">
                      {item.role} – {item.company}
                    </h4>
                  </Link>
                  
                  <p className="text-sm md:text-base mb-3" style={{ color: '#60A5FA' }}>
                    {item.period}
                  </p>
                  
                  <div className="text-white leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-shrink-0 md:w-32">
              <h3 className="text-xl md:text-2xl font-serif font-medium text-white">Education</h3>
            </div>
            <div className="flex-1 space-y-8">
              {education.map((item) => (
                <div key={item.id}>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                    {item.program} – {item.school}
                  </h4>
                  
                  <p className="text-sm md:text-base mb-4" style={{ color: '#60A5FA' }}>
                    {item.period}
                  </p>
                  
                  <div className="text-white leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
