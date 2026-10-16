import { notFound } from 'next/navigation'
import { getProjects } from '@/core/registries/projects'
import { ProjectPage } from '@/components/seo/ProjectPage'
import { pageMetadata, workPath } from '@/lib/seo'
export const dynamicParams = false
export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    project = getProjects().find((p) => p.slug === slug)
  if (!project) return notFound()
  return pageMetadata(
    `${project.title} | Carlo Desantis`,
    project.summary,
    workPath('en', slug),
    'en'
  )
}
export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params,
    project = getProjects().find((p) => p.slug === slug)
  if (!project) return notFound()
  return <ProjectPage project={project} locale="en" />
}
