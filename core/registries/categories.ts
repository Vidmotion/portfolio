import type { ProjectCategory } from '@/types'

export type CategoryDefinition = {
  id: ProjectCategory
  label: string
}

export const categories: CategoryDefinition[] = [
  { id: 'creative-direction', label: 'Creative Direction' },
  { id: 'digital', label: 'Digital' },
  { id: 'film-making', label: 'Film Making' },
]

/** Accept old category IDs from previously persisted Finder window payloads. */
export function normalizeCategory(id: string | null | undefined): ProjectCategory | null {
  if (id === 'digital') return 'digital'
  if (id === 'film' || id === 'music' || id === 'film-making') return 'film-making'
  if (['photography', 'fashion', 'advertising', 'creative-direction'].includes(id ?? '')) {
    return 'creative-direction'
  }
  return null
}

export function categoryLabel(id: ProjectCategory): string {
  return categories.find((c) => c.id === id)?.label ?? id
}
