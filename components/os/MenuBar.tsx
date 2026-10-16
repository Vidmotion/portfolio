'use client'

import { useState, useCallback } from 'react'
import { useTime } from '@/hooks/useTime'
import { useApplicationLauncher } from '@/hooks/useApplicationLauncher'
import { identity } from '@/core/registries/identity'
import { menuBarNav } from '@/core/layouts/menuBarNav'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'

export const MENU_BAR_HEIGHT = 28

interface NavItem {
  label: string
  action: () => void
}

function useNavItems(): NavItem[] {
  const { launch } = useApplicationLauncher()
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  return [
    { label: text.about, action: () => launch('notes') },
    ...menuBarNav.map((item) => ({
      label: item.label === 'Projects' ? text.projects : item.label,
      action: () =>
        launch(
          item.appId,
          item.appId === 'finder' ? { category: item.category ?? null } : undefined
        ),
    })),
    { label: text.contacts, action: () => launch('mail') },
  ]
}

export function MenuBar({ tablet = false }: { tablet?: boolean }) {
  const { fullTime, date } = useTime()
  const navItems = useNavItems()
  const [pressed, setPressed] = useState<string | null>(null)

  const activate = useCallback((item: NavItem) => {
    setPressed(item.label)
    item.action()
    setTimeout(() => setPressed(null), 180)
  }, [])

  return (
    <div
      className="fixed top-0 right-0 left-0 flex items-center justify-between"
      style={{
        height: `${tablet ? 44 : MENU_BAR_HEIGHT}px`,
        zIndex: 'var(--z-menu-bar)',
        padding: '0 16px',
        fontFamily: 'var(--font-text)',
        fontSize: '13px',
        letterSpacing: '-0.005em',
        // Shared translucent chrome follows the selected wallpaper palette.
        background: 'var(--os-dock)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '0.5px solid var(--os-line)',
      }}
      role={tablet ? 'toolbar' : undefined}
      aria-label={tablet ? 'Tablet menu bar' : undefined}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: tablet ? '8px' : '20px' }}>
        {/* Apple-style logo dot */}
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'var(--os-ink)',
            flexShrink: 0,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
          aria-label={identity.productName}
          role="img"
        />

        {/* Brand */}
        <span style={{ fontWeight: 600, color: 'var(--os-ink)', letterSpacing: '-0.01em' }}>
          {identity.name}
        </span>

        {/* Nav items */}
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => activate(item)}
            style={{
              fontWeight: pressed === item.label ? 500 : 400,
              color: pressed === item.label ? 'var(--os-ink)' : 'var(--os-muted)',
              background: pressed === item.label ? 'rgba(var(--os-accent-rgb),.12)' : 'transparent',
              border: 'none',
              padding: tablet ? '1px 5px' : '1px 7px',
              minHeight: tablet ? '40px' : undefined,
              borderRadius: '4px',
              cursor: tablet ? 'pointer' : 'default',
              letterSpacing: '-0.005em',
              fontSize: '13px',
              fontFamily: 'var(--font-text)',
              transition: 'background 0.12s, color 0.12s',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: tablet ? '8px' : '16px',
          color: 'var(--os-ink)',
        }}
      >
        <LanguageSwitcher />
        {/* WiFi icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-label="WiFi connected">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="var(--os-accent)" />
          <path
            d="M4.5 7.5C5.6 6.4 6.7 5.8 8 5.8s2.4.6 3.5 1.7"
            stroke="var(--os-muted)"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1.5 4.5C3.2 2.8 5.5 1.8 8 1.8s4.8 1 6.5 2.7"
            stroke="var(--os-faint)"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <span
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'var(--os-muted)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {date}
        </span>

        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--os-ink)',
            fontVariantNumeric: 'tabular-nums',
            minWidth: '58px',
          }}
        >
          {fullTime}
        </span>
      </div>
    </div>
  )
}
