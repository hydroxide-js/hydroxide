import { Paths, PathTarget, Phase, Reactive } from '../types'
import { valueAt } from '../utils/targetKey'
import { $target } from './$'
import { invalidate } from './scheduler'
import { immutativeSet } from './set'

export function insertList<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(this: Reactive<T>, _index: number, values: V[]) {
  const path = $target.path!
  const reactive = ($target.reactive || this) as Reactive<T>

  // insert at path
  if (path) {
    if (reactive.mutable) {
      let target = reactive.value
      const len = path.length
      for (let i = 0; i < len; i++) {
        // @ts-expect-error
        target = target[path[i]]
      }

      const index = _index < 0 ? target.length + _index + 1 : _index
      target.splice(index, 0, ...values)
    } else {
      const arr = valueAt(reactive.value, path)
      const index = _index < 0 ? arr.length + _index + 1 : _index
      reactive.value = immutativeSet(
        reactive.value,
        path,
        // @ts-ignore
        immutableInsert(arr, index, values)
      )
    }
  }

  // insert on root
  else {
    const index = _index < 0 ? reactive.value.length + _index + 1 : _index

    if (reactive.mutable) {
      reactive.value.splice(index as number, 0, ...values)
    } else {
      reactive.value = immutableInsert(reactive.value, index, values) as T
    }

    if (reactive.subs[Phase.listUpdate]) {
      reactive.subs[Phase.listUpdate]!.forEach((cb) => {
        cb('insert', index, values)
      })
    }
  }

  invalidate(reactive)

  $target.path = null
  $target.reactive = null
}

export function insert<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(this: Reactive<T>, index: number, value: V) {
  if (!$target.reactive) $target.reactive = this
  // @ts-expect-error
  insertList(index, [value])
}

export function push<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(this: Reactive<T>, value: V) {
  if (!$target.reactive) $target.reactive = this
  // @ts-expect-error
  insertList(-1, [value])
}

export function pushList<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(this: Reactive<T>, values: V[]) {
  if (!$target.reactive) $target.reactive = this
  // @ts-expect-error
  insertList(-1, values)
}

export function immutableInsert<T>(arr: T[], index: number, values: T[]) {
  const valuesLen = values.length
  const arrLen = arr.length
  const clone = new Array(arrLen + valuesLen)

  // copy 0 to index - 1 from arr
  for (let i = 0; i < index; i++) {
    clone[i] = arr[i]
  }

  // add values from index to insertEnd
  for (let i = 0; i < valuesLen; i++) {
    clone[index + i] = values[i]
  }

  // add values from insertEnd to end
  for (let i = index; i < arrLen; i++) {
    clone[valuesLen + i] = arr[i]
  }

  return clone
}
