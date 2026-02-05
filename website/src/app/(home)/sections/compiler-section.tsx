import { CounterCompiledDemo } from '@/components/demos/counter'
import { SectionLabel } from './section-label'

export function CompilerSection() {
  return (
    <section className="border-t border-fd-border px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>Compiler</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
            Compiled to
            <span className="text-fd-muted-foreground"> optimal DOM manipulation.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-fd-muted-foreground">
            The Hydroxide compiler transforms your JSX into optimal DOM manipulation code
            by extracting out static parts to templates and writing the most performant
            way to update the DOM nodes
          </p>
        </div>

        <CounterCompiledDemo />
      </div>
    </section>
  )
}
