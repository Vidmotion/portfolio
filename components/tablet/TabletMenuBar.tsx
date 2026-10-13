'use client'

import { useTime } from '@/hooks/useTime'
import { identity } from '@/core/registries/identity'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useApplicationLauncher } from '@/hooks/useApplicationLauncher'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'

export function TabletMenuBar() {
  const { date, fullTime } = useTime()
  const { launch } = useApplicationLauncher()
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  const navItems = [
    { label: text.projects, appId: 'finder' },
    { label: text.playlist, appId: 'spotify' },
  ]

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
        {navItems.map((item) => (
          <button
            key={item.appId}
            onClick={() =>
              launch(item.appId, item.appId === 'finder' ? { category: null } : undefined)
            }
            style={{
              font: 'inherit',
              color: 'inherit',
              border: 'none',
              padding: 0,
              background: 'transparent',
              fontWeight: 400,
              opacity: 0.82,
              cursor: 'pointer',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: date + time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <LanguageSwitcher />
        <span style={{ fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
          {date} · {fullTime}
        </span>
      </div>
    </div>
  )
}
