import Image from 'next/image'
import type { Project } from '@/types'

/** Legible cover captions on the same solid brand colour in every shell. */
export function projectCoverTextColor(project: Project) {
  if (!project.preview) return '#fff'
  const hex = project.preview.background.replace('#', '')
  const rgb = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const luminance = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
  return 1.05 / (luminance + 0.05) >= 4.5 ? '#fff' : '#000'
}

/** Shared imagery for cards, previews and covers in every device experience. */
export function ProjectArtwork({
  project,
  sizes = '(max-width: 767px) 100vw, 900px',
}: {
  project: Project
  sizes?: string
}) {
  if (!project.cover) return null

  if (project.preview) {
    const { background, tone, logoWidth = 44, logoHeight = 30 } = project.preview
    const logoSizes = /^\d+px$/.test(sizes)
      ? `${Math.ceil(parseInt(sizes, 10) / 2)}px`
      : '(max-width: 767px) 50vw, 480px'
    return (
      <div
        data-project-artwork={project.id}
        data-artwork-kind="brand"
        style={{ position: 'absolute', inset: 0, background }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${logoWidth}%`,
            maxWidth: '224px',
            height: `${logoHeight}%`,
          }}
        >
          <Image
            src={project.cover}
            alt=""
            fill
            quality={90}
            sizes={logoSizes}
            draggable={false}
            style={{
              objectFit: 'contain',
              filter:
                tone === 'black'
                  ? 'brightness(0)'
                  : tone === 'white'
                    ? 'brightness(0) invert(1)'
                    : undefined,
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <Image
      src={project.cover}
      data-project-artwork={project.id}
      data-artwork-kind="photo"
      alt=""
      fill
      sizes={sizes}
      draggable={false}
      style={{ objectFit: 'cover', objectPosition: project.coverPosition ?? 'center' }}
    />
  )
}
