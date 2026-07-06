interface Props {
  toolCountLabel: string
}

export default function WebsiteStructuredData({ toolCountLabel }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI CentralHub',
    url: 'https://ai-centralhub.com',
    description: `Free AI tools directory with ${toolCountLabel} tools across 12 categories & 50+ subcategories.`,
    publisher: {
      '@type': 'Organization',
      name: 'The Webdux Hub',
      url: 'https://ai-centralhub.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://ai-centralhub.com/ai-tools?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
