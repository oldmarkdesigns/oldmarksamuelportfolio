import { NextResponse } from 'next/server'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

async function getAccessToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return null
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.access_token
}

async function getTrackInfo(trackId: string) {
  const accessToken = await getAccessToken()
  if (!accessToken) {
    return null
  }

  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    return null
  }

  return await response.json()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackId = searchParams.get('trackId')

  if (!trackId) {
    return NextResponse.json({ error: 'Track ID is required' }, { status: 400 })
  }

  // Try with credentials first if available
  if (SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET) {
    try {
      const trackInfo = await getTrackInfo(trackId)
      if (trackInfo && trackInfo.album && trackInfo.album.images && trackInfo.album.images.length > 0) {
        // Return the largest image (first in array is usually largest)
        return NextResponse.json({ 
          albumArt: trackInfo.album.images[0].url,
          albumName: trackInfo.album.name,
          artistName: trackInfo.artists[0]?.name,
          trackName: trackInfo.name,
        })
      }
    } catch (error) {
      console.error('Error fetching Spotify track:', error)
    }
  }

  // Fallback: Try using oEmbed API (no credentials needed)
  try {
    const oEmbedUrl = `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`
    const oEmbedResponse = await fetch(oEmbedUrl)
    if (oEmbedResponse.ok) {
      const oEmbedData = await oEmbedResponse.json()
      // Extract thumbnail from oEmbed (usually 640x640)
      if (oEmbedData.thumbnail_url) {
        return NextResponse.json({ 
          albumArt: oEmbedData.thumbnail_url,
          albumName: null,
          artistName: null,
          trackName: null,
        })
      }
    }
  } catch (error) {
    console.error('Error fetching Spotify oEmbed:', error)
  }

  return NextResponse.json({ albumArt: null })
}

