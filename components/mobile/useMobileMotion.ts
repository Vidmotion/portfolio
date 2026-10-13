'use client'

import { useIsPresent, useReducedMotion } from 'framer-motion'
import { useSettingsStore } from '@/store/settingsStore'
import { useMobileStore } from '@/store/mobileStore'

const pageSpring = { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 } as const
const appSpring = { type: 'spring', stiffness: 380, damping: 34, mass: 0.85 } as const

export function useMobileMotion() {
  const systemReduced = useReducedMotion()
  const present = useIsPresent()
  const preference = useSettingsStore((state) => state.settings.accessibility.reducedMotion)
  const origin = useMobileStore((state) => state.launchOrigin)
  const reduced = Boolean(systemReduced || preference)
  const appTransition = reduced ? { duration: 0.12 } : appSpring
  return {
    reduced,
    present,
    pageSpring,
    appTransition,
    appEntrance: {
      initial: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.88, borderRadius: 28 },
      animate: { opacity: 1, scale: 1, borderRadius: 0 },
      exit: reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, borderRadius: 28 },
      transition: appTransition,
    },
    transformOrigin: origin ? `${origin.x}px ${origin.y}px` : '50% 50%',
  }
}
