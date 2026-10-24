'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle, type MotionValue } from 'framer-motion'
import { ArrowUpRight, MusicNotes } from '@phosphor-icons/react'
import './LifeOutsideWorkSection.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const SPOTIFY_URL = 'https://open.spotify.com/track/02J0ot9J6ASTAnj5oixMIE?si=SL1ELLpBQ42PHpG-Cr8qvw'
const TRACK_ID = '02J0ot9J6ASTAnj5oixMIE'
const BASE = '/Portfolio Assets/Outside Work'

interface Photo {
  id: string
  alt: string
  src: string
  /** width / height of the frame it sits in */
  ratio: number
  position?: string
  /** extra zoom, used to crop out bars baked into a screenshot */
  zoom?: number
}

const ROW_A: readonly Photo[] = [
  { id: 'midsummer', alt: 'Friends in matching T-shirts on a wooden deck by the water', src: `${BASE}/midsummers.JPG`, ratio: 3 / 2, position: '50% 40%' },
  { id: 'surfing', alt: 'Windsurfing on open water', src: `${BASE}/surfing.jpg`, ratio: 4 / 5, zoom: 1.4 },
  { id: 'boating', alt: 'Friends on a rocky island next to two boats', src: `${BASE}/boating.JPG`, ratio: 3 / 2, position: '30% 50%' },
  { id: 'skiing', alt: 'Skiing at sunset', src: `${BASE}/skiing.JPG`, ratio: 4 / 5, position: '62% 50%' },
]
const ROW_B: readonly Photo[] = [
  { id: 'tennis', alt: 'Tennis', src: `${BASE}/tennis.JPG`, ratio: 4 / 5 },
  { id: 'friends', alt: 'Friends', src: `${BASE}/friends.HEIC`, ratio: 4 / 3 },
  { id: 'music-production', alt: 'Music production', src: `${BASE}/music.jpg`, ratio: 4 / 5 },
]

/** One row of photos. The set is laid out twice so the row is always wider than the window it
    drifts through; the second copy is decoration only and hidden from assistive tech. */
function DriftRow({ photos, x, height }: { photos: readonly Photo[]; x: MotionValue<string> | string; height: string }) {
  return (
    <motion.div className="lx-row" style={{ x, '--row-h': height } as MotionStyle}>
      {[0, 1, 2].map((copy) =>
        photos.map((p) => (
          <figure key={`${copy}-${p.id}`} className="lx-photo" style={{ aspectRatio: p.ratio }} aria-hidden={copy > 0 || undefined}>
            <div className="lx-photo-zoom" style={p.zoom ? { transform: `scale(${p.zoom})` } : undefined}>
              <Image
                src={p.src}
                alt={copy > 0 ? '' : p.alt}
                fill
                sizes="(max-width: 768px) 60vw, 320px"
                style={{ objectPosition: p.position }}
              />
            </div>
          </figure>
        ))
      )}
    </motion.div>
  )
}

/** Life outside work: two rows of photos drifting in opposite directions as the section scrolls
    past, beside a still "Last played" panel for the song on repeat. */
export default function LifeOutsideWorkSection() {
  const reduce = useReducedMotion()
  const [albumArt, setAlbumArt] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetch(`/api/spotify?trackId=${TRACK_ID}`)
      .then((r) => r.json())
      .then((d) => d.albumArt && setAlbumArt(d.albumArt))
      .catch((e) => console.error('Error fetching album art:', e))
  }, [])

  // the rows travel while the section crosses the screen, eased a little so wheel steps glide
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const xA = useTransform(p, [0, 1], ['-4%', '-26%'])
  const xB = useTransform(p, [0, 1], ['-30%', '-8%'])

  return (
    <section ref={sectionRef} className={`lx ${inter.className} bg-transparent relative`}>
      <div className="lx-inner">
        <div className="lx-side">
          <h2 className="lx-label">Life outside work</h2>

          <div className="lx-music">
            <div className="lx-music-art">
              {albumArt ? (
                <Image src={albumArt} alt="Magnetik by Malandra Jr." fill sizes="240px" style={{ objectFit: 'cover' }} />
              ) : (
                <MusicNotes size={40} weight="regular" aria-hidden />
              )}
            </div>
            <p className="lx-music-label">
              <MusicNotes size={13} weight="bold" aria-hidden />
              Last Played
            </p>
            <h3 className="lx-music-title">Magnetik</h3>
            <p className="lx-music-artist">Malandra Jr.</p>
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="lx-music-link">
              Open in Spotify
              <ArrowUpRight size={13} weight="bold" aria-hidden />
            </a>
          </div>
        </div>

        <div className="lx-rows">
          <DriftRow photos={ROW_A} x={reduce ? '-4%' : xA} height="clamp(180px, 20vw, 250px)" />
          <DriftRow photos={ROW_B} x={reduce ? '-30%' : xB} height="clamp(140px, 15vw, 190px)" />
        </div>
      </div>
    </section>
  )
}
