'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Laptop, Tablet, Smartphone } from 'lucide-react'
import type { Platform } from '@/types'
import { useLocaleStore } from '@/store/localeStore'
import styles from './BootScreen.module.css'

export function BootScreen({
  onComplete,
  ready = false,
  platform,
}: {
  onComplete: () => void
  ready?: boolean
  platform: Platform | null
}) {
  const began = useRef(0),
    it = useLocaleStore((s) => s.locale) === 'it'
  useEffect(() => {
    began.current = performance.now()
  }, [])
  useEffect(() => {
    if (!ready) return
    const timer = setTimeout(onComplete, Math.max(0, 500 - (performance.now() - began.current)))
    return () => clearTimeout(timer)
  }, [ready, onComplete])
  const device = platform === 'mobile' ? 'iPhone' : platform === 'tablet' ? 'iPad' : 'MacBook'
  const Device = platform === 'mobile' ? Smartphone : platform === 'tablet' ? Tablet : Laptop
  return (
    <motion.div
      className={styles.boot}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      role="status"
      aria-label="Loading Portfolio OS"
      aria-live="polite"
    >
      <div className={styles.scene} aria-hidden>
        <div className={styles.halo} />
        <div className={styles.orbit} />
        <div className={styles.innerOrbit} />
        <div className={styles.device}>
          <Device size={76} strokeWidth={1.25} />
          <span className={styles.spark} />
        </div>
      </div>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>
          {it ? 'Uno spazio creativo, tutto da esplorare' : 'A creative space to explore'}
        </span>
        <h1>
          {it
            ? device === 'iPhone'
              ? `L’iPhone di Carlo`
              : device === 'iPad'
                ? `L’iPad di Carlo`
                : `Il MacBook di Carlo`
            : `Carlo’s ${device}`}
        </h1>
        <div className={styles.status}>
          <span className={styles.dots} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span>
            {ready
              ? it
                ? 'Benvenuto.'
                : 'Welcome in.'
              : it
                ? 'Preparo il tuo spazio…'
                : 'Preparing your workspace…'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
