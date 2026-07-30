import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import type {} from 'next-auth/jwt'
import { sendNewUserEmails } from '@/lib/authEmails'

const BACKEND_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

interface BackendAuthResponse {
  token: string
  token_type: string
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
  is_new_user?: boolean
  profile: {
    id: number
    username: string
    social_provider: string
    social_uid: string
    display_name: string
    avatar_url: string
    subscribed_at: string
    updated_at: string
  }
}

async function refreshBackendToken(refreshToken: string) {
  const res = await fetch(`${BACKEND_URL}/api/auth/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!res.ok) {
    throw new Error('Failed to refresh token')
  }

  return res.json()
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign-in
      if (account && user) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/auth/social/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': API_KEY,
            },
            body: JSON.stringify({
              social_provider: account.provider,
              social_uid: account.providerAccountId,
              email: user.email,
              display_name: user.name ?? '',
              avatar_url: user.image ?? '',
            }),
          })

          if (res.ok) {
            const data: BackendAuthResponse = await res.json()
            token.backendToken = data.token
            token.backendTokenType = data.token_type
            token.backendTokenExpires = Date.now() + data.expires_in * 1000
            token.backendRefreshToken = data.refresh_token
            token.backendRefreshExpires =
              Date.now() + data.refresh_expires_in * 1000
            token.backendProfile = data.profile
            token.isNewUser = Boolean(data.is_new_user)
            delete token.error

            if (token.isNewUser) {
              await sendNewUserEmails({
                name: user.name,
                email: user.email,
                provider: account.provider,
              })
            }
          } else {
            console.error('Backend social login failed:', res.status)
            token.error = 'BackendLoginFailed'
          }
        } catch (error) {
          console.error('Backend social login error:', error)
          token.error = 'BackendLoginFailed'
        }
        return token
      }

      // Subsequent requests — check if access token needs refreshing
      // Refresh 60 seconds before actual expiry to avoid edge-case race conditions
      const expiresAt = token.backendTokenExpires ?? 0
      const shouldRefresh = Date.now() > expiresAt - 60_000

      if (
        shouldRefresh &&
        token.backendRefreshToken &&
        typeof token.backendRefreshToken === 'string'
      ) {
        try {
          const data: BackendAuthResponse = await refreshBackendToken(
            token.backendRefreshToken,
          )
          token.backendToken = data.token
          token.backendTokenType = data.token_type
          token.backendTokenExpires = Date.now() + data.expires_in * 1000
          // Some refresh endpoints rotate the refresh token too — use the new one if provided
          if (data.refresh_token) {
            token.backendRefreshToken = data.refresh_token
            token.backendRefreshExpires =
              Date.now() + data.refresh_expires_in * 1000
          }
          delete token.error
        } catch (error) {
          console.error('Token refresh failed:', error)
          token.error = 'RefreshTokenFailed'
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      session.backendToken = token.backendToken
      session.backendTokenType = token.backendTokenType
      session.backendProfile = token.backendProfile
      session.isNewUser = token.isNewUser
      session.error = token.error
      return session
    },
  },
})
