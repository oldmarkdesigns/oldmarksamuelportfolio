'use client'

import Image from 'next/image'
import Link from 'next/link'
import WorkPageNav from '@/components/WorkPageNav'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'design-strategy', label: 'Design Strategy' },
  { id: 'property-showcase', label: 'Property Showcase' },
  { id: 'brand-logo', label: 'Brand Logo Design' },
  { id: 'outcome', label: 'Outcome' },
]

export default function ZanlugPropertiesPage() {
  const { theme } = useTheme()
  const { ref: designStrategyRef, isVisible: designStrategyVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })
  const { ref: propertyShowcaseRef, isVisible: propertyShowcaseVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 200 })
  const { ref: brandLogoRef, isVisible: brandLogoVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 300 })
  const { ref: outcomeRef, isVisible: outcomeVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 400 })

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-transparent relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left sidebar navigation */}
          <WorkPageNav sections={sections} />
          
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-8 md:pt-2">
              <Link
                href="/#work"
                className={`inline-flex items-center gap-2 transition-colors ${
                  theme === 'light'
                    ? 'text-gray-500 hover:text-gray-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ← Back to Work
              </Link>
              <a 
                href="https://zanlugproperties.com/" 
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
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-20 mb-16">
            <div className="mb-12">
              <p className="text-sm text-gray-400 text-gray-500 mb-4">About the project</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white text-gray-900 leading-tight">
                Designing a luxury property showcase website for Zanlüg Properties
              </h1>
              
              <div className="space-y-8">
                {/* Description */}
                <div className="space-y-4">
                  <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4">
                    <p>
                      Designed a luxury property showcase website for Zanlüg Properties, featuring three exclusive retreats across Sweden and Turkey. The project focused on creating an elegant, immersive digital experience that reflects the brand's serene and sophisticated identity.
                    </p>
                    <p>
                      I developed a responsive website with multilingual support, emphasizing high-quality imagery and intuitive navigation to help international guests discover and connect with each unique property.
                    </p>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 text-gray-500 mb-1">Role:</p>
                      <p className="text-white text-gray-900">Web Design & UX/UI Design</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 text-gray-500 mb-1">Company:</p>
                      <p className="text-white text-gray-900">Zanlüg Properties</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 text-gray-500 mb-1">Period:</p>
                      <p className="text-white text-gray-900">2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-3xl mx-auto h-[600px] overflow-hidden rounded-xl mb-12">
              <Image
                src="/Portfolio Assets/Work/Zanlug Properties/zanlug-work-thumbnail.png"
                alt="Zanlüg Properties Cover"
                fill
                className="object-cover rounded-xl"
                data-lightbox-ignore="true"
                style={{ objectPosition: 'center 40%' }}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* Design Strategy Section */}
          <section ref={designStrategyRef} id="design-strategy" className={`scroll-mt-20 mb-16 transition-all duration-700 ${designStrategyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Design Strategy & User Thinking</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
              <p>
                The target audience—affluent travelers seeking exclusive retreats—aren't just booking accommodation; they're investing in an experience. The website needed to communicate this value proposition immediately through visual storytelling and emotional connection.
              </p>
              <p>
                My strategy focused on three core principles: immersive imagery, intuitive navigation, and minimal text. I analyzed successful luxury property websites and found that large, hero-style images transport visitors while clear calls-to-action guide them naturally. The design accommodates both browsers and ready-to-inquire guests without forcing a linear path.
              </p>
              <p>
                The color palette and typography were chosen to evoke tranquility and sophistication—soft, muted tones that complement the property photography, and elegant typefaces that feel timeless. Every design decision aimed to make visitors feel like they were already experiencing these serene spaces.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">User research and benchmarking</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Design strategy and user journey mapping</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Visual identity and brand alignment</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Stakeholder Collaboration</span>
            </div>
          </section>

          {/* Property Showcase Section */}
          <section ref={propertyShowcaseRef} id="property-showcase" className={`scroll-mt-20 mb-16 transition-all duration-700 ${propertyShowcaseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Property Showcase Design</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
              <p>
                Each property—Älgö in the Stockholm archipelago, Gümüşlük in Bodrum, and Särvfjället in Härjedalen—has its own distinct character. I created a consistent design language while allowing each property to shine individually.
              </p>
              <p>
                The property cards on the main page use large, hero-style images that immediately communicate the essence of each location. I implemented a clean, card-based layout that allows visitors to quickly scan and compare properties, with minimal text letting the photography tell the story.
              </p>
              <p>
                Individual property pages follow a flow that starts with a striking hero image, followed by descriptive text and additional imagery. The goal was to create a sense of discovery, building anticipation and emotional investment as visitors explore each unique property.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Property page design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Image curation and layout</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Content hierarchy and information architecture</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Visual Design</span>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/Zanlug Properties/zanlug-listing.png"
                alt="Zanlüg Properties Listing"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* Brand Logo Design Section */}
          <section ref={brandLogoRef} id="brand-logo" className={`scroll-mt-20 mb-16 transition-all duration-700 ${brandLogoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Brand Logo Design</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
              <p>
                The logo design was crucial in establishing Zanlüg Properties' brand identity. I worked closely with the client to create a mark that captures the essence of their luxury properties—serenity, exclusivity, and a connection to nature.
              </p>
              <p>
                Through multiple iterations and collaborative feedback, we developed a logo that embodies the tranquil, sophisticated nature of the brand. The design balances simplicity with character, ensuring it works across all contexts—from the website header to business cards and property signage—while feeling both timeless and distinctive.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Logo design and ideation</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Brand identity development</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Client collaboration</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Illustrator</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Brand Design</span>
            </div>

            <div className="relative w-full max-w-2xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/Zanlug Properties/zanlug-logo.png"
                alt="Zanlüg Properties Logo"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </section>

          {/* Outcome Section */}
          <section ref={outcomeRef} id="outcome" className={`scroll-mt-20 mb-16 transition-all duration-700 ${outcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Outcome</h2>
            <div className="text-gray-600 dark:text-gray-200 leading-relaxed space-y-4 mb-6">
              <p>
                The website successfully launched and has been well-received by both the client and their international audience. The design creates an immersive, luxurious experience that reflects the quality and exclusivity of Zanlüg Properties.
              </p>
              <p>
                The multilingual functionality has proven particularly valuable, allowing the brand to reach a broader international market. The intuitive navigation and clear property showcase have made it easy for potential guests to explore and compare properties, leading to increased inquiries and bookings.
              </p>
              <p>
                By prioritizing visual storytelling and creating an experience that feels both luxurious and accessible, we created a website that doesn't just showcase properties—it invites visitors to imagine themselves in these serene spaces.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Published website</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Responsive design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Multilingual support</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Client collaboration</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-transparent rounded-full border border-gray-300/70 dark:border-gray-700/50">Project Management</span>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[900px] overflow-hidden rounded-xl group">
              <a 
                href="https://zanlugproperties.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative"
              >
                <Image
                  src="/Portfolio Assets/Work/Zanlug Properties/zanlug-website-thumbnail.png"
                  alt="Zanlüg Properties Website"
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
