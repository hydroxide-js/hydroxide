import { effect } from './effect'
import { USER_EFFECT_PHASE } from './scheduler'

/**
 * memoize the result of given function and update the result when
 * any of the reactives used inside the function updates
 * @TODO: update the dependency after each call and patch the deps
 */

type Thunk<T> = () => T

export function memo<T>(fn: Thunk<T>): Thunk<T> {
  let value: T

  effect(
    () => {
      value = fn()
    },
    USER_EFFECT_PHASE,
    true
  )

  return () => value
}
