'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Tool } from '@/types/tool'
import FeaturedToolsSkeleton from '@/components/skeletons/FeaturedToolsSkeleton'
import ToolCard from '@/components/tool/ToolCard'

export default function FeaturedTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/tools-proxy?featured=true&page_size=12')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setTools(data.results ?? data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <Box sx={{ py: 10, background: (theme) => theme.customColors.lightBg }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 5,
          }}>
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}>
              Hand-picked
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mt: 0.5,
              }}>
              Featured AI Tools
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/ai-tools"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'primary.main',
              mt: { xs: 2, sm: 0 },
              '&:hover': {
                background: (theme) => `${theme.palette.primary.main}11`,
              },
            }}>
            View all tools
          </Button>
        </Stack>

        {loading ? (
          <FeaturedToolsSkeleton count={6} />
        ) : error ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 4,
            }}>
            Unable to load featured tools right now. Please try again later.
          </Typography>
        ) : tools.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 4,
            }}>
            No featured tools available yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 2.5,
              overflowX: 'auto',
              pb: 2,
              pt: 1,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
            {tools.map((tool) => (
              <Box
                key={tool.id}
                sx={{ minWidth: 260, maxWidth: 260, flexShrink: 0 }}>
                <ToolCard tool={tool} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  )
}
