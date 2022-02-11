import { createEffect } from '../createEffect'
import { createReactive, Reactive } from './reactive'

export function computed<T>(computeFn: () => T): Reactive<T> {
  const reactive = createReactive(null as unknown as T)

  createEffect(() => {
    reactive.val = computeFn()
  })

  return reactive
}
