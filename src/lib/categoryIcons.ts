export const categoryIcons: Record<string, string> = {
  productivity: '⚡',
  'content-writing': '✍️',
  'image-design': '🎨',
  video: '🎬',
  audio: '🎵',
  'code-developer': '💻',
  'marketing-seo': '📈',
  business: '💼',
  'ai-chatbots': '🤖',
  education: '🎓',
  'fun-creative': '🎭',
  'health-life': '❤️',
}

export const getCategoryIcon = (slug: string): string => {
  return categoryIcons[slug] ?? '🔧'
}
