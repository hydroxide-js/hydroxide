import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CounterCompiledDemo } from '@/components/demos/counter'
import { Button } from '@/components/ui/button'
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
            The Hydroxide compiler transforms your JSX into optimized DOM operations.
            Templates are hoisted and cloned. Events are delegated. Reactive insertions
            are surgical.
          </p>
          <div className="h-6" />
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/playground" target="_blank">
              View Playground
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <CounterCompiledDemo />
      </div>
    </section>
  )
}
