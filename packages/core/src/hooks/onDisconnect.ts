import { checkInvalidHookUsage } from '../dev/checkInvalidHookUsage'
import { globalInfo } from '../index'

/**
 * calls given the function when component is disconnected
 */
export function onDisconnect(cb: Function) {
  if (DEV) {
    checkInvalidHookUsage('onDisconnect')
  }

  if (globalInfo.context!.onDisconnect) {
    globalInfo.context!.onDisconnect.push(cb)
  } else {
    globalInfo.context!.onDisconnect = [cb]
  }
}
