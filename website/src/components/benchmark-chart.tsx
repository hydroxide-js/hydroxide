'use client'

import { useEffect, useRef, useState } from 'react'

interface Benchmark {
  name: string
  score: number
  highlight?: boolean
}

interface BenchmarkChartProps {
  benchmarks: Benchmark[]
}

export function BenchmarkChart({ benchmarks }: BenchmarkChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-4">
      {benchmarks.map((bench, index) => (
        <div key={bench.name} className="flex items-center gap-4">
          <span className="w-20 text-right font-mono text-xs tabular-nums text-fd-muted-foreground">
            {bench.name}
          </span>
          <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-fd-muted/50">
            <div
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out ${
                bench.highlight ? 'bg-fd-primary' : 'bg-fd-muted-foreground/30'
              }`}
              style={{
                width: isVisible ? `${(bench.score / 1.7) * 100}%` : '0%',
                transitionDelay: `${index * 100}ms`
              }}
            />
          </div>
          <span
            className={`w-10 font-mono text-xs tabular-nums transition-opacity duration-500 ${
              bench.highlight
                ? 'font-semibold text-fd-primary'
                : 'text-fd-muted-foreground'
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 100 + 300}ms`
            }}
          >
            {bench.score.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
}
