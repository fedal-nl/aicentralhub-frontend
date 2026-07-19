export interface NewsArticle {
  title: string
  link: string
  description: string
  pubDate: string
  author: string
  categories: string[]
  source: string
  sourceName: string
}

export interface NewsSource {
  slug: string
  name: string
  url: string
}
