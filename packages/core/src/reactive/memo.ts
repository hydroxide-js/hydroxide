import { effect } from './effect'
import { DATA_PHASE } from './scheduler'
import { coreInfo, Reactive } from '../index'

/**
 * memoize the result of given function and update the result when
 * any of the reactives used inside the function updates
 */

type Thunk<T> = () => T

export function memo<T>(fn: Thunk<T>): Thunk<T> {
  let value: T
  let deps: Set<Reactive<any>>

  effect(() => {
    value = fn()
    // update deps
    deps = coreInfo.detected
  }, DATA_PHASE)

  return () => {
    if (coreInfo.detectorEnabled && deps) {
      deps.forEach(dep => {
        coreInfo.detected.add(dep)
      })
    }
    return value
  }
}
