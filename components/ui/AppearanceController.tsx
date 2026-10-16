'use client'

import { useEffect, useLayoutEffect } from 'react'
import { useDesktopStore } from '@/store/desktopStore'
import { useCustomWallpaperStore } from '@/store/customWallpaperStore'
import { getWallpaper } from '@/core/registries/wallpapers'
import { rgb, rgba, mixWithWhite as mix } from '@/lib/appearance'
import { useWallpaperLabels } from '@/hooks/useWallpaperLabels'

export function AppearanceController() {
  const { wallpaper, iconColor, appearance, customWallpaperEnabled } = useDesktopStore()
  const custom = useCustomWallpaperStore()
  useWallpaperLabels(appearance.textColor, appearance.wallpaperOpacity)
  const loadCustom = custom.load
  const theme = getWallpaper(wallpaper),
    dark = appearance.mode === 'dark'
  const baseAccent = customWallpaperEnabled && custom.url ? custom.accent : theme.accent
  const accent = dark ? mix(baseAccent, 0.6) : baseAccent
  const surface =
    appearance.surfaceColor === 'auto'
      ? dark
        ? '#172235'
        : mix(baseAccent, 0.96)
      : appearance.surfaceColor
  const text =
    appearance.textColor === 'auto' ? (dark ? '#f2f5fb' : theme.ink) : appearance.textColor
  const baseIcon = customWallpaperEnabled && custom.url ? custom.accent : theme.iconColor
  const color = iconColor === 'auto' ? (dark ? mix(baseIcon, 0.76) : baseIcon) : iconColor
  const opacity = appearance.surfaceOpacity ?? (dark ? 0.56 : theme.opacity)
  const channels = rgb(color).map((x) => x / 255)
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

  useEffect(() => {
    void loadCustom()
  }, [loadCustom])
  useEffect(() => {
    if (custom.ready && customWallpaperEnabled && !custom.url)
      useDesktopStore.getState().setCustomWallpaperEnabled(false)
  }, [custom.ready, customWallpaperEnabled, custom.url])
  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.wallpaper = customWallpaperEnabled && custom.url ? 'custom' : wallpaper
    root.dataset.appearance = appearance.mode
    const vars: Record<string, string> = {
      '--os-accent': accent,
      '--os-accent-rgb': rgb(accent).join(','),
      '--os-ink': text,
      '--os-on-accent': dark ? '#111b2b' : '#ffffff',
      '--os-wash': rgb(surface).join(','),
      '--os-icon-color': color,
      '--os-icon-opacity': String(appearance.iconOpacity),
      '--os-icon-tile': rgba(surface, appearance.iconBackgroundOpacity),
      '--os-glass': `linear-gradient(145deg,${rgba(mix(surface, dark ? 0.1 : 0.7), Math.min(1, opacity + 0.08))},${rgba(surface, opacity)})`,
      '--os-reading-glass': rgba(surface, Math.min(1, opacity + 0.24)),
      '--os-glass-solid': surface,
      '--os-dock': rgba(surface, Math.min(1, opacity + 0.13)),
      '--os-label-shadow': dark
        ? '0 1px 6px rgba(0,0,0,.7)'
        : '0 1px 5px rgba(255,255,255,.95),0 0 10px rgba(255,255,255,.8)',
      '--os-surface-edge': dark ? 'rgba(255,255,255,.22)' : 'rgba(255,255,255,.72)',
      '--os-shadow': dark
        ? '0 8px 28px rgba(0,0,0,.24)'
        : '0 5px 16px rgba(30,47,70,.09),0 16px 36px rgba(30,47,70,.10)',
      '--ui-ink': dark ? '#f2f5fb' : '#1c2b3e',
      '--ui-muted': dark ? '#b3bfd0' : '#5d6d80',
      '--ui-surface': dark ? '#182231' : '#f7f9fc',
      '--ui-raised': dark ? '#233044' : '#ffffff',
      '--ui-border': dark ? '#ffffff24' : '#152d4924',
    }
    for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value)
    root.style.colorScheme = appearance.mode
  }, [
    wallpaper,
    appearance,
    customWallpaperEnabled,
    custom.url,
    accent,
    surface,
    text,
    color,
    opacity,
    dark,
  ])
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
