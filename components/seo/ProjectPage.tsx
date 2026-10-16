import Link from 'next/link'
import type { Locale, Project } from '@/types'
import { ProjectStory } from '@/components/apps/ProjectStory'
import { projectSchema, workPath } from '@/lib/seo'
import { JsonLd } from './JsonLd'
import { PublicPage } from './PublicPage'

export function ProjectPage({ project, locale }: { project: Project; locale: Locale }) {
  const it = locale === 'it'
  return (
    <PublicPage locale={locale} alternate={workPath(it ? 'en' : 'it', project.slug)}>
      <JsonLd data={projectSchema(project, locale)} />
      <p>
        <Link href={workPath(locale)}>← {it ? 'Tutti i progetti' : 'All projects'}</Link>
      </p>
      <h1>{project.title}</h1>
      <ProjectStory project={project} locale={locale} />
      <p>
        <Link href="/">{it ? 'Esplora Portfolio OS' : 'Explore Portfolio OS'} ↗</Link>
      </p>
    </PublicPage>
  )
}
