'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import YouTubeIcon from '@mui/icons-material/YouTube'
import XIcon from '@mui/icons-material/X'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const baseFooterLinks: Record<string, { label: string; href: string }[]> = {
  'AI CentralHub': [
    { label: 'Home', href: '/' },
    { label: 'Featured Tools', href: '/featured-tools' },
    { label: 'AI Tools', href: '/ai-tools' },
    { label: 'Categories', href: '/categories' },
    // { label: 'Submit a Tool', href: '/submit-tool' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cookies Policy', href: '/cookies-policy' },
  ],
}

const socialLinks = [
  {
    icon: <YouTubeIcon />,
    href: 'https://www.youtube.com/@Ai-CentralHub',
    label: 'YouTube',
  },
  { icon: <XIcon />, href: 'https://x.com/AiCentralhub', label: 'X / Twitter' },
  {
    icon: <FacebookIcon />,
    href: 'https://www.facebook.com/profile.php?id=61563494424027',
    label: 'Facebook',
  },
  {
    icon: <InstagramIcon />,
    href: 'https://www.instagram.com/aicentralhub/',
    label: 'Instagram',
  },
]

export default function Footer() {
  const { status } = useSession()

  const accountLinks =
    status === 'loading'
      ? [] // Show nothing while checking session
      : status === 'authenticated'
        ? [{ label: 'Dashboard', href: '/dashboard' }]
        : [
            { label: 'Login', href: '/login' },
            { label: 'Sign Up', href: '/signup' },
          ]

  const footerLinks = {
    ...baseFooterLinks,
    Account: accountLinks,
  }

  return (
    <Box
      component="footer"
      sx={{
        background: '#0D1117',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
              AI CentralHub
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 280, lineHeight: 1.8 }}>
              Your free AI tools directory. Discover, compare and review 7,000+
              AI tools across 50+ categories.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              {socialLinks.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    '&:hover': {
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      background: 'rgba(0, 212, 255, 0.06)',
                    },
                  }}>
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid size={{ xs: 6, md: 2 }} key={title}>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                }}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'primary.main' },
                      }}>
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.06)' }} />

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center' }}>
          © {new Date().getFullYear()} AI CentralHub by The Webdux Hub
        </Typography>
      </Container>
    </Box>
  )
}
