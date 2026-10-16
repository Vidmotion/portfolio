import { PrivacyPage } from '@/components/privacy/PrivacyPage'
import { pageMetadata } from '@/lib/seo'
export const metadata = pageMetadata(
  'Privacy e cookie | Carlo Desantis',
  'Informazioni su richieste di contatto, dati tecnici, preferenze locali e contenuti Spotify facoltativi nel portfolio di Carlo Desantis.',
  '/it/privacy',
  'it'
)
export default function Privacy() {
  return <PrivacyPage locale="it" />
}
