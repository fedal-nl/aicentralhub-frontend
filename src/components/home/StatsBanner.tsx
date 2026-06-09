'use client'

import { Box, Container, Stack, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VerifiedIcon from '@mui/icons-material/Verified'
import UpdateIcon from '@mui/icons-material/Update'

const stats = [
  { icon: <TrendingUpIcon />, value: '7,000+', label: 'AI Tools Indexed' },
  { icon: <VerifiedIcon />, value: '50+', label: 'Categories Covered' },
  { icon: <UpdateIcon />, value: 'Regularly', label: 'New Tools Added' },
]

export default function StatsBanner() {
  return (
    <Box
      sx={{
        py: 6,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}11, ${theme.palette.secondary.main}11)`,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-around', alignItems: 'center' }}
          spacing={{ xs: 4, sm: 0 }}>
          {stats.map((stat) => (
            <Stack
              key={stat.label}
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  background: (theme) => `${theme.palette.primary.main}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: 'text.primary',
                    lineHeight: 1,
                  }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}>
                  {stat.label}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
