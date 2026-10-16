'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WallpaperLayer } from './WallpaperLayer'
import { MenuBar } from './MenuBar'
import { Dock } from './Dock'
import { DesktopFolders } from './DesktopFolders'
import { SpotlightSearch } from './SpotlightSearch'
import { CommandPalette } from './CommandPalette'
import { QuickLook } from './QuickLook'
import { DesktopContextMenu } from './DesktopContextMenu'
import { WidgetLayer } from '@/components/widgets/WidgetLayer'
import { WindowManager } from '@/components/windows/WindowManager'
import { useDesktopStore } from '@/store/desktopStore'
import { useGlobalKeyboard } from '@/hooks/useKeyboard'
import { useDynamicWallpaper } from '@/hooks/useDynamicWallpaper'
import { springs } from '@/lib/motion'
import { identity } from '@/core/registries/identity'

interface ContextMenuState {
  x: number
  y: number
}

export function DesktopShell() {
  const { wallpaper } = useDesktopStore()
  const resolvedWallpaper = useDynamicWallpaper(wallpaper)
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)

  useGlobalKeyboard()

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springs.default}
      className="fixed inset-0 overflow-hidden select-none"
      style={{ cursor: 'default' }}
      data-wallpaper-surface=""
      role="main"
      aria-label={`${identity.productName} Desktop`}
      onContextMenu={handleContextMenu}
    >
      {/* Layer 0: Wallpaper */}
      <WallpaperLayer wallpaper={resolvedWallpaper} />

      {/* Layer 1: Widgets */}
      <WidgetLayer />

      {/* Layer 2: Desktop folder icons */}
      <DesktopFolders />

      {/* Layer 3: Windows */}
      <WindowManager />

      {/* Layer 4: Dock */}
      <Dock />

      {/* Layer 5: Menu Bar */}
      <MenuBar />

      {/* Layer 6: Overlays */}
      <SpotlightSearch />
      <CommandPalette />
      <QuickLook />

      {/* Layer 7: Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <DesktopContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
