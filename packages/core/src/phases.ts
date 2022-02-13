import { dirtyStores } from './scheduler'
import { flushStore } from './store/flush'
import { updates } from './store/reactive'
import { Subscription } from './types/store'

export const enum Phases {
  computed, // 0
  connection, // 2
  props, // 1
  dom, // 3
  effect // 4
}

export function flushPhase(phase: Phases) {
  // return if no updates
  if (updates[phase].size === 0) return

  const callbacks = updates[phase]

  let orderedCallbacks: Set<Subscription> | Subscription[] = callbacks

  // connection callbacks need to be called in increasing order of their context levels
  // to make sure parent context's connection are handled before it's child
  if (phase === Phases.connection) {
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

  // flush updated stores
  if (dirtyStores.size > 0) {
    dirtyStores.forEach(flushStore)
    dirtyStores.clear()
  }
}
