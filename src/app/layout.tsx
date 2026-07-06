import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Box } from '@mui/material'
import ThemeRegistry from '@/theme/ThemeRegistry'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/legal/CookieConsent'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'
import './globals.scss'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const count = await getTotalToolCount()
  const label = formatToolCount(count)

  return {
    title: {
      default: `AI CentralHub — Free AI Tools Directory with ${label} Tools`,
      template: '%s | AI CentralHub',
    },
    description: `AI CentralHub is your free AI tools directory with ${label} tools across 12 categories & 50+ subcategories. Discover and compare the best AI tools — free to explore.`,
    metadataBase: new URL('https://ai-centralhub.com'),
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      siteName: 'AI CentralHub',
      type: 'website',
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AiCentralhub',
      creator: '@AiCentralhub',
    },
    verification: {
      google: 'tJwWC1yH6tCFoDVbJ5YwLEIi-5QmFlk2t08zhPEY5ro',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const count = await getTotalToolCount()
  const label = formatToolCount(count)

  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <ThemeRegistry>
          <GoogleAnalytics />
          <Navbar />
          <Box component="main" sx={{ flex: 1 }}>
            {children}
          </Box>
          <Footer toolCountLabel={label} />
          <CookieConsent />
        </ThemeRegistry>
      </body>
    </html>
  )
}
