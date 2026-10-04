import { NextRequest, NextResponse } from 'next/server'
import { authenticatedFetch, getCurrentUserProfile } from '@/lib/backendAuth'

// Proxies GET /api/profiles/{id}/tools/ for the signed-in user. The profile id
// comes from the server-side session, never from the client, so a user can only
// ever request their own submissions.
export async function GET(request: NextRequest) {
  try {
    const profile = await getCurrentUserProfile()
    if (!profile) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const page = request.nextUrl.searchParams.get('page')
    const query = page ? `?page=${encodeURIComponent(page)}` : ''

    const res = await authenticatedFetch(
      `/api/profiles/${profile.id}/tools/${query}`,
    )
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
}
