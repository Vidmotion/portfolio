import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Settings } from '@/types'

interface SettingsStore {
  settings: Settings

  setReducedMotion: (enabled: boolean) => void
  setHighContrast: (enabled: boolean) => void
}

const DEFAULT_SETTINGS: Settings = {
  accessibility: {
    reducedMotion: false,
    highContrast: false,
  },
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,

      setReducedMotion: (enabled) => {
        set((state) => ({
          settings: {
            ...state.settings,
            accessibility: { ...state.settings.accessibility, reducedMotion: enabled },
          },
        }))
      },

      setHighContrast: (enabled) => {
        set((state) => ({
          settings: {
            ...state.settings,
            accessibility: { ...state.settings.accessibility, highContrast: enabled },
          },
        }))
      },
    }),
    {
      name: 'portfolio-os-settings',
    }
  )
)
