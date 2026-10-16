import { PortfolioOverview } from '@/components/seo/PortfolioOverview'
import { pageMetadata } from '@/lib/seo'
import { profile } from '@/core/registries/profile'
export const metadata = pageMetadata(
  'Carlo Desantis | UX/UI, Sviluppo Web e Direzione Creativa',
  profile.seo.description.it,
  '/it/work',
  'it'
)
export default function Work() {
  return <PortfolioOverview locale="it" />
}
