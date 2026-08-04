'use client'

import { motion } from 'framer-motion'
import { useTime } from '@/hooks/useTime'
import { springs } from '@/lib/motion'

interface MobileLockScreenProps {
  onUnlock: () => void
}

export function MobileLockScreen({ onUnlock }: MobileLockScreenProps) {
  const { bigTime, dateLong } = useTime()

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={springs.default}
      onClick={onUnlock}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        padding: 0,
        fontFamily: 'var(--font-text)',
      }}
      aria-label="Tap to unlock"
    >
      {/* Date + Time */}
      <div
        style={{ marginTop: '92px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div
          style={{
            fontSize: '17px',
            fontWeight: 500,
            letterSpacing: '0.01em',
            textShadow: '0 2px 16px rgba(0,0,0,0.35)',
            opacity: 0.95,
          }}
        >
          {dateLong}
        </div>
        <div
          style={{
            fontSize: '96px',
            fontWeight: 300,
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
            textShadow: '0 4px 30px rgba(0,0,0,0.35)',
            fontVariantNumeric: 'tabular-nums',
            marginTop: '2px',
          }}
        >
          {bigTime}
        </div>
      </div>

      {/* Now Playing widget */}
      <div
        style={{
          marginTop: '30px',
          width: '228px',
          padding: '16px 18px',
          borderRadius: '22px',
          background: 'rgba(255,255,255,0.14)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
        aria-label="Now Playing"
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '11px',
            flexShrink: 0,
            background: 'url(/spotify-cover.jpg) center/cover no-repeat, linear-gradient(150deg, hsl(300 14% 52%), hsl(280 16% 38%))',
          }}
        />
        <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: 600,
            }}
          >
            Now Playing
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Low Frequencies
          </div>
        </div>
        <span style={{ color: '#fff', fontSize: '16px', opacity: 0.9 }}>▶</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Swipe hint */}
      <div
        style={{
          marginBottom: '38px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '150px',
            height: '4px',
            borderRadius: '9999px',
            background: 'rgba(255,255,255,0.55)',
          }}
        />
        <div
          style={{
            fontSize: '12px',
            letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.8)',
            textShadow: '0 1px 8px rgba(0,0,0,0.35)',
          }}
        >
          Tap to open
        </div>
      </div>
    </motion.button>
  )
}
