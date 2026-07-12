import { MetadataRoute } from 'next'
import { getTools, getCategories } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ai-centralhub.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/featured-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit-tool`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch categories for category + subcategory pages
  let categoryPages: MetadataRoute.Sitemap = []
  let subcategoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = await getCategories()
    categoryPages = categories.map((cat) => ({
      url: `${baseUrl}/ai-tools/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
    subcategoryPages = categories.flatMap((cat) =>
      cat.subcategories.map((sub) => ({
        url: `${baseUrl}/ai-tools/${cat.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    )
  } catch {
    // silently fail — static pages still included
  }

  // Fetch all tool pages (paginated — fetch all pages)
  let toolPages: MetadataRoute.Sitemap = []
  try {
    const pageSize = 100
    const firstPage = await getTools({ page: 1, page_size: pageSize })
    const totalPages = Math.ceil(firstPage.count / pageSize)

    const allResults = [...firstPage.results]

    // Fetch remaining pages in parallel
    if (totalPages > 1) {
      const remainingPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) =>
          getTools({ page: i + 2, page_size: pageSize }),
        ),
      )
      remainingPages.forEach((page) => allResults.push(...page.results))
    }

    toolPages = allResults.map((tool) => ({
      url: `${baseUrl}/tool/${tool.slug}`,
      lastModified: tool.approvalDate
        ? new Date(tool.approvalDate)
        : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // silently fail — static pages still included
  }

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...toolPages]
}
