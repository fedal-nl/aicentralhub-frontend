import { Tool } from '@/types/tool'

interface Props {
  tools: Tool[]
  toolCountLabel: string
}

export default function ToolsListStructuredData({
  tools,
  toolCountLabel,
}: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Tools Directory',
    description: `Browse ${toolCountLabel} AI tools across 12 categories & 50+ subcategories.`,
    url: 'https://ai-centralhub.com/ai-tools',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      description: tool.description,
      url: `https://ai-centralhub.com/tool/${tool.slug}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
