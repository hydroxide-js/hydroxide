import { flushPhase } from './flushPhase'
import { Phases } from './phases'

export function flushUpdates() {
  for (let i = 0; i <= Phases.effect; i++) {
    // execute phase i
    flushPhase(i)
    // execute phase 0 to i if any updates are added on them
    for (let j = 0; j <= i; j++) {
      flushPhase(j)
    }
  }
}
