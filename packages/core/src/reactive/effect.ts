import { Reactive } from 'hydroxide'
import { Phase } from '../types'
import { detect } from './detector'
import { schedule } from './scheduler'
import { subscribe, unsubscribe } from './subscribe'

/**
 * runs the given effectFn when any of the reactives used inside (aka: dependencies) is updated.
 *
 * it refreshes the dependencies every time the effectFn is called, if there is no branching logic in the effectFn,
 * dependencies don't need to be updated. provide `noBranch = true` if that's the case to avoid extra work of refreshing dependencies
 *
 * @param callback - callback to be called when any reactives used inside is updated
 * @param noBranch - flag that tells whether there's branching logic in the effectFn
 */
export function effect(callback: () => void, phase = Phase.effect) {
  let deps: Set<Reactive>

  function runEffect() {
    const [newDeps] = detect(callback)

    // unsubscribe from reactives that are not in the newDeps
    deps.forEach((dep) => {
      if (!newDeps.has(dep)) {
        unsubscribe(dep, runEffect, phase)
      }
    })

    // subscribe to deps that are not already subscribed
    newDeps.forEach((newDep) => {
      if (!deps.has(newDep)) {
        subscribe(newDep, runEffect, phase)
      }
    })

    // update the dependencies
    deps = newDeps
  }

  function createEffect() {
    deps = detect(callback)[0]
    deps.forEach((dep) => subscribe(dep, runEffect))
  }

  if (phase === Phase.render) {
    createEffect()
  } else {
    schedule(phase, createEffect)
  }
}
