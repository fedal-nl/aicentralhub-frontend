import { auth } from '@/auth'

const BASE_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

export async function authenticatedFetch(
  path: string,
  options: RequestInit = {},
) {
  const session = await auth()

  if (!session?.backendToken) {
    throw new Error('Not authenticated')
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
    Authorization: `${session.backendTokenType ?? 'Bearer'} ${session.backendToken}`,
    ...options.headers,
  }

  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })
}

export async function getCurrentUserProfile() {
  const session = await auth()
  return session?.backendProfile ?? null
}
