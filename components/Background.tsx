'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Background() {
  const { theme } = useTheme()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate opacity based on scroll (fades from 1 to 0.2 as you scroll)
  const maxScroll = 1000 // Start fading after 1000px
  const opacity = Math.max(0.2, 1 - (scrollY / maxScroll) * 0.8)

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        backgroundColor: theme === 'dark' ? '#0a0a0a' : '#fafafa',
      }}
    >
      {/* Base background with linear gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(180deg, rgba(10, 10, 10, 1) 0%, rgba(12, 15, 14, 1) 30%, rgba(10, 12, 11, 1) 60%, rgba(10, 10, 10, 1) 100%)'
            : 'linear-gradient(180deg, rgba(250, 250, 250, 1) 0%, rgba(245, 248, 250, 1) 30%, rgba(248, 250, 252, 1) 60%, rgba(250, 250, 250, 1) 100%)',
        }}
      />
      
      {/* Hero section background elements - fade on scroll */}
      <div style={{ opacity }}>
        {theme === 'dark' ? (
          <>
            {/* Large organic blob shape - top left, wider apart - darker blue with dark grey */}
            <div 
              className="absolute"
              style={{
                top: '8%',
                left: '-5%',
                width: '700px',
                height: '600px',
                background: 'radial-gradient(ellipse, rgba(50, 70, 85, 0.15) 0%, rgba(50, 70, 85, 0) 70%)',
                filter: 'blur(350px)',
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                transform: 'rotate(45deg)',
              }}
            />
            
            {/* Medium organic blob shape - top right, wider apart - darker blue with dark grey */}
            <div 
              className="absolute"
              style={{
                top: '12%',
                right: '-8%',
                width: '650px',
                height: '700px',
                background: 'radial-gradient(ellipse, rgba(52, 72, 87, 0.12) 0%, rgba(52, 72, 87, 0) 70%)',
                filter: 'blur(340px)',
                borderRadius: '60% 40% 30% 70% / 50% 40% 50% 60%',
                transform: 'rotate(-30deg)',
              }}
            />
            
            {/* Small interesting shape - center left, wider apart - darker blue with dark grey */}
            <div 
              className="absolute"
              style={{
                top: '50%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(48, 68, 83, 0.13) 0%, rgba(48, 68, 83, 0) 70%)',
                filter: 'blur(330px)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                transform: 'rotate(60deg)',
              }}
            />
            
            {/* Medium circle with slight distortion - center right, wider apart - darker blue with dark grey */}
            <div 
              className="absolute"
              style={{
                top: '45%',
                right: '-12%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(51, 71, 86, 0.11) 0%, rgba(51, 71, 86, 0) 70%)',
                filter: 'blur(345px)',
                borderRadius: '45% 55% 55% 45% / 45% 45% 55% 55%',
              }}
            />
            
            {/* Small organic shape - bottom left, wider apart - darker blue with dark grey */}
            <div 
              className="absolute"
              style={{
                bottom: '18%',
                left: '-8%',
                width: '550px',
                height: '550px',
                background: 'radial-gradient(ellipse, rgba(49, 69, 84, 0.1) 0%, rgba(49, 69, 84, 0) 70%)',
                filter: 'blur(335px)',
                borderRadius: '50% 50% 50% 50% / 60% 40% 60% 40%',
                transform: 'rotate(120deg)',
              }}
            />
            
            {/* Large subtle gradient overlay for depth - darker blue with dark grey */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 35%, rgba(50, 70, 85, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 65%, rgba(52, 72, 87, 0.06) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, rgba(48, 68, 83, 0.05) 0%, transparent 50%)
                `,
              }}
            />
          </>
        ) : (
          <>
            {/* Light mode - soft blue/green tints */}
            <div 
              className="absolute"
              style={{
                top: '8%',
                left: '-5%',
                width: '700px',
                height: '600px',
                background: 'radial-gradient(ellipse, rgba(135, 180, 200, 0.12) 0%, rgba(135, 180, 200, 0) 70%)',
                filter: 'blur(350px)',
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                transform: 'rotate(45deg)',
              }}
            />
            
            <div 
              className="absolute"
              style={{
                top: '12%',
                right: '-8%',
                width: '650px',
                height: '700px',
                background: 'radial-gradient(ellipse, rgba(140, 185, 205, 0.1) 0%, rgba(140, 185, 205, 0) 70%)',
                filter: 'blur(340px)',
                borderRadius: '60% 40% 30% 70% / 50% 40% 50% 60%',
                transform: 'rotate(-30deg)',
              }}
            />
            
            <div 
              className="absolute"
              style={{
                top: '50%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(130, 175, 195, 0.11) 0%, rgba(130, 175, 195, 0) 70%)',
                filter: 'blur(330px)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                transform: 'rotate(60deg)',
              }}
            />
            
            <div 
              className="absolute"
              style={{
                top: '45%',
                right: '-12%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(138, 183, 203, 0.09) 0%, rgba(138, 183, 203, 0) 70%)',
                filter: 'blur(345px)',
                borderRadius: '45% 55% 55% 45% / 45% 45% 55% 55%',
              }}
            />
            
            <div 
              className="absolute"
              style={{
                bottom: '18%',
                left: '-8%',
                width: '550px',
                height: '550px',
                background: 'radial-gradient(ellipse, rgba(133, 178, 198, 0.08) 0%, rgba(133, 178, 198, 0) 70%)',
                filter: 'blur(335px)',
                borderRadius: '50% 50% 50% 50% / 60% 40% 60% 40%',
                transform: 'rotate(120deg)',
              }}
            />
            
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 35%, rgba(135, 180, 200, 0.06) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 65%, rgba(140, 185, 205, 0.05) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, rgba(130, 175, 195, 0.04) 0%, transparent 50%)
                `,
              }}
            />
          </>
        )}
      </div>
      
      {/* Additional subtle background elements that don't fade */}
      <div 
        className="absolute rounded-full"
        style={{
          top: '60%',
          right: '-15%',
          width: '900px',
          height: '900px',
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(50, 70, 85, 0.04) 0%, rgba(50, 70, 85, 0) 60%)'
            : 'radial-gradient(circle, rgba(135, 180, 200, 0.03) 0%, rgba(135, 180, 200, 0) 60%)',
          filter: 'blur(360px)',
        }}
      />
    </div>
  )
}
