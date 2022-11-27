import { coreInfo } from '..'

let ctxId = 0

export function context<T, X>(contextCreator: (init: T) => X) {
  const thisCTXId = ctxId

  const ctx = {
    provide(init: T) {
      if (DEV && !coreInfo.context) {
        throw new Error('context must be created inside a component')
      }

      if (!coreInfo.context!.providers) {
        coreInfo.context!.providers = {}
      }

      const value = contextCreator(init)
      coreInfo.context!.providers[thisCTXId] = value
      return value
    },
    use() {
      if (DEV && !coreInfo.context) {
        throw new Error('context must be used inside a component')
      }

      if (!coreInfo.context!.providers) return undefined

      return coreInfo.context!.providers[thisCTXId] as X
    }
  }
  console.log('create user context', ctxId, ctx)

  ctxId++

  return ctx
}
