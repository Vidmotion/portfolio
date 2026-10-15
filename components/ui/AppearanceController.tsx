'use client'

import { useLayoutEffect } from 'react'
import { useDesktopStore } from '@/store/desktopStore'
import { getWallpaper } from '@/core/registries/wallpapers'

/** One palette and authored-icon tint for all three shells. Images/logos remain original. */
export function AppearanceController() {
  const wallpaper = useDesktopStore((s) => s.wallpaper)
  const iconColor = useDesktopStore((s) => s.iconColor)
  const theme = getWallpaper(wallpaper)
  const color = iconColor === 'auto' ? theme.accent : iconColor
  const channels = [1, 3, 5].map((offset) => parseInt(color.slice(offset, offset + 2), 16) / 255)
  const light = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722 > 0.65
  const matrix = channels
    .flatMap((channel) => [
      0.2126 * channel * 0.6,
      0.7152 * channel * 0.6,
      0.0722 * channel * 0.6,
      0,
      channel * 0.4,
    ])
    .concat([0, 0, 0, 1, 0])
    .join(' ')

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.wallpaper = wallpaper
    root.dataset.iconTone = light ? 'light' : 'dark'
    const vars: Record<string, string> = {
      '--os-accent': theme.accent,
      '--os-accent-rgb': theme.rgb,
      '--os-ink': theme.ink,
      '--os-wash': theme.wash,
      '--os-icon-color': color,
      '--os-icon-tile': light ? 'rgba(25,36,53,.74)' : 'rgba(255,255,255,.46)',
    }
    for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value)
  }, [wallpaper, theme, color, light])

  return (
    <svg
      width="0"
      height="0"
      aria-hidden
      focusable="false"
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <defs>
        <filter
          id="os-icon-tint"
          colorInterpolationFilters="sRGB"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feColorMatrix type="matrix" values={matrix} />
        </filter>
      </defs>
    </svg>
  )
}
