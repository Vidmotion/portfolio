'use client'

import { widgetDarkGlass } from '@/lib/utils'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'

interface QuoteWidgetProps {
  elevated?: boolean
}

export function QuoteWidget({ elevated }: QuoteWidgetProps) {
  const text = uiText[useLocaleStore((state) => state.locale)]
  return (
    <div
      className="glass-widget-squircle"
      style={{
        width: '160px',
        height: '152px',
        borderRadius: '26px',
        ...widgetDarkGlass(elevated),
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-text)',
      }}
      aria-label={text.updates}
    >
      {/* Accent bar */}
      <div
        style={{
          width: '22px',
          height: '1.5px',
          background: 'var(--os-accent)',
          borderRadius: '1px',
        }}
        aria-hidden
      />

      {/* Quote text */}
      <p
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 400,
          color: 'var(--os-ink)',
          lineHeight: 1.5,
          letterSpacing: '-0.015em',
          whiteSpace: 'pre-line',
          fontFamily: 'var(--font-display)',
        }}
      >
        {text.websiteUpdate}
      </p>

      {/* Attribution */}
      <div
        style={{
          fontSize: '9px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--os-muted)',
          fontWeight: 600,
        }}
      >
        {text.updates}
      </div>
    </div>
  )
}
