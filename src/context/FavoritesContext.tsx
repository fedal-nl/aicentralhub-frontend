'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react'
import { useSession } from 'next-auth/react'
import { Favorite } from '@/types/favorite'

interface FavoritesContextValue {
  favorites: Favorite[]
  favoritesMap: Map<number, number> // toolId -> favoriteId
  loading: boolean
  refetch: () => void
  removeFavorite: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  favoritesMap: new Map(),
  loading: false,
  refetch: () => {},
  removeFavorite: () => {},
})

async function loadFavorites(): Promise<Favorite[]> {
  const res = await fetch('/api/favorites')
  const data = await res.json()
  return data.results ?? data
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated') return
    let cancelled = false

    // TEMP LOGGING — remove once /api/favorites burst is diagnosed
    console.log('[FavoritesProvider] mount-effect fetch firing', {
      status,
      timestamp: Date.now(),
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect -- legitimate fetch-on-mount pattern
    setLoading(true)
    ;(async () => {
      try {
        const list = await loadFavorites()
        if (!cancelled) setFavorites(list)
      } catch {
        // silently fail — buttons just show unfavorited
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [status])

  const refetch = useCallback(async () => {
    // TEMP LOGGING — remove once /api/favorites burst is diagnosed
    console.log('[FavoritesProvider] refetch() called', {
      timestamp: Date.now(),
      stack: new Error().stack,
    })

    setLoading(true)
    try {
      const list = await loadFavorites()
      setFavorites(list)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const favoritesMap = useMemo(
    () => new Map(favorites.map((f) => [f.tool, f.id])),
    [favorites],
  )

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoritesMap, loading, refetch, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
