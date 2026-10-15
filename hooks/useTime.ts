import { useState, useEffect } from 'react'
import { useLocaleStore } from '@/store/localeStore'

function fmtTime(d: Date, locale: string): string {
  return d.toLocaleTimeString(locale, {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
}

function fmtDate(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function fmtDateLong(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, {
    timeZone: 'Europe/Rome',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export interface TimeValues {
  /** "12:00" — hours:minutes, no AM/PM */
  bigTime: string
  /** Localized 24-hour time, shared by menu, widgets and lock screen. */
  fullTime: string
  /** "Mon, Jun 30" */
  date: string
  /** "Monday, June 30" */
  dateLong: string
}

const INITIAL: TimeValues = {
  bigTime: '—',
  fullTime: '—',
  date: '—',
  dateLong: '—',
}

export function useTime(): TimeValues {
  const locale = useLocaleStore((s) => s.locale) === 'it' ? 'it-IT' : 'en-GB'
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const id = setTimeout(() => setNow(new Date()), 0)
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => {
      clearTimeout(id)
      clearInterval(interval)
    }
  }, [])

  if (!now) return INITIAL

  return {
    bigTime: fmtTime(now, locale),
    fullTime: fmtTime(now, locale),
    date: fmtDate(now, locale),
    dateLong: fmtDateLong(now, locale),
  }
}
