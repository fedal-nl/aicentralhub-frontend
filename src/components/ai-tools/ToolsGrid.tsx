'use client'

import Link from 'next/link'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Tool } from '@/types/tool'

interface ToolsGridProps {
  tools: Tool[]
}

const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  if (tools.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
          }}>
          No tools found
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontFamily: 'Syne, sans-serif' }}>
          Try adjusting your search or filters
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={2.5}>
      {tools.map((tool) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
          <Card
            sx={{
              height: '100%',
              background: (theme) => theme.palette.background.paper,
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: (theme) => theme.palette.primary.main,
                boxShadow: (theme) =>
                  `0 8px 32px ${theme.palette.primary.main}22`,
              },
            }}>
            <CardContent
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Chip
                    label={tool.category}
                    size="small"
                    sx={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '0.7rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'text.secondary',
                    }}
                  />
                  <Chip
                    label={tool.pricing}
                    size="small"
                    sx={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: `${pricingColor[tool.pricing]}22`,
                      color: pricingColor[tool.pricing],
                      border: `1px solid ${pricingColor[tool.pricing]}44`,
                    }}
                  />
                </Stack>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 0.5,
                    }}>
                    {tool.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                    {tool.description}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    component={Link}
                    href={`/ai-tools/${tool.slug}`}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      fontFamily: 'Syne, sans-serif',
                      borderColor: 'rgba(255,255,255,0.12)',
                      color: 'text.secondary',
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
                    fullWidth
                    endIcon={<OpenInNewIcon fontSize="small" />}
                    sx={{
                      fontFamily: 'Syne, sans-serif',
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
