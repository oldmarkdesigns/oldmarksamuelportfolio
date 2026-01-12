'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function LifeOutsideWorkSection() {
  const [albumArt, setAlbumArt] = useState<string | null>(null)
  const [isPhotoCardHovered, setIsPhotoCardHovered] = useState(false)
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null)
  const spotifyUrl = 'https://open.spotify.com/track/02J0ot9J6ASTAnj5oixMIE?si=SL1ELLpBQ42PHpG-Cr8qvw'
  const trackId = '02J0ot9J6ASTAnj5oixMIE'

  useEffect(() => {
    const fetchAlbumArt = async () => {
      try {
        const response = await fetch(`/api/spotify?trackId=${trackId}`)
        const data = await response.json()
        if (data.albumArt) {
          setAlbumArt(data.albumArt)
        }
      } catch (error) {
        console.error('Error fetching album art:', error)
      }
    }

    fetchAlbumArt()
  }, [trackId])

  return (
    <>
      {/* Dark overlay when photo card is hovered */}
      <div 
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-500 pointer-events-none ${
          isPhotoCardHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <section className="py-12 md:py-16 bg-transparent relative scroll-mt-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-xl md:text-2xl font-serif font-medium mb-8 text-white">Life outside work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Music Card */}
          <div className="bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 flex flex-col">
            <div className="relative w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden bg-gray-800">
              {albumArt ? (
                <Image
                  src={albumArt}
                  alt="Magnetik - Malandra Jr."
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-gray-400 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              <span className="text-xs text-gray-400 text-gray-500">Last Played</span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1">Magnetik</h3>
            <p className="text-sm text-gray-400 text-gray-500 mb-3">Malandra Jr.</p>
            
            <div className="mt-auto pb-3">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Open in Spotify
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Photo Card */}
          <div 
            className="bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 group relative overflow-visible flex flex-col"
            onMouseEnter={() => setIsPhotoCardHovered(true)}
            onMouseLeave={() => setIsPhotoCardHovered(false)}
          >
            <div className="relative w-full flex-1 min-h-0">
              {/* Photo collage layout - fills full height */}
              <div className="absolute inset-0 flex flex-col gap-2 h-full">
                {/* Midsummer - Full width top */}
                <div className="relative flex-shrink-0 h-24 md:h-28 rounded-lg overflow-visible group-hover:z-[100] transition-all duration-500 group-hover:scale-[1.8] group-hover:-translate-y-16 group-hover:rotate-[-2deg]">
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src="/Portfolio Assets/Outside Work/midsummers.JPG"
                      alt="Midsummer"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>
                
                {/* Bottom row - Surfing, Skiing, and Boating */}
                <div className="flex-1 flex gap-2">
                  {/* Left side - Surfing and Skiing stacked vertically, 50% width */}
                  <div className="w-1/2 flex flex-col gap-2">
                    {/* Surfing - Top half */}
                    <div className="relative flex-1 rounded-lg overflow-visible group-hover:z-[100] transition-all duration-500 group-hover:scale-[1.8] group-hover:-translate-x-16 group-hover:-translate-y-8 group-hover:rotate-[5deg]">
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                        <Image
                          src="/Portfolio Assets/Outside Work/surfing.jpg"
                          alt="Surfing"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 200px"
                        />
                      </div>
                    </div>
                    
                    {/* Skiing - Bottom half */}
                    <div className="relative flex-1 rounded-lg overflow-visible group-hover:z-[100] transition-all duration-500 group-hover:scale-[1.8] group-hover:-translate-x-16 group-hover:translate-y-8 group-hover:rotate-[-5deg]">
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                        <Image
                          src="/Portfolio Assets/Outside Work/skiing.JPG"
                          alt="Skiing"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 200px"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Boating, 50% width, full height */}
                  <div className="w-1/2">
                    <div className="relative w-full h-full rounded-lg overflow-visible group-hover:z-[100] transition-all duration-500 group-hover:scale-[1.8] group-hover:translate-x-16 group-hover:rotate-[5deg]">
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                        <Image
                          src="/Portfolio Assets/Outside Work/boating.JPG"
                          alt="Boating"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 200px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interests Card */}
          <div className="bg-gray-800/20 border border-gray-700/50 rounded-2xl p-4 flex flex-col overflow-visible">
            <div className="grid grid-cols-2 gap-4 h-full min-h-[300px]">
              {/* Tennis */}
              <div 
                className="relative w-full h-full aspect-square overflow-visible group cursor-pointer"
                onMouseEnter={() => setHoveredInterest('tennis')}
                onMouseLeave={() => setHoveredInterest(null)}
              >
                <div className={`relative w-full h-full overflow-hidden rounded-xl shadow-2xl transition-all duration-500 ${
                  hoveredInterest === 'tennis' 
                    ? 'brightness-100 scale-[1.8] -translate-y-12 -translate-x-8 rotate-[-3deg] z-[100]' 
                    : 'brightness-50'
                }`}>
                  <Image
                    src="/Portfolio Assets/Outside Work/tennis.JPG"
                    alt="Tennis"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500 ${
                  hoveredInterest === 'tennis' ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" strokeWidth={2} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 8c1.5 1 3 2 6 2s4.5-1 6-2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 16c1.5-1 3-2 6-2s4.5 1 6 2" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium text-center">Tennis</span>
                </div>
              </div>
              
              {/* Boating */}
              <div 
                className="relative w-full h-full aspect-square overflow-visible group cursor-pointer"
                onMouseEnter={() => setHoveredInterest('boating')}
                onMouseLeave={() => setHoveredInterest(null)}
              >
                <div className={`relative w-full h-full overflow-hidden rounded-xl shadow-2xl transition-all duration-500 ${
                  hoveredInterest === 'boating' 
                    ? 'brightness-100 scale-[1.8] -translate-y-12 translate-x-8 rotate-[3deg] z-[100]' 
                    : 'brightness-50'
                }`}>
                  <Image
                    src="/Portfolio Assets/Outside Work/boating.JPG"
                    alt="Boating"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500 ${
                  hoveredInterest === 'boating' ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12c2-1 4-1 6 0s4 1 6 0M2 16c2-1 4-1 6 0s4 1 6 0M2 8c2-1 4-1 6 0s4 1 6 0" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14c1.5 0 3 0.5 4 0.5s2.5-0.5 4-0.5 3 0.5 4 0.5" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium text-center">Boating</span>
                </div>
              </div>
              
              {/* Music production */}
              <div 
                className="relative w-full h-full aspect-square overflow-visible group cursor-pointer"
                onMouseEnter={() => setHoveredInterest('music')}
                onMouseLeave={() => setHoveredInterest(null)}
              >
                <div className={`relative w-full h-full overflow-hidden rounded-xl shadow-2xl transition-all duration-500 ${
                  hoveredInterest === 'music' 
                    ? 'brightness-100 scale-[1.8] translate-y-12 -translate-x-8 rotate-[3deg] z-[100]' 
                    : 'brightness-50'
                }`}>
                  <Image
                    src="/Portfolio Assets/Outside Work/music.jpg"
                    alt="Music production"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500 ${
                  hoveredInterest === 'music' ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium text-center">Music production</span>
                </div>
              </div>
              
              {/* Friends */}
              <div 
                className="relative w-full h-full aspect-square overflow-visible group cursor-pointer"
                onMouseEnter={() => setHoveredInterest('friends')}
                onMouseLeave={() => setHoveredInterest(null)}
              >
                <div className={`relative w-full h-full overflow-hidden rounded-xl shadow-2xl transition-all duration-500 ${
                  hoveredInterest === 'friends' 
                    ? 'brightness-100 scale-[1.8] translate-y-12 translate-x-8 rotate-[-3deg] z-[100]' 
                    : 'brightness-50'
                }`}>
                  <Image
                    src="/Portfolio Assets/Outside Work/friends.HEIC"
                    alt="Friends"
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500 ${
                  hoveredInterest === 'friends' ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium text-center">Friends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

