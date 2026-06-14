import { Suspense } from 'react'
import { Metadata } from 'next'
import ToolsPageClient from '@/components/ai-tools/ToolsPageClient'
import ToolsListStructuredData from '@/components/structured-data/ToolsListStructuredData'
import { allTools } from '@/data/mockData'

export const metadata: Metadata = {
  title: 'AI Tools',
  description:
    'Browse 7,000+ AI tools across 50+ categories. Filter by pricing, category and more.',
}

export default function AIToolsPage() {
  return (
    <>
      <ToolsListStructuredData tools={allTools} />
      <Suspense>
        <ToolsPageClient />
      </Suspense>
    </>
  )
}
