import { isDEV } from '../env'
import { globalInfo } from '../index'

/**
 * calls given the function when component is disconnected
 */
export function disconnected(cb: Function) {
  if (isDEV) {
    if (!globalInfo.context) {
      throw new Error(
        'can not use connected() hook outside of component context'
      )
    }
  }

  if (globalInfo.context!.onDisconnect) {
    globalInfo.context!.onDisconnect.push(cb)
  } else {
    globalInfo.context!.onDisconnect = [cb]
  }
}
