import { Path } from '../types'
import { mutativeSwap } from '../utils/mutativeSwap'
import { batching } from './scheduler'

export function immutativeRemove<X extends Array<any>>(
  arr: X,
  index: number,
  count: number
): X {
  // if batching is enabled
  if (batching.enabled) {
    // if arr is already cloned in this batch
    if (batching.cloned.has(arr)) {
      // just mutate the cloned array
      arr.splice(index, count)
      return arr // don't do anything else
    }
  }

  // clone the array if it's not already cloned or batching is disabled
  const arrClone = [...arr.slice(0, index), ...arr.slice(index + count)] as X

  if (batching.enabled) {
    batching.cloned.add(arrClone)
  }

  return arrClone
}

export function immutativeSet(obj: any, path: Path, newValue: any) {
  let root: any

  // if batching is enabled, and the object is already cloned once in the batchf
  if (batching.enabled && batching.cloned.has(obj)) {
    // don't clone it
    root = obj
  } else {
    // else clone it
    root = shallowClone(obj)
    // and mark it as cloned
    batching.cloned.add(root)
  }

  const lastIndex = path.length - 1

  let target = root
  for (let i = 0; i < lastIndex; i++) {
    target[path[i]] = shallowClone(target[path[i]])
    target = target[path[i]]
  }

  target[path[lastIndex]] = newValue
  return root
}

export function immutativeInsert<T>(arr: T[], index: number, values: T[]) {
  // if batching is enabled
  if (batching.enabled) {
    // if this array has already been cloned once in this batch
    if (batching.cloned.has(arr)) {
      // no need to clone the array, just mutate the array and insert the items
      arr.splice(index, 0, ...values)
      return // don't do anything else
    }
  }

  // clone the array if batching is disabled or this array has not been cloned yet in this batch
  const arrClone = [...arr.slice(0, index), ...values, ...arr.slice(index)]

  if (batching.enabled) {
    batching.cloned.add(arrClone)
  }

  return arrClone
}

export function immutativeSwap<T extends Array<any>>(arr: T, i: number, j: number): T {
  // if batching is enabled
  if (batching.enabled) {
    // and if this array has already been cloned once in this batch
    if (batching.cloned.has(arr)) {
      // then just mutate the array for swap
      mutativeSwap(arr, i, j)
      return arr // don't do anything else
    }
  }

  // clone the array if batching is disabled or this array has not been cloned yet in this batch
  const arrClone = [...arr] as T

  // mark this array as cloned in this batch
  if (batching.enabled) {
    batching.cloned.add(arrClone)
  }

  mutativeSwap(arrClone, i, j)
  return arrClone
}

// create a shallow clone of give object or array
function shallowClone<T>(obj: T): T {
  // @ts-ignore
  return Array.isArray(obj) ? [...obj] : { ...obj }
}
