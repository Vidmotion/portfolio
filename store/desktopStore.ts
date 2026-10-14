import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Wallpaper, Widget, WidgetType, WidgetSize, WidgetPosition } from '@/types'
import { generateId } from '@/lib/utils'

interface DesktopStore {
  wallpaper: Wallpaper
  widgets: Widget[]
  selectedFolderId: string | null
  selectedProjectId: string | null
  isDesktopLocked: boolean
  folderOffsets: Record<string, { x: number; y: number }>
  /** Drag offsets for Tablet's widget strip cards — mirrors folderOffsets exactly,
   *  kept separate because Tablet widgets are flow-positioned (delta offset from
   *  their strip slot), unlike Desktop's `widgets[].position` (absolute canvas coords). */
  tabletWidgetOffsets: Record<string, { x: number; y: number }>

  setWallpaper: (wallpaper: Wallpaper) => void
  addWidget: (type: WidgetType, size: WidgetSize, position: WidgetPosition) => string
  removeWidget: (id: string) => void
  moveWidget: (id: string, position: WidgetPosition) => void
  selectFolder: (id: string | null) => void
  selectProject: (id: string | null) => void
  setDesktopLocked: (locked: boolean) => void
  setFolderOffset: (id: string, offset: { x: number; y: number }) => void
  setTabletWidgetOffset: (id: string, offset: { x: number; y: number }) => void
  resetLayout: () => void
}

// Positions match the approved WidgetLayer LAYOUT
export const DEFAULT_WIDGETS: Widget[] = [
  { id: 'clock-1', type: 'clock', size: 'small', position: { x: 32, y: 60 } },
  { id: 'quote-1', type: 'quote', size: 'medium', position: { x: 32, y: 258 } },
  { id: 'spotify-1', type: 'spotify', size: 'medium', position: { x: 212, y: 60 } },
  { id: 'recent-projects-1', type: 'recent-projects', size: 'large', position: { x: 212, y: 255 } },
  { id: 'photos-1', type: 'photos', size: 'large', position: { x: 602, y: 60 } },
]

export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set) => ({
      wallpaper: 'morning',
      widgets: DEFAULT_WIDGETS,
      selectedFolderId: null,
      selectedProjectId: null,
      isDesktopLocked: false,
      folderOffsets: {},
      tabletWidgetOffsets: {},

      setWallpaper: (wallpaper) => set({ wallpaper }),

      addWidget: (type, size, position) => {
        const id = generateId('widget')
        set((state) => ({
          widgets: [...state.widgets, { id, type, size, position }],
        }))
        return id
      },

      removeWidget: (id) => {
        set((state) => ({ widgets: state.widgets.filter((w) => w.id !== id) }))
      },

      moveWidget: (id, position) => {
        set((state) => ({
          widgets: state.widgets.map((w) => (w.id === id ? { ...w, position } : w)),
        }))
      },

      selectFolder: (id) => set({ selectedFolderId: id }),
      selectProject: (id) => set({ selectedProjectId: id }),
      setDesktopLocked: (locked) => set({ isDesktopLocked: locked }),

      setFolderOffset: (id, offset) =>
        set((state) => ({ folderOffsets: { ...state.folderOffsets, [id]: offset } })),

      setTabletWidgetOffset: (id, offset) =>
        set((state) => ({ tabletWidgetOffsets: { ...state.tabletWidgetOffsets, [id]: offset } })),

      resetLayout: () =>
        set({ folderOffsets: {}, tabletWidgetOffsets: {}, widgets: DEFAULT_WIDGETS }),
    }),
    {
      name: 'portfolio-os-desktop',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as DesktopStore
        // Move the previous time-based default to Morning, preserving chosen themes and layout.
        return {
          ...state,
          wallpaper: !state.wallpaper || state.wallpaper === 'auto' ? 'morning' : state.wallpaper,
        }
      },
      partialize: (state) => ({
        wallpaper: state.wallpaper,
        widgets: state.widgets,
        folderOffsets: state.folderOffsets,
        tabletWidgetOffsets: state.tabletWidgetOffsets,
        isDesktopLocked: state.isDesktopLocked,
      }),
    }
  )
)
