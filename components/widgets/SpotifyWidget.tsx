'use client'

import { widgetDarkGlass } from '@/lib/utils'
import { playlist } from '@/core/registries/playlist'

interface SpotifyWidgetProps {
  elevated?: boolean
}

export function SpotifyWidget({ elevated }: SpotifyWidgetProps) {
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
    </div>
  )
}
