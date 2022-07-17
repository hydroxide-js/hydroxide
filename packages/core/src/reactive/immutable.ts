import { GenericPath } from '../types/others'
import { mutativeSwap } from '../utils/mutativeSwap'
import { batching } from './scheduler'

export function immutativeRemove<T>(arr: T[], index: number, count: number): T[] {
  if (batching.enabled && batching.cloned.has(arr)) {
    arr.splice(index, count)
    return arr
  }

  const clone = [...arr.slice(0, index), ...arr.slice(index + count)]

  if (batching.enabled) {
    batching.cloned.add(clone)
  }

  return clone
}

export function immutativeSet(obj: any, path: GenericPath, newValue: any) {
  const root = shallowClone(obj)
  const lastIndex = path.length - 1

  let target = root
  for (let i = 0; i < lastIndex; i++) {
    target[path[i]] = shallowClone(target[path[i]])
    target = target[path[i]]
  }

  target[path[lastIndex]] = newValue
  return root
}

export function immutativeInsert<T>(arr: T[], index: number, values: T[]): T[] {
  if (batching.enabled && batching.cloned.has(arr)) {
    arr.splice(index, 0, ...values)
    return arr
  }

  const arrClone = [...arr.slice(0, index), ...values, ...arr.slice(index)]

  if (batching.enabled) {
    batching.cloned.add(arrClone)
  }

  return arrClone
}

export function immutativeSwap<T extends Array<any>>(arr: T, i: number, j: number): T {
  // if batching is enabled
  if (batching.enabled && batching.cloned.has(arr)) {
    mutativeSwap(arr, i, j)
    return arr
  }

  const arrClone = [...arr] as T
  mutativeSwap(arrClone, i, j)

  // mark this array as cloned in this batch
  if (batching.enabled) {
    batching.cloned.add(arrClone)
  }

  return arrClone
}

function shallowClone<T>(obj: T): T {
  if (batching.enabled && batching.cloned.has(obj)) {
    return obj
  }

  const clone = Array.isArray(obj) ? [...obj] : { ...obj }

  if (batching.enabled) {
    batching.cloned.add(clone)
  }

  // @ts-ignore
  return clone
}
