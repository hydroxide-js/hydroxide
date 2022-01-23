import { createEffect } from './createEffect'
import { createReactive, Reactive } from './reactive'

// TODO: make the reactive readonly for outside world

export function computed<T>(computeFn: () => T): Reactive<T> {
  const reactive = createReactive(null as unknown as T)

  createEffect(() => {
    reactive.val = computeFn()
  })

  return reactive
}
