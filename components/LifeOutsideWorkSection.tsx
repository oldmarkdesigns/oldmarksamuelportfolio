'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, MusicNotes } from '@phosphor-icons/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import './LifeOutsideWorkSection.css'

const SPOTIFY_URL = 'https://open.spotify.com/track/02J0ot9J6ASTAnj5oixMIE?si=SL1ELLpBQ42PHpG-Cr8qvw'
const TRACK_ID = '02J0ot9J6ASTAnj5oixMIE'
const BASE = '/Portfolio Assets/Outside Work'

interface Tile {
  id: string
  alt: string
  /** grid-area on phones and on desktop: row-start / column-start / row-end / column-end */
  m: string
  d: string
  src?: string
  position?: string
  /** extra zoom, used to crop out bars baked into a screenshot */
  zoom?: number
  music?: boolean
}

// Desktop: 6 columns, 7 rows. Phone: 2 columns, 7 rows. Every cell is used.
const TILES: readonly Tile[] = [
  { id: 'midsummer', alt: 'Friends in matching T-shirts on a wooden deck by the water', src: `${BASE}/midsummers.JPG`, position: '50% 40%', m: '1 / 1 / 2 / 3', d: '1 / 1 / 3 / 5' },
  { id: 'music', alt: 'Magnetik by Malandra Jr.', music: true, m: '4 / 1 / 6 / 3', d: '1 / 5 / 4 / 7' },
  { id: 'surfing', alt: 'Windsurfing on open water', src: `${BASE}/surfing.jpg`, zoom: 1.4, m: '2 / 1 / 4 / 2', d: '3 / 1 / 6 / 3' },
  { id: 'boating', alt: 'Friends on a rocky island next to two boats', src: `${BASE}/boating.JPG`, position: '30% 50%', m: '2 / 2 / 3 / 3', d: '3 / 3 / 5 / 5' },
  { id: 'skiing', alt: 'Skiing at sunset', src: `${BASE}/skiing.JPG`, position: '62% 50%', m: '6 / 1 / 8 / 2', d: '4 / 5 / 7 / 7' },
  { id: 'tennis', alt: 'Tennis', src: `${BASE}/tennis.JPG`, m: '3 / 2 / 4 / 3', d: '5 / 3 / 8 / 5' },
  { id: 'friends', alt: 'Friends', src: `${BASE}/friends.HEIC`, m: '6 / 2 / 7 / 3', d: '6 / 1 / 8 / 3' },
  { id: 'music-production', alt: 'Music production', src: `${BASE}/music.jpg`, m: '7 / 2 / 8 / 3', d: '7 / 5 / 8 / 7' },
]

/** One tile: it tilts a few degrees toward the cursor, and a soft highlight follows the pointer. */
function CollageTile({ tile, albumArt }: { tile: Tile; albumArt: string | null }) {
  const reduce = useReducedMotion()
  // pointer position inside the tile, 0 to 1
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const hover = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.6 })
  const glow = useSpring(hover, { stiffness: 180, damping: 24 })

  const rotateX = useTransform(sy, [0, 1], [11, -11])
  const rotateY = useTransform(sx, [0, 1], [-14, 14])
  // the soft glow behind the tile, in the colours of its own photo
  const glowOpacity = useTransform(glow, [0, 1], [0, 0.16])
  const glowSrc = tile.music ? albumArt : tile.src

  const style = { '--m': tile.m, '--d': tile.d } as React.CSSProperties

  return (
    <div className="life-tile" style={style}>
      {glowSrc && (
        <motion.div className="life-glow" style={{ opacity: glowOpacity }} aria-hidden>
          <Image src={glowSrc} alt="" fill sizes="200px" style={{ objectFit: 'cover', objectPosition: tile.position }} />
        </motion.div>
      )}
      <motion.figure
        className={`life-photo${tile.music ? ' life-music' : ''}`}
        style={reduce ? undefined : { rotateX, rotateY }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
          hover.set(1)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
          hover.set(0)
        }}
      >
        {tile.music ? (
          <>
            <div className="life-music-cover">
              <div className="life-music-art">
                {albumArt ? (
                  <Image src={albumArt} alt={tile.alt} fill sizes="300px" style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="life-music-empty">
                    <MusicNotes size={44} weight="regular" aria-hidden />
                  </div>
                )}
              </div>
            </div>
            <div className="life-music-text">
              <span className="life-music-label">
                <MusicNotes size={14} weight="bold" aria-hidden />
                Last Played
              </span>
              <h3 className="life-music-title">Magnetik</h3>
              <p className="life-music-artist">Malandra Jr.</p>
              <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="life-music-link">
                Open in Spotify
                <ArrowUpRight size={14} weight="bold" aria-hidden />
              </a>
            </div>
          </>
        ) : (
          <div className="life-photo-zoom" style={tile.zoom ? { transform: `scale(${tile.zoom})` } : undefined}>
            <Image
              src={tile.src as string}
              alt={tile.alt}
              fill
              sizes="(max-width: 768px) 50vw, 440px"
              style={{ objectPosition: tile.position }}
            />
          </div>
        )}
      </motion.figure>
    </div>
  )
}

export default function LifeOutsideWorkSection() {
  const [albumArt, setAlbumArt] = useState<string | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true, delay: 100 })

  useEffect(() => {
    fetch(`/api/spotify?trackId=${TRACK_ID}`)
      .then((r) => r.json())
      .then((d) => d.albumArt && setAlbumArt(d.albumArt))
      .catch((e) => console.error('Error fetching album art:', e))
  }, [])

  return (
    <section className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2
          ref={sectionRef}
          className={`text-xl md:text-2xl font-serif font-medium mb-8 text-white transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Life outside work
        </h2>

        <div
          ref={contentRef}
          className={`life-collage transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {TILES.map((tile) => (
            <CollageTile key={tile.id} tile={tile} albumArt={albumArt} />
          ))}
        </div>
      </div>
    </section>
  )
}
