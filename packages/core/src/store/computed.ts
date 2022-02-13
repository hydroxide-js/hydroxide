import { createEffect } from '../createEffect'
import { Phases } from '../scheduler/phases'
import { createReactive, Reactive } from './reactive'

export function computed<T>(computeFn: () => T): Reactive<T> {
  const reactive = createReactive(null as unknown as T)

  // ignore the initial value set on computed reactive
  reactive._.ignore = true

  createEffect(() => {
    reactive.value = computeFn()
  }, Phases.computed)

  reactive._.ignore = false

  return reactive
}
