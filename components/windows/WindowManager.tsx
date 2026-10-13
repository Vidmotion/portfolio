'use client'

import { AnimatePresence } from 'framer-motion'
import { useLayoutEffect } from 'react'
import { useWindowStore } from '@/store/windowStore'
import { OSWindow } from './OSWindow'
import { FinderApp } from '@/components/apps/FinderApp'
import { ProjectApp } from '@/components/apps/ProjectApp'
import { PhotosApp } from '@/components/apps/PhotosApp'
import { NotesApp } from '@/components/apps/NotesApp'
import { SettingsApp } from '@/components/apps/SettingsApp'
import { SpotifyWidget } from '@/components/widgets/SpotifyWidget'
import appStyles from '@/components/apps/AppResponsive.module.css'
import type { OSWindow as OSWindowType, WindowApp, ProjectCategory } from '@/types'

function AppContent({ win }: { win: OSWindowType }) {
  const payload = win.payload ?? {}

  const appMap: Record<WindowApp, React.ReactNode> = {
    finder: (
      <FinderApp
        initialCategory={(payload.category as ProjectCategory) ?? null}
        navigationRequest={win.payload}
      />
    ),
    project: <ProjectApp projectId={(payload.projectId as string) ?? ''} />,
    photos: <PhotosApp />,
    notes: (
      <NotesApp
        initialNoteId={payload.noteId as string | undefined}
        navigationRequest={win.payload}
      />
    ),
    settings: <SettingsApp />,
    spotify: (
      <div className={appStyles.music}>
        <SpotifyWidget />
      </div>
    ),
  }

  return <>{appMap[win.app] ?? null}</>
}

export function WindowManager() {
  const { windows } = useWindowStore()
  const fitToViewport = useWindowStore((s) => s.fitToViewport)
  useLayoutEffect(() => {
    fitToViewport()
    let frame = 0
    const resize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fitToViewport)
    }
    window.addEventListener('resize', resize)
    const unsubscribe = useWindowStore.persist.onFinishHydration(fitToViewport)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
      unsubscribe()
    }
  }, [fitToViewport])

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 'var(--z-windows)' }}
      aria-live="polite"
    >
      <AnimatePresence>
        {windows.map((win) => (
          <div key={win.id} className="pointer-events-auto">
            <OSWindow window={win}>
              <AppContent win={win} />
            </OSWindow>
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
