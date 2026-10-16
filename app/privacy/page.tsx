import { PrivacyPage } from '@/components/privacy/PrivacyPage'
import { pageMetadata } from '@/lib/seo'
export const metadata = pageMetadata(
  'Privacy & cookies | Carlo Desantis',
  'How Carlo Desantis handles contact requests, technical data, local preferences and optional Spotify content.',
  '/privacy',
  'en'
)
export default function Privacy() {
  return <PrivacyPage locale="en" />
}
