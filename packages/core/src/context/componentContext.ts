import { Context } from '../types/others'

export function createComponentContext(parentContext: Context | null) {
  const compContext: Context = { isConnected: true }

  if (parentContext && parentContext.providers) {
    compContext.providers = Object.create(parentContext.providers)
  }

  return compContext
}
