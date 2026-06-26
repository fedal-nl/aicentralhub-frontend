import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

const BACKEND_URL = process.env.BACKEND_URL ?? 'https://api.fedal.xyz'
const API_KEY = process.env.API_KEY ?? ''

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
      // Only runs on initial sign-in, not on every session check
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
            const data = await res.json()
            token.backendToken = data.token
            token.backendTokenType = data.token_type
            token.backendTokenExpires = Date.now() + data.expires_in * 1000
            token.backendProfile = data.profile
          } else {
            console.error('Backend social login failed:', res.status)
          }
        } catch (error) {
          console.error('Backend social login error:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      session.backendToken = token.backendToken as string | undefined
      session.backendTokenType = token.backendTokenType as string | undefined
      session.backendProfile =
        token.backendProfile as typeof session.backendProfile
      return session
    },
  },
})
