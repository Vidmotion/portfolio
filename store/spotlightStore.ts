import { create } from 'zustand'

interface SpotlightStore {
  isOpen: boolean
  query: string
  open: () => void
  close: () => void
  setQuery: (query: string) => void
}

export const useSpotlightStore = create<SpotlightStore>((set) => ({
  isOpen: false,
  query: '',
  open: () => set({ isOpen: true, query: '' }),
  close: () => set({ isOpen: false, query: '' }),
  setQuery: (query) => set({ query }),
}))
