'use client'

import type { CSSProperties } from 'react'
import styles from './WindowControls.module.css'
import { useLocaleStore } from '@/store/localeStore'

interface WindowControlsProps {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  isActive?: boolean
}

// Matches prototype: 12px circles, gap 8px, subtle border, exact colors
export function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
  isActive = true,
}: WindowControlsProps) {
  const it = useLocaleStore((s) => s.locale) === 'it'
  const CONTROLS = [
    {
      label: it ? 'Chiudi finestra' : 'Close window',
      color: isActive ? '#ff5f57' : '#dcdcde',
      onClick: onClose,
    },
    {
      label: it ? 'Riduci a icona' : 'Minimize window',
      color: isActive ? '#febc2e' : '#dcdcde',
      onClick: onMinimize,
    },
    {
      label: it ? 'Ingrandisci finestra' : 'Maximize window',
      color: isActive ? '#28c840' : '#dcdcde',
      onClick: onMaximize,
    },
  ]

  return (
    <div
      className={styles.controls}
      role="group"
      aria-label={it ? 'Controlli della finestra' : 'Window controls'}
    >
      {CONTROLS.map(({ label, color, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className={styles.control}
          style={{ '--control-color': color } as CSSProperties}
          aria-label={label}
        />
      ))}
    </div>
  )
}
