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
  position: { x: number; y: number }
  anchor?: { x: number; y: number }
  bounds?: { width: number; height: number }
  locked: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
  onDragEnd: (position: { x: number; y: number }) => void
}

function DraggableWidget({
  widget,
  position,
  anchor,
  bounds,
  locked,
  containerRef,
  onDragEnd,
}: DraggableWidgetProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    const card = cardRef.current
    if (!anchor || !card) return
    const measure = () =>
      setDimensions((size) =>
        size.width === card.offsetWidth && size.height === card.offsetHeight
          ? size
          : { width: card.offsetWidth, height: card.offsetHeight }
      )
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(card)
    return () => observer.disconnect()
  }, [anchor])
  const constraints =
    anchor && bounds
      ? {
          left: -anchor.x,
          top: -anchor.y,
          right: Math.max(-anchor.x, bounds.width - anchor.x - dimensions.width),
          bottom: Math.max(-anchor.y, bounds.height - anchor.y - dimensions.height),
        }
      : undefined
  const offset = constraints
    ? {
        x: Math.max(constraints.left, Math.min(position.x, constraints.right)),
        y: Math.max(constraints.top, Math.min(position.y, constraints.bottom)),
      }
    : position
  const {
    x,
    y,
    isDragging,
    onDragStart,
    onDragEnd: handleDragEnd,
  } = useDragOffset({ offset, onDragEnd })

  return (
    // CRITICAL: Never use `filter` on this wrapper — it breaks backdrop-filter on all children.
    // Elevation is scale + the widget's own shadow escalating (via the `elevated` prop) — never
    // opacity/blur/brightness/contrast, so the material itself never visibly changes while dragging.
    <motion.div
      ref={cardRef}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
      drag={!locked}
      dragMomentum={false}
      dragConstraints={constraints ?? containerRef}
      dragElastic={0.04}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 22 }}
      style={{
        x,
        y,
        position: 'absolute',
        left: anchor?.x ?? 0,
        top: anchor?.y ?? 0,
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

export type WidgetLayout = Partial<Record<WidgetType, { x: number; y: number }>>

export function WidgetLayer({
  layout,
  bounds,
}: {
  layout?: WidgetLayout
  bounds?: { width: number; height: number }
}) {
  const { widgets, moveWidget, isDesktopLocked, tabletWidgetOffsets, setTabletWidgetOffset } =
    useDesktopStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState(1)
  useLayoutEffect(() => {
    if (layout) return
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
  }, [widgets, layout])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 'var(--z-widgets)',
        transform: layout ? undefined : `scale(${fit})`,
        transformOrigin: '0 28px',
      }}
      aria-label={layout ? 'Tablet widgets' : 'Desktop widgets'}
    >
      {widgets.map((widget) => {
        const anchor = layout?.[widget.type]
        const offset = tabletWidgetOffsets[widget.id] ??
          tabletWidgetOffsets[widget.type] ?? { x: 0, y: 0 }
        const position = anchor ? offset : widget.position
        return (
          <DraggableWidget
            key={widget.id}
            widget={widget}
            position={position}
            anchor={anchor}
            bounds={bounds}
            locked={isDesktopLocked}
            containerRef={containerRef}
            onDragEnd={(pos) =>
              anchor ? setTabletWidgetOffset(widget.id, pos) : moveWidget(widget.id, pos)
            }
          />
        )
      })}
    </div>
  )
}
