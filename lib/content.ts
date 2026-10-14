import { getProfileNote } from '@/core/registries/profile'
import { getProjects } from '@/core/registries/projects'
import { photos } from '@/core/registries/photos'
import type { Locale, NoteEntry, PhotoAlbum, Project } from '@/types'

export { getProjects }

// English is the landing locale; localized selectors feed every device view.
export const projects = getProjects('en')
export const notes: NoteEntry[] = [getProfileNote('en')]

export const albums: PhotoAlbum[] = [
  {
    id: 'portraits',
    title: 'Portraits',
    coverPhoto: photos[0].src,
    photos: photos.map((photo) => photo.src),
    count: photos.length,
  },
]

export function getProjectBySlug(slug: string, locale: Locale = 'en'): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug)
}

export function getProjectsByCategory(category: string, locale: Locale = 'en'): Project[] {
  return getProjects(locale).filter((project) => project.category === category)
}

export function getFeaturedProjects(locale: Locale = 'en'): Project[] {
  return getProjects(locale).filter((project) => project.featured)
}

export function getNotes(locale: Locale): NoteEntry[] {
  return [getProfileNote(locale)]
}

export function getNoteBySlug(slug: string, locale: Locale = 'en'): NoteEntry | undefined {
  return getNotes(locale).find((note) => note.slug === slug)
}
