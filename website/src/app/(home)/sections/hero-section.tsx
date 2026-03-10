import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { StarsBackground } from '@/components/ui/shooting-stars'
import { ShootingStars } from '../../../components/ui/shotting-stars'

export function HeroSection() {
  return (
    <section className="isolate relative px-6 min-h-[calc(100vh-60px)] py-32 flex items-center justify-center">
      {/* Subtle grain texture */}
      {/* <StarsBackground starDensity={0.0003} />
      <ShootingStars maxSpeed={10} /> */}

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center relative z-10">
        {/* Alpha badge */}
        <div className="mb-14 inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-muted/50 px-3 py-1 text-xs lg:text-sm font-medium text-fd-muted-foreground backdrop-blur-md">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          In Development
        </div>

        {/* Wordmark */}
        <h1 className="text-[clamp(3rem,16vw,15.2rem)] font-black leading-[0.85] tracking-[-0.04em] text-fd-foreground">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="size-7 animate-bounce text-fd-muted-foreground/60" />
      </div>
    </section>
  )
}
