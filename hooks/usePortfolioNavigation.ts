'use client'

import { useEffect, useRef } from 'react'
import { useMobileStore, type MobileHomePage, type MobileUtility } from '@/store/mobileStore'
import { useWindowStore } from '@/store/windowStore'
import { useFinderStore } from '@/store/finderStore'
import { useLocaleStore } from '@/store/localeStore'
import { getProjectBySlug } from '@/lib/content'
import { profile } from '@/core/registries/profile'
import type { Locale, Platform, ProjectCategory, WindowApp } from '@/types'

type View =
  'home' | 'projects' | 'project' | 'about' | 'photos' | 'settings' | 'contact' | 'contacts'
type Route = {
  view: View
  project: string | null
  category: ProjectCategory | null
  page: MobileHomePage
  locale: Locale
}
const views: View[] = ['home', 'projects', 'about', 'photos', 'settings', 'contact', 'contacts']
const categories: ProjectCategory[] = ['digital', 'film-making', 'creative-direction']
const utilities: Record<MobileUtility, View> = {
  about: 'about',
  photos: 'photos',
  settings: 'settings',
  message: 'contact',
  contacts: 'contacts',
}

function fromUrl(): Route {
  const params = new URLSearchParams(window.location.search)
  const project = getProjectBySlug(params.get('project') ?? '')?.id ?? null
  const category = params.get('category') as ProjectCategory
  const requestedView = params.get('view') as View
  return {
    view: project ? 'project' : views.includes(requestedView) ? requestedView : 'home',
    project,
    category: categories.includes(category) ? category : null,
    page: params.get('page') === 'take-a-look' ? 0 : params.get('page') === 'personal' ? 2 : 1,
    locale: params.get('lang') === 'it' ? 'it' : 'en',
  }
}

function fromShell(platform: Platform): Route {
  const mobile = useMobileStore.getState()
  const route: Route = {
    view: 'home',
    project: null,
    category: null,
    page: mobile.homePage,
    locale: useLocaleStore.getState().locale,
  }
  if (platform === 'mobile') {
    if (mobile.screen === 'project')
      return {
        ...route,
        view: 'project',
        project: mobile.activeProjectId,
        category: mobile.activeCategory,
      }
    if (mobile.screen === 'app')
      return { ...route, view: 'projects', category: mobile.activeCategory }
    if (mobile.screen === 'utility' && mobile.activeUtility)
      return { ...route, view: utilities[mobile.activeUtility] }
    return route
  }
  const focused = useWindowStore.getState().getFocusedWindow()
  if (!focused || focused.state === 'minimized') return route
  const category = useFinderStore.getState().currentCategory
  if (focused.app === 'project')
    return {
      ...route,
      view: 'project',
      project: String(focused.payload?.projectId ?? ''),
      category,
    }
  if (focused.app === 'finder') return { ...route, view: 'projects', category }
  const view = { photos: 'photos', notes: 'about', settings: 'settings', contact: 'contact' }[
    focused.app as 'photos' | 'notes' | 'settings' | 'contact'
  ] as View | undefined
  return { ...route, view: view ?? 'home' }
}

function address(route: Route) {
  const url = new URL(window.location.href)
  for (const key of ['view', 'project', 'category', 'page', 'lang']) url.searchParams.delete(key)
  if (route.project) url.searchParams.set('project', route.project)
  else if (route.view !== 'home') url.searchParams.set('view', route.view)
  if ((route.view === 'projects' || route.view === 'project') && route.category)
    url.searchParams.set('category', route.category)
  if (route.view === 'home' && route.page !== 1)
    url.searchParams.set('page', route.page === 0 ? 'take-a-look' : 'personal')
  if (route.locale === 'it') url.searchParams.set('lang', 'it')
  return url.pathname + url.search + url.hash
}

