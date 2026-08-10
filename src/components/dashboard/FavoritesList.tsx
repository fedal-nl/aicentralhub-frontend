'use client'

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
  CircularProgress,
  Chip,
} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from 'react'
import Link from 'next/link'
import { useFavorites } from '@/context/FavoritesContext'

export default function FavoritesList() {
  const { favorites, loading, removeFavorite } = useFavorites()
  const [removingId, setRemovingId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const handleRemove = async (id: number) => {
    setRemovingId(id)
    try {
      const res = await fetch(`/api/favorites/${id}`, { method: 'DELETE' })
      if (res.ok) {
        removeFavorite(id)
      } else {
        setError('Failed to remove favorite. Please try again.')
      }
    } catch {
      setError('Something went wrong removing this favorite.')
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <Box
      sx={{
        background: (theme) => theme.customColors.lightBg,
        border: (theme) => `1px solid ${theme.customColors.lightBorder}`,
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        p: 4,
      }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.customColors.lightText,
          }}>
          Favorite Tools
        </Typography>
        {favorites.length > 0 && (
          <Chip
            label={`${favorites.length} saved`}
            size="small"
            sx={{
              fontWeight: 600,
              background: (theme) => `${theme.palette.primary.main}11`,
              color: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}44`,
            }}
          />
        )}
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={28} sx={{ color: 'primary.main' }} />
        </Box>
      ) : favorites.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: (theme) => theme.customColors.lightTextSecondary }}>
          You haven&apos;t favorited any tools yet. Browse the directory and tap
          the heart icon to save tools here.
        </Typography>
      ) : (
        <Stack spacing={0}>
          {favorites.map((fav, index) => (
            <Box key={fav.id}>
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 2,
                }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <FavoriteIcon
                    sx={{ color: '#FF6B6B', fontSize: 18, flexShrink: 0 }}
                  />
                  <Typography
                    variant="body2"
                    component={Link}
                    href={`/tool/${fav.tool_slug}`}
                    sx={{
                      fontWeight: 600,
                      color: (theme) => theme.customColors.lightText,
                      textDecoration: 'none',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      '&:hover': { color: 'primary.main' },
                    }}>
                    {fav.tool_name}
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  onClick={() => handleRemove(fav.id)}
                  disabled={removingId === fav.id}
                  sx={{
                    color: (theme) => theme.customColors.lightTextSecondary,
                    flexShrink: 0,
                    '&:hover': { color: '#FF6B6B' },
                  }}>
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </Stack>
              {index < favorites.length - 1 && (
                <Divider
                  sx={{
                    borderColor: (theme) =>
                      theme.customColors.lightBorderSubtle,
                  }}
                />
              )}
            </Box>
          ))}
        </Stack>
      )}

      {error && (
        <Typography variant="body2" sx={{ color: '#FF6B6B', mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}
