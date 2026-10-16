import type { Metadata } from 'next'
import type { Locale, Project } from '@/types'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'

export const siteUrl = 'https://portfolio.carlodesantis.com'
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href
export const workPath = (locale: Locale, slug?: string) =>
  `${locale === 'it' ? '/it' : ''}/work${slug ? `/${slug}` : ''}`
export const privacyPath = (locale: Locale) => `${locale === 'it' ? '/it' : ''}/privacy`

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  locale: Locale
): Metadata {
  const base = path.replace(/^\/it(?=\/)/, '')
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        en: absoluteUrl(base),
        it: absoluteUrl(`/it${base}`),
        'x-default': absoluteUrl(base),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: 'website',
      siteName: identity.name,
      locale: locale === 'it' ? 'it_IT' : 'en_GB',
      alternateLocale: locale === 'it' ? 'en_GB' : 'it_IT',
      images: [
        {
          url: absoluteUrl('/social-preview.png'),
          width: 1200,
          height: 630,
          alt: `${identity.name} — Portfolio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/social-preview.png')],
    },
  }
}

export function personSchema(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#carlo-desantis`,
    name: identity.name,
    url: siteUrl,
    image: absoluteUrl(profile.portrait),
    jobTitle: profile.title,
    description: profile.summary[locale],
    email: identity.email,
    homeLocation: { '@type': 'Place', name: profile.location[locale] },
    sameAs: identity.social.map((social) => social.url),
    knowsAbout: [...profile.expertise[locale]],
  }
}

export function projectSchema(project: Project, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl(workPath(locale, project.slug))}#project`,
    url: absoluteUrl(workPath(locale, project.slug)),
    name: project.title,
    description: project.summary,
    inLanguage: locale,
    creator: { '@type': 'Person', name: identity.name, '@id': `${siteUrl}/#carlo-desantis` },
    creditText: project.role,
    keywords: project.tags.join(', '),
    image: project.gallery.slice(0, 4).map((image) => absoluteUrl(image.src)),
    ...(project.status === 'in-progress' ? { creativeWorkStatus: 'In progress' } : {}),
  }
}
