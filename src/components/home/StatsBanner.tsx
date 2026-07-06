'use client'

import { Box, Container, Stack, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CategoryIcon from '@mui/icons-material/Category'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import UpdateIcon from '@mui/icons-material/Update'

interface StatsBannerProps {
  toolCountLabel: string
}

export default function StatsBanner({ toolCountLabel }: StatsBannerProps) {
  const stats = [
    {
      icon: <TrendingUpIcon />,
      value: toolCountLabel,
      label: 'AI Tools Indexed',
    },
    { icon: <CategoryIcon />, value: '12', label: 'Categories' },
    { icon: <AccountTreeIcon />, value: '59', label: 'Subcategories' },
    { icon: <UpdateIcon />, value: 'Regularly', label: 'New Tools Added' },
  ]

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
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
