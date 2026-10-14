'use client'

import { motion } from 'framer-motion'
import { springs } from '@/lib/motion'
import { apps } from '@/core/registries/apps'
import { desktopDock } from '@/core/layouts/desktopDock'
import type { ApplicationId } from '@/core/registries/apps'
import { AppGlyph } from '@/components/ui/AppGlyph'
import { appIcons } from '@/core/registries/icons'

// Tablet dock — same icons as desktop, no hover magnification (touch-first)
// Prototype: bottom=18, centered, rgba(245,245,247,0.42) + blur(60px), radius 30px, 54×54px icons

interface TabletDockProps {
  onLaunch: (appId: ApplicationId) => void
}

export function TabletDock({ onLaunch }: TabletDockProps) {
  const dockApps = desktopDock.map((id) => {
    const def = apps.find((a) => a.id === id)!
    return {
      id,
      label: def.name,
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
          <AppGlyph icon={appIcons[app.id]} scale={app.id === 'linkedin' ? 0.72 : undefined} />
        </motion.button>
      ))}
    </div>
  )
}
