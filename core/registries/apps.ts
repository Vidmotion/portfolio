import type { WindowApp, WindowSizePreset } from '@/types'
import { identity } from '@/core/registries/identity'

export type ApplicationId =
  'finder' | 'photos' | 'notes' | 'spotify' | 'settings' | 'mail' | 'instagram' | 'linkedin'

export type ApplicationDefinition = {
  id: ApplicationId
  name: string
  app?: WindowApp
  /** Canonical size a window opens at, regardless of which launcher triggered it. Omitted for apps with no window (external links). */
  defaultWindowSize?: WindowSizePreset
  href?: string
}

export const apps: ApplicationDefinition[] = [
  { id: 'finder', name: 'Finder', app: 'finder', defaultWindowSize: 'xl' },
  { id: 'photos', name: 'Photos', app: 'photos', defaultWindowSize: 'lg' },
  { id: 'notes', name: 'Notes', app: 'notes', defaultWindowSize: 'md' },
  { id: 'spotify', name: 'Spotify', app: 'spotify', defaultWindowSize: 'sm' },
  { id: 'settings', name: 'Settings', app: 'settings', defaultWindowSize: 'md' },
  { id: 'mail', name: 'Messages', app: 'contact', defaultWindowSize: 'lg' },
  {
    id: 'instagram',
    name: 'Instagram',
    href: identity.social.find((s) => s.platform === 'instagram')!.url,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: identity.social.find((s) => s.platform === 'linkedin')!.url,
  },
]
