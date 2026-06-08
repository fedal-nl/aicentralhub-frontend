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
import Link from 'next/link'
import { Tool } from '@/types/tool'
import { Review } from '@/types/review'
import ToolReviews from './ToolReviews'
import RelatedTools from './RelatedTools'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

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
        background: (theme) => theme.palette.background.default,
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
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      color: 'text.primary',
                      mb: 3,
                    }}>
                    About {tool.name}
                  </Typography>
                  {tool.longDescription.split('\n\n').map((para, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontFamily: 'Syne, sans-serif',
                        lineHeight: 1.9,
                        mb: 2,
                      }}>
                      {para}
                    </Typography>
                  ))}
                </Box>
              )}

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <ToolReviews
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
                background: (theme) => theme.palette.background.paper,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                p: 3,
                position: 'sticky',
                top: 90,
              }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 3,
                }}>
                Tool Details
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontFamily: 'Syne, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Category
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontFamily: 'Syne, sans-serif',
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
                      color: 'text.secondary',
                      fontFamily: 'Syne, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Subcategory
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontFamily: 'Syne, sans-serif',
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
                      color: 'text.secondary',
                      fontFamily: 'Syne, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Pricing
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={
                        tool.pricing.charAt(0).toUpperCase() +
                        tool.pricing.slice(1)
                      }
                      size="small"
                      sx={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        background:
                          tool.pricing === 'free'
                            ? '#00D4FF22'
                            : tool.pricing === 'freemium'
                              ? '#7B2FFF22'
                              : '#FF6B6B22',
                        color:
                          tool.pricing === 'free'
                            ? '#00D4FF'
                            : tool.pricing === 'freemium'
                              ? '#7B2FFF'
                              : '#FF6B6B',
                        border: `1px solid ${tool.pricing === 'free' ? '#00D4FF44' : tool.pricing === 'freemium' ? '#7B2FFF44' : '#FF6B6B44'}`,
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontFamily: 'Syne, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                    Website
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#00D4FF' }}>
                      {tool.url.replace('https://', '')}
                    </Link>
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

                <Button
                  component="a"
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    fontFamily: 'Syne, sans-serif',
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

        {/* Related tools */}
        <Box sx={{ mt: 10 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 6 }} />
          <RelatedTools tools={relatedTools} currentSlug={tool.slug} />
        </Box>
      </Container>
    </Box>
  )
}
