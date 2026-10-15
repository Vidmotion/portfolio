import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Wallpaper, Widget, WidgetType, WidgetSize, WidgetPosition } from '@/types'
import { DEFAULT_WALLPAPER, isWallpaper, isIconColor } from '@/core/registries/wallpapers'
import {
  DEFAULT_APPEARANCE,
  normalizeAppearance,
  type AppearancePreferences,
} from '@/lib/appearance'
import { generateId } from '@/lib/utils'

interface DesktopStore {
  wallpaper: Wallpaper
  iconColor: string
  appearance: AppearancePreferences
  customWallpaperEnabled: boolean
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
  setIconColor: (color: string) => void
  setAppearance: (value: Partial<AppearancePreferences>) => void
  setCustomWallpaperEnabled: (enabled: boolean) => void
  resetAppearance: () => void
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
      wallpaper: DEFAULT_WALLPAPER,
      iconColor: 'auto',
      appearance: DEFAULT_APPEARANCE,
      customWallpaperEnabled: false,
      widgets: DEFAULT_WIDGETS,
      selectedFolderId: null,
      selectedProjectId: null,
      isDesktopLocked: false,
      folderOffsets: {},
      tabletWidgetOffsets: {},

      setWallpaper: (wallpaper) => {
        if (isWallpaper(wallpaper)) set({ wallpaper, customWallpaperEnabled: false })
      },
      setIconColor: (iconColor) => {
        if (isIconColor(iconColor)) set({ iconColor })
      },

      setAppearance: (value) =>
        set((state) => ({ appearance: normalizeAppearance({ ...state.appearance, ...value }) })),
      setCustomWallpaperEnabled: (customWallpaperEnabled) => set({ customWallpaperEnabled }),
      resetAppearance: () =>
        set((state) => ({
          iconColor: 'auto',
          appearance: { ...DEFAULT_APPEARANCE, mode: state.appearance.mode },
        })),

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
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as DesktopStore
        // Retire the personal photograph and keep existing layouts.
        return {
          ...state,
          wallpaper: isWallpaper(state.wallpaper) ? state.wallpaper : DEFAULT_WALLPAPER,
          iconColor: isIconColor(state.iconColor) ? state.iconColor : 'auto',
          appearance: normalizeAppearance(state.appearance),
          customWallpaperEnabled: state.customWallpaperEnabled === true,
        }
      },
      partialize: (state) => ({
        wallpaper: state.wallpaper,
        iconColor: state.iconColor,
        appearance: state.appearance,
        customWallpaperEnabled: state.customWallpaperEnabled,
        widgets: state.widgets,
        folderOffsets: state.folderOffsets,
        tabletWidgetOffsets: state.tabletWidgetOffsets,
        isDesktopLocked: state.isDesktopLocked,
      }),
    }
  )
)
