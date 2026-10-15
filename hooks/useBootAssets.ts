import { useEffect, useState } from 'react'
import type { Platform } from '@/types'
import { useDesktopStore } from '@/store/desktopStore'
import { useCustomWallpaperStore } from '@/store/customWallpaperStore'
import { getWallpaper } from '@/core/registries/wallpapers'
import { profile } from '@/core/registries/profile'
import { iconSource } from '@/core/registries/icons'

export function useBootAssets(platform: Platform | null, active: boolean) {
  const [ready, setReady] = useState(false)
  const wallpaper = useDesktopStore((s) => s.wallpaper),
    customEnabled = useDesktopStore((s) => s.customWallpaperEnabled)
  const custom = useCustomWallpaperStore()
  useEffect(() => {
    if (!platform || !active || (customEnabled && !custom.ready)) return
    let live = true
    const theme = getWallpaper(wallpaper),
      mobile = matchMedia('(max-width:767px)').matches
    const primary =
      customEnabled && custom.url ? custom.url : mobile ? theme.mobileAvif : theme.avif
    const fallback = mobile ? theme.mobile : theme.src
    const image = (src: string, backup?: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image()
        img.onload = () => {
          void img
            .decode()
            .catch(() => {})
            .then(() => resolve())
        }
        img.onerror = () => {
          if (backup) {
            img.src = backup
            backup = undefined
          } else resolve()
        }
        img.src = src
      })
    const complete = () => {
      if (live) setReady(true)
    }
    // A slow third-party player or case-study gallery never blocks entry.
    void Promise.allSettled([
      image(primary, fallback),
      ...(['mail', 'photos', 'spotify', 'settings'] as const).map((id) => image(iconSource(id))),
      platform === 'mobile' ? image(profile.portrait) : Promise.resolve(),
      document.fonts.ready,
    ]).then(complete)
    const timeout = setTimeout(complete, 6000)
    return () => {
      live = false
      clearTimeout(timeout)
    }
  }, [platform, active, wallpaper, customEnabled, custom.ready, custom.url])
  return ready
}
