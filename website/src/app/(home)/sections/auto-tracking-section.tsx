import { EffectDemo } from '@/components/demos/effect'
import { SectionLabel } from './section-label'

export function AutoTrackingSection() {
  return (
    <section className="border-t border-fd-border px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>No Dependency Arrays</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
            Automatic tracking.
            <span className="text-fd-muted-foreground"> Fewer bugs.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-fd-muted-foreground">
            Forget manual dependency arrays. Hydroxide&apos;s runtime automatically tracks
            which reactive values your effects read. No stale closures. No missing
            dependencies. No lint rules to fight.
          </p>
        </div>

        <EffectDemo />
      </div>
    </section>
  )
}
