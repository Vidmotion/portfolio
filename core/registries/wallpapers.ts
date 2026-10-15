import type { Wallpaper } from '@/types'

/** Only these four public choices are exposed. The original personal photo is excluded. */
export const wallpapers = [
  {
    id: 'wallpaper2',
    src: '/wallpaper2.jpeg',
    accent: '#234d83',
    rgb: '35,77,131',
    ink: '#152d49',
    wash: '232,242,252',
    position: 'center',
  },
  {
    id: 'wallpaper3',
    src: '/wallpaper3.jpeg',
    accent: '#263f91',
    rgb: '38,63,145',
    ink: '#202c50',
    wash: '237,240,252',
    position: 'center',
  },
  {
    id: 'wallpaper4',
    src: '/wallpaper4.jpeg',
    accent: '#a6471a',
    rgb: '166,71,26',
    ink: '#462e26',
    wash: '253,239,226',
    position: 'center',
  },
  {
    id: 'wallpaper5',
    src: '/wallpaper5.jpeg',
    accent: '#8e2927',
    rgb: '142,41,39',
    ink: '#422a2b',
    wash: '248,235,231',
    position: 'center',
  },
] as const satisfies ReadonlyArray<{
  id: Wallpaper
  src: string
  accent: string
  rgb: string
  ink: string
  wash: string
  position: string
}>

export const DEFAULT_WALLPAPER: Wallpaper = 'wallpaper2'
export const isWallpaper = (id: unknown): id is Wallpaper => wallpapers.some((w) => w.id === id)
export const getWallpaper = (id: Wallpaper) => wallpapers.find((w) => w.id === id) ?? wallpapers[0]
export const iconColors = [
  '#234d83',
  '#383e49',
  '#f0f3fa',
  '#72618f',
  '#a6471a',
  '#8e2927',
] as const
export const isIconColor = (color: unknown): color is string =>
  color === 'auto' || (typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color))
