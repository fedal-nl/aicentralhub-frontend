import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import ThemeRegistry from '@/theme/ThemeRegistry'
import { Box } from '@mui/material'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.scss'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AI CentralHub — Free AI Tools Directory with 7,000+ Tools',
    template: '%s | AI CentralHub',
  },
  description:
    'AI CentralHub is your free AI tools directory with 7,000+ tools across 50+ categories. Discover and compare the best AI tools — free to explore.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <ThemeRegistry>
          <Navbar />
          <Box component="main" sx={{ flex: 1 }}>
            {children}
          </Box>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  )
}
