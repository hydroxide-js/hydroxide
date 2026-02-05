import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata } from 'next'
import './global.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SandpackCSS } from '@/components/sandpack-styles'

const siteUrl = 'https://hydroxide-js.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hydroxide — High-Performance Reactive JavaScript Framework',
    template: '%s | Hydroxide'
  },
  description:
    'High-performance reactive JavaScript framework. No Virtual DOM, no re-renders, no dependency arrays. Fine-grained reactivity for blazing fast web apps.',
  keywords: [
    'JavaScript framework',
    'reactive',
    'fine-grained reactivity',
    'no virtual DOM',
    'performance',
    'signals',
    'frontend',
    'UI framework',
    'web development'
  ],
  authors: [{ name: 'Hydroxide Team' }],
  creator: 'Hydroxide Team',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Hydroxide',
    title: 'Hydroxide — High-Performance Reactive JavaScript Framework',
    description:
      'High-performance reactive JavaScript framework. No Virtual DOM, no re-renders, no dependency arrays.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydroxide — High-Performance Reactive JavaScript Framework',
    description:
      'High-performance reactive JavaScript framework. No Virtual DOM, no re-renders, no dependency arrays.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <SandpackCSS />
      </head>
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider
          theme={{
            enabled: false,
            defaultTheme: 'dark'
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
