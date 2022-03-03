import { globalInfo } from '../context/globalInfo'

/**
 * calls given the function when component is connected
 */
export function connected(cb: Function) {
  if (globalInfo.context!.connectedCbs) {
    globalInfo.context!.connectedCbs.push(cb)
  } else {
    globalInfo.context!.connectedCbs = [cb]
  }
}
