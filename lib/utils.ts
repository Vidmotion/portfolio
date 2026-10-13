import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CSSProperties } from 'react'
import type { Platform, ProjectCategory, WindowSizePreset, WindowSize } from '@/types'

// ─── Tailwind Class Merging ───────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ─── Platform Detection ───────────────────────────────────────────────────────

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1280) return 'tablet'
  return 'desktop'
}

// ─── Window Sizes ─────────────────────────────────────────────────────────────
// Source of truth: Claude/docs/DESIGN_FOUNDATIONS.md — Window Sizes

const WINDOW_SIZES: Record<WindowSizePreset, WindowSize> = {
  sm: { width: 480, height: 360 },
  md: { width: 680, height: 480 },
  lg: { width: 900, height: 600 },
  xl: { width: 1100, height: 720 },
}

export function getWindowSize(preset: WindowSizePreset): WindowSize {
  return WINDOW_SIZES[preset]
}

export function clampWindowPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  menuBarHeight = 28
): { x: number; y: number } {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900

  return {
    x: Math.max(0, Math.min(x, vw - width)),
    y: Math.max(menuBarHeight, Math.min(y, vh - height)),
  }
}

export function defaultWindowPosition(width: number, height: number): { x: number; y: number } {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900
  return {
    x: Math.round((vw - width) / 2),
    y: Math.round((vh - height) / 3),
  }
}

export const MIN_WINDOW_SIZE: WindowSize = { width: 380, height: 280 }

export function clampWindowSize(width: number, height: number, x: number, y: number): WindowSize {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900

  return {
    width: Math.max(MIN_WINDOW_SIZE.width, Math.min(width, vw - x)),
    height: Math.max(MIN_WINDOW_SIZE.height, Math.min(height, vh - y)),
  }
}

// ─── Project Utilities ────────────────────────────────────────────────────────

export const CATEGORY_GRADIENTS: Record<string, string> = {
  'film-making': 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
  digital: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
  'creative-direction': 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
}

export function categoryGradient(category: ProjectCategory | string): string {
  return CATEGORY_GRADIENTS[category] ?? 'linear-gradient(135deg, #ECECEC, #CCC)'
}

// macOS Sonoma dark widget material — shared by every desktop widget so glass
// treatment (blur, saturation, elevation) reads identically across all of them.
const WIDGET_GLASS_INSET_SHADOW = [
  // highlight superiore
  'inset 0 1px 0 rgba(255,255,255,.55)',

  // bordo inferiore
  'inset 0 -1px 0 rgba(255,255,255,.30)',

  // lato sinistro
  'inset 1px 0 0 rgba(255,255,255,.245)',

  // lato destro
  'inset -1px 0 0 rgba(255,255,255,.115)',
]
const WIDGET_GLASS_RESTING_SHADOW = ['0 12px 32px rgba(0,0,0,.34)', '0 30px 80px rgba(0,0,0,.42)']
const WIDGET_GLASS_ELEVATED_SHADOW = [
  '0 20px 48px rgba(0,0,0,0.40)',
  '0 44px 100px rgba(0,0,0,0.46)',
]

export const WIDGET_DARK_GLASS: CSSProperties = {
  background: 'rgba(32,32,34,.20)',
  backdropFilter: 'blur(25px) saturate(160%) brightness(.95)',
  WebkitBackdropFilter: 'blur(25px) saturate(160%) brightness(.92)',
  boxShadow: [...WIDGET_GLASS_INSET_SHADOW, ...WIDGET_GLASS_RESTING_SHADOW].join(', '),
}

/**
 * Same glass material as WIDGET_DARK_GLASS, with an optional elevated shadow for
 * drag state. Only the shadow changes — background/blur/opacity never do, so
 * dragging never visibly alters the material itself, only its perceived lift.
 */
export function widgetDarkGlass(elevated = false): CSSProperties {
  return {
    ...WIDGET_DARK_GLASS,
    boxShadow: [
      ...WIDGET_GLASS_INSET_SHADOW,
      ...(elevated ? WIDGET_GLASS_ELEVATED_SHADOW : WIDGET_GLASS_RESTING_SHADOW),
    ].join(', '),
  }
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function formatYear(year: number): string {
  return String(year)
}
