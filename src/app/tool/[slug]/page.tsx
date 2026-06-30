import { auth } from '@/auth'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getToolBySlug, getTools } from '@/lib/api'
import ToolHero from '@/components/tool/ToolHero'
import ToolDetailClient from '@/components/tool/ToolDetailClient'
import ToolStructuredData from '@/components/structured-data/ToolStructuredData'
import { Review } from '@/types/review'
import { Tool } from '@/types/tool'

interface Props {
  params: Promise<{ slug: string }>
}

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
  const session = await auth()

  let tool: Tool | null = null
  try {
    tool = await getToolBySlug(slug)
  } catch {
    notFound()
  }

  if (!tool) notFound()

  let reviews: Review[] = []
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_KEY ?? '',
    }
    if (session?.backendToken) {
      headers['Authorization'] =
        `${session.backendTokenType ?? 'Bearer'} ${session.backendToken}`
    }

    const res = await fetch(
      `${process.env.BACKEND_URL ?? 'https://api.fedal.xyz'}/api/reviews/?tool=${tool.id}`,
      { headers, cache: 'no-store' },
    )

    if (res.ok) {
      const data = await res.json()
      reviews = Array.isArray(data) ? data : (data.results ?? [])
    }
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
