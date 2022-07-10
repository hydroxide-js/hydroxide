import { coreInfo } from '../index'
import { Reactive, Subs } from '../types'
import {
  $,
  clear,
  insert,
  insertList,
  perform,
  pop,
  push,
  pushList,
  remove,
  set,
  swap
} from './$'

export function reactive<T>(value: T): Reactive<T> {
  // @ts-expect-error
  const state: Reactive<T> = function $Reactive() {
    // detect
    if (coreInfo.detectorEnabled) {
      coreInfo.detected.add(state)
    }

    return state.value
  }

  state.value = value
  state.subs = new Array(4) as Subs
  state.context = coreInfo.context
  state.updateCount = 0

  state.mutable = true
  state.$ = $

  // @ts-expect-error
  state.set = set
  // @ts-expect-error
  state.perform = perform

  if (Array.isArray(value)) {
    // @ts-expect-error
    state.insertList = insertList
    // @ts-expect-error
    state.push = push
    // @ts-expect-error
    state.pushList = pushList
    // @ts-expect-error
    state.insert = insert
    // @ts-expect-error
    state.remove = remove
    // @ts-expect-error
    state.clear = clear
    // @ts-expect-error
    state.swap = swap
    // @ts-expect-error
    state.pop = pop
  }

  return state
}
