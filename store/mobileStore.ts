import { create } from 'zustand'
import type { ProjectCategory } from '@/types'

export type MobileScreen = 'lock' | 'home' | 'app' | 'project' | 'utility'
export type MobileUtility = 'about' | 'photos' | 'settings' | 'contacts'

interface MobileStore {
  screen: MobileScreen
  activeCategory: ProjectCategory | null
  activeProjectId: string | null
  activeUtility: MobileUtility | null

  unlock: () => void
  openApp: (category: ProjectCategory | null) => void
  openUtility: (utility: MobileUtility) => void
  openProject: (projectId: string) => void
  goBack: () => void
  lock: () => void
}

export const useMobileStore = create<MobileStore>((set, get) => ({
  screen: 'lock',
  activeCategory: null,
  activeProjectId: null,
  activeUtility: null,

  unlock: () => set({ screen: 'home' }),

  openApp: (category) =>
    set({ screen: 'app', activeCategory: category, activeProjectId: null, activeUtility: null }),

  openUtility: (utility) => set({ screen: 'utility', activeUtility: utility }),

  openProject: (projectId) => set({ screen: 'project', activeProjectId: projectId }),

  goBack: () => {
    const { screen } = get()
    if (screen === 'project') set({ screen: 'app', activeProjectId: null })
    else if (screen === 'app') {
      if (get().activeCategory) set({ activeCategory: null })
      else set({ screen: 'home' })
    } else if (screen === 'utility') set({ screen: 'home', activeUtility: null })
    else if (screen === 'home') set({ screen: 'lock' })
  },

  lock: () =>
    set({ screen: 'lock', activeCategory: null, activeProjectId: null, activeUtility: null }),
}))
