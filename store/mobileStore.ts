import { create } from 'zustand'
import type { ProjectCategory } from '@/types'

export type MobileScreen = 'lock' | 'home' | 'app' | 'project' | 'utility'
export type MobileUtility = 'about' | 'photos' | 'settings' | 'contacts' | 'message'
export type MobileLaunchOrigin = { x: number; y: number }
export type MobileHomePage = 0 | 1 | 2

interface MobileStore {
  screen: MobileScreen
  activeCategory: ProjectCategory | null
  activeProjectId: string | null
  activeUtility: MobileUtility | null
  homePage: MobileHomePage
  projectReturnScreen: 'home' | 'app'
  todayScrollTop: number
  setTodayScrollTop: (top: number) => void
  launchOrigin: MobileLaunchOrigin | null
  setHomePage: (page: MobileHomePage) => void
  setLaunchOrigin: (origin: MobileLaunchOrigin) => void

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
  homePage: 1,
  projectReturnScreen: 'app',
  todayScrollTop: 0,
  setTodayScrollTop: (todayScrollTop) => set({ todayScrollTop }),
  launchOrigin: null,
  setHomePage: (homePage) => set({ homePage }),
  setLaunchOrigin: (launchOrigin) => set({ launchOrigin }),

  unlock: () => set({ screen: 'home' }),

  openApp: (category) =>
    set({ screen: 'app', activeCategory: category, activeProjectId: null, activeUtility: null }),

  openUtility: (utility) => set({ screen: 'utility', activeUtility: utility }),

  openProject: (projectId) =>
    set({
      screen: 'project',
      activeProjectId: projectId,
      projectReturnScreen: get().screen === 'home' ? 'home' : 'app',
    }),

  goBack: () => {
    const { screen } = get()
    if (screen === 'project') set({ screen: get().projectReturnScreen, activeProjectId: null })
    else if (screen === 'app') {
      if (get().activeCategory) set({ activeCategory: null })
      else set({ screen: 'home' })
    } else if (screen === 'utility') set({ screen: 'home', activeUtility: null })
    else if (screen === 'home') set({ screen: 'lock' })
  },

  lock: () =>
    set({ screen: 'lock', activeCategory: null, activeProjectId: null, activeUtility: null }),
}))
