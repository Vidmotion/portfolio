'use client'
import { useEffect, useState } from 'react'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import styles from './MobileHomeScreen.module.css'

export function StudioClock() {
  const locale = useLocaleStore((s) => s.locale)
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const first = setTimeout(() => setNow(new Date()), 0)
    const interval = setInterval(() => setNow(new Date()), 30000)
    return () => {
      clearTimeout(first)
      clearInterval(interval)
    }
  }, [])
  const parts = now
    ? new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(now)
    : []
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
  const time = now ? `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}` : '—'
  const date = now
    ? new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-US', {
        timeZone: 'Europe/Rome',
        month: 'short',
        day: 'numeric',
      }).format(now)
    : '—'
  return (
    <div
      className={styles.clockWidget}
      role="img"
      aria-label={`${uiText[locale].studioTime}: ${locale === 'it' ? 'Milano' : 'Milan'}, ${time}`}
    >
      <svg className={styles.clockDial} viewBox="0 0 120 120" aria-hidden>
        {Array.from({ length: 60 }, (_, index) => {
          const angle = (index * Math.PI) / 30 - Math.PI / 2,
            cos = Math.cos(angle),
            sin = Math.sin(angle)
          const radius =
            51 / Math.pow(Math.pow(Math.abs(cos), 4) + Math.pow(Math.abs(sin), 4), 0.25)
          const length = index % 5 === 0 ? 4 : 2.2
          return (
            <line
              key={index}
              x1={60 + cos * radius}
              y1={60 + sin * radius}
              x2={60 + cos * (radius - length)}
              y2={60 + sin * (radius - length)}
              stroke="#f5f5f7"
              strokeWidth={index % 5 === 0 ? 1.4 : 1}
              opacity={index % 5 === 0 ? 0.8 : 0.35}
              strokeLinecap="round"
            />
          )
        })}
      </svg>
      <span className={styles.clockHeading}>{locale === 'it' ? 'MILANO' : 'MILAN'}</span>
      <strong className={styles.clockTime}>{time}</strong>
      <span className={styles.clockDate}>{date}</span>
    </div>
  )
}
