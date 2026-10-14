'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { duration } from '@/lib/motion'
import { identity } from '@/core/registries/identity'

interface BootScreenProps {
  onComplete: () => void
  ready?: boolean
}

const LOGO_HOLD = 500
const PROGRESS_DURATION = 800
const FINAL_HOLD = 300

export function BootScreen({ onComplete, ready = true }: BootScreenProps) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const readyRef = useRef(ready)
  useEffect(() => {
    readyRef.current = ready
  }, [ready])

  useEffect(() => {
    const startTime = Date.now()
    let frame = 0
    let completionTimer: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      const elapsed = Date.now() - startTime

      if (elapsed < LOGO_HOLD) {
        setProgress(0)
        frame = requestAnimationFrame(tick)
        return
      }

      const progressElapsed = elapsed - LOGO_HOLD
      const p = Math.min(progressElapsed / PROGRESS_DURATION, 1)
      setProgress(p)

      if (elapsed < LOGO_HOLD + PROGRESS_DURATION + FINAL_HOLD || !readyRef.current) {
        frame = requestAnimationFrame(tick)
      } else {
        setExiting(true)
        completionTimer = setTimeout(onComplete, duration.window * 1000)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(completionTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.window }}
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            background: '#0a0a0b',
            zIndex: 200,
            gap: '64px',
            fontFamily: 'var(--font-text)',
          }}
          aria-label={`Loading ${identity.productName}`}
          role="status"
        >
          {/* Logo + wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '26px' }}
          >
            {/* Glowing circle logo */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 0 24px 4px rgba(255,255,255,0.35)',
                }}
              />
            </div>

            {/* Wordmark */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  color: '#f4f4f5',
                  fontSize: '15px',
                  fontWeight: '500',
                  letterSpacing: '0.02em',
                }}
              >
                {identity.productName}
              </div>
              <div
                style={{
                  color: '#5e5e63',
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                {identity.name}
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              width: '180px',
              height: '3px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              style={{
                height: '100%',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.85)',
                width: `${progress * 100}%`,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
