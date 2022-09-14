import { coreInfo } from '../index'
import type { Reactive } from '../types/reactive'
import { Phase } from '../types/others'

/**
 * creates a subscription to reactive to get notified when reactive's value changes
 * @param callback - function to be called when reactive is updated
 * @param phase - phase in which the callback should be called ( default = Phases.effect )
 */
export function subscribe(
  reactive: Reactive<any>,
  callback: Function,
  phase: Phase,
  context = coreInfo.context
) {
  if (!reactive[phase]) {
    reactive[phase] = new Set()
  }

  const subs = reactive[phase]!

  // subscribe
  subs.add(callback)

  // if non local dependencies, setup unsubscribe on disconnect and resubscribe on connect
  if (context && context !== reactive.context) {
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

export function unsubscribe(reactive: Reactive<any>, callback: Function, phase: Phase) {
  reactive[phase]!.delete(callback)
}
