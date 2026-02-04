import { RootProvider } from 'fumadocs-ui/provider/next'
import './global.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
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
