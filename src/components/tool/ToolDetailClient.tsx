'use client'

import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Stack,
  Chip,
  Button,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Link from 'next/link'
import { Tool } from '@/types/tool'
import { Review } from '@/types/review'
import ToolReviews from './ToolReviews'
import RelatedTools from './RelatedTools'
import { addUtmParams } from '@/lib/utm'

interface Props {
  tool: Tool
  reviews: Review[]
  averageRating: number
  relatedTools: Tool[]
}

export default function ToolDetailClient({
  tool,
  reviews,
  averageRating,
  relatedTools,
}: Props) {
  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
      }}>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Main content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={6}>
              {tool.longDescription && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: (theme) => theme.customColors.lightText,
                      mb: 3,
                    }}>
                    About {tool.name}
                  </Typography>
                  {tool.longDescription.split('\n\n').map((para, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{
                        color: (theme) => theme.customColors.lightTextSecondary,
                        lineHeight: 1.9,
                        mb: 2,
                      }}>
                      {para}
                    </Typography>
                  ))}
                </Box>
              )}

              <Divider
                sx={{
                  borderColor: (theme) => theme.customColors.lightBorderSubtle,
                }}
              />

              <ToolReviews
                toolId={tool.id}
                reviews={reviews}
                averageRating={averageRating}
                reviewCount={reviews.length}
              />
            </Stack>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                background: (theme) => theme.customColors.lightBg,
                border: (theme) =>
                  `1px solid ${theme.customColors.lightBorder}`,
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                p: 3,
                position: 'sticky',
                top: 90,
              }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: (theme) => theme.customColors.lightText,
                  mb: 3,
                }}>
                Tool Details
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.customColors.lightTextSecondary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Category
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.customColors.lightText,
                      fontWeight: 600,
                      mt: 0.5,
                    }}>
                    {tool.category}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.customColors.lightTextSecondary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Subcategory
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.customColors.lightText,
                      fontWeight: 600,
                      mt: 0.5,
                    }}>
                    {tool.subcategory}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.customColors.lightTextSecondary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Pricing
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={tool.pricing
                        .split('-')
                        .map(
                          (w: string) => w.charAt(0).toUpperCase() + w.slice(1),
                        )
                        .join(' ')}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        background: (theme) =>
                          `${theme.palette.primary.main}22`,
                        color: 'primary.main',
                        border: (theme) =>
                          `1px solid ${theme.palette.primary.main}44`,
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.customColors.lightTextSecondary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    App Type
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) => theme.customColors.lightText,
                      fontWeight: 600,
                      mt: 0.5,
                      textTransform: 'capitalize',
                    }}>
                    {tool.appType.replace('-', ' ')}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.customColors.lightTextSecondary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Website
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    <Link
                      href={addUtmParams(tool.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#00D4FF' }}>
                      {tool.url.replace('https://', '')}
                    </Link>
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    borderColor: (theme) =>
                      theme.customColors.lightBorderSubtle,
                  }}
                />

                <Button
                  component="a"
                  href={addUtmParams(tool.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    fontWeight: 700,
                    borderRadius: '10px',
                    py: 1.5,
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: '#fff',
                    '&:hover': {
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}>
                  Visit {tool.name}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Divider
            sx={{
              borderColor: (theme) => theme.customColors.lightBorderSubtle,
              mb: 6,
            }}
          />
          <RelatedTools tools={relatedTools} currentSlug={tool.slug} />
        </Box>
      </Container>
    </Box>
  )
}
