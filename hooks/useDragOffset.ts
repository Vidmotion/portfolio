'use client'

import { useEffect, useState } from 'react'
import { useMotionValue } from 'framer-motion'

interface Offset {
  x: number
  y: number
}

interface UseDragOffsetOptions {
  offset: Offset
  onDragEnd: (offset: Offset) => void
}

/**
 * Shared position/offset bookkeeping behind every draggable desktop element
 * (folders, widgets). Extracted so Tablet can reuse the exact same mechanics
 * instead of re-implementing them — spring/scale/constraint tuning stays with
 * each caller since those legitimately differ per element type.
 */
export function useDragOffset({ offset, onDragEnd }: UseDragOffsetOptions) {
  const x = useMotionValue(offset.x)
  const y = useMotionValue(offset.y)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => { x.set(offset.x) }, [offset.x, x])
  useEffect(() => { y.set(offset.y) }, [offset.y, y])

  const onDragStart = () => setIsDragging(true)
  const onDragEndHandler = () => {
    setIsDragging(false)
    onDragEnd({ x: x.get(), y: y.get() })
  }

  return { x, y, isDragging, onDragStart, onDragEnd: onDragEndHandler }
}
