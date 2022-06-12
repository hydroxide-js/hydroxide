import { isDEV } from '../env'
import { globalInfo } from '../index'

/**
 * calls given the function when component is connected
 */
export function connected(cb: Function) {
  if (isDEV) {
    if (!globalInfo.context) {
      throw new Error(
        'can not use connected() hook outside of component context'
      )
    }
  }

  if (globalInfo.context!.onConnect) {
    globalInfo.context!.onConnect.push(cb)
  } else {
    globalInfo.context!.onConnect = [cb]
  }
}
