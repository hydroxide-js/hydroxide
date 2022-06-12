import { globalInfo } from '../index'
import { Reactive } from '../types'

export function reactive<T>(value: T): Reactive<T> {
  const state: Reactive<T> = function () {
    // detect
    if (globalInfo.detectorEnabled) {
      globalInfo.detected.add(state)
    }

    return state.value
  }

  state.value = value
  state.subs = {}
  state.invalidations = []
  state.context = globalInfo.context
  state.updateCount = 0

  return state
}

export function isReactive(v: any): v is Reactive<any> {
  return typeof v === 'function' && 'subs' in v
}
