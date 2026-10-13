'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { useEasterEggStore, type EasterEgg } from '@/store/easterEggStore'
import { useLocaleStore } from '@/store/localeStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useMobileStore } from '@/store/mobileStore'
import { useApplicationLauncher } from '@/hooks/useApplicationLauncher'
import { detectPlatform } from '@/lib/utils'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { uiText } from '@/core/registries/locale'
import styles from './EasterEggLayer.module.css'
import palette from '@/styles/generated/mobile-palette.module.css'

function SecretDialog({ egg }: { egg: EasterEgg }) {
  const ref = useRef<HTMLDialogElement>(null)
  const close = useEasterEggStore((s) => s.close)
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  const systemReduced = useReducedMotion()
  const preference = useSettingsStore((s) => s.settings.accessibility.reducedMotion)
  const reduced = systemReduced || preference
  const { launch } = useApplicationLauncher()
  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement as HTMLElement | null
    dialog?.showModal()
    return () => {
      dialog?.close()
      if (opener?.isConnected) opener.focus()
    }
  }, [])
  const openFilms = () => {
    close()
    if (detectPlatform() === 'mobile') useMobileStore.getState().openApp('film-making')
    else launch('finder', { category: 'film-making' })
  }
  return (
    <motion.dialog
      ref={ref}
      className={`${styles.dialog} ${detectPlatform() === 'mobile' ? palette.palette : ''}`}
      data-mobile-theme={detectPlatform() === 'mobile' ? 'butter' : undefined}
      onKeyDown={(event) => event.stopPropagation()}
      aria-label={egg === 'hello' ? text.secretHello : text.secretAction}
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.1 : 0.18 }}
    >
      <motion.div
        className={styles.panel}
        initial={reduced ? false : { y: 24, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={reduced ? undefined : { y: 16, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button className={styles.close} onClick={close} aria-label={text.close} autoFocus>
          <X size={18} />
        </button>
        <div className={styles.eyebrow}>{text.oneMoreThing}</div>
        {egg === 'hello' ? (
          <>
            <h1 className={styles.hello} aria-label={locale === 'it' ? 'Ciao.' : 'Hello.'}>
              {(locale === 'it' ? 'ciao.' : 'hello.').split('').map((letter, index) => (
                <motion.span
                  key={index}
                  aria-hidden
                  initial={reduced ? false : { opacity: 0, y: 26, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 22,
                    delay: reduced ? 0 : 0.08 * index,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <strong className={styles.name}>{identity.name}</strong>
            <p className={styles.description}>{profile.summary[locale]}</p>
            <a className={styles.primary} href={`mailto:${identity.email}`}>
              {text.write} <ArrowUpRight size={17} />
            </a>
          </>
        ) : (
          <>
            <div className={styles.slate} aria-hidden>
              <motion.div
                className={styles.jaw}
                initial={reduced ? false : { rotate: -18 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 480, damping: 22 }}
              />
              <div className={styles.slateName}>{identity.name}</div>
              <div className={styles.slateFields}>
                <span>
                  SCENE<strong>01</strong>
                </span>
                <span>
                  TAKE<strong>01</strong>
                </span>
              </div>
              <div className={styles.slateFooter}>PORTFOLIO OS · FILM MAKING</div>
            </div>
            <h1 className={styles.actionTitle}>{text.secretAction}</h1>
            <button className={styles.primary} onClick={openFilms}>
              {text.openFilms}
              <ArrowUpRight size={17} />
            </button>
          </>
        )}
      </motion.div>
    </motion.dialog>
  )
}

export function EasterEggLayer() {
  const active = useEasterEggStore((s) => s.active)
  const show = useEasterEggStore((s) => s.show)
  useEffect(() => {
    let sequence = ''
    let last = 0
    const onKey = (event: KeyboardEvent) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.key.length !== 1 ||
        document.querySelector('dialog[open]')
      )
        return
      if ((event.target as HTMLElement).closest('input, textarea, [contenteditable="true"]')) return
      const now = performance.now()
      sequence = (now - last > 1500 ? '' : sequence) + event.key.toLowerCase()
      sequence = sequence.slice(-6)
      last = now
      if (sequence.endsWith('hello')) {
        show('hello')
        sequence = ''
      }
      if (sequence.endsWith('action')) {
        show('action')
        sequence = ''
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])
  return <AnimatePresence>{active && <SecretDialog key={active} egg={active} />}</AnimatePresence>
}
