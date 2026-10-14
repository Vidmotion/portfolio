'use client'

import { useRef, memo } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useDock } from '@/hooks/useDock'
import { springs, ease } from '@/lib/motion'
import { AppGlyph } from '@/components/ui/AppGlyph'
import { appIcons } from '@/core/registries/icons'
import type { ApplicationId } from '@/core/registries/apps'

// Magnification parameters — from MOTION.md
const BASE_SIZE = 54
const MAX_SIZE = 72
const MAGNIFICATION_DISTANCE = 120

// ─── DockItem ─────────────────────────────────────────────────────────────────

interface DockItemProps {
  id: ApplicationId
  name: string
  isRunning: boolean
  mouseX: ReturnType<typeof useMotionValue<number>>
  onLaunch: (id: string) => void
}

const DockItem = memo(function DockItem({ id, name, isRunning, mouseX, onLaunch }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const el = ref.current
    if (!el) return Infinity
    const rect = el.getBoundingClientRect()
    return Math.abs(val - (rect.left + rect.width / 2))
  })

  const rawSize = useTransform(
    distance,
    [0, MAGNIFICATION_DISTANCE / 2, MAGNIFICATION_DISTANCE],
    [MAX_SIZE, (BASE_SIZE + MAX_SIZE) / 2, BASE_SIZE]
  )

  const size = useSpring(rawSize, springs.dock)

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '4px',
      }}
    >
      <motion.button
        ref={ref}
        onClick={() => onLaunch(id)}
        style={{ width: size, height: size }}
        whileTap={{ scale: 0.86, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
        className="relative flex cursor-pointer items-center justify-center select-none"
        aria-label={`Open ${name}`}
        title={name}
      >
        <motion.div
          style={{
            width: id === 'notes' ? '72%' : '100%',
            height: id === 'notes' ? '72%' : '100%',
            borderRadius: '13px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          whileHover={{ filter: 'brightness(1.06)' }}
          transition={{ duration: 0.14, ease: ease.opening }}
        >
          <AppGlyph icon={appIcons[id]} />
        </motion.div>
      </motion.button>

      {/* Running indicator dot */}
      {isRunning && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={springs.default}
          style={{
            position: 'absolute',
            bottom: '-7px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.72)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      )}
    </div>
  )
})

// ─── Dock ─────────────────────────────────────────────────────────────────────

export function Dock() {
  const { apps, launchApp } = useDock()
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      className="pointer-events-none fixed right-0 bottom-0 left-0 flex items-end justify-center"
      style={{ zIndex: 'var(--z-dock)', paddingBottom: '16px' }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...springs.default, delay: 0.1 }}
        className="pointer-events-auto flex items-end"
        style={{
          gap: '10px',
          padding: '10px 14px',
          backdropFilter: 'blur(60px) saturate(200%)',
          WebkitBackdropFilter: 'blur(60px) saturate(200%)',
          borderRadius: '28px',
          background: 'rgba(255,255,255,0.24)',
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.68)',
            'inset 0 0 0 0.5px rgba(255,255,255,0.38)',
            '0 0 0 0.5px rgba(0,0,0,0.06)',
            '0 8px 24px rgba(0,0,0,0.14)',
            '0 24px 64px rgba(0,0,0,0.20)',
          ].join(', '),
        }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        role="toolbar"
        aria-label="Dock"
      >
        {apps.map((app, index) => {
          // Insert separator before last 2 items (mail) like the design
          const showSep = index === apps.length - 1 && apps.length > 4
          return (
            <div key={app.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {showSep && (
                <div
                  style={{
                    width: '0.5px',
                    height: '48px',
                    background: 'rgba(0,0,0,0.12)',
                    margin: '0 4px',
                    flexShrink: 0,
                  }}
                  aria-hidden
                />
              )}
              <DockItem
                id={app.id}
                name={app.name}
                isRunning={app.isRunning}
                mouseX={mouseX}
                onLaunch={launchApp}
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
