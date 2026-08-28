import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getToolBySlug, getTools, getReviews, getValidSlugs } from '@/lib/api'
import ToolHero from '@/components/tool/ToolHero'
import ToolDetailClient from '@/components/tool/ToolDetailClient'
import ToolStructuredData from '@/components/structured-data/ToolStructuredData'
import { Review } from '@/types/review'
import { Tool } from '@/types/tool'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const validSlugs = await getValidSlugs()
  if (validSlugs && !validSlugs.has(slug)) {
    return {
      title: 'AI Tool — AI CentralHub',
      description: 'Discover AI tools on AI CentralHub.',
    }
  }

  const tool = await getToolBySlug(slug)
  if (!tool) {
    return {
      title: 'AI Tool — AI CentralHub',
      description: 'Discover AI tools on AI CentralHub.',
    }
  }
  return {
    title: `${tool.name} — AI Tool Review`,
    description: tool.metaDescription ?? tool.description,
  }
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params

  const validSlugs = await getValidSlugs()
  // Do NOT notFound() here. The list endpoint used to build this set can
  // exclude tools the detail endpoint still serves (e.g. inactive/incomplete
  // listings), so absence from this set is not proof a tool doesn't exist.
  // Use it only as a signal for logging/monitoring, never to block a request.
  if (validSlugs && !validSlugs.has(slug)) {
    console.warn(
      `Slug not in cached list, falling through to direct check: ${slug}`,
    )
  }

  // Returns null on real 404, throws on transient errors
  const tool: Tool | null = await getToolBySlug(slug)
  if (!tool) notFound()

  let reviews: Review[] = []
  try {
    reviews = await getReviews({ tool: String(tool.id) })
  } catch {
    reviews = []
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) /
        reviews.length
      : (tool.rating ?? 0)

  let relatedTools: Tool[] = []
  try {
    const relatedData = await getTools({
      subcategory: tool.subcategory,
      page_size: 5,
    })
    relatedTools = relatedData.results.filter((t: Tool) => t.slug !== slug)
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
