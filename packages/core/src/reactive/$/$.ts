import { Path, Paths, Reactive, ReactiveMethods } from '../../types'
import { insert, insertList, push, pushList } from './insert'
import { clear, remove } from './remove'
import { set } from './set'
import { swap } from './swap'

type $Target = {
  path: Path | null
  reactive: Reactive | null
}

export const $target: $Target = {
  path: null,
  reactive: null
}

// reset _path and _reactive once a reactiveMethod used it to avoid bugs if output of $() is stored and used later
// DEV Only
export function resetTarget() {
  $target.path = null
  $target.reactive = null
}

export const reactiveMethods = {
  set,
  insert,
  insertList,
  remove,
  push,
  pushList,
  swap,
  clear
}

export function $<T, P extends Paths<T>>(
  reactive: Reactive<T>,
  path: P = [] as P
): ReactiveMethods<T, P> {
  // @ts-expect-error
  $target.path = path
  $target.reactive = reactive
  return reactiveMethods
}
