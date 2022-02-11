import { Store } from '../types/store'
import { notify } from './notify'

type FlushInfo = {
  resolve: null | (() => void)
  promise: Promise<void> | null
  id: number
}

export const flushInfo: FlushInfo = {
  resolve: null,
  promise: null,
  id: 0
}

export function isFlushed() {
  flushInfo.id++
  if (flushInfo.resolve) {
    flushInfo.resolve()
    flushInfo.promise = null
  }
}

/** resolve the returned promise after all changes are flushed */
export function flush() {
  if (flushInfo.promise) return flushInfo.promise

  flushInfo.promise = new Promise((resolve) => {
    flushInfo.resolve = resolve
  })

  return flushInfo.promise
}

/**
 *
 * calls the subs of dirty parts
 * if a key is dirty in an object, that parent object is dirty
 * if a parent is dirty, entire subtree is dirty
 */
export function flushStore(store: Store) {
  const { dirty, subs } = store
  notify(subs, dirty)
  store.dirty = {}
}
