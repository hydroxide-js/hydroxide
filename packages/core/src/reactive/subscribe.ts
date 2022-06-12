import { globalInfo, Reactive } from 'hydroxide'
import { Phase } from '../types'

/**
 * creates a subscription to reactive to get notified when reactive's value changes
 * @param callback - function to be called when reactive is updated
 * @param phase - phase in which the callback should be called ( default = Phases.effect )
 */
export function subscribe(
  reactive: Reactive,
  callback: Function,
  phase = Phase.effect,
  context = globalInfo.context
) {
  if (!reactive.subs[phase]) {
    reactive.subs[phase] = new Set()
  }

  const subs = reactive.subs[phase]!
  subs.add(callback)

  if (context !== null && context !== reactive.context) {
    // unsubscribe when context gets disconnected
    if (!context.onDisconnect) context.onDisconnect = []
    context.onDisconnect.push(() => {
      subs.delete(callback)
    })

    if (!context.onConnect) context.onConnect = []
    context.onConnect.push(() => {
      subs.add(callback)
    })
  }
}

export function unsubscribe(
  reactive: Reactive,
  callback: Function,
  phase = Phase.effect
) {
  reactive.subs[phase]!.delete(callback)
}
