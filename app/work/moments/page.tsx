'use client'

import Image from 'next/image'
import Link from 'next/link'
import WorkPageNav from '@/components/WorkPageNav'
import { useTheme } from '@/contexts/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'plugin', label: 'Plugin' },
  { id: 'pricing', label: 'Pricing' },
]

export default function MomentsPage() {
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
            <div className="mb-12">
              <p className="text-sm text-gray-400 text-gray-500 mb-4">About the project</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-gray-900 leading-tight">
                Designing for moments playlist generator, a concept made by me.
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left column - Description */}
                <div className="space-y-4">
                  <div className="text-gray-300 text-gray-600 leading-relaxed">
                    <p>
                      For this project, I conceptualized and designed an AI-powered playlist generator aimed at creating personalized music experiences. The idea originated from the need for curated playlists that adapt seamlessly to both the user's mood and specific environments. The app uses artificial intelligence to analyze user preferences, emotions, and situational factors, generating playlists that perfectly match the user's mood or setting.
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
                    <p className="text-white text-gray-900">September 2024</p>
                  </div>
                </div>
              </div>

              {/* Problem, Solution, Key Features, Outcome Section */}
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="mb-2">
                      <strong className="text-white text-gray-900">Problem:</strong>
                    </p>
                    <p className="text-gray-300 text-gray-600 leading-relaxed">
                      Current music streaming platforms offer pre-made playlists but often fail to tailor them accurately to individual moods or specific contexts, such as a dinner party, workout, or relaxing evening. Users need a more intuitive and personalized music solution that evolves with their emotions and environment.
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <strong className="text-white text-gray-900">Solution:</strong>
                    </p>
                    <p className="text-gray-300 text-gray-600 leading-relaxed">
                      The concept leverages an AI model capable of interpreting user inputs (such as mood indicators, time of day, or activity) and generating playlists that are not only genre-appropriate but also dynamically adaptive to real-time settings. Whether it's calming tunes for a quiet evening or energetic tracks for a workout, the playlist generator ensures the right music for every occasion.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="mb-2">
                      <strong className="text-white text-gray-900">Key Features:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-gray-600 ml-4 leading-relaxed">
                      <li>Mood & Setting Inputs: Users can select or describe their current mood or the environment (e.g., "focused", "party", "relaxing") for the AI to create a custom playlist.</li>
                      <li>AI Learning: The system learns from user interactions, refining playlist suggestions over time for greater personalization.</li>
                      <li>Cross-Platform Integration: The concept includes easy integration with popular music platforms (e.g., Spotify, Apple Music) for seamless music playback.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2">
                      <strong className="text-white text-gray-900">Outcome:</strong>
                    </p>
                    <p className="text-gray-300 text-gray-600 leading-relaxed">
                      The AI-powered playlist generator offers users a more tailored and engaging music experience by blending AI's capabilities with the emotional power of music. This project demonstrates the potential of AI in elevating everyday experiences through intelligent design and user-centric thinking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl mb-12">
              <Image
                src="/Portfolio Assets/Work/Moments/Landing.png"
                alt="Moments Landing"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* Plugin Section */}
          <section id="plugin" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Plugin</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed mb-6">
              <p>
                Designed a clean and functional plugin interface that integrates seamlessly with 
                existing workflows while providing powerful features.
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Moments/Plugin.png"
                  alt="Plugin"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
              <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                <Image
                  src="/Portfolio Assets/Work/Moments/PluginHalf.png"
                  alt="Plugin Half"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Pricing</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed mb-6">
              <p>
                Created a pricing page that clearly communicates value propositions and encourages 
                conversions through strategic design and clear information hierarchy.
              </p>
            </div>
            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/Moments/Pricing.png"
                alt="Pricing"
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
