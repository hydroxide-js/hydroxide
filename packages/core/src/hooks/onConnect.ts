import { checkInvalidHookUsage } from '../dev/checkInvalidHookUsage'
import { globalInfo } from '../index'

/**
 * calls given the function when component is connected
 */
export function onConnect(cb: Function) {
  if (DEV) {
    checkInvalidHookUsage('onConnect')
  }

  if (globalInfo.context!.onConnect) {
    globalInfo.context!.onConnect.push(cb)
  } else {
    globalInfo.context!.onConnect = [cb]
  }
}
