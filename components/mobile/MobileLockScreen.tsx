'use client'

import { motion } from 'framer-motion'
import { useId } from 'react'
import { useTime } from '@/hooks/useTime'
import { springs } from '@/lib/motion'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'

interface MobileLockScreenProps {
  onUnlock: () => void
}

export function MobileLockScreen({ onUnlock }: MobileLockScreenProps) {
  const { bigTime, dateLong } = useTime()
  const text = uiText[useLocaleStore((state) => state.locale)]
  const unlockLabel = useId()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={springs.default}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'var(--mobile-text)',
        padding: 0,
        fontFamily: 'var(--font-text)',
      }}
    >
      <button
        type="button"
        onClick={onUnlock}
        aria-labelledby={unlockLabel}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      />
      {/* Date + Time */}
      <div
        aria-hidden="true"
        style={{
          marginTop: '92px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '17px',
            fontWeight: 500,
            letterSpacing: '0.01em',
            textShadow: 'none',
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
            textShadow: 'none',
            fontVariantNumeric: 'tabular-nums',
            marginTop: '2px',
          }}
        >
          {bigTime}
        </div>
      </div>

      {/* Portfolio entry — real identity, no simulated playback state. */}
      <div
        style={{
          marginTop: '30px',
          width: 'min(300px, calc(100% - 48px))',
          padding: '16px 18px',
          borderRadius: '22px',
          background: 'var(--mobile-widget-material)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: 'var(--mobile-glass-shadow)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '11px',
            flexShrink: 0,
            background: `url(${profile.portrait}) center/cover no-repeat`,
          }}
        />
        <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--mobile-muted)',
              fontWeight: 600,
            }}
          >
            {identity.name}
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--mobile-text)',
              lineHeight: 1.4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {profile.title}
          </div>
        </div>
        <span style={{ color: 'var(--mobile-text)', fontSize: '23px', opacity: 0.8 }}>›</span>
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
            background: 'var(--mobile-berry)',
          }}
        />
        <div
          id={unlockLabel}
          style={{
            fontSize: '12px',
            letterSpacing: '0.04em',
            color: 'var(--mobile-muted)',
            textShadow: 'none',
          }}
        >
          {text.unlock}
        </div>
      </div>
    </motion.div>
  )
}
