'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Locale, Project } from '@/types'
import { uiText } from '@/core/registries/locale'
import styles from './ProjectStory.module.css'
import { MediaLightbox } from '@/components/ui/MediaLightbox'
import { projectHref, openProjectLink } from '@/lib/projectLinks'
import { getFeaturedProjects } from '@/lib/content'
import { useMobileStore } from '@/store/mobileStore'
import { useWindowStore } from '@/store/windowStore'

/** The same case story and media are rendered on Desktop, Tablet and Mobile. */
export function ProjectStory({
  project,
  locale,
  mobile = false,
}: {
  project: Project
  locale: Locale
  mobile?: boolean
}) {
  const text = uiText[locale]
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const selected = getFeaturedProjects(locale)
  const next =
    selected[(selected.findIndex((item) => item.id === project.id) + 1) % selected.length]
  return (
    <article
      className={`${styles.story} ${mobile ? styles.mobile : ''}`}
      data-project-story={project.id}
    >
      <p className={styles.subtitle}>{project.subtitle}</p>
      {project.status === 'in-progress' && <p className={styles.status}>{text.inDevelopment}</p>}
      <p className={styles.description}>{project.description}</p>

      <section className={styles.section}>
        {project.role && (
          <>
            <h2>{text.myRole}</h2>
            <p>{project.role}</p>
          </>
        )}
        <dl className={styles.meta}>
          {project.client && (
            <>
              <dt>{text.client}</dt>
              <dd>{project.client}</dd>
            </>
          )}
          {project.agency && (
            <>
              <dt>{text.agency}</dt>
              <dd>{project.agency}</dd>
            </>
          )}
        </dl>
      </section>

      {project.sections.map((section) => (
        <section className={styles.section} key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}

      {project.deliverables.length > 0 && (
        <section className={styles.section}>
          <h2>{text.deliverables}</h2>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {project.videos?.length ? (
        <section
          className={styles.section}
          aria-label={locale === 'it' ? 'Video del progetto' : 'Project videos'}
        >
          {project.videos.map((video) => (
            <figure className={styles.figure} key={video.src}>
              <video
                data-project-video={project.id}
                src={video.src}
                poster={video.poster}
                width={video.width}
                height={video.height}
                controls
                playsInline
                preload="none"
                aria-label={video.caption}
              />
              <figcaption>{video.caption}</figcaption>
            </figure>
          ))}
        </section>
      ) : null}

      {project.gallery.length > 0 && (
        <section
          className={`${styles.section} ${project.mediaLayout === 'editorial' && project.gallery.length > 2 ? styles.editorial : ''}`}
          aria-label={text.projectGallery}
        >
          {project.gallery.map((image, index) => (
            <figure className={styles.figure} key={image.src}>
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${text.openImage}: ${image.alt}`}
                onClick={(event) =>
                  openProjectLink(event, () => {
                    event.currentTarget.focus({ preventScroll: true })
                    setSelectedImage(index)
                  })
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={
                    project.mediaLayout === 'editorial' && project.gallery.length > 2 && index > 0
                      ? '(max-width: 420px) calc(100vw - 48px), (max-width: 767px) calc(50vw - 32px), 320px'
                      : '(max-width: 767px) calc(100vw - 48px), 720px'
                  }
                />
              </a>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </section>
      )}

      {project.links.length > 0 && (
        <nav className={styles.links} aria-label={text.projectLinks}>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} ↗
            </a>
          ))}
        </nav>
      )}

      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <nav
        className={styles.continue}
        aria-label={locale === 'it' ? 'Continua a esplorare' : 'Keep exploring'}
      >
        {next && next.id !== project.id && (
          <a
            href={projectHref(next.id, locale)}
            onClick={(event) =>
              openProjectLink(event, () =>
                mobile
                  ? useMobileStore.getState().openProject(next.id)
                  : useWindowStore
                      .getState()
                      .openWindow('project', next.title, 'lg', { projectId: next.id })
              )
            }
            data-next-project={next.id}
          >
            <small>{locale === 'it' ? 'Progetto successivo' : 'Next project'}</small>
            <strong>{next.title} ↗</strong>
          </a>
        )}
        <button
          data-project-contact
          onClick={() =>
            mobile
              ? useMobileStore.getState().openUtility('message')
              : useWindowStore.getState().openWindow('contact')
          }
        >
          {text.contact} ↗
        </button>
      </nav>
      <MediaLightbox
        items={project.gallery}
        index={selectedImage}
        onChange={setSelectedImage}
        locale={locale}
        label={text.projectGallery}
      />
    </article>
  )
}
