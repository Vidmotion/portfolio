import type { ApplicationId } from '@/core/registries/apps'

export const menuBarNav: Array<{ label: string; appId: ApplicationId }> = [
  { label: 'Projects', appId: 'finder' },
  { label: 'Digital', appId: 'photos' },
  { label: 'Playlist', appId: 'spotify' },
]
