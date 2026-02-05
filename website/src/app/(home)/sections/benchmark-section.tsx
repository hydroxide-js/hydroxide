import Link from 'next/link'
import { BenchmarkChart } from '@/components/benchmark-chart'
import { SectionLabel } from './section-label'

const benchmarks = [
  { name: 'Vanilla', score: 1.0 },
  { name: 'Hydroxide', score: 1.05, highlight: true },
  { name: 'Solid', score: 1.11 },
  { name: 'Svelte', score: 1.13 },
  { name: 'Vue', score: 1.31 },
  { name: 'React', score: 1.61 }
]

export function BenchmarkSection() {
  return (
    <section className="border-t border-fd-border px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionLabel>Performance</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
            Ultra High Performance
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-fd-muted-foreground">
            Hydroxide delivers exceptional runtime performance by eliminating unnecessary
            work. No virtual DOM diffing. No tree reconciliation. Just surgical updates
            directly to the exact nodes that change.
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-fd-muted-foreground">
            Benchmarked on{' '}
            <Link
              href="https://github.com/hydroxide-js/hydroxide?tab=readme-ov-file#performance-benchmark"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fd-primary underline-offset-2 decoration-fd-muted-foreground/50"
            >
              JS Framework Benchmark
            </Link>
            - the standard for comparing framework performance
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <BenchmarkChart benchmarks={benchmarks} />
          <p className="mt-7 text-xs text-fd-muted-foreground text-center leading-relaxed">
            Scores show geometric mean across all operations. <br /> Lower scores indicate
            faster performance. 1.0 is vanilla JavaScript baseline.
          </p>
        </div>
      </div>
    </section>
  )
}
