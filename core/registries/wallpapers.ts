import type { Wallpaper } from '@/types'

/** Only these four public choices are exposed. The original personal photo is excluded. */
export const wallpapers = [
  {
    id: 'wallpaper2',
    src: '/images/wallpapers/2-desktop.webp',
    mobile: '/images/wallpapers/2-mobile.webp',
    avif: '/images/wallpapers/2-desktop.avif',
    mobileAvif: '/images/wallpapers/2-mobile.avif',
    thumbnail: '/images/wallpapers/2-thumb.webp',
    opacity: 0.42,
    accent: '#234d83',
    iconColor: '#234d83',
    rgb: '35,77,131',
    ink: '#152d49',
    wash: '232,242,252',
    position: 'center',
  },
  {
    id: 'wallpaper3',
    src: '/images/wallpapers/3-desktop.webp',
    mobile: '/images/wallpapers/3-mobile.webp',
    avif: '/images/wallpapers/3-desktop.avif',
    mobileAvif: '/images/wallpapers/3-mobile.avif',
    thumbnail: '/images/wallpapers/3-thumb.webp',
    opacity: 0.54,
    accent: '#263f91',
    iconColor: '#263f91',
    rgb: '38,63,145',
    ink: '#202c50',
    wash: '237,240,252',
    position: 'center',
  },
  {
    id: 'wallpaper4',
    src: '/images/wallpapers/4-desktop.webp',
    mobile: '/images/wallpapers/4-mobile.webp',
    avif: '/images/wallpapers/4-desktop.avif',
    mobileAvif: '/images/wallpapers/4-mobile.avif',
    thumbnail: '/images/wallpapers/4-thumb.webp',
    opacity: 0.46,
    accent: '#a6471a',
    iconColor: '#df6726',
    rgb: '166,71,26',
    ink: '#462e26',
    wash: '253,239,226',
    position: 'center',
  },
  {
    id: 'wallpaper5',
    src: '/images/wallpapers/5-desktop.webp',
    mobile: '/images/wallpapers/5-mobile.webp',
    avif: '/images/wallpapers/5-desktop.avif',
    mobileAvif: '/images/wallpapers/5-mobile.avif',
    thumbnail: '/images/wallpapers/5-thumb.webp',
    opacity: 0.5,
    accent: '#8e2927',
    iconColor: '#8e2927',
    rgb: '142,41,39',
    ink: '#422a2b',
    wash: '248,235,231',
    position: 'center',
  },
] as const satisfies ReadonlyArray<{
  id: Wallpaper
  src: string
  mobile: string
  avif: string
  mobileAvif: string
  thumbnail: string
  opacity: number
  accent: string
  iconColor: string
  rgb: string
  ink: string
  wash: string
  position: string
}>

export const DEFAULT_WALLPAPER: Wallpaper = 'wallpaper4'
export const isWallpaper = (id: unknown): id is Wallpaper => wallpapers.some((w) => w.id === id)
export const getWallpaper = (id: Wallpaper) =>
  wallpapers.find((w) => w.id === id) ?? wallpapers.find((w) => w.id === DEFAULT_WALLPAPER)!
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
