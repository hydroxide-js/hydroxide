import { Path, Paths, Reactive } from '../types'
import { insert, insertList, push, pushList } from './insert'
import { clear, pop, remove } from './remove'
import { perform, set } from './set'
import { swap } from './swap'

type $Target = {
  path: Path | null
  reactive: Reactive | null
}

export const $target: $Target = {
  path: null,
  reactive: null
}

export const reactiveMethods = {
  set,
  insert,
  insertList,
  remove,
  push,
  pushList,
  swap,
  clear,
  perform,
  pop
}

export function $<T, P extends Paths<T>>(this: Reactive<T>, ...path: P) {
  $target.reactive = this
  // @ts-expect-error
  $target.path = path
  return reactiveMethods
}
