import Image from 'next/image'
import type { Locale, Project } from '@/types'
import { uiText } from '@/core/registries/locale'
import styles from './ProjectStory.module.css'

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
  return (
    <article
      className={`${styles.story} ${mobile ? styles.mobile : ''}`}
      data-project-story={project.id}
    >
      <p className={styles.subtitle}>{project.subtitle}</p>
      {project.status === 'in-progress' && <p className={styles.status}>{text.inDevelopment}</p>}
      <p className={styles.description}>{project.description}</p>

      <section className={styles.section}>
        <h2>{text.myRole}</h2>
        <p>{project.role}</p>
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

      {project.gallery.length > 0 && (
        <section className={styles.section} aria-label={text.projectGallery}>
          {project.gallery.map((image) => (
            <figure className={styles.figure} key={image.src}>
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${text.openImage}: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 767px) calc(100vw - 48px), 720px"
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
    </article>
  )
}
