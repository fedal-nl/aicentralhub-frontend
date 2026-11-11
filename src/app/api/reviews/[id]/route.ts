import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { authenticatedFetch } from '@/lib/backendAuth'

// Tool pages are cached (ISR), so after a review write we revalidate the
// page it was posted from. The path comes from the client, so only accept
// a /tool/<slug> path — never revalidate arbitrary routes.
function revalidateToolPage(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
  if (path && /^\/tool\/[a-z0-9-]+$/i.test(path)) {
    revalidatePath(path)
  }
}

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
      revalidateToolPage(request)
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
