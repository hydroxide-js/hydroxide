// clone a reactive object

import { createReactive, Reactive } from '../store/reactive'

export function cloneReactive<T>(reactive: Reactive<T>) {
  const clone = createReactive(reactive.value)
  reactive.subscribe(() => {
    clone.value = reactive.value
  })

  return clone
}
