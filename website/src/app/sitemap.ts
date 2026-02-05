import type { MetadataRoute } from 'next'
import { source } from '@/lib/source'

const siteUrl = 'https://hydroxide.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map(page => ({
    url: `${siteUrl}/docs/${page.slugs.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${siteUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${siteUrl}/playground`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...docs
  ]
}
