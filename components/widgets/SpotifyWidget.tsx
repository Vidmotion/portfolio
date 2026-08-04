'use client'

import { widgetDarkGlass } from '@/lib/utils'

const PLAYLIST_EMBED_SRC =
  'https://open.spotify.com/embed/playlist/1a9GX8k0hNOOy9RTQB34pk?utm_source=generator&si=ebc2bc04c7ff414c'

interface SpotifyWidgetProps {
  elevated?: boolean
}

export function SpotifyWidget({ elevated }: SpotifyWidgetProps) {
  return (
    <div
      className="glass-widget-squircle"
      style={{
        width: '370px',
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
      <iframe
        data-testid="embed-iframe"
        title="Spotify playlist"
        style={{ borderRadius: '12px', border: 'none' }}
        src={PLAYLIST_EMBED_SRC}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}
