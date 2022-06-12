import { isDEV } from '../../env'
import { Paths, PathTarget } from '../../types'
import { targetKey } from '../../utils/targetKey'
import { invalidate } from '../scheduler'
import { $target, resetTarget } from './$'
import { immutativeSet } from './set'

export function insertList<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  index: number,
  values: V[]
) {
  if (!$target.path || !$target.reactive) {
    throw new Error('Return value of $() should not be stored and used later')
  }

  const { reactive, path } = $target

  if (path.length !== 0) {
    const [target, key] = targetKey(reactive.value, path)
    reactive.value = immutativeSet(
      reactive.value,
      path,
      immutableInsert(target[key], index, values)
    )
  } else {
    reactive.value = immutableInsert(reactive.value, index, values)
  }

  invalidate(reactive, { type: 'insert', path: path, index, values })

  if (isDEV) {
    resetTarget()
  }
}

export function insert<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  index: number,
  value: V
) {
  insertList(index, [value])
}

export function push<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  value: V
) {
  const length = $target.reactive!.value.length
  insertList(length, [value])
}

export function pushList<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  values: V[]
) {
  const length = $target.reactive!.value.length
  insertList(length, values)
}

export function immutableInsert<T>(arr: T[], index: number, values: T[]) {
  const clone = []
  for (let i = 0; i < index; i++) {
    clone.push(arr[i])
  }

  for (let i = 0; i < values.length; i++) {
    clone.push(values[i])
  }

  for (let i = index; i < arr.length; i++) {
    clone.push(arr[i])
  }

  return clone
}
