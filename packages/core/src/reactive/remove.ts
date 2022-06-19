import { Phase, Reactive } from '../types'
import { targetKey } from '../utils/targetKey'
import { $target } from './$'
import { invalidate } from './scheduler'
import { immutativeSet } from './set'

export function remove<T extends Array<any>>(
  this: Reactive<T>,
  index: number,
  count = 1
) {
  const path = $target.path!
  const reactive = ($target.reactive || this) as Reactive<T>

  // remove at path
  if (path) {
    const [target, key] = targetKey(reactive.value, path)
    reactive.value = immutativeSet(
      reactive.value,
      path,
      immutativeRemove(target[key], index, count)
    )
  }

  // remove on root
  else {
    reactive.value = immutativeRemove(reactive.value, index, count)

    if (reactive.subs[Phase.listUpdate]) {
      reactive.subs[Phase.listUpdate]!.forEach((cb) =>
        cb('remove', index, count)
      )
    }
  }

  invalidate(reactive)

  $target.path = null
  $target.reactive = null
}

export function clear<T extends any[]>(this: Reactive<T>) {
  const path = $target.path
  const reactive = ($target.reactive || this) as Reactive<T>

  // clear at path
  if (path) {
    if (reactive.mutable) {
      const [target, key] = targetKey(reactive.value, path)
      if (target[key].length === 0) return
      target[key] = []
    } else {
      // @todo add a way to check if the list is already cleared to avoid extra work
      reactive.value = immutativeSet(reactive.value, path, [])
    }
  }

  // clear at root
  else {
    if (reactive.value.length === 0) return
    reactive.value = [] as never as T

    if (reactive.subs[Phase.listUpdate]) {
      reactive.subs[Phase.listUpdate]!.forEach((cb) => cb('clear'))
    }
  }

  invalidate(reactive)

  $target.path = null
  $target.reactive = null
}

export function immutativeRemove<X extends Array<any>>(
  arr: X,
  index: number,
  count: number
): X {
  const clone = [] as never as X

  for (let i = 0; i < index; i++) {
    clone.push(arr[i])
  }

  for (let i = index + count; i < arr.length; i++) {
    clone.push(arr[i])
  }

  return clone
}
