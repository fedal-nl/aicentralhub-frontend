import { NextRequest, NextResponse } from 'next/server'
import { authenticatedFetch } from '@/lib/backendAuth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  try {
    const res = await authenticatedFetch(`/api/tools/${slug}/`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json(
        { isCreatedByCurrentUser: false, creationSource: null },
        { status: 200 },
      )
    }

    const data = await res.json()

    return NextResponse.json(
      {
        isCreatedByCurrentUser: Boolean(data.is_created_by_current_user),
        creationSource: data.creation_source ?? null,
      },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } },
    )
  } catch {
    // Not authenticated, or backend error — badge just doesn't show
    return NextResponse.json(
      { isCreatedByCurrentUser: false, creationSource: null },
      { status: 200 },
    )
  }
}
