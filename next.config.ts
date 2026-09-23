import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  // Force blocking (non-streamed) metadata for every request, not just
  // Next's default JS-limited bot list (Googlebot, Bingbot, Twitterbot,
  // Slackbot, etc. already got this). Without it, generateMetadata's
  // result gets appended to <body> and moved into <head> client-side,
  // which real browsers/Googlebot handle fine but Lighthouse's raw-HTML
  // SEO audit (and any other non-JS crawler) reads as a missing tag.
  htmlLimitedBots: /.*/,
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

      // Redirect requests hitting the raw Vercel deployment URL to the canonical domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'aicentralhub-frontend.vercel.app',
          },
        ],
        destination: 'https://ai-centralhub.com/:path*',
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
