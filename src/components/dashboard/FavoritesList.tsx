'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

interface Favorite {
  id: number
  username: string
  tool: number
  tool_name: string
  created_at: string
}

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<number | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('/api/favorites')
        const data = await res.json()
        setFavorites(data.results ?? data)
      } catch {
        setError('Failed to load favorites')
      } finally {
        setLoading(false)
      }
    }
    fetchFavorites()
  }, [])

  const handleRemove = async (id: number) => {
    setRemovingId(id)
    try {
      const res = await fetch(`/api/favorites/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f.id !== id))
      } else {
        setError('Removing favorites isn&apos;t supported by the backend yet.')
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
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: (theme) => theme.customColors.lightText,
          mb: 3,
        }}>
        Favorite Tools
      </Typography>

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
                  sx={{ alignItems: 'center' }}>
                  <FavoriteIcon sx={{ color: '#FF6B6B', fontSize: 18 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: (theme) => theme.customColors.lightText,
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
