import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

interface BackendTool {
  id: number
  name: string
  slug: string
  website_url: string
  description: string
  long_description?: string
  category: string
  subcategory: string
  pricing_model: string
  app_type: string
  tags?: string
  logo_url?: string
  is_featured: boolean
  meta_description?: string
  rating?: string
  review_count?: number
  is_active: boolean
}

function mapTool(tool: BackendTool) {
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    url: tool.website_url,
    description: tool.description,
    longDescription: tool.long_description,
    category: tool.category,
    subcategory: tool.subcategory,
    pricing: tool.pricing_model,
    appType: tool.app_type,
    tags: tool.tags,
    logo: tool.logo_url,
    isFeatured: tool.is_featured,
    metaDescription: tool.meta_description,
    rating: tool.rating ? parseFloat(tool.rating) : 0,
    reviewCount: tool.review_count,
    isActive: tool.is_active,
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = new URLSearchParams()

  if (searchParams.get('search'))
    query.set('search', searchParams.get('search')!)
  if (searchParams.get('category'))
    query.set('category', searchParams.get('category')!)
  if (searchParams.get('subcategory'))
    query.set('subcategory', searchParams.get('subcategory')!)
  if (searchParams.get('pricing'))
    query.set('pricing_model', searchParams.get('pricing')!)
  if (searchParams.get('featured'))
    query.set('is_featured', searchParams.get('featured')!)
  if (searchParams.get('page')) query.set('page', searchParams.get('page')!)
  if (searchParams.get('page_size'))
    query.set('page_size', searchParams.get('page_size')!)
  if (searchParams.get('ordering'))
    query.set('ordering', searchParams.get('ordering')!)

  try {
    const res = await fetch(`${BASE_URL}/api/tools/?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch tools' },
        { status: res.status },
      )
    }

    const data = await res.json()

    return NextResponse.json({
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: (data.results ?? []).map(mapTool),
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
