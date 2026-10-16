import type { Locale } from '@/types'
import { privacyCopy, privacyUpdated } from '@/core/registries/privacy'
import { PublicPage } from '@/components/seo/PublicPage'
import { privacyPath } from '@/lib/seo'
import styles from '@/components/seo/PublicPage.module.css'

function Paragraph({ text }: { text: string }) {
  return (
    <p>
      {text.split(/(https?:\/\/[^\s)]+|info@carlodesantis\.com)/g).map((part, i) =>
        part === 'info@carlodesantis.com' ? (
          <a key={i} href={`mailto:${part}`}>
            {part}
          </a>
        ) : part.startsWith('https://') ? (
          <span key={i}>
            <a href={part.replace(/[.,;:!?]+$/, '')}>{part.replace(/[.,;:!?]+$/, '')}</a>
            {part.match(/[.,;:!?]+$/)?.[0]}
          </span>
        ) : (
          part
        )
      )}
    </p>
  )
}
export function PrivacyPage({ locale }: { locale: Locale }) {
  const copy = privacyCopy[locale]
  return (
    <PublicPage locale={locale} alternate={privacyPath(locale === 'it' ? 'en' : 'it')}>
      <article className={styles.legal}>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((text) => (
              <Paragraph text={text} key={text} />
            ))}
          </section>
        ))}
        <small>
          {locale === 'it' ? 'Ultimo aggiornamento' : 'Last updated'}:{' '}
          <time dateTime={privacyUpdated}>16 {locale === 'it' ? 'ottobre' : 'October'} 2026</time>
        </small>
      </article>
    </PublicPage>
  )
}
