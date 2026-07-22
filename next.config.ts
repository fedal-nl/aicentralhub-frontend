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
      // Existing WordPress tool URL redirect
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

      // WordPress tool feed URLs → tool page
      {
        source: '/:id(\\d+)/:slug/feed/',
        destination: '/tool/:slug',
        permanent: true,
      },
      {
        source: '/:id(\\d+)/:slug/feed',
        destination: '/tool/:slug',
        permanent: true,
      },

      // WordPress category feed URLs → ai-tools
      {
        source: '/category/:slug/feed/',
        destination: '/ai-tools',
        permanent: true,
      },
      {
        source: '/category/:slug/feed',
        destination: '/ai-tools',
        permanent: true,
      },

      // WordPress category pagination → ai-tools
      {
        source: '/category/:slug/page/:page/',
        destination: '/ai-tools',
        permanent: true,
      },
      {
        source: '/category/:slug/page/:page',
        destination: '/ai-tools',
        permanent: true,
      },

      // WordPress date archives → homepage
      { source: '/date/:year/:month/', destination: '/', permanent: true },
      { source: '/date/:year/:month', destination: '/', permanent: true },
      { source: '/date/:year/', destination: '/', permanent: true },
      { source: '/date/:year', destination: '/', permanent: true },

      // WordPress tag URLs → ai-tools
      { source: '/tag/:slug/', destination: '/ai-tools', permanent: true },
      { source: '/tag/:slug', destination: '/ai-tools', permanent: true },
      {
        source: '/tag/:slug/page/:page/',
        destination: '/ai-tools',
        permanent: true,
      },
      {
        source: '/tag/:slug/page/:page',
        destination: '/ai-tools',
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
