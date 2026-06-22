import { Suspense } from 'react'
import { Metadata } from 'next'
import ToolsPageClient from '@/components/ai-tools/ToolsPageClient'
import ToolsListStructuredData from '@/components/structured-data/ToolsListStructuredData'
import { getTools } from '@/lib/api'

export const metadata: Metadata = {
  title: 'AI Tools',
  description:
    'Browse 7,000+ AI tools across 50+ categories. Filter by pricing, category and more.',
}

export default async function AIToolsPage() {
  let initialData = { results: [], count: 0 }
  try {
    initialData = await getTools({ page: 1, page_size: 24 })
  } catch (error) {
    console.error('Failed to fetch tools:', error)
  }

  return (
    <>
      <ToolsListStructuredData tools={initialData.results} />
      <Suspense>
        <ToolsPageClient
          initialTools={initialData.results}
          initialCount={initialData.count}
        />
      </Suspense>
    </>
  )
}
