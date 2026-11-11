import { cache } from 'react'
import { Tool, BackendTool, Category } from '@/types/tool'

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

const headers = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
}

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
    creationSource: tool.creation_source,
    isCreatedByCurrentUser: tool.is_created_by_current_user,
  }
}

export async function getTools(params?: {
  search?: string
  category?: string
  subcategory?: string
  pricing?: string
  featured?: boolean
  sort?: string
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
  if (params?.sort) query.set('sort', params.sort)
  if (params?.page) query.set('page', String(params.page))
  if (params?.page_size) query.set('page_size', String(params.page_size))

  const res = await fetch(`${BASE_URL}/api/tools/?${query.toString()}`, {
    headers,
    next: { revalidate: 3600 }, // 5 min → 1 hour
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

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const res = await fetch(`${BASE_URL}/api/tools/${slug}/`, {
    headers,
    next: { revalidate: 86400 }, // 1 hour → 24 hours. Tool details rarely
    // change post-approval, so a longer window collapses repeat crawler
    // hits within the same day into cache serves instead of fresh
    // function invocations — this is the main lever left on Active CPU.
  })

  if (res.status === 404) return null
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
    next: { revalidate: 300 }, // 1 min → 5 min, matches page-level revalidate
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

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/tools/categories/`, {
    headers,
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)
  const data = await res.json()
  return Array.isArray(data) ? data : (data.results ?? [])
}

// ─── All tools (paginated) ───────────────────────────────────────────────────
// Fetches every active tool by walking the paginated list endpoint.
//
// The backend caps page_size (currently 48), whatever we ask for. So the page
// count must come from the number of results actually returned, not from the
// page_size we requested — computing it as count / requested size silently
// stopped halfway through the catalog (52 of 108 pages).
//
// Pages are fetched in small batches rather than one big Promise.all, and each
// page is retried once, so a single slow or failed request doesn't take down
// the whole result.
const ALL_TOOLS_REQUESTED_PAGE_SIZE = 100
const ALL_TOOLS_CONCURRENCY = 5

async function getToolsPageWithRetry(page: number) {
  try {
    return await getTools({ page, page_size: ALL_TOOLS_REQUESTED_PAGE_SIZE })
  } catch {
    return await getTools({ page, page_size: ALL_TOOLS_REQUESTED_PAGE_SIZE })
  }
}

export async function getAllTools(): Promise<Tool[]> {
  const firstPage = await getToolsPageWithRetry(1)
  const effectivePageSize = firstPage.results.length
  const bySlug = new Map<string, Tool>(
    firstPage.results.map((t: Tool) => [t.slug, t]),
  )

  if (effectivePageSize === 0 || !firstPage.next) {
    return Array.from(bySlug.values())
  }

  const totalPages = Math.ceil(firstPage.count / effectivePageSize)
  const remaining = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)

  for (let i = 0; i < remaining.length; i += ALL_TOOLS_CONCURRENCY) {
    const batch = remaining.slice(i, i + ALL_TOOLS_CONCURRENCY)
    const pages = await Promise.all(batch.map(getToolsPageWithRetry))
    pages.forEach((page) =>
      page.results.forEach((t: Tool) => bySlug.set(t.slug, t)),
    )
  }

  // Dedupe by slug guards against records shifting between pages while we
  // paginate. Log if the total still doesn't match, so drift is visible.
  if (bySlug.size !== firstPage.count) {
    console.warn(
      `getAllTools: fetched ${bySlug.size} unique tools, backend count is ${firstPage.count}`,
    )
  }

  return Array.from(bySlug.values())
}

// ─── Slug validation ─────────────────────────────────────────────────────────
// Builds the full set of real tool slugs from the paginated list endpoint via
// getAllTools(). Reuses getTools()'s cache config, so this stays capped at a
// fixed number of cache entries (currently ~108 pages) no matter how much
// invalid-slug traffic hits /tool/[slug] — unlike calling getToolBySlug()
// per-slug, which creates a new ISR cache entry for every unique slug ever
// requested, including bot-guessed ones that don't exist.
let slugCachePromise: Promise<Set<string> | null> | null = null
let slugCacheExpiresAt = 0
const SLUG_CACHE_TTL_MS = 300_000 // 5 min. Bounds how often the full
// rebuild runs (once per instance per window, not once per request) —
// matches the freshness window used elsewhere for tool-detail revalidation.

async function fetchValidSlugs(): Promise<Set<string>> {
  const tools = await getAllTools()
  return new Set<string>(tools.map((t) => t.slug))
}

export const getValidSlugs = cache(async (): Promise<Set<string> | null> => {
  if (slugCachePromise && slugCacheExpiresAt > Date.now()) {
    return slugCachePromise
  }
  slugCacheExpiresAt = Date.now() + SLUG_CACHE_TTL_MS
  slugCachePromise = fetchValidSlugs().catch((err) => {
    slugCacheExpiresAt = 0
    console.error(
      'getValidSlugs failed, falling back to unfiltered lookup:',
      err,
    )
    return null // signal failure without throwing
  })
  return slugCachePromise
})
