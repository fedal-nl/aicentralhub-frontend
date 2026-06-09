'use client'

import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import ExploreIcon from '@mui/icons-material/Explore'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import UpdateIcon from '@mui/icons-material/Update'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'

const reasons = [
  {
    icon: <ExploreIcon sx={{ fontSize: 28 }} />,
    title: '7,000+ AI Tools',
    description:
      'The largest free AI tools directory on the web. Every category, every use case — all in one place.',
  },
  {
    icon: <MoneyOffIcon sx={{ fontSize: 28 }} />,
    title: '100% Free to Use',
    description:
      'No paywalls, no sign-up required. Browse, compare and discover AI tools completely free.',
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 28 }} />,
    title: 'Curated & Unbiased',
    description:
      'Every tool is hand-reviewed by our team. No paid placements — just honest, quality listings.',
  },
  {
    icon: <UpdateIcon sx={{ fontSize: 28 }} />,
    title: 'Updated Regularly',
    description:
      'New AI tools are added regularly so you always have access to the latest innovations in AI.',
  },
]

export default function WhySection() {
  return (
    <Box
      sx={{
        py: 10,
        background: (theme) =>
          `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
      <Container maxWidth="xl">
        {/* Section header */}
        <Stack
          spacing={1}
          sx={{ alignItems: 'center', textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',

              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Why us
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
            }}>
            Why AI CentralHub?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',

              maxWidth: 500,
              lineHeight: 1.8,
            }}>
            We built the directory we always wanted — comprehensive, honest and
            completely free.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {reasons.map((reason, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={reason.title}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  background: (theme) => theme.palette.background.paper,
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: (theme) => theme.palette.primary.main,
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) =>
                      `0 8px 32px ${theme.palette.primary.main}22`,
                  },
                }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '14px',
                    background: (theme) =>
                      index % 2 === 0
                        ? `${theme.palette.primary.main}22`
                        : `${theme.palette.secondary.main}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: (theme) =>
                      index % 2 === 0
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                    mb: 2.5,
                  }}>
                  {reason.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 1,
                  }}>
                  {reason.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',

                    lineHeight: 1.8,
                  }}>
                  {reason.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
