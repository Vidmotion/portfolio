'use client'
import { motion } from 'framer-motion'
import type { Wallpaper } from '@/types'
import { getWallpaper } from '@/core/registries/wallpapers'
import { duration, ease } from '@/lib/motion'

export function WallpaperLayer({ wallpaper }: { wallpaper: Wallpaper }) {
  const item = getWallpaper(wallpaper)
  return (
    <motion.div
      key={wallpaper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.window, ease: ease.opening }}
      className="absolute inset-0"
      data-wallpaper-image={wallpaper}
      style={{
        backgroundImage: `url("${item.src}")`,
        backgroundSize: 'cover',
        backgroundPosition: item.position,
        backgroundRepeat: 'no-repeat',
        zIndex: 'var(--z-wallpaper)',
      }}
      aria-hidden
    />
  )
}
