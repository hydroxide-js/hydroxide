import { globalInfo } from '../index'
import type { Reactive } from '../types'
import { Phase } from '../types'
import { detect } from './detector'
import { RENDER_PHASE, USER_EFFECT_PHASE } from './scheduler'
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
export function effect(callback: () => void, phase: Phase = USER_EFFECT_PHASE) {
  const info = {
    deps: new Set() as Set<Reactive>
  }
  const effectContext = globalInfo.context

  if (DEV && !effectContext) {
    console.error('invalid effect:', callback)
    throw new Error('effects can be only created inside a context')
  }

  function runEffect() {
    const [newDeps] = detect(callback)

    // unsubscribe from reactives that are not in the newDeps
    info.deps.forEach((dep) => {
      if (!newDeps.has(dep)) {
        unsubscribe(dep, runEffect, phase)
      }
    })

    // subscribe to deps that are not already subscribed
    newDeps.forEach((newDep) => {
      if (!info.deps.has(newDep)) {
        subscribe(newDep, runEffect, phase, effectContext!)
      }
    })

    // update the dependencies
    info.deps = newDeps
  }

  function createEffect() {
    info.deps = detect(callback)[0]
    info.deps.forEach((dep) => subscribe(dep, runEffect, phase, effectContext!))
  }

  // render effects can be called immediately and since they don't have branching logic
  // no need to update the dependencies
  if (phase === RENDER_PHASE) {
    info.deps = detect(callback)[0]
    info.deps.forEach((dep) => subscribe(dep, callback, phase, effectContext!))
  }

  // effect or connection phase
  else {
    // run the effect after the context is connected
    if (effectContext!.onConnect) {
      effectContext!.onConnect.push(createEffect)
    } else {
      effectContext!.onConnect = [createEffect]
    }
  }

  return info
}
