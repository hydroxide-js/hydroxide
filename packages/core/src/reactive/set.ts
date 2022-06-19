import { Path, Paths, PathTarget, Phase, Reactive } from '../types'
import { valueAt } from '../utils/targetKey'
import { $target } from './$'
import { invalidate } from './scheduler'

export function set<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  this: Reactive<T>,
  newValue: V
): void {
  const path = $target.path
  const reactive = ($target.reactive! || this) as Reactive<T>

  // set on path
  if (path) {
    // set the new value of reactive
    if (reactive.mutable) {
      // mutative set
      const lastIndex = path.length - 1
      const target = valueAt(reactive.value, path, 0, lastIndex - 1)
      target[path[lastIndex]] = newValue
    } else {
      reactive.value = immutativeSet(reactive.value, path, newValue)
    }
  }

  // assign
  else {
    if (reactive.value !== newValue) {
      reactive.value = newValue as T
    }
  }

  if (reactive.subs[Phase.listUpdate]) {
    reactive.subs[Phase.listUpdate]!.forEach((cb) => cb('set', path, newValue))
  }

  invalidate(reactive)

  $target.path = null
  $target.reactive = null
}

export function perform<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  this: Reactive<T>,
  operation: (oldValue: V) => V
) {
  const path = $target.path
  const reactive = $target.reactive || this

  if (path) {
    const oldValue = valueAt(reactive.value, path)
    const newValue = operation(oldValue as V)
    if (newValue === oldValue) return
    // @ts-expect-error
    reactive.set(newValue)
  } else {
    const newValue = operation(reactive.value)
    if (newValue === reactive.value) return
    // @ts-expect-error
    reactive.set(newValue)
  }
}

// create a shallow clone of give object or array
function shallowClone<T>(obj: T): T {
  // @ts-ignore
  return Array.isArray(obj) ? [...obj] : { ...obj }
}

export function immutativeSet(obj: any, path: Path, newValue: any) {
  const clone = shallowClone(obj)
  const lastIndex = path.length - 1

  let cloneTarget = clone
  for (let i = 0; i < lastIndex; i++) {
    cloneTarget[path[i]] = shallowClone(cloneTarget[path[i]])
    cloneTarget = cloneTarget[path[i]]
  }

  cloneTarget[path[lastIndex]] = newValue
  return clone
}
