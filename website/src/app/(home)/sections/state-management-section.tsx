import { DeepUpdateDemo } from '@/components/demos/deep-update'
import { SectionLabel } from './section-label'

export function StateManagementSection() {
  return (
    <section className="border-t border-fd-border bg-fd-muted/30 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>State Management</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
            Ergonomic APIs.
            <span className="text-fd-muted-foreground"> Complex state made simple.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-fd-muted-foreground">
            First-class support for nested objects, arrays, and deep updates. No reducers,
            no immutable update patterns, no boilerplate. Just call the reactive with a
            path and update directly.
          </p>
        </div>

        <DeepUpdateDemo />
      </div>
    </section>
  )
}
