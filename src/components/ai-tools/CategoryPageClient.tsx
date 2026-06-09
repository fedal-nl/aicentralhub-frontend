'use client'

import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Stack,
  Chip,
  Button,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { allTools } from '@/data/mockData'
import { ParentCategory } from '@/types/tool'

interface Props {
  cat: ParentCategory
}

export default function CategoryPageClient({ cat }: Props) {
  const toolsInCategory = allTools.filter((t) => t.category === cat.name)

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBgAlt,
        minHeight: '100vh',
        py: 6,
      }}>
      <Container maxWidth="xl">
        <Button
          component={Link}
          href="/ai-tools"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: (theme) => theme.customColors.lightTextSecondary,
            mb: 4,
            '&:hover': { color: 'primary.main' },
          }}>
          All Categories
        </Button>

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.15em',
            }}>
            Category
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: (theme) => theme.customColors.lightText,
              mt: 0.5,
            }}>
            {cat.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.customColors.lightTextSecondary,
              mt: 1,
              maxWidth: 600,
            }}>
            {cat.description}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.customColors.lightText,
            mb: 3,
          }}>
          Subcategories
        </Typography>
        <Grid container spacing={2} sx={{ mb: 8 }}>
          {cat.subcategories.map((sub) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={sub.slug}>
              <Card
                sx={{
                  background: (theme) => theme.customColors.lightBg,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: (theme) => theme.palette.primary.main,
                    background: (theme) => `${theme.palette.primary.main}08`,
                    transform: 'translateY(-2px)',
                  },
                }}>
                <CardActionArea
                  component={Link}
                  href={`/ai-tools/${cat.slug}/${sub.slug}`}
                  sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: (theme) => theme.customColors.lightText,
                        }}>
                        {sub.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                          mt: 0.5,
                        }}>
                        {sub.count.toLocaleString()} tools
                      </Typography>
                    </Box>
                    <ArrowForwardIcon
                      sx={{
                        color: (theme) => theme.customColors.lightTextSecondary,
                        fontSize: 20,
                      }}
                    />
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {toolsInCategory.length > 0 && (
          <>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: (theme) => theme.customColors.lightText,
                }}>
                Featured in {cat.name}
              </Typography>
              <Button
                component={Link}
                href={`/ai-tools?category=${encodeURIComponent(cat.name)}`}
                endIcon={<ArrowForwardIcon />}
                sx={{ color: 'primary.main' }}>
                View all
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {toolsInCategory.slice(0, 8).map((tool) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
                  <Card
                    sx={{
                      background: (theme) => theme.customColors.lightBg,
                      border: (theme) =>
                        `1px solid ${theme.customColors.lightBorder}`,
                      borderRadius: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: (theme) => theme.palette.primary.main,
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) =>
                          `0 8px 32px ${theme.palette.primary.main}22`,
                      },
                    }}>
                    <CardActionArea
                      component={Link}
                      href={`/tool/${tool.slug}`}
                      sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 1.5,
                        }}>
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
                            background: (theme) =>
                              `${theme.palette.primary.main}22`,
                            color: 'primary.main',
                            border: (theme) =>
                              `1px solid ${theme.palette.primary.main}44`,
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: (theme) => theme.customColors.lightText,
                          mb: 0.5,
                        }}>
                        {tool.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: (theme) =>
                            theme.customColors.lightTextSecondary,
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                        {tool.description}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  )
}
