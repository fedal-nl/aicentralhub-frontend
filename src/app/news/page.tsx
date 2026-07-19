import { Metadata } from 'next'
import NewsPageClient from '@/components/news/NewsPageClient'
import { NewsArticle } from '@/types/news'
import { parseRssXml } from '@/lib/parseRss'

export const metadata: Metadata = {
  title: 'AI News',
  description:
    'Stay up to date with the latest AI news from TechCrunch, VentureBeat, The Verge and MIT Technology Review.',
}

export const revalidate = 3600

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

const NEWS_SOURCES = [
  { slug: 'techcrunch-feed', name: 'TechCrunch' },
  { slug: 'venturebeat-feed', name: 'VentureBeat' },
  { slug: 'theverge-feed', name: 'The Verge' },
  { slug: 'technologyreview', name: 'MIT Tech Review' },
  { slug: 'the-decoder-feed', name: 'The Decoder' },
  { slug: 'arstechnica-ai-feed', name: 'Ars Technica AI' },
]

const getDateString = (daysAgo: number = 0): string => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

export default async function NewsPage() {
  let articles: NewsArticle[] = []

  try {
    const results = await Promise.allSettled(
      NEWS_SOURCES.map(async (source) => {
        const headers = {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        }

        // Try today, yesterday, day before — use first successful response
        let data = null
        for (const daysAgo of [0, 1, 2, 3]) {
          const date = getDateString(daysAgo)
          const res = await fetch(
            `${BASE_URL}/api/scraped-pages/${source.slug}/?date=${date}&scraped_type=content`,
            { headers, next: { revalidate: 3600 } },
          )
          if (res.ok) {
            data = await res.json()
            break
          }
        }

        if (!data) return []
        const parsed = parseRssXml(data.content, source.name)
        return parsed
      }),
    )

    articles = results
      .filter((r) => r.status === 'fulfilled')
      .flatMap((r) => (r as PromiseFulfilledResult<NewsArticle[]>).value)

    articles.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    )

    // Filter to last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    articles = articles.filter((a) => new Date(a.pubDate) > sevenDaysAgo)
  } catch (error) {
    console.error('News fetch error:', error)
    articles = []
  }

  return <NewsPageClient articles={articles} />
}
