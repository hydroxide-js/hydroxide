import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative px-6 pb-20 pt-16 md:py-36">
      {/* Subtle grain texture */}

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        {/* Alpha badge */}
        <div className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-muted/50 px-3 py-1 text-xs lg:text-sm font-medium text-fd-muted-foreground">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          In Development
        </div>

        {/* Wordmark */}
        <h1 className="text-[clamp(3rem,16vw,15rem)] font-black leading-[0.85] tracking-[-0.04em] text-fd-foreground">
          HYDROXIDE
        </h1>

        {/* Tagline */}
        <p className="mt-8 max-w-2xl text-sm ld:text-lg leading-relaxed text-fd-muted-foreground md:text-xl">
          High-performance reactive JavaScript framework.
          <br className="hidden md:block" />
          No Virtual DOM. No Re-renders. No Dependency arrays.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/docs"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-fd-foreground px-10 py-2.5 text-sm font-medium text-fd-background transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
