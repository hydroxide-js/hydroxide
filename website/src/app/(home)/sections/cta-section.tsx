import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="border-t border-fd-border px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
          In Development
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-fd-muted-foreground">
          Hydroxide is still in development and not ready for production usage. APIs may
          change.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/docs"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-fd-foreground px-6 py-2.5 text-sm font-medium text-fd-background transition-opacity duration-150 ease-out hover:opacity-85"
          >
            Read the Docs
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="https://github.com/hydroxide-js/hydroxide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-fd-border bg-fd-background px-6 py-2.5 text-sm font-medium text-fd-foreground transition-colors duration-150 ease-out hover:bg-fd-muted"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
