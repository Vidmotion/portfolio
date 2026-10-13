import { profile } from './profile'
import { identity } from './identity'

/** Only available, approved media. All three experiences read this collection. */
export const photos = [
  {
    id: 'carlo-portrait',
    src: profile.portrait,
    alt: identity.name,
    album: 'portraits',
    width: 800,
    height: 800,
  },
] as const
