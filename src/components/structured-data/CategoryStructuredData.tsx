import { ParentCategory } from '@/types/tool'

interface Props {
  cat: ParentCategory
  baseUrl?: string
}

export default function CategoryStructuredData({
  cat,
  baseUrl = 'https://ai-centralhub.com',
}: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} AI Tools`,
    description: cat.description,
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
