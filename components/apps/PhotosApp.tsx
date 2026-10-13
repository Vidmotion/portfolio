'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { photos } from '@/core/registries/photos'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'
import { springs, staggerDelay } from '@/lib/motion'
import styles from './AppResponsive.module.css'

export function PhotosApp() {
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  const [mode, setMode] = useState<'all' | 'portraits' | 'favourites'>('portraits')
  const [favourites, setFavourites] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const selected = photos.find((photo) => photo.id === selectedId)
  const visible =
    mode === 'favourites' ? photos.filter((photo) => favourites.includes(photo.id)) : photos
  const labels = {
    all: locale === 'it' ? 'Tutte le foto' : 'All Photos',
    favourites: locale === 'it' ? 'Preferiti' : 'Favourites',
    portraits: locale === 'it' ? 'Ritratti' : 'Portraits',
  }

  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open) dialog.current.showModal()
    if (!selected && dialog.current?.open) dialog.current.close()
  }, [selected])

  const close = () => setSelectedId(null)
  const toggleFavourite = () => {
    if (!selected) return
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
          background: 'rgba(248,248,249,.5)',
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
        <button
          className={styles.photoNav}
          aria-current={mode === 'portraits' ? 'page' : undefined}
          onClick={() => setMode('portraits')}
        >
          {labels.portraits}
        </button>
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
                onClick={() => setSelectedId(photo.id)}
                aria-label={`${text.portrait} — ${photo.alt}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springs.default, delay: index * staggerDelay(visible.length) }}
                whileHover={{ scale: 1.02 }}
              >
                <Image src={photo.src} alt="" fill sizes="(max-width: 768px) 180px, 260px" />
              </motion.button>
            ))}
          </div>
          <p className={styles.empty}>
            {mode === 'favourites' && visible.length === 0
              ? locale === 'it'
                ? 'Apri una foto e aggiungila ai preferiti.'
                : 'Open a photo to add it to your favourites.'
              : text.noPhotos}
          </p>
        </div>
      </div>
      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label={text.photos}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onKeyDown={(event) => {
          event.stopPropagation()
          if (event.key === 'Tab') {
            event.preventDefault()
            const buttons = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
            )
            const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
            buttons[
              (current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length
            ]?.focus()
          }
          if (event.key === 'Escape') {
            event.preventDefault()
            close()
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        {selected && (
          <>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="(max-width: 768px) 90vw, 760px"
            />
            <button className={styles.lightboxClose} onClick={close} aria-label={text.close}>
              ×
            </button>
            <div className={styles.lightboxControls}>
              <button onClick={toggleFavourite} aria-pressed={favourites.includes(selected.id)}>
                {favourites.includes(selected.id) ? '♥' : '♡'} {labels.favourites}
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  )
}
