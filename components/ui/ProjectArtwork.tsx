import Image from 'next/image'
import type { Project } from '@/types'

/** Shared imagery for cards, previews and covers in every device experience. */
export function ProjectArtwork({
  project,
  sizes = '(max-width: 767px) 100vw, 900px',
}: {
  project: Project
  sizes?: string
}) {
  if (!project.cover) return null

  return (
    <Image
      src={project.cover}
      alt=""
      fill
      sizes={sizes}
      draggable={false}
      style={{ objectFit: 'cover', objectPosition: 'center top' }}
    />
  )
}
