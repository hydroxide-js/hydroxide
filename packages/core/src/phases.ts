import { dirtyStores } from './scheduler'
import { flushStore } from './store/flush'
import { Subscription } from './types/store'

export const enum Phase {
  computed, // 0
  connection, // 2
  props, // 1
  dom, // 3
  effect // 4
}

export function handlePhase(callbacks: Set<Subscription>, i: number) {
  while (callbacks.size > 0) {
    let orderedCallbacks: Set<Subscription> | Subscription[] = callbacks

    // connection callbacks need to be called in increasing order of their context levels
    // to make sure parent context's connection are handled before it's child
    if (i === Phase.connection) {
      orderedCallbacks = [...callbacks].sort(
        (a, b) => a.context!.level - b.context!.level
      )
    }

    orderedCallbacks.forEach((update) => {
      // ignore callbacks whose contexts are disconnected
      if (!update.context || update.context.isConnected) {
        update()
      }
      callbacks.delete(update)
    })

    // ignore dirty stores added in dom and effect phase
    if (i <= Phase.props) {
      if (dirtyStores.size > 0) {
        dirtyStores.forEach(flushStore)
        dirtyStores.clear()
      }
    }
  }
}
