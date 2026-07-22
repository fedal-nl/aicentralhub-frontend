const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

// Conservative fallback used only if the live count fetch fails.
// Sourced from env so it can be tuned without a code deploy — keep it
// at or slightly below the current live figure, never above it.
const FALLBACK_TOOL_COUNT = Number(process.env.FALLBACK_TOOL_COUNT) || 5000

export async function getTotalToolCount(): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}/api/tools/?page_size=1`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      next: { revalidate: 3600 }, // revalidate hourly
    })
    if (!res.ok) return FALLBACK_TOOL_COUNT
    const data = await res.json()
    return data.count ?? FALLBACK_TOOL_COUNT
  } catch {
    return FALLBACK_TOOL_COUNT
  }
}

export function formatToolCount(count: number): string {
  // Round down to nearest 100, add +
  const rounded = Math.floor(count / 100) * 100
  return `${rounded.toLocaleString()}+`
}
