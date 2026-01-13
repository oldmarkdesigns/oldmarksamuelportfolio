'use client'

import Image from 'next/image'
import Link from 'next/link'
import WorkPageNav from '@/components/WorkPageNav'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'get-started', label: 'Get Started' },
  { id: 'feed-brain', label: 'Feed Brain' },
  { id: 'help-center', label: 'Help Center' },
  { id: 'subscription', label: 'Subscription' },
]

export default function HypertypePage() {
  const { theme } = useTheme()
  const { ref: dashboardRef, isVisible: dashboardVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })
  const { ref: getStartedRef, isVisible: getStartedVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 200 })
  const { ref: feedBrainRef, isVisible: feedBrainVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 300 })
  const { ref: helpCenterRef, isVisible: helpCenterVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 400 })
  const { ref: subscriptionRef, isVisible: subscriptionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 500 })

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
                Redesigned Hypertype.ai's onboarding and dashboard to boost paid conversions.
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left column - Description */}
                <div className="space-y-4">
                  <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4">
                    <p>
                      I was given a design challenge to redesign the onboarding flow and dashboard welcome page of Hypertype.ai to increase paid conversions. I identified friction points in the user journey and proposed a more streamlined onboarding experience, along with a clearer, value-driven dashboard layout to guide users toward key features and upgrade actions.
                    </p>
                    <p>
                      Using Figma, we would like you to redesign the onboarding flow or dashboard welcome page of Hypertype.ai with the aim of increasing paid conversions. Create the redesigned onboarding flow or dashboard welcome page.
                    </p>
                    <p>
                      Expected Outcome: The redesigned onboarding or dashboard welcome page should be intuitive, engaging, and optimized for converting free users into paid customers.
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
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Period:</p>
                    <p className="text-white text-gray-900">November 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl mb-12">
              <Image
                src="/Portfolio Assets/Work/Hypertype/Hypertype Pre.png"
                alt="Hypertype Preview"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* Dashboard Section */}
          <section ref={dashboardRef} id="dashboard" className={`scroll-mt-20 mb-16 transition-all duration-700 ${dashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Redesigning the dashboard</h2>
            <div className="text-gray-200 text-gray-700 leading-relaxed space-y-4 mb-6">
              <p>
                I chose to design the welcome page for the dashboard because, after reviewing both options, I found that I had more ideas for improving the dashboard. As a first-time user of both flows, I noticed more areas for enhancement in the dashboard, making it the clear choice for restructuring.
              </p>
              <p>
                My first impression of the dashboard's welcome page was that, in terms of user experience, the purpose of the initial questions was unclear. While I appreciate the idea of immersing users directly into the service, I saw an opportunity to improve the flow by providing context for these questions. This led me to design a segue into the questionnaire on the user dashboard, giving users a clearer sense of direction.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">LoFi design</h3>
              <div className="text-gray-200 text-gray-700 leading-relaxed space-y-4 mb-6">
                <p>
                  I began by creating a low-fidelity sketch to visualize the layout of the dashboard. During this process, I carefully considered which elements should appear on the homepage, keeping the goal of increasing paid conversions in mind.
                </p>
                <p>
                  One feature I specifically designed was a locked element to spark curiosity and encourage users to explore the benefits of the paid version.
                </p>
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl mb-6">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Lofi.png"
                  alt="Low Fidelity"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Designing all elements</h3>
              <div className="text-gray-200 text-gray-700 leading-relaxed space-y-4 mb-6">
                <p>
                  I began by creating a low-fidelity sketch to visualize the layout of the dashboard. During this process, I carefully considered which elements should appear on the homepage, keeping the goal of increasing paid conversions in mind.
                </p>
                <p>
                  One feature I specifically designed was a locked element to spark curiosity and encourage users to explore the benefits of the paid version.
                </p>
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl mb-6">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Hifi.png"
                  alt="High Fidelity"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Final high fidelity design</h3>
              <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Wallpaper 2.png"
                  alt="Final High Fidelity Design"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </div>
          </section>

          {/* Get Started Section */}
          <section ref={getStartedRef} id="get-started" className={`scroll-mt-20 mb-16 transition-all duration-700 ${getStartedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Get Started</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed mb-6">
              <p>
                Designed an intuitive onboarding flow that helps users understand the AI assistant's 
                capabilities and get started quickly.
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Get Started Hifi.png"
                  alt="Get Started High Fidelity"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Get Started Flow.png"
                  alt="Get Started Flow"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Get Started Info.png"
                  alt="Get Started Info"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>

          {/* Feed Brain Section */}
          <section ref={feedBrainRef} id="feed-brain" className={`scroll-mt-20 mb-16 transition-all duration-700 ${feedBrainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Feed Brain</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed mb-6">
              <p>
                Created a feature that allows users to train the AI by providing context and examples, 
                making the assistant more personalized and effective.
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Feed Brain.png"
                  alt="Feed Brain"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Feed Brain Flow.png"
                  alt="Feed Brain Flow"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Feed Brain Info.png"
                  alt="Feed Brain Info"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>

          {/* Help Center Section */}
          <section ref={helpCenterRef} id="help-center" className={`scroll-mt-20 mb-16 transition-all duration-700 ${helpCenterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Help Center</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed mb-6">
              <p>
                Designed a comprehensive help center that provides users with easy access to 
                documentation, tutorials, and support resources.
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Help Center Design.png"
                  alt="Help Center Design"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Help Center Flow.png"
                  alt="Help Center Flow"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Help Center Info.png"
                  alt="Help Center Info"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>

          {/* Subscription Section */}
          <section ref={subscriptionRef} id="subscription" className={`scroll-mt-20 mb-16 transition-all duration-700 ${subscriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Subscription</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed mb-6">
              <p>
                Designed subscription management features including plan selection, locked features, 
                and account management.
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Locked Feature.png"
                  alt="Locked Feature"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Hypertype/Your Plan.png"
                  alt="Your Plan"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>
          </div>
        </div>
      </div>
    </main>
  )
}
