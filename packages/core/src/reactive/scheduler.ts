import { Reactive } from '../types'

const invalidatedReactives: Set<Reactive<any>> = new Set()

// Phases
export const LIST_PHASE = 0
export const CONNECTION_PHASE = 1
export const RENDER_PHASE = 2
export const USER_EFFECT_PHASE = 3

/** information about batching */
export const batching = {
  enabled: false,
  cloned: new Set() as Set<any>
}

type TaskQueue = Array<Set<Function>>

/** flush the subscribtions of give phase  */
// function flushPhase(reactives: Reactive[], phase: Phase) {
//   for (let i = 0; i < reactives.length; i++) {
//     reactives[i].subs[phase]?.forEach((sub) => sub())
//   }
// }

const connectionQueue: TaskQueue = []
const renderQueue: TaskQueue = []
const userEffectQueue: TaskQueue = []

// only flush subs array till given length to avoid flushing the subs of next flush
function flushTaskQueue(taskQueue: TaskQueue, len: number) {
  for (let i = 0; i < len; i++) {
    const set = taskQueue[i]
    for (const cb of set) cb()
  }

  // remove completed tasks
  taskQueue.splice(0, len)
}

/** call subscribers of all the invalidated reactives in proper order  */
function flush() {
  invalidatedReactives.clear()

  // must calculated length before flushing
  const connectionSubsLength = connectionQueue.length
  const renderSubsLength = renderQueue.length
  const userEffectSubsLength = userEffectQueue.length

  if (connectionSubsLength !== 0) {
    flushTaskQueue(connectionQueue, connectionSubsLength)
  }

  if (renderSubsLength !== 0) {
    flushTaskQueue(renderQueue, renderSubsLength)
  }

  if (userEffectSubsLength !== 0) {
    flushTaskQueue(userEffectQueue, userEffectSubsLength)
  }

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
  batching.cloned.clear()
  flush()
}

/** invalidate a reactive to notifiy subscribers */
export function invalidate<T>(reactive: Reactive<T>) {
  if (!batching.enabled) {
    reactive.subs[CONNECTION_PHASE]?.forEach((cb) => cb())
    reactive.subs[RENDER_PHASE]?.forEach((cb) => cb())
    reactive.subs[USER_EFFECT_PHASE]?.forEach((cb) => cb())
    reactive.updateCount++
  } else {
    if (!invalidatedReactives.has(reactive)) {
      invalidatedReactives.add(reactive)

      // add subs
      if (reactive.subs[CONNECTION_PHASE]) {
        connectionQueue.push(reactive.subs[CONNECTION_PHASE])
      }

      if (reactive.subs[RENDER_PHASE]) {
        renderQueue.push(reactive.subs[RENDER_PHASE])
      }

      if (reactive.subs[USER_EFFECT_PHASE]) {
        userEffectQueue.push(reactive.subs[USER_EFFECT_PHASE])
      }
    }
  }
}
