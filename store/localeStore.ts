import { create } from 'zustand'
import type { Locale } from '@/types'

interface LocaleStore {
  locale: Locale
  setLocale: (locale: Locale) => void
}

// A fresh landing is always English; language changes keep the current UI state.
export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
}))
