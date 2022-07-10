import { checkInvalidHookUsage } from '../dev/checkInvalidHookUsage'
import { coreInfo } from '../index'

/**
 * calls given the function when component is connected
 */
export function onConnect(cb: Function) {
  if (DEV) {
    checkInvalidHookUsage('onConnect')
  }

  if (coreInfo.context!.onConnect) {
    coreInfo.context!.onConnect.push(cb)
  } else {
    coreInfo.context!.onConnect = [cb]
  }
}
