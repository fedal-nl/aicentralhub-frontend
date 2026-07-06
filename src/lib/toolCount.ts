const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

export async function getTotalToolCount(): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}/api/tools/?page_size=1`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      next: { revalidate: 3600 }, // revalidate hourly
    })
    if (!res.ok) return 7000
    const data = await res.json()
    return data.count ?? 7000
  } catch {
    return 7000 // fallback
  }
}

export function formatToolCount(count: number): string {
  // Round down to nearest 100, add +
  const rounded = Math.floor(count / 100) * 100
  return `${rounded.toLocaleString()}+`
}
