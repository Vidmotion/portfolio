'use client'

import Image from 'next/image'
import { useEffect, useRef, type ReactNode } from 'react'
import type { Locale } from '@/types'
import styles from './MediaLightbox.module.css'

type Media = { src: string; alt: string; width: number; height: number; caption?: string }

export function MediaLightbox({
  items,
  index,
  onChange,
  locale,
  label,
  action,
}: {
  items: readonly Media[]
  index: number | null
  onChange: (index: number | null) => void
  locale: Locale
  label: string
  action?: ReactNode
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const origin = useRef<HTMLElement | null>(null)
  const selected = index === null ? undefined : items[index]
  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (selected && !node.open) {
      origin.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      node.showModal()
    } else if (!selected && node.open) {
      node.close()
      if (origin.current?.isConnected) origin.current.focus({ preventScroll: true })
    }
  }, [selected])
  const move = (direction: number) => {
    if (index !== null && items.length > 1)
      onChange((index + direction + items.length) % items.length)
  }
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault()
        onChange(null)
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onChange(null)
      }}
      onKeyDown={(event) => {
        event.stopPropagation()
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
        if (event.key === 'Escape') {
          event.preventDefault()
          onChange(null)
        }
        if (event.key === 'Tab') {
          event.preventDefault()
          const buttons = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
          )
          const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
          buttons[(current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus()
        }
      }}
    >
      {selected && (
        <>
          <button
            className={styles.close}
            onClick={() => onChange(null)}
            aria-label={locale === 'it' ? 'Chiudi' : 'Close'}
            autoFocus
          >
            ×
          </button>
          <figure>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
              sizes="(max-width:767px) 92vw, 1100px"
            />
            <figcaption>{selected.caption ?? selected.alt}</figcaption>
          </figure>
          <div className={styles.controls}>
            {items.length > 1 && (
              <button
                onClick={() => move(-1)}
                aria-label={locale === 'it' ? 'Immagine precedente' : 'Previous image'}
              >
                ‹
              </button>
            )}
            <span aria-live="polite">
              {index! + 1} / {items.length}
            </span>
            {items.length > 1 && (
              <button
                onClick={() => move(1)}
                aria-label={locale === 'it' ? 'Immagine successiva' : 'Next image'}
              >
                ›
              </button>
            )}
            {action}
          </div>
        </>
      )}
    </dialog>
  )
}
