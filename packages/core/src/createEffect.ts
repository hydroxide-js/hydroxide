import { globalInfo } from '.'
import { flushInfo } from './scheduler/flushInfo'
import { Phases } from './scheduler/phases'
import { trackReactiveUsage } from './store/tracker'

/**
 * creates an effect which automatically detects the reactives used in the effect
 * and runs the effects whenever any of the reactives used is modified
 * it also detects the reactives used each time the effect is executed
 */
export function createEffect(
  effect: () => void,
  phase: Phases = Phases.effect
): void {
  // effect is defined in this context
  const effectContext = globalInfo.context
  // to avoid extra calls to effect
  // only call it once in a flush
  // flushInfo.promise acts as a unique id

  // @TODO: this is needed now that we are doing batching??
  let lastFlushedWith: number

  function runEffect() {
    // if the effect already ran in current flush, don't run the effect again
    if (flushInfo.id === lastFlushedWith) {
      return
    }

    lastFlushedWith = flushInfo.id

    // subscribe to new reactives detected
    const newReactivesUsed = trackReactiveUsage(effect)

    newReactivesUsed.forEach((reactive) => {
      // if new reactive, is already in reactivesUsed, do not subscribe to it
      if (!reactivesUsed.has(reactive)) {
        // potential bug: if this reactive is from different context and current context is disconnected,
        // we should not be subscribing to it
        if (!effectContext || (effectContext && effectContext.isConnected)) {
          reactive.subscribe(runEffect, false, phase)
        }
      }
    })

    // unsubscribe from reactives which are not in newReactivesUsed
    reactivesUsed.forEach((reactive) => {
      if (!newReactivesUsed.has(reactive)) {
        reactive.unsubscribe(runEffect)
      }
    })
  }

  // detect the reactives used for the first time
  const reactivesUsed = trackReactiveUsage(effect)

  // run the effect when any of the reactive is updated
  reactivesUsed.forEach((reactive) => {
    reactive.subscribe(runEffect, false, phase)
  })
}
