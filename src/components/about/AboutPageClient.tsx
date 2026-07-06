'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Divider,
  Grid,
} from '@mui/material'
import ExploreIcon from '@mui/icons-material/Explore'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import GroupsIcon from '@mui/icons-material/Groups'
import EmailIcon from '@mui/icons-material/Email'

interface AboutPageClientProps {
  toolCountLabel: string
}

const values = [
  {
    icon: <ExploreIcon sx={{ fontSize: 32 }} />,
    title: 'Discover',
    description:
      'We make it easy to find the right AI tool for any task — from writing and design to coding and business.',
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 32 }} />,
    title: 'Free to explore',
    description:
      'Browsing and discovering AI tools on AI CentralHub is completely free — no paywalls, no hidden fees. Always.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 32 }} />,
    title: 'Community-driven',
    description:
      'Our reviews and ratings come from real users. We believe honest feedback helps everyone make better decisions.',
  },
]

export default function AboutPageClient({
  toolCountLabel,
}: AboutPageClientProps) {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      {/* Header */}
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          borderBottom: (theme) =>
            `1px solid ${theme.customColors.lightBorderSubtle}`,
          py: 10,
        }}>
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            About us
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 1,
              mb: 3,
            }}>
            Helping the world discover AI tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              lineHeight: 1.9,
              fontSize: '1.1rem',
            }}>
            AI CentralHub is a free directory of {toolCountLabel} AI tools
            across 12 categories. We built it because finding the right AI tool
            shouldn&apos;t require hours of research — it should take minutes.
            Our mission is simple: help individuals, teams and businesses
            discover, compare and choose the AI tools that actually work for
            them.
          </Typography>
        </Container>
      </Box>

      {/* Values */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {values.map((value) => (
            <Grid size={{ xs: 12, md: 4 }} key={value.title}>
              <Box
                sx={{
                  background: (theme) => theme.customColors.lightBg,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  borderRadius: '16px',
                  p: 4,
                  height: '100%',
                }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '14px',
                    background: (theme) => `${theme.palette.primary.main}11`,
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                    mb: 3,
                  }}>
                  {value.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: (theme) => theme.customColors.lightText,
                    mb: 1.5,
                  }}>
                  {value.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) => theme.customColors.lightTextSecondary,
                    lineHeight: 1.8,
                  }}>
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider
        sx={{ borderColor: (theme) => theme.customColors.lightBorderSubtle }}
      />

      {/* Who we are */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: (theme) => theme.customColors.lightText,
            mb: 3,
          }}>
          Who we are
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: (theme) => theme.customColors.lightTextSecondary,
            lineHeight: 1.9,
            mb: 3,
          }}>
          AI CentralHub is built and maintained by{' '}
          <strong style={{ color: 'inherit' }}>The Webdux Hub</strong> — an
          independent software studio focused on building useful, AI-first
          products. We&apos;re a small team of builders who believe AI tools
          should be accessible to everyone, not just those who know where to
          look.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: (theme) => theme.customColors.lightTextSecondary,
            lineHeight: 1.9,
          }}>
          We launched AI CentralHub because we kept running into the same
          problem ourselves — too many AI tools, too little clarity. We built
          the directory we wished existed, and we&apos;re committed to keeping
          it free, up to date and genuinely useful.
        </Typography>
      </Container>

      <Divider
        sx={{ borderColor: (theme) => theme.customColors.lightBorderSubtle }}
      />

      {/* Contact CTA */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
            }}>
            Get in touch
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              lineHeight: 1.9,
            }}>
            Have a question, want to submit a tool, or just want to say hello?
            We&apos;d love to hear from you.
          </Typography>
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            startIcon={<EmailIcon />}
            sx={{
              mt: 1,
              fontWeight: 700,
              borderRadius: '10px',
              px: 4,
              py: 1.5,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: '#fff',
              '&:hover': {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
            }}>
            Contact us
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
