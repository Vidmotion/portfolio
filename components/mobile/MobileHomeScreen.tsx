'use client'

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue, type PanInfo } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Play } from 'lucide-react'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { playlist } from '@/core/registries/playlist'
import { categories, categoryLabel } from '@/core/registries/categories'
import { uiText } from '@/core/registries/locale'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { MacOSFolderIcon } from '@/components/ui/MacOSFolderIcon'
import { useLocaleStore } from '@/store/localeStore'
import { useMobileStore, type MobileLaunchOrigin } from '@/store/mobileStore'
import { useMobileMotion } from './useMobileMotion'
import type { ProjectCategory } from '@/types'
import styles from './MobileHomeScreen.module.css'

interface MobileHomeScreenProps {
  onOpenApp: (category: ProjectCategory | null) => void
  onOpenNotes?: () => void
  onOpenPhotos?: () => void
  onOpenPlaylist?: () => void
  onOpenSettings?: () => void
  onContact?: () => void
  onFindMe?: () => void
  onPrepareLaunch: (origin: MobileLaunchOrigin) => void
}

type AppIcon = {
  label: string
  file: string
  tone: 'graphite' | 'paper'
  edgeToEdge?: boolean
  action?: () => void
}

function IconButton({
  app,
  launch,
  reduced,
  dock = false,
}: {
  app: AppIcon
  launch: (element: HTMLElement, action?: () => void) => void
  reduced: boolean
  dock?: boolean
}) {
  return (
    <motion.button
      type="button"
      className={dock ? styles.dockButton : styles.appButton}
      aria-label={app.label}
      onClick={(event) => launch(event.currentTarget, app.action)}
      whileTap={reduced ? undefined : { scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <span data-launch-anchor="" className={`${styles.iconTile} ${styles[app.tone]}`}>
        <Image
          src={`/icons/mobile/${app.file.replace(/\.svg$/, '.png')}`}
          alt=""
          width={54}
          height={54}
          unoptimized
          className={`${styles.glyph} ${app.edgeToEdge ? styles.glyphFull : ''}`}
          draggable={false}
        />
      </span>
      {!dock && <span className={styles.appLabel}>{app.label}</span>}
    </motion.button>
  )
}

export function MobileHomeScreen(props: MobileHomeScreenProps) {
  const locale = useLocaleStore((state) => state.locale)
  const text = uiText[locale]
  const { homePage, setHomePage } = useMobileStore()
  const { reduced, present, appTransition, pageSpring } = useMobileMotion()
  const viewport = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const releaseFrame = useRef(0)
  const [width, setWidth] = useState(0)
  const x = useMotionValue(0)

  useLayoutEffect(() => {
    const element = viewport.current
    if (!element) return
    const resize = () => {
      const nextWidth = element.clientWidth
      setWidth(nextWidth)
      x.set(-useMobileStore.getState().homePage * nextWidth)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    return () => observer.disconnect()
  }, [x])

  useEffect(() => {
    const animation = animate(x, -homePage * width, reduced ? { duration: 0 } : pageSpring)
    return () => animation.stop()
  }, [homePage, width, x, reduced, pageSpring])
  useEffect(() => () => cancelAnimationFrame(releaseFrame.current), [])

  const launch = (element: HTMLElement, action?: () => void) => {
    if (dragging.current || !action) return
    const rect = (element.querySelector('[data-launch-anchor]') ?? element).getBoundingClientRect()
    props.onPrepareLaunch({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    action()
  }
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const direction =
      info.offset.x < -width * 0.16 || info.velocity.x < -450
        ? 1
        : info.offset.x > width * 0.16 || info.velocity.x > 450
          ? -1
          : 0
    const next = Math.max(0, Math.min(1, homePage + direction)) as 0 | 1
    setHomePage(next)
    if (next === homePage) animate(x, -next * width, reduced ? { duration: 0 } : pageSpring)
    releaseFrame.current = requestAnimationFrame(() => {
      dragging.current = false
    })
  }
  const blockDragClick = (event: MouseEvent) => {
    if (dragging.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const apps: AppIcon[] = [
    {
      label: text.projects,
      file: 'projects.svg',
      tone: 'graphite',
      action: () => props.onOpenApp(null),
    },
    { label: text.about, file: 'about%20me.svg', tone: 'graphite', action: props.onOpenNotes },
    {
      label: categoryLabel('film-making'),
      file: 'video.svg',
      tone: 'paper',
      action: () => props.onOpenApp('film-making'),
    },
    {
      label: text.contacts,
      file: 'find%20me.svg',
      tone: 'graphite',
      edgeToEdge: true,
      action: props.onFindMe,
    },
  ]
  const dock: AppIcon[] = [
    { label: text.write, file: 'message%20me.svg', tone: 'graphite', action: props.onContact },
    { label: text.photos, file: 'photo.svg', tone: 'graphite', action: props.onOpenPhotos },
    { label: text.playlist, file: 'spotify.svg', tone: 'graphite', action: props.onOpenPlaylist },
    { label: text.settings, file: 'settings.svg', tone: 'graphite', action: props.onOpenSettings },
  ]

  return (
    <motion.div
      className={styles.home}
      aria-hidden={!present}
      inert={!present}
      style={{ pointerEvents: present ? 'auto' : 'none' }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.045 }}
      transition={appTransition}
    >
      <header className={styles.header}>
        <span>{homePage === 0 ? text.portfolioPage : text.personalPage}</span>
        <LanguageSwitcher />
      </header>

      <div
        ref={viewport}
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label={text.homePages}
        tabIndex={0}
        onClickCapture={blockDragClick}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            setHomePage(event.key === 'ArrowRight' ? 1 : 0)
          }
        }}
      >
        <motion.div
          className={styles.track}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -width, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => {
            dragging.current = true
          }}
          onDragEnd={onDragEnd}
          onPointerCancel={() => {
            dragging.current = false
            animate(x, -homePage * width, reduced ? { duration: 0 } : pageSpring)
          }}
        >
          <section
            className={styles.page}
            aria-label={text.portfolioPage}
            aria-hidden={homePage !== 0}
            inert={homePage !== 0}
          >
            <motion.button
              type="button"
              className={styles.profile}
              aria-label={`${text.about} — ${identity.name}`}
              onClick={(event) => launch(event.currentTarget, props.onOpenNotes)}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={appTransition}
            >
              <Image
                src={profile.portrait}
                alt={identity.name}
                width={88}
                height={88}
                sizes="88px"
                className={styles.portrait}
                draggable={false}
              />
              <span className={styles.profileCopy}>
                <strong>{identity.name}</strong>
                <span className={styles.profession}>{profile.title}</span>
                <span className={styles.location}>{profile.location[locale]}</span>
              </span>
              <ChevronRight size={17} className={styles.profileArrow} aria-hidden />
            </motion.button>

            <nav className={styles.apps} aria-label={text.apps}>
              {apps.map((app) => (
                <IconButton key={app.file} app={app} launch={launch} reduced={reduced} />
              ))}
            </nav>

            <div className={styles.workWidget}>
              <span className={styles.widgetHeading}>{text.exploreWork}</span>
              <div className={styles.folders}>
                {categories.map((folder) => (
                  <motion.button
                    type="button"
                    key={folder.id}
                    aria-label={`Open ${folder.label} folder`}
                    onClick={(event) =>
                      launch(event.currentTarget, () => props.onOpenApp(folder.id))
                    }
                    whileTap={reduced ? undefined : { scale: 0.95 }}
                    transition={appTransition}
                  >
                    <MacOSFolderIcon icon={null} width={52} height={43} />
                    <span>{folder.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          <section
            className={styles.page}
            aria-label={text.personalPage}
            aria-hidden={homePage !== 1}
            inert={homePage !== 1}
          >
            <motion.button
              type="button"
              className={styles.musicWidget}
              aria-label={`${text.playlist} — ${playlist.title}`}
              onClick={(event) => launch(event.currentTarget, props.onOpenPlaylist)}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={appTransition}
            >
              <span className={styles.widgetHeading}>{text.onRepeat}</span>
              <span className={styles.musicBody}>
                <Image
                  src={playlist.cover}
                  alt=""
                  width={96}
                  height={96}
                  className={styles.cover}
                  draggable={false}
                />
                <span className={styles.musicCopy}>
                  <strong>{playlist.title}</strong>
                  <span>{text.myPlaylist}</span>
                  <span className={styles.play}>
                    <Play size={14} fill="currentColor" aria-hidden />
                    {text.play}
                  </span>
                </span>
              </span>
            </motion.button>
            <div className={styles.linksWidget}>
              <span className={styles.widgetHeading}>{text.find}</span>
              {identity.social.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{social.label ?? social.platform}</span>
                  <ArrowUpRight size={18} aria-hidden />
                </a>
              ))}
            </div>
          </section>
        </motion.div>
      </div>

      <nav className={styles.pagination} aria-label={text.homePages}>
        {[text.portfolioPage, text.personalPage].map((label, index) => (
          <button
            type="button"
            key={index}
            aria-label={label}
            aria-current={homePage === index ? 'page' : undefined}
            onClick={() => setHomePage(index as 0 | 1)}
          >
            <motion.span
              animate={{
                width: homePage === index ? 20 : 6,
                opacity: homePage === index ? 1 : 0.38,
              }}
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
            />
          </button>
        ))}
      </nav>
      <nav className={styles.dock} aria-label="Dock">
        {dock.map((app) => (
          <IconButton key={app.file} app={app} launch={launch} reduced={reduced} dock />
        ))}
      </nav>
    </motion.div>
  )
}
