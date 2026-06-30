import { DefaultSession } from 'next-auth'

interface BackendProfile {
  id: number
  username: string
  social_provider: string
  social_uid: string
  display_name: string
  avatar_url: string
  subscribed_at: string
  updated_at: string
}

declare module 'next-auth' {
  interface Session {
    backendToken?: string
    backendTokenType?: string
    backendProfile?: BackendProfile
    error?: string
    user: {
      id?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    backendToken?: string
    backendTokenType?: string
    backendTokenExpires?: number
    backendRefreshToken?: string
    backendRefreshExpires?: number
    backendProfile?: BackendProfile
    error?: string
  }
}
