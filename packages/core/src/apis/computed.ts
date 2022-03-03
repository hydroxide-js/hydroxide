import { Phases } from '../scheduler/phases'
import { createReactive } from './createReactive'
import { effect } from './effect'

export function computed<T>(computeFn: () => T, recalculateDeps = true) {
  const reactive = createReactive(null as unknown as T)

  // ignore the initial value set on computed reactive by turning off tracking
  reactive.track = false

  function updateComputed() {
    reactive.value = computeFn()
  }

  effect(updateComputed, recalculateDeps, Phases.computed)

  reactive.track = true

  return reactive
}
