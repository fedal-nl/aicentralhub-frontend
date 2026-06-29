'use client'

import { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Chip, Stack } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Tool } from '@/types/tool'
import FeaturedToolsSkeleton from '@/components/skeletons/FeaturedToolsSkeleton'
import ToolCard from '@/components/tool/ToolCard'

export default function FeaturedToolsPageClient() {
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
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      <Box
        sx={{
          background: (theme) => theme.customColors.lightBg,
          borderBottom: (theme) =>
            `1px solid ${theme.customColors.lightBorderSubtle}`,
          py: 8,
        }}>
        <Container maxWidth="xl">
          <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
              label="Hand-picked by the team"
              sx={{
                fontWeight: 600,
                background: (theme) => `${theme.palette.primary.main}11`,
                border: (theme) => `1px solid ${theme.palette.primary.main}44`,
                color: 'primary.main',
                px: 1,
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}>
              Curated Selection
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
              }}>
              Featured AI Tools
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.customColors.lightTextSecondary,
                maxWidth: 560,
                lineHeight: 1.8,
              }}>
              A hand-picked selection of the best AI tools across every
              category, chosen by the AI CentralHub team for their quality,
              innovation and usefulness.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        {loading ? (
          <FeaturedToolsSkeleton count={12} />
        ) : error ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 6,
            }}>
            Unable to load featured tools right now. Please try again later.
          </Typography>
        ) : tools.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 6,
            }}>
            No featured tools available yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tools.map((tool, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
                <ToolCard tool={tool} topPick={index < 3} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
