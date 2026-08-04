'use client'

import { widgetDarkGlass } from '@/lib/utils'

const QUOTE = {
  text: 'Light first.\nThe rest follows.',
  attribution: 'MANIFESTO',
}

interface QuoteWidgetProps {
  elevated?: boolean
}

export function QuoteWidget({ elevated }: QuoteWidgetProps) {
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
      aria-label="Manifesto quote"
    >
      {/* Accent bar */}
      <div style={{ width: '22px', height: '1.5px', background: 'rgba(255,255,255,0.20)', borderRadius: '1px' }} aria-hidden />

      {/* Quote text */}
      <p style={{ margin: 0, fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.90)', lineHeight: 1.5, letterSpacing: '-0.015em', whiteSpace: 'pre-line', fontFamily: 'var(--font-display)' }}>
        {QUOTE.text}
      </p>

      {/* Attribution */}
      <div style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
        {QUOTE.attribution}
      </div>
    </div>
  )
}
