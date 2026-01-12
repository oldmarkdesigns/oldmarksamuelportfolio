/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/Portfolio Assets/:path*',
        destination: '/Portfolio Assets/:path*',
      },
    ]
  },
}

module.exports = nextConfig

