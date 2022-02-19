import { globalInfo } from '.'
import { Phases } from './scheduler/phases'
import { trackReactiveUsage } from './store/tracker'

/**
 * Automatically detects the reactives used in given function
 * and runs it whenever any of the used reactives is updated
 */
export function effect(
  callback: () => void,
  refreshDeps = true,
  phase: Phases = Phases.effect
) {
  const effectContext = globalInfo.context

  function refreshEffect() {
    // subscribe to new reactives detected
    const updatedDeps = trackReactiveUsage(callback)

    updatedDeps.forEach((reactive) => {
      // if the effect is not already subscribed to it
      if (!deps.has(reactive)) {
        // only subscribe if effectContext is still connected
        if (!effectContext || (effectContext && effectContext.isConnected)) {
          reactive.subscribe(refreshEffect, false, phase, effectContext)
          // add to list of reactives used
          deps.add(reactive)
        }
      }
    })

    // unsubscribe from reactives which are not in newReactivesUsed
    deps.forEach((reactive) => {
      if (!updatedDeps.has(reactive)) {
        reactive.unsubscribe(refreshEffect)
        // delete from list of reactivesUsed
        deps.delete(reactive)
      }
    })
  }

  const effectFn = refreshDeps ? refreshEffect : callback

  // initial deps
  const deps = trackReactiveUsage(callback)

  // run the effect when any of the reactive is updated
  deps.forEach((reactive) => {
    reactive.subscribe(effectFn, false, phase)
  })

  return deps
}
