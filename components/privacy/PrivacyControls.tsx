'use client'
import { useLocaleStore } from '@/store/localeStore'
import { useExternalMediaStore } from '@/store/externalMediaStore'
import { privacyPath, workPath } from '@/lib/seo'

export function PrivacyControls() {
  const locale = useLocaleStore((s) => s.locale),
    it = locale === 'it'
  const enabled = useExternalMediaStore((s) => s.spotify),
    setSpotify = useExternalMediaStore((s) => s.setSpotify)
  return (
    <section
      aria-label={it ? 'Privacy e contenuti esterni' : 'Privacy and external content'}
      style={{ marginTop: 28, fontSize: 13, lineHeight: 1.6, color: 'var(--ui-ink)' }}
    >
      <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
        {it ? 'Privacy e contenuti esterni' : 'Privacy & external content'}
      </h2>
      <p>
        {it
          ? 'Il player Spotify si connette al servizio esterno solo con il tuo consenso, valido per questa visita.'
          : 'The Spotify player connects to an external service only with your consent, for this visit.'}
      </p>
      <button
        type="button"
        onClick={() => setSpotify(!enabled)}
        style={{
          margin: '10px 0',
          padding: '8px 12px',
          border: '1px solid var(--ui-muted)',
          borderRadius: 10,
          color: 'var(--ui-ink)',
          background: 'var(--ui-raised)',
        }}
      >
        {enabled
          ? it
            ? 'Disabilita Spotify'
            : 'Disable Spotify'
          : it
            ? 'Abilita Spotify'
            : 'Enable Spotify'}
      </button>
      <p>
        <a
          href={privacyPath(locale)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline' }}
        >
          {it ? 'Privacy e cookie' : 'Privacy & cookies'} ↗
        </a>
      </p>
      <p>
        <a
          href={workPath(locale)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline' }}
        >
          {it ? 'Indice dei progetti e profilo' : 'Project index & profile'} ↗
        </a>
      </p>
    </section>
  )
}
