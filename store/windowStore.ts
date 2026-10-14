import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OSWindow, WindowApp, WindowPosition, WindowSize, WindowSizePreset } from '@/types'
import {
  generateId,
  getWindowSize,
  getOsMenuBarHeight,
  defaultWindowPosition,
  clampWindowPosition,
  clampWindowSize,
} from '@/lib/utils'
import { apps } from '@/core/registries/apps'

/** Apps that only ever have one open instance — reopening focuses the existing window.
 *  Derived from the Application registry: every app with a window (`app` field set). */
const SINGLETON_APPS: WindowApp[] = apps.filter((a) => a.app).map((a) => a.app!)

function focusRemaining(windows: OSWindow[]): OSWindow[] {
  if (windows.some((win) => win.state !== 'minimized' && win.isFocused)) return windows
  const next = windows
    .filter((win) => win.state !== 'minimized')
    .sort((a, b) => b.zIndex - a.zIndex)[0]
  return windows.map((win) => ({ ...win, isFocused: win.id === next?.id }))
}

interface WindowStore {
  windows: OSWindow[]
  highestZIndex: number

  openWindow: (
    app: WindowApp,
    title?: string,
    sizePreset?: WindowSizePreset,
    payload?: Record<string, unknown>
  ) => string
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  moveWindow: (id: string, position: WindowPosition) => void
  resizeWindow: (id: string, size: WindowSize) => void
  closeAllWindows: () => void
  fitToViewport: () => void
  getFocusedWindow: () => OSWindow | undefined
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      highestZIndex: 30,

      openWindow: (app, title, sizePreset, payload) => {
        // Project windows are instance-driven — title/size have no canonical
        // source and must be provided by the caller. Application windows derive
        // both from the registry whenever the caller omits them.
        const appDef = apps.find((a) => a.app === app)
        const resolvedTitle = title ?? appDef?.name ?? app
        const resolvedSizePreset = sizePreset ?? appDef?.defaultWindowSize ?? 'md'

        const existing = get().windows.find((w) =>
          app === 'project'
            ? w.app === 'project' && w.payload?.projectId === payload?.projectId
            : SINGLETON_APPS.includes(app) && w.app === app
        )

        if (existing) {
          set((state) => ({
            windows: state.windows.map((w) =>
              w.id === existing.id
                ? {
                    ...w,
                    title: resolvedTitle,
                    // A relaunch with no payload (e.g. clicking the Dock icon of an
                    // already-open app) should just bring it forward, not reset its state.
                    payload: payload !== undefined ? payload : w.payload,
                    state: w.state === 'minimized' ? (w.restoreState ?? 'open') : w.state,
                  }
                : w
            ),
          }))
          get().focusWindow(existing.id)
          return existing.id
        }

        const id = generateId('win')
        // Clamp to the actual viewport so a window opened on a narrower screen
        // (tablet/mobile) never spawns larger than the space it opens into —
        // on a real desktop viewport this is a no-op since the presets already fit.
        const preset = getWindowSize(resolvedSizePreset)
        const size = clampWindowSize(preset.width, preset.height, 0, getOsMenuBarHeight())
        const rawPosition = defaultWindowPosition(size.width, size.height)
        const position = clampWindowPosition(rawPosition.x, rawPosition.y, size.width, size.height)
        const { highestZIndex, windows } = get()
        const nextZ = highestZIndex + 1

        const newWindow: OSWindow = {
          id,
          app,
          title: resolvedTitle,
          state: 'open',
          position,
          size,
          zIndex: nextZ,
          isFocused: true,
          payload,
        }

        set({
          windows: [...windows.map((w) => ({ ...w, isFocused: false })), newWindow],
          highestZIndex: nextZ,
        })

        return id
      },

      closeWindow: (id) => {
        set((state) => ({
          windows: focusRemaining(state.windows.filter((w) => w.id !== id)),
        }))
      },

      focusWindow: (id) => {
        set((state) => {
          const nextZ = state.highestZIndex + 1
          return {
            highestZIndex: nextZ,
            windows: state.windows.map((w) =>
              w.id === id ? { ...w, isFocused: true, zIndex: nextZ } : { ...w, isFocused: false }
            ),
          }
        })
      },

      minimizeWindow: (id) => {
        set((state) => ({
          windows: focusRemaining(
            state.windows.map((w) =>
              w.id === id
                ? {
                    ...w,
                    restoreState:
                      w.state === 'maximized' ? ('maximized' as const) : ('open' as const),
                    state: 'minimized' as const,
                    isFocused: false,
                  }
                : w
            )
          ),
        }))
      },

      restoreWindow: (id) => {
        const { focusWindow } = get()
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, state: w.restoreState ?? ('open' as const) } : w
          ),
        }))
        focusWindow(id)
      },

      /** Green button — toggles between maximized and its prior geometry, like macOS zoom. */
      maximizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? {
                  ...w,
                  state: w.state === 'maximized' ? ('open' as const) : ('maximized' as const),
                }
              : w
          ),
        }))
        get().focusWindow(id)
      },

      moveWindow: (id, position) => {
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
        }))
      },

      resizeWindow: (id, size) => {
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
        }))
      },

      closeAllWindows: () => set({ windows: [] }),

      fitToViewport: () => {
        set((state) => {
          let changed = false
          const windows = state.windows.map((win) => {
            const size = clampWindowSize(win.size.width, win.size.height, 0, getOsMenuBarHeight())
            const position = clampWindowPosition(
              win.position.x,
              win.position.y,
              size.width,
              size.height
            )
            if (
              size.width === win.size.width &&
              size.height === win.size.height &&
              position.x === win.position.x &&
              position.y === win.position.y
            )
              return win
            changed = true
            return { ...win, size, position }
          })
          return changed ? { windows } : state
        })
      },

      getFocusedWindow: () => get().windows.find((w) => w.isFocused),
    }),
    {
      name: 'portfolio-os-windows',
      partialize: (state) => ({ windows: state.windows, highestZIndex: state.highestZIndex }),
    }
  )
)
