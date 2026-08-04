'use client'

import { useTime } from '@/hooks/useTime'
import { identity } from '@/core/registries/identity'

const NAV_ITEMS = ['Projects', 'Playlist']

export function TabletMenuBar() {
  const { date, fullTime } = useTime()

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '34px',
        zIndex: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 22px',
        background: 'rgba(20,20,22,0.28)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        fontSize: '13px',
        color: '#fff',
        letterSpacing: '-0.005em',
        fontFamily: 'var(--font-text)',
      }}
      role="banner"
      aria-label="Tablet menu bar"
    >
      {/* Left: brand + nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#fff',
            flexShrink: 0,
          }}
          aria-hidden
        />
        <span style={{ fontWeight: 600 }}>{identity.name}</span>
        {NAV_ITEMS.map((item) => (
          <span key={item} style={{ fontWeight: 400, opacity: 0.82 }}>
            {item}
          </span>
        ))}
      </div>

      {/* Right: date + time */}
      <span style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
        {date} · {fullTime}
      </span>
    </div>
  )
}
