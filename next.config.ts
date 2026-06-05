import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for better dev warnings
  reactStrictMode: true,
  output: 'standalone',

  // If your backend is on a different domain, proxy API calls here
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ]
  },

  // Allows Next.js to optimize images from external domains (e.g. your tool logos)
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
