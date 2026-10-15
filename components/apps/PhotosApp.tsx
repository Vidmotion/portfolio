'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getPhotos } from '@/core/registries/photos'
import { getProjects } from '@/core/registries/projects'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'
import { springs, staggerDelay } from '@/lib/motion'
import styles from './AppResponsive.module.css'
import { MediaLightbox } from '@/components/ui/MediaLightbox'

export function PhotosApp() {
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  const photos = getPhotos(locale)
  const [mode, setMode] = useState('all')
  const [favourites, setFavourites] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = photos.find((photo) => photo.id === selectedId)
  const visible =
    mode === 'favourites'
      ? photos.filter((photo) => favourites.includes(photo.id))
      : mode === 'all'
        ? photos
        : photos.filter((photo) => photo.album === mode)
  const albumIds = [...new Set(photos.map((photo) => photo.album))]
  const labels: Record<string, string> = {
    all: locale === 'it' ? 'Tutte le foto' : 'All Photos',
    favourites: locale === 'it' ? 'Preferiti' : 'Favourites',
    portraits: locale === 'it' ? 'Ritratti' : 'Portraits',
    ...Object.fromEntries(getProjects(locale).map((project) => [project.id, project.title])),
  }

  const toggleFavourite = () => {
    if (!selected) return
    if (mode === 'favourites' && favourites.includes(selected.id)) setSelectedId(null)
    setFavourites((current) =>
      current.includes(selected.id)
        ? current.filter((id) => id !== selected.id)
        : [...current, selected.id]
    )
  }

  return (
    <div className={`${styles.shell} ${styles.photos}`}>
      <nav
        className={styles.sidebar}
        style={{
          borderRight: '.5px solid #0000000f',
          background: 'var(--ui-raised)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-label={text.photos}
      >
        <p className={styles.sectionLabel}>{locale === 'it' ? 'Libreria' : 'Library'}</p>
        {(['all', 'favourites'] as const).map((value) => (
          <button
            key={value}
            className={styles.photoNav}
            aria-current={mode === value ? 'page' : undefined}
            onClick={() => setMode(value)}
          >
            {labels[value]}
          </button>
        ))}
        <p className={styles.sectionLabel}>{text.albums}</p>
        {albumIds.map((album) => (
          <button
            key={album}
            className={styles.photoNav}
            aria-current={mode === album ? 'page' : undefined}
            onClick={() => setMode(album)}
          >
            {labels[album]}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div className={styles.photoHeader}>
          <h2>{labels[mode]}</h2>
          <p>
            {visible.length} {text.photos.toLocaleLowerCase()}
          </p>
        </div>
        <div className={styles.photoContent}>
          <div className={styles.photoGrid} role="group" aria-label={labels[mode]}>
            {visible.map((photo, index) => (
              <motion.button
                key={photo.id}
                className={styles.photo}
                onClick={(event) => {
                  event.currentTarget.focus({ preventScroll: true })
                  setSelectedId(photo.id)
                }}
                aria-label={`${text.openImage} — ${photo.alt}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springs.default, delay: index * staggerDelay(visible.length) }}
                whileHover={{ scale: 1.02 }}
              >
                <Image src={photo.src} alt="" fill sizes="(max-width: 768px) 180px, 260px" />
              </motion.button>
            ))}
          </div>
          {visible.length === 0 && (
            <p className={styles.empty}>
              {mode === 'favourites' && visible.length === 0
                ? locale === 'it'
                  ? 'Apri una foto e aggiungila ai preferiti.'
                  : 'Open a photo to add it to your favourites.'
                : text.noPhotos}
            </p>
          )}
        </div>
      </div>
      <MediaLightbox
        items={visible}
        index={
          selectedId === null || !visible.some((photo) => photo.id === selectedId)
            ? null
            : visible.findIndex((photo) => photo.id === selectedId)
        }
        onChange={(index) => setSelectedId(index === null ? null : visible[index].id)}
        locale={locale}
        label={text.photos}
        action={
          <button
            onClick={toggleFavourite}
            aria-pressed={!!selected && favourites.includes(selected.id)}
          >
            {selected && favourites.includes(selected.id) ? '♥' : '♡'} {labels.favourites}
          </button>
        }
      />
    </div>
  )
}
