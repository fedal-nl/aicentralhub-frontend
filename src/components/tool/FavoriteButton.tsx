'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IconButton, Tooltip } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useFavorites } from '@/context/FavoritesContext'

interface Props {
  toolId: number
  size?: 'small' | 'medium' | 'large'
}

export default function FavoriteButton({ toolId, size = 'medium' }: Props) {
  const { status } = useSession()
  const router = useRouter()
  const { favoritesMap, refetch } = useFavorites()
  const [loading, setLoading] = useState(false)
  // Optimistic override so the icon flips instantly on click,
  // before refetch() resolves. null = defer to favoritesMap.
  const [override, setOverride] = useState<{
    favorited: boolean
    favoriteId: number | null
  } | null>(null)

  const mapMatch = favoritesMap.get(toolId)
  const isFavorited = override ? override.favorited : mapMatch !== undefined
  const favoriteId = override ? override.favoriteId : (mapMatch ?? null)

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
          setOverride({ favorited: false, favoriteId: null })
          refetch()
        }
      } else {
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tool: toolId }),
        })
        if (res.ok) {
          const data = await res.json()
          setOverride({ favorited: true, favoriteId: data.id })
          refetch()
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
