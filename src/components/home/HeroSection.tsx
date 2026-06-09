'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  InputBase,
  IconButton,
  Chip,
  Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ClearIcon from '@mui/icons-material/Clear'

const stats = [
  { value: '7,000+', label: 'AI Tools' },
  { value: '50+', label: 'Categories' },
  { value: '100%', label: 'Free to Explore' },
]

const trendingSearches = [
  'Image Generator',
  'Code Assistant',
  'Chatbot',
  'Video Editor',
  'SEO',
]

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/ai-tools?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 'auto', md: '55vh' },
        minHeight: 'unset',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: (theme) => theme.palette.background.default,
      }}>
      {/* Animated gradient background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${theme.palette.secondary.main}33 0%, transparent 70%)`,
            top: '-100px',
            right: '-100px',
            animation: 'float1 8s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: (theme) =>
              `radial-gradient(circle, ${theme.palette.primary.main}22 0%, transparent 70%)`,
            bottom: '-50px',
            left: '-50px',
            animation: 'float2 10s ease-in-out infinite',
          },
          '@keyframes float1': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(-30px, 30px) scale(1.1)' },
          },
          '@keyframes float2': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(30px, -30px) scale(1.05)' },
          },
        }}
      />

      {/* Grid overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 3 }}>
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          {/* Badge */}
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            label="The largest free AI tools directory"
            sx={{
              background: (theme) =>
                `rgba(${theme.palette.primary.main}, 0.08)`,
              border: (theme) => `1px solid ${theme.palette.primary.main}44`,
              color: 'primary.main',

              fontWeight: 600,
              px: 1,
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Headline */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem', lg: '3.8rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                mb: 1,
              }}>
              Discover the Best
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.8rem', md: '4.5rem', lg: '5.5rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              AI Tools in One Place
            </Typography>
          </Box>

          {/* Subtext */}
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',

              fontWeight: 400,
              maxWidth: 560,
              lineHeight: 1.7,
              fontSize: { xs: '1rem', md: '1.15rem' },
            }}>
            Browse, compare and review 7,000+ AI tools across 50+ categories.
            Find exactly what you need — completely free.
          </Typography>

          {/* Search bar */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              background: (theme) => theme.palette.background.paper,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              gap: 1,
              boxShadow: (theme) => `0 0 40px ${theme.palette.primary.main}22`,
              transition: 'border-color 0.2s, box-shadow 0.2s',
              '&:focus-within': {
                borderColor: (theme) => theme.palette.primary.main,
                boxShadow: (theme) =>
                  `0 0 40px ${theme.palette.primary.main}44`,
              },
            }}>
            <SearchIcon sx={{ color: 'text.secondary', flexShrink: 0 }} />
            <InputBase
              fullWidth
              placeholder="Search 7,000+ AI tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              sx={{
                fontSize: '1rem',
                color: 'text.primary',
                py: 1,
              }}
            />
            {query && (
              <IconButton
                onClick={() => setQuery('')}
                size="small"
                sx={{
                  color: 'text.secondary',
                  flexShrink: 0,
                  '&:hover': { color: 'text.primary' },
                }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton
              onClick={handleSearch}
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                borderRadius: '10px',
                px: 2,
                py: 1,
                flexShrink: 0,
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Trending searches */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',

                alignSelf: 'center',
              }}>
              Trending:
            </Typography>
            {trendingSearches.map((term) => (
              <Chip
                key={term}
                label={term}
                size="small"
                onClick={() =>
                  router.push(`/ai-tools?search=${encodeURIComponent(term)}`)
                }
                sx={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'text.secondary',
                  cursor: 'pointer',
                  '&:hover': {
                    background: (theme) => `${theme.palette.primary.main}22`,
                    color: 'primary.main',
                    borderColor: 'primary.main',
                  },
                }}
              />
            ))}
          </Stack>

          {/* Stats */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 6 }}
            sx={{ pt: 2 }}>
            {stats.map((stat) => (
              <Box key={stat.label} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
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
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
