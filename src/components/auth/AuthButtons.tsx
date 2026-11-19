'use client'

import { signIn } from 'next-auth/react'
import { Button, Stack } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

interface Props {
  callbackUrl?: string
}

export default function AuthButtons({ callbackUrl = '/' }: Props) {
  // Read ?callbackUrl= at click time instead of with useSearchParams():
  // useSearchParams() on a statically prerendered page (/signup) needs a
  // Suspense boundary, otherwise `next build` fails. Reading it on click
  // keeps the buttons in the static HTML (no fallback, no layout shift).
  const handleSignIn = (provider: 'google' | 'github') => {
    const redirectUrl =
      new URLSearchParams(window.location.search).get('callbackUrl') ??
      callbackUrl
    signIn(provider, { callbackUrl: redirectUrl })
  }

  return (
    <Stack spacing={2}>
      <Button
        onClick={() => handleSignIn('google')}
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        sx={{
          py: 1.5,
          borderRadius: '10px',
          borderColor: 'rgba(255,255,255,0.15)',
          color: 'text.primary',
          fontWeight: 600,
          '&:hover': {
            borderColor: 'primary.main',
            background: (theme) => `${theme.palette.primary.main}11`,
          },
        }}>
        Continue with Google
      </Button>
      <Button
        onClick={() => handleSignIn('github')}
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        sx={{
          py: 1.5,
          borderRadius: '10px',
          borderColor: 'rgba(255,255,255,0.15)',
          color: 'text.primary',
          fontWeight: 600,
          '&:hover': {
            borderColor: 'primary.main',
            background: (theme) => `${theme.palette.primary.main}11`,
          },
        }}>
        Continue with GitHub
      </Button>
    </Stack>
  )
}
