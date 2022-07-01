import { Context, globalInfo } from '../../src/index'

export function inContext(fn: Function, connect = false) {
  globalInfo.context = { isConnected: true } as Context
  const context = globalInfo.context
  fn()
  globalInfo.context = null
  if (connect) {
    if (context.onConnect) {
      context.onConnect.forEach((cb) => cb())
    }
  }
  return context
}
