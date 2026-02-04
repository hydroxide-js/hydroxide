import Link from 'next/link'

const footerLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'Playground', href: '/playground' },
  {
    label: 'GitHub',
    href: 'https://github.com/hydroxide-js/hydroxide',
    external: true
  }
]

export function FooterSection() {
  return (
    <footer className="border-t border-fd-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <span className="font-mono text-[11px] uppercase tracking-wide text-fd-muted-foreground">
          MIT License
        </span>
        <nav className="flex gap-6">
          {footerLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="font-mono text-[11px] uppercase tracking-wide text-fd-muted-foreground transition-colors duration-150 ease-out hover:text-fd-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
