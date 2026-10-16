import { profile } from './profile'
import { identity } from './identity'
import { getProjects } from './projects'
import type { Locale } from '@/types'

/** Only available, approved media. All three experiences read this collection. */
const portraits = [
  {
    id: 'carlo-portrait',
    src: profile.portrait,
    alt: identity.name,
    album: 'portraits',
    width: 800,
    height: 800,
  },
] as const

function collection(locale: Locale) {
  return [
    ...portraits,
    ...getProjects(locale)
      .filter((project) => project.mediaLayout === 'editorial')
      .flatMap((project) =>
        project.gallery.map((image) => ({
          id: `${project.id}-${image.src.split('/').pop()}`,
          src: image.src,
          alt: `${project.title} · ${image.caption}`,
          album: project.id,
          width: image.width,
          height: image.height,
        }))
      ),
  ]
}
const collections = { en: collection('en'), it: collection('it') }
export const getPhotos = (locale: Locale = 'en') => collections[locale]
export const photos = getPhotos('en')
