import { NextRequest, NextResponse } from 'next/server'
import { authenticatedFetch } from '@/lib/backendAuth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  try {
    const res = await authenticatedFetch(`/api/reviews/${id}/`, {
      method: 'DELETE',
    })

    if (res.status === 204 || res.ok) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: res.status },
    )
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
}
