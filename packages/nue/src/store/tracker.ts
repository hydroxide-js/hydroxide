import { Reactive } from './reactive'

type Tracker = {
  reactivesUsed: Set<Reactive<any>>
  enabled: boolean
}

export const tracker: Tracker = {
  reactivesUsed: new Set(),
  enabled: false
}

export function trackReactiveUsage(fn: Function) {
  tracker.enabled = true
  fn()
  tracker.enabled = false

  const { reactivesUsed } = tracker

  tracker.reactivesUsed = new Set()

  return reactivesUsed
}
