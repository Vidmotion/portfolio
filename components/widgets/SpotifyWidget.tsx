'use client'

import { widgetDarkGlass } from '@/lib/utils'
import { playlist } from '@/core/registries/playlist'
import Image from 'next/image'
import { useLocaleStore } from '@/store/localeStore'
import { useExternalMediaStore } from '@/store/externalMediaStore'
import { privacyPath } from '@/lib/seo'

interface SpotifyWidgetProps {
  elevated?: boolean
}

export function SpotifyWidget({ elevated }: SpotifyWidgetProps) {
  const locale = useLocaleStore((s) => s.locale),
    it = locale === 'it'
  const enabled = useExternalMediaStore((s) => s.spotify),
    setSpotify = useExternalMediaStore((s) => s.setSpotify)
  return (
    <div
      className="glass-widget-squircle"
      style={{
        width: '370px',
        maxWidth: '100%',
        flexShrink: 0,
        height: '176px',
        borderRadius: '26px',
        ...widgetDarkGlass(elevated),
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-label="Music widget"
    >
      {enabled ? (
        <div style={{ width: '100%', position: 'relative' }}>
          <iframe
            data-testid="embed-iframe"
            title="Spotify playlist"
            style={{ borderRadius: '12px', border: 'none' }}
            src={playlist.embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <button
            type="button"
            onClick={() => setSpotify(false)}
            aria-label={it ? 'Disabilita Spotify' : 'Disable Spotify'}
            style={{
              position: 'absolute',
              right: 5,
              top: 4,
              border: 'none',
              borderRadius: 8,
              padding: '2px 7px',
              fontSize: 10,
              background: '#fff',
              color: '#222',
              cursor: 'pointer',
            }}
          >
            {it ? 'Disabilita' : 'Disable'}
          </button>
        </div>
      ) : (
        <div
          data-external-media="spotify-blocked"
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            width: '100%',
            height: 152,
            color: 'var(--os-ink)',
            padding: 8,
          }}
        >
          <Image
            src={playlist.cover}
            alt=""
            width={64}
            height={64}
            style={{ borderRadius: 12, flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{playlist.title}</p>
            <p style={{ fontSize: 11, lineHeight: 1.4, marginBottom: 8 }}>
              {it
                ? 'Il player usa dati e cookie di Spotify.'
                : 'The player uses Spotify data and cookies.'}{' '}
              <a
                href={privacyPath(locale)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                Privacy
              </a>
            </p>
            <button
              type="button"
              onClick={() => setSpotify(true)}
              style={{
                padding: '7px 10px',
                borderRadius: 10,
                border: '1px solid currentColor',
                background: 'transparent',
                color: 'inherit',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {it ? 'Abilita Spotify' : 'Enable Spotify'}
            </button>
            <a
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginLeft: 10,
                fontSize: 11,
                textDecoration: 'underline',
              }}
            >
              {it ? 'Apri Spotify' : 'Open Spotify'} ↗
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
