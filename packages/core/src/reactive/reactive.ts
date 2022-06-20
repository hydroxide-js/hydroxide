import { globalInfo } from '../index'
import { Reactive } from '../types'
import { $ } from './$'
import { insert, insertList, push, pushList } from './insert'
import { clear, pop, remove } from './remove'
import { perform, set } from './set'
import { swap } from './swap'

export function reactive<T>(value: T, mutable = false): Reactive<T> {
  const state: Reactive<T> = function () {
    // detect
    if (globalInfo.detectorEnabled) {
      globalInfo.detected.add(state)
    }

    return state.value
  }

  state.value = value
  state.subs = {}
  state.context = globalInfo.context
  state.updateCount = 0

  if (mutable) {
    state.mutable = mutable
  }

  state.$ = $
  state.set = set
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

export function isReactive(v: any): v is Reactive<any> {
  return typeof v === 'function' && 'subs' in v
}
