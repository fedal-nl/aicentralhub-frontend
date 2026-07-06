import { Metadata } from 'next'
import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'
import AboutPageClient from '@/components/about/AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AI CentralHub — the free AI tools directory built to help you discover the best AI tools across every category.',
}

export default async function AboutPage() {
  const count = await getTotalToolCount()
  const toolCountLabel = formatToolCount(count)

  return <AboutPageClient toolCountLabel={toolCountLabel} />
}
