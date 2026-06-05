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
  Button,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import GridViewIcon from '@mui/icons-material/GridView'
import { topCategories } from '@/data/mockData'

export default function CategoriesGrid() {
  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.palette.background.paper,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
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
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}>
              Browse by
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                color: 'text.primary',
                mt: 0.5,
              }}>
              Top Categories
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/ai-tools"
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontFamily: 'Syne, sans-serif',
              color: 'primary.main',
              mt: { xs: 2, sm: 0 },
              '&:hover': {
                background: (theme) => `${theme.palette.primary.main}11`,
              },
            }}>
            All categories
          </Button>
        </Stack>

        <Grid container spacing={2}>
          {topCategories.map((category, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={category.id}>
              <Card
                sx={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: (theme) => theme.palette.primary.main,
                    background: (theme) => `${theme.palette.primary.main}08`,
                    transform: 'translateY(-2px)',
                  },
                }}>
                <CardActionArea
                  component={Link}
                  href={`/ai-tools?category=${category.slug}`}
                  sx={{ p: 2.5 }}>
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
                    variant="body2"
                    sx={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 0.5,
                      lineHeight: 1.3,
                    }}>
                    {category.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontFamily: 'Syne, sans-serif',
                    }}>
                    {category.count.toLocaleString()} tools
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
