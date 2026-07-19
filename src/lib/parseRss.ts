import { NewsArticle } from '@/types/news'

export function parseRssXml(
  xmlContent: string,
  sourceName: string,
): NewsArticle[] {
  if (!xmlContent) return []

  // Detect Atom feed
  const isAtom =
    xmlContent.includes('<feed') &&
    xmlContent.includes('xmlns="http://www.w3.org/2005/Atom"')

  if (isAtom) {
    return parseAtomFeed(xmlContent, sourceName)
  }
  return parseRssFeed(xmlContent, sourceName)
}

function parseRssFeed(xmlContent: string, sourceName: string): NewsArticle[] {
  try {
    const items: NewsArticle[] = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match

    while ((match = itemRegex.exec(xmlContent)) !== null) {
      const item = match[1]

      const title =
        extractCdata(item, 'title') ?? extractTag(item, 'title') ?? ''
      const link = extractTag(item, 'link') ?? ''
      const description =
        extractCdata(item, 'description') ??
        extractTag(item, 'description') ??
        ''
      const pubDate = extractTag(item, 'pubDate') ?? ''
      const author = extractCdata(item, 'dc:creator') ?? ''
      const categories = extractAllCdata(item, 'category')

      if (title && link) {
        items.push({
          title: decodeHtmlEntities(title),
          link,
          description: decodeHtmlEntities(description.trim()),
          pubDate,
          author,
          categories,
          source: sourceName.toLowerCase().replace(/\s+/g, '-'),
          sourceName,
        })
      }
    }

    return items
  } catch {
    return []
  }
}

function parseAtomFeed(xmlContent: string, sourceName: string): NewsArticle[] {
  try {
    const items: NewsArticle[] = []
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
    let match

    while ((match = entryRegex.exec(xmlContent)) !== null) {
      const entry = match[1]

      const title =
        extractCdata(entry, 'title') ?? extractTag(entry, 'title') ?? ''

      // Atom uses <link href="url"/> not <link>url</link>
      const linkMatch = entry.match(/<link[^>]+href="([^"]+)"/)
      const link = linkMatch ? linkMatch[1] : ''

      const description =
        extractCdata(entry, 'summary') ??
        extractTag(entry, 'summary') ??
        extractCdata(entry, 'content') ??
        extractTag(entry, 'content') ??
        ''

      const pubDate =
        extractTag(entry, 'published') ?? extractTag(entry, 'updated') ?? ''

      // Atom author format: <author><name>...</name></author>
      const authorMatch = entry.match(
        /<author>[\s\S]*?<name>([\s\S]*?)<\/name>/,
      )
      const author = authorMatch ? authorMatch[1].trim() : ''

      const categories: string[] = []
      const catRegex = /<category[^>]+term="([^"]+)"/g
      let catMatch
      while ((catMatch = catRegex.exec(entry)) !== null) {
        categories.push(catMatch[1])
      }

      if (title && link) {
        items.push({
          title: decodeHtmlEntities(title),
          link,
          description: decodeHtmlEntities(description.trim()),
          pubDate,
          author,
          categories,
          source: sourceName.toLowerCase().replace(/\s+/g, '-'),
          sourceName,
        })
      }
    }

    return items
  } catch {
    return []
  }
}

function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  const match = xml.match(regex)
  if (!match) return null

  // Strip CDATA wrapper if present
  const value = match[1].trim()
  const cdataMatch = value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/)
  return cdataMatch ? cdataMatch[1].trim() : value
}

function extractCdata(xml: string, tag: string): string | null {
  const regex = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`,
  )
  const match = xml.match(regex)
  return match ? match[1].trim() : null
}

function extractAllCdata(xml: string, tag: string): string[] {
  const regex = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`,
    'g',
  )
  const results: string[] = []
  let match
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim())
  }
  return results
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // strip HTML tags first
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .trim()
}
