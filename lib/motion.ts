import type { SpringOptions } from 'framer-motion'

// ─── Spring Presets ───────────────────────────────────────────────────────────
// Source of truth: Claude/docs/MOTION.md

export const springs = {
  default: { type: 'spring', stiffness: 220, damping: 28, mass: 1 } satisfies SpringOptions & {
    type: 'spring'
  },
  largeWindow: { type: 'spring', stiffness: 170, damping: 24 } satisfies SpringOptions & {
    type: 'spring'
  },
  dock: { type: 'spring', stiffness: 300, damping: 20 } satisfies SpringOptions & {
    type: 'spring'
  },
  cursor: { type: 'spring', stiffness: 420, damping: 32 } satisfies SpringOptions & {
    type: 'spring'
  },
} as const

// ─── Duration Tokens (seconds) ────────────────────────────────────────────────

export const duration = {
  micro: 0.12,
  hover: 0.18,
  selection: 0.22,
  open: 0.35,
  close: 0.28,
  window: 0.45,
  page: 0.65,
  modal: 0.32,
  dockHover: 0.18,
  widgetTransition: 0.35,
} as const

// ─── Easing Presets ───────────────────────────────────────────────────────────

export const ease = {
  default: [0, 0, 0.2, 1] as [number, number, number, number],
  opening: [0.16, 1, 0.3, 1] as [number, number, number, number],
  closing: [0.4, 0, 0.6, 1] as [number, number, number, number],
} as const

// ─── Stagger ──────────────────────────────────────────────────────────────────
// Per docs: 20ms per item, 300ms total cap.
// Formula: Math.min(20, 300 / items.length)

export const staggerDelay = (count: number): number => Math.min(0.02, 0.3 / count)

// ─── Gallery Fade ─────────────────────────────────────────────────────────────
// Shared opacity progression for secondary gallery images (used across Desktop,
// Tablet and Mobile project views so the fade reads identically everywhere).

export const galleryFade = (index: number): number => 0.75 + index * 0.1

// ─── Window Variants ──────────────────────────────────────────────────────────

// No `y` here on purpose: OSWindow binds `style.y` to a per-window MotionValue
// (drag position). If a variant also targets `y`, Framer Motion's animation
// takes over that same motion value and drives every window to y:0 on open —
// position and the open/close entrance animation must stay on separate axes.
export const windowVariants = {
  closed: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
  },
  open: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      ...springs.largeWindow,
      opacity: { duration: duration.open, ease: ease.opening },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
    transition: {
      duration: duration.close,
      ease: ease.closing,
    },
  },
} as const

// ─── Fade Variants ────────────────────────────────────────────────────────────

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const

// ─── Shimmer (skeleton) ───────────────────────────────────────────────────────

export const shimmer = {
  initial: { backgroundPosition: '200% 0' },
  animate: {
    backgroundPosition: '-200% 0',
    transition: { duration: 1.4, ease: 'linear', repeat: Infinity },
  },
} as const
