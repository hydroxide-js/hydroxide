import { handlePhase, Phase } from './phases'
import { flushStore, isFlushed } from './store/flush'
import { updates } from './store/reactive'
import { Store } from './types/store'

export const dirtyStores: Set<Store> = new Set()

let flushScheduled = false

export function scheduleFlush(store: Store) {
  dirtyStores.add(store)

  if (!flushScheduled) {
    flushScheduled = true

    // TODO :use other methods such as idle callback to schedule updates
    setTimeout(() => {
      dirtyStores.forEach(flushStore)
      dirtyStores.clear()

      updates.forEach((phaseUpdates, i) => {
        handlePhase(phaseUpdates, i)

        // updating props can introduce computed and connection updates
        // so handle them if any, before moving to next phase
        if (i === Phase.props) {
          if (updates[Phase.computed].size > 0) {
            handlePhase(updates[Phase.computed], Phase.computed)
          }

          if (updates[Phase.connection].size > 0) {
            handlePhase(updates[Phase.connection], Phase.connection)
          }

          if (updates[Phase.props].size > 0) {
            handlePhase(updates[Phase.props], Phase.props)
          }
        }
      })

      flushScheduled = false
      isFlushed()
    })
  }
}
