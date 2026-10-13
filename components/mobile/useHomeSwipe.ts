'use client'

import { useLayoutEffect, useRef, type PointerEvent, type MouseEvent } from 'react'
import { animate, type MotionValue } from 'framer-motion'
import type { MobileHomePage } from '@/store/mobileStore'

type Gesture = {
  id: number
  axis: 'pending' | 'x' | 'y'
  startX: number
  startY: number
  origin: number
  page: MobileHomePage
  samples: { x: number; time: number }[]
}
const spring = { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 } as const

/** Only a clearly horizontal gesture owns the carousel. Vertical touch stays native. */
export function useHomeSwipe({
  x,
  width,
  page,
  reduced,
  navigate,
}: {
  x: MotionValue<number>
  width: number
  page: MobileHomePage
  reduced: boolean
  navigate: (page: MobileHomePage) => void
}) {
  const gesture = useRef<Gesture | null>(null)
  const dragging = useRef(false)
  const suppressClick = useRef(false)
  useLayoutEffect(() => {
    gesture.current = null
    dragging.current = false
  }, [width])

  const snap = (target: MobileHomePage) =>
    animate(x, -target * width, reduced ? { duration: 0 } : spring)
  const finish = (event: PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const current = gesture.current
    if (!current || current.id !== event.pointerId) return
    gesture.current = null
    dragging.current = false
    if (current.axis !== 'x') return
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
    if (cancelled) {
      snap(current.page)
      return
    }
    const samples = [...current.samples, { x: event.clientX, time: event.timeStamp }].filter(
      (sample) => event.timeStamp - sample.time <= 120
    )
    const first = samples[0]
    const velocity =
      first && event.timeStamp > first.time
        ? ((event.clientX - first.x) / (event.timeStamp - first.time)) * 1000
        : 0
    const distance = event.clientX - current.startX
    const direction =
      Math.abs(velocity) > 450
        ? velocity < 0
          ? 1
          : -1
        : Math.abs(distance) > width * 0.16
          ? distance < 0
            ? 1
            : -1
          : 0
    const next = Math.max(0, Math.min(2, current.page + direction)) as MobileHomePage
    navigate(next)
    if (next === current.page) snap(next)
  }
  return {
    dragging,
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      if (!suppressClick.current) return
      event.preventDefault()
      event.stopPropagation()
    },
    handlers: {
      onPointerDown(event: PointerEvent<HTMLDivElement>) {
        if (!event.isPrimary || event.button !== 0 || !width) return
        suppressClick.current = false
        dragging.current = false
        gesture.current = {
          id: event.pointerId,
          axis: 'pending',
          startX: event.clientX,
          startY: event.clientY,
          origin: x.get(),
          page,
          samples: [{ x: event.clientX, time: event.timeStamp }],
        }
      },
      onPointerMove(event: PointerEvent<HTMLDivElement>) {
        const current = gesture.current
        if (!current || current.id !== event.pointerId || current.axis === 'y') return
        const dx = event.clientX - current.startX
        const dy = event.clientY - current.startY
        if (current.axis === 'pending') {
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 12) return
          if (Math.abs(dy) > Math.abs(dx) * 1.2) {
            current.axis = 'y'
            return
          }
          if (Math.abs(dx) <= Math.abs(dy) * 1.2) return
          current.axis = 'x'
          suppressClick.current = true
          dragging.current = true
          x.stop()
          // Capture only after the child has cancelled its long-press timer.
          event.currentTarget.setPointerCapture(event.pointerId)
        }
        current.samples.push({ x: event.clientX, time: event.timeStamp })
        current.samples = current.samples.filter((sample) => event.timeStamp - sample.time <= 120)
        const target = current.origin + dx
        const left = -width * 2
        const resistance = reduced ? 0 : 0.18
        x.set(
          target > 0
            ? target * resistance
            : target < left
              ? left + (target - left) * resistance
              : target
        )
      },
      onPointerUp: (event: PointerEvent<HTMLDivElement>) => finish(event, false),
      onPointerCancel: (event: PointerEvent<HTMLDivElement>) => finish(event, true),
      onLostPointerCapture(event: PointerEvent<HTMLDivElement>) {
        // Taking capture from a touched child bubbles its own lost event here.
        // Only losing the track's capture cancels the horizontal gesture.
        if (event.target === event.currentTarget) finish(event, true)
      },
    },
  }
}
