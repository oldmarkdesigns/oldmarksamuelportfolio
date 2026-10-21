'use client'

import Link from 'next/link'
import Image from 'next/image'
import TechStackTimeline from '@/components/TechStackTimeline'
import {
  Briefcase,
  Code,
  DeviceMobile,
  Handshake,
  Heartbeat,
  Layout,
  Lightning,
  RocketLaunch,
  ShieldCheck,
  Sparkle,
  Stack,
} from '@phosphor-icons/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const ABOUT_CHIPS = [
  { Icon: ShieldCheck, label: 'Trust-critical products' },
  { Icon: Layout, label: 'UX + UI + Frontend' },
  { Icon: Briefcase, label: 'Open to new role' },
  { Icon: RocketLaunch, label: 'Problem framing to shipped UI' },
  { Icon: Lightning, label: 'Fast, decisive execution' },
  { Icon: Code, label: 'React / TypeScript / Tailwind' },
  { Icon: Stack, label: 'Design systems' },
  { Icon: Heartbeat, label: 'Fintech and health apps' },
  { Icon: DeviceMobile, label: 'Native iOS in SwiftUI' },
  { Icon: Sparkle, label: 'AI-assisted prototyping' },
  { Icon: Handshake, label: 'Agency founder' },
] as const

export default function AboutSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })

  return (
    <section id="about" className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 ref={sectionRef} className={`text-xl md:text-2xl font-serif font-medium mb-8 text-white transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>About me</h2>
        
        <div ref={contentRef} className={`transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] gap-6 lg:gap-8 items-start lg:items-stretch">
              <div className="space-y-3 lg:relative lg:min-h-[300px]">
                <div className="about-profile-frame relative overflow-hidden rounded-xl lg:absolute lg:inset-0">
                  <Image
                    src="/Portfolio Assets/ProfilePicLarge-2026.png"
                    alt="Samuel Oldmark"
                    width={400}
                    height={600}
                    className="object-cover object-bottom w-full h-auto lg:absolute lg:inset-0 lg:h-full"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                  <div className="about-profile-meta pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <p className="about-profile-name text-sm font-medium">Product Designer</p>
                    <p className="about-profile-location text-xs mt-0.5">Stockholm, Sweden</p>
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <p className="about-kicker text-xs uppercase tracking-[0.18em] mb-3">Who I am</p>
                <h3 className="about-headline text-2xl md:text-3xl font-serif font-medium leading-tight mb-4">
                  I design calm, high-trust experiences for complex products.
                </h3>
                <p className="about-summary text-base leading-relaxed">
                  I focus on turning high-stakes product complexity into clear decisions, clear interfaces, and shipped outcomes.
                </p>
              </div>
            </div>

            <div className="about-chips mt-6" data-in={contentVisible}>
              {ABOUT_CHIPS.map(({ Icon, label }, i) => (
                <span
                  key={label}
                  className="about-chip text-xs font-medium"
                  style={{ '--i': i, '--tilt': i % 2 === 0 ? '-1.5deg' : '1.5deg' } as React.CSSProperties}
                >
                  <span className="about-chip-icon" aria-hidden>
                    <Icon size={13} weight="bold" />
                  </span>
                  {label}
                </span>
              ))}
            </div>

            <div className="about-story relative mt-6 pt-6 space-y-4">
              <p className="about-story-text text-base leading-relaxed [text-wrap:pretty]">
                I&apos;m Samuel Oldmark, a product designer based in Stockholm focused on digital
                products where trust, clarity, and usability directly impact business results. I
                design end-to-end experiences across web and mobile, from problem framing and user
                flows to interface design and shipped implementation.
              </p>

              <p className="about-story-text text-base leading-relaxed [text-wrap:pretty]">
                I currently run my own agency, Oldmark Studio, where I work with multiple clients
                across different sectors. My work spans UX and UI design, design systems, websites,
                digital products, frontend development, and AI-assisted solutions. Working across
                varied projects has made me comfortable taking broad ownership, adapting quickly,
                and turning early ideas into polished, working experiences.
              </p>

              <p className="about-story-text text-base leading-relaxed [text-wrap:pretty]">
                I&apos;m currently looking for a product design role where I can lead meaningful
                product work, raise design quality, and help a strong team ship better outcomes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-800 border-gray-300 border-r-0 border-b-0 border-l-0">
          <h3 className="text-xl md:text-2xl font-serif font-medium mb-2 text-white">My tech stack</h3>
          <p className="text-sm text-gray-300 mb-10 max-w-[65ch] [text-wrap:pretty]">
            These are the tools I use most often, though my stack varies by project.
          </p>
          <TechStackTimeline />
        </div>
      </div>
    </section>
  )
}
