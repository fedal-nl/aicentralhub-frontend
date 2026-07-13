import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  async redirects() {
    return [
      // Redirect old WordPress tool URLs to new format
      // e.g. /209142/10web/ → /tool/10web
      {
        source: '/:id(\\d+)/:slug/',
        destination: '/tool/:slug',
        permanent: true,
      },
      {
        source: '/:id(\\d+)/:slug',
        destination: '/tool/:slug',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
