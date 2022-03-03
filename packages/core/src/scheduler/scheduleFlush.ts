import { updatedStores } from '../store/updatedStores'
import { Store } from '../types/store'
import { isFlushed } from './flushInfo'
import { flushStore } from './flushStore'
import { flushUpdates } from './flushUpdates'

let flushScheduled = false

export function scheduleFlush(store: Store) {
  updatedStores.add(store)

  if (!flushScheduled) {
    flushScheduled = true

    // TODO :use other methods such as idle callback to schedule updates
    setTimeout(() => {
      updatedStores.forEach(flushStore)
      updatedStores.clear()
      flushUpdates()
      flushScheduled = false
      isFlushed()
    })
  }
}
