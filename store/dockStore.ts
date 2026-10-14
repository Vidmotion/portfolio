import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ApplicationId } from '@/core/registries/apps'
import { desktopDock } from '@/core/layouts/desktopDock'

interface DockStore {
  runningIds: ApplicationId[]
  pinnedIds: ApplicationId[]
  magnificationEnabled: boolean

  setRunning: (id: ApplicationId, isRunning: boolean) => void
  pinApp: (id: ApplicationId) => void
  unpinApp: (id: ApplicationId) => void
  setMagnification: (enabled: boolean) => void
}

export const useDockStore = create<DockStore>()(
  persist(
    (set) => ({
      runningIds: [],
      pinnedIds: [...desktopDock],
      magnificationEnabled: true,

      setRunning: (id, isRunning) => {
        set((state) => ({
          runningIds: isRunning
            ? state.runningIds.includes(id)
              ? state.runningIds
              : [...state.runningIds, id]
            : state.runningIds.filter((x) => x !== id),
        }))
      },

      pinApp: (id) => {
        set((state) => ({
          pinnedIds: state.pinnedIds.includes(id) ? state.pinnedIds : [...state.pinnedIds, id],
        }))
      },

      unpinApp: (id) => {
        set((state) => ({
          pinnedIds: state.pinnedIds.filter((x) => x !== id),
        }))
      },

      setMagnification: (enabled) => set({ magnificationEnabled: enabled }),
    }),
    {
      name: 'portfolio-os-dock',
      version: 1,
      migrate: (persistedState): Pick<DockStore, 'pinnedIds' | 'magnificationEnabled'> => {
        const state = persistedState as DockStore
        const pinnedIds = state.pinnedIds ?? [...desktopDock]
        return {
          ...state,
          pinnedIds: pinnedIds.includes('linkedin') ? pinnedIds : [...pinnedIds, 'linkedin'],
        }
      },
      partialize: (state) => ({
        // runningIds is session-transient — never persist a stale "running" dot.
        pinnedIds: state.pinnedIds,
        magnificationEnabled: state.magnificationEnabled,
      }),
    }
  )
)
