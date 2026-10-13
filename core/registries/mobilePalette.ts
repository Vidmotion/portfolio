import palette from './mobilePalette.json'
import type { ProjectCategory } from '@/types'

/** Only mobile uses these cover colors; Desktop and Tablet keep their palettes. */
export function mobileCategoryGradient(category: ProjectCategory) {
  const pair =
    category === 'digital'
      ? [palette.powder, palette.ganache]
      : category === 'film-making'
        ? [palette.ganache, palette.berry]
        : [palette.berry, palette.ganache]
  return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
}
