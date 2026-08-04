import { create } from 'zustand'

interface QuickLookStore {
  isOpen: boolean
  projectId: string | null
  open: (projectId: string) => void
  close: () => void
}

export const useQuickLookStore = create<QuickLookStore>((set) => ({
  isOpen: false,
  projectId: null,
  open: (projectId) => set({ isOpen: true, projectId }),
  close: () => set({ isOpen: false, projectId: null }),
}))
