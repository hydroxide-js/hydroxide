import { Phase, Reactive } from '../types'

const invalidatedReactives: Set<Reactive<any>> = new Set()

/** information about batching */
export const batching = {
  enabled: false
}

/** flush the subscribtions of give phase  */
function flushPhase(reactives: Reactive[], phase: Phase) {
  for (let i = 0; i < reactives.length; i++) {
    if (reactives[i].subs[phase]) {
      reactives[i].subs[phase]!.forEach((sub) => sub())
    }
  }
}

/** call subscribers of all the invalidated reactives in proper order  */
function flush() {
  // clone so that we can separate reactives that are invalidated now and reactives that are invalidated in the future
  const reactives = [...invalidatedReactives]
  flushPhase(reactives, Phase.connection)
  flushPhase(reactives, Phase.render)
  flushPhase(reactives, Phase.effect)

  // reset flushed reactive's invalidations and remove them from invalidatedReactives
  reactives.forEach((reactive) => {
    invalidatedReactives.delete(reactive)
  })

  // continue flushing until no invalidated reactives left
  if (invalidatedReactives.size !== 0) {
    flush()
  }
}

/** batch related updates to trigger single flush instead of multiple flushes */
export function batch(fn: Function) {
  batching.enabled = true
  fn()
  batching.enabled = false
  flush()
}

/** invalidate a reactive to notifiy subscribers */
export function invalidate<T>(reactive: Reactive<T>) {
  if (!batching.enabled) {
    const connectSubs = reactive.subs[Phase.connection]
    if (connectSubs) connectSubs.forEach((cb) => cb())

    const renderSubs = reactive.subs[Phase.render]
    if (renderSubs) renderSubs.forEach((cb) => cb())

    const effectSubs = reactive.subs[Phase.effect]
    if (effectSubs) effectSubs.forEach((cb) => cb())

    reactive.updateCount++
  } else {
    invalidatedReactives.add(reactive)
  }
}
