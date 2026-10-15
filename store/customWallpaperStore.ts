import { create } from 'zustand'
import {
  readCustomWallpaper,
  saveCustomWallpaper,
  deleteCustomWallpaper,
  prepareCustomWallpaper,
} from '@/lib/custom-wallpaper'

let loading: Promise<void> | undefined
export const useCustomWallpaperStore = create<{
  url: string | null
  accent: string
  ready: boolean
  busy: boolean
  load: () => Promise<void>
  upload: (file: File) => Promise<void>
  remove: () => Promise<void>
}>((set, get) => ({
  url: null,
  accent: '#234d83',
  ready: false,
  busy: false,
  load: () => {
    loading ??= (async () => {
      try {
        const value = await readCustomWallpaper()
        if (value) set({ url: URL.createObjectURL(value.blob), accent: value.accent })
      } catch {
        /* Local storage can be unavailable in private browsing. */
      } finally {
        set({ ready: true })
      }
    })()
    return loading
  },
  upload: async (file) => {
    set({ busy: true })
    try {
      const value = await prepareCustomWallpaper(file)
      await saveCustomWallpaper(value)
      const old = get().url
      if (old) URL.revokeObjectURL(old)
      set({ url: URL.createObjectURL(value.blob), accent: value.accent, ready: true })
    } finally {
      set({ busy: false })
    }
  },
  remove: async () => {
    await deleteCustomWallpaper()
    const old = get().url
    if (old) URL.revokeObjectURL(old)
    set({ url: null })
  },
}))
