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
  phase = Phase.effect
) {
  if (!reactive.subs[phase]) {
    reactive.subs[phase] = new Set()
  }

  const subs = reactive.subs[phase]!
  subs.add(callback)

  if (globalInfo.context !== null && globalInfo.context !== reactive.context) {
    console.log('non local sub')
    // unsubscribe when context gets disconnected
    if (!globalInfo.context.onDisconnect) globalInfo.context.onDisconnect = []
    globalInfo.context.onDisconnect.push(() => {
      subs.delete(callback)
    })

    if (!globalInfo.context.onConnect) globalInfo.context.onConnect = []
    globalInfo.context.onConnect.push(() => {
      console.log('connect back')
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
