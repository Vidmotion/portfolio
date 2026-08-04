'use client'

import { useEffect, useState } from 'react'
import { widgetDarkGlass } from '@/lib/utils'

interface ClockWidgetProps {
  elevated?: boolean
}

export function ClockWidget({ elevated }: ClockWidgetProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const id = setTimeout(() => setNow(new Date()), 0)
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => { clearTimeout(id); clearInterval(interval) }
  }, [])

  const timeStr = now
    ? now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    : '--:--'
  const dateLabel = now
    ? now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()
    : ''
  const ampm = now ? (now.getHours() >= 12 ? 'PM' : 'AM') : 'AM'
  const dayFull = now ? now.toLocaleDateString('en-US', { weekday: 'long' }) : ''
  const timeDisplay = timeStr.replace(/\s?(AM|PM)/, '')

  return (
    <div
      className="glass-widget-squircle"
      style={{
        width: '160px',
        height: '178px',
        borderRadius: '26px',
        ...widgetDarkGlass(elevated),
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-text)',
      }}
      role="timer"
      aria-label="Clock widget"
    >
      {/* Date kicker */}
      <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', fontWeight: 500 }}>
        {dateLabel}
      </div>

      {/* Big time */}
      <div style={{ fontSize: '52px', fontWeight: 300, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.96)', lineHeight: 0.88, fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-display)' }}>
        {timeDisplay}
      </div>

      {/* AM/PM + Day */}
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.62)', letterSpacing: '-0.005em', fontWeight: 400 }}>
        {ampm} · {dayFull}
      </div>
    </div>
  )
}
