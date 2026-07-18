import { Suspense } from 'react'
import { Metadata } from 'next'
import ToolsPageClient from '@/components/ai-tools/ToolsPageClient'
import ToolsListStructuredData from '@/components/structured-data/ToolsListStructuredData'
import { getTools } from '@/lib/api'
import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const count = await getTotalToolCount()

  return {
    title: 'AI Tools',
    description: `Browse ${formatToolCount(count)} AI tools across 12 categories & 50+ subcategories. Filter by pricing, category and more.`,
  }
}

export default async function AIToolsPage() {
  const count = await getTotalToolCount()
  const label = formatToolCount(count)

  let initialData = { results: [], count: 0 }
  try {
    initialData = await getTools({ page: 1, page_size: 24 })
  } catch (error) {
    console.error('Failed to fetch tools:', error)
  }

  return (
    <>
      <ToolsListStructuredData
        tools={initialData.results}
        toolCountLabel={label}
      />
      <Suspense>
        <ToolsPageClient
          initialTools={initialData.results}
          initialCount={initialData.count}
        />
      </Suspense>
    </>
  )
}
