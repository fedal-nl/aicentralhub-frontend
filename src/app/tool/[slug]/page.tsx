import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getToolBySlug, getReviews, getTools } from '@/lib/api'
import ToolHero from '@/components/tool/ToolHero'
import ToolDetailClient from '@/components/tool/ToolDetailClient'
import ToolStructuredData from '@/components/structured-data/ToolStructuredData'

interface Props {
  params: Promise<{ slug: string }>
}

// Don't pre-generate static params for 7,500+ tools at build time
// Instead use dynamic rendering with on-demand caching
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const tool = await getToolBySlug(slug)
    return {
      title: `${tool.name} — AI Tool Review`,
      description: tool.metaDescription ?? tool.description,
    }
  } catch {
    return {
      title: 'AI Tool — AI CentralHub',
      description: 'Discover AI tools on AI CentralHub.',
    }
  }
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params

  let tool = null
  try {
    tool = await getToolBySlug(slug)
  } catch {
    notFound()
  }

  let reviews = []
  try {
    reviews = await getReviews({ tool: slug })
  } catch {
    reviews = []
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        reviews.length
      : (tool.rating ?? 0)

  let relatedTools = []
  try {
    const relatedData = await getTools({
      subcategory: tool.subcategory,
      page_size: 5,
    })
    relatedTools = relatedData.results.filter((t: any) => t.slug !== slug)
  } catch {
    relatedTools = []
  }

  return (
    <>
      <ToolStructuredData tool={tool} />
      <ToolHero tool={tool} />
      <ToolDetailClient
        tool={tool}
        reviews={reviews}
        averageRating={averageRating}
        relatedTools={relatedTools}
      />
    </>
  )
}
