'use client'

import { motion } from 'framer-motion'
import { useTime } from '@/hooks/useTime'
import { useDesktopStore } from '@/store/desktopStore'
import { useDragOffset } from '@/hooks/useDragOffset'
import { playlist } from '@/core/registries/playlist'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'
import styles from './TabletResponsive.module.css'

interface DraggableCardProps {
  id: string
  locked: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
  children: React.ReactNode
}

// Same drag mechanics as Desktop's widgets (components/widgets/WidgetLayer.tsx)
// via the shared useDragOffset hook. At rest (offset 0,0) each card sits exactly
// where it does today — dragging adds a transform offset on top of the strip's
// normal flex layout, identical in spirit to how Desktop folders/widgets work.
function DraggableCard({ id, locked, containerRef, children }: DraggableCardProps) {
  const tabletWidgetOffsets = useDesktopStore((s) => s.tabletWidgetOffsets)
  const setTabletWidgetOffset = useDesktopStore((s) => s.setTabletWidgetOffset)
  const offset = tabletWidgetOffsets[id] ?? { x: 0, y: 0 }
  const { x, y, isDragging, onDragStart, onDragEnd } = useDragOffset({
    offset,
    onDragEnd: (off) => setTabletWidgetOffset(id, off),
  })

  return (
    <motion.div
      className={styles.card}
      drag={!locked}
      dragMomentum={false}
      dragElastic={0.04}
      dragConstraints={containerRef}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 22 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{
        scale: 1.02,
        cursor: 'grabbing',
        transition: { type: 'spring', stiffness: 320, damping: 24 },
      }}
      style={{ x, y, touchAction: 'none', cursor: 'default', zIndex: isDragging ? 1 : 'auto' }}
    >
      {children}
    </motion.div>
  )
}

// Left widget column for the tablet — Clock + mini Spotify row
// Matches prototype: position absolute top=60 left=42, width=208px
export function TabletWidgetStrip({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const { bigTime, date } = useTime()
  const locale = useLocaleStore((s) => s.locale)
  const isDesktopLocked = useDesktopStore((s) => s.isDesktopLocked)

  return (
    <div className={styles.strip}>
      {/* Clock */}
      <DraggableCard id="clock" locked={isDesktopLocked} containerRef={containerRef}>
        <div
          style={{
            height: 'var(--tablet-clock-height, 150px)',
            borderRadius: '26px',
            background: 'rgba(248,248,252,0.9)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 14px 36px rgba(0,0,0,0.12)',
            padding: 'var(--tablet-widget-padding, 20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          aria-label={`Clock: ${bigTime}`}
        >
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#595961',
              fontWeight: 500,
            }}
          >
            {date}
          </div>
          <div
            style={{
              fontSize: 'var(--tablet-clock-size, 46px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              color: '#161617',
              lineHeight: 0.9,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {bigTime}
          </div>
          <div style={{ fontSize: '12px', color: '#595961' }}>{profile.location[locale]}</div>
        </div>
      </DraggableCard>

      {/* Mini Spotify */}
      <DraggableCard id="spotify" locked={isDesktopLocked} containerRef={containerRef}>
        <div
          style={{
            borderRadius: '26px',
            background: 'rgba(248,248,252,0.9)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 14px 36px rgba(0,0,0,0.12)',
            padding: '18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
          }}
          aria-label={uiText[locale].myPlaylist}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '13px',
              flexShrink: 0,
              background: `url(${playlist.cover}) center/cover no-repeat`,
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            }}
            aria-hidden
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#595961',
                fontWeight: 600,
              }}
            >
              {uiText[locale].myPlaylist}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#161617',
                letterSpacing: '-0.015em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '3px',
              }}
            >
              {playlist.title}
            </div>
            <div style={{ fontSize: '11px', color: '#595961', marginTop: '1px' }}>
              {identity.name}
            </div>
          </div>
        </div>
      </DraggableCard>
    </div>
  )
}
