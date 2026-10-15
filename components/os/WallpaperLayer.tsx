'use client'

import { motion } from 'framer-motion'
import type { Wallpaper } from '@/types'
import { getWallpaper } from '@/core/registries/wallpapers'
import { useDesktopStore } from '@/store/desktopStore'
import { useCustomWallpaperStore } from '@/store/customWallpaperStore'
import { duration, ease } from '@/lib/motion'

export function WallpaperLayer({ wallpaper }: { wallpaper: Wallpaper }) {
  const item = getWallpaper(wallpaper),
    enabled = useDesktopStore((s) => s.customWallpaperEnabled)
  const opacity = useDesktopStore((s) => s.appearance.wallpaperOpacity)
  const url = useCustomWallpaperStore((s) => s.url),
    custom = enabled && url
  return (
    <div
      className="absolute inset-0"
      style={{ background: 'var(--ui-surface)', zIndex: 'var(--z-wallpaper)' }}
      aria-hidden
    >
      <motion.div
        key={custom || wallpaper}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: duration.window, ease: ease.opening }}
        className="absolute inset-0"
        data-wallpaper-image={custom ? 'custom' : wallpaper}
      >
        <picture style={{ display: 'block', width: '100%', height: '100%' }}>
          {!custom && (
            <>
              <source media="(max-width:767px)" type="image/avif" srcSet={item.mobileAvif} />
              <source media="(max-width:767px)" srcSet={item.mobile} />
              <source type="image/avif" srcSet={item.avif} />
            </>
          )}
          {/* Precompressed responsive files, or a browser-local blob URL. */}
          <img
            src={custom || item.src}
            alt=""
            fetchPriority="high"
            decoding="async"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </picture>
      </motion.div>
    </div>
  )
}
