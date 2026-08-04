import { create } from 'zustand'
import type { ProjectCategory } from '@/types'

export type MobileScreen = 'lock' | 'home' | 'app' | 'project'

interface MobileStore {
  screen: MobileScreen
  activeCategory: ProjectCategory | null
  activeProjectId: string | null

  unlock: () => void
  openApp: (category: ProjectCategory) => void
  openProject: (projectId: string) => void
  goBack: () => void
  lock: () => void
}

export const useMobileStore = create<MobileStore>((set, get) => ({
  screen: 'lock',
  activeCategory: null,
  activeProjectId: null,

  unlock: () => set({ screen: 'home' }),

  openApp: (category) => set({ screen: 'app', activeCategory: category }),

  openProject: (projectId) => set({ screen: 'project', activeProjectId: projectId }),

  goBack: () => {
    const { screen } = get()
    if (screen === 'project') set({ screen: 'app', activeProjectId: null })
    else if (screen === 'app') set({ screen: 'home', activeCategory: null })
    else if (screen === 'home') set({ screen: 'lock' })
  },

  lock: () => set({ screen: 'lock', activeCategory: null, activeProjectId: null }),
}))
