import { NextRequest, NextResponse } from 'next/server'
import { authenticatedFetch } from '@/lib/backendAuth'

export async function GET() {
  try {
    const res = await authenticatedFetch('/api/favorites/')
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await authenticatedFetch('/api/favorites/', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
}
