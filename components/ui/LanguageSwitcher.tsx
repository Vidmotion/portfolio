'use client'

import { useLocaleStore } from '@/store/localeStore'
import type { Locale } from '@/types'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore()
  return (
    <div
      role="group"
      aria-label="Language / Lingua"
      style={{ display: 'flex', gap: '2px', color: 'inherit' }}
    >
      {(['en', 'it'] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={code === 'en' ? 'English' : 'Italiano'}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          style={{
            fontFamily: 'var(--font-text)',
            fontSize: '10px',
            fontWeight: locale === code ? 600 : 400,
            color: 'inherit',
            padding: '3px 5px',
            minWidth: '26px',
            minHeight: '24px',
            border: 'none',
            borderRadius: '5px',
            background: locale === code ? 'rgba(128,128,128,.24)' : 'transparent',
            cursor: 'pointer',
            lineHeight: 1.1,
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
