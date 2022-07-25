import { effect } from './effect'
import { DATA_PHASE } from './scheduler'
import { Reactive, coreInfo } from 'hydroxide'

/**
 * memoize the result of given function and update the result when
 * any of the reactives used inside the function updates
 * @TODO: update the dependency after each call and patch the deps
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
    // pass the deps of effect to detector
    if (deps && coreInfo.detectorEnabled) {
      deps.forEach(dep => {
        coreInfo.detected.add(dep)
      })
    }
    return value
  }
}
