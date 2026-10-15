import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // The query-based OS views share the homepage's canonical URL.
  return [{ url: 'https://portfolio.carlodesantis.com/', changeFrequency: 'monthly', priority: 1 }]
}
