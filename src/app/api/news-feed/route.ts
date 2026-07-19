import { NextResponse } from 'next/server'
import { parseRssXml } from '@/lib/parseRss'
import { NewsArticle } from '@/types/news'

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

const NEWS_SOURCES = [
  { slug: 'techcrunch-feed', name: 'TechCrunch' },
  { slug: 'venturebeat-feed', name: 'VentureBeat' },
  { slug: 'theverge-feed', name: 'The Verge' },
  { slug: 'technologyreview', name: 'MIT Tech Review' },
]

export async function GET() {
  try {
    const results = await Promise.allSettled(
      NEWS_SOURCES.map(async (source) => {
        const res = await fetch(
          `${BASE_URL}/api/scraped-pages/${source.slug}/`,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': API_KEY,
            },
            next: { revalidate: 3600 }, // revalidate hourly
          },
        )

        if (!res.ok) return []
        const data = await res.json()
        return parseRssXml(data.content, source.name)
      }),
    )

    // Flatten all articles from all sources
    const allArticles = results
      .filter((r) => r.status === 'fulfilled')
      .flatMap((r) => (r as PromiseFulfilledResult<NewsArticle[]>).value)

    // Sort by pubDate descending
    allArticles.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    })

    return NextResponse.json({ articles: allArticles })
  } catch {
    return NextResponse.json({ articles: [] })
  }
}
