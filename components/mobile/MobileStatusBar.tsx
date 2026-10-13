'use client'

import { useTime } from '@/hooks/useTime'

interface MobileStatusBarProps {
  light?: boolean
}

export function MobileStatusBar({ light = true }: MobileStatusBarProps) {
  const { fullTime } = useTime()
  const color = light ? '#fff' : 'var(--mobile-text, #161617)'

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '52px',
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 30px 0',
        color,
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      {/* Time */}
      <span
        style={{
          fontSize: '15px',
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.01em',
        }}
      >
        {fullTime.split(' ')[0]}
      </span>

      {/* Dynamic Island — dead space */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '12px',
          transform: 'translateX(-50%)',
          width: '86px',
          height: '25px',
          borderRadius: '9999px',
          background: '#000',
        }}
      />

      {/* Signal + Battery */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Signal bars */}
        <div
          style={{
            display: 'flex',
            gap: '2px',
            alignItems: 'flex-end',
            height: '10px',
          }}
        >
          {[4, 6, 8, 10].map((h, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: `${h}px`,
                background: 'currentColor',
                borderRadius: '1px',
              }}
            />
          ))}
        </div>

        {/* Battery */}
        <div
          style={{
            width: '23px',
            height: '11px',
            border: '1px solid currentColor',
            borderRadius: '3px',
            padding: '1.5px',
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: '72%',
              height: '100%',
              background: 'currentColor',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>
    </div>
  )
}
