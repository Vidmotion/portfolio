'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { WindowControls } from '@/components/ui/WindowControls'
import { useWindowStore } from '@/store/windowStore'
import { windowVariants, springs } from '@/lib/motion'
import {
  clampWindowPosition,
  clampWindowSize,
  WIDGET_DARK_GLASS,
  getOsMenuBarHeight,
} from '@/lib/utils'
import type { OSWindow as OSWindowType } from '@/types'
import styles from './OSWindow.module.css'

interface OSWindowProps {
  window: OSWindowType
  children: React.ReactNode
}

export function OSWindow({ window: win, children }: OSWindowProps) {
  const menuBarHeight = getOsMenuBarHeight()
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow } =
    useWindowStore()
  const isDragging = useRef(false)
  const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 })
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, width: 0, height: 0 })
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const interactionCleanup = useRef<(() => void) | null>(null)
  useEffect(() => {
    const cancel = () => interactionCleanup.current?.()
    window.addEventListener('resize', cancel)
    return () => {
      window.removeEventListener('resize', cancel)
      interactionCleanup.current?.()
    }
  }, [])

  // MotionValues for drag/resize — decoupled from store during interaction
  const motionX = useMotionValue(win.position.x)
  const motionY = useMotionValue(win.position.y)
  const motionWidth = useMotionValue(win.size.width)
  const motionHeight = useMotionValue(win.size.height)

  // Sync when position/size change externally (e.g. window opened fresh, restored from persistence)
  useEffect(() => {
    if (!isDragging.current) {
      motionX.set(win.position.x)
      motionY.set(win.position.y)
    }
  }, [win.position.x, win.position.y, motionX, motionY])

  useEffect(() => {
    if (!resizing) {
      motionWidth.set(win.size.width)
      motionHeight.set(win.size.height)
    }
  }, [win.size.width, win.size.height, motionWidth, motionHeight, resizing])

  const onFocus = useCallback(() => {
    if (!win.isFocused) focusWindow(win.id)
  }, [win.id, win.isFocused, focusWindow])

  // Pointer Events (not Mouse Events) so title-bar drag and resize work identically
  // for mouse, touch and pen — required for Tablet/Mobile to share this exact
  // window implementation with Desktop instead of a touch-only reimplementation.
  const onDragStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 || !e.isPrimary || (e.target as HTMLElement).closest('button')) return
      interactionCleanup.current?.()
      e.preventDefault()
      isDragging.current = true
      setDragging(true)
      dragStart.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        winX: motionX.get(),
        winY: motionY.get(),
      }
      focusWindow(win.id)

      const onMove = (ev: PointerEvent) => {
        if (!isDragging.current || ev.pointerId !== e.pointerId) return
        const dx = ev.clientX - dragStart.current.mouseX
        const dy = ev.clientY - dragStart.current.mouseY
        const rawX = dragStart.current.winX + dx
        const rawY = dragStart.current.winY + dy
        const clamped = clampWindowPosition(
          rawX,
          rawY,
          win.size.width,
          win.size.height,
          menuBarHeight
        )
        motionX.set(clamped.x)
        motionY.set(clamped.y)
      }

      const onUp = () => {
        isDragging.current = false
        setDragging(false)
        moveWindow(win.id, { x: motionX.get(), y: motionY.get() })
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        interactionCleanup.current = null
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
      interactionCleanup.current = onUp
    },
    [win.id, win.size, motionX, motionY, focusWindow, moveWindow, menuBarHeight]
  )

  const onResizeStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 || !e.isPrimary) return
      interactionCleanup.current?.()
      e.preventDefault()
      e.stopPropagation()
      focusWindow(win.id)
      setResizing(true)
      resizeStart.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        width: motionWidth.get(),
        height: motionHeight.get(),
      }

      const onMove = (ev: PointerEvent) => {
        if (ev.pointerId !== e.pointerId) return
        const dx = ev.clientX - resizeStart.current.mouseX
        const dy = ev.clientY - resizeStart.current.mouseY
        const next = clampWindowSize(
          resizeStart.current.width + dx,
          resizeStart.current.height + dy,
          motionX.get(),
          motionY.get()
        )
        motionWidth.set(next.width)
        motionHeight.set(next.height)
      }

      const onUp = () => {
        setResizing(false)
        resizeWindow(win.id, { width: motionWidth.get(), height: motionHeight.get() })
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        interactionCleanup.current = null
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
      interactionCleanup.current = onUp
    },
    [win.id, motionX, motionY, motionWidth, motionHeight, focusWindow, resizeWindow]
  )

  const isMaximized = win.state === 'maximized'

  return (
    <motion.div
      className={styles.window}
      key={win.id}
      initial="closed"
      animate="open"
      exit="exit"
      variants={windowVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: isMaximized ? 0 : motionX,
        y: isMaximized ? menuBarHeight : motionY,
        width: isMaximized ? '100vw' : motionWidth,
        height: isMaximized
          ? `calc(100dvh - ${menuBarHeight}px - var(--window-dock-space))`
          : motionHeight,
        zIndex: win.zIndex,
        borderRadius: isMaximized ? 0 : '18px',
        overflow: 'hidden',
        display: win.state === 'minimized' ? 'none' : 'flex',
        flexDirection: 'column',
        background: 'var(--ui-surface)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        boxShadow: win.isFocused
          ? 'inset 0 1px 0 rgba(255,255,255,0.8),0 0 0 0.5px rgba(0,0,0,0.06),0 32px 80px rgba(0,0,0,0.18),0 8px 20px rgba(0,0,0,0.08)'
          : 'inset 0 1px 0 rgba(255,255,255,0.6),0 0 0 0.5px rgba(0,0,0,0.04),0 16px 40px rgba(0,0,0,0.1),0 4px 10px rgba(0,0,0,0.05)',
        willChange: 'transform',
      }}
      onPointerDown={onFocus}
      transition={springs.largeWindow}
      aria-label={`${win.title} window`}
      aria-hidden={win.state === 'minimized'}
      inert={win.state === 'minimized'}
      role="dialog"
    >
      {/* Title bar — the one part of the window that gets the shared dark glass
          material; the content area below is untouched so Finder/Notes/Photos/
          Settings keep their existing light, fully legible styling. */}
      <div
        onPointerDown={onDragStart}
        onDoubleClick={() => maximizeWindow(win.id)}
        className="flex shrink-0 items-center select-none"
        style={{
          height: '44px',
          padding: '0 16px',
          gap: '14px',
          background: WIDGET_DARK_GLASS.background,
          backdropFilter: WIDGET_DARK_GLASS.backdropFilter,
          WebkitBackdropFilter: WIDGET_DARK_GLASS.WebkitBackdropFilter,
          borderBottom: '0.5px solid var(--ui-border)',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          fontFamily: 'var(--font-text)',
        }}
        role="toolbar"
        aria-label={`${win.title} window toolbar`}
      >
        <WindowControls
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          isActive={win.isFocused}
        />

        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 500,
            color: win.isFocused ? 'var(--os-ink)' : 'var(--os-muted)',
            letterSpacing: '-0.005em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginRight: '52px',
            pointerEvents: 'none',
          }}
        >
          {win.title}
        </div>
      </div>

      {/* Content */}
      <div className={`min-h-0 flex-1 overflow-hidden ${styles.content}`}>{children}</div>

      {/* Resize handle */}
      {!isMaximized && (
        <div
          onPointerDown={onResizeStart}
          role="presentation"
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '18px',
            height: '18px',
            cursor: 'nwse-resize',
            touchAction: 'none',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'block' }}>
            <path
              d="M15 15L15 11M15 15L11 15"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
