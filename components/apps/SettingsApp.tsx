'use client'

import { AppearanceSettings } from '@/components/ui/AppearanceSettings'
import { useDockStore } from '@/store/dockStore'
import { useSettingsStore } from '@/store/settingsStore'
import { identity } from '@/core/registries/identity'
import styles from './AppResponsive.module.css'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
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
        background: checked ? 'var(--os-accent)' : 'rgba(0,0,0,0.15)',
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
          background: 'var(--ui-raised)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          display: 'block',
        }}
      />
    </button>
  )
}

function Row({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
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
        <div
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--ui-ink)',
            letterSpacing: '-0.005em',
          }}
        >
          {label}
        </div>
        {description && (
          <div style={{ fontSize: '12px', color: 'var(--ui-muted)', marginTop: '2px' }}>
            {description}
          </div>
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
        color: 'var(--ui-muted)',
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
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  const it = locale === 'it'
  const { magnificationEnabled, setMagnification } = useDockStore()
  const { settings, setReducedMotion, setHighContrast } = useSettingsStore()

  return (
    <div className={styles.settings}>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'var(--ui-ink)',
          letterSpacing: '-0.02em',
        }}
      >
        {text.settings}
      </div>

      <SectionLabel>{it ? 'Aspetto' : 'Appearance'}</SectionLabel>
      <AppearanceSettings />
      <Row
        label={it ? 'Ingrandimento del Dock' : 'Dock Magnification'}
        description={
          it ? 'Le icone crescono avvicinando il puntatore' : 'Icons grow as the pointer approaches'
        }
      >
        <Toggle
          checked={magnificationEnabled}
          onChange={setMagnification}
          label={it ? 'Ingrandimento del Dock' : 'Dock magnification'}
        />
      </Row>

      <SectionLabel>{it ? 'Accessibilità' : 'Accessibility'}</SectionLabel>
      <Row
        label={text.reduceMotion}
        description={
          it
            ? `Riduce le animazioni di ${identity.productName}`
            : `Minimizes animations across ${identity.productName}`
        }
      >
        <Toggle
          checked={settings.accessibility.reducedMotion}
          onChange={setReducedMotion}
          label={text.reduceMotion}
        />
      </Row>
      <Row
        label={text.contrast}
        description={
          it
            ? 'Aumenta il contrasto di testo e interfaccia'
            : 'Boosts contrast for text and UI elements'
        }
      >
        <Toggle
          checked={settings.accessibility.highContrast}
          onChange={setHighContrast}
          label={text.contrast}
        />
      </Row>
    </div>
  )
}
