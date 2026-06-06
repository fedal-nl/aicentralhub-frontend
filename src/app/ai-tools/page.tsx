import { Metadata } from 'next'
import ToolsPageClient from '@/components/ai-tools/ToolsPageClient'

export const metadata: Metadata = {
  title: 'AI Tools',
  description:
    'Browse 7,000+ AI tools across 250+ categories. Filter by pricing, category and more.',
}

export default function AIToolsPage() {
  return <ToolsPageClient />
}
