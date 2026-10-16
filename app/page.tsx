import PortfolioExperience from '@/components/os/PortfolioExperience'
import { PortfolioOverview } from '@/components/seo/PortfolioOverview'
import { JsonLd } from '@/components/seo/JsonLd'
import { personSchema, siteUrl } from '@/lib/seo'

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            personSchema('en'),
            {
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              url: siteUrl,
              name: 'Carlo Desantis — Portfolio',
              inLanguage: ['en', 'it'],
              about: { '@id': `${siteUrl}/#carlo-desantis` },
            },
          ],
        }}
      />
      <div id="portfolio-experience">
        <PortfolioExperience />
      </div>
      <noscript>
        <style>{'#portfolio-experience { display: none !important; }'}</style>
        <PortfolioOverview locale="en" />
      </noscript>
    </>
  )
}
