'use client'

import Image from 'next/image'
import Link from 'next/link'
import WorkPageNav from '@/components/WorkPageNav'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'app-reviews', label: 'App Reviews' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'design-system', label: 'Design System' },
]

export default function BontouchPage() {
  const { theme } = useTheme()
  const { ref: appReviewsRef, isVisible: appReviewsVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })
  const { ref: onboardingRef, isVisible: onboardingVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 200 })
  const { ref: designSystemRef, isVisible: designSystemVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 300 })

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-transparent relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left sidebar navigation */}
          <WorkPageNav sections={sections} />
          
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <Link
              href="/#work"
              className={`inline-flex items-center gap-2 mb-8 transition-colors ${
                theme === 'light'
                  ? 'text-gray-500 hover:text-gray-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ← Back to Work
            </Link>
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-20 mb-16">
            <div className="mb-12">
              <p className="text-sm text-gray-400 text-gray-500 mb-4">About the project</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-gray-900 leading-tight">
                Bontouch (Framna)
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left column - Description */}
                <div className="space-y-4">
                  <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4">
                    <p>
                      To summarize my 5-month internship at Bontouch, I've assembled a curated selection of projects I contributed to during my time there. My main responsibilities included organizing design systems and identifying areas for improvement, rebuilding app flows to incorporate the latest components and ensure visual consistency, performing quality assurance, and participating in live user testing sessions.
                    </p>
                    <p>
                      During my time developing apps for this state-owned company, I focused primarily on UI design and various UX tasks like user testing. I was fortunate to have a mentor who shared valuable design knowledge, guiding my growth throughout the internship.
                    </p>
                    <p>
                      As my internship concluded, I updated and enhanced the design of "Måttfull" (formerly promillekollen), applying my skills to propose user engagement improvements.
                    </p>
                  </div>
                </div>
                
                {/* Right column - Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Role:</p>
                    <p className="text-white text-gray-900">UX/UI Design</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Company:</p>
                    <p className="text-white text-gray-900">Bontouch</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Period:</p>
                    <p className="text-white text-gray-900">Nov 2023 - May 2024</p>
                  </div>
                  <div className="pt-2">
                    <a 
                      href="https://www.bontouch.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-block px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                        theme === 'light'
                          ? 'border border-gray-300 hover:border-gray-600 text-gray-900 hover:bg-gray-200/50 hover:text-gray-800'
                          : 'border border-gray-600 hover:border-gray-500 text-white hover:bg-gray-700/20 hover:text-gray-200'
                      }`}
                    >
                      Visit website
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl mb-12">
              <Image
                src="/Portfolio Assets/Work/Bontouch/Assets/DesignSystem.png"
                alt="Bontouch Cover"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* App Reviews Section */}
          <section ref={appReviewsRef} id="app-reviews" className={`scroll-mt-20 mb-16 transition-all duration-700 ${appReviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">App Reviews</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
              <p>
                I had the chance to lead the design for adding in-app reviews on both iOS and Android. This idea came from noticing low ratings on the App Store, which showed the need for better ways to gather user feedback. To prepare, I looked into how other teams had added in-app reviews and found that it helped them get higher ratings and more useful feedback.
              </p>
              <p>
                The biggest challenge was getting approval from senior client stakeholders. After gathering strong data and giving an informative presentation, I got their support, and we moved forward with the project. Since the update, the app's rating has improved, showing that this change helped us reach our goal of better feedback and higher ratings.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Benchmarking and talking to other product teams</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Design of flow and UI</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Presentation to Stakeholders</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Cross Collaboration</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">User testing</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Keynote</span>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">User testing & results</h3>
              <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
                <p>
                  To determine the design and flow for the in-app review process, I collaborated with the product owner, discussed technical challenges with developers, and worked with the UX designer to decide where the review modal should appear. I conducted an internal user test at Bontouch to gather insights on how other teams approached the review flow. After implementation, results have shown a significant positive impact, though other factors have also influenced the app's rating.
                </p>
              </div>
              <div className="bg-gray-800/20 border border-gray-700/50 border-gray-300/70 rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-white text-gray-900 mb-2">4.7*</div>
                <p className="text-gray-600 dark:text-gray-200 text-sm">
                  Over the past 5 months, the app's rating increased from 2.4 to 4.7, reflecting an 88.5% improvement.
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl mb-6">
              <Image
                src="/Portfolio Assets/Work/Bontouch/Assets/App Rating.png"
                alt="App Rating"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Bontouch/Assets/IMG_5109.PNG"
                  alt="Bontouch Work 1"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
              </div>
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Bontouch/Assets/IMG_5110.PNG"
                  alt="Bontouch Work 2"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
              </div>
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Bontouch/Assets/IMG_5111.PNG"
                  alt="Bontouch Work 3"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
              </div>
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Bontouch/Assets/IMG_5134.PNG"
                  alt="Bontouch Work 4"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
              </div>
            </div>
          </section>

          {/* Onboarding Section */}
          <section ref={onboardingRef} id="onboarding" className={`scroll-mt-20 mb-16 transition-all duration-700 ${onboardingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">App Onboarding Flow</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
              <p>
                One of the major projects I worked on for the main app was redesigning the onboarding flow. User feedback had shown that the previous onboarding was difficult to understand and had poor readability. Additionally, a new feature needed to be integrated into the onboarding, allowing users to place orders for pickup at a store directly through the app.
              </p>
              <p>
                The goal of this project was to make the experience more accessible and to understand the specific pain points that made the original onboarding feel overwhelming and hard to read. Through prototype testing and live user interviews, I gathered valuable feedback. Working closely with the senior UX designer, I led the design of the new onboarding flow. The results were promising, 5 out of 6 users reported that they clearly remembered the information presented in the updated onboarding.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Understand user needs</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Conduct and perform live user interviews</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Presentation to Stakeholders and Bontouch</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Implementation in app</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Cross Collaboration</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Useberry</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Interview Sessions</span>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Interview Process & results</h3>
              <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
                <p>
                  Together with the UX Designer on the team, we gathered six participants to conduct live interviews. Part of the testing sessions involved reviewing the onboarding process and collecting user feedback on the flow, readability, and content retention. After analyzing the feedback and redesigning the onboarding flow to reflect user insights, we observed a significant improvement in readability and overall user experience. See the key results below after revision of the flow:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/20 border border-gray-700/50 border-gray-300/70 rounded-xl p-6">
                  <div className="text-3xl font-bold text-white text-gray-900 mb-2">83%</div>
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
                    Users experienced improved readability and were able to recall almost all of the information presented in the onboarding after completion. This represented a 66% increase in effectiveness compared to the experience before the flow revision.
                  </p>
                </div>
                <div className="bg-gray-800/20 border border-gray-700/50 border-gray-300/70 rounded-xl p-6">
                  <div className="text-3xl font-bold text-white text-gray-900 mb-2">100%</div>
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
                    Reported that they thought that the amount of content and the information presented were helpful and not overwhelming, resulting in a 100% increase compared to before the flow revision
                  </p>
                </div>
                <div className="bg-gray-800/20 border border-gray-700/50 border-gray-300/70 rounded-xl p-6">
                  <div className="text-3xl font-bold text-white text-gray-900 mb-2">4/6</div>
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
                    Users were able to recall all the information presented in the onboarding, which was a significant improvement compared to the previous model.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/Bontouch/Assets/Onboarding.png"
                alt="Onboarding"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </section>

          {/* Design System Section */}
          <section ref={designSystemRef} id="design-system" className={`scroll-mt-20 mb-16 transition-all duration-700 ${designSystemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Restructure and Improve Design System</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
              <p>
                As my internship was coming to an end, I was assigned a final project to demonstrate what I had learned at Bontouch. This project involved restructuring the design library and creating new components for the app called "Måttfull." Additionally, I was encouraged to propose a new design for the entire app to align more closely with the main app and adhere to brand guidelines. The design of this app had not been updated in a while, so features like nested instances and auto layout were not implemented anywhere.
              </p>
              <p>
                The screens below are the views where I proposed the new design. The most significant changes, not only for this view but overall, included updates to colors and fonts, as well as adjustments to UX considerations.
              </p>
              <p>
                As I mentioned earlier, no auto layout or nested instances were applied to any of the old components. Working on this project allowed me to learn more about nested instances. Eventually, I began building larger components with nested smaller components.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Build and effectively make use of components</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Restructure and improve design system</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Streamline design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Presentation to Stakeholders and Product Team</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Design System</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Streamline</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Figma Components</span>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/Bontouch/Assets/DesignSystem.png"
                alt="Design System"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>
          </div>
        </div>
      </div>
    </main>
  )
}
