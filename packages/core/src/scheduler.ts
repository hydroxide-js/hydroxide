import { flushStore, isFlushed } from './store/flush'
import { Store } from './types/store'

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
