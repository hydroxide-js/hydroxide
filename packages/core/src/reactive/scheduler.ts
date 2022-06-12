import { AnyInvalidation, Phase, Reactive, Subs } from '../types'

let isFlushScheduled = false
const invalidatedReactives: Set<Reactive<any>> = new Set()
const scheduledPhaseSubs: Set<Subs> = new Set()

let flushPromise: Promise<any> | undefined
let resolveFlushPromise: Function | undefined
const batchUpdates = false

export const flushInfo = {
  id: 0
}

export function schedule(phase: Phase, cb: Function) {
  scheduledPhaseSubs.add({
    [phase]: [cb]
  })
  scheduleFlush()
}

function flushPhase(subType: Phase) {
  scheduledPhaseSubs.forEach((selfSubs) => {
    const subs = selfSubs[subType]
    if (subs) {
      subs.forEach((cb) => cb())
    }
  })
}

export function flush() {
  flushPromise = new Promise((resolve) => {
    resolveFlushPromise = resolve
  })
  return flushPromise
}

function flushUpdates() {
  flushInfo.id++
  const invalidatedReactivesClone = new Set(invalidatedReactives)

  invalidatedReactivesClone.forEach((reactive) => {
    scheduledPhaseSubs.add(reactive.subs)
  })

  flushPhase(Phase.connection)
  flushPhase(Phase.render)
  flushPhase(Phase.effect)

  // reset
  invalidatedReactivesClone.forEach((reactive) => {
    reactive.invalidations = []
    invalidatedReactives.delete(reactive)
  })

  scheduledPhaseSubs.clear()

  if (resolveFlushPromise) resolveFlushPromise()
  flushPromise = undefined
  isFlushScheduled = false

  // schedule again if new reactives are invalidated
  if (invalidatedReactives.size !== 0) {
    scheduleFlush()
  }
}

/** schedule a flush event which runs call the subscriptions that needs to run as a result of invalidations */
export function scheduleFlush() {
  if (isFlushScheduled) return
  isFlushScheduled = true
  Promise.resolve().then(flushUpdates)
}

/** invalidate a reactive to indicate that it's value is updated */
export function invalidate<T>(
  reactive: Reactive<T>,
  invalidation: AnyInvalidation
) {
  reactive.invalidations.push(invalidation)

  if (!batchUpdates) {
    const connectSubs = reactive.subs[Phase.connection]
    if (connectSubs) connectSubs.forEach((cb) => cb())

    const renderSubs = reactive.subs[Phase.render]
    if (renderSubs) renderSubs.forEach((cb) => cb())

    const effetSubs = reactive.subs[Phase.effect]
    if (effetSubs) effetSubs.forEach((cb) => cb())

    reactive.invalidations = []
    reactive.updateCount++
  } else {
    invalidatedReactives.add(reactive)
    scheduleFlush()
  }
}
