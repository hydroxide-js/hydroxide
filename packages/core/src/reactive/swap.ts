import { Phase, Reactive } from '../types'
import { valueAt } from '../utils/targetKey'
import { $target } from './$'
import { immutativeSet } from './set'

export function swap<T extends Array<any>>(
  this: Reactive<T>,
  i: number,
  j: number
) {
  const path = $target.path
  const reactive = ($target.reactive || this) as Reactive<T>

  // deep swap
  if (path) {
    const arr = valueAt(reactive.value, path)

    // mutative deep swap
    if (reactive.mutable) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }

    // immutative deep swap
    else {
      const arr = valueAt(reactive.value, path)
      reactive.value = immutativeSet(
        reactive.value,
        path,
        immutativeSwap(arr as any[], i, j)
      )
    }
  }

  // shallow swap
  else {
    // mutative shallow swap
    if (reactive.mutable) {
      const temp = reactive.value[i]
      reactive.value[i] = reactive.value[j]
      reactive.value[j] = temp
    }

    // immutative shallow swap
    else {
      reactive.value = immutativeSwap(reactive.value, i, j)
    }
  }

  if (reactive.subs[Phase.listUpdate]) {
    reactive.subs[Phase.listUpdate]!.forEach((cb) => cb('swap', i, j))
  }

  $target.path = null
  $target.reactive = null
}

export function immutativeSwap<T extends Array<any>>(
  arr: T,
  i: number,
  j: number
): T {
  const clone = [...arr]
  const temp = clone[j]
  clone[j] = clone[i]
  clone[i] = temp
  return clone as T
}
