import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative px-6 pb-20 pt-16 md:py-36">
      {/* Subtle grain texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        {/* Wordmark */}
        <h1 className="text-[clamp(3rem,15vw,12rem)] font-black leading-[0.85] tracking-[-0.04em] text-fd-foreground">
          HYDROXIDE
        </h1>

        {/* Tagline */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground md:text-xl">
          High-performance reactive JavaScript framework.
          <br className="hidden md:block" />
          No Virtual DOM. No re-renders. No dependency arrays.
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
