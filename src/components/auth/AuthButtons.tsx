'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Button, Stack } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

interface Props {
  callbackUrl?: string
}

export default function AuthButtons({ callbackUrl = '/' }: Props) {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('callbackUrl') ?? callbackUrl

  return (
    <Stack spacing={2}>
      <Button
        onClick={() => signIn('google', { callbackUrl: redirectUrl })}
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
        onClick={() => signIn('github', { callbackUrl: redirectUrl })}
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
