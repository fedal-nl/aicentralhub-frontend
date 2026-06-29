'use client'

import Link from 'next/link'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

export default function ComingSoonClient() {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            background: (theme) => theme.customColors.lightBg,
            border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
          }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '18px',
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              color: 'primary.main',
            }}>
            <RocketLaunchIcon sx={{ fontSize: 32 }} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mb: 1.5,
            }}>
            Submit a Tool — Coming Soon
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mb: 4,
              lineHeight: 1.8,
            }}>
            We&apos;re putting the finishing touches on tool submissions,
            including listing options for tool makers. Check back soon!
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center' }}>
            <Button
              component={Link}
              href="/ai-tools"
              variant="outlined"
              sx={{
                fontWeight: 700,
                borderRadius: '10px',
                px: 4,
                borderColor: (theme) => theme.customColors.lightBorder,
                color: (theme) => theme.customColors.lightText,
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                },
              }}>
              Browse AI Tools
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              startIcon={<NotificationsActiveIcon />}
              sx={{
                fontWeight: 700,
                borderRadius: '10px',
                px: 4,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}>
              Get Notified
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
