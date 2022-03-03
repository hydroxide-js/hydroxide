import { globalInfo } from '../context/globalInfo'

/**
 * calls given the function when component is disconnected
 */
export function disconnected(cb: Function) {
  if (globalInfo.context!.disconnectedCbs) {
    globalInfo.context!.disconnectedCbs.push(cb)
  } else {
    globalInfo.context!.disconnectedCbs = [cb]
  }
}
