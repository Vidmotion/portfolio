import Image from 'next/image'
import Link from 'next/link'
import { profile } from '@/core/registries/profile'
import { identity } from '@/core/registries/identity'
import { getProjects } from '@/core/registries/projects'
import type { Locale } from '@/types'
import { absoluteUrl, personSchema, siteUrl, workPath } from '@/lib/seo'
import { PublicPage } from './PublicPage'
import { JsonLd } from './JsonLd'
import styles from './PublicPage.module.css'

export function PortfolioOverview({ locale }: { locale: Locale }) {
  const it = locale === 'it',
    projects = getProjects(locale)
  return (
    <PublicPage locale={locale} alternate={workPath(it ? 'en' : 'it')}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            personSchema(locale),
            {
              '@type': 'CollectionPage',
              '@id': absoluteUrl(workPath(locale)),
              name: `${identity.name} — Portfolio`,
              url: absoluteUrl(workPath(locale)),
              inLanguage: locale,
              about: { '@id': `${siteUrl}/#carlo-desantis` },
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: projects.map((project, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: project.title,
                  url: absoluteUrl(workPath(locale, project.slug)),
                })),
              },
            },
          ],
        }}
      />
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{profile.location[locale]}</p>
        <h1>
          {identity.name}
          <br />
          {it ? 'Design digitale e direzione creativa' : 'Digital design & creative direction'}
        </h1>
        <p>{profile.summary[locale]}</p>
        <p>
          <Link href="/">
            {it ? 'Esplora il portfolio interattivo' : 'Explore the interactive portfolio'} ↗
          </Link>
        </p>
        <h2>{it ? 'Chi sono' : 'About me'}</h2>
        {profile.bio[locale].map((text) => (
          <p key={text}>{text}</p>
        ))}
        <ul>
          {profile.expertise[locale].map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <h2>{it ? 'Progetti selezionati' : 'Selected projects'}</h2>
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.id} className={styles.card}>
            <div
              className={styles.artwork}
              style={{ background: project.preview?.background ?? '#ececec' }}
            >
              <Image
                src={project.cover}
                alt={`${project.title} — ${it ? 'anteprima' : 'preview'}`}
                width={120}
                height={80}
                sizes="120px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className={styles.cardCopy}>
              <h3>
                <Link href={workPath(locale, project.slug)} prefetch={false}>
                  {project.title}
                </Link>
              </h3>
              <p>{project.summary}</p>
              <p>{project.role}</p>
            </div>
          </li>
        ))}
      </ul>
      <h2>{it ? 'Lavoriamo insieme' : 'Work with me'}</h2>
      <p>
        {it
          ? 'Per opportunità professionali e collaborazioni:'
          : 'For work opportunities and collaborations:'}{' '}
        <a href={`mailto:${identity.email}`}>{identity.email}</a>.
      </p>
      <p>
        {identity.social.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            style={{ marginRight: 24 }}
            rel="me noopener noreferrer"
            target="_blank"
          >
            {social.label}
          </a>
        ))}
      </p>
    </PublicPage>
  )
}
