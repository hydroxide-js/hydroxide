import { isDEV } from '../../env'
import { targetKey } from '../../utils/targetKey'
import { invalidate } from '../scheduler'
import { $target, resetTarget } from './$'
import { immutativeSet } from './set'

export function remove(index: number, count = 1) {
  if (!$target.path || !$target.reactive) {
    throw new Error('Return value of $() should not be stored and used later')
  }

  const { reactive, path } = $target

  if (path.length !== 0) {
    const [target, key] = targetKey(reactive.value, path)
    reactive.value = immutativeSet(
      reactive.value,
      path,
      immutativeRemove(target[key], index, count)
    )
  } else {
    reactive.value = immutativeRemove(reactive.value, index, count)
  }

  invalidate(reactive, { type: 'remove', path: path, index, count })

  if (isDEV) {
    resetTarget()
  }
}

export function clear() {
  if (!$target.path || !$target.reactive) {
    throw new Error('Return value of $() should not be stored and used later')
  }

  const { reactive, path } = $target

  if (path.length !== 0) {
    reactive.value = immutativeSet(reactive.value, path, [])
  } else {
    reactive.value = []
  }

  invalidate(reactive, { type: 'clear', path: path })

  if (isDEV) {
    resetTarget()
  }
}

export function immutativeRemove<T>(arr: T[], index: number, count: number) {
  const clone = []
  for (let i = 0; i < index; i++) {
    clone.push(arr[i])
  }

  for (let i = index + count; i < arr.length; i++) {
    clone.push(arr[i])
  }

  return clone
}
