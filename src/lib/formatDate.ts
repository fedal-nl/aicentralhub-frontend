// Formats an ISO date string as a short relative label for display next to
// recently added tools, e.g. "Added today", "Added 3 days ago",
// "Added 2 months ago". Returns null for missing/invalid input so callers
// can skip rendering entirely.
export function formatRelativeDate(dateString?: string): string | null {
  if (!dateString) return null

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  const diffDays = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffDays <= 0) return 'Added today'
  if (diffDays === 1) return 'Added yesterday'
  if (diffDays < 7) return `Added ${diffDays} days ago`

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `Added ${weeks} week${weeks > 1 ? 's' : ''} ago`
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `Added ${months} month${months > 1 ? 's' : ''} ago`
  }

  const years = Math.floor(diffDays / 365)
  return `Added ${years} year${years > 1 ? 's' : ''} ago`
}
