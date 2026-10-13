'use client'

import { motion } from 'framer-motion'
import { ProfileContent } from '@/components/ui/ProfileContent'
import { identity } from '@/core/registries/identity'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useMobileMotion } from './useMobileMotion'
import type { MobileUtility } from '@/store/mobileStore'

export function MobileUtilityView({
  utility,
  onBack,
}: {
  utility: MobileUtility
  onBack: () => void
}) {
  const locale = useLocaleStore((s) => s.locale)
  const { appEntrance, transformOrigin, present } = useMobileMotion()
  const text = uiText[locale]
  const { settings, setReducedMotion, setHighContrast } = useSettingsStore()
  const title =
    utility === 'about'
      ? text.about
      : utility === 'photos'
        ? text.photos
        : utility === 'settings'
          ? text.settings
          : text.contacts
  return (
    <motion.div
      {...appEntrance}
      role="region"
      aria-label={title}
      aria-hidden={!present}
      inert={!present}
      style={{
        position: 'absolute',
        zIndex: 10,
        transformOrigin,
        pointerEvents: present ? 'auto' : 'none',
        inset: 0,
        background: '#fcfcfd',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-text)',
      }}
    >
      <div style={{ padding: '62px 24px 16px', borderBottom: '.5px solid rgba(0,0,0,.06)' }}>
        <button
          onClick={onBack}
          style={{
            color: '#0066cc',
            background: 'transparent',
            border: 'none',
            padding: 0,
            minHeight: '44px',
            minWidth: '44px',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          ‹ {text.home}
        </button>
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 600,
            letterSpacing: '-.03em',
            margin: '10px 0 0',
            color: '#161617',
          }}
        >
          {title}
        </h1>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '24px 24px 40px' }}>
        {utility === 'about' && <ProfileContent />}
        {utility === 'photos' && (
          <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.6 }}>{text.noPhotos}</p>
        )}
        {utility === 'contacts' && (
          <div style={{ fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <strong>{identity.name}</strong>
            <a href={`mailto:${identity.email}`} style={{ color: '#0066cc' }}>
              {identity.email}
            </a>
            {identity.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0066cc', textTransform: 'capitalize' }}
              >
                {social.label ?? social.platform}
              </a>
            ))}
          </div>
        )}
        {utility === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                label: text.reduceMotion,
                checked: settings.accessibility.reducedMotion,
                change: setReducedMotion,
              },
              {
                label: text.contrast,
                checked: settings.accessibility.highContrast,
                change: setHighContrast,
              },
            ].map((setting) => (
              <div
                key={setting.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  fontSize: '15px',
                }}
              >
                <span>{setting.label}</span>
                <button
                  role="switch"
                  aria-label={setting.label}
                  aria-checked={setting.checked}
                  onClick={() => setting.change(!setting.checked)}
                  style={{
                    width: '44px',
                    height: '26px',
                    padding: '3px',
                    borderRadius: '999px',
                    background: setting.checked ? '#0a7eff' : '#b8b8bd',
                    border: 'none',
                    display: 'flex',
                    justifyContent: setting.checked ? 'flex-end' : 'flex-start',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      background: '#fff',
                      borderRadius: '50%',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