function apply(route: Route, platform: Platform, explicit: boolean) {
  useLocaleStore.getState().setLocale(route.locale)
  const mobile = useMobileStore.getState()
  const desktop = useWindowStore.getState()
  if (platform === 'mobile') {
    const base = {
      activeCategory: route.category,
      activeProjectId: null,
      activeUtility: null,
      homePage: route.page,
    }
    if (route.view === 'project') {
      useMobileStore.setState({
        ...base,
        screen: 'project',
        activeProjectId: route.project,
        projectReturnScreen: 'app',
      })
    } else if (route.view === 'projects') {
      useMobileStore.setState({ ...base, screen: 'app' })
    } else if (route.view === 'home') {
      useMobileStore.setState({
        ...base,
        screen: explicit || mobile.screen !== 'lock' ? 'home' : 'lock',
      })
    } else {
      const utility = Object.entries(utilities).find(
        ([, view]) => view === route.view
      )![0] as MobileUtility
      useMobileStore.setState({ ...base, screen: 'utility', activeUtility: utility })
    }
    return
  }
  useMobileStore.setState({ homePage: route.page })
  if (route.view === 'home') {
    // Browser Back reveals the desktop without destroying its open windows.
    useWindowStore.setState({
      windows: desktop.windows.map((win) => ({
        ...win,
        restoreState: win.state === 'maximized' ? 'maximized' : win.restoreState,
        state: 'minimized',
        isFocused: false,
      })),
    })
    return
  }
  if (route.view === 'projects' || route.view === 'project') {
    useFinderStore.getState().setCategory(route.category)
    desktop.openWindow('finder', undefined, undefined, { category: route.category })
    if (route.project) {
      const project = getProjectBySlug(route.project, route.locale)
      if (project) desktop.openWindow('project', project.title, 'lg', { projectId: project.id })
    }
    return
  }
  const apps: Partial<Record<View, WindowApp>> = {
    about: 'notes',
    photos: 'photos',
    settings: 'settings',
    contact: 'contact',
    contacts: 'contact',
  }
  desktop.openWindow(
    apps[route.view]!,
    undefined,
    undefined,
    route.view === 'about' ? { noteId: 'bio' } : undefined
  )
}

/** One browser address for the active content in every shell; no parallel content registry. */
export function usePortfolioNavigation(platform: Platform | null) {
  const initialized = useRef(false)
  useEffect(() => {
    if (!platform) return
    let applying = false
    let disposed = false
    let scheduled = false
    const requested = fromUrl()
    const explicit = requested.view !== 'home' || requested.page !== 1
    const changingShell = initialized.current
    initialized.current = true
    applying = true
    // Keep the approved persisted desktop session on a fresh, plain landing.
    if (explicit || platform === 'mobile' || changingShell)
      apply(requested, platform, explicit || changingShell)
    else useLocaleStore.getState().setLocale(requested.locale)
    applying = false

    const title = (route: Route) => {
      const project = route.project ? getProjectBySlug(route.project, route.locale) : undefined
      document.title = project ? `${project.title} — Carlo Desantis` : profile.seo.title
    }
    let current = fromShell(platform)
    window.history.replaceState(window.history.state, '', address(current))
    title(current)
    const sync = () => {
      if (applying || disposed || scheduled) return
      scheduled = true
      queueMicrotask(() => {
        scheduled = false
        if (disposed || applying) return
        const next = fromShell(platform)
        const url = address(next)
        const previous = address(current)
        if (url !== previous) {
          // Changing language keeps the same place in the Back stack.
          const onlyLocale = address({ ...current, locale: next.locale }) === url
          const state = onlyLocale ? window.history.state : { portfolioPrevious: address(current) }
          window.history[onlyLocale ? 'replaceState' : 'pushState'](state, '', url)
          current = next
          title(next)
        }
      })
    }
    const pop = () => {
      applying = true
      const next = fromUrl()
      apply(next, platform, true)
      current = next
      title(next)
      applying = false
    }
    const unsubscribers = [
      useMobileStore.subscribe(sync),
      useWindowStore.subscribe(sync),
      useFinderStore.subscribe(sync),
      useLocaleStore.subscribe(sync),
    ]
    window.addEventListener('popstate', pop)
    return () => {
      disposed = true
      unsubscribers.forEach((unsubscribe) => unsubscribe())
      window.removeEventListener('popstate', pop)
    }
  }, [platform])
}

export function backFromProject() {
  if (typeof window.history.state?.portfolioPrevious === 'string') window.history.back()
  else useMobileStore.getState().goBack()
}
