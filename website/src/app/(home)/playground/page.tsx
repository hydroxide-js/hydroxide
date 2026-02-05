import { CompilerPlayground } from '@/components/compiler-playground'

export default function CompilerPage() {
  return (
    <div className="max-w-(--fd-layout-width) mx-auto px-4 w-full grow flex flex-col py-10">
      <CompilerPlayground />
    </div>
  )
}
