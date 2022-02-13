import { flushPhase, Phases } from './phases'
import { flushStore, isFlushed } from './store/flush'
import { Store } from './types/store'

export const dirtyStores: Set<Store> = new Set()

function flushUpdates() {
  for (let i = 0; i <= Phases.effect; i++) {
    // execute phase i
    flushPhase(i)
    // execute phase 0 to i if any updates are added on them
    for (let j = 0; j <= i; j++) {
      flushPhase(j)
    }
  }
}

let flushScheduled = false

export function scheduleFlush(store: Store) {
  dirtyStores.add(store)

  if (!flushScheduled) {
    flushScheduled = true

    // TODO :use other methods such as idle callback to schedule updates
    setTimeout(() => {
      dirtyStores.forEach(flushStore)
      dirtyStores.clear()
      flushUpdates()
      flushScheduled = false
      isFlushed()
    })
  }
}
