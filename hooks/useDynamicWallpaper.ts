import { useState, useEffect } from 'react'
import type { Wallpaper, ResolvedWallpaper } from '@/types'

function resolveHour(hour: number): ResolvedWallpaper {
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 21) return 'evening'
  return 'night'
}

export function useDynamicWallpaper(wallpaper: Wallpaper): ResolvedWallpaper {
  const [hour, setHour] = useState<number | null>(null)

  // Uses setTimeout pattern (same as useTime) to avoid synchronous setState in effect
  useEffect(() => {
    const id = setTimeout(() => setHour(new Date().getHours()), 0)
    const interval = setInterval(() => setHour(new Date().getHours()), 60_000)
    return () => { clearTimeout(id); clearInterval(interval) }
  }, [])

  if (wallpaper !== 'auto') return wallpaper as ResolvedWallpaper
  if (hour === null) return 'morning'
  return resolveHour(hour)
}
