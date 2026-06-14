import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { allTools } from '@/data/mockData'
import { mockReviews } from '@/data/mockReviews'
import ToolHero from '@/components/tool/ToolHero'
import ToolDetailClient from '@/components/tool/ToolDetailClient'
import ToolStructuredData from '@/components/structured-data/ToolStructuredData'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = allTools.find((t) => t.slug === slug)
  if (!tool) return {}
  return {
    title: `${tool.name} — AI Tool Review`,
    description: tool.metaDescription ?? tool.description,
  }
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params
  const tool = allTools.find((t) => t.slug === slug)
  if (!tool) notFound()

  const reviews = mockReviews.filter((r) => r.toolSlug === slug)
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : (tool.rating ?? 0)

  const relatedTools = allTools.filter(
    (t) => t.subcategory === tool.subcategory,
  )

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
