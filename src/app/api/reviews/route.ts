import { NextRequest, NextResponse } from 'next/server'
import { authenticatedFetch } from '@/lib/backendAuth'

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const toolId = searchParams.get('tool')

  const query = new URLSearchParams()
  if (toolId) query.set('tool', toolId)

  try {
    const res = await fetch(`${BASE_URL}/api/reviews/?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await authenticatedFetch('/api/reviews/', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
}
