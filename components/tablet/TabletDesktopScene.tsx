'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { WidgetLayer, type WidgetLayout } from '@/components/widgets/WidgetLayer'
import { DesktopFolders } from '@/components/os/DesktopFolders'

const WIDE: WidgetLayout = {
  clock: { x: 0, y: 16 },
  quote: { x: 0, y: 214 },
  spotify: { x: 180, y: 16 },
  'recent-projects': { x: 180, y: 211 },
  photos: { x: 570, y: 16 },
}
const PORTRAIT: WidgetLayout = { ...WIDE, photos: { x: 180, y: 455 } }

function sceneLayout(width: number, height: number) {
  const wide = width >= 960 || height < 820
  const availableWidth = Math.max(1, width - 48)
  const availableHeight = Math.max(1, height - 162)
  const scale = Math.min(
    1,
    availableWidth / (wide ? 940 : 726),
    availableHeight / (wide ? 504 : 690)
  )
  const sceneWidth = availableWidth / scale
  return {
    widgets: wide ? WIDE : PORTRAIT,
    folders: { x: sceneWidth - (wide ? 186 : 90), y: wide ? 276 : 16, columns: wide ? 2 : 1 },
    scale,
    width: sceneWidth,
    height: availableHeight / scale,
  }
}

/** The desktop's actual cards and folders, reflowed into the tablet's available canvas. */
export function TabletDesktopScene({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState(() => sceneLayout(1024, 768))
  useLayoutEffect(() => {
    const screen = containerRef.current ?? sceneRef.current?.parentElement
    if (!screen) return
    const measure = () => setLayout(sceneLayout(screen.clientWidth, screen.clientHeight))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(screen)
    return () => observer.disconnect()
  }, [containerRef])
  return (
    <div
      ref={sceneRef}
      data-tablet-scene=""
      style={{
        position: 'absolute',
        left: 24,
        top: 44,
        width: layout.width,
        height: layout.height,
        transform: `scale(${layout.scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
        zIndex: 'var(--z-widgets)',
      }}
    >
      <WidgetLayer layout={layout.widgets} bounds={{ width: layout.width, height: layout.height }} />
      <DesktopFolders tabletLayout={layout.folders} containerRef={sceneRef} />
    </div>
  )
}
