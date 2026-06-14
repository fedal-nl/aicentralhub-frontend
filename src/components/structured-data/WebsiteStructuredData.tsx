export default function WebsiteStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI CentralHub',
    url: 'https://ai-centralhub.com',
    description:
      'Free AI tools directory with 7,000+ tools across 50+ categories.',
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
