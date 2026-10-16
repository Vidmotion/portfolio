'use client'

import { useRef } from 'react'
import { WallpaperLayer } from '@/components/os/WallpaperLayer'
import { WindowManager } from '@/components/windows/WindowManager'
import { MenuBar } from '@/components/os/MenuBar'
import { Dock } from '@/components/os/Dock'
import { TabletDesktopScene } from './TabletDesktopScene'
import { useDesktopStore } from '@/store/desktopStore'
import { useDynamicWallpaper } from '@/hooks/useDynamicWallpaper'

export function TabletShell() {
  const screenRef = useRef<HTMLDivElement>(null)
  const wallpaper = useDesktopStore((s) => s.wallpaper)
  const resolvedWallpaper = useDynamicWallpaper(wallpaper)

  return (
    <div
      ref={screenRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-text)',
      }}
      data-wallpaper-surface=""
      role="main"
      aria-label="Tablet — iPadOS experience"
    >
      {/* Wallpaper */}
      <WallpaperLayer wallpaper={resolvedWallpaper} />

      {/* Menu Bar */}
      <MenuBar tablet />

      {/* Left widget strip */}
      <TabletDesktopScene containerRef={screenRef} />

      {/* Windows — same window manager as Desktop: opening, dragging, closing,
          focus and z-index are identical, only the trigger gesture is touch. */}
      <WindowManager />

      {/* Dock */}
      <Dock tablet />
    </div>
  )
}
