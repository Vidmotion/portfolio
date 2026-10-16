import { PortfolioOverview } from '@/components/seo/PortfolioOverview'
import { pageMetadata } from '@/lib/seo'
import { profile } from '@/core/registries/profile'
export const metadata = pageMetadata(
  'Carlo Desantis | UX/UI, Web Development & Creative Direction',
  profile.seo.description.en,
  '/work',
  'en'
)
export default function Work() {
  return <PortfolioOverview locale="en" />
}
