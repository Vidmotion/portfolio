'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDesktopStore } from '@/store/desktopStore'
import { springs } from '@/lib/motion'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { identity } from '@/core/registries/identity'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

export function DesktopContextMenu({ x, y, onClose }: ContextMenuProps) {
  const { resetLayout, setDesktopLocked, isDesktopLocked } = useDesktopStore()
  const menuRef = useRef<HTMLDivElement>(null)

  useFocusTrap(menuRef, true)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose()
    }
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('mousedown', handler)
    window.addEventListener('keydown', keyHandler)
    return () => { window.removeEventListener('mousedown', handler); window.removeEventListener('keydown', keyHandler) }
  }, [onClose])

  // Clamp position so menu doesn't overflow viewport
  const menuW = 232
  const menuH = 200
  const clampedX = typeof window !== 'undefined' ? Math.min(x, window.innerWidth - menuW - 8) : x
  const clampedY = typeof window !== 'undefined' ? Math.min(y, window.innerHeight - menuH - 8) : y

  const items = [
    {
      label: 'Restore Original Layout',
      onClick: () => { resetLayout(); onClose() },
    },
    {
      label: 'Arrange Automatically',
      onClick: () => { resetLayout(); onClose() },
    },
    { divider: true },
    {
      label: isDesktopLocked ? 'Unlock Desktop' : 'Lock Desktop',
      onClick: () => { setDesktopLocked(!isDesktopLocked); onClose() },
    },
    { divider: true },
    {
      label: `Reset ${identity.productName}`,
      danger: true,
      onClick: () => {
        resetLayout()
        if (typeof window !== 'undefined') {
          ;['portfolio-os-desktop', 'portfolio-os-dock', 'portfolio-os-windows', 'portfolio-os-settings'].forEach(
            (key) => localStorage.removeItem(key)
          )
          window.location.reload()
        }
        onClose()
      },
    },
  ]

  return (
    <motion.div
      ref={menuRef}
      key="context-menu"
      role="menu"
      aria-label="Desktop context menu"
      tabIndex={-1}
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={springs.default}
      style={{
        position: 'fixed',
        left: clampedX,
        top: clampedY,
        width: `${menuW}px`,
        zIndex: 'var(--z-context-menu)',
        borderRadius: '12px',
        background: 'rgba(252,252,253,0.92)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 0.5px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.2)',
        padding: '5px 0',
        fontFamily: 'var(--font-text)',
        overflow: 'hidden',
      }}
    >
      {items.map((item, i) => {
        if ('divider' in item && item.divider) {
          return <div key={`div-${i}`} style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)', margin: '4px 0' }} />
        }
        return (
          <button
            key={item.label}
            onClick={item.onClick}
            style={{
              width: '100%',
              display: 'block',
              padding: '7px 14px',
              fontSize: '13px',
              fontWeight: 400,
              color: item.danger ? '#ff3b30' : '#161617',
              background: 'transparent',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-text)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = item.danger ? 'rgba(255,59,48,0.08)' : 'rgba(10,126,255,0.08)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
          >
            {item.label}
          </button>
        )
      })}
    </motion.div>
  )
}
