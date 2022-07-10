import { Context, coreInfo } from '../../src/index'

export function inContext(fn: Function, connect = false) {
  coreInfo.context = { isConnected: true } as Context
  const context = coreInfo.context
  fn()
  coreInfo.context = null
  if (connect) {
    if (context.onConnect) {
      context.onConnect.forEach((cb) => cb())
    }
  }
  return context
}
