export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-fd-muted-foreground">
      {children}
    </span>
  )
}
