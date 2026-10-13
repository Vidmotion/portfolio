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
import { profile } from '@/core/registries/profile'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'
import styles from './TabletResponsive.module.css'
import { useDesktopStore } from '@/store/desktopStore'
import { useDynamicWallpaper } from '@/hooks/useDynamicWallpaper'

export function TabletShell() {
  const screenRef = useRef<HTMLDivElement>(null)
  const { launch } = useApplicationLauncher()
  const wallpaper = useDesktopStore((s) => s.wallpaper)
  const resolvedWallpaper = useDynamicWallpaper(wallpaper === 'auto' ? 'morning' : wallpaper)

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
      <WallpaperLayer wallpaper={resolvedWallpaper} />

      {/* Menu Bar */}
      <TabletMenuBar />

      {/* Left widget strip */}
      <TabletWidgetStrip containerRef={screenRef} />

      {/* Folders — top right */}
      <TabletFolders containerRef={screenRef} />

      <ProfileSummary onOpen={() => launch('notes')} />

      {/* Windows — same window manager as Desktop: opening, dragging, closing,
          focus and z-index are identical, only the trigger gesture is touch. */}
      <WindowManager />

      {/* Dock */}
      <TabletDock onLaunch={launch} />
    </div>
  )
}

// ─── Shared Profile Summary ─────────────────────────────────────────────────────

function ProfileSummary({ onOpen }: { onOpen: () => void }) {
  const locale = useLocaleStore((s) => s.locale)
  return (
    <motion.button
      onClick={onOpen}
      className={styles.info}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.default, delay: 0.4 }}
    >
      <div className={styles.infoTitle}>{uiText[locale].about}</div>
      <div className={styles.infoCopy}>{profile.summary[locale]}</div>
    </motion.button>
  )
}
