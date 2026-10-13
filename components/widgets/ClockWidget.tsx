'use client'

import { useTime } from '@/hooks/useTime'
import { widgetDarkGlass } from '@/lib/utils'

interface ClockWidgetProps {
  elevated?: boolean
}

export function ClockWidget({ elevated }: ClockWidgetProps) {
  const { bigTime: timeDisplay, fullTime, date, dateLong } = useTime()
  const dateLabel = date.toUpperCase()
  const ampm = fullTime.split(' ').at(-1) ?? ''
  const dayFull = dateLong.split(/[ ,]/)[0]

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
      <div
        style={{
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.50)',
          fontWeight: 500,
        }}
      >
        {dateLabel}
      </div>

      {/* Big time */}
      <div
        style={{
          fontSize: '52px',
          fontWeight: 300,
          letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.96)',
          lineHeight: 0.88,
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'var(--font-display)',
        }}
      >
        {timeDisplay}
      </div>

      {/* AM/PM + Day */}
      <div
        style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.62)',
          letterSpacing: '-0.005em',
          fontWeight: 400,
        }}
      >
        {ampm} · {dayFull}
      </div>
    </div>
  )
}
