import { globalInfo } from '.'
import { flushInfo } from './scheduler/flushInfo'
import { Phases } from './scheduler/phases'
import { trackReactiveUsage } from './store/tracker'

/**
 * Automatically detects the reactives used in given function
 * and runs it whenever any of the used reactives is updated
 */
export function effect(
  callback: () => void,
  phase: Phases = Phases.effect,
  recalculateDeps = true
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

    if (!recalculateDeps) return callback()

    // subscribe to new reactives detected
    const newReactivesUsed = trackReactiveUsage(callback)

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
  const reactivesUsed = trackReactiveUsage(callback)

  // run the effect when any of the reactive is updated
  reactivesUsed.forEach((reactive) => {
    reactive.subscribe(runEffect, false, phase)
  })
}
