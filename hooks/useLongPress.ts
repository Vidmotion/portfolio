'use client'

import { useEffect, useRef, type PointerEvent, type MouseEvent } from 'react'

/** A hold is cancelled by movement, so swiping never opens a quick-action menu. */
export function useLongPress(action: (element: HTMLElement) => void) {
  const latest = useRef(action)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const start = useRef({ x: 0, y: 0 })
  const consumed = useRef(false)
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }
  useEffect(() => {
    latest.current = action
  }, [action])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )
  return {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (event.button !== 0) return
      cancel()
      consumed.current = false
      start.current = { x: event.clientX, y: event.clientY }
      const element = event.currentTarget
      timer.current = setTimeout(() => {
        consumed.current = true
        latest.current(element)
        timer.current = null
      }, 580)
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      if (Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > 10)
        cancel()
    },
    onPointerUp: cancel,
    onPointerCancel: cancel,
    onClickCapture(event: MouseEvent<HTMLElement>) {
      if (!consumed.current) return
      consumed.current = false
      event.preventDefault()
      event.stopPropagation()
    },
    onContextMenu(event: MouseEvent<HTMLElement>) {
      event.preventDefault()
      cancel()
      if (!consumed.current) latest.current(event.currentTarget)
      consumed.current = true
    },
  }
}
