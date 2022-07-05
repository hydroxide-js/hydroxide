import { globalInfo } from '../index'
import type { Context, Reactive } from '../types'
import { Phase } from '../types'

/**
 * creates a subscription to reactive to get notified when reactive's value changes
 * @param callback - function to be called when reactive is updated
 * @param phase - phase in which the callback should be called ( default = Phases.effect )
 */
export function subscribe(
  reactive: Reactive,
  callback: Function,
  phase: Phase,
  context: Context = globalInfo.context!
) {
  if (DEV && !context) {
    throw new Error('subscriptions can only be created inside a context')
  }

  const subs = reactive.subs[phase] || (reactive.subs[phase] = new Set())

  // subscribe
  subs.add(callback)

  // if non local dependencies, setup unsubscribe on disconnect and resubscribe on connect
  if (context !== reactive.context) {
    const unsub = () => {
      subs.delete(callback)
    }

    const resub = () => {
      subs.add(callback)
    }

    // unsubscribe when context gets disconnected
    if (!context.onDisconnect) {
      context.onDisconnect = [unsub]
    } else {
      context.onDisconnect.push(unsub)
    }

    // subscribe when context is connected
    if (!context.onConnect) {
      context.onConnect = [resub]
    } else {
      context.onConnect.push(resub)
    }
  }
}

export function unsubscribe(reactive: Reactive, callback: Function, phase: Phase) {
  reactive.subs[phase]!.delete(callback)
}
