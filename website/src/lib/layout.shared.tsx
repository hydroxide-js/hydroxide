import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'HYDROXIDE'
    },
    themeSwitch: {
      enabled: false
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        on: 'nav'
      },
      {
        text: 'Playground',
        url: '/playground'
      }
    ],
    githubUrl: 'https://github.com/hydroxide-js/hydroxide'
  }
}
