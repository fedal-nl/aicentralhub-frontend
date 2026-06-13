import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/account/', '/login', '/signup'],
      },
    ],
    sitemap: 'https://ai-centralhub.com/sitemap.xml',
  }
}
