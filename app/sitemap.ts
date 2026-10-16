import type { MetadataRoute } from 'next'
import { getProjects } from '@/core/registries/projects'
import { absoluteUrl, workPath } from '@/lib/seo'
export default function sitemap(): MetadataRoute.Sitemap {
  const pairs = ['/work', '/privacy', ...getProjects().map((p) => workPath('en', p.slug))]
  return [
    { url: absoluteUrl('/'), priority: 1 },
    ...pairs.flatMap((path) =>
      [path, `/it${path}`].map((localized) => ({
        url: absoluteUrl(localized),
        alternates: {
          languages: {
            en: absoluteUrl(path),
            it: absoluteUrl(`/it${path}`),
            'x-default': absoluteUrl(path),
          },
        },
      }))
    ),
  ]
}
