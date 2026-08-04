import type { Wallpaper } from '@/types'

export const wallpapers: Array<{ id: Wallpaper; label: string }> = [
  { id: 'auto', label: 'Auto (time-based)' },
  { id: 'morning', label: 'Morning' },
  { id: 'afternoon', label: 'Afternoon' },
  { id: 'evening', label: 'Evening' },
  { id: 'night', label: 'Night' },
  { id: 'slate', label: 'Slate' },
  { id: 'mono', label: 'Mono' },
]
