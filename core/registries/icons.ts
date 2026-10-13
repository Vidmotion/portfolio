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
} satisfies Record<ApplicationId, IconId>

export function iconSource(id: IconId, appearance: 'neutral' | 'mobile' = 'neutral') {
  return `/icons/${appearance === 'mobile' ? 'brand' : 'shared'}/${id}.png`
}
