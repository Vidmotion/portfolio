import { useState, useEffect } from 'react'
import { useLocaleStore } from '@/store/localeStore'

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

function fmt12(d: Date): string {
  const h = d.getHours() % 12 || 12
  const m = pad(d.getMinutes())
  return `${h}:${m}`
}

function fmtFull(d: Date): string {
  const h = d.getHours() % 12 || 12
  const m = pad(d.getMinutes())
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM'
  return `${h}:${m} ${ampm}`
}

function fmtDate(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' })
}

function fmtDateLong(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })
}

export interface TimeValues {
  /** "12:00" — hours:minutes, no AM/PM */
  bigTime: string
  /** "12:00 AM" */
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
  const locale = useLocaleStore((s) => s.locale) === 'it' ? 'it-IT' : 'en-US'
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
    bigTime: fmt12(now),
    fullTime: fmtFull(now),
    date: fmtDate(now, locale),
    dateLong: fmtDateLong(now, locale),
  }
}
