import { NextResponse } from 'next/server'
import { authenticatedFetch } from '@/lib/backendAuth'

export async function GET() {
  try {
    const res = await authenticatedFetch('/api/tools/mine/')
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
}
