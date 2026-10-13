'use client'

import { motion } from 'framer-motion'
import { springs } from '@/lib/motion'
import { apps } from '@/core/registries/apps'
import { desktopDock } from '@/core/layouts/desktopDock'
import type { ApplicationId } from '@/core/registries/apps'

// Tablet dock — same icons as desktop, no hover magnification (touch-first)
// Prototype: bottom=18, centered, rgba(245,245,247,0.42) + blur(60px), radius 30px, 54×54px icons

// The canonical Portfolio OS icon set — the exact same SVG assets Mobile
// and Desktop use (public/icons/ui/), rendered as plain glyphs with no
// background of their own, per the same "same icon language" mapping used
// on Desktop's Dock (components/os/Dock.tsx).
const TABLET_ICON_SRC: Record<ApplicationId, string> = {
  finder: '/icons/ui/projects.svg',
  photos: '/icons/ui/photo.svg',
  notes: '/icons/ui/notes.svg',
  spotify: '/icons/ui/spotify.svg',
  settings: '/icons/ui/settings.svg',
  mail: '/icons/ui/message%20me.svg',
  instagram: '/icons/ui/photo.svg',
}

interface TabletDockProps {
  onLaunch: (appId: ApplicationId) => void
}

export function TabletDock({ onLaunch }: TabletDockProps) {
  const dockApps = desktopDock.map((id) => {
    const def = apps.find((a) => a.id === id)!
    return {
      id,
      label: def.name,
      icon: TABLET_ICON_SRC[id],
      onTap: () => onLaunch(id),
    }
  })

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '14px',
        padding: '11px 16px',
        background: 'rgba(245,245,247,0.42)',
        backdropFilter: 'blur(60px) saturate(200%)',
        WebkitBackdropFilter: 'blur(60px) saturate(200%)',
        borderRadius: '30px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 22px 60px rgba(0,0,0,0.2)',
        zIndex: 50,
        fontFamily: 'var(--font-text)',
      }}
      role="navigation"
      aria-label="Tablet dock"
    >
      {dockApps.map((app) => (
        <motion.button
          key={app.id}
          whileTap={{ scale: 0.92 }}
          transition={springs.dock}
          onClick={app.onTap}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label={app.label}
        >
          <img
            src={app.icon}
            alt=""
            style={{ width: '58%', height: 'auto', objectFit: 'contain' }}
          />
        </motion.button>
      ))}
    </div>
  )
}
