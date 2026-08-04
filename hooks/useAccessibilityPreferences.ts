import { useEffect } from 'react'
import { useSettingsStore } from '@/store/settingsStore'

/** Reflects accessibility settings onto <html> as data attributes consumed by globals.css. */
export function useAccessibilityPreferences() {
  const { reducedMotion, highContrast } = useSettingsStore((s) => s.settings.accessibility)

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reducedMotion)
    return () => {
      delete document.documentElement.dataset.reducedMotion
    }
  }, [reducedMotion])

  useEffect(() => {
    document.documentElement.dataset.highContrast = String(highContrast)
    return () => {
      delete document.documentElement.dataset.highContrast
    }
  }, [highContrast])
}
