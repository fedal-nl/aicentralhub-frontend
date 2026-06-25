'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Container, Typography, Stack } from '@mui/material'

interface Props {
  title: string
  subtitle: string
  children: ReactNode
  footerText: string
  footerLinkText: string
  footerLinkHref: string
}

export default function AuthPageLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) => theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 6,
      }}>
      {/* Gradient blobs */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${theme.palette.secondary.main}22 0%, transparent 70%)`,
            top: '-100px',
            right: '-100px',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${theme.palette.primary.main}22 0%, transparent 70%)`,
            bottom: '-100px',
            left: '-100px',
          },
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} sx={{ alignItems: 'center' }}>
          {/* Logo */}
          <Link href="/">
            <Image
              src="/assets/ai-centralhub-logo-dark-version.png"
              alt="AI CentralHub"
              width={220}
              height={55}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* Card */}
          <Box
            sx={{
              width: '100%',
              background: (theme) => theme.palette.background.paper,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
              p: { xs: 3, sm: 5 },
            }}>
            <Stack spacing={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {subtitle}
                </Typography>
              </Box>

              {children}

              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {footerText}{' '}
                <Link
                  href={footerLinkHref}
                  style={{
                    color: '#00D4FF',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}>
                  {footerLinkText}
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
