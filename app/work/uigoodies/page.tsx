'use client'

import Image from 'next/image'
import Link from 'next/link'
import WorkPageNav from '@/components/WorkPageNav'
import { useTheme } from '@/contexts/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'credit-card', label: 'Credit Card' },
  { id: 'sign-up', label: 'Sign Up' },
  { id: 'user-profile', label: 'User Profile' },
  { id: 'direct-message', label: 'Direct Message' },
]

export default function UIGoodiesPage() {
  const { theme } = useTheme()
  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-transparent relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="flex gap-12">
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
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Daily UI</h1>
              <p className="text-lg text-gray-300 mb-2">UI Design Challenges</p>
              <p className="text-sm text-gray-400 mb-6">2024</p>
            </div>
            
            <div className="text-gray-300 leading-relaxed space-y-4 mb-8">
              <p>
                Daily UI is a series of design challenges sent out every day. I've gathered some of 
                the designs I've created from these challenges and compiled them into a collection 
                that I plan to keep updated as I complete more.
              </p>
              <p>
                These are smaller design projects that have helped me explore and develop a variety 
                of solutions. Each challenge pushes me to think creatively and experiment with 
                different design approaches.
              </p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl mb-8">
              <Image
                src="/Portfolio Assets/Work/UIGoodies/PortfolioUIGoodiesCover.png"
                alt="Daily UI Cover"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* Credit Card Section */}
          <section id="credit-card" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Credit Card</h2>
            <div className="text-gray-300 leading-relaxed mb-6">
              <p>
                Designed credit card interfaces for both desktop and mobile, focusing on clarity 
                and security while maintaining an elegant aesthetic.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/Credit Card Desktop.png"
                  alt="Credit Card Desktop"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/Credit Card Mobile.png"
                  alt="Credit Card Mobile"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </section>

          {/* Sign Up Section */}
          <section id="sign-up" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Sign Up</h2>
            <div className="text-gray-300 leading-relaxed mb-6">
              <p>
                Created sign-up flows that balance simplicity with necessary information collection, 
                ensuring a smooth onboarding experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/Sign Up Desktop.png"
                  alt="Sign Up Desktop"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/Sign Up Mobile.png"
                  alt="Sign Up Mobile"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </section>

          {/* User Profile Section */}
          <section id="user-profile" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">User Profile</h2>
            <div className="text-gray-300 leading-relaxed mb-6">
              <p>
                Designed user profile interfaces that allow users to manage their information and 
                preferences effectively.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/User Profile Desktop.png"
                  alt="User Profile Desktop"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/User Profile Mobile.png"
                  alt="User Profile Mobile"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </section>

          {/* Direct Message Section */}
          <section id="direct-message" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Direct Message</h2>
            <div className="text-gray-300 leading-relaxed mb-6">
              <p>
                Created messaging interfaces for both light and dark themes, focusing on readability 
                and user experience across different contexts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/Direct Message Light.png"
                  alt="Direct Message Light"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/UIGoodies/Direct Message Dark.png"
                  alt="Direct Message Dark"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 600px"
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
