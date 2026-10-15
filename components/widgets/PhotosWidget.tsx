'use client'

import { useLocaleStore } from '@/store/localeStore'

interface PhotosWidgetProps {
  elevated?: boolean
}

const RESTING_SHADOW = [
  'inset 0 0 0 0.5px rgba(255,255,255,0.12)',
  '0 0 0 0.5px rgba(0,0,0,0.08)',
  '0 2px 6px rgba(0,0,0,0.08)',
  '0 12px 32px rgba(0,0,0,0.18)',
  '0 28px 56px rgba(0,0,0,0.12)',
]

const ELEVATED_SHADOW = [
  'inset 0 0 0 0.5px rgba(255,255,255,0.12)',
  '0 0 0 0.5px rgba(0,0,0,0.08)',
  '0 20px 48px rgba(0,0,0,0.30)',
  '0 44px 96px rgba(0,0,0,0.24)',
]

// Photos widget — full-bleed photo with metadata overlay.
// Same corner radius/squircle/shadow language as every other widget; the
// photo itself (not a flat glass fill) is the material here, matching how
// macOS's own Photos widget shows the picture rather than a tinted card.
export function PhotosWidget({ elevated }: PhotosWidgetProps) {
  const it = useLocaleStore((s) => s.locale) === 'it'
  return (
    <div
      className="glass-widget-squircle"
      style={{
        width: '370px',
        height: '235px',
        borderRadius: '26px',
        overflow: 'hidden',
        position: 'relative',
        background:
          'url(/images/projects/riri2k/bling-bling.webp) center/cover no-repeat, linear-gradient(135deg, #2d1b3d, #1a2a4a)',
        boxShadow: (elevated ? ELEVATED_SHADOW : RESTING_SHADOW).join(', '),
      }}
      aria-label={it ? 'Foto — In evidenza' : 'Photos widget — Featured'}
    >
      {/* Gradient overlay — stronger at bottom for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)',
        }}
        aria-hidden
      />

      {/* Bottom metadata */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '20px 22px',
          fontFamily: 'var(--font-text)',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 600,
          }}
        >
          {it ? 'Foto · In evidenza' : 'Photos · Featured'}
        </div>
        <div
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#fff',
            marginTop: '4px',
            letterSpacing: '-0.015em',
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
        >
          Riri2k – BLING BLING
        </div>
      </div>
    </div>
  )
}
