'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCommandStore } from '@/store/commandStore'
import { useDesktopStore } from '@/store/desktopStore'
import { useWindowStore } from '@/store/windowStore'
import { useApplicationLauncher } from '@/hooks/useApplicationLauncher'
import { springs, duration } from '@/lib/motion'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { wallpapers } from '@/core/registries/wallpapers'

interface Action {
  id: string
  label: string
  shortcut?: string
  icon: string
  run: () => void
}

function fuzzyMatch(query: string, label: string): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  const l = label.toLowerCase()
  let qi = 0
  for (let i = 0; i < l.length && qi < q.length; i++) {
    if (l[i] === q[qi]) qi++
  }
  return qi === q.length
}

export function CommandPalette() {
  const { isOpen, query, close, setQuery } = useCommandStore()
  const { closeAllWindows } = useWindowStore()
  const { setWallpaper, resetLayout, setDesktopLocked, isDesktopLocked } = useDesktopStore()
  const { launch } = useApplicationLauncher()
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, isOpen, inputRef)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close])

  const actions: Action[] = [
    { id: 'finder', label: 'Open Finder', icon: '🗂', run: () => launch('finder') },
    { id: 'photos', label: 'Open Photos', icon: '🖼', run: () => launch('photos') },
    { id: 'notes', label: 'Open Notes', icon: '📝', run: () => launch('notes') },
    { id: 'spotify', label: 'Open Music', icon: '🎵', run: () => launch('spotify') },
    { id: 'settings', label: 'Open Settings', icon: '⚙️', run: () => launch('settings') },
    { id: 'close-all', label: 'Close All Windows', icon: '✕', run: () => closeAllWindows() },
    ...wallpapers.map((w, i) => ({
      id: `wallpaper-${w.id}`,
      label: `Wallpaper ${i + 1}`,
      icon: '◧',
      run: () => setWallpaper(w.id),
    })),
    { id: 'reset-layout', label: 'Reset Layout', icon: '↺', run: () => resetLayout() },
    {
      id: 'lock-desktop',
      label: isDesktopLocked ? 'Unlock Desktop' : 'Lock Desktop',
      icon: isDesktopLocked ? '🔓' : '🔒',
      run: () => setDesktopLocked(!isDesktopLocked),
    },
  ]

  const filtered = actions.filter((a) => fuzzyMatch(query, a.label))

  const handleSelect = (action: Action) => {
    close()
    action.run()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.modal }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'var(--z-modal)',
              background: 'rgba(0,0,0,0.22)',
            }}
          />
          <motion.div
            key="cmd-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                close()
              }
              if (event.key === 'Enter' && event.target === inputRef.current && filtered.length) {
                event.preventDefault()
                handleSelect(filtered[0])
              }
            }}
            initial={{ opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transformTemplate={(_, generated) =>
              `translateX(-50%)${generated === 'none' ? '' : ` ${generated}`}`
            }
            transition={springs.default}
            style={{
              position: 'fixed',
              top: '22%',
              left: '50%',
              width: '520px',
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(78dvh - 24px)',
              overflowY: 'auto',
              zIndex: 'var(--z-modal)',
              borderRadius: '16px',
              background: 'rgba(252,252,253,0.92)',
              backdropFilter: 'blur(52px) saturate(180%)',
              WebkitBackdropFilter: 'blur(52px) saturate(180%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 0.5px rgba(0,0,0,0.08), 0 32px 80px rgba(0,0,0,0.24)',
              overflowX: 'hidden',
              fontFamily: 'var(--font-text)',
            }}
          >
            {/* Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                borderBottom: '0.5px solid rgba(0,0,0,0.07)',
              }}
            >
              <span style={{ fontSize: '15px', color: '#888' }}>⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Type a command"
                placeholder="Type a command…"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '-0.012em',
                  color: '#161617',
                  fontFamily: 'var(--font-display)',
                  caretColor: 'var(--os-accent)',
                }}
              />
            </div>
            {/* Actions */}
            <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '6px 0' }}>
              {filtered.length === 0 && (
                <div
                  style={{
                    padding: '20px 18px',
                    fontSize: '13px',
                    color: '#999',
                    textAlign: 'center',
                  }}
                >
                  No commands match
                </div>
              )}
              {filtered.map((action, i) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.015 }}
                  onClick={() => handleSelect(action)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '9px 18px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-text)',
                  }}
                  whileHover={{ background: 'rgba(10,126,255,0.07)' }}
                >
                  <span
                    style={{ fontSize: '15px', width: '22px', textAlign: 'center', flexShrink: 0 }}
                  >
                    {action.icon}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#161617',
                      letterSpacing: '-0.01em',
                      flex: 1,
                    }}
                  >
                    {action.label}
                  </span>
                  {action.shortcut && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#aaa',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(0,0,0,0.05)',
                        padding: '2px 6px',
                        borderRadius: '5px',
                      }}
                    >
                      {action.shortcut}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
