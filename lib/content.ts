import { getProfileNote } from '@/core/registries/profile'
import { getProjects } from '@/core/registries/projects'
import { photos } from '@/core/registries/photos'
import type { Locale, NoteEntry, PhotoAlbum, Project } from '@/types'

export { getProjects }

// English is the landing locale; localized selectors feed every device view.
export const projects = getProjects('en')
export const notes: NoteEntry[] = [getProfileNote('en')]

export const albums: PhotoAlbum[] = [...new Set(photos.map((photo) => photo.album))].map((id) => {
  const collection = photos.filter((photo) => photo.album === id)
  return {
    id,
    title:
      id === 'portraits'
        ? 'Portraits'
        : getProjects('en').find((project) => project.id === id)!.title,
    coverPhoto: collection[0].src,
    photos: collection.map((photo) => photo.src),
    count: collection.length,
  }
})

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
