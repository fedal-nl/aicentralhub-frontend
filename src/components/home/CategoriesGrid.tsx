'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Category } from '@/types/tool'
import GridViewIcon from '@mui/icons-material/GridView'

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(Array.isArray(data) ? data : (data.results ?? []))
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading || categories.length === 0) return null

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
              Explore
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: (theme) => theme.customColors.lightText,
                mt: 0.5,
              }}>
              Browse by Category
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/categories"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'primary.main',
              mt: { xs: 2, sm: 0 },
              '&:hover': {
                background: (theme) => `${theme.palette.primary.main}11`,
              },
            }}>
            View all categories
          </Button>
        </Stack>

        <Grid container spacing={2}>
          {categories.slice(0, 12).map((cat, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={cat.slug}>
              <Card
                component={Link}
                href={`/ai-tools/${cat.slug}`}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  background: (theme) => theme.customColors.lightBg,
                  border: (theme) =>
                    `1px solid ${theme.customColors.lightBorder}`,
                  borderRadius: '12px',
                  boxShadow: 'none',
                  transition: 'transform 0.2s, border-color 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: (theme) =>
                        index % 2 === 0
                          ? `${theme.palette.primary.main}22`
                          : `${theme.palette.secondary.main}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.5,
                    }}>
                    <GridViewIcon
                      sx={{
                        fontSize: 20,
                        color: (theme) =>
                          index % 2 === 0
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: (theme) => theme.customColors.lightText,
                      mb: 0.5,
                    }}>
                    {cat.name}
                  </Typography>
                  <Chip
                    label={`${cat.count.toLocaleString()} tools`}
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: (theme) => `${theme.palette.primary.main}11`,
                      color: 'primary.main',
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}33`,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
