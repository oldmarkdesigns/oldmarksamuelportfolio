'use client'

import Image from 'next/image'
import Link from 'next/link'
import WorkPageNav from '@/components/WorkPageNav'
import { useTheme } from '@/contexts/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'branding', label: 'Branding' },
  { id: 'web-design', label: 'Web Design' },
]

export default function DjungelbyranPage() {
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
                Designed the visual identity for Djungelbyrån agency, establishing the tone for its brand language and overall aesthetic.
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left column - Description */}
                <div className="space-y-4">
                  <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4">
                    <p>
                      I created a cohesive visual system that captures the essence of the brand, from typography and color palette to imagery and layout. This new identity was then implemented into the front-end development of their website, where I built a fully responsive, user-friendly site that reflects and enhances Djungelbyrån's updated look and feel.
                    </p>
                  </div>
                </div>
                
                {/* Right column - Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Role:</p>
                    <p className="text-white text-gray-900">Brand & Web Design</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 text-gray-500 mb-1">Period:</p>
                    <p className="text-white text-gray-900">2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl mb-12">
              <Image
                src="/Portfolio Assets/Work/Djungelbyran/Work Cover.png"
                alt="Djungelbyrån Cover"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </section>

          {/* Design Process Section */}
          <section id="design-process" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Design Process</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4 mb-6">
              <p>
                In designing the visual identity for Djungelbyrån, I worked closely with the agency's two founders, who had a clear vision of the message they wanted to convey to potential clients. Using the guidelines they provided, I began creating core brand elements, including the logo, color palette, font selection, buttons, and components for the website.
              </p>
              <p>
                Since the website is fairly static and text-focused, we wanted to add some animations and interactive elements to enhance user engagement. This resulted in subtle, dynamic touches like the rotating brand logo as users scroll and elements sliding into view upon scrolling.
              </p>
              <p>
                The biggest challenge was selecting the right fonts. We initially debated using a more playful font for headers but ultimately decided on a clean, professional typeface to maintain a polished look. Instead, we incorporated the playful font into the logo, achieving a balance between professionalism and personality.
              </p>
              <p>
                I'll showcase some examples below.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Collaboration with stakeholders</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Design of visual language and brand identity</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Animation and interactive elements</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Frontend development</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Published website</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Figma</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UI Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">UX Design</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Project Management</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Stakeholders Collaboration</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Frontend development</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Squarespace</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">CSS</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">HTML</span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 text-gray-500 bg-gray-800/50 bg-gray-200/70 rounded-full border border-gray-700/50 border-gray-300/70">Javascript</span>
            </div>
          </section>

          {/* Branding Section */}
          <section id="branding" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Branding</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Font selection</h3>
              <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4 mb-6">
                <p>
                  As mentioned above, we discussed various font options for the website. We ultimately decided on a clean, professional typeface to maintain a polished look. Here are some examples we considered.
                </p>
              </div>
              <div className="space-y-6">
                <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                  <Image
                    src="/Portfolio Assets/Work/Djungelbyran/Fonts.png"
                    alt="Typography"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-xl"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                    <Image
                      src="/Portfolio Assets/Work/Djungelbyran/Font 1.png"
                      alt="Font 1"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain rounded-xl"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl">
                    <Image
                      src="/Portfolio Assets/Work/Djungelbyran/Font 2.png"
                      alt="Font 2"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain rounded-xl"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Logo design</h3>
              <div className="text-gray-300 text-gray-600 leading-relaxed space-y-4 mb-6">
                <p>
                  When designing the logo, I aimed to create a visually striking and memorable piece that would stand out not only on the website but also in other contexts, such as advertising, social media, and printed materials. To achieve this, I chose a more experimental font that would give the logo a distinctive character, setting it apart from the clean, minimalist design of the website.
                </p>
                <p>
                  Given our decision to add a subtle rotation to the logo as users scroll through the site, I felt it would be engaging to have the text "Djungelbyrån" encircle the logo itself. This dynamic effect enhances brand recognition and creates a playful yet professional impression. The rotating, circular text is also versatile—it draws attention online but translates well to physical formats like business cards, banners, or merchandise, where the unique visual element can leave a lasting impression and reinforce brand identity across different platforms.
                </p>
                <p>
                  In essence, this logo design provides the flexibility to maintain its distinctive appeal, whether displayed digitally or in real-world settings, making it a powerful and cohesive branding asset.
                </p>
              </div>
              <div className="space-y-6">
                <div className="relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/Portfolio Assets/Work/Djungelbyran/Logo_White 1.png"
                    alt="Logo White"
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="relative w-full max-w-2xl mx-auto max-h-[500px] overflow-hidden rounded-xl">
                  <Image
                    src="/Portfolio Assets/Work/Djungelbyran/Bottom Corner Logo 1.png"
                    alt="Bottom Corner Logo"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-xl"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white text-gray-900 mb-4">Color palette</h3>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-lg" style={{ backgroundColor: '#E9AF64' }}></div>
                  <p className="text-sm text-gray-400 text-gray-500">#E9AF64</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-lg" style={{ backgroundColor: '#07191D' }}></div>
                  <p className="text-sm text-gray-400 text-gray-500">#07191D</p>
                </div>
              </div>
            </div>
          </section>

          {/* Web Design Section */}
          <section id="web-design" className="scroll-mt-20 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-gray-900">Web Design</h2>
            <div className="text-gray-300 text-gray-600 leading-relaxed mb-6">
              <p>
                Designed a modern and responsive website that showcases the brand identity while 
                providing an excellent user experience.
              </p>
            </div>
            <div className="relative w-full max-w-3xl mx-auto max-h-[600px] overflow-hidden rounded-xl">
              <Image
                src="/Portfolio Assets/Work/Djungelbyran/Landing.png"
                alt="Landing Page"
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
