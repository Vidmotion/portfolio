'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'
import { AppGlyph } from '@/components/ui/AppGlyph'
import type { IconId } from '@/core/registries/icons'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { categories, categoryLabel } from '@/core/registries/categories'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'
import { useMobileStore, type MobileLaunchOrigin, type MobileHomePage } from '@/store/mobileStore'
import { useMobileMotion } from './useMobileMotion'
import { useLongPress } from '@/hooks/useLongPress'
import { useEasterEggStore } from '@/store/easterEggStore'
import { MobileQuickActions, type QuickMenu } from './MobileQuickActions'
import { StudioClock } from './StudioClock'
import { useHomeSwipe } from './useHomeSwipe'
import {
  MusicWidget,
  PortraitWidget,
  FolderWidget,
  ExpertiseWidget,
  HelloWidget,
  MailWidget,
  ProjectPreviewWidget,
} from './MobileHomeWidgets'
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
  onOpenProject: (id: string) => void
}

type AppIcon = {
  label: string
  icon: IconId
  action?: () => void
}

function IconButton({
  app,
  launch,
  reduced,
  dock = false,
  onQuickActions,
}: {
  app: AppIcon
  launch: (element: HTMLElement, action?: () => void) => void
  reduced: boolean
  dock?: boolean
  onQuickActions: (element: HTMLElement, app: AppIcon) => void
}) {
  const hold = useLongPress((element) => onQuickActions(element, app))
  return (
    <motion.button
      type="button"
      className={dock ? styles.dockButton : styles.appButton}
      aria-label={app.label}
      {...hold}
      onClick={(event) => launch(event.currentTarget, app.action)}
      whileTap={reduced ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <span data-launch-anchor="" className={`${styles.iconTile} ${styles.graphite}`}>
        <AppGlyph icon={app.icon} className={styles.glyph} />
      </span>
      {!dock && <span className={styles.appLabel}>{app.label}</span>}
    </motion.button>
  )
}

export function MobileHomeScreen(props: MobileHomeScreenProps) {
  const locale = useLocaleStore((state) => state.locale)
  const text = uiText[locale]
  const homePage = useMobileStore((s) => s.homePage)
  const setHomePage = useMobileStore((s) => s.setHomePage)
  const { reduced, present, appTransition, pageSpring } = useMobileMotion()
  const viewport = useRef<HTMLDivElement>(null)
  const today = useRef<HTMLElement>(null)
  const mainCanvas = useRef<HTMLDivElement>(null)
  const personalCanvas = useRef<HTMLDivElement>(null)
  const measuredWidth = useRef(0)
  const animatedWidth = useRef(0)
  const [width, setWidth] = useState(0)
  const [canvasFits, setCanvasFits] = useState({ main: 1, personal: 1 })
  const [menu, setMenu] = useState<QuickMenu | null>(null)
  const showEgg = useEasterEggStore((s) => s.show)
  const profileHold = useLongPress(() => showEgg('hello'))
  const x = useMotionValue(0)
  const swipe = useHomeSwipe({ x, width, page: homePage, reduced, navigate: setHomePage })
  const hintId = useId()
  const todayScroll = useMotionValue(0)
  const todayProgress = useMotionValue(0)
  const hintOpacity = useTransform(todayScroll, [0, 48], [1, 0])
  const todayOpacity = useTransform(() => {
    if (reduced || !width) return 1
    return 1 - Math.min(1, Math.abs(x.get()) / width) * 0.25
  })
  useLayoutEffect(() => {
    if (!today.current) return
    const element = today.current
    element.scrollTop = useMobileStore.getState().todayScrollTop
    todayScroll.set(element.scrollTop)
    todayProgress.set(element.scrollTop / Math.max(1, element.scrollHeight - element.clientHeight))
  }, [todayProgress, todayScroll])
  useLayoutEffect(() => {
    const area = viewport.current
    const main = mainCanvas.current
    const personal = personalCanvas.current
    if (!area || !main || !personal) return
    const fit = () => {
      const page = main.parentElement!
      const style = getComputedStyle(page)
      const available = Math.max(
        0,
        area.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
      )
      const next = {
        main: Math.min(1, available / Math.max(1, main.offsetHeight)),
        personal: Math.min(1, available / Math.max(1, personal.offsetHeight)),
      }
      setCanvasFits((current) =>
        Math.abs(current.main - next.main) < 0.0001 &&
        Math.abs(current.personal - next.personal) < 0.0001
          ? current
          : next
      )
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(area)
    observer.observe(main)
    observer.observe(personal)
    return () => observer.disconnect()
  }, [])
  const indicatorX = useTransform(() =>
    width ? Math.max(0, Math.min(2, -x.get() / width)) * 44 : 44
  )

  useLayoutEffect(() => {
    const element = viewport.current
    if (!element) return
    const resize = () => {
      const nextWidth = element.clientWidth
      if (nextWidth === measuredWidth.current) return
      measuredWidth.current = nextWidth
      setWidth(nextWidth)
      // Resizing is a layout correction, not a gesture. Reset inherited velocity.
      x.jump(-useMobileStore.getState().homePage * nextWidth)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    return () => observer.disconnect()
  }, [x])

  useLayoutEffect(() => {
    // The first measurement schedules a render. Do not overwrite its offset
    // with an animation based on the initial, unmeasured width.
    if (!width) return
    if (animatedWidth.current !== width) {
      animatedWidth.current = width
      x.jump(-homePage * width)
      return
    }
    const animation = animate(x, -homePage * width, reduced ? { duration: 0 } : pageSpring)
    return () => animation.stop()
  }, [homePage, width, x, reduced, pageSpring])

  const launch = (element: HTMLElement, action?: () => void) => {
    if (swipe.dragging.current || !action) return
    if (today.current) useMobileStore.getState().setTodayScrollTop(today.current.scrollTop)
    const rect = (element.querySelector('[data-launch-anchor]') ?? element).getBoundingClientRect()
    props.onPrepareLaunch({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    action()
  }
  const quickActions = (element: HTMLElement, app: AppIcon) => {
    if (swipe.dragging.current) return
    const items = [
      { label: `${text.openApp} ${app.label}`, run: () => launch(element, app.action) },
    ]
    if (app.icon === 'projects') {
      items.push(
        ...categories.map((category) => ({
          label: category.label,
          run: () => launch(element, () => props.onOpenApp(category.id)),
        }))
      )
    }
    if (app.icon === 'film') items.push({ label: text.secretAction, run: () => showEgg('action') })
    if (app.icon === 'about') items.push({ label: text.secretHello, run: () => showEgg('hello') })
    setMenu({
      label: app.label,
      rect: element.querySelector('[data-launch-anchor]')!.getBoundingClientRect(),
      items,
    })
  }

  const apps: AppIcon[] = [
    {
      label: text.projects,
      icon: 'projects',
      action: () => props.onOpenApp(null),
    },
    {
      label: text.about,
      icon: 'about',
      action: props.onOpenNotes,
    },
    {
      label: categoryLabel('film-making'),
      icon: 'film',
      action: () => props.onOpenApp('film-making'),
    },
    {
      label: text.contacts,
      icon: 'contacts',
      action: props.onFindMe,
    },
  ]
  const dock: AppIcon[] = [
    { label: text.write, icon: 'mail', action: props.onContact },
    { label: text.photos, icon: 'photos', action: props.onOpenPhotos },
    { label: text.playlist, icon: 'spotify', action: props.onOpenPlaylist },
    { label: text.settings, icon: 'settings', action: props.onOpenSettings },
  ]
  const pageNames = [text.widgetsPage, text.portfolioPage, text.personalPage]
  const personalApps: AppIcon[] = [
    { label: text.photos, icon: 'photos', action: props.onOpenPhotos },
    { label: text.playlist, icon: 'spotify', action: props.onOpenPlaylist },
    ...identity.social.map((social) => ({
      label: social.label ?? social.platform,
      icon: social.platform as IconId,
      action: () => {
        window.open(social.url, '_blank', 'noopener,noreferrer')
      },
    })),
  ]
  const renderApps = (items: AppIcon[]) =>
    items.map((app) => (
      <IconButton
        key={app.icon}
        app={app}
        launch={launch}
        reduced={reduced}
        onQuickActions={quickActions}
      />
    ))

  return (
    <motion.div
      className={styles.home}
      data-take-look={homePage === 0}
      aria-hidden={!present}
      inert={!present}
      style={{ pointerEvents: present ? 'auto' : 'none' }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.045 }}
      transition={appTransition}
    >
      <header className={styles.header} role="presentation">
        <motion.span style={{ opacity: homePage === 0 ? todayOpacity : 0 }}>
          {homePage === 0 ? text.widgetsPage : ''}
        </motion.span>
        {homePage === 0 && (
          <motion.span
            className={styles.scrollProgress}
            style={{ scaleX: todayProgress }}
            aria-hidden
          />
        )}
      </header>

      <div
        ref={viewport}
        className={styles.viewport}
        data-take-look={homePage === 0}
        role="region"
        aria-roledescription="carousel"
        aria-label={text.homePages}
        tabIndex={0}
        onClickCapture={swipe.onClickCapture}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget && event.target !== today.current) return
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            viewport.current?.focus({ preventScroll: true })
            setHomePage(
              Math.max(
                0,
                Math.min(2, homePage + (event.key === 'ArrowRight' ? 1 : -1))
              ) as MobileHomePage
            )
          }
        }}
      >
        <motion.div className={styles.track} style={{ x }} {...swipe.handlers}>
          <section
            className={`${styles.page} ${styles.today}`}
            ref={today}
            aria-label={text.widgetsPage}
            aria-hidden={homePage !== 0}
            inert={homePage !== 0}
            tabIndex={homePage === 0 ? 0 : -1}
            aria-describedby={hintId}
            onScroll={(event) => {
              const element = event.currentTarget
              todayScroll.set(element.scrollTop)
              todayProgress.set(
                element.scrollTop / Math.max(1, element.scrollHeight - element.clientHeight)
              )
            }}
          >
            <div className={styles.todayStack}>
              <MailWidget launch={launch} open={props.onContact} reduced={reduced} />
              <MusicWidget launch={launch} open={props.onOpenPlaylist} reduced={reduced} />
              <PortraitWidget launch={launch} open={props.onOpenPhotos} reduced={reduced} wide />
              <ProjectPreviewWidget launch={launch} open={props.onOpenProject} reduced={reduced} />
            </div>
          </section>

          <section
            className={styles.page}
            aria-label={text.portfolioPage}
            aria-hidden={homePage !== 1}
            inert={homePage !== 1}
          >
            <div
              ref={mainCanvas}
              className={styles.homeCanvas}
              style={{ transform: `scale(${canvasFits.main})` }}
            >
              <motion.button
                type="button"
                className={styles.profile}
                {...profileHold}
                onClick={(event) => launch(event.currentTarget, props.onOpenNotes)}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={appTransition}
              >
                <span className={styles.profileCopy}>
                  <strong>{identity.name}</strong>
                  <span className={styles.profession}>{profile.title}</span>
                  <span className={styles.location}>{profile.location[locale]}</span>
                </span>
                <ChevronRight size={17} className={styles.profileArrow} aria-hidden />
              </motion.button>
              <div className={styles.splitGrid}>
                <div className={styles.widgetSlot}>
                  <StudioClock />
                  <span className={styles.widgetCaption}>{text.studioTime}</span>
                </div>
                <nav className={`${styles.apps} ${styles.appQuad}`} aria-label={text.apps}>
                  {renderApps(apps)}
                </nav>
              </div>
              <div className={`${styles.splitGrid} ${styles.bottomGrid}`}>
                <div className={styles.widgetSlot}>
                  <FolderWidget launch={launch} open={props.onOpenApp} reduced={reduced} />
                  <span className={styles.widgetCaption}>{text.exploreWork}</span>
                </div>
                <div className={styles.widgetSlot}>
                  <PortraitWidget launch={launch} open={props.onOpenPhotos} reduced={reduced} />
                  <span className={styles.widgetCaption}>{text.portrait}</span>
                </div>
              </div>
            </div>
          </section>

          <section
            className={styles.page}
            aria-label={text.personalPage}
            aria-hidden={homePage !== 2}
            inert={homePage !== 2}
          >
            <div
              ref={personalCanvas}
              className={styles.homeCanvas}
              style={{ transform: `scale(${canvasFits.personal})` }}
            >
              <motion.button
                className={`${styles.profile} ${styles.summary}`}
                onClick={(event) => launch(event.currentTarget, props.onOpenNotes)}
                whileTap={reduced ? undefined : { scale: 0.98 }}
              >
                <span className={styles.widgetHeading}>{text.about}</span>
                <span>{profile.summary[locale]}</span>
              </motion.button>
              <div className={styles.splitGrid}>
                <ExpertiseWidget launch={launch} open={props.onOpenNotes} reduced={reduced} />
                <nav className={`${styles.apps} ${styles.appQuad}`} aria-label={text.apps}>
                  {renderApps(personalApps)}
                </nav>
              </div>
              <div className={`${styles.splitGrid} ${styles.bottomGrid}`}>
                <div className={styles.widgetSlot}>
                  <HelloWidget launch={launch} open={props.onContact} reduced={reduced} />
                  <span className={styles.widgetCaption}>{text.mail}</span>
                </div>
                <div className={styles.widgetSlot}>
                  <PortraitWidget launch={launch} open={props.onOpenPhotos} reduced={reduced} />
                  <span className={styles.widgetCaption}>{text.portrait}</span>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
        {homePage === 0 && (
          <motion.div id={hintId} className={styles.scrollHint} style={{ opacity: hintOpacity }}>
            <span>{text.scrollExplore}</span>
            <ChevronDown size={15} aria-hidden />
          </motion.div>
        )}
      </div>

      <nav className={styles.pagination} aria-label={text.homePages}>
        <div className={styles.pageControl}>
          <motion.span className={styles.activeDot} style={{ x: indicatorX }} aria-hidden />
          {pageNames.map((label, index) => (
            <button
              type="button"
              key={index}
              aria-label={label}
              aria-current={homePage === index ? 'page' : undefined}
              onClick={() => setHomePage(index as MobileHomePage)}
            >
              <span aria-hidden />
            </button>
          ))}
        </div>
      </nav>
      <nav className={styles.dock} aria-label="Dock">
        {dock.map((app) => (
          <IconButton
            key={app.icon}
            app={app}
            launch={launch}
            reduced={reduced}
            dock
            onQuickActions={quickActions}
          />
        ))}
      </nav>
      {menu && <MobileQuickActions menu={menu} close={() => setMenu(null)} reduced={reduced} />}
    </motion.div>
  )
}
