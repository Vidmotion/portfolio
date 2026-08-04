'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type GlassVariant = 'standard' | 'heavy' | 'widget'

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
  radius?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'widget' | 'dock'
  shadow?: 'none' | 'widget' | 'window' | 'window-focused' | 'window-inactive' | 'menu'
}

const variantClass: Record<GlassVariant, string> = {
  standard: 'glass-standard',
  heavy: 'glass-heavy',
  widget: 'glass-widget',
}

const radiusVar: Record<NonNullable<GlassPanelProps['radius']>, string> = {
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  '3xl': 'var(--radius-3xl)',
  widget: 'var(--radius-widget)',
  dock: 'var(--radius-dock)',
}

const shadowVar: Record<NonNullable<GlassPanelProps['shadow']>, string> = {
  none: 'none',
  widget: 'var(--shadow-widget)',
  window: 'var(--shadow-window)',
  'window-focused': 'var(--shadow-window-focused)',
  'window-inactive': 'var(--shadow-window-inactive)',
  menu: 'var(--shadow-menu)',
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ variant = 'standard', radius = '2xl', shadow = 'window', className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(variantClass[variant], 'overflow-hidden', className)}
        style={{
          borderRadius: radiusVar[radius],
          boxShadow: shadowVar[shadow],
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'
