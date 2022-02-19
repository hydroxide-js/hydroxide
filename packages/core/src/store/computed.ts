import { effect } from '../createEffect'
import { Phases } from '../scheduler/phases'
import { createReactive, Reactive } from './reactive'

export function computed<T>(
  computeFn: () => T,
  recalculateDeps = true
): Reactive<T> {
  const reactive = createReactive(null as unknown as T)

  // ignore the initial value set on computed reactive
  reactive._.ignore = true

  function updateComputed() {
    reactive.value = computeFn()
  }

  effect(updateComputed, recalculateDeps, Phases.computed)

  reactive._.ignore = false

  return reactive
}
