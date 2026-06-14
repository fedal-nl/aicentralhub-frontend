import { Tool } from '@/types/tool'

interface Props {
  tools: Tool[]
}

export default function ToolsListStructuredData({ tools }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Tools Directory',
    description: 'Browse 7,000+ AI tools across 50+ categories.',
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
