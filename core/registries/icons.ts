import definitions from './icons.json'
import type { ApplicationId } from './apps'

export type IconId = keyof typeof definitions
export const icons = definitions
export const appIcons = {
  finder: 'projects',
  notes: 'about',
  photos: 'photos',
  spotify: 'spotify',
  settings: 'settings',
  mail: 'mail',
  instagram: 'instagram',
  linkedin: 'linkedin',
} satisfies Record<ApplicationId, IconId>

export function iconSource(id: IconId) {
  return `/icons/shared/${id}.webp`
}
