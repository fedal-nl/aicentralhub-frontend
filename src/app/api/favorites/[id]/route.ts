import { NextRequest, NextResponse } from 'next/server'
import { authenticatedFetch } from '@/lib/backendAuth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    // TODO: backend does not yet support DELETE on /api/favorites/{id}/
    // This will work once that endpoint is added — see GitHub issue.
    const res = await authenticatedFetch(`/api/favorites/${id}/`, {
      method: 'DELETE',
    })

    if (res.status === 204 || res.ok) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json(
      { error: 'Failed to remove favorite' },
      { status: res.status },
    )
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
}
