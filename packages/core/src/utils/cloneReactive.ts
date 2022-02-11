// clone a reactive object

import { createReactive, Reactive } from '../store/reactive'

export function cloneReactive<T>(reactive: Reactive<T>) {
  const clone = createReactive(reactive.val)
  reactive.subscribe(() => {
    clone.val = reactive.val
  })

  return clone
}
