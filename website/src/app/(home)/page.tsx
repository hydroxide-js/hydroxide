import { HeroSection } from './sections/hero-section'
import { BenchmarkSection } from './sections/benchmark-section'
import { ReactivitySection } from './sections/reactivity-section'
import { AutoTrackingSection } from './sections/auto-tracking-section'
import { StateManagementSection } from './sections/state-management-section'
import { CompilerSection } from './sections/compiler-section'
import { CtaSection } from './sections/cta-section'
import { FooterSection } from './sections/footer-section'

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <BenchmarkSection />
      <CompilerSection />
      <ReactivitySection />
      <AutoTrackingSection />
      <StateManagementSection />
      <CtaSection />
      <FooterSection />
    </main>
  )
}
