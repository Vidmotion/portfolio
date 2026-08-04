import type { ProjectCategory } from '@/types'

export type CategoryDefinition = {
  id: ProjectCategory
  label: string
}

export const categories: CategoryDefinition[] = [
  { id: 'film', label: 'Film' },
  { id: 'photography', label: 'Photography' },
  { id: 'creative-direction', label: 'Creative Direction' },
  { id: 'music', label: 'Music' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'advertising', label: 'Advertising' },
]

export function categoryLabel(id: ProjectCategory): string {
  return categories.find((c) => c.id === id)?.label ?? id
}
