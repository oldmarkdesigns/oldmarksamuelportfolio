'use client'

import Image from 'next/image'
import Link from 'next/link'
import WorkPageNav from '@/components/WorkPageNav'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'ai-chat', label: 'AI Analysis Chat' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'medical-id', label: 'Medical ID' },
  { id: 'website', label: 'Building the website' },
]

export default function MyMedicalDataPage() {
  const { theme } = useTheme()
  const { ref: mainRef, isVisible: mainVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })
  const { ref: onboardingRef, isVisible: onboardingVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 200 })
  const { ref: medicalIdRef, isVisible: medicalIdVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 300 })
  const { ref: aiChatRef, isVisible: aiChatVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 400 })
  const { ref: websiteRef, isVisible: websiteVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 500 })

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-transparent relative animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="flex gap-12">
          {/* Left sidebar navigation */}
          <WorkPageNav sections={sections} />
          
          {/* Main content */}
          <div ref={mainRef} className={`flex-1 min-w-0 transition-all duration-700 ${mainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            <section ref={overviewRef} id="overview" className={`scroll-mt-20 mb-16 transition-all duration-700 ${overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-12">
              <p className="text-sm text-gray-400 text-gray-500 mb-4">About the project</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-gray-900 leading-tight">
                Product designer at MyMedicalData, designing for new app and website.
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left column - Description */}
                <div className="space-y-4">
                  <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4">
                    <p>
                      At My Medical Data, I am leading the design of Hälsa+, a health-focused mobile app, while also 
                      contributing to its development alongside the team. As the sole designer, I am responsible for UX 
                      and UI design, ensuring a seamless and engaging user experience while collaborating closely with 
                      developers and stakeholders.
                    </p>
                    <p>
                      A key part of my work has been designing an AI chat function, optimizing interactions for usability 
                      and smooth integration.
                    </p>
                    <p>
                      This role has given me valuable experience in refining digital products, problem-solving, and bridging 
                      design with development.
                    </p>
                  </div>
                </div>
                
                {/* Right column - Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Role:</p>
                    <p className="text-white text-gray-900">UX/UI Design & Frontend Development</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Company:</p>
                    <p className="text-white text-gray-900">MyMedicalData</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Period:</p>
                    <p className="text-white text-gray-900">Jan 2025 - Present</p>
                  </div>
                  <div className="pt-2">
                    <a 
                      href="https://www.mymedicaldata.se/" 
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
                src="/Portfolio Assets/Work/MMD/MMDCover.png"
                alt="My Medical Data Cover"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* Onboarding Section */}
          <section ref={onboardingRef} id="onboarding" className={`scroll-mt-20 mb-16 transition-all duration-700 ${onboardingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Onboarding Flow</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4 mb-6">
              <p>
                I redesigned the onboarding flow for our app to make it feel more familiar and intuitive, especially for 
                users coming from similar apps. The previous flow worked but felt a bit off, and the BankID login, which 
                is the main sign-in method, looked almost inactive and didn't get the attention it needed.
              </p>
              <p>
                We focused on bringing the BankID option to the forefront and aligning the overall flow with common patterns 
                users recognize. I also made sure the design still reflected our brand while feeling more in line with what 
                users expect. The result was a smoother onboarding experience that helped users get started faster and with 
                less friction.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Benchmarking to similar services</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Design of flow and UI</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Close collaboration to developers</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Cross Collaboration</span>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Previous design for onboarding</h3>
                <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                  <Image
                    src="/Portfolio Assets/Work/MMD/OldOnboarding.png"
                    alt="Previous design for onboarding"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-xl"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Updated design for onboarding</h3>
                <div className="relative w-full max-w-4xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
                  <Image
                    src="/Portfolio Assets/Work/MMD/Future Design-App-Login Flow.png"
                    alt="Updated design for onboarding"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain rounded-xl"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Medical ID Section */}
          <section ref={medicalIdRef} id="medical-id" className={`scroll-mt-20 mb-16 transition-all duration-700 ${medicalIdVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Medical ID</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4 mb-6">
              <p>
                I designed a Medical ID feature to give users quick access to important health information in emergencies. 
                Through user research I learned what details matter most and how to show them clearly and simply.
              </p>
              <p>
                In Figma I created an easy to read and edit interface focusing on accessibility with clear text and high 
                contrast colors. I worked closely with developers and tested with users to make sure the feature was reliable 
                and user friendly. The result is a Medical ID that helps users feel safer and more prepared.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Research with healthcare professionals and potential users</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Design of flow and UI</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Close collaboration to developers</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Cross Collaboration</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Research</span>
            </div>

            <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/MMD/Medical ID Flow.png"
                alt="Medical ID Flow"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </section>

          {/* AI Analysis Chat Section */}
          <section ref={aiChatRef} id="ai-chat" className={`scroll-mt-20 mb-16 transition-all duration-700 ${aiChatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">AI Analysis Chat</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4 mb-6">
              <p>
                I designed the AI chat feature to provide users with a seamless way to check their health status and 
                specific metrics by interacting with a trained model. The chat interface was crafted to feel intuitive 
                and accessible, allowing users to ask questions and receive insights based on their personal health data. 
                This included information pulled from wearable devices, medical records, and vaccination history.
              </p>
              <p>
                A key focus was ensuring clarity in responses, balancing automation with transparency so users could 
                understand the AI's recommendations and data sources. I explored different interaction models, including 
                conversational flows that guide users in refining their queries and visual elements that present key metrics 
                in an easy-to-read format. By prioritizing usability, I aimed to create a chat experience that feels both 
                intelligent and user-friendly, making health tracking more engaging and accessible.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Benchmarking to similar services</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Design of flow and UI</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Close collaboration to developers</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Cross Collaboration</span>
            </div>

            <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/MMD/ChatMockup.png"
                alt="AI Analysis Chat"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </section>

          {/* Building the website Section */}
          <section ref={websiteRef} id="website" className={`scroll-mt-20 mb-16 transition-all duration-700 ${websiteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Building the website</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4 mb-6">
              <p>
                I designed the AI chat feature to provide users with a seamless way to check their health status and 
                specific metrics by interacting with a trained model. The chat interface was crafted to feel intuitive 
                and accessible, allowing users to ask questions and receive insights based on their personal health data. 
                This included information pulled from wearable devices, medical records, and vaccination history.
              </p>
              <p>
                A key focus was ensuring clarity in responses, balancing automation with transparency so users could 
                understand the AI's recommendations and data sources. I explored different interaction models, including 
                conversational flows that guide users in refining their queries and visual elements that present key metrics 
                in an easy-to-read format. By prioritizing usability, I aimed to create a chat experience that feels both 
                intelligent and user-friendly, making health tracking more engaging and accessible.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Benchmarking to similar services</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Design of flow and UI</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Close collaboration to developers</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Cross Collaboration</span>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[900px] overflow-hidden rounded-xl group">
              <a 
                href="https://www.mymedicaldata.se/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative"
              >
                <Image
                  src="/Portfolio Assets/Work/MMD/WebsiteHero.png"
                  alt="MyMedicalData Website"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl transition-opacity group-hover:opacity-80"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                  <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-lg">Visit website</span>
                </div>
              </a>
            </div>
          </section>
          </div>
        </div>
      </div>
    </main>
  )
}
