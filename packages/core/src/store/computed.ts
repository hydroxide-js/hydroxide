import { createEffect } from '../createEffect'
import { Phase } from '../phases'
import { createReactive, Reactive } from './reactive'

export function computed<T>(computeFn: () => T): Reactive<T> {
  const reactive = createReactive(null as unknown as T)

  // ignore the initial value set on computed reactive
  reactive._.ignore = true

  createEffect(() => {
    reactive.value = computeFn()
  }, Phase.computed)

  reactive._.ignore = false

  return reactive
}
