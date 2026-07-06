'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  InputBase,
  IconButton,
  Button,
  Stack,
  Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import HomeIcon from '@mui/icons-material/Home'
import GridViewIcon from '@mui/icons-material/GridView'

interface NotFoundClientProps {
  toolCountLabel: string
}

const suggestions = [
  'ChatGPT',
  'Image Generator',
  'Code Assistant',
  'Video Editor',
  'Text to Speech',
]

export default function NotFoundClient({
  toolCountLabel,
}: NotFoundClientProps) {
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
        background: (theme) => theme.palette.background.default,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Background gradient blobs */}
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

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 10 }}>
        <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
          {/* 404 number */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '6rem', md: '10rem' },
              lineHeight: 1,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
            }}>
            404
          </Typography>

          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
              Page not found
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 460,
                lineHeight: 1.8,
                mx: 'auto',
              }}>
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Try searching for the AI tool you need.
            </Typography>
          </Box>

          {/* Search bar */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 500,
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
              placeholder={`Search ${toolCountLabel} AI tools...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ fontSize: '1rem', color: 'text.primary', py: 1 }}
            />
            {query && (
              <IconButton
                onClick={() => setQuery('')}
                size="small"
                sx={{
                  color: 'text.secondary',
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

          {/* Suggestions */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', alignSelf: 'center' }}>
              Try:
            </Typography>
            {suggestions.map((term) => (
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

          {/* Action buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{
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
              Back to Home
            </Button>
            <Button
              component={Link}
              href="/ai-tools"
              variant="outlined"
              startIcon={<GridViewIcon />}
              sx={{
                fontWeight: 700,
                borderRadius: '10px',
                px: 4,
                py: 1.5,
                borderColor: 'rgba(255,255,255,0.12)',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  background: (theme) => `${theme.palette.primary.main}11`,
                },
              }}>
              Browse AI Tools
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
