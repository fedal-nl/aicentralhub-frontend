import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/api/',
          '/login',
          '/submit-tool/success',
          '/*?*search=',
          '/*?*sort=',
          '/*?*ordering=',
          '/*?*page=',
          '/wp-admin/',
          '/wp-login.php',
        ],
      },
    ],
    sitemap: 'https://ai-centralhub.com/sitemap.xml',
  }
}
