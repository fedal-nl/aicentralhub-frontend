import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import ThemeRegistry from '@/theme/ThemeRegistry'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Box } from '@mui/material'
import './globals.scss'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AI CentralHub — Free AI Tools Directory with 7,000+ Tools',
    template: '%s | AI CentralHub',
  },
  description:
    'AI CentralHub is your free AI tools directory with 7,000+ tools across 250+ categories. Discover and compare the best AI tools — free to explore.',
  metadataBase: new URL('https://ai-centralhub.com'),
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
    <html lang="en" className={syne.className}>
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
