'use client'

import { useDesktopStore } from '@/store/desktopStore'
import { useDockStore } from '@/store/dockStore'
import { useSettingsStore } from '@/store/settingsStore'
import { identity } from '@/core/registries/identity'
import { wallpapers as WALLPAPER_OPTIONS } from '@/core/registries/wallpapers'
import type { Wallpaper } from '@/types'

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{
        width: '40px',
        height: '24px',
        borderRadius: '9999px',
        background: checked ? '#0a7eff' : 'rgba(0,0,0,0.15)',
        border: 'none',
        padding: '2px',
        cursor: 'default',
        display: 'flex',
        justifyContent: checked ? 'flex-end' : 'flex-start',
        transition: 'background 0.15s ease',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          display: 'block',
        }}
      />
    </button>
  )
}

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '14px 0',
        borderBottom: '0.5px solid rgba(0,0,0,0.06)',
      }}
    >
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#161617', letterSpacing: '-0.005em' }}>{label}</div>
        {description && (
          <div style={{ fontSize: '12px', color: '#a0a0a5', marginTop: '2px' }}>{description}</div>
        )}
      </div>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#b0b0b5',
        fontWeight: 600,
        marginTop: '28px',
        marginBottom: '4px',
      }}
    >
      {children}
    </div>
  )
}

export function SettingsApp() {
  const { wallpaper, setWallpaper } = useDesktopStore()
  const { magnificationEnabled, setMagnification } = useDockStore()
  const { settings, setReducedMotion, setHighContrast } = useSettingsStore()

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '30px 36px 40px', fontFamily: 'var(--font-text)', background: 'rgba(252,252,253,0.82)' }}>
      <div style={{ fontSize: '24px', fontWeight: 600, color: '#161617', letterSpacing: '-0.02em' }}>Settings</div>

      <SectionLabel>Appearance</SectionLabel>
      <Row label="Wallpaper" description="Changes the desktop background">
        <select
          value={wallpaper}
          onChange={(e) => setWallpaper(e.target.value as Wallpaper)}
          style={{
            fontSize: '13px',
            fontFamily: 'var(--font-text)',
            color: '#161617',
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            borderRadius: '8px',
            padding: '6px 10px',
          }}
        >
          {WALLPAPER_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </Row>
      <Row label="Dock Magnification" description="Icons grow as the pointer approaches">
        <Toggle checked={magnificationEnabled} onChange={setMagnification} label="Dock magnification" />
      </Row>

      <SectionLabel>Accessibility</SectionLabel>
      <Row label="Reduce Motion" description={`Minimizes animations across ${identity.productName}`}>
        <Toggle checked={settings.accessibility.reducedMotion} onChange={setReducedMotion} label="Reduce motion" />
      </Row>
      <Row label="Increase Contrast" description="Boosts contrast for text and UI elements">
        <Toggle checked={settings.accessibility.highContrast} onChange={setHighContrast} label="Increase contrast" />
      </Row>
    </div>
  )
}
