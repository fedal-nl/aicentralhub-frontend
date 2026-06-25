const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

const headers = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
}

// Maps backend snake_case fields to frontend camelCase
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

export async function getTools(params?: {
  search?: string
  category?: string
  subcategory?: string
  pricing?: string
  featured?: boolean
  page?: number
  page_size?: number
}) {
  const query = new URLSearchParams()
  if (params?.search) query.set('search', params.search)
  if (params?.category) query.set('category', params.category)
  if (params?.subcategory) query.set('subcategory', params.subcategory)
  if (params?.pricing && params.pricing !== 'all')
    query.set('pricing_model', params.pricing)
  if (params?.featured) query.set('is_featured', 'true')
  if (params?.page) query.set('page', String(params.page))
  if (params?.page_size) query.set('page_size', String(params.page_size))

  const fullUrl = `${BASE_URL}/api/tools/?${query.toString()}`

  const res = await fetch(fullUrl, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Failed to fetch tools: ${res.status}`)
  const data = await res.json()

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: (data.results ?? []).map(mapTool),
  }
}

export async function getToolBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/tools/${slug}/`, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Failed to fetch tool: ${res.status}`)
  const data = await res.json()
  return mapTool(data)
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function getReviews(params?: { tool?: string }) {
  const query = new URLSearchParams()
  if (params?.tool) query.set('tool', params.tool)

  const res = await fetch(`${BASE_URL}/api/reviews/?${query.toString()}`, {
    headers,
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`)
  const data = await res.json()
  return data.results ?? data
}

export async function postReview(data: {
  tool: string
  rating: number
  title: string
  body: string
}) {
  const res = await fetch(`${BASE_URL}/api/reviews/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error(`Failed to post review: ${res.status}`)
  return res.json()
}
