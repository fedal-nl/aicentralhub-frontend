'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Chip,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())

  const handleSubscribe = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error('Failed to subscribe')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.customColors.lightBgAlt,
        borderTop: (theme) =>
          `1px solid ${theme.customColors.lightBorderSubtle}`,
        borderBottom: (theme) =>
          `1px solid ${theme.customColors.lightBorderSubtle}`,
      }}>
      <Container maxWidth="md">
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '14px',
              background: (theme) => `${theme.palette.primary.main}22`,
              border: (theme) => `1px solid ${theme.palette.primary.main}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
            }}>
            <EmailIcon />
          </Box>

          <Box>
            <Chip
              label="Weekly newsletter"
              size="small"
              sx={{
                fontWeight: 600,
                background: (theme) => `${theme.palette.primary.main}11`,
                color: 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}44`,
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mb: 1,
              }}>
              Stay ahead of AI
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                maxWidth: 480,
                mx: 'auto',
                lineHeight: 1.8,
              }}>
              Get the best new AI tools delivered to your inbox every week. No
              spam, unsubscribe anytime.
            </Typography>
          </Box>

          {submitted ? (
            <Stack spacing={1} sx={{ alignItems: 'center' }}>
              <CheckCircleOutlineIcon
                sx={{ fontSize: 40, color: 'primary.main' }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: 'text.primary' }}>
                You&apos;re subscribed!
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                We&apos;ll be in touch with the best new AI tools every week.
              </Typography>
            </Stack>
          ) : (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ width: '100%', maxWidth: 480 }}>
              <TextField
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                fullWidth
                size="small"
                error={!!error}
                helperText={error}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    background: (theme) => theme.customColors.lightBg,
                    color: (theme) => theme.customColors.lightText,
                    '& fieldset': {
                      borderColor: (theme) => theme.customColors.lightBorder,
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) =>
                        theme.customColors.lightTextSecondary,
                    },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& input::placeholder': {
                    color: (theme) => theme.customColors.lightTextSecondary,
                  },
                }}
              />
              <Button
                onClick={handleSubscribe}
                variant="contained"
                disabled={loading || !email}
                sx={{
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 3,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: '#fff',
                  '&:hover': {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                  '&.Mui-disabled': {
                    background: 'rgba(255,255,255,0.08)',
                    color: 'text.secondary',
                  },
                }}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
