'use client'

import { widgetDarkGlass } from '@/lib/utils'
import { playlist } from '@/core/registries/playlist'
import Image from 'next/image'
import { Play, ArrowUpRight } from 'lucide-react'
import { useWindowStore } from '@/store/windowStore'
import { useLocaleStore } from '@/store/localeStore'
import styles from './SpotifyWidget.module.css'

interface SpotifyWidgetProps {
  elevated?: boolean
  player?: boolean
}

export function SpotifyWidget({ elevated, player = false }: SpotifyWidgetProps) {
  const it = useLocaleStore((s) => s.locale) === 'it'
  const open = useWindowStore((s) => s.openWindow)
  return (
    <div
      className="glass-widget-squircle"
      style={{
        width: '370px',
        maxWidth: '100%',
        flexShrink: 0,
        height: player ? 'auto' : '176px',
        borderRadius: '26px',
        ...widgetDarkGlass(elevated),
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-label="Music widget"
    >
      {player ? (
        <>
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
          />
          <a
            className={styles.external}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {it ? 'Apri in Spotify' : 'Open in Spotify'}
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </>
      ) : (
        <button className={styles.preview} onClick={() => open('spotify')}>
          <Image src={playlist.cover} width={86} height={86} alt="" />
          <span>
            <small>{it ? 'La mia playlist' : 'My playlist'}</small>
            <strong>{playlist.title}</strong>
            <span>
              {it ? 'Apri il player' : 'Open player'}{' '}
              <Play size={12} fill="currentColor" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
