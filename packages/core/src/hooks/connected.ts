import { globalInfo } from '../globalInfo'

/**
 * calls given the function when component is connected
 */
export function connected(cb: Function) {
  globalInfo.context!.afterConnectCbs.push(cb)
}
