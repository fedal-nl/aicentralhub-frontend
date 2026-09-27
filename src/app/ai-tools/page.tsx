import { Suspense } from 'react'
import { Metadata } from 'next'
import ToolsPageClient from '@/components/ai-tools/ToolsPageClient'
import ToolsListStructuredData from '@/components/structured-data/ToolsListStructuredData'
import { getTools } from '@/lib/api'
import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'

export async function generateMetadata(): Promise<Metadata> {
  const count = await getTotalToolCount()

  return {
    title: 'AI Tools',
    description: `Browse ${formatToolCount(count)} AI tools across 12 categories & 50+ subcategories. Filter by pricing, category and more.`,
    alternates: { canonical: '/ai-tools' },
  }
}

interface AIToolsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export default async function AIToolsPage({ searchParams }: AIToolsPageProps) {
  const params = await searchParams
  const search = firstParam(params.search)
  const category = firstParam(params.category)
  const subcategory = firstParam(params.subcategory)
  const pricing = firstParam(params.pricing)
  const sort = firstParam(params.sort)

  const count = await getTotalToolCount()
  const label = formatToolCount(count)

  let initialData = { results: [], count: 0 }
  try {
    // Pass the URL's filters through so the server-rendered list already
    // matches what the user searched for — without this, the page always
    // rendered the unfiltered list and only picked up the search term once
    // the client re-fetched after a manual filter interaction.
    initialData = await getTools({
      search,
      category,
      subcategory,
      pricing,
      sort,
      page: 1,
      page_size: 24,
    })
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
