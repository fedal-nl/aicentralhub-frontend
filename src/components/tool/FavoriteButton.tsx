'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IconButton, Tooltip } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

interface Props {
  toolId: number
  size?: 'small' | 'medium' | 'large'
}

export default function FavoriteButton({ toolId, size = 'medium' }: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteId, setFavoriteId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated') return

    const checkFavorite = async () => {
      try {
        const res = await fetch('/api/favorites')
        const data = await res.json()
        const favorites = data.results ?? data
        const match = favorites.find(
          (f: { tool: number; id: number }) => f.tool === toolId,
        )
        if (match) {
          setIsFavorited(true)
          setFavoriteId(match.id)
        }
      } catch {
        // silently fail, button just stays unfavorited
      }
    }
    checkFavorite()
  }, [toolId, status])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (status !== 'authenticated') {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      if (isFavorited && favoriteId) {
        const res = await fetch(`/api/favorites/${favoriteId}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          setIsFavorited(false)
          setFavoriteId(null)
        }
      } else {
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tool: toolId }),
        })
        if (res.ok) {
          const data = await res.json()
          setIsFavorited(true)
          setFavoriteId(data.id)
        }
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton
        onClick={handleToggle}
        disabled={loading}
        size={size}
        sx={{
          color: isFavorited ? '#FF6B6B' : 'text.secondary',
          '&:hover': { color: '#FF6B6B' },
        }}>
        {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  )
}
