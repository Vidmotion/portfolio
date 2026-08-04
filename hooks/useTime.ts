import { useState, useEffect } from 'react'

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

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function fmtDateLong(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
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
  bigTime: '12:00',
  fullTime: '12:00 PM',
  date: 'Mon Jun 30',
  dateLong: 'Monday, June 30',
}

export function useTime(): TimeValues {
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
    date: fmtDate(now),
    dateLong: fmtDateLong(now),
  }
}
