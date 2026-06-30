import { NextResponse } from 'next/server'

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

export async function GET() {
  try {
    const url = `${BASE_URL}/api/tools/categories/`
    console.log('Fetching categories from:', url)
    console.log('API_KEY present:', !!API_KEY)

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      next: { revalidate: 3600 },
    })

    console.log('Categories response status:', res.status)

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
