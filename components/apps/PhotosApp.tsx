'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { albums } from '@/lib/content'
import { springs, staggerDelay, duration, ease } from '@/lib/motion'

const PHOTO_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
]

const ALBUM_GRADIENTS: Record<string, string> = {
  'salt-and-iron': 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
  coastlines: 'linear-gradient(135deg, #1a6b8a 0%, #5da0a0 100%)',
  greyscale: 'linear-gradient(135deg, #555 0%, #999 100%)',
}

export function PhotosApp() {
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [sidebarMode, setSidebarMode] = useState<'all' | 'albums' | 'favourites'>('albums')

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-text)' }}>
      {/* Sidebar — 180px with macOS Photos sections */}
      <div
        style={{
          width: '180px',
          flexShrink: 0,
          borderRight: '0.5px solid rgba(0,0,0,0.06)',
          padding: '16px 0',
          background: 'rgba(248,248,249,0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
        role="navigation"
        aria-label="Photos sidebar"
      >
        {/* Library section */}
        <p
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: '#b0b0b5',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '0 12px 8px',
          }}
        >
          Library
        </p>

        <PhotosSidebarItem
          label="All Photos"
          isActive={sidebarMode === 'all'}
          onClick={() => setSidebarMode('all')}
        />
        <PhotosSidebarItem
          label="Favourites"
          isActive={sidebarMode === 'favourites'}
          onClick={() => setSidebarMode('favourites')}
        />

        <div style={{ height: '16px' }} />

        {/* Albums section */}
        <p
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: '#b0b0b5',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '0 12px 8px',
          }}
        >
          Albums
        </p>

        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => { setSelectedAlbum(album); setSidebarMode('albums') }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 10px',
              borderRadius: '8px',
              margin: '0 6px 1px',
              background: sidebarMode === 'albums' && selectedAlbum.id === album.id
                ? 'rgba(10,126,255,0.1)'
                : 'transparent',
              border: 'none',
              cursor: 'default',
              textAlign: 'left',
              fontFamily: 'var(--font-text)',
            }}
            aria-current={sidebarMode === 'albums' && selectedAlbum.id === album.id ? 'page' : undefined}
          >
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '5px',
                background: ALBUM_GRADIENTS[album.id] ?? '#ECECEC',
                flexShrink: 0,
              }}
              aria-hidden
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: sidebarMode === 'albums' && selectedAlbum.id === album.id ? 600 : 400,
                  color: sidebarMode === 'albums' && selectedAlbum.id === album.id ? '#0a7eff' : '#46464a',
                  letterSpacing: '-0.005em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {album.title}
              </p>
              <p
                style={{
                  fontSize: '10px',
                  color: sidebarMode === 'albums' && selectedAlbum.id === album.id ? '#0a7eff' : '#a0a0a5',
                }}
              >
                {album.count}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            padding: '26px 26px 16px',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.6)',
            borderBottom: '0.5px solid rgba(0,0,0,0.05)',
          }}
        >
          <h2
            style={{
              fontSize: '26px',
              fontWeight: 600,
              color: '#161617',
              letterSpacing: '-0.025em',
              fontFamily: 'var(--font-display)',
            }}
          >
            {sidebarMode === 'albums' ? selectedAlbum.title : sidebarMode === 'all' ? 'All Photos' : 'Favourites'}
          </h2>
          <p style={{ fontSize: '13px', color: '#a0a0a5', marginTop: '2px' }}>
            {sidebarMode === 'albums' ? `${selectedAlbum.count} photos` : ''}
          </p>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '26px 26px 30px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
            }}
            role="list"
            aria-label={`${selectedAlbum.title} photo grid`}
          >
            {Array.from({ length: selectedAlbum.count }).map((_, i) => (
              <motion.button
                key={`${selectedAlbum.id}-${i}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springs.default, delay: i * staggerDelay(selectedAlbum.count) }}
                whileHover={{ scale: 1.02, zIndex: 1 }}
                onClick={() => setLightboxIndex(i)}
                style={{
                  aspectRatio: '1',
                  borderRadius: '6px',
                  background: PHOTO_GRADIENTS[i % PHOTO_GRADIENTS.length],
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'default',
                  padding: 0,
                  position: 'relative',
                }}
                role="listitem"
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.open, ease: ease.opening }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.85)',
              zIndex: 10,
            }}
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-label="Photo lightbox"
            aria-modal
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={springs.largeWindow}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '80%',
                maxWidth: '580px',
                aspectRatio: '4/3',
                borderRadius: '18px',
                background: PHOTO_GRADIENTS[lightboxIndex % PHOTO_GRADIENTS.length],
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              }}
            />

            <button
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                fontSize: '18px',
                border: 'none',
                cursor: 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
            >
              ×
            </button>

            {lightboxIndex > 0 && (
              <button
                style={{
                  position: 'absolute',
                  left: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: '22px',
                  border: 'none',
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((idx) => (idx ?? 1) - 1) }}
                aria-label="Previous photo"
              >
                ‹
              </button>
            )}

            {lightboxIndex < selectedAlbum.count - 1 && (
              <button
                style={{
                  position: 'absolute',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: '22px',
                  border: 'none',
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((idx) => (idx ?? 0) + 1) }}
                aria-label="Next photo"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

function PhotosSidebarItem({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '7px 10px',
        borderRadius: '8px',
        margin: '0 6px 1px',
        background: isActive ? 'rgba(10,126,255,0.1)' : 'transparent',
        border: 'none',
        cursor: 'default',
        fontFamily: 'var(--font-text)',
        width: 'calc(100% - 12px)',
        textAlign: 'left',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        style={{
          fontSize: '13px',
          fontWeight: isActive ? 600 : 400,
          color: isActive ? '#0a7eff' : '#46464a',
          letterSpacing: '-0.005em',
        }}
      >
        {label}
      </span>
    </button>
  )
}
