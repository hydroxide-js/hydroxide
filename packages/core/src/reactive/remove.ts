import { Phase, Reactive } from '../types'
import { targetKey, valueAt } from '../utils/targetKey'
import { $target } from './$'
import { invalidate } from './scheduler'
import { immutativeSet } from './set'

export function remove<T extends Array<any>>(
  this: Reactive<T>,
  _index: number,
  count = 1
) {
  const path = $target.path!
  const reactive = ($target.reactive || this) as Reactive<T>

  // remove at path
  if (path) {
    const arr = valueAt(reactive.value, path)
    const index = _index < 0 ? arr.length + _index : _index
    reactive.value = immutativeSet(
      reactive.value,
      path,
      immutativeRemove(arr as Array<any>, index, count)
    )
  }

  // remove on root
  else {
    const index = _index < 0 ? reactive.value.length + _index : _index

    if (reactive.mutable) {
      reactive.value.splice(index, count)
    } else {
      reactive.value = immutativeRemove(reactive.value, index, count)
    }

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

export function pop<T extends Array<any>>(this: Reactive<T>, count = 1) {
  if (!$target.reactive) $target.reactive = this

  const path = $target.path
  const reactive = ($target.reactive || this) as Reactive<T>

  let len: number

  if (path) {
    len = valueAt(reactive.value, path).length
  } else {
    len = reactive.value.length
  }

  // @ts-expect-error
  remove(len - count, count)
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
