import { flushInfo } from './store/flush'
import { trackReactiveUsage } from './store/tracker'

/**
 * creates an effect which automatically detects the reactives used in the effect
 * and runs the effects whenever any of the reactives used is modified
 * it also detects the reactives used each time the effect is executed
 */
export function createEffect(effect: () => void): void {
  // to avoid extra calls to effect
  // only call it once in a flush
  // flushInfo.promise acts as a unique id
  let lastFlushedWith: number

  function runEffect() {
    // if the effect already ran in current flush, don't run the effect again
    if (flushInfo.id === lastFlushedWith) return

    lastFlushedWith = flushInfo.id

    // unsubscribe from previous subscribed reactives
    reactivesUsed.forEach((reactive) => {
      reactive.unsubscribe(runEffect)
    })

    // subscribe to new reactives detected
    const newReactivesUsed = trackReactiveUsage(effect)
    newReactivesUsed.forEach((reactive) => {
      reactive.subscribe(runEffect)
    })
  }

  // detect the reactives used for the first time
  const reactivesUsed = trackReactiveUsage(effect)

  // run the effect when any of the reactive is updated
  reactivesUsed.forEach((reactive) => {
    reactive.subscribe(runEffect)
  })
}
