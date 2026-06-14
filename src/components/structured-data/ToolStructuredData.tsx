import { Tool } from '@/types/tool'

interface Props {
  tool: Tool
}

export default function ToolStructuredData({ tool }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: tool.url,
    description: tool.description,
    applicationCategory: 'AIApplication',
    operatingSystem: tool.appType === 'app' ? 'Android, iOS' : 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' ? '0' : undefined,
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
      description: tool.pricing
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    },
    ...(tool.rating && tool.reviewCount && tool.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool.rating.toFixed(1),
            reviewCount: tool.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    ...(tool.logo ? { image: tool.logo } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
