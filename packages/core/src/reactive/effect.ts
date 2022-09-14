import { coreInfo } from '../index'
import type { Reactive } from '../types/reactive'
import { Phase } from '../types/others'
import { detect } from './detector'
import { USER_EFFECT_PHASE } from './scheduler'
import { subscribe, unsubscribe } from './subscribe'

/**
 * runs the given effectFn when any of the reactives used inside (aka: dependencies) is updated.
 *
 * @param callback - callback to be called when any reactives used inside is updated
 * @param phase - phase in which the callback should be called
 * @param sync - if true, the callback will be called synchronously instead of after the component context is connected
 */
export function effect(
  callback: () => void,
  phase: Phase = USER_EFFECT_PHASE,
  isStatic = false
) {
  let deps = new Set() as Set<Reactive<any>>
  const effectContext = coreInfo.context

  function createEffect() {
    deps = detect(callback)[0]

    let cb: Function
    if (!isStatic) {
      function runEffect() {
        const newDeps = detect(callback)[0]

        // unsubscribe from reactives that are not in the newDeps
        deps.forEach(dep => {
          if (!newDeps.has(dep)) {
            unsubscribe(dep, runEffect, phase)
          }
        })

        // subscribe to deps that are not already subscribed
        newDeps.forEach(newDep => {
          if (!deps.has(newDep)) {
            subscribe(newDep, runEffect, phase, effectContext!)
          }
        })

        // update the dependencies
        deps = newDeps
      }

      cb = runEffect
    } else {
      cb = callback
    }

    deps.forEach(dep => subscribe(dep, cb, phase, effectContext!))
  }

  // initialize user effects after the context is connected
  if (phase === USER_EFFECT_PHASE && effectContext) {
    if (effectContext.onConnect) {
      effectContext.onConnect.push(createEffect)
    } else {
      effectContext.onConnect = [createEffect]
    }
  } else {
    createEffect()
  }
}
