import { checkInvalidHookUsage } from '../dev/checkInvalidHookUsage'
import { coreInfo } from '../index'

/**
 * calls given the function when component is disconnected
 */
export function onDisconnect(cb: Function) {
  if (DEV) {
    checkInvalidHookUsage('onDisconnect')
  }

  if (coreInfo.context!.onDisconnect) {
    coreInfo.context!.onDisconnect.push(cb)
  } else {
    coreInfo.context!.onDisconnect = [cb]
  }
}
