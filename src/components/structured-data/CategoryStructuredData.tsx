import { Category } from '@/types/tool'

interface Props {
  cat: Category
  baseUrl?: string
}

export default function CategoryStructuredData({
  cat,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ai-centralhub.com',
}: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} AI Tools`,
    description: `Browse ${cat.count} AI tools in the ${cat.name} category.`,
    url: `${baseUrl}/ai-tools/${cat.slug}`,
    hasPart: cat.subcategories.map((sub) => ({
      '@type': 'CollectionPage',
      name: `${sub.name} AI Tools`,
      url: `${baseUrl}/ai-tools/${cat.slug}/${sub.slug}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
