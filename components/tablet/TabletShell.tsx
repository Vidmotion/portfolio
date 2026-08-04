'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { WallpaperLayer } from '@/components/os/WallpaperLayer'
import { WindowManager } from '@/components/windows/WindowManager'
import { useApplicationLauncher } from '@/hooks/useApplicationLauncher'
import { TabletMenuBar } from './TabletMenuBar'
import { TabletWidgetStrip } from './TabletWidgetStrip'
import { TabletFolders } from './TabletFolders'
import { TabletDock } from './TabletDock'
import { springs } from '@/lib/motion'

export function TabletShell() {
  const screenRef = useRef<HTMLDivElement>(null)
  const { launch } = useApplicationLauncher()

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
      role="main"
      aria-label="Tablet — iPadOS experience"
    >
      {/* Wallpaper */}
      <WallpaperLayer wallpaper="morning" />

      {/* Menu Bar */}
      <TabletMenuBar />

      {/* Left widget strip */}
      <TabletWidgetStrip containerRef={screenRef} />

      {/* Folders — top right */}
      <TabletFolders containerRef={screenRef} />

      {/* Touch model info card */}
      <TouchModelCard />

      {/* Windows — same window manager as Desktop: opening, dragging, closing,
          focus and z-index are identical, only the trigger gesture is touch. */}
      <WindowManager />

      {/* Dock */}
      <TabletDock onOpenFinder={() => launch('finder')} />
    </div>
  )
}

// ─── Touch Model Info Card ─────────────────────────────────────────────────────

function TouchModelCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.default, delay: 0.4 }}
      style={{
        position: 'absolute',
        top: '300px',
        right: '40px',
        width: '268px',
        padding: '22px',
        borderRadius: '22px',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(40px) saturate(150%)',
        WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 12px 32px rgba(0,0,0,0.1)',
        zIndex: 20,
        fontFamily: 'var(--font-text)',
      }}
      aria-label="Touch model guide"
    >
      <div
        style={{
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#a0a0a5',
          fontWeight: 600,
          marginBottom: '12px',
        }}
      >
        Touch Model
      </div>
      <div
        style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#33333a',
          letterSpacing: '-0.01em',
        }}
      >
        Same OS, same windows and Finder as Desktop — adapted for touch. Tap to open, long-press for context menus, drag with one finger, pinch to resize. No hover states.
      </div>
    </motion.div>
  )
}
