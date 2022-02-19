import { globalInfo } from '../globalInfo'

/**
 * calls given the function when component is disconnected
 */
export function disconnected(cb: Function) {
  globalInfo.context!.disconnectedCbs.push(cb)
}
