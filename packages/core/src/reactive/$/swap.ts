import { isDEV } from '../../env'
import { targetKey } from '../../utils/targetKey'
import { invalidate } from '../scheduler'
import { $target, resetTarget } from './$'
import { immutativeSet } from './set'

export function swap(i: number, j: number) {
  if (!$target.path || !$target.reactive) {
    throw new Error('Return value of $() should not be stored and used later')
  }

  const { reactive, path } = $target

  if (path.length !== 0) {
    const [target, key] = targetKey(reactive.value, path)
    reactive.value = immutativeSet(
      reactive.value,
      path,
      immutativeSwap(target[key], i, j)
    )
  } else {
    reactive.value = immutativeSwap(reactive.value, i, j)
  }

  invalidate(reactive, { type: 'swap', path: path, i: i, j: j })

  if (isDEV) {
    resetTarget()
  }
}

export function immutativeSwap<T>(arr: T[], i: number, j: number) {
  const clone = [...arr]
  const temp = clone[j]
  clone[j] = clone[i]
  clone[i] = temp
  return clone
}
