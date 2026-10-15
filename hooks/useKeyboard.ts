import { useEffect, useCallback } from 'react'
import { useWindowStore } from '@/store/windowStore'
import { useSpotlightStore } from '@/store/spotlightStore'
import { useCommandStore } from '@/store/commandStore'
import { useQuickLookStore } from '@/store/quickLookStore'
import { useDesktopStore } from '@/store/desktopStore'

export function useGlobalKeyboard() {
  const { getFocusedWindow, closeWindow, minimizeWindow } = useWindowStore()
  const { open: openSpotlight, isOpen: spotlightOpen } = useSpotlightStore()
  const { open: openCommand, isOpen: commandOpen } = useCommandStore()
  const { open: openQuickLook, close: closeQuickLook, isOpen: quickLookOpen } = useQuickLookStore()
  const { selectedProjectId } = useDesktopStore()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.defaultPrevented || (e.target as HTMLElement).closest('dialog[open]')) return
      // ⌘+Space — Spotlight (global, no window required)
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault()
        openSpotlight()
        return
      }

      // ⌘+K — Command Palette (global)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openCommand()
        return
      }

      // Escape — close overlays first, then focused window
      if (e.key === 'Escape') {
        if (quickLookOpen) {
          closeQuickLook()
          return
        }
        if (spotlightOpen || commandOpen) return // handled by those components
        // Escape belongs to the active field while composing or choosing a value.
        if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]'))
          return
        const focused = getFocusedWindow()
        if (focused) closeWindow(focused.id)
        return
      }

      // Space — Quick Look on selected project (only when no overlay is open)
      if (e.key === ' ' && !spotlightOpen && !commandOpen && !quickLookOpen) {
        const target = e.target as HTMLElement
        if (target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return
        if (selectedProjectId) {
          e.preventDefault()
          openQuickLook(selectedProjectId)
          return
        }
      }

      // Window-specific shortcuts
      const focused = getFocusedWindow()
      if (!focused) return

      // ⌘+W — close focused window
      if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        e.preventDefault()
        closeWindow(focused.id)
        return
      }

      // ⌘+M — minimize focused window
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault()
        minimizeWindow(focused.id)
        return
      }
    },
    [
      getFocusedWindow,
      closeWindow,
      minimizeWindow,
      openSpotlight,
      spotlightOpen,
      openCommand,
      commandOpen,
      openQuickLook,
      closeQuickLook,
      quickLookOpen,
      selectedProjectId,
    ]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
