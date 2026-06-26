'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import { Tool } from '@/types/tool'
import { allTools as mockTools } from '@/data/mockData'
import ToolListSkeleton from '@/components/skeletons/ToolListSkeleton'

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-for-pricing': '#FF9500',
}

export default function RecentTools() {
  const [tools, setTools] = useState<Tool[]>(mockTools.slice(0, 8))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        // Backend should support ordering by created_at desc
        const res = await fetch(
          '/api/tools-proxy?page_size=8&ordering=-created_at',
        )
        const data = await res.json()
        const results = data.results ?? data
        if (results.length > 0) setTools(results)
      } catch {
        // fallback to mock data already set
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
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    p: 3,
                    gap: 2,
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: (theme) => `${theme.palette.primary.main}08`,
                    },
                  }}>
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ alignItems: 'center', flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: (theme) => theme.customColors.lightBorder,
                        minWidth: 32,
                        fontSize: '1.2rem',
                      }}>
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: 'center',
                          mb: 0.5,
                          flexWrap: 'wrap',
                        }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: (theme) => theme.customColors.lightText,
                          }}>
                          {tool.name}
                        </Typography>
                        <FiberNewIcon
                          sx={{ fontSize: 20, color: 'primary.main' }}
                        />
                        <Chip
                          label={tool.subcategory}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            background: (theme) =>
                              theme.customColors.lightChipBg,
                            border: (theme) =>
                              `1px solid ${theme.customColors.lightBorder}`,
                            color: (theme) =>
                              theme.customColors.lightTextSecondary,
                          }}
                        />
                        <Chip
                          label={tool.pricing}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: `${pricingColor[tool.pricing]}22`,
                            color: pricingColor[tool.pricing],
                            border: `1px solid ${pricingColor[tool.pricing]}44`,
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                          lineHeight: 1.6,
                        }}>
                        {tool.description}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                    <Button
                      component={Link}
                      href={`/tool/${tool.slug}`}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: (theme) => theme.customColors.lightBorder,
                        color: (theme) => theme.customColors.lightTextSecondary,
                        borderRadius: '8px',
                        '&:hover': {
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          background: (theme) =>
                            `${theme.palette.primary.main}11`,
                        },
                      }}>
                      Details
                    </Button>
                    <Button
                      component="a"
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      size="small"
                      endIcon={<OpenInNewIcon fontSize="small" />}
                      sx={{
                        borderRadius: '8px',
                        color: '#fff',
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        '&:hover': {
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        },
                      }}>
                      Visit
                    </Button>
                  </Stack>
                </Stack>
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
