export function addUtmParams(url: string): string {
  if (!url) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}utm_source=ai-centralhub&utm_medium=directory&utm_campaign=listing`
}
