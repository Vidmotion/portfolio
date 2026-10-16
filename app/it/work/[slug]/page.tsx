import { notFound } from 'next/navigation'
import { getProjects } from '@/core/registries/projects'
import { ProjectPage } from '@/components/seo/ProjectPage'
import { pageMetadata, workPath } from '@/lib/seo'
export const dynamicParams = false
export function generateStaticParams() {
  return getProjects('it').map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    project = getProjects('it').find((p) => p.slug === slug)
  if (!project) return notFound()
  return pageMetadata(
    `${project.title} | Carlo Desantis`,
    project.summary,
    workPath('it', slug),
    'it'
  )
}
export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    project = getProjects('it').find((p) => p.slug === slug)
  if (!project) return notFound()
  return <ProjectPage project={project} locale="it" />
}
