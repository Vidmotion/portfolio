import Link from 'next/link'
import type { Locale } from '@/types'
import { identity } from '@/core/registries/identity'
import { privacyPath, workPath } from '@/lib/seo'
import styles from './PublicPage.module.css'

export function PublicPage({
  locale,
  alternate,
  children,
}: {
  locale: Locale
  alternate: string
  children: React.ReactNode
}) {
  const it = locale === 'it'
  return (
    <div className={styles.page} lang={locale}>
      <header className={styles.header}>
        <Link href="/">{identity.name}</Link>
        <nav
          className={styles.nav}
          aria-label={it ? 'Navigazione portfolio' : 'Portfolio navigation'}
        >
          <Link href="/">Portfolio OS</Link>
          <Link href={workPath(locale)}>{it ? 'Progetti e profilo' : 'Projects & profile'}</Link>
          <Link href={alternate} hrefLang={it ? 'en' : 'it'}>
            {it ? 'English' : 'Italiano'}
          </Link>
        </nav>
      </header>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>
        <span>
          © {new Date().getFullYear()} {identity.name}
        </span>
        <a href={`mailto:${identity.email}`}>{identity.email}</a>
        <Link href={privacyPath(locale)}>{it ? 'Privacy e cookie' : 'Privacy & cookies'}</Link>
      </footer>
    </div>
  )
}
