import { DefaultSession } from 'next-auth'
import { BackendProfile } from '@/types/auth'

declare module 'next-auth' {
  interface Session {
    backendToken?: string
    backendTokenType?: string
    backendProfile?: BackendProfile
    isNewUser?: boolean
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
    isNewUser?: boolean
    error?: string
  }
}
