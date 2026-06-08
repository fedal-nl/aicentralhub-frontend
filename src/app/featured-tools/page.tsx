import { Metadata } from 'next'
import FeaturedToolsPageClient from '@/components/featured-tools/FeaturedToolsPageClient'

export const metadata: Metadata = {
  title: 'Featured AI Tools',
  description:
    'Hand-picked featured AI tools selected by the AI CentralHub team.',
}

export default function FeaturedToolsPage() {
  return <FeaturedToolsPageClient />
}
