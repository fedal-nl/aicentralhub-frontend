'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { useSession } from 'next-auth/react'

interface FavoriteEntry {
  id: number
  tool: number
}

interface FavoritesContextValue {
  favoritesMap: Map<number, number>
  loading: boolean
  refetch: () => void
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favoritesMap: new Map(),
  loading: false,
  refetch: () => {},
})

async function loadFavorites(): Promise<Map<number, number>> {
  const res = await fetch('/api/favorites')
  const data = await res.json()
  const favorites: FavoriteEntry[] = data.results ?? data
  return new Map(favorites.map((f) => [f.tool, f.id]))
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const [favoritesMap, setFavoritesMap] = useState<Map<number, number>>(
    new Map(),
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated') return
    let cancelled = false

    // eslint-disable-next-line react-hooks/set-state-in-effect -- legitimate fetch-on-mount pattern
    setLoading(true)
    ;(async () => {
      try {
        const map = await loadFavorites()
        if (!cancelled) setFavoritesMap(map)
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
    setLoading(true)
    try {
      const map = await loadFavorites()
      setFavoritesMap(map)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <FavoritesContext.Provider value={{ favoritesMap, loading, refetch }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
