import { useCallback } from 'react'
import { useDockStore } from '@/store/dockStore'
import { useWindowStore } from '@/store/windowStore'
import { useApplicationLauncher } from '@/hooks/useApplicationLauncher'
import { apps } from '@/core/registries/apps'
import { desktopDock } from '@/core/layouts/desktopDock'

export function useDock() {
  const pinnedIds = useDockStore((s) => s.pinnedIds)
  const magnificationEnabled = useDockStore((s) => s.magnificationEnabled)
  const windows = useWindowStore((s) => s.windows)
  const { launch } = useApplicationLauncher()

  const launchApp = useCallback(
    (appId: string) => {
      launch(appId)
    },
    [launch]
  )

  const dockApps = desktopDock
    .filter((id) => pinnedIds.includes(id))
    .map((id) => {
      const def = apps.find((a) => a.id === id)!
      // Derived directly from the live window list, never a cached flag —
      // an app is "running" exactly while it has an open window, so closing
      // the last one clears the indicator immediately.
      const isRunning = def.app ? windows.some((w) => w.app === def.app) : false
      return { ...def, isRunning }
    })

  return {
    apps: dockApps,
    magnificationEnabled,
    launchApp,
  }
}
