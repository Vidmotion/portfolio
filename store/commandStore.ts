import { create } from 'zustand'

interface CommandStore {
  isOpen: boolean
  query: string
  open: () => void
  close: () => void
  setQuery: (query: string) => void
}

export const useCommandStore = create<CommandStore>((set) => ({
  isOpen: false,
  query: '',
  open: () => set({ isOpen: true, query: '' }),
  close: () => set({ isOpen: false, query: '' }),
  setQuery: (query) => set({ query }),
}))
