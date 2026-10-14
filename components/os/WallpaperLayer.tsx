'use client'

import { motion } from 'framer-motion'
import type { ResolvedWallpaper } from '@/types'
import { duration, ease } from '@/lib/motion'

interface WallpaperLayerProps {
  wallpaper: ResolvedWallpaper
}

const wallpaperStyles: Record<ResolvedWallpaper, React.CSSProperties> = {
  morning: {
    backgroundImage: 'image-set(url(/wallpaper.avif) type("image/avif"), url(/wallpaper.webp) type("image/webp"))',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  afternoon: {
    backgroundImage: 'linear-gradient(rgba(210,165,100,0.18), rgba(210,165,100,0.18)), image-set(url(/wallpaper.avif) type("image/avif"), url(/wallpaper.webp) type("image/webp"))',
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, no-repeat',
  },
  evening: {
    backgroundImage: 'linear-gradient(rgba(160,60,20,0.32), rgba(100,20,60,0.20)), image-set(url(/wallpaper.avif) type("image/avif"), url(/wallpaper.webp) type("image/webp"))',
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, no-repeat',
  },
  night: {
    backgroundImage: 'linear-gradient(rgba(8,12,28,0.62), rgba(8,12,28,0.62)), image-set(url(/wallpaper.avif) type("image/avif"), url(/wallpaper.webp) type("image/webp"))',
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, no-repeat',
  },
  slate: {
    background: 'linear-gradient(135deg, #D8DADD 0%, #CDD0D7 35%, #C4C8D1 60%, #BCC1CB 100%)',
  },
  mono: {
    background: 'linear-gradient(135deg, #C8C8C8 0%, #BEBEBE 35%, #B4B4B4 60%, #AAAAAA 100%)',
  },
}

export function WallpaperLayer({ wallpaper }: WallpaperLayerProps) {
  return (
    <motion.div
      key={wallpaper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.window, ease: ease.opening }}
      className="absolute inset-0"
      style={{
        ...wallpaperStyles[wallpaper],
        zIndex: 'var(--z-wallpaper)',
      }}
      aria-hidden
    />
  )
}
