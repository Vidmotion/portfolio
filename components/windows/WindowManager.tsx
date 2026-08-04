'use client'

import { AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import { OSWindow } from './OSWindow'
import { FinderApp } from '@/components/apps/FinderApp'
import { ProjectApp } from '@/components/apps/ProjectApp'
import { PhotosApp } from '@/components/apps/PhotosApp'
import { NotesApp } from '@/components/apps/NotesApp'
import { SettingsApp } from '@/components/apps/SettingsApp'
import { SpotifyWidget } from '@/components/widgets/SpotifyWidget'
import type { OSWindow as OSWindowType, WindowApp, ProjectCategory } from '@/types'

function AppContent({ win }: { win: OSWindowType }) {
  const payload = win.payload ?? {}

  const appMap: Record<WindowApp, React.ReactNode> = {
    finder: <FinderApp initialCategory={(payload.category as ProjectCategory) ?? null} />,
    project: <ProjectApp projectId={(payload.projectId as string) ?? ''} />,
    photos: <PhotosApp />,
    notes: <NotesApp />,
    settings: <SettingsApp />,
    spotify: (
      <div
        className="flex items-center justify-center h-full"
        style={{ background: '#0a0a0b', padding: '32px' }}
      >
        <SpotifyWidget />
      </div>
    ),
  }

  return <>{appMap[win.app] ?? null}</>
}

export function WindowManager() {
  const { windows } = useWindowStore()

  const visibleWindows = windows.filter((w) => w.state !== 'minimized')

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 'var(--z-windows)' }}
      aria-live="polite"
    >
      <AnimatePresence>
        {visibleWindows.map((win) => (
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
