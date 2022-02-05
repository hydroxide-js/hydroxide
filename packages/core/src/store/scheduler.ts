import { flushStore, isFlushed } from './flush'
import { Store } from './types'

export const dirtyStores: Set<Store> = new Set()

let flushScheduled = false
export function scheduleFlush(store: Store) {
  dirtyStores.add(store)
  if (!flushScheduled) {
    flushScheduled = true

    setTimeout(() => {
      dirtyStores.forEach(flushStore)
      dirtyStores.clear()
      flushScheduled = false
      isFlushed()
    })
  }
}
