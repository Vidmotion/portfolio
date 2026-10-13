'use client'

import Image from 'next/image'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { useLocaleStore } from '@/store/localeStore'
import { useLongPress } from '@/hooks/useLongPress'
import { useEasterEggStore } from '@/store/easterEggStore'

export function ProfileContent() {
  const locale = useLocaleStore((s) => s.locale)
  const show = useEasterEggStore((s) => s.show)
  const greeting = useLongPress(() => show('hello'))
  return (
    <div style={{ color: '#33333a', fontFamily: 'var(--font-text)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '28px' }}>
        <Image
          {...greeting}
          draggable={false}
          src={profile.portrait}
          alt={identity.name}
          width={96}
          height={96}
          style={{
            borderRadius: '18px',
            flexShrink: 0,
            objectFit: 'cover',
            WebkitTouchCallout: 'none',
          }}
        />
        <div style={{ minWidth: 0, flex: '1 1 150px' }}>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#161617',
              letterSpacing: '-.025em',
            }}
          >
            {identity.name}
          </div>
          <div style={{ fontSize: '15px', lineHeight: 1.4, marginTop: '6px' }}>{profile.title}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            {profile.location[locale]}
          </div>
        </div>
      </div>
      {profile.bio[locale].map((paragraph) => (
        <p key={paragraph} style={{ fontSize: '16px', lineHeight: 1.65, marginBottom: '20px' }}>
          {paragraph}
        </p>
      ))}
      <ul style={{ paddingLeft: '18px', margin: '28px 0', fontSize: '14px', lineHeight: 1.8 }}>
        {profile.expertise[locale].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a
        href={`mailto:${identity.email}`}
        style={{
          fontSize: '15px',
          color: '#0066cc',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
      >
        {identity.email}
      </a>
    </div>
  )
}
