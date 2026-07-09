import { NextRequest, NextResponse } from 'next/server'
import { Tool, BackendTool } from '@/types/tool'

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

function mapTool(tool: BackendTool): Tool {
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    url: tool.website_url,
    description: tool.description,
    longDescription: tool.long_description,
    category: tool.category,
    subcategory: tool.subcategory,
    pricing: tool.pricing_model as Tool['pricing'],
    appType: tool.app_type as Tool['appType'],
    tags: tool.tags,
    logo: tool.logo_url,
    isFeatured: tool.is_featured,
    metaDescription: tool.meta_description,
    rating: tool.rating ? parseFloat(tool.rating) : 0,
    reviewCount: tool.review_count,
    isActive: tool.is_active,
    approvalDate: tool.approval_date,
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
  if (searchParams.get('sort')) query.set('sort', searchParams.get('sort')!)

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

    return NextResponse.json(
      {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: (data.results ?? []).map(mapTool),
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      },
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
