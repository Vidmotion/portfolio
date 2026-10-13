import { useCallback } from 'react'
import { useWindowStore } from '@/store/windowStore'
import { apps } from '@/core/registries/apps'

/** Generic "launch an Application" mechanism, independent of any single caller
 *  (Dock, Menu Bar, Command Palette, Tablet, Spotlight all consume this rather
 *  than each hardcoding their own window title/size). */
export function useApplicationLauncher() {
  const openWindow = useWindowStore((s) => s.openWindow)

  const launch = useCallback(
    (appId: string, payload?: Record<string, unknown>) => {
      const app = apps.find((a) => a.id === appId)
      if (!app) return

      if (app.href) {
        window.open(app.href, '_blank', 'noopener noreferrer')
        return
      }

      if (app.app) {
        openWindow(app.app, undefined, undefined, payload)
      }
    },
    [openWindow]
  )

  return { launch }
}
