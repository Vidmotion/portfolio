'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDesktopStore } from '@/store/desktopStore'
import { useDragOffset } from '@/hooks/useDragOffset'
import { ClockWidget } from './ClockWidget'
import { SpotifyWidget } from './SpotifyWidget'
import { QuoteWidget } from './QuoteWidget'
import { RecentProjectsWidget } from './RecentProjectsWidget'
import { PhotosWidget } from './PhotosWidget'
import type { Widget, WidgetType } from '@/types'

function renderWidget(type: WidgetType, elevated: boolean): React.ReactNode {
  switch (type) {
    case 'clock':
      return <ClockWidget elevated={elevated} />
    case 'spotify':
      return <SpotifyWidget elevated={elevated} />
    case 'quote':
      return <QuoteWidget elevated={elevated} />
    case 'recent-projects':
      return <RecentProjectsWidget elevated={elevated} />
    case 'photos':
      return <PhotosWidget elevated={elevated} />
    default:
      return null
  }
}

interface DraggableWidgetProps {
  widget: Widget
  locked: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
  onDragEnd: (position: { x: number; y: number }) => void
}

function DraggableWidget({ widget, locked, containerRef, onDragEnd }: DraggableWidgetProps) {
  const {
    x,
    y,
    isDragging,
    onDragStart,
    onDragEnd: handleDragEnd,
  } = useDragOffset({ offset: widget.position, onDragEnd })

  return (
    // CRITICAL: Never use `filter` on this wrapper — it breaks backdrop-filter on all children.
    // Elevation is scale + the widget's own shadow escalating (via the `elevated` prop) — never
    // opacity/blur/brightness/contrast, so the material itself never visibly changes while dragging.
    <motion.div
      drag={!locked}
      dragMomentum={false}
      dragConstraints={containerRef}
      dragElastic={0.04}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 22 }}
      style={{
        x,
        y,
        position: 'absolute',
        left: 0,
        top: 0,
        touchAction: 'none',
        cursor: 'default',
        pointerEvents: 'auto',
      }}
      onDragStart={onDragStart}
      whileDrag={{
        scale: 1.02,
        cursor: 'grabbing',
        transition: { type: 'spring', stiffness: 320, damping: 24 },
      }}
      onDragEnd={handleDragEnd}
    >
      {renderWidget(widget.type, isDragging)}
    </motion.div>
  )
}

export function WidgetLayer() {
  const { widgets, moveWidget, isDesktopLocked } = useDesktopStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState(1)
  useLayoutEffect(() => {
    const measure = () => {
      const cards = Array.from(containerRef.current?.children ?? []) as HTMLElement[]
      const bottom = Math.max(
        28,
        ...cards.map((card, index) => widgets[index].position.y + card.offsetHeight)
      )
      const right = Math.max(
        1,
        ...cards.map((card, index) => widgets[index].position.x + card.offsetWidth)
      )
      setFit(
        Math.min(
          1,
          Math.max(0.1, (window.innerHeight - 148) / Math.max(1, bottom - 28)),
          (window.innerWidth - 34) / right
        )
      )
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [widgets])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 'var(--z-widgets)',
        transform: `scale(${fit})`,
        transformOrigin: '0 28px',
      }}
      aria-label="Desktop widgets"
    >
      {widgets.map((widget) => (
        <DraggableWidget
          key={widget.id}
          widget={widget}
          locked={isDesktopLocked}
          containerRef={containerRef}
          onDragEnd={(pos) => moveWidget(widget.id, pos)}
        />
      ))}
    </div>
  )
}
