import type { ApplicationId } from '@/core/registries/apps'
import type { ProjectCategory } from '@/types'

export const menuBarNav: Array<{
  label: string
  appId: ApplicationId
  category?: ProjectCategory
}> = [
  { label: 'Projects', appId: 'finder' },
  { label: 'Playlist', appId: 'spotify' },
]
