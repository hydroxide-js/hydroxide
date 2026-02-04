import { CounterDemo } from '@/components/demos/counter'
import { SectionLabel } from './section-label'

export function ReactivitySection() {
  return (
    <section className="border-t border-fd-border bg-fd-muted/30 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>Reactivity</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
            Fine-grained updates.
            <span className="text-fd-muted-foreground"> Zero overhead.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-fd-muted-foreground">
            Hydroxide uses fine-grained reactivity - no Virtual DOM, no diffing, no
            reconciliation. When state changes, only the specific DOM nodes that depend on
            it update surgically. Components run once. Reactive values handle the rest.
          </p>
        </div>

        <CounterDemo />
      </div>
    </section>
  )
}
