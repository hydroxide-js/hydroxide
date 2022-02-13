import { flushInfo } from '../scheduler/flushInfo'

/** returns a promise which is resolved after all the updates are flushed */
export function flush() {
  if (flushInfo.promise) return flushInfo.promise

  flushInfo.promise = new Promise((resolve) => {
    flushInfo.resolve = resolve
  })

  return flushInfo.promise
}
