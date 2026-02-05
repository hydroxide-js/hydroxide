import type { MetadataRoute } from 'next'

const siteUrl = 'https://hydroxide-js.dev'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteUrl}/sitemap.xml`
  }
}
