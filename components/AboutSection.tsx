'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import TechStackLedger from '@/components/TechStackLedger'
import HeroOrb from '@/components/HeroOrb'
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
import './AboutSection.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

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

/** About me: an opening stage like the Projects module (copy low on the left, a framed portrait
    over the hero orb on the right, hairline guides and crosshairs), then the story as a reading
    column beside a focus index, then the tech stack as a ledger with a lens. */
export default function AboutSection() {
  const { ref: stageRef, isVisible: stageIn } = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const { ref: storyRef, isVisible: storyIn } = useScrollAnimation({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className={`about-x ${inter.className} bg-transparent relative`}>
      <div ref={stageRef} className="about-x-stage" data-in={stageIn}>
        <h2 className="about-x-label">About me</h2>

        <div className="about-x-copy">
          <p className="about-x-eyebrow about-x-rise" style={{ '--i': 0 } as React.CSSProperties}>
            <span>Who I am</span>
          </p>
          <h3 className="about-x-title">
            <span className="about-x-rise" style={{ '--i': 1 } as React.CSSProperties}>
              I design calm, <span className="whitespace-nowrap">high-trust</span> experiences
            </span>
            <span className="about-x-title-soft about-x-rise" style={{ '--i': 2 } as React.CSSProperties}>
              for complex products.
            </span>
          </h3>
          <p className="about-x-summary about-x-rise" style={{ '--i': 3 } as React.CSSProperties}>
            I focus on turning high-stakes product complexity into clear decisions, clear interfaces, and shipped outcomes.
          </p>
        </div>

        <div className="about-x-visual">
          {/* the hero orb again, inside a guide box with crosshairs at its corners and midpoints */}
          <div className="about-x-orb-box" aria-hidden="true">
            <div className="about-x-orb">
              <HeroOrb />
            </div>
            <span className="about-x-plus" style={{ left: 0, top: 0 }} />
            <span className="about-x-plus" style={{ left: '50%', top: 0 }} />
            <span className="about-x-plus" style={{ left: '100%', top: 0 }} />
            <span className="about-x-plus" style={{ left: '100%', top: '50%' }} />
            <span className="about-x-plus" style={{ left: 0, top: '100%' }} />
            <span className="about-x-plus" style={{ left: '50%', top: '100%' }} />
            <span className="about-x-plus" style={{ left: '100%', top: '100%' }} />
          </div>

          <figure className="about-x-photo">
            <div className="about-x-photo-crop">
              <Image
                src="/Portfolio Assets/ProfilePicLarge-2026.png"
                alt="Samuel Oldmark"
                fill
                className="about-x-photo-img"
                sizes="(min-width: 1024px) 360px, 70vw"
              />
            </div>
            <span className="about-x-plus" style={{ left: 0, top: 0 }} aria-hidden="true" />
            <span className="about-x-plus" style={{ left: '100%', top: 0 }} aria-hidden="true" />
            <span className="about-x-plus" style={{ left: 0, top: '100%' }} aria-hidden="true" />
            <span className="about-x-plus" style={{ left: '100%', top: '100%' }} aria-hidden="true" />
            <figcaption className="about-x-caption">
              <span>Product Designer</span>
              <i aria-hidden="true" />
              <span>Stockholm, Sweden</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div ref={storyRef} className="about-x-story" data-in={storyIn}>
        <div className="about-x-focus">
          <p className="about-x-col-label">Focus</p>
          <ul className="about-x-focus-list">
            {ABOUT_CHIPS.map(({ Icon, label }, i) => (
              <li key={label} className="about-x-focus-item" style={{ '--i': i } as React.CSSProperties}>
                <Icon size={16} weight="regular" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-x-read">
          <p className="about-x-col-label">Background</p>
          <p className="about-x-lead">
            I&apos;m Samuel Oldmark, a product designer based in Stockholm focused on digital
            products where trust, clarity, and usability directly impact business results. I
            design end-to-end experiences across web and mobile, from problem framing and user
            flows to interface design and shipped implementation.
          </p>
          <p className="about-x-text">
            I currently run my own agency, Oldmark Studio, where I work with multiple clients
            across different sectors. My work spans UX and UI design, design systems, websites,
            digital products, frontend development, and AI-assisted solutions. Working across
            varied projects has made me comfortable taking broad ownership, adapting quickly,
            and turning early ideas into polished, working experiences.
          </p>
          <p className="about-x-text">
            I&apos;m currently looking for a product design role where I can lead meaningful
            product work, raise design quality, and help a strong team ship better outcomes.
          </p>
        </div>
      </div>

      <TechStackLedger />
    </section>
  )
}
