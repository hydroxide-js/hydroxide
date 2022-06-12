import { isDEV } from '../../env'
import { Path, Paths, PathTarget } from '../../types'
import { targetKey } from '../../utils/targetKey'
import { invalidate } from '../scheduler'
import { $target, resetTarget } from './$'

/**
 * reactively set a new value
 * @param value
 */
export function set<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  value: V | ((currentVal: V) => V)
): void {
  // dev only
  if (!$target.path || !$target.reactive) {
    throw new Error('Return value of $() should not be stored and used later')
  }

  const { path, reactive } = $target

  // deep set
  if (path.length !== 0) {
    const [target, key] = targetKey(reactive.value, path as Array<any>)
    const oldValue = target[key]
    // @ts-expect-error
    const newValue = typeof value === 'function' ? value(oldValue) : value

    if (oldValue !== newValue) {
      // set the new value of reactive
      reactive.value = immutativeSet(reactive.value, path, newValue)
      invalidate(reactive, { type: 'set', path: path, value: newValue })
    }
  }

  // shallow set
  else {
    const newValue =
      // @ts-expect-error
      typeof value === 'function' ? value(reactive.value) : value

    if (reactive.value !== newValue) {
      reactive.value = newValue
      invalidate(reactive, { type: 'set', path: [], value: value })
    }
  }

  if (isDEV) {
    resetTarget()
  }
}

// create a shallow clone of give object or array
function shallowClone<T>(obj: T): T {
  // @ts-ignore
  return Array.isArray(obj) ? [...obj] : { ...obj }
}

export function immutativeSet(obj: any, path: Path, newValue: any) {
  const clone = shallowClone(obj)
  let cloneTarget = clone

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    cloneTarget[key] = shallowClone(cloneTarget[key])
    cloneTarget = cloneTarget[key]
  }

  const lastKey = path[path.length - 1]

  cloneTarget[lastKey] = newValue

  return clone
}
