export type AppearanceMode = 'light' | 'dark'
export interface AppearancePreferences {
  mode: AppearanceMode
  surfaceColor: string
  textColor: string
  surfaceOpacity: number | null
  iconOpacity: number
  wallpaperOpacity: number
}
export const DEFAULT_APPEARANCE: AppearancePreferences = {
  mode: 'light',
  surfaceColor: 'auto',
  textColor: 'auto',
  surfaceOpacity: null,
  iconOpacity: 1,
  wallpaperOpacity: 1,
}
export const isHex = (value: unknown): value is string =>
  typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)
export const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
export const rgba = (hex: string, opacity: number) => `rgba(${rgb(hex).join(',')},${opacity})`
export const mixWithWhite = (hex: string, weight: number) =>
  '#' +
  rgb(hex)
    .map((x) =>
      Math.round(x + (255 - x) * weight)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')
export function colorContrast(first: string, second: string) {
  const luminance = (hex: string) =>
    rgb(hex)
      .map((x) => x / 255)
      .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
      .reduce((total, x, index) => total + x * [0.2126, 0.7152, 0.0722][index], 0)
  const a = luminance(first),
    b = luminance(second)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}
export function normalizeAppearance(
  input: Partial<AppearancePreferences> = {}
): AppearancePreferences {
  const bounded = (n: unknown, min: number, fallback: number) =>
    typeof n === 'number' && Number.isFinite(n) ? Math.max(min, Math.min(1, n)) : fallback
  return {
    mode: input.mode === 'dark' ? 'dark' : 'light',
    surfaceColor: isHex(input.surfaceColor) ? input.surfaceColor : 'auto',
    textColor: isHex(input.textColor) ? input.textColor : 'auto',
    surfaceOpacity:
      typeof input.surfaceOpacity === 'number' ? bounded(input.surfaceOpacity, 0, 0.5) : null,
    iconOpacity: bounded(input.iconOpacity, 0.25, 1),
    wallpaperOpacity: bounded(input.wallpaperOpacity, 0.2, 1),
  }
}
