import type { MouseEvent } from 'react'
import type { Locale } from '@/types'

export function projectHref(id: string, locale: Locale) {
  const params = new URLSearchParams({ project: id })
  if (locale === 'it') params.set('lang', locale)
  return `/?${params}`
}

/** Keep native new-tab, copy-link and keyboard behavior on project previews. */
export function openProjectLink(event: MouseEvent<HTMLAnchorElement>, open: () => void) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  open()
}
