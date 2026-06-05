import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
