'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, Typography, Button, Stack } from '@mui/material'
import CookieIcon from '@mui/icons-material/Cookie'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      // Small delay so it doesn't flash on first render
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
    // Here you would initialize analytics (Google Analytics etc.)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
    // Analytics will not be initialized
  }

  if (!visible) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        right: 24,
        zIndex: 9999,
        maxWidth: 520,
        background: '#0A0E1A',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        p: 3,
        animation: 'slideUp 0.3s ease',
        '@keyframes slideUp': {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
      }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            background: (theme) => `${theme.palette.primary.main}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main',
            flexShrink: 0,
          }}>
          <CookieIcon fontSize="small" />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: '#F1F5F9', mb: 0.5 }}>
            We use cookies
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#94A3B8', lineHeight: 1.7, display: 'block', mb: 2 }}>
            We use cookies to improve your experience and analyse how our site
            is used. Read our{' '}
            <Link
              href="/cookies-policy"
              style={{ color: '#00D4FF', textDecoration: 'underline' }}>
              Cookies Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy-policy"
              style={{ color: '#00D4FF', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Button
              onClick={handleDecline}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                borderRadius: '8px',
                borderColor: 'rgba(255,255,255,0.12)',
                color: '#94A3B8',
                fontSize: '0.8rem',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.24)',
                  color: '#F1F5F9',
                  background: 'rgba(255,255,255,0.05)',
                },
              }}>
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              size="small"
              variant="contained"
              sx={{
                fontWeight: 600,
                borderRadius: '8px',
                fontSize: '0.8rem',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}>
              Accept All
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
