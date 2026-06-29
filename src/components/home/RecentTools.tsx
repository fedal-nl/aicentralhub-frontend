'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Tool } from '@/types/tool'
import ToolListSkeleton from '@/components/skeletons/ToolListSkeleton'
import ToolListRow from '@/components/tool/ToolListRow'

export default function RecentTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(
          '/api/tools-proxy?page_size=8&ordering=-created_at',
        )
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setTools(data.results ?? data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchRecent()
  }, [])

  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.customColors.lightBg,
        borderTop: (theme) =>
          `1px solid ${theme.customColors.lightBorderSubtle}`,
      }}>
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
              Fresh picks
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mt: 0.5,
              }}>
              Recently Added
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
          <ToolListSkeleton count={8} />
        ) : error ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 4,
            }}>
            Unable to load recently added tools right now. Please try again
            later.
          </Typography>
        ) : tools.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              textAlign: 'center',
              py: 4,
            }}>
            No tools available yet.
          </Typography>
        ) : (
          <Box
            sx={{
              background: (theme) => theme.customColors.lightBgAlt,
              border: (theme) =>
                `1px solid ${theme.customColors.lightBorderSubtle}`,
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
            {tools.map((tool, index) => (
              <Box key={tool.id}>
                <ToolListRow
                  tool={tool}
                  index={index}
                  isNew
                  secondaryLabel={tool.subcategory}
                />
                {index < tools.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: (theme) =>
                        theme.customColors.lightBorderSubtle,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  )
}
