import { handlePhase, Phases } from './phases'
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
        if (i === Phases.props) {
          if (updates[Phases.computed].size > 0) {
            handlePhase(updates[Phases.computed], Phases.computed)
          }

          if (updates[Phases.connection].size > 0) {
            handlePhase(updates[Phases.connection], Phases.connection)
          }

          if (updates[Phases.props].size > 0) {
            handlePhase(updates[Phases.props], Phases.props)
          }
        }
      })

      flushScheduled = false
      isFlushed()
    })
  }
}
