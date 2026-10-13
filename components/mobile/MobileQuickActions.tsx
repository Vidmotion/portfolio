'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import styles from './MobileHomeScreen.module.css'

export type QuickAction = { label: string; run: () => void }
export type QuickMenu = { label: string; rect: DOMRect; items: QuickAction[] }

export function MobileQuickActions({
  menu,
  close,
  reduced,
}: {
  menu: QuickMenu
  close: () => void
  reduced: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const text = uiText[useLocaleStore((s) => s.locale)]
  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement as HTMLElement | null
    dialog?.showModal()
    return () => {
      dialog?.close()
      if (opener?.isConnected) opener.focus()
    }
  }, [])
  const width = Math.min(270, window.innerWidth - 28)
  const height = 38 + menu.items.length * 48
  const left = Math.max(
    14,
    Math.min(menu.rect.left + menu.rect.width / 2 - width / 2, window.innerWidth - width - 14)
  )
  const below = menu.rect.bottom + 12
  const top = Math.max(
    14,
    Math.min(
      below + height < window.innerHeight - 20 ? below : menu.rect.top - height - 12,
      window.innerHeight - height - 20
    )
  )
  return (
    <dialog
      ref={ref}
      className={styles.quickDialog}
      onKeyDown={(event) => event.stopPropagation()}
      aria-label={`${text.quickActions}: ${menu.label}`}
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <motion.div
        className={styles.quickPanel}
        style={{
          width,
          left,
          top,
          transformOrigin: `${menu.rect.left + menu.rect.width / 2 - left}px ${menu.rect.top - top}px`,
        }}
        initial={reduced ? false : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      >
        <div className={styles.quickTitle}>{menu.label}</div>
        {menu.items.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              close()
              item.run()
            }}
          >
            {item.label}
            <ChevronRight size={15} aria-hidden />
          </button>
        ))}
      </motion.div>
    </dialog>
  )
}
